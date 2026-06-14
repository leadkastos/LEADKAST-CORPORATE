import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { refreshAlerts } from '@/services/intelligence/alertService';

export async function POST() {
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

  const { success, count } = await refreshAlerts(profile.organization_id, user.id);

  if (!success) {
    return NextResponse.json({ error: 'Failed to refresh alerts' }, { status: 500 });
  }

  return NextResponse.json({ success: true, count });
}
