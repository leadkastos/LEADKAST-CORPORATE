import { SupabaseClient } from '@supabase/supabase-js';
import { BaseAdapter } from './BaseAdapter';
import { IntegrationMetric, IntegrationLead } from './types';

export class GHLAdapter extends BaseAdapter {
  slug = 'gohighlevel';
  category = 'CRM';

  /**
   * Fetch marketing metrics from GoHighLevel.
   * For Phase 2, this returns mock data but follows the architecture.
   */
  async fetchMetrics(orgId: string, startDate: string, endDate: string, supabase: SupabaseClient): Promise<IntegrationMetric[]> {
    try {
      // In a real implementation:
      // const credentials = await this.getCredentials(orgId, supabase);
      // const response = await fetch(`https://services.gohighlevel.com/reporting/stats?locationId=${credentials.locationId}&startDate=${startDate}&endDate=${endDate}`, {
      //   headers: {
      //     'Authorization': `Bearer ${credentials.accessToken}`,
      //     'Version': '2021-07-28'
      //   }
      // });
      // return mapGHLMetricsToInternal(await response.json());

      console.log(`[GHLAdapter] Fetching metrics for org ${orgId} (${startDate} to ${endDate})`);
      
      // Simulating realistic GHL-style metrics
      return [
        {
          date: new Date().toISOString().split('T')[0],
          spend: 0, 
          impressions: 0,
          clicks: 0,
          leads: Math.floor(Math.random() * 30 + 10),
          appointments: Math.floor(Math.random() * 8 + 1),
        }
      ];
    } catch (error) {
      console.error('[GHLAdapter] Error fetching metrics:', error);
      throw error;
    }
  }

  /**
   * Fetch leads from GoHighLevel.
   */
  async fetchLeads(orgId: string, since?: string, supabase?: SupabaseClient): Promise<IntegrationLead[]> {
    console.log(`[GHLAdapter] Fetching leads for org ${orgId} since ${since}`);
    // Mocking GHL leads
    return [
      {
        externalId: 'ghl_lead_1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        status: 'new',
        source: 'GHL Contact',
        createdAt: new Date().toISOString()
      }
    ];
  }

  /**
   * Perform a full sync of GHL data to our database.
   */
  async sync(orgId: string, supabase: SupabaseClient): Promise<{ success: boolean; message: string; recordsProcessed: number }> {
    try {
      const isConnected = await this.isConnected(orgId, supabase);
      if (!isConnected) {
        return { success: false, message: 'GoHighLevel is not connected for this organization.', recordsProcessed: 0 };
      }

      // 1. Fetch Metrics
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const metrics = await this.fetchMetrics(orgId, startDate, endDate, supabase);

      // 2. Persist Metrics to ad_metrics
      let processedCount = 0;
      for (const metric of metrics) {
        const { error } = await supabase
          .from('ad_metrics')
          .upsert({
            organization_id: orgId,
            integration_id: await this.getIntegrationId(supabase),
            date: metric.date,
            spend: metric.spend,
            impressions: metric.impressions,
            clicks: metric.clicks,
            leads: metric.leads,
            appointments: metric.appointments || 0,
          }, { onConflict: 'organization_id,integration_id,date' });

        if (error) throw error;
        processedCount++;
      }

      // 3. Fetch and Persist Leads (CRM part)
      const leads = await this.fetchLeads(orgId, undefined, supabase);
      for (const lead of leads) {
        const { error } = await supabase
          .from('leads')
          .upsert({
            organization_id: orgId,
            external_id: lead.externalId,
            first_name: lead.firstName,
            last_name: lead.lastName,
            email: lead.email,
            phone: lead.phone,
            status: lead.status,
            source: lead.source,
            created_at: lead.createdAt,
          }, { onConflict: 'organization_id,external_id' });
        
        if (error) {
           console.error('[GHLAdapter] Error upserting lead:', error);
        } else {
          processedCount++;
        }
      }

      return { 
        success: true, 
        message: 'GoHighLevel sync completed successfully.', 
        recordsProcessed: processedCount 
      };
    } catch (error: any) {
      console.error('[GHLAdapter] Sync failed:', error);
      return { 
        success: false, 
        message: `Sync failed: ${error.message}`, 
        recordsProcessed: 0 
      };
    }
  }
}
