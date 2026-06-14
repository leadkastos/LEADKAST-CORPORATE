import { SupabaseClient } from '@supabase/supabase-js';

export interface IntegrationMetric {
  date: string;
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  appointments?: number;
}

export interface IntegrationLead {
  externalId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  createdAt: string;
}

export interface IIntegrationAdapter {
  slug: string;
  category: string;
  
  // Auth
  isConnected(orgId: string, supabase: SupabaseClient): Promise<boolean>;
  
  // Marketing
  fetchMetrics?(orgId: string, startDate: string, endDate: string, supabase: SupabaseClient): Promise<IntegrationMetric[]>;
  
  // CRM
  fetchLeads?(orgId: string, since?: string, supabase?: SupabaseClient): Promise<IntegrationLead[]>;
  
  // Sync
  sync(orgId: string, supabase: SupabaseClient): Promise<{ success: boolean; message: string; recordsProcessed: number }>;
}
