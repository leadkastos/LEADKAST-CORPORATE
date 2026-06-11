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
    
    // In a real app, we would use a PDF lib here.
    // For now, we'll return a simple text file with a .pdf extension 
    // to simulate the download behavior.
    
    const reportText = `
LEADKAST OS - EXECUTIVE SUMMARY
-------------------------------
Period: ${timeframe}
Generated: ${new Date().toLocaleString()}

MARKETING PERFORMANCE:
Total Spend: $${stats.total_spend.toFixed(2)}
Total Leads: ${stats.total_leads}
Cost Per Lead: $${stats.cpl.toFixed(2)}

SALES PERFORMANCE:
Total Appointments: ${stats.total_appointments}
Won Leads: ${stats.total_won_leads}
Lead -> App Conversion: ${stats.conversion_rate_lead_to_app.toFixed(2)}%
App -> Won Conversion: ${stats.conversion_rate_app_to_won.toFixed(2)}%

FINANCIALS:
Estimated Revenue: $${stats.revenue.toFixed(2)}
ROAS: ${stats.roas.toFixed(2)}x

EXECUTIVE ACTIONS:
Completion Rate: ${stats.action_completion_rate.toFixed(2)}%
    `;

    return new Response(reportText, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="executive-report-${timeframe}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
