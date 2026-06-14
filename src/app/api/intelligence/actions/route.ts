import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { getActionItems, refreshActionItems } from '@/services/intelligence/actionCenter';

export async function GET(request: Request) {
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

  // Refresh actions before fetching
  await refreshActionItems(profile.organization_id, user.id);

  const { data, error } = await getActionItems(profile.organization_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ actions: data });
}
