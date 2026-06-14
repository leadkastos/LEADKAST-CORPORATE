import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get user profile to find organization_id
  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();

  if (!profile?.organization_id) {
    return NextResponse.json({ error: 'No organization found' }, { status: 400 });
  }

  const orgId = profile.organization_id;

  // Get aggregated stats
  const { data: summary, error } = await supabase
    .from('marketing_intelligence_summary')
    .select('*')
    .eq('organization_id', orgId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is 'no rows returned'
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Get daily stats for charts (last 30 days)
  const { data: dailyMetrics, error: metricsError } = await supabase
    .from('ad_metrics')
    .select('*')
    .eq('organization_id', orgId)
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
