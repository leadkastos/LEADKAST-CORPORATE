'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { cn } from '@/lib/utils';
import {
  DollarSign, Users, TrendingUp, Zap,
  ArrowUpRight, Plus, BarChart3,
  AlertTriangle, Lightbulb, ChevronRight,
  Activity, Target, ShoppingCart, CreditCard, Clock,
  Sparkles, ArrowRight, Eye, Download,
  Globe, MessageSquare, CheckCircle2,
  TrendingDown, Minus,
} from 'lucide-react';
import { useState } from 'react';
import { kpiMetrics, channelData, revenueByMonth, customerByMonth, monthLabels, recentActivity } from '@/lib/mock-data';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'revenue' | 'customers'>('revenue');
  const chartData = activeTab === 'revenue' ? revenueByMonth : customerByMonth;
  const chartColor = activeTab === 'revenue' ? 'from-blue-600 via-blue-500 to-cyan-400' : 'from-emerald-600 via-emerald-500 to-green-400';

  return (
    <DashboardLayout>
      {/* ════════════ MORNING BRIEF ════════════ */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-indigo-950/30 border border-slate-800/60 p-6 sm:p-8 lg:p-10 shadow-[0_0_60px_-15px] shadow-blue-500/5">
        {/* Ambient glow orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-500/8 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-indigo-500/3 to-transparent" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 ring-1 ring-white/10">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  Live
                </span>
                <span className="text-xs text-slate-500">Updated 2 min ago</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Good morning,{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">LeadKast.</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Business health at <span className="text-emerald-400 font-semibold">94/100</span> — up 3pts from last month.{' '}
              <span className="text-slate-500">Your MRR hit <span className="text-white font-medium">$180k</span> with 18 new customers.</span>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="group relative px-5 py-3 rounded-xl border border-slate-700/60 text-slate-300 text-sm font-medium hover:text-white hover:border-slate-600 transition-all bg-slate-800/40 hover:bg-slate-800/60 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2"><Download className="h-4 w-4" />Export</span>
            </button>
            <button className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-600/30 overflow-hidden">
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
              <span className="relative z-10 flex items-center gap-2"><Plus className="h-4 w-4" />New Report</span>
            </button>
          </div>
        </div>

        {/* Quick metrics bar */}
        <div className="relative mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/5">
          {[
            { label: 'Days Until Quarter End', value: '18', change: '-12' },
            { label: 'Team Online', value: '12', change: '+3', icon: 'green' as const },
            { label: 'Unread Alerts', value: '5', change: '+2', icon: 'amber' as const },
            { label: 'Tasks Due Today', value: '3', change: '-1' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 group cursor-default">
              <div className={cn(
                "h-2.5 w-2.5 rounded-full ring-2 ring-offset-2 ring-offset-slate-950 transition-transform group-hover:scale-125",
                stat.icon === 'green' ? 'bg-emerald-500 ring-emerald-500/30' :
                stat.icon === 'amber' ? 'bg-amber-500 ring-amber-500/30' :
                'bg-blue-500/50 ring-blue-500/20'
              )} />
              <div>
                <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <span className={cn("text-[11px] font-medium", stat.change.startsWith('+') ? 'text-emerald-400' : 'text-slate-500')}>{stat.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ KPI STRIP ════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-8">
        {kpiMetrics.map(m => <KpiCard key={m.title} {...m} />)}
      </div>

      {/* ════════════ MAIN GRID ════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* ── Performance Chart ── */}
        <div className="lg:col-span-7 group relative bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800/50 rounded-3xl p-5 sm:p-6 lg:p-7 transition-all duration-500 hover:border-slate-700/70 hover:shadow-[0_0_40px_-12px] hover:shadow-blue-500/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-transparent pointer-events-none" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-blue-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Performance Overview</h2>
                  <span className={cn(
                    "text-[11px] font-semibold px-2 py-0.5 rounded-full border",
                    activeTab === 'revenue' ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                  )}>
                    {activeTab === 'revenue' ? '+16.7%' : '+12.5%'}
                  </span>
                </div>
                <p className="text-xs text-slate-500">12-month trend — hover bars for details</p>
              </div>
              <div className="flex items-center gap-1 bg-slate-800/60 rounded-xl p-1 border border-slate-700/50">
                <button onClick={() => setActiveTab('revenue')} className={cn("px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all", activeTab === 'revenue' ? 'bg-blue-500/20 text-blue-300 shadow-sm' : 'text-slate-500 hover:text-slate-300')}>Revenue</button>
                <button onClick={() => setActiveTab('customers')} className={cn("px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all", activeTab === 'customers' ? 'bg-emerald-500/20 text-emerald-300 shadow-sm' : 'text-slate-500 hover:text-slate-300')}>Customers</button>
              </div>
            </div>

            {/* Chart */}
            <div className="relative">
              <div className="absolute -left-1 top-0 bottom-7 flex flex-col justify-between text-[10px] text-slate-600 font-medium">
                {['200','150','100','50','0'].map(l => <span key={l}>{l}</span>)}
              </div>
              <div className="h-64 ml-12 pl-1">
                <div className="relative h-full">
                  {[0,1,2,3,4].map(i => <div key={i} className="absolute left-0 right-0 border-t border-slate-800/20" style={{ top: `${i*25}%` }} />)}
                  <div className="absolute inset-0 bottom-0 flex items-end gap-[2px] sm:gap-1">
                    {chartData.map((v, i) => {
                      const max = Math.max(...chartData);
                      const h = (v / max) * 88;
                      const isPeak = v === max || v > (chartData[i-1]||0) && v > (chartData[i+1]||0);
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end h-[92%] group/bar">
                          <div className="w-full relative rounded-sm sm:rounded-t-sm transition-all duration-300 hover:scale-y-105 origin-bottom" style={{ height: `${h}%` }}>
                            <div className={cn(
                              "absolute bottom-0 left-0 right-0 bg-gradient-to-t rounded-sm sm:rounded-t-sm transition-all duration-500 group-hover/bar:opacity-90",
                              isPeak ? `${chartColor} ring-1 ring-white/10` : chartColor,
                              "shadow-lg shadow-blue-500/10"
                            )} style={{ height: '100%' }} />
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] px-3 py-1.5 rounded-xl opacity-0 group-hover/bar:opacity-100 transition-all duration-200 whitespace-nowrap shadow-2xl border border-slate-700/50 backdrop-blur-sm translate-y-1 group-hover/bar:translate-y-0">
                              <span className="font-semibold">{activeTab === 'revenue' ? `$${v}k` : v.toLocaleString()}</span>
                              {i > 0 && <span className={cn("ml-2", v > chartData[i-1] ? 'text-emerald-400' : 'text-rose-400')}>{v > chartData[i-1] ? '▲' : '▼'} {Math.abs(((v - chartData[i-1]) / chartData[i-1]) * 100).toFixed(1)}%</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex ml-12 mt-2">{chartData.map((_, i) => i % 2 === 0 || i === chartData.length - 1 ? <div key={i} className="flex-1 text-center"><span className="text-[9px] text-slate-600 font-medium">{monthLabels[i]}</span></div> : <div key={i} className="flex-1" />)}</div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-800/40">
              <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-sm bg-gradient-to-br from-blue-500 to-cyan-400 shadow-sm" /><span className="text-xs text-slate-500">{activeTab === 'revenue' ? 'Monthly Revenue' : 'Active Customers'}</span></div>
              <span className="text-xs font-medium text-emerald-400 ml-auto flex items-center gap-1"><TrendingUp className="h-3 w-3" />Growing {activeTab === 'revenue' ? '16.7%' : '12.5%'} YoY</span>
            </div>
          </div>
        </div>

        {/* ── Revenue Channels ── */}
        <div className="lg:col-span-5 group relative bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800/50 rounded-3xl p-5 sm:p-6 lg:p-7 transition-all duration-500 hover:border-slate-700/70 hover:shadow-[0_0_40px_-12px] hover:shadow-indigo-500/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-transparent pointer-events-none" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 border border-indigo-500/20 flex items-center justify-center">
                <Globe className="h-4 w-4 text-indigo-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Revenue Channels</h2>
            </div>
            <p className="text-xs text-slate-500 mb-6">MRR distribution by acquisition channel</p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Donut */}
              <div className="relative h-40 w-40 shrink-0 group/donut">
                <div className="h-full w-full rounded-full transition-transform duration-500 group-hover/donut:scale-105" style={{
                  background: `conic-gradient(#3B82F6 0% 35%, #6366F1 35% 60%, #8B5CF6 60% 80%, #A855F7 80% 92%, #10B981 92% 100%)`,
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
                }}>
                  <div className="absolute inset-[6px] rounded-full bg-slate-950 flex items-center justify-center shadow-inner shadow-black/50">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white drop-shadow-lg">$180k</p>
                      <p className="text-[10px] text-slate-500 -mt-0.5 tracking-wider uppercase">MRR</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full space-y-3.5">
                {channelData.map((ch, i) => (
                  <div key={ch.name} className="group/channel cursor-default">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-3 w-3 rounded-full shadow-sm" style={{ backgroundColor: ch.color }} />
                        <span className="text-sm text-slate-400 group-hover/channel:text-slate-200 transition-colors">{ch.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-white">{ch.value}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800/60 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 group-hover/channel:opacity-80"
                        style={{ width: `${ch.value * 2}%`, backgroundColor: ch.color, boxShadow: `0 0 8px ${ch.color}40` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/40 flex items-start gap-3">
              <div className="h-7 w-7 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                <span className="text-amber-400 font-medium">Key Insight:</span> Organic search grew{' '}
                <span className="text-emerald-400 font-medium">18% MoM</span> — your SEO strategy is delivering a{' '}
                <span className="text-white font-medium">3.2x ROI</span> versus paid channels.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ BOTTOM GRID ════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Needs Attention ── */}
        <div className="lg:col-span-7 group relative bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800/50 rounded-3xl p-5 sm:p-6 lg:p-7 transition-all duration-500 hover:border-slate-700/70 hover:shadow-[0_0_40px_-12px] hover:shadow-amber-500/5 overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">Needs Attention</h2>
                <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">5</span>
              </div>
              <p className="text-xs text-slate-500">Items requiring your executive review</p>
            </div>
            <button className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">View All <ChevronRight className="h-3 w-3" /></button>
          </div>

          <div className="space-y-2.5">
            {[
              { title: 'Ad budget at 92% of monthly cap', desc: 'Google Ads spend approaching limit with 5 days remaining', time: '2h ago', type: 'warning' as const },
              { title: 'Enterprise deal closed: Acme Corp', desc: 'Largest deal this quarter — $24k/mo Enterprise contract signed', time: '4h ago', type: 'success' as const },
              { title: 'CRM integration sync failure', desc: 'HubSpot API error: 12 records failed to sync in last batch', time: '6h ago', type: 'error' as const },
              { title: 'Q4 revenue target achieved at 108%', desc: 'Quarterly target hit two weeks ahead of schedule', time: '1d ago', type: 'success' as const },
              { title: 'Churn risk: 3 accounts flagged', desc: 'Combined ARR exposure of $45k across high-risk accounts', time: '1d ago', type: 'warning' as const },
            ].map((alert, i) => {
              const dotColor = alert.type === 'warning' ? 'bg-amber-500 shadow-amber-500/30' : alert.type === 'error' ? 'bg-rose-500 shadow-rose-500/30' : 'bg-emerald-500 shadow-emerald-500/30';
              return (
                <div key={i} className={cn(
                  "group/alert flex items-start gap-3.5 p-3.5 rounded-2xl border border-slate-800/40 transition-all duration-200 cursor-pointer",
                  "hover:bg-slate-800/30 hover:border-slate-700/50 hover:translate-x-0.5"
                )}>
                  <div className={cn("mt-2 h-2.5 w-2.5 rounded-full shrink-0 ring-2 ring-slate-900 transition-transform group-hover/alert:scale-125", dotColor)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-slate-200 group-hover/alert:text-white transition-colors">{alert.title}</p>
                      <span className="text-[10px] text-slate-600 shrink-0 whitespace-nowrap">{alert.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{alert.desc}</p>
                    <button className="mt-1.5 text-[11px] font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-0.5">
                      {alert.type === 'warning' ? 'Review Campaigns' : alert.type === 'error' ? 'Investigate' : 'View'} <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="lg:col-span-5 space-y-6">
          {/* Next Actions */}
          <div className="group relative bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800/50 rounded-3xl p-5 sm:p-6 lg:p-7 transition-all duration-500 hover:border-slate-700/70 overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-blue-400" />
              </div>
              <div><h2 className="text-lg font-semibold text-white">Next Actions</h2><p className="text-xs text-slate-500">Prioritized for today</p></div>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Optimize underperforming ad campaigns', desc: '3 campaigns with ROAS below 2.0x', impact: '+15% ROAS', priority: 'high' as const },
                { title: 'Follow up with 5 warm leads', desc: 'Scored 85+ from last demo — ready for outreach', impact: '+$38k pipeline', priority: 'high' as const },
                { title: 'Approve Q1 content strategy', desc: 'Editorial calendar and budget pending review', impact: 'Brand alignment', priority: 'medium' as const },
                { title: 'Review pricing tier adjustments', desc: 'Competitor data suggests 12% optimization room', impact: '+8% MRR', priority: 'medium' as const },
              ].map((action, i) => (
                <div key={i} className={cn(
                  "group/action p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer",
                  action.priority === 'high' ? 'border-l-2 border-l-rose-500/50 border-slate-800/40 hover:bg-slate-800/30 hover:border-slate-700/50' : 'border-slate-800/40 hover:bg-slate-800/30 hover:border-slate-700/50'
                )}>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="text-sm font-medium text-slate-200 group-hover/action:text-white transition-colors">{action.title}</h3>
                    <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full border shrink-0", action.priority === 'high' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20')}>{action.priority}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{action.desc}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/30">
                    <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1"><Target className="h-3 w-3" />{action.impact}</span>
                    <button className="text-[11px] font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-0.5">Start <ArrowRight className="h-3 w-3" /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800/40 grid grid-cols-3 gap-3">
              <div className="text-center p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/30"><p className="text-sm font-bold text-white">3</p><p className="text-[10px] text-slate-500">High Priority</p></div>
              <div className="text-center p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/30"><p className="text-sm font-bold text-white">5</p><p className="text-[10px] text-slate-500">Open Tasks</p></div>
              <div className="text-center p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/30"><p className="text-sm font-bold text-emerald-400">$86k</p><p className="text-[10px] text-slate-500">Pipeline</p></div>
            </div>
          </div>

          {/* Team Activity */}
          <div className="group relative bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800/50 rounded-3xl p-5 sm:p-6 lg:p-7 transition-all duration-500 hover:border-slate-700/70 overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/10 border border-violet-500/20 flex items-center justify-center">
                <Activity className="h-4 w-4 text-violet-400" />
              </div>
              <div><h2 className="text-lg font-semibold text-white">Team Activity</h2><p className="text-xs text-slate-500">Latest from your team</p></div>
            </div>
            <div className="space-y-4">
              {recentActivity.slice(0, 4).map((act, i) => (
                <div key={i} className="flex items-start gap-3 group/act cursor-pointer">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center shrink-0 ring-2 ring-slate-800 shadow-sm">
                    <span className="text-xs font-bold text-white">{act.user.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200 group-hover/act:text-white transition-colors leading-snug">
                      <span className="font-semibold">{act.user}</span>
                      <span className="text-slate-500"> {act.action} </span>
                      <span className="font-medium text-slate-300">{act.target}</span>
                    </p>
                    <div className="flex items-center gap-2.5 mt-0.5">
                      <span className="text-xs font-medium text-emerald-400">{act.value}</span>
                      <span className="text-[10px] text-slate-600">· {act.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 pt-4 border-t border-slate-800/40 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center gap-1 group/view">
              View all activity <ArrowRight className="h-3 w-3 transition-transform group-hover/view:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ════════════ BOTTOM STATS ════════════ */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Eye, label: 'Dashboard Views', value: '2,847', change: '+12.3%' },
          { icon: MessageSquare, label: 'Team Messages', value: '142', change: '+8.1%' },
          { icon: ShoppingCart, label: 'New Orders', value: '89', change: '+5.4%' },
          { icon: Clock, label: 'Response Time', value: '1.8h', change: '-24%' },
        ].map((stat) => (
          <div key={stat.label} className="group relative bg-gradient-to-br from-slate-900/60 to-slate-900/20 border border-slate-800/50 rounded-2xl p-4 flex items-center justify-between transition-all duration-300 hover:border-slate-700/70 hover:shadow-[0_0_20px_-8px] hover:shadow-blue-500/5 cursor-default overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
            <div className="relative flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
                <stat.icon className="h-4 w-4 text-slate-400" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">{stat.label}</p>
                <p className="text-lg font-bold text-white">{stat.value}</p>
              </div>
            </div>
            <span className="relative text-xs font-semibold text-emerald-400">{stat.change}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}