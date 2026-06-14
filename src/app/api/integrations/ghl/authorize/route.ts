import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

/**
 * Mock GET handler to initiate GHL OAuth flow.
 * In production, this would redirect to GHL's OAuth page.
 */
export async function GET(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // GHL OAuth URL (simplified for mock)
  const ghlAuthUrl = 'https://app.gohighlevel.com/oauth/chooselocation?response_type=code&client_id=MOCK_CLIENT_ID&redirect_uri=MOCK_REDIRECT_URI&scope=contacts.readonly opportunities.readonly';
  
  // For the mock flow, we'll just redirect to our own callback with a fake code
  const callbackUrl = new URL('/api/integrations/ghl/callback', request.url);
  callbackUrl.searchParams.set('code', 'mock_ghl_code_' + Math.random().toString(36).substring(7));
  
  return NextResponse.redirect(callbackUrl);
}
