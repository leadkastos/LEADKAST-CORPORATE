import { SupabaseClient } from '@supabase/supabase-js';
import { adapterRegistry } from './AdapterRegistry';

export class IntegrationService {
  async syncAllForOrganization(orgId: string, supabase: SupabaseClient) {
    const { data: integrations, error } = await supabase
      .from('organization_integrations')
      .select('*, integrations(slug)')
      .eq('organization_id', orgId)
      .eq('status', 'active');

    if (error) {
      console.error('Error fetching active integrations:', error);
      return;
    }

    const results = [];
    for (const oi of integrations) {
      const slug = (oi.integrations as any)?.slug;
      if (!slug) continue;

      const adapter = adapterRegistry.getAdapter(slug);
      if (adapter) {
        console.log(`Syncing ${slug} for org ${orgId}`);
        const result = await adapter.sync(orgId, supabase);
        results.push({ slug, ...result });

        // Log to sync_logs
        await supabase.from('sync_logs').insert({
          user_integration_id: oi.id,
          status: result.success ? 'success' : 'error',
          message: result.message,
          records_processed: result.recordsProcessed,
          completed_at: new Date().toISOString()
        });
      } else {
        console.warn(`No adapter found for ${slug}`);
      }
    }

    return results;
  }
}

export const integrationService = new IntegrationService();
