import { NextResponse } from 'next/server';
import { resend, isResendConfigured } from '@/lib/resend';
import { renderDailyWrapHtml } from '@/lib/email-templates';
import { generateDailyWrapData } from '@/services/briefs/mockBriefData';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/briefs/daily-wrap
 *
 * Triggers the Daily Wrap email delivery.
 * Designed to be called by a cron job scheduler (e.g. Vercel Cron, cron-job.org)
 * at ~6:00 PM.
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

    const wrapData = generateDailyWrapData(userName);
    const html = renderDailyWrapHtml(wrapData);

    const { data, error } = await resend!.emails.send({
      from: 'LeadKast OS <briefs@leadkastos.com>',
      to: [email],
      subject: `🌙 Daily Wrap — ${wrapData.date}`,
      html,
    });

    if (error) {
      console.error('Resend send error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      briefType: 'daily-wrap',
      sentTo: email,
      highlights: wrapData.highlights,
    });
  } catch (err) {
    console.error('Daily Wrap error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/briefs/daily-wrap
 *
 * Preview the Daily Wrap data without sending an email.
 * Useful for testing during development.
 */
export async function GET() {
  try {
    const wrapData = generateDailyWrapData('Executive');
    const html = renderDailyWrapHtml(wrapData);

    return NextResponse.json({
      briefType: 'daily-wrap',
      date: wrapData.date,
      data: wrapData,
      htmlPreview: html.substring(0, 500) + '...',
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}