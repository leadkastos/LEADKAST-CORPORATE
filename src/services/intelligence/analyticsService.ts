import { supabase } from '@/lib/supabase';

export interface BusinessHealthKPIs {
  connectednessScore: number;
  alertActionRate: number;
  dashboardLogins: number;
  morningBriefOpens: number;
  totalEngagementScore: number;
}

export const analyticsService = {
  /**
   * Fetch core business health KPIs for the current user
   */
  async getBusinessHealthKPIs(): Promise<BusinessHealthKPIs | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('executive_analytics_kpis')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching executive KPIs:', error);
      // If no data yet, return defaults
      return {
        connectednessScore: 0,
        alertActionRate: 0,
        dashboardLogins: 0,
        morningBriefOpens: 0,
        totalEngagementScore: 0
      };
    }

    return {
      connectednessScore: data.connectedness_score || 0,
      alertActionRate: data.alert_action_rate || 0,
      dashboardLogins: data.dashboard_logins || 0,
      morningBriefOpens: data.morning_brief_opens || 0,
      totalEngagementScore: data.total_engagement_score || 0
    };
  },

  /**
   * Log an executive engagement event
   */
  async logEngagementEvent(eventType: 'dashboard_login' | 'morning_brief_open' | 'report_download' | 'daily_wrap_open', metadata: any = {}) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('engagement_logs')
      .insert({
        user_id: user.id,
        event_type: eventType,
        metadata
      });

    if (error) {
      console.error('Error logging engagement event:', error);
    }
  }
};
