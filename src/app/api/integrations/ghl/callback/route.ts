import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

/**
 * Handle GHL OAuth callback.
 * Exchanges the code for a token and saves it to the database.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get user profile to find organization_id
  const { data: profile } = await supabase
    .from('profiles')
    .select('organization_id')
    .eq('id', user.id)
    .single();

  if (!profile?.organization_id) {
    return NextResponse.json({ error: 'No organization found' }, { status: 400 });
  }

  const orgId = profile.organization_id;

  // In production: Exchange code for token with GHL API
  // const response = await fetch('https://services.gohighlevel.com/oauth/token', {
  //   method: 'POST',
  //   body: new URLSearchParams({
  //     client_id: process.env.GHL_CLIENT_ID!,
  //     client_secret: process.env.GHL_CLIENT_SECRET!,
  //     grant_type: 'authorization_code',
  //     code,
  //     redirect_uri: process.env.GHL_REDIRECT_URI!
  //   })
  // });
  // const tokens = await response.json();

  // For mock:
  const mockTokens = {
    accessToken: 'mock_access_token_' + Math.random().toString(36).substring(7),
    refreshToken: 'mock_refresh_token_' + Math.random().toString(36).substring(7),
    expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    locationId: 'mock_location_id_123',
    scope: 'contacts.readonly opportunities.readonly'
  };

  // Get integration id for GHL
  const { data: integration } = await supabase
    .from('integrations')
    .select('id')
    .eq('slug', 'gohighlevel')
    .single();

  if (!integration) {
    return NextResponse.json({ error: 'GHL integration not found in database' }, { status: 500 });
  }

  // Save/Update organization integration
  const { error } = await supabase
    .from('organization_integrations')
    .upsert({
      organization_id: orgId,
      integration_id: integration.id,
      status: 'active',
      credentials: mockTokens,
      last_synced_at: null
    }, { onConflict: 'organization_id,integration_id' });

  if (error) {
    console.error('Error saving GHL credentials:', error);
    return NextResponse.json({ error: 'Failed to save integration' }, { status: 500 });
  }

  // Redirect back to integrations page
  return NextResponse.redirect(new URL('/integrations', request.url));
}
