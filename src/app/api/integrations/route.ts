import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

/**
 * GET /api/integrations
 * Returns the status of all integrations for the user's organization.
 */
export async function GET() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get user profile to find organization_id
  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();

  if (!profile?.organization_id) {
    return NextResponse.json({ error: 'No organization found' }, { status: 400 });
  }

  const orgId = profile.organization_id;

  // Get all possible integrations
  const { data: allIntegrations, error: integrationsError } = await supabase
    .from('integrations')
    .select('*');

  if (integrationsError) {
    return NextResponse.json({ error: integrationsError.message }, { status: 500 });
  }

  // Get active integrations for this organization
  const { data: activeIntegrations, error: activeError } = await supabase
    .from('organization_integrations')
    .select('*')
    .eq('organization_id', orgId);

  if (activeError) {
    return NextResponse.json({ error: activeError.message }, { status: 500 });
  }

  // Map them together
  const results = allIntegrations.map(integration => {
    const active = activeIntegrations.find(ai => ai.integration_id === integration.id);
    return {
      id: integration.id,
      name: integration.name,
      slug: integration.slug,
      category: integration.category,
      description: integration.description,
      status: active ? (active.status === 'active' ? 'connected' : 'error') : 'disconnected',
      lastSync: active?.last_synced_at ? new Date(active.last_synced_at).toLocaleString() : 'Never'
    };
  });

  return NextResponse.json({ integrations: results });
}
