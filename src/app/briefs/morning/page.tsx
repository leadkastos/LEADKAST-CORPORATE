'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { cn } from '@/lib/utils';
import {
  Sun, Clock, TrendingUp, DollarSign,
  Users, Activity, Calendar, Bell, Zap,
  Eye, ShoppingCart, MessageSquare, Download, BarChart3, CheckCircle2, Target
} from 'lucide-react';

const morningMetrics = [
  { title: 'Overnight Revenue', value: '$12,430', change: '+8.2%', trend: 'up' as const, icon: DollarSign, iconColor: 'text-emerald-400', subtitle: 'vs $11,480 yesterday', sparkline: [48,52,45,58,55,62,58,65,70,68,72,78] },
  { title: 'New Signups (24h)', value: '48', change: '+22%', trend: 'up' as const, icon: Users, iconColor: 'text-blue-400', subtitle: '14 trial / 34 paid', sparkline: [20,25,30,28,35,32,38,42,40,45,48,52] },
  { title: 'Todays Pipeline', value: '$28.5k', change: '+15%', trend: 'up' as const, icon: TrendingUp, iconColor: 'text-indigo-400', subtitle: 'From 12 active opportunities', sparkline: [35,40,38,45,42,48,52,50,55,58,62,68] },
  { title: 'System Health', value: '98.2%', change: '+0.3%', trend: 'up' as const, icon: Activity, iconColor: 'text-emerald-400', subtitle: 'All systems operational', sparkline: [92,93,94,94,95,96,95,96,97,97,98,98] },
];

const scheduleHighlights = [
  { time: '9:00 AM', title: 'Leadership Standup', icon: Users, desc: 'Daily sync with department heads', attendees: '5 attendees' },
  { time: '10:30 AM', title: 'Marketing Review', icon: TrendingUp, desc: 'Campaign performance and budget review', attendees: '3 attendees' },
  { time: '1:00 PM', title: 'Board Prep Meeting', icon: Target, desc: 'Q4 board deck final review', attendees: '4 attendees' },
  { time: '3:30 PM', title: 'Customer Success Sync', icon: Users, desc: 'Churn risk account review', attendees: '6 attendees' },
];

const quickStats = [
  { icon: Eye, label: 'Dashboard Views', value: '342', change: '+12%' },
  { icon: ShoppingCart, label: 'Orders Today', value: '28', change: '+8%' },
  { icon: MessageSquare, label: 'Team Messages', value: '64', change: '+3%' },
  { icon: Clock, label: 'Avg Response', value: '1.2h', change: '-18%' },
];

export default function MorningBriefPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <Sun className="h-6 w-6 text-amber-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Morning Brief</h1>
          </div>
          <p className="text-slate-400 text-sm">Start your day with a clear picture of business health.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="border border-slate-700/80 text-slate-400 px-4 py-2 rounded-xl text-sm font-medium hover:text-white hover:border-slate-600 bg-slate-800/40 flex items-center gap-2"><Calendar className="h-4 w-4" />Today</button>
          <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/25 flex items-center gap-2"><Download className="h-4 w-4" />Export</button>
        </div>
      </div>

      {/* Banner */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border p-6 sm:p-8 bg-gradient-to-br from-amber-500/5 via-slate-900 to-slate-950 border-amber-500/10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 bg-amber-500/5" />
        <div className="relative flex items-start gap-4 sm:gap-6">
          <div className="h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg bg-gradient-to-br from-amber-500 to-amber-600 shadow-amber-500/25">
            <Sun className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium px-3 py-1 rounded-full border text-amber-400 bg-amber-500/10 border-amber-500/20">
                Good morning, LeadKast
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="h-3 w-3" />Updated 5 min ago</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Heres your business snapshot for today.
            </h2>
            <p className="text-slate-400 mt-1 text-sm max-w-xl">
              {morningMetrics[0].value} earned overnight. {morningMetrics[1].value} new signups. {morningMetrics[2].value} in pipeline.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6">
        {morningMetrics.map(m => <KpiCard key={m.title} {...m} />)}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Todays Schedule */}
        <div className="lg:col-span-7 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5 sm:p-6 hover:border-slate-700/80 transition-all">
          <div className="flex items-center gap-2 mb-5"><Calendar className="h-5 w-5 text-blue-400" /><h2 className="text-lg font-semibold text-white">Today's Schedule</h2></div>
          <div className="space-y-1">
            {scheduleHighlights.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-3.5 rounded-xl border border-slate-800/40 hover:bg-slate-800/30 hover:border-slate-700/50 transition-all group cursor-pointer">
                <div className="text-xs text-slate-600 font-mono w-14 shrink-0 pt-0.5">{item.time}</div>
                <div className={cn("p-2 rounded-lg bg-slate-800/60 ring-1 ring-slate-700/50 shrink-0 text-amber-400")}>
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
                <span className="text-[10px] text-slate-600 shrink-0">{item.attendees}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Overnight Highlights */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5 sm:p-6 hover:border-slate-700/80 transition-all">
            <div className="flex items-center gap-2 mb-4"><Bell className="h-5 w-5 text-amber-400" /><h2 className="text-lg font-semibold text-white">Overnight Highlights</h2></div>
            <div className="space-y-3">
              {[
                { icon: DollarSign, text: 'Enterprise deal closed: Acme Corp', sub: '+$24k MRR', color: 'text-emerald-400' },
                { icon: Users, text: '14 new trial signups overnight', sub: '12 from organic search', color: 'text-blue-400' },
                { icon: TrendingUp, text: 'Ad campaign ROAS hit 5.2x', sub: 'Best performing day this quarter', color: 'text-indigo-400' },
                { icon: Target, text: 'Q4 revenue at 92% of target', sub: 'On track to exceed by 8%', color: 'text-emerald-400' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 group cursor-pointer">
                  <div className={cn("p-1.5 rounded-lg bg-slate-800/60 ring-1 ring-slate-700/50 shrink-0", item.color)}><item.icon className="h-3.5 w-3.5" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200 group-hover:text-white">{item.text}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5 sm:p-6 hover:border-slate-700/80 transition-all">
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2"><Zap className="h-4 w-4 text-amber-400" />Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Bell, label: 'Review Alerts', count: '8 new' },
                { icon: CheckCircle2, label: 'Approve Tasks', count: '3 pending' },
                { icon: BarChart3, label: 'View Reports', count: '2 updated' },
                { icon: Users, label: 'Team Overview', count: '12 online' },
              ].map((action) => (
                <button key={action.label} className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-800/40 hover:bg-slate-800/30 hover:border-slate-700/50 transition-all text-left group">
                  <div className="p-1.5 rounded-lg bg-slate-800/60 text-blue-400"><action.icon className="h-4 w-4" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-200 group-hover:text-white">{action.label}</p>
                    <p className="text-[10px] text-slate-600">{action.count}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickStats.map(stat => (
          <div key={stat.label} className="bg-gradient-to-br from-slate-900/50 to-slate-900/20 border border-slate-800/60 rounded-xl p-4 flex items-center justify-between group hover:border-slate-700/80 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-800/60 ring-1 ring-slate-700/50"><stat.icon className="h-4 w-4 text-slate-400" /></div>
              <div><p className="text-[11px] text-slate-500 font-medium">{stat.label}</p><p className="text-lg font-bold text-white">{stat.value}</p></div>
            </div>
            <span className="text-xs font-semibold text-emerald-400">{stat.change}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
