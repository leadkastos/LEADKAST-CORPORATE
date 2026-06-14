import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { getExecutiveReport } from '@/services/intelligence/reportingService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeframe = (searchParams.get('timeframe') as '7d' | '30d' | 'mtd') || '7d';

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

  try {
    const stats = await getExecutiveReport(profile.organization_id, timeframe);
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error in reports API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
