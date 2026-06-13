import { createClient } from '@/lib/supabase';
import { Alert, Lead } from '@/types/database';

export const refreshAlerts = async (orgId: string, userId: string) => {
  const supabase = createClient();
  const alerts: Partial<Alert>[] = [];
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  // 1. Untouched Leads Alert
  const twentyFourHoursAgo = new Date(now);
  twentyFourHoursAgo.setHours(now.getHours() - 24);

  const { data: untouchedLeads } = await supabase
    .from('leads')
    .select('*')
    .eq('organization_id', orgId)
    .eq('status', 'new')
    .lt('created_at', twentyFourHoursAgo.toISOString());

  if (untouchedLeads && untouchedLeads.length > 0) {
    alerts.push({
      organization_id: orgId,
      user_id: userId,
      title: 'Untouched Leads',
      description: `You have ${untouchedLeads.length} leads that haven't been contacted in over 24 hours.`,
      level: 'critical',
      category: 'untouched_leads',
      status: 'active',
      metadata: { count: untouchedLeads.length }
    });
  }

  // 2. Stalled Opportunities Alert
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const { data: stalledLeads } = await supabase
    .from('leads')
    .select('*')
    .eq('organization_id', orgId)
    .in('status', ['spoke', 'qualified'])
    .lt('last_activity_at', sevenDaysAgo.toISOString());

  if (stalledLeads && stalledLeads.length > 0) {
    alerts.push({
      organization_id: orgId,
      user_id: userId,
      title: 'Stalled Opportunities',
      description: `${stalledLeads.length} opportunities have had no activity for over 7 days.`,
      level: 'warning',
      category: 'stalled_opportunity',
      status: 'active',
      metadata: { count: stalledLeads.length }
    });
  }

  // 3. Marketing KPI Alerts
  const { data: metrics } = await supabase
    .from('ad_metrics')
    .select('*')
    .eq('organization_id', orgId)
    .order('date', { ascending: false })
    .limit(7);

  if (metrics && metrics.length >= 2) {
    const todayMetric = metrics[0];
    const yesterdayMetric = metrics[1];

    // CPL Increase check
    const todayCPL = todayMetric.leads > 0 ? todayMetric.spend / todayMetric.leads : 0;
    const yesterdayCPL = yesterdayMetric.leads > 0 ? yesterdayMetric.spend / yesterdayMetric.leads : 0;

    if (todayCPL > yesterdayCPL * 1.5 && todayCPL > 0) {
      alerts.push({
        organization_id: orgId,
        user_id: userId,
        title: 'Cost Per Lead Increase',
        description: `Your CPL has increased by over 50% compared to yesterday.`,
        level: 'warning',
        category: 'cpl_increase',
        status: 'active',
        metadata: { increase: (todayCPL / yesterdayCPL - 1) * 100 }
      });
    }

    // Revenue/Spend Drop check
    if (todayMetric.spend < yesterdayMetric.spend * 0.5) {
      alerts.push({
        organization_id: orgId,
        user_id: userId,
        title: 'Significant Revenue/Spend Drop',
        description: `Your ad spend/revenue has dropped by more than 50% compared to yesterday.`,
        level: 'critical',
        category: 'revenue_drop',
        status: 'active',
        metadata: { drop: (1 - todayMetric.spend / yesterdayMetric.spend) * 100 }
      });
    }
  }

  // 4. Negative Reviews Alert
  const { data: negativeReviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('organization_id', orgId)
    .lt('rating', 3)
    .gte('created_at', yesterday.toISOString());

  if (negativeReviews && negativeReviews.length > 0) {
    alerts.push({
      organization_id: orgId,
      user_id: userId,
      title: 'Negative Reviews Received',
      description: `You received ${negativeReviews.length} negative reviews since yesterday.`,
      level: 'critical',
      category: 'negative_review',
      status: 'active',
      metadata: { count: negativeReviews.length }
    });
  }

  // 5. No Shows Alert
  const { data: noShows } = await supabase
    .from('appointments')
    .select('*')
    .eq('organization_id', orgId)
    .eq('status', 'no_show')
    .gt('scheduled_at', yesterday.toISOString());

  if (noShows && noShows.length > 0) {
    alerts.push({
      organization_id: orgId,
      user_id: userId,
      title: 'Appointment No-Shows',
      description: `${noShows.length} prospects did not show up for their appointments since yesterday.`,
      level: 'warning',
      category: 'no_show',
      status: 'active',
      metadata: { count: noShows.length }
    });
  }

  // 6. Reactivation Opportunities
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const { data: reactivationLeads } = await supabase
    .from('leads')
    .select('*')
    .eq('organization_id', orgId)
    .in('status', ['lost', 'dormant'])
    .lt('last_activity_at', thirtyDaysAgo.toISOString());

  if (reactivationLeads && reactivationLeads.length > 0) {
    alerts.push({
      organization_id: orgId,
      user_id: userId,
      title: 'Reactivation Opportunities',
      description: `You have ${reactivationLeads.length} past leads who could be re-engaged for new business.`,
      level: 'info',
      category: 'reactivation',
      status: 'active',
      metadata: { count: reactivationLeads.length }
    });
  }

  if (alerts.length > 0) {
    // Basic deduplication: don't add the same category if an active one exists
    const { data: existingActive } = await supabase
      .from('alerts')
      .select('category')
      .eq('organization_id', orgId)
      .eq('status', 'active');

    const activeCategories = new Set(existingActive?.map(a => a.category) || []);
    const newAlerts = alerts.filter(a => !activeCategories.has(a.category!));

    if (newAlerts.length > 0) {
      const { error } = await supabase.from('alerts').insert(newAlerts);
      if (error) console.error('Error inserting alerts:', error);
    }
  }

  return { success: true, count: alerts.length };
};

export const getActiveAlerts = async (orgId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('organization_id', orgId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  return { data, error };
};

export const resolveAlert = async (alertId: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from('alerts')
    .update({ 
      status: 'resolved', 
      resolved_at: new Date().toISOString() 
    })
    .eq('id', alertId);

  return { success: !error, error };
};
