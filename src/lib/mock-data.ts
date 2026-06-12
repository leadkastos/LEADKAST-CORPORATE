
/**
 * LeadKast OS Mock Data Engine
 * Provides realistic executive data for all modules.
 */

// --- Types ---

export interface MetricTrend {
  value: number;
  label: string;
  isPositive: boolean;
}

export interface KpiCardData {
  title: string;
  value: string | number;
  trend: MetricTrend;
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  level: 'critical' | 'warning' | 'info';
  timestamp: string;
  category: string;
  isResolved: boolean;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  status: 'pending' | 'completed' | 'dismissed';
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'coming_soon' | 'error';
  category: 'CRM' | 'Marketing' | 'Sales' | 'Finance';
  lastSync?: string;
  icon: string;
}

// --- Mock Data ---

export const mockDashboardKpis: KpiCardData[] = [
  {
    title: 'Total Revenue',
    value: '$1,248,300',
    trend: { value: 12.5, label: '+12.5% vs last month', isPositive: true },
    icon: 'dollar-sign',
  },
  {
    title: 'Active Leads',
    value: '4,821',
    trend: { value: 8.2, label: '+8.2% vs last month', isPositive: true },
    icon: 'users',
  },
  {
    title: 'Marketing ROI',
    value: '4.2x',
    trend: { value: 5.4, label: '+5.4% vs last month', isPositive: true },
    icon: 'bar-chart',
  },
  {
    title: 'Health Score',
    value: '94/100',
    trend: { value: 2, label: '+2% vs last month', isPositive: true },
    icon: 'activity',
  },
];

export const mockRevenueGrowth: ChartDataPoint[] = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Abnormal Ad Spend Spike',
    description: 'Facebook Ads spend increased by 40% in the last 24 hours without a proportional increase in leads.',
    level: 'critical',
    timestamp: '2 hours ago',
    category: 'Marketing',
    isResolved: false,
  },
  {
    id: '2',
    title: 'Untouched High-Value Leads',
    description: '12 leads with a potential value > $5,000 have not been contacted in over 48 hours.',
    level: 'warning',
    timestamp: '4 hours ago',
    category: 'Revenue Recovery',
    isResolved: false,
  },
  {
    id: '3',
    title: 'Monthly Report Ready',
    description: 'The executive revenue summary for May is now available for review.',
    level: 'info',
    timestamp: 'Yesterday',
    category: 'Reports',
    isResolved: false,
  },
];

export const mockActionItems: ActionItem[] = [
  {
    id: '1',
    title: 'Follow up with Stalled Opportunities',
    description: 'Review the 8 deals currently stuck in the "Negotiation" stage for over 10 days.',
    priority: 'high',
    dueDate: 'Today',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Optimize Google Ads Keywords',
    description: 'Pause underperforming keywords identified in the last marketing intelligence report.',
    priority: 'medium',
    dueDate: 'Tomorrow',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Schedule Q3 Planning Session',
    description: 'Finalize the date and agenda for the executive Q3 strategy meeting.',
    priority: 'low',
    dueDate: 'In 3 days',
    status: 'pending',
  },
];

export const mockIntegrations: Integration[] = [
  {
    id: 'ghl',
    name: 'GoHighLevel',
    description: 'CRM & Marketing Automation',
    status: 'connected',
    category: 'CRM',
    lastSync: '10 minutes ago',
    icon: 'ghl',
  },
  {
    id: 'meta',
    name: 'Meta Ads',
    description: 'Facebook & Instagram Advertising',
    status: 'connected',
    category: 'Marketing',
    lastSync: '1 hour ago',
    icon: 'meta',
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    description: 'Search & Display Advertising',
    status: 'error',
    category: 'Marketing',
    lastSync: 'Attempt failed 2h ago',
    icon: 'google',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment Processing & Subscriptions',
    status: 'disconnected',
    category: 'Finance',
    icon: 'stripe',
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Enterprise CRM Platform',
    status: 'coming_soon',
    category: 'CRM',
    icon: 'salesforce',
  },
];

export const mockMarketingMetrics = {
  summary: [
    { label: 'Total Spend', value: '$45,200', trend: '+12%' },
    { label: 'Total Leads', value: '1,240', trend: '+8%' },
    { label: 'Avg. CPL', value: '$36.45', trend: '-5%' },
    { label: 'ROAS', value: '3.8x', trend: '+15%' },
  ],
  channelPerformance: [
    { name: 'Meta Ads', spend: 25000, leads: 750, cpl: 33.33, roas: 4.2 },
    { name: 'Google Ads', spend: 15000, leads: 380, cpl: 39.47, roas: 3.5 },
    { name: 'LinkedIn', spend: 5200, leads: 110, cpl: 47.27, roas: 2.1 },
  ],
};

export const mockRevenueMetrics = {
  summary: [
    { label: 'MRR', value: '$105,000', trend: '+8.2%' },
    { label: 'ARR', value: '$1,260,000', trend: '+10.5%' },
    { label: 'Net Churn', value: '1.2%', trend: '-0.3%' },
    { label: 'LTV', value: '$2,450', trend: '+2.1%' },
  ],
  revenueBySource: [
    { name: 'Subscriptions', value: 850000 },
    { name: 'Services', value: 250000 },
    { name: 'Add-ons', value: 148300 },
  ],
};

export const mockPipelineData = {
  summary: [
    { label: 'Open Deals', value: '142', trend: '+5' },
    { label: 'Pipeline Value', value: '$2,840,000', trend: '+$450k' },
    { label: 'Weighted Value', value: '$1,150,000', trend: '+$120k' },
    { label: 'Avg. Deal Size', value: '$20,000', trend: '+1.5%' },
  ],
  stages: [
    { name: 'Discovery', count: 45, value: 900000 },
    { name: 'Qualification', count: 32, value: 640000 },
    { name: 'Proposal', count: 28, value: 560000 },
    { name: 'Negotiation', count: 22, value: 440000 },
    { name: 'Closing', count: 15, value: 300000 },
  ],
};

export const mockSalesMetrics = {
  summary: [
    { label: 'Calls', value: '2,450', trend: '+15%' },
    { label: 'Appointments', value: '380', trend: '+10%' },
    { label: 'Closed Won', value: '85', trend: '+5%' },
    { label: 'Win Rate', value: '22.4%', trend: '-1.2%' },
  ],
  teamPerformance: [
    { name: 'Alex Johnson', deals: 24, value: 480000, rate: 28 },
    { name: 'Sarah Miller', deals: 19, value: 380000, rate: 24 },
    { name: 'Michael Chen', deals: 15, value: 300000, rate: 19 },
  ],
  trends: [
    { name: 'Mon', calls: 320, appointments: 42, won: 8 },
    { name: 'Tue', calls: 380, appointments: 56, won: 12 },
    { name: 'Wed', calls: 420, appointments: 68, won: 15 },
    { name: 'Thu', calls: 390, appointments: 48, won: 10 },
    { name: 'Fri', calls: 450, appointments: 72, won: 18 },
    { name: 'Sat', calls: 280, appointments: 35, won: 9 },
    { name: 'Sun', calls: 210, appointments: 28, won: 13 },
  ]
};


export const mockRevenueRecovery = {
  summary: [
    { label: 'At-Risk Revenue', value: '$145,000', level: 'high' },
    { label: 'Dormant Leads', value: '214', level: 'medium' },
    { label: 'Lost Opportunities', value: '38', level: 'low' },
    { label: 'Recovered (MTD)', value: '$52,400', level: 'info' },
  ],
  recoveryActions: [
    { type: 'Dormant Lead', lead: 'TechCore Solutions', value: 12000, age: '14 days' },
    { type: 'No-Show Followup', lead: 'Aria Green', value: 4500, age: '2 days' },
    { type: 'Contract Pending', lead: 'Nexus Group', value: 25000, age: '7 days' },
  ],
  trends: [
    { name: 'Week 1', recovered: 12000, atRisk: 160000 },
    { name: 'Week 2', recovered: 18000, atRisk: 155000 },
    { name: 'Week 3', recovered: 25000, atRisk: 148000 },
    { name: 'Week 4', recovered: 22400, atRisk: 145000 },
  ]
};


export const mockPermissions = [
  { role: 'Administrator', users: 2, access: 'Full System' },
  { role: 'Executive', users: 3, access: 'All Analytics & Reports' },
  { role: 'Manager', users: 8, access: 'Department Specific' },
  { role: 'Viewer', users: 12, access: 'Read Only' },
];

export const mockReports = [
  { id: '1', name: 'May Revenue Summary', type: 'Financial', date: 'Jun 1, 2026', status: 'final' },
  { id: '2', name: 'Q2 Marketing ROI', type: 'Marketing', date: 'May 15, 2026', status: 'final' },
  { id: '3', name: 'Sales Performance Audit', type: 'Operations', date: 'May 10, 2026', status: 'archived' },
  { id: '4', name: 'Customer Sentiment Analysis', type: 'Product', date: 'May 1, 2026', status: 'final' },
];

export const channelData = [
  { name: 'Meta Ads', value: 42, color: 'bg-blue-500' },
  { name: 'Google Ads', value: 28, color: 'bg-indigo-500' },
  { name: 'Organic', value: 18, color: 'bg-purple-500' },
  { name: 'Referral', value: 12, color: 'bg-emerald-500' },
];

export const getConnectednessScore = () => {
  const connectedCount = mockIntegrations.filter(i => i.status === 'connected').length;
  const totalPotential = mockIntegrations.filter(i => i.status !== 'coming_soon').length;
  return Math.round((connectedCount / totalPotential) * 100);
};
