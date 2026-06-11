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
 * Used by the frontend to determine feature gating.
 *
 * Response:
 *   - 200: { subscription, tier, isActive, isTrialing, isCanceled, willCancel }
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

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('Subscription fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const sub = subscription as Subscription | null;

    const response: SubscriptionResponse = {
      subscription: sub,
      tier: sub?.tier || 'free',
      isActive: sub?.status === 'active' || sub?.status === 'trialing',
      isTrialing: sub?.status === 'trialing',
      isCanceled: sub?.status === 'canceled',
      willCancel: sub?.cancel_at_period_end ?? false,
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