import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get aggregated stats
  const { data: summary, error } = await supabase
    .from('marketing_intelligence_summary')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is 'no rows returned'
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get daily stats for charts (last 30 days)
  const { data: dailyMetrics, error: metricsError } = await supabase
    .from('ad_metrics')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: true })
    .limit(30);

  if (metricsError) {
    return NextResponse.json({ error: metricsError.message }, { status: 500 });
  }

  return NextResponse.json({
    summary: summary || {
      total_spend: 0,
      total_impressions: 0,
      total_clicks: 0,
      total_leads: 0,
      total_appointments: 0,
      cost_per_lead: 0,
      cost_per_appointment: 0
    },
    daily: dailyMetrics
  });
}
