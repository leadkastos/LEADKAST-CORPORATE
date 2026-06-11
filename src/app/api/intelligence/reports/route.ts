import { createRouteHandlerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getExecutiveReport } from '@/services/intelligence/reportingService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeframe = (searchParams.get('timeframe') as '7d' | '30d' | 'mtd') || '7d';

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const stats = await getExecutiveReport(user.id, timeframe);
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error in reports API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
