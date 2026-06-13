import { NextResponse } from 'next/server';
import { stripe, isStripeConfigured, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe';
import { getTierFromPriceId } from '@/lib/plans';
import type Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/billing/webhook
 *
 * Receives Stripe webhook events for subscription lifecycle management.
 * Updated for multi-tenant organization-based schema.
 *
 * Events handled:
 *   - checkout.session.completed — Creates/updates subscription record (org-aware)
 *   - customer.subscription.updated — Syncs status changes, upgrades, downgrades
 *   - customer.subscription.deleted — Marks subscription as canceled
 *   - invoice.payment_succeeded — Updates current period dates
 *   - invoice.payment_failed — Marks subscription as past_due
 */
export async function POST(request: Request) {
  try {
    if (!isStripeConfigured() || !STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Stripe webhook is not configured.' },
        { status: 500 }
      );
    }

    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
      event = stripe!.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Initialize Supabase admin client for direct DB updates
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Helper: look up organization_id for a user
    const getOrganizationId = async (userId: string): Promise<string | null> => {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('organization_id')
        .eq('id', userId)
        .maybeSingle();
      return profile?.organization_id || null;
    };

    // Helper to extract subscription fields from Stripe objects
    const extractSubFields = (obj: any) => ({
      current_period_start: obj.current_period_start
        ? new Date((obj.current_period_start as number) * 1000).toISOString()
        : undefined,
      current_period_end: obj.current_period_end
        ? new Date((obj.current_period_end as number) * 1000).toISOString()
        : undefined,
      cancel_at_period_end: obj.cancel_at_period_end ?? false,
      trial_end: obj.trial_end
        ? new Date((obj.trial_end as number) * 1000).toISOString()
        : null,
    });

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id || session.client_reference_id;
        const tier = session.metadata?.tier as string;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (!userId || !subscriptionId) {
          console.error('Checkout completed but missing user_id or subscription_id');
          break;
        }

        // Look up organization_id for the user (multi-tenant support)
        const orgId = await getOrganizationId(userId);

        // Get subscription details from Stripe
        const subscription = await stripe!.subscriptions.retrieve(subscriptionId);
        const rawSub = subscription as any;
        const resolvedTier = tier || getTierFromPriceId(
          rawSub.items?.data?.[0]?.price?.id || ''
        );
        const fields = extractSubFields(rawSub);

        // Build subscription record with organization_id if available
        const subRecord: any = {
          user_id: userId,
          tier: resolvedTier,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          status: subscription.status,
          ...fields,
        };
        if (orgId) {
          subRecord.organization_id = orgId;
        }

        // Upsert using stripe_subscription_id as conflict key (more reliable for Stripe-driven updates)
        const { error: upsertError } = await supabaseAdmin
          .from('subscriptions')
          .upsert(subRecord, {
            onConflict: 'stripe_subscription_id',
            ignoreDuplicates: false,
          });

        if (upsertError) {
          console.error('Failed to upsert subscription:', upsertError);
        } else {
          console.log(`Subscription created/updated for user ${userId}, org ${orgId || 'none'}, tier ${resolvedTier}`);
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const rawSub = event.data.object as any;
        const userId = rawSub.metadata?.user_id;

        const findExistingSub = async (customerId: string) => {
          const { data } = await supabaseAdmin
            .from('subscriptions')
            .select('user_id, organization_id')
            .eq('stripe_customer_id', customerId)
            .maybeSingle();
          return data;
        };

        const existing = userId
          ? null
          : await findExistingSub(rawSub.customer);

        const resolvedUserId = userId || existing?.user_id;
        if (!resolvedUserId) {
          console.error('Subscription event: no user_id found in metadata or DB');
          break;
        }

        const tier = getTierFromPriceId(rawSub.items?.data?.[0]?.price?.id || '');
        const isDeleted = event.type === 'customer.subscription.deleted';
        const fields = extractSubFields(rawSub);

        // Build update — preserve organization_id if already set
        const updateData: any = {
          tier,
          ...fields,
          status: isDeleted ? 'canceled' : (rawSub.status || 'active'),
        };

        // If we have an org_id from the existing record, include it
        if (existing?.organization_id) {
          updateData.organization_id = existing.organization_id;
        } else {
          // Try to look up org_id
          const orgId = await getOrganizationId(resolvedUserId);
          if (orgId) {
            updateData.organization_id = orgId;
          }
        }

        const { error: updateError } = await supabaseAdmin
          .from('subscriptions')
          .update(updateData)
          .eq('user_id', resolvedUserId);

        if (updateError) {
          console.error('Failed to update subscription:', updateError);
        } else {
          console.log(`Subscription ${isDeleted ? 'deleted' : 'updated'} for user ${resolvedUserId}, tier ${tier}`);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const rawInvoice = event.data.object as any;
        const subscriptionId = rawInvoice.subscription;
        if (!subscriptionId) break;

        const { error: invoiceError } = await supabaseAdmin
          .from('subscriptions')
          .update({
            status: 'active',
            current_period_start: rawInvoice.period_start
              ? new Date((rawInvoice.period_start as number) * 1000).toISOString()
              : undefined,
            current_period_end: rawInvoice.period_end
              ? new Date((rawInvoice.period_end as number) * 1000).toISOString()
              : undefined,
          })
          .eq('stripe_subscription_id', subscriptionId);

        if (invoiceError) {
          console.error('Failed to update subscription from invoice:', invoiceError);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const rawFailedInvoice = event.data.object as any;
        const failedSubId = rawFailedInvoice.subscription;
        if (!failedSubId) break;

        const { error: failError } = await supabaseAdmin
          .from('subscriptions')
          .update({ status: 'past_due' })
          .eq('stripe_subscription_id', failedSubId);

        if (failError) {
          console.error('Failed to mark subscription as past_due:', failError);
        }
        break;
      }

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}