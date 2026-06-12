import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { getPriceId } from '@/lib/plans';
import type { SubscriptionTier } from '@/lib/plans';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/billing/create-checkout
 *
 * Creates a Stripe Checkout Session for subscription purchase/upgrade.
 *
 * Body:
 *   - tier: 'pro' | 'business' (the plan to subscribe to)
 *   - interval: 'month' | 'year' (optional, default: 'month')
 *   - successUrl: string (optional, defaults to /settings/billing)
 *   - cancelUrl: string (optional, defaults to /settings/billing)
 *
 * Response:
 *   - 200: { url: checkoutUrl }
 *   - 400: Missing parameters
 *   - 401: Unauthorized
 *   - 500: Stripe not configured
 */
export async function POST(request: Request) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Set STRIPE_SECRET_KEY environment variable.' },
        { status: 500 }
      );
    }

    // Authenticate user
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value; },
          set(name: string, value: string, options: CookieOptions) { cookieStore.set({ name, value, ...options }); },
          remove(name: string, options: CookieOptions) { cookieStore.set({ name, value: '', ...options }); },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const tier = body.tier as SubscriptionTier;
    const interval: 'month' | 'year' = body.interval || 'month';
    const successUrl = body.successUrl || `${request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/settings/billing?success=true`;
    const cancelUrl = body.cancelUrl || `${request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/settings/billing?canceled=true`;

    if (!tier || !['pro', 'business'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier. Must be "pro" or "business".' },
        { status: 400 }
      );
    }

    const priceId = getPriceId(tier, interval);
    if (!priceId) {
      return NextResponse.json(
        { error: `No Stripe Price ID configured for ${tier} ${interval}` },
        { status: 500 }
      );
    }

    // Get or create Stripe customer
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle();

    let customerId: string | undefined = existingSubscription?.stripe_customer_id || undefined;

    // If no existing customer, create one via checkout (Stripe will handle customer creation)

    const session = await stripe!.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      client_reference_id: user.id,
      metadata: {
        user_id: user.id,
        tier,
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
          tier,
        },
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
    }

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error('Checkout session error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}