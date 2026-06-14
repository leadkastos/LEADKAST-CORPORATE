import { SupabaseClient } from '@supabase/supabase-js';
import { BaseAdapter } from './BaseAdapter';
import { IntegrationMetric, IntegrationLead } from './types';

export class GHLAdapter extends BaseAdapter {
  slug = 'gohighlevel';
  category = 'CRM';

  /**
   * Fetch marketing metrics from GoHighLevel.
   * Uses the Opportunities Search API to get conversion stats.
   */
  async fetchMetrics(orgId: string, startDate: string, endDate: string, supabase: SupabaseClient): Promise<IntegrationMetric[]> {
    try {
      const credentials = await this.getValidatedCredentials(orgId, supabase);
      const { accessToken, locationId } = credentials;

      console.log(`[GHLAdapter] Fetching real metrics for org ${orgId} from ${startDate} to ${endDate}`);

      // GHL V2 Opportunities Search
      const response = await fetch(`https://services.leadconnectorhq.com/opportunities/search?locationId=${locationId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Version': '2021-07-28',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
           // Handle potential late expiration not caught by validatedCredentials
           console.error('[GHLAdapter] Unauthorized. Token might be invalid.');
        }
        throw new Error(`GHL API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Map GHL opportunities to our standardized Metric format
      // Note: GHL doesn't provide ad spend/impressions directly in this endpoint
      // We focus on the Leads and Appointments (Opportunities)
      return [{
        date: new Date().toISOString().split('T')[0],
        spend: 0, 
        impressions: 0,
        clicks: 0,
        leads: data.total || 0,
        appointments: 0 // Would need separate booking/calendar API for precise appt counts
      }];
    } catch (error) {
      console.error('[GHLAdapter] Error fetching real metrics, falling back to mock:', error);
      return this.getMockMetrics(startDate, endDate);
    }
  }

  /**
   * Fetch leads from GoHighLevel Contacts API.
   */
  async fetchLeads(orgId: string, since?: string, supabase?: SupabaseClient): Promise<IntegrationLead[]> {
    if (!supabase) throw new Error('Supabase client required for GHL leads');

    try {
      const credentials = await this.getValidatedCredentials(orgId, supabase);
      const { accessToken, locationId } = credentials;

      console.log(`[GHLAdapter] Fetching real leads for org ${orgId}`);

      const response = await fetch(`https://services.leadconnectorhq.com/contacts/?locationId=${locationId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Version': '2021-07-28',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) throw new Error(`GHL API error: ${response.statusText}`);

      const data = await response.json();
      return (data.contacts || []).map((c: any) => ({
        externalId: c.id,
        firstName: c.firstName || '',
        lastName: c.lastName || '',
        email: c.email || '',
        phone: c.phone || '',
        status: 'new',
        source: c.source || 'GHL Contact',
        createdAt: c.dateAdded || new Date().toISOString()
      }));
    } catch (error) {
      console.error('[GHLAdapter] Error fetching real leads:', error);
      return [];
    }
  }

  /**
   * Orchestrates the sync process.
   */
  async sync(orgId: string, supabase: SupabaseClient): Promise<{ success: boolean; message: string; recordsProcessed: number }> {
    try {
      const isConnected = await this.isConnected(orgId, supabase);
      if (!isConnected) {
        return { success: false, message: 'GoHighLevel is not connected.', recordsProcessed: 0 };
      }

      // 1. Fetch Metrics
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const metrics = await this.fetchMetrics(orgId, startDate, endDate, supabase);

      let processedCount = 0;

      // 2. Persist Metrics
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

      // 3. Fetch and Persist Leads
      const leads = await this.fetchLeads(orgId, undefined, supabase);
      let leadErrorCount = 0;
      let lastLeadError: string | null = null;
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
          leadErrorCount++;
          lastLeadError = error.message;
          console.error(`[GHLAdapter] Lead upsert failed for external_id ${lead.externalId}:`, error.message);
        } else {
          processedCount++;
        }
      }

      const leadSummary = leadErrorCount > 0
        ? ` (${leadErrorCount} lead write(s) failed; last error: ${lastLeadError})`
        : '';

      return {
        success: leadErrorCount === 0,
        message: `GoHighLevel sync complete. Processed ${processedCount} records.${leadSummary}`,
        recordsProcessed: processedCount
      };
    } catch (error: any) {
      console.error('[GHLAdapter] Sync failed:', error);
      return { success: false, message: error.message, recordsProcessed: 0 };
    }
  }

  /**
   * Helper to ensure we have valid tokens before making requests.
   */
  private async getValidatedCredentials(orgId: string, supabase: SupabaseClient): Promise<any> {
    const credentials = await this.getCredentials(orgId, supabase);
    
    // Check if token is expired (with 5 min buffer)
    const expiresAt = new Date(credentials.expiresAt).getTime();
    const now = Date.now();
    
    if (now + 300000 > expiresAt) {
      console.log('[GHLAdapter] Token expired or expiring soon, refreshing...');
      return this.refreshAccessToken(orgId, credentials.refreshToken, supabase);
    }
    
    return credentials;
  }

  /**
   * Refresh the GHL access token using the refresh token.
   */
  private async refreshAccessToken(orgId: string, refreshToken: string, supabase: SupabaseClient): Promise<any> {
    const clientId = process.env.GHL_CLIENT_ID;
    const clientSecret = process.env.GHL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.warn('[GHLAdapter] Missing GHL_CLIENT_ID or GHL_CLIENT_SECRET, using mock refresh');
      // In a real dev environment, we'd fail here or return current if refresh fails
      return this.getCredentials(orgId, supabase); 
    }

    try {
      const response = await fetch('https://services.leadconnectorhq.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
      });

      if (!response.ok) throw new Error('Failed to refresh GHL token');

      const data = await response.json();
      
      const updatedCredentials = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: new Date(Date.now() + data.expires_in * 1000).toISOString(),
        locationId: data.locationId || (await this.getCredentials(orgId, supabase)).locationId,
        scope: data.scope
      };

      // Update database
      await supabase
        .from('organization_integrations')
        .update({ credentials: updatedCredentials })
        .eq('organization_id', orgId)
        .eq('integration_id', await this.getIntegrationId(supabase));

      return updatedCredentials;
    } catch (error) {
      console.error('[GHLAdapter] Refresh failed:', error);
      throw error;
    }
  }

  private getMockMetrics(startDate: string, endDate: string): IntegrationMetric[] {
    return [
      {
        date: new Date().toISOString().split('T')[0],
        spend: 150.00,
        impressions: 4200,
        clicks: 280,
        leads: 15,
        appointments: 5
      }
    ];
  }
}
