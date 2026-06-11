import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { cn } from '@/lib/utils';
import { 
  DollarSign, Users, TrendingUp, Zap,
  ArrowUpRight, Plus, BarChart3,
  AlertTriangle, Lightbulb, ChevronRight,
  Activity, Target, ShoppingCart, CreditCard, Clock,
} from 'lucide-react';

const revenueData = [
  { month: 'Jul', value: 42, mrr: 38 },
  { month: 'Aug', value: 55, mrr: 45 },
  { month: 'Sep', value: 48, mrr: 52 },
  { month: 'Oct', value: 70, mrr: 58 },
  { month: 'Nov', value: 62, mrr: 65 },
  { month: 'Dec', value: 85, mrr: 72 },
];

const channelData = [
  { name: 'Organic Search', value: 42, color: 'bg-blue-500' },
  { name: 'Paid Ads', value: 28, color: 'bg-indigo-500' },
  { name: 'Social Media', value: 18, color: 'bg-violet-500' },
  { name: 'Referrals', value: 12, color: 'bg-emerald-500' },
];

const alerts = [
  { title: 'Ad spend exceeded threshold', description: 'Google Ads budget at 92% with 5 days remaining', time: '2h ago', type: 'warning' as const, action: 'Review Campaigns' },
  { title: 'New Enterprise customer onboarded', description: 'Acme Corp completed onboarding - $24k MRR added', time: '4h ago', type: 'success' as const, action: 'View Profile' },
  { title: 'CRM sync error detected', description: 'HubSpot integration encountered 12 failed records', time: '6h ago', type: 'error' as const, action: 'Investigate' },
  { title: 'Q4 revenue target achieved', description: 'Quarterly target reached 2 weeks ahead of schedule', time: '1d ago', type: 'success' as const, action: 'View Report' },
  { title: 'Churn risk: 3 accounts flagged', description: 'High-risk accounts - total ARR at risk: $45k', time: '1d ago', type: 'warning' as const, action: 'Review Accounts' },
];

const actions = [
  { title: 'Review ad campaign performance', description: '3 campaigns underperforming - optimize budget allocation', priority: 'high' as const, impact: '+15% ROAS' },
  { title: 'Follow up with 5 warm leads', description: 'Leads from last demo scored 85+ - ready for sales outreach', priority: 'high' as const, impact: '+$38k pipeline' },
  { title: 'Update marketing calendar', description: 'Q1 content strategy needs final approval by Friday', priority: 'medium' as const, impact: 'Brand alignment' },
  { title: 'Review subscription pricing tiers', description: 'Competitor analysis suggests 12% room for optimization', priority: 'medium' as const, impact: '+8% MRR' },
];

const priorityStyles = {
  high: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

const alertStyles = {
  warning: { dot: 'bg-amber-500', bg: 'bg-amber-500/5', border: 'hover:border-amber-500/20' },
  success: { dot: 'bg-emerald-500', bg: 'bg-emerald-500/5', border: 'hover:border-emerald-500/20' },
  error: { dot: 'bg-rose-500', bg: 'bg-rose-500/5', border: 'hover:border-rose-500/20' },
};

export default function Home() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Executive Overview</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Your 30-second business health check.</p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <button className="border border-slate-800 text-slate-400 px-4 py-2 rounded-lg text-sm font-medium hover:text-white hover:border-slate-700 transition-all bg-slate-900/50">Download Report</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all flex items-center shadow-lg shadow-blue-600/20"><Plus className="h-4 w-4 mr-2" />Add Integration</button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
        <KpiCard title="Total Revenue" value="$128,430" change="+12.5%" trend="up" icon={DollarSign} iconColor="text-emerald-400" subtitle="$92k MRR / 24% YoY" sparkline={[30,42,38,55,48,62,58,70,65,78,72,85]} />
        <KpiCard title="Active Customers" value="1,240" change="+3.2%" trend="up" icon={Users} iconColor="text-blue-400" subtitle="12 new / 3 churned" sparkline={[50,52,55,58,60,62,65,68,72,75,78,82]} />
        <KpiCard title="Conversion Rate" value="4.8%" change="-0.4%" trend="down" icon={TrendingUp} iconColor="text-indigo-400" subtitle="vs 5.2% last month" sparkline={[72,75,70,68,72,65,62,60,58,55,52,48]} />
        <KpiCard title="Business Health" value="94/100" change="Stable" trend="neutral" icon={Zap} iconColor="text-amber-400" subtitle="Up 2pts from last month" sparkline={[80,82,85,82,86,88,90,89,91,92,93,94]} />
      </div>

      {/* Row 1: What Happened + Why */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 sm:p-6 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2"><BarChart3 className="h-4 w-4 text-blue-400" /><h2 className="text-base font-semibold text-white">What Happened</h2></div>
              <p className="text-xs text-slate-500 mt-0.5">Revenue growth trend - last 6 months</p>
            </div>
            <select className="bg-slate-800/80 border border-slate-700/50 text-slate-400 text-xs rounded-lg px-2.5 py-1.5 outline-none hover:border-slate-600 cursor-pointer"><option>Last 6 months</option><option>Last 12 months</option><option>Year to date</option></select>
          </div>
          <div className="relative">
            <div className="absolute -left-2 top-0 bottom-6 flex flex-col justify-between text-[10px] text-slate-600 font-medium pr-2"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
            <div className="h-56 ml-10 flex items-end space-x-3">
              {revenueData.map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center justify-end h-full space-y-1">
                  <div className="w-full bg-indigo-500/20 rounded-t-sm relative group" style={{ height: `${item.mrr}%` }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-sm transition-all duration-500 group-hover:from-indigo-400" style={{ height: `${item.mrr}%` }} />
                  </div>
                  <div className="w-full bg-blue-500/20 rounded-t-sm relative group" style={{ height: `${item.value}%` }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm transition-all duration-500 group-hover:from-blue-500" style={{ height: `${item.value}%` }} />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg z-10">${item.value}k</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex ml-10 mt-2">{revenueData.map((item) => (<div key={item.month} className="flex-1 text-center"><span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{item.month}</span></div>))}</div>
          <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-slate-800/60">
            <div className="flex items-center space-x-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-blue-500" /><span className="text-[11px] text-slate-500">Revenue</span></div>
            <div className="flex items-center space-x-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-indigo-500" /><span className="text-[11px] text-slate-500">MRR</span></div>
            <div className="text-[11px] text-emerald-500 ml-auto font-medium">+12.5% vs last period</div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 sm:p-6 hover:border-slate-700/80 transition-all">
          <div className="flex items-center space-x-2 mb-4"><Target className="h-4 w-4 text-indigo-400" /><h2 className="text-base font-semibold text-white">Why</h2></div>
          <p className="text-xs text-slate-500 mb-5">Marketing channel contribution</p>
          <div className="flex justify-center mb-6">
            <div className="relative h-36 w-36">
              <div className="h-full w-full rounded-full" style={{ background: 'conic-gradient(#3B82F6 0% 42%, #6366F1 42% 70%, #8B5CF6 70% 88%, #10B981 88% 100%)' }}>
                <div className="absolute inset-3 rounded-full bg-slate-950 flex items-center justify-center">
                  <div className="text-center"><p className="text-xl font-bold text-white">$128k</p><p className="text-[10px] text-slate-500 -mt-0.5">Total</p></div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2.5">
            {channelData.map((ch) => (
              <div key={ch.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2"><div className={cn("h-2.5 w-2.5 rounded-full", ch.color)} /><span className="text-sm text-slate-400">{ch.name}</span></div>
                <span className="text-sm font-medium text-slate-200">{ch.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/60">
            <div className="flex items-start space-x-2">
              <Lightbulb className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
              <p className="text-[11px] text-slate-500 leading-relaxed"><span className="text-amber-400 font-medium">Insight:</span> Organic search grew 18% MoM - SEO is paying off.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Needs Attention + Next Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 sm:p-6 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center space-x-2"><AlertTriangle className="h-4 w-4 text-amber-400" /><h2 className="text-base font-semibold text-white">Needs Attention</h2></div>
              <p className="text-xs text-slate-500 mt-0.5">5 items requiring executive review</p>
            </div>
            <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">View All</button>
          </div>
          <div className="space-y-2">
            {alerts.map((alert, i) => {
              const s = alertStyles[alert.type];
              return (
                <div key={i} className={cn("group flex items-start space-x-3 p-3.5 rounded-xl border border-slate-800/40 transition-all cursor-pointer", s.bg, s.border)}>
                  <div className={cn("mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 shadow-sm", s.dot)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-slate-200 group-hover:text-white">{alert.title}</p>
                      <span className="text-[10px] text-slate-600 shrink-0 ml-2">{alert.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{alert.description}</p>
                    <button className="mt-2 text-[11px] font-medium text-blue-400 hover:text-blue-300 flex items-center">{alert.action}<ChevronRight className="h-3 w-3 ml-0.5" /></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 sm:p-6 hover:border-slate-700/80 transition-all">
          <div className="flex items-center space-x-2 mb-5">
            <Lightbulb className="h-4 w-4 text-blue-400" />
            <div><h2 className="text-base font-semibold text-white">Next Actions</h2><p className="text-xs text-slate-500 mt-0.5">Recommended priorities for today</p></div>
          </div>
          <div className="space-y-3">
            {actions.map((action, i) => (
              <div key={i} className="group p-3.5 rounded-xl border border-slate-800/40 hover:bg-slate-800/30 hover:border-slate-700/50 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-medium text-slate-200 group-hover:text-white">{action.title}</h3>
                  <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full border shrink-0 ml-2", priorityStyles[action.priority])}>{action.priority}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{action.description}</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/40">
                  <span className="text-[11px] font-medium text-emerald-400">Impact: {action.impact}</span>
                  <button className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center">Start<ArrowUpRight className="h-3 w-3 ml-0.5" /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-slate-800/60">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2 rounded-lg bg-slate-800/40"><p className="text-sm font-bold text-white">3</p><p className="text-[10px] text-slate-500">High Priority</p></div>
              <div className="text-center p-2 rounded-lg bg-slate-800/40"><p className="text-sm font-bold text-white">5</p><p className="text-[10px] text-slate-500">Open Tasks</p></div>
              <div className="text-center p-2 rounded-lg bg-slate-800/40"><p className="text-sm font-bold text-emerald-400">$45k</p><p className="text-[10px] text-slate-500">Pipeline</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Activity, label: 'Page Views', value: '24.5k', change: '+8.2%', trend: 'up' as const },
          { icon: ShoppingCart, label: 'Orders', value: '342', change: '+5.7%', trend: 'up' as const },
          { icon: CreditCard, label: 'Avg. Order Value', value: '$186', change: '-2.1%', trend: 'down' as const },
          { icon: Clock, label: 'Avg. Response Time', value: '2.4h', change: '-18%', trend: 'up' as const },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900/30 border border-slate-800/60 rounded-lg p-4 flex items-center justify-between group hover:bg-slate-900/50 transition-all">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-slate-800/60"><stat.icon className="h-4 w-4 text-slate-400" /></div>
              <div><p className="text-xs text-slate-500">{stat.label}</p><p className="text-base font-semibold text-white">{stat.value}</p></div>
            </div>
            <span className={cn("text-xs font-medium", stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400')}>{stat.change}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}