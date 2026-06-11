/**
 * HTML email templates for the Morning Brief and Daily Wrap.
 * Uses inline styles for maximum email client compatibility.
 * Follows the executive dark theme of LeadKast OS.
 */

import type { MorningBriefData, DailyWrapData } from '@/services/briefs/mockBriefData';

function baseWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LeadKast OS</title>
</head>
<body style="margin:0;padding:0;background-color:#020617;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#020617;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:24px;font-weight:700;color:#6366f1;letter-spacing:-0.5px;">LeadKast OS</td>
                  <td align="right" style="font-size:12px;color:#64748b;">Executive Intelligence</td>
                </tr>
              </table>
            </td>
          </tr>
          ${content}
          <!-- Footer -->
          <tr>
            <td style="padding-top:32px;border-top:1px solid #1e293b;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;color:#475569;">
                    LeadKast OS &mdash; Your Executive Intelligence Platform
                  </td>
                  <td align="right" style="font-size:12px;color:#475569;">
                    <a href="{{UNSUBSCRIBE_URL}}" style="color:#475569;text-decoration:underline;">Unsubscribe</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function metricBox(label: string, value: string, change: string, trend: 'up' | 'down' | 'neutral'): string {
  const color = trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#64748b';
  const arrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';
  return `
    <td style="padding:12px;background:#0f172a;border:1px solid #1e293b;border-radius:8px;">
      <div style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin-bottom:4px;">${label}</div>
      <div style="font-size:24px;font-weight:700;color:#f8fafc;margin-bottom:2px;">${value}</div>
      <div style="font-size:12px;color:${color};">${arrow} ${change}</div>
    </td>`;
}

export function renderMorningBriefHtml(data: MorningBriefData): string {
  const metrics = data.metrics;

  const metricsRow = `
    <tr>
      <td style="padding-bottom:24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            ${metricBox('Revenue', `$${metrics.totalRevenue.toLocaleString()}`, `${metrics.revenueChange > 0 ? '+' : ''}${metrics.revenueChange}%`, metrics.revenueChange >= 0 ? 'up' : 'down')}
            ${metricBox('New Leads', `${metrics.newLeads}`, `${metrics.leadsChange > 0 ? '+' : ''}${metrics.leadsChange}%`, metrics.leadsChange >= 0 ? 'up' : 'down')}
            ${metricBox('Conv. Rate', `${metrics.conversionRate}%`, `${metrics.conversionChange > 0 ? '+' : ''}${metrics.conversionChange}%`, metrics.conversionChange >= 0 ? 'up' : 'down')}
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding-bottom:24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            ${metricBox('Ad Spend', `$${metrics.adSpend.toLocaleString()}`, `${metrics.adSpendChange > 0 ? '+' : ''}${metrics.adSpendChange}%`, metrics.adSpendChange > 5 ? 'down' : metrics.adSpendChange < -5 ? 'up' : 'neutral')}
            ${metricBox('CPL', `$${metrics.costPerLead}`, `${metrics.cplChange > 0 ? '+' : ''}${metrics.cplChange}%`, metrics.cplChange <= 0 ? 'up' : 'down')}
            ${metricBox('Campaigns', `${metrics.activeCampaigns}`, 'Active', 'neutral')}
          </tr>
        </table>
      </td>
    </tr>`;

  const alertsHtml = data.alerts.map(alert => {
    const dotColor = alert.type === 'success' ? '#10b981' : alert.type === 'warning' ? '#f59e0b' : alert.type === 'error' ? '#ef4444' : '#3b82f6';
    return `
      <tr>
        <td style="padding:10px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="12" style="vertical-align:top;padding-top:4px;">
                <table cellpadding="0" cellspacing="0" style="width:8px;height:8px;border-radius:50%;background-color:${dotColor};"><tr><td></td></tr></table>
              </td>
              <td style="padding-left:10px;">
                <div style="font-size:14px;font-weight:600;color:#f1f5f9;">${alert.title}</div>
                <div style="font-size:13px;color:#94a3b8;margin-top:2px;">${alert.description}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  }).join('');

  const content = `
    <!-- Greeting -->
    <tr>
      <td style="padding-bottom:8px;">
        <div style="font-size:28px;font-weight:700;color:#f8fafc;">${data.greeting}</div>
        <div style="font-size:14px;color:#64748b;margin-top:4px;">${data.date}</div>
      </td>
    </tr>
    <!-- Divider -->
    <tr><td style="height:1px;background:#1e293b;margin:16px 0;display:block;"></td></tr>
    <!-- Section: Key Metrics -->
    <tr>
      <td style="padding:16px 0 8px 0;">
        <div style="font-size:16px;font-weight:600;color:#e2e8f0;margin-bottom:16px;">📊 Morning Metrics</div>
      </td>
    </tr>
    ${metricsRow}
    <!-- Section: Alerts -->
    <tr>
      <td style="padding:16px 0 8px 0;">
        <div style="font-size:16px;font-weight:600;color:#e2e8f0;margin-bottom:8px;">⚡ Executive Alerts</div>
      </td>
    </tr>
    ${alertsHtml}
    <!-- Section: Top Performer -->
    <tr>
      <td style="padding:16px 0 8px 0;">
        <div style="font-size:16px;font-weight:600;color:#e2e8f0;margin-bottom:12px;">🏆 Top Performer</div>
      </td>
    </tr>
    <tr>
      <td style="padding:12px;background:#0f172a;border:1px solid #1e293b;border-radius:8px;">
        <div style="font-size:15px;font-weight:600;color:#f1f5f9;">${data.topPerformer.name}</div>
        <div style="font-size:13px;color:#94a3b8;margin-top:2px;">${data.topPerformer.metric}: <span style="color:#10b981;font-weight:600;">${data.topPerformer.value}</span></div>
      </td>
    </tr>
    <!-- Section: Focus Action -->
    <tr>
      <td style="padding:16px 0 8px 0;">
        <div style="font-size:16px;font-weight:600;color:#e2e8f0;margin-bottom:12px;">🎯 Recommended Action</div>
      </td>
    </tr>
    <tr>
      <td style="padding:12px;background:#0f172a;border:1px solid #f59e0b;border-radius:8px;">
        <div style="font-size:14px;font-weight:600;color:#f59e0b;">${data.focusAction.title}</div>
        <div style="font-size:13px;color:#94a3b8;margin-top:4px;">${data.focusAction.description}</div>
      </td>
    </tr>`;

  return baseWrapper(content);
}

export function renderDailyWrapHtml(data: DailyWrapData): string {
  const metrics = data.metrics;

  const metricsRow = `
    <tr>
      <td style="padding-bottom:24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            ${metricBox('Revenue', `$${metrics.totalRevenue.toLocaleString()}`, `${metrics.revenueChange > 0 ? '+' : ''}${metrics.revenueChange}%`, metrics.revenueChange >= 0 ? 'up' : 'down')}
            ${metricBox('New Leads', `${metrics.newLeads}`, `${metrics.leadsChange > 0 ? '+' : ''}${metrics.leadsChange}%`, metrics.leadsChange >= 0 ? 'up' : 'down')}
            ${metricBox('Conv. Rate', `${metrics.conversionRate}%`, `${metrics.conversionChange > 0 ? '+' : ''}${metrics.conversionChange}%`, metrics.conversionChange >= 0 ? 'up' : 'down')}
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding-bottom:24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            ${metricBox('Ad Spend', `$${metrics.adSpend.toLocaleString()}`, `${metrics.adSpendChange > 0 ? '+' : ''}${metrics.adSpendChange}%`, metrics.adSpendChange > 5 ? 'down' : metrics.adSpendChange < -5 ? 'up' : 'neutral')}
            ${metricBox('CPL', `$${metrics.costPerLead}`, `${metrics.cplChange > 0 ? '+' : ''}${metrics.cplChange}%`, metrics.cplChange <= 0 ? 'up' : 'down')}
            ${metricBox('Campaigns', `${metrics.activeCampaigns}`, 'Active', 'neutral')}
          </tr>
        </table>
      </td>
    </tr>`;

  const highlightsHtml = data.highlights.map(h => `
    <tr>
      <td style="padding:6px 0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="16" style="color:#10b981;font-size:14px;">✓</td>
            <td style="font-size:14px;color:#e2e8f0;">${h.replace('✅', '').replace('📊', '').replace('↑', '').replace('∼', '').replace('at', '').trim()}</td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  const alertsHtml = data.alerts.map(alert => {
    const dotColor = alert.type === 'success' ? '#10b981' : alert.type === 'warning' ? '#f59e0b' : alert.type === 'error' ? '#ef4444' : '#3b82f6';
    return `
      <tr>
        <td style="padding:10px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="12" style="vertical-align:top;padding-top:4px;">
                <table cellpadding="0" cellspacing="0" style="width:8px;height:8px;border-radius:50%;background-color:${dotColor};"><tr><td></td></tr></table>
              </td>
              <td style="padding-left:10px;">
                <div style="font-size:14px;font-weight:600;color:#f1f5f9;">${alert.title}</div>
                <div style="font-size:13px;color:#94a3b8;margin-top:2px;">${alert.description}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  }).join('');

  const actionsHtml = data.topActions.map(action => {
    const borderColor = action.priority === 'high' ? '#f59e0b' : action.priority === 'medium' ? '#3b82f6' : '#64748b';
    const label = action.priority === 'high' ? '🔥 High' : action.priority === 'medium' ? '📌 Medium' : '📋 Low';
    return `
      <tr>
        <td style="padding:10px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:12px;background:#0f172a;border-left:3px solid ${borderColor};border-radius:4px;">
                <div style="font-size:12px;color:${borderColor};font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">${label}</div>
                <div style="font-size:14px;font-weight:600;color:#f1f5f9;">${action.title}</div>
                <div style="font-size:13px;color:#94a3b8;margin-top:2px;">${action.description}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  }).join('');

  const content = `
    <!-- Greeting -->
    <tr>
      <td style="padding-bottom:8px;">
        <div style="font-size:28px;font-weight:700;color:#f8fafc;">Daily Wrap</div>
        <div style="font-size:14px;color:#64748b;margin-top:4px;">${data.date}</div>
      </td>
    </tr>
    <!-- Divider -->
    <tr><td style="height:1px;background:#1e293b;margin:16px 0;display:block;"></td></tr>
    <!-- Day Summary -->
    <tr>
      <td style="padding:12px;background:#0f172a;border:1px solid #1e293b;border-radius:8px;margin-bottom:16px;">
        <div style="font-size:14px;color:#e2e8f0;line-height:1.5;">${data.daySummary}</div>
      </td>
    </tr>
    <!-- Section: Key Metrics -->
    <tr>
      <td style="padding:16px 0 8px 0;">
        <div style="font-size:16px;font-weight:600;color:#e2e8f0;margin-bottom:16px;">📊 Today's Numbers</div>
      </td>
    </tr>
    ${metricsRow}
    <!-- Section: Highlights -->
    <tr>
      <td style="padding:8px 0 8px 0;">
        <div style="font-size:16px;font-weight:600;color:#e2e8f0;margin-bottom:12px;">✅ Highlights</div>
      </td>
    </tr>
    ${highlightsHtml}
    <!-- Section: Alerts -->
    <tr>
      <td style="padding:16px 0 8px 0;">
        <div style="font-size:16px;font-weight:600;color:#e2e8f0;margin-bottom:8px;">⚡ Evening Alerts</div>
      </td>
    </tr>
    ${alertsHtml}
    <!-- Section: Action Items -->
    <tr>
      <td style="padding:16px 0 8px 0;">
        <div style="font-size:16px;font-weight:600;color:#e2e8f0;margin-bottom:12px;">📋 Tomorrow's Priority</div>
      </td>
    </tr>
    ${actionsHtml}
    <!-- Sign off -->
    <tr>
      <td style="padding:24px 0 8px 0;">
        <div style="font-size:14px;color:#94a3b8;font-style:italic;">${data.signOff}</div>
      </td>
    </tr>`;

  return baseWrapper(content);
}