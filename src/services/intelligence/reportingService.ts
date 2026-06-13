import { createClient } from '@/lib/supabase';
import { startOfDay, subDays, startOfMonth, endOfDay } from 'date-fns';

export interface ReportStats {
  period: string;
  total_spend: number;
  total_leads: number;
  total_appointments: number;
  total_won_leads: number;
  revenue: number;
  roas: number;
  cpl: number;
  conversion_rate_lead_to_app: number;
  conversion_rate_app_to_won: number;
  action_completion_rate: number;
}

export const getExecutiveReport = async (orgId: string, timeframe: '7d' | '30d' | 'mtd') => {
  const supabase = createClient();
  const now = new Date();
  let startDate: Date;

  if (timeframe === '7d') {
    startDate = startOfDay(subDays(now, 7));
  } else if (timeframe === '30d') {
    startDate = startOfDay(subDays(now, 30));
  } else {
    startDate = startOfMonth(now);
  }

  const endDate = endOfDay(now);

  // 1. Fetch Ad Metrics
  const { data: metrics } = await supabase
    .from('ad_metrics')
    .select('spend, leads, appointments')
    .eq('organization_id', orgId)
    .gte('date', startDate.toISOString().split('T')[0])
    .lte('date', endDate.toISOString().split('T')[0]);

  const totalSpend = metrics?.reduce((acc, m) => acc + Number(m.spend), 0) || 0;

  // 2. Fetch Leads data
  const { data: leads } = await supabase
    .from('leads')
    .select('status, created_at, value')
    .eq('organization_id', orgId)
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  const totalLeads = leads?.length || 0;
  const wonLeadsData = leads?.filter(l => l.status === 'won') || [];
  const wonLeads = wonLeadsData.length;

  // 3. Fetch Appointments
  const { data: appointments } = await supabase
    .from('appointments')
    .select('status, scheduled_at')
    .eq('organization_id', orgId)
    .gte('scheduled_at', startDate.toISOString())
    .lte('scheduled_at', endDate.toISOString());

  const totalAppointments = appointments?.length || 0;

  // 4. Fetch Action Items
  const { data: actions } = await supabase
    .from('action_items')
    .select('status, created_at')
    .eq('organization_id', orgId)
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString());

  const totalActions = actions?.length || 0;
  const completedActions = actions?.filter(a => a.status === 'completed').length || 0;

  // Calculate Revenue
  // Use actual lead values if present, otherwise fallback to $500 multiplier
  const actualRevenue = wonLeadsData.reduce((acc, l) => acc + Number(l.value || 0), 0);
  const revenue = actualRevenue > 0 ? actualRevenue : wonLeads * 500;

  // Calculate KPIs
  const roas = totalSpend > 0 ? revenue / totalSpend : 0;
  const cpl = totalLeads > 0 ? totalSpend / totalLeads : 0;
  const leadToAppRate = totalLeads > 0 ? (totalAppointments / totalLeads) * 100 : 0;
  const appToWonRate = totalAppointments > 0 ? (wonLeads / totalAppointments) * 100 : 0;
  const actionRate = totalActions > 0 ? (completedActions / totalActions) * 100 : 0;

  return {
    period: timeframe,
    total_spend: totalSpend,
    total_leads: totalLeads,
    total_appointments: totalAppointments,
    total_won_leads: wonLeads,
    revenue,
    roas,
    cpl,
    conversion_rate_lead_to_app: leadToAppRate,
    conversion_rate_app_to_won: appToWonRate,
    action_completion_rate: actionRate,
  };
};

export const generateMockPDFReport = async (stats: ReportStats) => {
  // In a real app, we would use something like jspdf or a server-side PDF generator
  // For now, we return a simulated PDF URL or base64
  console.log('Generating PDF for stats:', stats);
  
  return {
    url: `/api/reports/download-mock?period=${stats.period}`,
    filename: `executive-report-${stats.period}-${new Date().toISOString().split('T')[0]}.pdf`
  };
};
