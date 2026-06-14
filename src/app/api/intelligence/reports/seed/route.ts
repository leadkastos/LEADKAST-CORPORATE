import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { seedReportingData } from '@/services/intelligence/seedReports';

export async function POST() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await seedReportingData(user.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error seeding reporting data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
