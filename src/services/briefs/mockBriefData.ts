/**
 * Mock data service for automated briefs.
 * Generates realistic mock data for Morning Brief and Daily Wrap emails.
 * Will be replaced with real aggregated data once integrations are live.
 */

export interface BriefMetrics {
  totalRevenue: number;
  revenueChange: number; // percentage
  newLeads: number;
  leadsChange: number;
  conversionRate: number;
  conversionChange: number;
  activeCampaigns: number;
  adSpend: number;
  adSpendChange: number;
  costPerLead: number;
  cplChange: number;
}

export interface ExecutiveAlert {
  type: 'warning' | 'success' | 'error' | 'info';
  title: string;
  description: string;
}

export interface TopPerformer {
  name: string;
  metric: string;
  value: string;
}

export interface ActionItem {
  title: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
}

export interface MorningBriefData {
  date: string;
  greeting: string;
  metrics: BriefMetrics;
  alerts: ExecutiveAlert[];
  topPerformer: TopPerformer;
  focusAction: ActionItem;
}

export interface DailyWrapData {
  date: string;
  daySummary: string;
  metrics: BriefMetrics;
  highlights: string[];
  alerts: ExecutiveAlert[];
  topActions: ActionItem[];
  signOff: string;
}

function randomBetween(min: number, max: number): number {
  return +(min + Math.random() * (max - min)).toFixed(1);
}

function seedFromString(str: string, min: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const ratio = Math.abs(hash % 100) / 100;
  return +(min + ratio * (max - min)).toFixed(1);
}

export function generateMorningBriefData(userName?: string): MorningBriefData {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const hour = today.getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else if (hour >= 17) greeting = 'Good evening';

  return {
    date: dateStr,
    greeting: `${greeting}${userName ? `, ${userName}` : ''}`,
    metrics: {
      totalRevenue: randomBetween(12000, 28000),
      revenueChange: randomBetween(-8, 15),
      newLeads: Math.floor(randomBetween(8, 35)),
      leadsChange: randomBetween(-12, 25),
      conversionRate: randomBetween(3.2, 8.5),
      conversionChange: randomBetween(-5, 10),
      activeCampaigns: Math.floor(randomBetween(3, 9)),
      adSpend: randomBetween(800, 3500),
      adSpendChange: randomBetween(-10, 20),
      costPerLead: randomBetween(25, 85),
      cplChange: randomBetween(-15, 12),
    },
    alerts: [
      {
        type: 'success',
        title: 'New high-value lead captured',
        description: 'A lead from Meta Ads with estimated value of $2,400 just came in. Follow up within 2 hours for best conversion odds.',
      },
      {
        type: 'warning',
        title: 'Ad spend pacing ahead of budget',
        description: 'Google Ads has spent 72% of the weekly budget by Wednesday. Consider adjusting caps.',
      },
      {
        type: 'info',
        title: 'CRM sync completed successfully',
        description: 'All integrations synced overnight. No errors detected.',
      },
    ],
    topPerformer: {
      name: 'Meta Ads - Retargeting',
      metric: 'ROAS',
      value: '4.2x',
    },
    focusAction: {
      title: 'Follow up on stale leads',
      priority: 'high',
      description: '8 leads from the past 7 days have not been contacted. Estimated revenue at risk: $4,500.',
    },
  };
}

export function generateDailyWrapData(userName?: string): DailyWrapData {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const newLeads = Math.floor(randomBetween(8, 35));
  const revenue = randomBetween(12000, 28000);
  const deals = randomBetween(3, 8);

  const daySummaries = [
    `Today added ${newLeads} new leads with $${revenue.toLocaleString()} in pipeline revenue.`,
    `${deals} deals closed today — a solid performance. Keep the momentum going with ${Math.floor(randomBetween(2, 6))} pending proposals.`,
    `Mixed day: ${newLeads} leads came in, but ad costs rose ${randomBetween(3, 12)}%. Worth reviewing campaign targeting tonight.`,
    `Strong day for conversions — ${(randomBetween(4, 10)).toFixed(1)}% conversion rate across all channels.`,
  ];

  return {
    date: dateStr,
    daySummary: daySummaries[Math.floor(Math.random() * daySummaries.length)],
    metrics: {
      totalRevenue: revenue,
      revenueChange: randomBetween(-12, 18),
      newLeads,
      leadsChange: randomBetween(-15, 30),
      conversionRate: randomBetween(3.0, 8.0),
      conversionChange: randomBetween(-8, 12),
      activeCampaigns: Math.floor(randomBetween(3, 9)),
      adSpend: randomBetween(800, 3500),
      adSpendChange: randomBetween(-10, 20),
      costPerLead: randomBetween(25, 85),
      cplChange: randomBetween(-15, 12),
    },
    highlights: [
      `Revenue: $${revenue.toLocaleString()} (${deals > 5 ? '✅' : '📊'} on track)`,
      `New leads: ${newLeads} (${newLeads > 15 ? '↑ above' : '∼ at'} daily average)`,
      `Best channel: ${['Meta Ads', 'Google Ads', 'Organic Search', 'Referral'][Math.floor(Math.random() * 4)]}`,
    ],
    alerts: [
      {
        type: 'success',
        title: 'Deal closed: Acme Corp',
        description: '$8,200 deal closed today — 14-day sales cycle.',
      },
      {
        type: 'warning',
        title: '3 leads going dormant',
        description: 'Leads from 5+ days ago need re-engagement before they cool off.',
      },
      ...(Math.random() > 0.5
        ? [{
            type: 'info' as const,
            title: 'Weekly report ready',
            description: 'Your weekly performance snapshot is ready in the dashboard.',
          }]
        : []),
    ],
    topActions: [
      {
        title: 'Review Google Ads campaign budget',
        priority: 'high',
        description: 'Clicks down 15% while CPC rose. Consider adjusting bids.',
      },
      {
        title: 'Follow up with Marketing qualified leads',
        priority: 'medium',
        description: `${Math.floor(randomBetween(3, 9))} MQLs are ready for sales outreach.`,
      },
      {
        title: 'Check CRM integration status',
        priority: 'low',
        description: 'Meta Ads sync was delayed by 2 hours today.',
      },
    ],
    signOff: 'Have a great evening. See you tomorrow.',
  };
}