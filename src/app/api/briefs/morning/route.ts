import { NextResponse } from 'next/server';
import { resend, isResendConfigured } from '@/lib/resend';
import { renderMorningBriefHtml } from '@/lib/email-templates';
import { generateMorningBriefData } from '@/services/briefs/mockBriefData';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/briefs/morning
 *
 * Triggers the Morning Brief email delivery.
 * Designed to be called by a cron job scheduler (e.g. Vercel Cron, cron-job.org)
 * at ~8:00 AM.
 *
 * Body (optional):
 *   - email: recipient email address
 *   - userName: recipient's name for personalization
 *
 * If no email is provided, falls back to BRIEFS_DEFAULT_EMAIL env var.
 *
 * Response:
 *   - 200: Email sent successfully
 *   - 400: Missing recipient email
 *   - 500: Resend not configured or send failed
 */
export async function POST(request: Request) {
  try {
    if (!isResendConfigured()) {
      return NextResponse.json(
        { error: 'Resend is not configured. Set RESEND_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const email = body.email || process.env.BRIEFS_DEFAULT_EMAIL;
    const userName = body.userName;

    if (!email) {
      return NextResponse.json(
        { error: 'No recipient email provided. Set BRIEFS_DEFAULT_EMAIL env var or pass email in body.' },
        { status: 400 }
      );
    }

    const briefData = generateMorningBriefData(userName);
    const html = renderMorningBriefHtml(briefData);

    const { data, error } = await resend!.emails.send({
      from: 'LeadKast OS <briefs@leadkastos.com>',
      to: [email],
      subject: `☀️ Morning Brief — ${briefData.date}`,
      html,
    });

    if (error) {
      console.error('Resend send error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      briefType: 'morning',
      sentTo: email,
      metrics: briefData.metrics,
    });
  } catch (err) {
    console.error('Morning Brief error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/briefs/morning
 *
 * Preview the Morning Brief data without sending an email.
 * Useful for testing during development.
 */
export async function GET() {
  try {
    const briefData = generateMorningBriefData('Executive');
    const html = renderMorningBriefHtml(briefData);

    return NextResponse.json({
      briefType: 'morning',
      date: briefData.date,
      data: briefData,
      htmlPreview: html.substring(0, 500) + '...',
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}