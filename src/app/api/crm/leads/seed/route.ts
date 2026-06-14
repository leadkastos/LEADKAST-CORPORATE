import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { generateMockLeads } from '@/services/crm/leadService';

export async function POST(request: Request) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();

  if (!profile?.organization_id) {
    return NextResponse.json({ error: 'No organization found' }, { status: 400 });
  }

  const { success, error } = await generateMockLeads(profile.organization_id, user.id);

  if (!success) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'Mock leads generated' });
}
