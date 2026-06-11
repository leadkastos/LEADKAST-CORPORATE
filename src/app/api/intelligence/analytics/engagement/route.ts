import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/services/intelligence/analyticsService';

export async function POST(req: NextRequest) {
  try {
    const { eventType, metadata } = await req.json();

    if (!eventType) {
      return NextResponse.json({ error: 'eventType is required' }, { status: 400 });
    }

    await analyticsService.logEngagementEvent(eventType, metadata);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error (Engagement Logging):', error);
    return NextResponse.json({ error: 'Failed to log engagement event' }, { status: 500 });
  }
}
