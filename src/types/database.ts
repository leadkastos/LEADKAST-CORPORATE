export interface Profile {
  id: string;
  updated_at: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: 'super_admin' | 'business_owner' | 'manager';
  organization_id: string | null;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  created_at: string;
}

export interface Integration {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_url: string | null;
  category: string;
  is_active: boolean;
  created_at: string;
}

export interface OrganizationIntegration {
  id: string;
  organization_id: string;
  user_id: string;
  integration_id: string;
  status: 'active' | 'inactive' | 'error' | 'disconnected';
  credentials: any;
  settings: any;
  last_synced_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SyncLog {
  id: string;
  user_integration_id: string;
  status: 'success' | 'error' | 'in_progress';
  message: string | null;
  error_details: any;
  started_at: string;
  completed_at: string | null;
  records_processed: number;
}

export interface Alert {
  id: string;
  organization_id: string;
  user_id: string;
  title: string;
  description: string | null;
  level: 'critical' | 'warning' | 'info';
  category: string;
  status: 'active' | 'resolved' | 'dismissed';
  metadata: any;
  resolved_at: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  organization_id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  status: string;
  source: string | null;
  last_activity_at: string;
  created_at: string;
}

export interface EngagementLog {
  id: string;
  user_id: string;
  event_type: 'dashboard_login' | 'morning_brief_open' | 'report_download' | 'daily_wrap_open';
  metadata: any;
  created_at: string;
}

export interface ExecutiveAnalyticsKPIs {
  organization_id: string;
  user_id: string;
  connectedness_score: number;
  alert_action_rate: number;
  dashboard_logins: number;
  morning_brief_opens: number;
  total_engagement_score: number;
}
