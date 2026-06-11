import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/services/intelligence/analyticsService';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type') || 'morning_brief_open';
    const redirectUrl = searchParams.get('redirect') || '/';

    // Log the engagement event
    // Note: We don't await here to make the redirect faster, 
    // or we can await if we want to ensure it's logged.
    await analyticsService.logEngagementEvent(type as any);

    // Redirect to the target URL (usually dashboard)
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  } catch (error) {
    console.error('Tracking Error:', error);
    // Even if tracking fails, try to redirect
    return NextResponse.redirect(new URL('/', req.url));
  }
}
