import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { seedAlertsData } from '@/services/intelligence/seedAlerts';

export async function POST() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { success } = await seedAlertsData(user.id);

  return NextResponse.json({ success });
}
