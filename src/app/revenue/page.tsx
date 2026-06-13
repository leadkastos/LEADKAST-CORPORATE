'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { cn } from '@/lib/utils';
import {
  DollarSign, TrendingUp, Users, Activity,
  BarChart3, PieChart, ArrowUpRight, ChevronRight,
  Calendar, Download, Plus, Lightbulb, Target,
  CreditCard, ShoppingCart, Clock, Zap,
} from 'lucide-react';
import { useState } from 'react';
import { revenueByMonth, customerByMonth, monthLabels, channelData, quarterlyData } from '@/lib/mock-data';

const revenueKpis = [
  { title: 'Annual Recurring Revenue', value: '$2.16M', change: '+24.3%', trend: 'up' as const, icon: DollarSign, iconColor: 'text-emerald-400', subtitle: '$180k MRR / 92% gross margin', sparkline: [40,45,52,48,55,60,58,65,70,68,75,82] },
  { title: 'Avg Revenue Per User', value: '$144', change: '+8.2%', trend: 'up' as const, icon: Users, iconColor: 'text-blue-400', subtitle: 'Up from $133 last quarter', sparkline: [50,52,55,58,60,62,65,68,72,75,78,82] },
  { title: 'Monthly Growth Rate', value: '4.2%', change: '+0.5%', trend: 'up' as const, icon: TrendingUp, iconColor: 'text-indigo-400', subtitle: 'Above industry avg of 3.1%', sparkline: [45,48,46,52,50,55,52,58,54,60,56,62] },
  { title: 'Revenue per Employee', value: '$184k', change: '+12.1%', trend: 'up' as const, icon: Activity, iconColor: 'text-violet-400', subtitle: '12 FTE / $2.16M ARR', sparkline: [60,62,65,64,68,70,72,71,74,76,78,80] },
];

const productBreakdown = [
  { name: 'Enterprise SaaS', mrr: 98, growth: '+15%', margin: '88%', color: 'bg-blue-500' },
  { name: 'Professional Plan', mrr: 52, growth: '+8%', margin: '82%', color: 'bg-indigo-500' },
  { name: 'Starter Plan', mrr: 22, growth: '+3%', margin: '75%', color: 'bg-violet-500' },
  { name: 'Add-ons & Services', mrr: 8, growth: '+22%', margin: '90%', color: 'bg-emerald-500' },
];

const revenueByMonthData = revenueByMonth.map((v, i) => ({ month: monthLabels[i], value: v }));
const customerGrowthData = customerByMonth.map((v, i) => ({ month: monthLabels[i], value: v }));

export default function RevenuePage() {
  const [chartView, setChartView] = useState<'revenue' | 'customers'>('revenue');
  const chartData = chartView === 'revenue' ? revenueByMonthData : customerGrowthData;
  const maxVal = Math.max(...chartData.map(d => d.value));

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <DollarSign className="h-6 w-6 text-emerald-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Revenue Intelligence</h1>
          </div>
          <p className="text-slate-400 text-sm">Deep revenue analytics, trends, and forecasting.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="border border-slate-700/80 text-slate-400 px-4 py-2.5 rounded-xl text-sm font-medium hover:text-white hover:border-slate-600 bg-slate-800/40 flex items-center gap-2"><Calendar className="h-4 w-4" />Year to Date<ChevronRight className="h-3 w-3 -rotate-90" /></button>
          <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-600/25 flex items-center gap-2"><Download className="h-4 w-4" />Export</button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6">
        {revenueKpis.map(m => <KpiCard key={m.title} {...m} />)}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Revenue Growth Chart */}
        <div className="lg:col-span-7 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5 sm:p-6 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div><div className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-emerald-400" /><h2 className="text-lg font-semibold text-white">Revenue Growth</h2></div><p className="text-xs text-slate-500 mt-0.5">12-month trend with monthly breakdown</p></div>
            <div className="flex items-center gap-1 bg-slate-800/60 rounded-lg p-1">
              <button onClick={() => setChartView('revenue')} className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-all", chartView === 'revenue' ? 'bg-emerald-500/20 text-emerald-300 shadow-sm' : 'text-slate-500 hover:text-slate-300')}>Revenue</button>
              <button onClick={() => setChartView('customers')} className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-all", chartView === 'customers' ? 'bg-emerald-500/20 text-emerald-300 shadow-sm' : 'text-slate-500 hover:text-slate-300')}>Customers</button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-1 top-0 bottom-6 flex flex-col justify-between text-[10px] text-slate-600 font-medium">
              {['$200k','$150k','$100k','$50k','$0'].map(l => <span key={l}>{l}</span>)}
            </div>
            <div className="h-64 ml-12 pl-1">
              <div className="relative h-full">
                {[0,1,2,3,4].map(i => <div key={i} className="absolute left-0 right-0 border-t border-slate-800/30" style={{ top: `${i*25}%` }} />)}
                <div className="absolute inset-0 bottom-0 flex items-end gap-2">
                  {chartData.map((d, i) => (
                    <div key={d.month} className="flex-1 flex flex-col items-center justify-end h-[92%] group/bar">
                      <div className="w-full relative rounded-t-sm" style={{ height: `${(d.value/maxVal)*88}%` }}>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm transition-all duration-500 group-hover/bar:from-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20" style={{ height: '100%' }} />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 whitespace-nowrap shadow-xl z-10 border border-slate-700/50">
                          {chartView === 'revenue' ? `$${d.value}k` : `${d.value}`}
                        </div>
                        {/* Peak indicator */}
                        {i > 0 && d.value > chartData[i-1].value && d.value > (chartData[i+1]?.value || 0) && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] text-emerald-400/60">▲</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex ml-12 mt-2">{chartData.map(d => <div key={d.month} className="flex-1 text-center"><span className="text-[9px] text-slate-600 font-medium">{d.month}</span></div>)}</div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-800/50">
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /><span className="text-[11px] text-slate-500">{chartView === 'revenue' ? 'Monthly Revenue' : 'Active Customers'}</span></div>
            <span className="text-[11px] font-medium text-emerald-400 ml-auto">{chartView === 'revenue' ? '+16.7%' : '+12.5%'} vs last period</span>
          </div>
        </div>

        {/* Product Breakdown */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5 sm:p-6 hover:border-slate-700/80 transition-all">
          <div className="flex items-center gap-2 mb-4"><PieChart className="h-5 w-5 text-emerald-400" /><h2 className="text-lg font-semibold text-white">Revenue by Product</h2></div>
          <p className="text-xs text-slate-500 mb-6">MRR breakdown across product lines</p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Mini donut */}
            <div className="relative h-36 w-36 shrink-0">
              <div className="h-full w-full rounded-full" style={{ background: 'conic-gradient(#3B82F6 0% 55%, #6366F1 55% 83%, #8B5CF6 83% 95%, #10B981 95% 100%)' }}>
                <div className="absolute inset-[5px] rounded-full bg-slate-950 flex items-center justify-center">
                  <div className="text-center"><p className="text-xl font-bold text-white">$180k</p><p className="text-[10px] text-slate-500 -mt-0.5">MRR</p></div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full space-y-3.5">
              {productBreakdown.map(p => (
                <div key={p.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={cn("h-2.5 w-2.5 rounded-full", p.color)} />
                      <span className="text-xs text-slate-400">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">${p.mrr}k</span>
                      <span className="text-[10px] text-emerald-400">{p.growth}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", p.color.replace('bg-', 'bg-').replace('500', '500/80'))} style={{ width: `${(p.mrr/180)*100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/50 flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-500"><span className="text-amber-400 font-medium">Insight:</span> Add-ons grew 22% — expanding services could unlock $15k additional MRR.</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Quarterly Breakdown */}
        <div className="lg:col-span-7 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5 sm:p-6 hover:border-slate-700/80 transition-all">
          <div className="flex items-center gap-2 mb-5"><Activity className="h-5 w-5 text-emerald-400" /><h2 className="text-lg font-semibold text-white">Quarterly Revenue Breakdown</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800/60">
                  {['Quarter', 'Revenue', 'Customers', 'Growth Rate', 'YoY Change', 'Trend'].map(h => <th key={h} className="text-left py-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {quarterlyData.map((q, i) => (
                  <tr key={q.quarter} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors cursor-pointer">
                    <td className="py-3.5 px-2 text-white font-medium">{q.quarter}</td>
                    <td className="py-3.5 px-2 text-slate-200 font-medium">${q.revenue}k</td>
                    <td className="py-3.5 px-2 text-slate-200">{q.customers}</td>
                    <td className="py-3.5 px-2"><span className="text-emerald-400 font-medium">+{q.growth}%</span></td>
                    <td className="py-3.5 px-2"><span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full text-xs">+{6 + i * 3}%</span></td>
                    <td className="py-3.5 px-2">
                      <div className="flex items-center gap-1">
                        {[1,2,3,4].map(s => <div key={s} className={cn("h-1 w-4 rounded-full", s <= q.growth/10 ? 'bg-emerald-500' : 'bg-slate-700')} />)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Metrics */}
        <div className="lg:col-span-5 space-y-4">
          {[
            { icon: CreditCard, label: 'Monthly Recurring Revenue', value: '$180,240', change: '+12.5%', sub: 'Net new: +$8,240 this month', color: 'text-emerald-400' },
            { icon: ShoppingCart, label: 'Average Deal Size', value: '$4,280', change: '+18.3%', sub: 'Enterprise: $24k / SMB: $1,200', color: 'text-blue-400' },
            { icon: Clock, label: 'Revenue Churn Rate', value: '2.1%', change: '-0.4%', sub: 'Gross retention: 97.9%', color: 'text-indigo-400' },
            { icon: Target, label: 'Net Revenue Retention', value: '118%', change: '+5%', sub: 'Expansion: $12k / Contraction: $3k', color: 'text-emerald-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-xl p-4 flex items-center justify-between group hover:border-slate-700/80 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg bg-slate-800/60 ring-1 ring-slate-700/50", stat.color)}><stat.icon className="h-4 w-4" /></div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">{stat.label}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-slate-600">{stat.sub}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-400">{stat.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Channel Distribution */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5 sm:p-6 hover:border-slate-700/80 transition-all">
        <div className="flex items-center gap-2 mb-5"><Target className="h-5 w-5 text-emerald-400" /><h2 className="text-lg font-semibold text-white">Revenue Channel Distribution</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {channelData.map((ch) => (
            <div key={ch.name} className="text-center p-4 rounded-xl border border-slate-800/40 hover:bg-slate-800/30 hover:border-slate-700/50 transition-all group">
              <div className="h-3 w-3 rounded-full mx-auto mb-2" style={{ backgroundColor: ch.color }} />
              <p className="text-lg font-bold text-white">{ch.value}%</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{ch.name}</p>
              <div className="mt-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${ch.value * 2}%`, backgroundColor: ch.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}