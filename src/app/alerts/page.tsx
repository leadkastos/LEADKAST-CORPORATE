'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { cn } from '@/lib/utils';
import { executiveAlerts, AlertType } from '@/lib/mock-data';
import {
  AlertTriangle, Bell, CheckCircle2, XCircle,
  ChevronRight, Search, Clock, Activity, Target, Shield,
} from 'lucide-react';
import { useState } from 'react';

const alertStyles: Record<AlertType, {dot: string; bg: string; icon: any; label: string}> = {
  warning: { dot: 'bg-amber-500', bg: 'bg-amber-500/[0.04]', icon: AlertTriangle, label: 'Warning' },
  success: { dot: 'bg-emerald-500', bg: 'bg-emerald-500/[0.04]', icon: CheckCircle2, label: 'Success' },
  error: { dot: 'bg-rose-500', bg: 'bg-rose-500/[0.04]', icon: XCircle, label: 'Error' },
  info: { dot: 'bg-blue-500', bg: 'bg-blue-500/[0.04]', icon: Bell, label: 'Info' },
};

const severityColors = { critical: 'bg-rose-500/10 text-rose-400 border-rose-500/20', high: 'bg-amber-500/10 text-amber-400 border-amber-500/20', medium: 'bg-blue-500/10 text-blue-400 border-blue-500/20', low: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };

const kpiStats = [
  { title: 'Active Alerts', value: '8', icon: AlertTriangle, iconColor: 'text-amber-400', subtitle: '2 critical / 3 high priority', sparkline: [3,5,4,6,8,7,6,5,4,6,7,8], change: '+2', trend: 'up' as const },
  { title: 'Resolved Today', value: '14', icon: CheckCircle2, iconColor: 'text-emerald-400', subtitle: '92% resolution rate', sparkline: [5,8,10,12,9,11,14,13,12,10,11,14], change: '+3', trend: 'up' as const },
  { title: 'Avg Response Time', value: '12m', icon: Clock, iconColor: 'text-blue-400', subtitle: 'Down from 18m last week', sparkline: [80,75,70,68,62,58,55,50,48,45,42,38], change: '-33%', trend: 'up' as const },
  { title: 'Uptime SLA', value: '99.97%', icon: Shield, iconColor: 'text-indigo-400', subtitle: '30 days without major incident', sparkline: [85,88,90,92,94,95,96,96,97,97,98,99], change: '+0.02%', trend: 'up' as const },
];

export default function AlertsPage() {
  const [filter, setFilter] = useState<AlertType | 'all'>('all');
  const [search, setSearch] = useState('');
  const filtered = executiveAlerts.filter(a => {
    if (filter !== 'all' && a.type !== filter) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const counts = { all: executiveAlerts.length, warning: executiveAlerts.filter(a => a.type === 'warning').length, success: executiveAlerts.filter(a => a.type === 'success').length, error: executiveAlerts.filter(a => a.type === 'error').length, info: executiveAlerts.filter(a => a.type === 'info').length };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1"><Bell className="h-6 w-6 text-amber-400" /><h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Alert Center</h1><span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">{counts.all} active</span></div>
          <p className="text-slate-400 text-sm">Real-time executive alerts across your organization.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="border border-slate-700/80 text-slate-400 px-4 py-2.5 rounded-xl text-sm font-medium hover:text-white hover:border-slate-600 bg-slate-800/40 flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />Mark Read</button>
          <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-600/25 flex items-center gap-2"><Activity className="h-4 w-4" />Configure</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6">
        {kpiStats.map(m => <KpiCard key={m.title} {...m} />)}
      </div>

      <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search alerts..." className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/40" />
          </div>
          <div className="flex items-center gap-2">
            {(['all','warning','error','success','info'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={cn("px-3.5 py-2 rounded-lg text-xs font-medium border transition-all", filter === f ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-slate-800/60 text-slate-500 border-slate-700/50 hover:text-slate-300')}>
                {f.charAt(0).toUpperCase()+f.slice(1)} <span className="ml-1 text-[10px] opacity-60">({counts[f]})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((alert) => {
          const s = alertStyles[alert.type];
          const Icon = s.icon;
          return (
            <div key={alert.id} className={cn("group bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5 transition-all cursor-pointer hover:border-slate-700/80", alert.severity === 'critical' && "border-l-2 border-l-rose-500/60", alert.severity === 'high' && "border-l-2 border-l-amber-500/60")}>
              <div className="flex items-start gap-4">
                <div className={cn("p-2.5 rounded-xl bg-slate-800/60 ring-1 ring-slate-700/50 shrink-0", s.dot.replace('bg-','text-').replace('-500','-400'))}><Icon className="h-5 w-5" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-white group-hover:text-blue-400">{alert.title}</h3>
                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", severityColors[alert.severity])}>{alert.severity}</span>
                      </div>
                      <p className="text-sm text-slate-400">{alert.description}</p>
                    </div>
                    <span className="text-[11px] text-slate-600 shrink-0">{alert.time}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-800/40">
                    <span className="text-[11px] text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded-full">{alert.category}</span>
                    <button className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-0.5">{alert.action} <ChevronRight className="h-3.5 w-3.5" /></button>
                    <button className="text-[11px] text-slate-600 hover:text-slate-400 ml-auto">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}