import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { cn } from '@/lib/utils';
import {
  TrendingUp, Users, DollarSign, Activity,
  ArrowUpRight, BarChart3, Target, Zap,
  Calendar, ChevronDown, Download,
} from 'lucide-react';

const metrics = [
  { label: 'Revenue Growth', value: '+24.3%', change: '+3.2%', trend: 'up' as const, icon: DollarSign, color: 'text-emerald-400', subtitle: '$128k to $159k projected', sparkline: [40,45,52,48,55,60,58,65,70,68,75,82] },
  { label: 'Customer Acquisition', value: '+18.7%', change: '+2.1%', trend: 'up' as const, icon: Users, color: 'text-blue-400', subtitle: '48 new customers this quarter', sparkline: [30,35,32,40,38,45,42,48,52,50,55,60] },
  { label: 'Market Share', value: '12.4%', change: '+0.8%', trend: 'up' as const, icon: Target, color: 'text-indigo-400', subtitle: 'vs 11.6% last quarter', sparkline: [60,62,65,64,68,70,72,71,74,76,78,80] },
  { label: 'MoM Growth Rate', value: '4.2%', change: '+0.5%', trend: 'up' as const, icon: Activity, color: 'text-violet-400', subtitle: 'Above industry avg of 3.1%', sparkline: [50,52,48,55,58,54,60,62,58,65,68,72] },
];

const quarterlyData = [
  { quarter: 'Q1', revenue: 280, customers: 45, growth: 22 },
  { quarter: 'Q2', revenue: 320, customers: 52, growth: 28 },
  { quarter: 'Q3', revenue: 380, customers: 58, growth: 35 },
  { quarter: 'Q4', revenue: 450, customers: 65, growth: 42 },
];

const growthDrivers = [
  { name: 'Product Led Growth', contribution: 34, change: '+8%', color: 'bg-blue-500' },
  { name: 'Sales Development', contribution: 28, change: '+5%', color: 'bg-indigo-500' },
  { name: 'Content Marketing', contribution: 22, change: '+12%', color: 'bg-violet-500' },
  { name: 'Partner Channel', contribution: 16, change: '+3%', color: 'bg-emerald-500' },
];

const forecastMonths = [
  { month: 'Jan', actual: 128, forecast: null }, { month: 'Feb', actual: 132, forecast: null },
  { month: 'Mar', actual: 140, forecast: null }, { month: 'Apr', actual: 138, forecast: null },
  { month: 'May', actual: 145, forecast: null }, { month: 'Jun', actual: 152, forecast: null },
  { month: 'Jul', actual: null, forecast: 158 }, { month: 'Aug', actual: null, forecast: 165 },
  { month: 'Sep', actual: null, forecast: 172 }, { month: 'Oct', actual: null, forecast: 180 },
  { month: 'Nov', actual: null, forecast: 188 }, { month: 'Dec', actual: null, forecast: 195 },
];

export default function GrowthPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Growth Analytics</h1>
          </div>
          <p className="text-slate-400 mt-1 text-sm">Executive growth metrics, trends, and forward-looking forecasts.</p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <button className="border border-slate-800 text-slate-400 px-4 py-2 rounded-lg text-sm font-medium hover:text-white hover:border-slate-700 bg-slate-900/50 flex items-center"><Calendar className="h-4 w-4 mr-2" />This Year<ChevronDown className="h-3 w-3 ml-1.5 text-slate-500" /></button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center shadow-lg shadow-blue-600/20"><Download className="h-4 w-4 mr-2" />Export</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
        {metrics.map((m) => (
          <KpiCard key={m.label} title={m.label} value={m.value} change={m.change} trend={m.trend} icon={m.icon} iconColor={m.color} subtitle={m.subtitle} sparkline={m.sparkline} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 sm:p-6 hover:border-slate-700/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2"><BarChart3 className="h-4 w-4 text-emerald-400" /><h2 className="text-base font-semibold text-white">Revenue Forecast</h2></div>
              <p className="text-xs text-slate-500 mt-0.5">Actual vs projected annual trend</p>
            </div>
            <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">+24.3% YoY</span>
          </div>
          <div className="relative">
            <div className="absolute -left-2 top-0 bottom-6 flex flex-col justify-between text-[10px] text-slate-600 font-medium"><span>$200k</span><span>$150k</span><span>$100k</span><span>$50k</span><span>$0</span></div>
            <div className="h-56 ml-14 flex items-end space-x-2">
              {forecastMonths.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center justify-end h-full">
                  {m.actual && (
                    <div className="w-full bg-blue-500/20 rounded-t-sm relative group" style={{ height: `${(m.actual / 200) * 100}%` }}>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm transition-all duration-500 group-hover:from-blue-500" style={{ height: '100%' }} />
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg z-10">${m.actual}k</div>
                    </div>
                  )}
                  {m.forecast && (
                    <div className="w-full bg-emerald-500/20 rounded-t-sm relative group border-t-2 border-emerald-400/50" style={{ height: `${(m.forecast / 200) * 100}%` }}>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-600/60 to-emerald-400/40 rounded-t-sm transition-all duration-500 group-hover:from-emerald-500/70" style={{ height: '100%' }} />
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg z-10">${m.forecast}k</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex ml-14 mt-2">{forecastMonths.map((m) => (<div key={m.month} className="flex-1 text-center"><span className="text-[10px] text-slate-500 font-medium">{m.month}</span></div>))}</div>
          <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-slate-800/60">
            <div className="flex items-center space-x-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-blue-500" /><span className="text-[11px] text-slate-500">Actual</span></div>
            <div className="flex items-center space-x-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /><span className="text-[11px] text-slate-500">Forecast</span></div>
            <div className="text-[11px] text-emerald-500 ml-auto font-medium">Projected year-end: $195k</div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 sm:p-6 hover:border-slate-700/80">
          <div className="flex items-center space-x-2 mb-4"><Target className="h-4 w-4 text-emerald-400" /><h2 className="text-base font-semibold text-white">Growth Drivers</h2></div>
          <p className="text-xs text-slate-500 mb-5">Contribution to overall growth</p>
          <div className="space-y-5">
            {growthDrivers.map((driver) => (
              <div key={driver.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <div className={cn("h-2.5 w-2.5 rounded-full", driver.color)} />
                    <span className="text-sm text-slate-400">{driver.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">{driver.contribution}%</span>
                    <span className="text-xs text-emerald-400">{driver.change}</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", driver.color.replace('500', '500/80'))} style={{ width: `${driver.contribution}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-slate-800/60">
            <div className="flex items-start space-x-2">
              <Zap className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
              <p className="text-[11px] text-slate-500 leading-relaxed"><span className="text-amber-400 font-medium">Acceleration:</span> Content marketing is the fastest-growing channel at +12%.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 sm:p-6 hover:border-slate-700/80">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center space-x-2"><Activity className="h-4 w-4 text-emerald-400" /><h2 className="text-base font-semibold text-white">Quarterly Performance</h2></div>
            <p className="text-xs text-slate-500 mt-0.5">Year-over-year comparison by quarter</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800/60">
                <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Quarter</th>
                <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Revenue</th>
                <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Customers</th>
                <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Growth Rate</th>
                <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">YoY</th>
              </tr>
            </thead>
            <tbody>
              {quarterlyData.map((q, i) => (
                <tr key={q.quarter} className={cn("border-b border-slate-800/40 hover:bg-slate-800/20", i === quarterlyData.length - 1 && "border-b-0")}>
                  <td className="py-3.5 px-2 text-white font-medium">{q.quarter}</td>
                  <td className="py-3.5 px-2 text-right text-slate-200">${q.revenue}k</td>
                  <td className="py-3.5 px-2 text-right text-slate-200">{q.customers}</td>
                  <td className="py-3.5 px-2 text-right"><span className="text-emerald-400 font-medium">+{q.growth}%</span></td>
                  <td className="py-3.5 px-2 text-right"><span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full text-xs">+{6 + i * 3}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}