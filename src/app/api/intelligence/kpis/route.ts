import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/intelligence/kpis
 *
 * Returns org-scoped executive KPIs derived from real Supabase data.
 * Shape matches the existing dashboard KPI cards consumed via useDashboardKpis():
 *   Array<{ label: string; value: string; trend: string; trendType: 'up' | 'down' }>
 *
 * Sources (all real, org-scoped by RLS + explicit filters):
 *   - leads (counts, win rate)
 *   - marketing_intelligence_summary (spend, cost-per-lead)
 *
 * Note: trend values require a prior-period baseline that is not yet tracked,
 * so trend is reported as 'n/a' rather than fabricated. Wiring real trends is a
 * later step; this route intentionally returns only values it can verify.
 */
export async function GET() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();

  if (!profile?.organization_id) {
    return NextResponse.json({ error: 'No organization found' }, { status: 400 });
  }

  const orgId = profile.organization_id;

  // --- Leads: total, won, active ---
  const [{ count: totalLeads }, { count: wonLeads }, { count: activeLeads }] = await Promise.all([
    supabase.from('leads').select('id', { count: 'exact', head: true })
      .eq('organization_id', orgId),
    supabase.from('leads').select('id', { count: 'exact', head: true })
      .eq('organization_id', orgId).eq('status', 'won'),
    supabase.from('leads').select('id', { count: 'exact', head: true })
      .eq('organization_id', orgId).not('status', 'in', '(won,lost,dormant)'),
  ]);

  // --- Marketing summary: spend, cost-per-lead ---
  const { data: summary } = await supabase
    .from('marketing_intelligence_summary')
    .select('total_spend, total_leads, cost_per_lead')
    .eq('organization_id', orgId)
    .maybeSingle();

  const total = totalLeads ?? 0;
  const won = wonLeads ?? 0;
  const active = activeLeads ?? 0;
  const winRate = total > 0 ? (won / total) * 100 : 0;
  const totalSpend = Number(summary?.total_spend ?? 0);
  const cpl = Number(summary?.cost_per_lead ?? 0);

  const kpis = [
    {
      label: 'Active Leads',
      value: active.toLocaleString(),
      trend: 'n/a',
      trendType: 'up' as const,
    },
    {
      label: 'Win Rate',
      value: `${winRate.toFixed(1)}%`,
      trend: 'n/a',
      trendType: 'up' as const,
    },
    {
      label: 'Marketing Spend',
      value: `$${totalSpend.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      trend: 'n/a',
      trendType: 'up' as const,
    },
    {
      label: 'Cost / Lead',
      value: `$${cpl.toFixed(2)}`,
      trend: 'n/a',
      trendType: 'up' as const,
    },
  ];

  return NextResponse.json(kpis);
}
