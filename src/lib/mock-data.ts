// ── LeadKast OS Mock Data Engine ─────────────────────────────────
export type Trend = 'up' | 'down' | 'neutral';
export type AlertType = 'warning' | 'success' | 'error' | 'info';
export type Priority = 'high' | 'medium' | 'low';
export type Status = 'active' | 'paused' | 'ended' | 'new' | 'updated' | 'archived';
export type CampaignStatus = 'active' | 'paused' | 'ended';

export interface KpiData {
  title: string; value: string; change: string; trend: Trend;
  icon: string; iconColor: string; subtitle: string; sparkline: number[];
}

export interface AlertItem {
  id: number; title: string; description: string; time: string;
  type: AlertType; action: string; category: string; severity: 'critical' | 'high' | 'medium' | 'low';
}

export interface ActionItem {
  id: number; title: string; description: string; priority: Priority;
  impact: string; time: string; category: string; assignedTo: string; progress: number;
}

export interface ActivityItem {
  user: string; action: string; target: string; value: string; time: string; type: string;
}

export interface ReportData {
  id: number; title: string; category: string; description: string;
  date: string; pages: number; readTime: string; status: Status;
  trend: Trend; value: string; chart: number[];
}

export const executiveAlerts: AlertItem[] = [
  { id: 1, title: 'Ad budget at 92% of monthly cap', description: 'Google Ads spend approaching limit with 5 days remaining', time: '2h ago', type: 'warning', action: 'Review Campaigns', category: 'Marketing', severity: 'high' },
  { id: 2, title: 'Enterprise deal closed: Acme Corp', description: 'Largest deal this quarter — $24k/mo Enterprise contract signed', time: '4h ago', type: 'success', action: 'View Profile', category: 'Sales', severity: 'low' },
  { id: 3, title: 'CRM integration sync failure', description: 'HubSpot API error: 12 records failed to sync', time: '6h ago', type: 'error', action: 'Investigate', category: 'Engineering', severity: 'critical' },
  { id: 4, title: 'Q4 revenue target achieved', description: 'Quarterly target hit at 108% — two weeks early', time: '1d ago', type: 'success', action: 'View Report', category: 'Finance', severity: 'low' },
  { id: 5, title: 'Churn risk: 3 accounts flagged', description: 'High-risk accounts with $45k combined ARR exposure', time: '1d ago', type: 'warning', action: 'Review Accounts', category: 'Customer Success', severity: 'high' },
  { id: 6, title: 'Competitor analysis ready', description: 'Market report shows 3 new entrants with competitive pricing', time: '1d ago', type: 'info', action: 'View Analysis', category: 'Strategy', severity: 'medium' },
  { id: 7, title: 'SSL certificate expiring soon', description: 'Production cert expires in 14 days — renewal required', time: '2d ago', type: 'warning', action: 'Renew Certificate', category: 'Engineering', severity: 'critical' },
  { id: 8, title: 'Employee survey results published', description: 'Q4 engagement score: 8.4/10 — up 0.3 from Q3', time: '2d ago', type: 'success', action: 'View Dashboard', category: 'HR', severity: 'low' },
];

export const actionItems: ActionItem[] = [
  { id: 1, title: 'Optimize underperforming ad campaigns', description: '3 campaigns with ROAS below 2.0x — reallocate budget', priority: 'high', impact: '+15% ROAS', time: '2h', category: 'Marketing', assignedTo: 'Sarah Chen', progress: 30 },
  { id: 2, title: 'Follow up with warm leads', description: '5 leads scored 85+ ready for sales outreach', priority: 'high', impact: '+$38k pipeline', time: '4h', category: 'Sales', assignedTo: 'Marcus Johnson', progress: 60 },
  { id: 3, title: 'Approve Q1 content strategy', description: 'Editorial calendar and budget pending final review', priority: 'medium', impact: 'Brand alignment', time: '1d', category: 'Marketing', assignedTo: 'You', progress: 0 },
  { id: 4, title: 'Review pricing tier adjustments', description: 'Competitor data suggests 12% room for optimization', priority: 'medium', impact: '+8% MRR', time: '3d', category: 'Product', assignedTo: 'David Kim', progress: 20 },
  { id: 5, title: 'Fix CRM data sync issue', description: 'HubSpot integration needs re-authentication', priority: 'high', impact: 'Data integrity', time: '1d', category: 'Engineering', assignedTo: 'Engineering', progress: 0 },
  { id: 6, title: 'Prepare board meeting materials', description: 'Q4 board deck with financial summaries and projections', priority: 'medium', impact: 'Investor confidence', time: '5d', category: 'Executive', assignedTo: 'You', progress: 15 },
  { id: 7, title: 'Audit customer onboarding flow', description: 'New user activation at 62% — target is 75%', priority: 'low', impact: '+13% activation', time: '1w', category: 'Product', assignedTo: 'Lisa Patel', progress: 10 },
  { id: 8, title: 'Renew SSL certificate', description: 'Production cert expires in 14 days', priority: 'high', impact: 'Site availability', time: '2d', category: 'Engineering', assignedTo: 'DevOps', progress: 0 },
];

export const recentActivity: ActivityItem[] = [
  { user: 'Sarah Chen', action: 'closed deal', target: 'Acme Corp', value: '+$24k MRR', time: '4h ago', type: 'deal' },
  { user: 'Marcus Johnson', action: 'published', target: 'Q4 Executive Summary', value: '12 pages', time: '6h ago', type: 'report' },
  { user: 'Emily Rodriguez', action: 'completed audit', target: 'Marketing Campaign ROI', value: '92% score', time: '8h ago', type: 'audit' },
  { user: 'David Kim', action: 'resolved', target: 'CRM Integration Sync', value: '12 records', time: '10h ago', type: 'resolve' },
  { user: 'Lisa Patel', action: 'launched', target: 'Holiday Promo Q4', value: '$18k budget', time: '1d ago', type: 'launch' },
];

export const kpiMetrics = [
  { title: 'Monthly Recurring Revenue', value: '$180,240', change: '+12.5%', trend: 'up', icon: 'DollarSign', iconColor: 'text-emerald-400', subtitle: '$24k MoM growth / 92% margin', sparkline: [42,38,55,48,62,58,70,65,78,72,85,92] },
  { title: 'Active Customers', value: '1,250', change: '+5.2%', trend: 'up', icon: 'Users', iconColor: 'text-blue-400', subtitle: '18 new / 4 churned this month', sparkline: [50,52,55,58,60,62,65,68,72,75,78,82] },
  { title: 'Conversion Rate', value: '5.2%', change: '+0.6%', trend: 'up', icon: 'TrendingUp', iconColor: 'text-indigo-400', subtitle: 'vs 4.6% last quarter', sparkline: [45,48,46,52,50,55,52,58,54,60,56,62] },
  { title: 'Execution Score', value: '94/100', change: '+3pts', trend: 'up', icon: 'Zap', iconColor: 'text-amber-400', subtitle: 'Top quartile / 87% tasks done', sparkline: [78,80,82,85,84,86,88,89,91,90,92,94] },
];

export const channelData = [
  { name: 'Organic Search', value: 35, color: '#3B82F6' },
  { name: 'Paid Advertising', value: 25, color: '#6366F1' },
  { name: 'Social Media', value: 20, color: '#8B5CF6' },
  { name: 'Email Marketing', value: 12, color: '#A855F7' },
  { name: 'Referrals', value: 8, color: '#10B981' },
];

export const reports: ReportData[] = [
  { id: 1, title: 'Monthly Revenue Report', category: 'revenue', description: 'Revenue streams, MRR trends, and growth metrics.', date: 'Dec 1, 2025', pages: 8, readTime: '12 min', status: 'updated', trend: 'up', value: '+12.5%', chart: [42,55,48,70,62,85] },
  { id: 2, title: 'Marketing Dashboard', category: 'marketing', description: 'Channel attribution, campaign ROI, conversions.', date: 'Nov 28, 2025', pages: 12, readTime: '15 min', status: 'new', trend: 'up', value: '+18.2%', chart: [35,48,52,60,55,72] },
  { id: 3, title: 'Customer Acquisition Analysis', category: 'customers', description: 'CAC trends, LTV analysis, cohort retention.', date: 'Nov 25, 2025', pages: 10, readTime: '10 min', status: 'updated', trend: 'up', value: '+5.4%', chart: [50,52,55,58,62,68] },
  { id: 4, title: 'Q4 Executive Summary', category: 'all', description: 'Quarterly business health with key insights.', date: 'Oct 1, 2025', pages: 6, readTime: '8 min', status: 'archived', trend: 'neutral', value: 'Stable', chart: [60,65,62,70,68,75] },
  { id: 5, title: 'Revenue by Product Line', category: 'revenue', description: 'Revenue across all product lines and tiers.', date: 'Nov 30, 2025', pages: 14, readTime: '18 min', status: 'updated', trend: 'up', value: '+9.8%', chart: [38,45,42,55,50,65] },
  { id: 6, title: 'Churn Risk Assessment', category: 'customers', description: 'Churn indicators, at-risk accounts, retention.', date: 'Nov 22, 2025', pages: 8, readTime: '10 min', status: 'new', trend: 'down', value: '-2.1%', chart: [70,65,68,60,55,50] },
  { id: 7, title: 'Ad Spend ROI Analysis', category: 'marketing', description: 'ROAS across Google, LinkedIn, and Meta.', date: 'Nov 27, 2025', pages: 10, readTime: '12 min', status: 'updated', trend: 'up', value: '+22.3%', chart: [25,32,40,35,48,55] },
  { id: 8, title: 'Operational Efficiency', category: 'operations', description: 'Process metrics, resource allocation, automation.', date: 'Nov 20, 2025', pages: 6, readTime: '7 min', status: 'archived', trend: 'neutral', value: '+3.0%', chart: [55,58,55,60,62,65] },
];