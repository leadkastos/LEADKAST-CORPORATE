import { NextResponse } from 'next/server';
import { analyticsService } from '@/services/intelligence/analyticsService';

export async function GET() {
  try {
    const kpis = await analyticsService.getBusinessHealthKPIs();
    return NextResponse.json(kpis);
  } catch (error) {
    console.error('API Error (Analytics Health):', error);
    return NextResponse.json({ error: 'Failed to fetch executive analytics' }, { status: 500 });
  }
}
