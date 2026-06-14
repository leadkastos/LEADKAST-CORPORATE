import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { syncMarketingData } from '@/services/marketing/mockAdService';

export async function POST(request: Request) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Resolve the user's organization (integrations are org-scoped after the
  // multi-tenant transition; user_integrations was renamed to
  // organization_integrations).
  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();

  if (!profile?.organization_id) {
    return NextResponse.json({ error: 'No organization found' }, { status: 400 });
  }

  // Get active marketing integrations for this organization
  const { data: orgIntegrations, error } = await supabase
    .from('organization_integrations')
    .select('*, integrations!inner(*)')
    .eq('organization_id', profile.organization_id)
    .eq('status', 'active')
    .in('integrations.slug', ['meta-ads', 'google-ads']);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results = [];
  for (const oi of orgIntegrations) {
    const res = await syncMarketingData(profile.organization_id, user.id, oi.integration_id, oi.integrations.slug);
    results.push({
      integration: oi.integrations.slug,
      ...res
    });
  }

  return NextResponse.json({ results });
}
