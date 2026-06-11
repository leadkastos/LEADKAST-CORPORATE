import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { syncMarketingData } from '@/services/marketing/mockAdService';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get active marketing integrations for this user
  const { data: userIntegrations, error } = await supabase
    .from('user_integrations')
    .select('*, integrations!inner(*)')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .in('integrations.slug', ['meta-ads', 'google-ads']);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results = [];
  for (const ui of userIntegrations) {
    const res = await syncMarketingData(user.id, ui.integration_id, ui.integrations.slug);
    results.push({
      integration: ui.integrations.slug,
      ...res
    });
  }

  return NextResponse.json({ results });
}
