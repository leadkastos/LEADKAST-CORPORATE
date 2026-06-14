'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { cn } from '@/lib/utils';
import { actionItems, recentActivity } from '@/lib/mock-data';
import {
  Lightbulb, Target, CheckCircle2, Clock,
  ChevronRight, Search, Play, User,
} from 'lucide-react';
import { useState } from 'react';

const priorityStyles = { high: 'bg-rose-500/10 text-rose-400 border-rose-500/20', medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20', low: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };

const kpiStats = [
  { title: 'Open Actions', value: '8', icon: Target, iconColor: 'text-blue-400', subtitle: '3 high / 3 medium / 2 low', sparkline: [10,8,6,7,5,6,4,5,3,4,6,8], change: '-2', trend: 'up' as const },
  { title: 'Completed This Week', value: '12', icon: CheckCircle2, iconColor: 'text-emerald-400', subtitle: 'On track for target of 15', sparkline: [2,5,8,10,12,14,12,15,11,10,14,12], change: '+4', trend: 'up' as const },
  { title: 'Avg Completion Time', value: '2.4d', icon: Clock, iconColor: 'text-indigo-400', subtitle: 'Improved from 3.1d last month', sparkline: [75,72,68,65,62,58,55,52,48,45,42,40], change: '-23%', trend: 'up' as const },
  { title: 'Pipeline Impact', value: '$86k', icon: Target, iconColor: 'text-emerald-400', subtitle: 'From high-priority actions', sparkline: [20,25,30,35,40,45,50,55,60,65,75,86], change: '+$12k', trend: 'up' as const },
];

export default function ActionsPage() {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const filtered = actionItems.filter(a => {
    if (filter !== 'all' && a.priority !== filter) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const counts = { all: actionItems.length, high: actionItems.filter(a => a.priority === 'high').length, medium: actionItems.filter(a => a.priority === 'medium').length, low: actionItems.filter(a => a.priority === 'low').length };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1"><Lightbulb className="h-6 w-6 text-blue-400" /><h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Action Center</h1><span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">{counts.all} items</span></div>
          <p className="text-slate-400 text-sm">Prioritized actions and recommendations for your business.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="border border-slate-700/80 text-slate-400 px-4 py-2.5 rounded-xl text-sm font-medium hover:text-white hover:border-slate-600 bg-slate-800/40 flex items-center gap-2"><Clock className="h-4 w-4" />This Week</button>
          <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/25 flex items-center gap-2"><Play className="h-4 w-4" />Auto-Assign</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6">
        {kpiStats.map(m => <KpiCard key={m.title} {...m} />)}
      </div>

      <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search actions..." className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/40" />
          </div>
          <div className="flex items-center gap-2">
            {(['all','high','medium','low'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={cn("px-3.5 py-2 rounded-lg text-xs font-medium border transition-all", filter === f ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-slate-800/60 text-slate-500 border-slate-700/50 hover:text-slate-300')}>
                {f.charAt(0).toUpperCase()+f.slice(1)} <span className="ml-1 text-[10px] opacity-60">({counts[f]})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-3">
          {filtered.map((action) => (
            <div key={action.id} className={cn("group bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5 transition-all cursor-pointer hover:border-slate-700/80", action.priority === 'high' && "border-l-2 border-l-rose-500/60", action.priority === 'medium' && "border-l-2 border-l-amber-500/60")}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-base font-semibold text-white group-hover:text-blue-400">{action.title}</h3>
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", priorityStyles[action.priority as keyof typeof priorityStyles])}>{action.priority}</span>
                  </div>
                  <p className="text-sm text-slate-400">{action.description}</p>
                </div>
                <span className="text-xs text-slate-600 flex items-center gap-1 shrink-0"><Clock className="h-3.5 w-3.5" />{action.time}</span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className={cn("text-[11px] font-semibold", action.progress >= 80 ? 'text-emerald-400' : 'text-slate-400')}>{action.progress}%</span>
                  <span className="text-xs font-medium text-emerald-400 flex items-center gap-1"><Target className="h-3 w-3" />{action.impact}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", action.progress >= 80 ? 'bg-emerald-500' : 'bg-blue-500')} style={{ width: `${action.progress}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/40">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center"><span className="text-[9px] font-bold text-white">{action.assignedTo.charAt(0)}</span></div>
                  <span className="text-xs text-slate-500">{action.assignedTo}</span>
                  <span className="text-[10px] text-slate-600 bg-slate-800/60 px-2 py-0.5 rounded-full">{action.category}</span>
                </div>
                <button className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-0.5">Start <Play className="h-3 w-3" /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5">
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2"><Target className="h-4 w-4 text-blue-400" />Progress Summary</h2>
            <div className="space-y-4">
              {[{ label: 'High Priority', done: 2, total: 5, color: 'bg-rose-500' },{ label: 'Medium Priority', done: 1, total: 3, color: 'bg-amber-500' },{ label: 'Low Priority', done: 0, total: 2, color: 'bg-blue-500' }].map(p => (
                <div key={p.label}><div className="flex justify-between text-xs mb-1"><span className="text-slate-400">{p.label}</span><span className="text-slate-300">{p.done}/{p.total}</span></div><div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className={cn("h-full rounded-full", p.color)} style={{ width: `${(p.done/p.total)*100}%` }} /></div></div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800/40"><div className="flex justify-between text-sm"><span className="text-slate-400">Overall</span><span className="text-white font-semibold">3 / 10</span></div><div className="h-2 bg-slate-800 rounded-full mt-2 overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" style={{ width: '30%' }} /></div></div>
          </div>

          <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5">
            <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2"><Clock className="h-4 w-4 text-violet-400" />Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.slice(0,4).map((act,i) => (
                <div key={i} className="flex items-start gap-3 group cursor-pointer">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 mt-0.5"><span className="text-[10px] font-bold text-white">{act.user.charAt(0)}</span></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-300 group-hover:text-white"><span className="font-medium">{act.user}</span><span className="text-slate-500"> {act.action} </span><span className="font-medium">{act.target}</span></p>
                    <div className="flex items-center gap-2 mt-0.5"><span className="text-[10px] font-medium text-emerald-400">{act.value}</span><span className="text-[10px] text-slate-600">{act.time}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}