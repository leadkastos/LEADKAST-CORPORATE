import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { integrationService } from '@/services/integrations/IntegrationService';

export async function POST(request: Request) {
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

  const results = await integrationService.syncAllForOrganization(profile.organization_id, supabase);

  return NextResponse.json({ success: true, results });
}
