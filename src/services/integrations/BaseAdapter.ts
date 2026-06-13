import { SupabaseClient } from '@supabase/supabase-js';
import { IIntegrationAdapter, IntegrationMetric, IntegrationLead } from './types';

export abstract class BaseAdapter implements IIntegrationAdapter {
  abstract slug: string;
  abstract category: string;

  async isConnected(orgId: string, supabase: SupabaseClient): Promise<boolean> {
    const { data, error } = await supabase
      .from('organization_integrations')
      .select('status')
      .eq('organization_id', orgId)
      .eq('integration_id', (await this.getIntegrationId(supabase)))
      .single();

    if (error || !data) return false;
    return data.status === 'active';
  }

  protected async getIntegrationId(supabase: SupabaseClient): Promise<string> {
    const { data, error } = await supabase
      .from('integrations')
      .select('id')
      .eq('slug', this.slug)
      .single();

    if (error || !data) throw new Error(`Integration ${this.slug} not found`);
    return data.id;
  }

  protected async getCredentials(orgId: string, supabase: SupabaseClient): Promise<any> {
    const { data, error } = await supabase
      .from('organization_integrations')
      .select('credentials')
      .eq('organization_id', orgId)
      .eq('integration_id', (await this.getIntegrationId(supabase)))
      .single();

    if (error || !data) throw new Error(`Credentials not found for ${this.slug} and org ${orgId}`);
    return data.credentials;
  }

  abstract sync(orgId: string, supabase: SupabaseClient): Promise<{ success: boolean; message: string; recordsProcessed: number }>;
}
