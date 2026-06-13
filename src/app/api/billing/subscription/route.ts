import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { Subscription, SubscriptionResponse } from '@/types/billing';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/billing/subscription
 *
 * Returns the authenticated user's current subscription status and tier.
 * Now organization-aware — queries by the user's organization.
 *
 * Response:
 *   - 200: { subscription, tier, isActive, isTrialing, isCanceled, willCancel, organizationId }
 *   - 401: Unauthorized
 */
export async function GET() {
  try {
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

    // Get user's organization
    const { data: profile } = await supabase
      .from('profiles')
      .select('organization_id')
      .eq('id', user.id)
      .maybeSingle();

    const orgId = profile?.organization_id;

    // Query subscription — first try by organization_id, fallback to user_id
    let subscription = null;
    if (orgId) {
      const { data: orgSub, error: orgError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('organization_id', orgId)
        .maybeSingle();

      if (orgError && orgError.code !== 'PGRST116') {
        console.error('Subscription fetch error:', orgError);
        return NextResponse.json({ error: orgError.message }, { status: 500 });
      }
      subscription = orgSub;
    }

    // Fallback: try by user_id if no org subscription found
    if (!subscription) {
      const { data: userSub, error: userError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (userError && userError.code !== 'PGRST116') {
        console.error('Subscription fetch error:', userError);
        return NextResponse.json({ error: userError.message }, { status: 500 });
      }
      subscription = userSub;
    }

    const sub = subscription as Subscription | null;

    const response: SubscriptionResponse & { organizationId?: string | null } = {
      subscription: sub,
      tier: sub?.tier || 'free',
      isActive: sub?.status === 'active' || sub?.status === 'trialing',
      isTrialing: sub?.status === 'trialing',
      isCanceled: sub?.status === 'canceled',
      willCancel: sub?.cancel_at_period_end ?? false,
      organizationId: orgId,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error('Subscription GET error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}