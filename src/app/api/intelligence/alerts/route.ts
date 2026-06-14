import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { getActiveAlerts } from '@/services/intelligence/alertService';

export async function GET() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await getActiveAlerts(user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ alerts: data });
}
