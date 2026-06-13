import { subDays, format, startOfMonth, eachDayOfInterval, eachWeekOfInterval } from 'date-fns';

// --- Utilities ---
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randFloat = (min: number, max: number) => +(Math.random() * (max - min) + min).toFixed(2);

// --- Core Intelligence Data ---

export const mockExecutiveDashboard = {
  healthScore: 88,
  morningBrief: {
    greeting: "Good morning, Sarah",
    summary: "Your business health is strong today. Revenue is up 12% week-over-week, primarily driven by a surge in Meta Ads performance.",
    topAction: "Follow up with 5 high-value dormant leads in the Revenue Recovery center.",
    alertsCount: 3,
  },
  kpis: [
    { label: 'MRR', value: '$124,500', trend: '+12.4%', trendType: 'up' as const },
    { label: 'Active Leads', value: '1,432', trend: '+8.2%', trendType: 'up' as const },
    { label: 'Win Rate', value: '24.2%', trend: '-1.5%', trendType: 'down' as const },
    { label: 'Avg. CAC', value: '$42.30', trend: '-5.4%', trendType: 'up' as const }, // up trend for CAC decrease is good
  ],
  performanceTrend: Array.from({ length: 30 }, (_, i) => ({
    date: format(subDays(new Date(), 29 - i), 'MMM dd'),
    revenue: rand(3000, 6000),
    target: 4500,
  })),
};

export const mockMarketingIntelligence = {
  summary: [
    { label: 'Total Spend', value: '$42,300', trend: '+5.2%' },
    { label: 'Total Leads', value: '842', trend: '+12.1%' },
    { label: 'Avg. CPL', value: '$50.23', trend: '-6.4%' },
    { label: 'ROAS', value: '4.2x', trend: '+0.8x' },
  ],
  channels: [
    { name: 'Meta Ads', spend: 18500, leads: 420, cpl: 44.05, roas: 4.8 },
    { name: 'Google Ads', spend: 15200, leads: 280, cpl: 54.28, roas: 3.5 },
    { name: 'LinkedIn', spend: 8600, leads: 142, cpl: 60.56, roas: 2.9 },
  ],
  dailyTrends: Array.from({ length: 14 }, (_, i) => ({
    date: format(subDays(new Date(), 13 - i), 'MMM dd'),
    spend: rand(1000, 2500),
    leads: rand(20, 50),
    roas: randFloat(2.5, 5.5),
  })),
};

export const mockRevenueIntelligence = {
  summary: [
    { label: 'ARR', value: '$1,494,000', trend: '+10.5%' },
    { label: 'MRR', value: '$124,500', trend: '+8.2%' },
    { label: 'LTV', value: '$3,850', trend: '+4.1%' },
    { label: 'Churn Rate', value: '1.8%', trend: '-0.2%' },
  ],
  revenueMix: [
    { name: 'Subscriptions', value: 850000 },
    { name: 'Services', value: 340000 },
    { name: 'Add-ons', value: 154000 },
    { name: 'Overage', value: 150000 },
  ],
  growthTrend: Array.from({ length: 12 }, (_, i) => ({
    month: format(subDays(new Date(), (11 - i) * 30), 'MMM'),
    mrr: 100000 + (i * 2500) + rand(-1000, 1000),
    churn: randFloat(1.2, 2.5),
  })),
};

export const mockPipelineIntelligence = {
  summary: [
    { label: 'Open Deals', value: '158', trend: '+12' },
    { label: 'Pipeline Value', value: '$3,160,000', trend: '+$420k' },
    { label: 'Weighted Value', value: '$1,240,000', trend: '+$180k' },
    { label: 'Avg. Deal Size', value: '$20,000', trend: '+2.5%' },
  ],
  stages: [
    { name: 'Discovery', count: 45, value: 900000, color: '#3b82f6' },
    { name: 'Qualification', count: 32, value: 640000, color: '#6366f1' },
    { name: 'Proposal', count: 28, value: 560000, color: '#8b5cf6' },
    { name: 'Negotiation', count: 22, value: 440000, color: '#a855f7' },
    { name: 'Closing', count: 15, value: 300000, color: '#d946ef' },
    { name: 'Won', count: 16, value: 320000, color: '#10b981' },
  ],
};

export const mockSalesIntelligence = {
  summary: [
    { label: 'Outbound Calls', value: '3,842', trend: '+15%' },
    { label: 'Appointments', value: '412', trend: '+8%' },
    { label: 'Deals Closed', value: '92', trend: '+12%' },
    { label: 'Win Rate', value: '22.3%', trend: '+1.5%' },
  ],
  teamLeaderboard: [
    { name: 'Alex Rivera', deals: 24, value: 480000, goal: 500000, progress: 96 },
    { name: 'Sarah Miller', deals: 21, value: 420000, goal: 400000, progress: 105 },
    { name: 'Jordan Chen', deals: 18, value: 360000, goal: 450000, progress: 80 },
    { name: 'Taylor Swift', deals: 15, value: 300000, goal: 300000, progress: 100 },
    { name: 'Sam Smith', deals: 14, value: 280000, goal: 400000, progress: 70 },
  ],
  activityTrends: Array.from({ length: 7 }, (_, i) => ({
    day: format(subDays(new Date(), 6 - i), 'EEE'),
    calls: rand(400, 700),
    appointments: rand(40, 70),
    won: rand(5, 15),
  })),
};

export const mockRevenueRecovery = {
  summary: [
    { label: 'At-Risk Revenue', value: '$142,500', level: 'high' },
    { label: 'Dormant Leads', value: '214', level: 'medium' },
    { label: 'Failed Payments', value: '18', level: 'high' },
    { label: 'Recovered (MTD)', value: '$64,200', level: 'info' },
  ],
  atRiskBreakdown: [
    { name: 'Dormant (30d+)', value: 85000 },
    { name: 'Failed Payment', value: 42000 },
    { name: 'No-Show Followup', value: 15500 },
  ],
  recentLosses: [
    { id: '1', company: 'Global Tech', value: '$12,000', status: 'Dormant', age: '45 days' },
    { id: '2', company: 'Acme Corp', value: '$8,500', status: 'Failed Pay', age: '2 days' },
    { id: '3', company: 'Zion Inc', value: '$25,000', status: 'Stalled', age: '14 days' },
  ],
};

export const mockIntegrations = [
  { id: '1', name: 'GoHighLevel', slug: 'gohighlevel', category: 'CRM', status: 'connected', lastSync: '2m ago', description: 'Primary CRM and automation engine.' },
  { id: '2', name: 'Meta Ads', slug: 'meta-ads', category: 'Marketing', status: 'connected', lastSync: '14m ago', description: 'Facebook and Instagram advertising.' },
  { id: '3', name: 'Google Ads', slug: 'google-ads', category: 'Marketing', status: 'connected', lastSync: '1h ago', description: 'Search and Display network.' },
  { id: '4', name: 'Stripe', slug: 'stripe', category: 'Finance', status: 'connected', lastSync: '30m ago', description: 'Payment processing and MRR tracking.' },
  { id: '5', name: 'HubSpot', slug: 'hubspot', category: 'CRM', status: 'disconnected', lastSync: 'Never', description: 'Alternative CRM integration.' },
  { id: '6', name: 'LinkedIn Ads', slug: 'linkedin-ads', category: 'Marketing', status: 'coming_soon', lastSync: '-', description: 'Professional network advertising.' },
  { id: '7', name: 'QuickBooks', slug: 'quickbooks', category: 'Finance', status: 'coming_soon', lastSync: '-', description: 'Accounting and expense tracking.' },
];

export const mockAlerts = [
  { id: '1', title: 'CPL Spike: Meta Ads', description: 'Cost per lead increased by 45% in the last 24 hours.', level: 'critical', category: 'marketing', time: '1 hour ago' },
  { id: '2', title: 'High Churn Risk', description: '3 high-value accounts have not logged in for over 14 days.', level: 'warning', category: 'revenue', time: '4 hours ago' },
  { id: '3', title: 'New Negative Review', description: 'A 2-star review was posted on Google Business Profile.', level: 'warning', category: 'sales', time: 'Yesterday' },
  { id: '4', title: 'Data Sync Success', description: 'All integration data was successfully refreshed.', level: 'info', category: 'system', time: '2 mins ago' },
];

export const mockActionItems = [
  { id: '1', title: 'Follow up with Global Tech', description: 'Lead has been dormant for 45 days. High recovery potential.', priority: 'critical', impact: 'High', category: 'Recovery' },
  { id: '2', title: 'Optimize Google Ads Budget', description: 'Redistribute $2k from low-performing keywords.', priority: 'high', impact: 'Medium', category: 'Marketing' },
  { id: '3', title: 'Review Failed Payments', description: '2 payments from yesterday need manual intervention.', priority: 'critical', impact: 'High', category: 'Finance' },
  { id: '4', title: 'Update Sales Playbook', description: 'Refresh discovery questions for Q3.', priority: 'medium', impact: 'Low', category: 'Sales' },
];

export const mockReports = [
  { id: '1', name: 'May Executive Summary', type: 'Executive', date: 'Jun 1, 2026', status: 'final' },
  { id: '2', name: 'Q2 Marketing Performance', type: 'Marketing', date: 'May 15, 2026', status: 'final' },
  { id: '3', name: 'Revenue Recovery Audit', type: 'Financial', date: 'May 10, 2026', status: 'archived' },
  { id: '4', name: 'Sales Pipeline Velocity', type: 'Operations', date: 'May 1, 2026', status: 'final' },
];

export const mockAgencyDashboard = {
  totalClients: 42,
  activeCampaigns: 156,
  totalManagedSpend: '$1.2M',
  avgClientHealth: 84,
  clients: [
    { name: 'TechCore Solutions', health: 92, spend: '$12k', status: 'active' },
    { name: 'Aria Green', health: 78, spend: '$8k', status: 'warning' },
    { name: 'Nexus Group', health: 88, spend: '$25k', status: 'active' },
    { name: 'Skyline Inc', health: 64, spend: '$15k', status: 'critical' },
  ]
};

export const mockBusinessDashboard = {
  businessName: "Acme Enterprise",
  locations: 12,
  totalEmployees: 450,
  departmentScores: [
    { name: 'Marketing', score: 82 },
    { name: 'Sales', score: 78 },
    { name: 'Finance', score: 94 },
    { name: 'Ops', score: 85 },
  ]
};

export const mockSuperAdmin = {
  totalUsers: 1240,
  totalOrganizations: 320,
  systemHealth: 'Healthy',
  pendingSupport: 5,
  recentOrgs: [
    { name: 'New Corp', created: '2h ago', plan: 'Enterprise' },
    { name: 'Startup Inc', created: '5h ago', plan: 'Pro' },
    { name: 'Small Biz', created: '1d ago', plan: 'Free' },
  ]
};

export const getConnectednessScore = () => {
  const connectedCount = mockIntegrations.filter(i => i.status === 'connected').length;
  const totalPotential = mockIntegrations.filter(i => i.status !== 'coming_soon').length;
  return Math.round((connectedCount / totalPotential) * 100);
};
