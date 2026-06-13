'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { cn } from '@/lib/utils';
import {
  Building2, Users, TrendingUp, DollarSign, BarChart3,
  ChevronRight, Activity, Target, Zap, Globe, Shield,
  ArrowUpRight, ExternalLink,
} from 'lucide-react';
import { useState } from 'react';

const clientBusinesses = [
  { name: 'Acme Corp', industry: 'SaaS', status: 'active', revenue: '$12.4k', leads: 342, health: 92, change: '+8.2%' },
  { name: 'TechFlow Inc', industry: 'FinTech', status: 'active', revenue: '$8.7k', leads: 218, health: 88, change: '+5.1%' },
  { name: 'GreenLeaf Media', industry: 'Publishing', status: 'active', revenue: '$6.2k', leads: 156, health: 95, change: '+12.3%' },
  { name: 'DataSync Labs', industry: 'Tech', status: 'warning', revenue: '$4.1k', leads: 89, health: 72, change: '-2.4%' },
  { name: 'NovaFit Health', industry: 'Wellness', status: 'active', revenue: '$3.8k', leads: 124, health: 85, change: '+3.7%' },
  { name: 'SkyBridge Ltd', industry: 'Logistics', status: 'inactive', revenue: '$0', leads: 0, health: 45, change: '-18%' },
];

export default function AgencyDashboardPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Agency Dashboard</h1>
            <p className="text-slate-400 text-sm">Multi-client performance overview</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button onClick={() => setView('grid')} className={cn("px-3 py-1.5 text-xs rounded-md transition-all", view === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-500')}>Grid</button>
            <button onClick={() => setView('list')} className={cn("px-3 py-1.5 text-xs rounded-md transition-all", view === 'list' ? 'bg-slate-800 text-white' : 'text-slate-500')}>List</button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all flex items-center"><Building2 className="h-4 w-4 mr-2" />Add Client</button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard title="Active Clients" value="8" change="+2" trend="up" icon={Building2} iconColor="text-blue-400" subtitle="12 total accounts" sparkline={[4,5,5,6,6,7,7,8,8,8,8,8]} />
        <KpiCard title="Total MRR (Managed)" value="$42.8k" change="+6.4%" trend="up" icon={DollarSign} iconColor="text-emerald-400" subtitle="Across all clients" sparkline={[28,30,32,35,34,36,38,39,40,41,42,43]} />
        <KpiCard title="Total Leads (30d)" value="1,247" change="+9.2%" trend="up" icon={Users} iconColor="text-indigo-400" subtitle="+24% conversion rate" sparkline={[50,52,55,58,60,62,65,68,72,75,78,82]} />
        <KpiCard title="Avg. Client Health" value="82%" change="+2.4%" trend="up" icon={Activity} iconColor="text-amber-400" subtitle="1 at-risk account" sparkline={[70,72,74,76,78,79,80,80,81,81,82,82]} />
      </div>

      {/* Client List */}
      <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Client Businesses</h2>
          <span className="text-xs text-slate-500">{clientBusinesses.length} accounts</span>
        </div>
        <div className="divide-y divide-slate-800/40">
          {clientBusinesses.map((client, i) => (
            <div key={i} className="flex items-center px-6 py-4 hover:bg-slate-800/20 transition-colors cursor-pointer group">
              <div className="flex items-center flex-1 min-w-0 space-x-4">
                <div className={cn(
                  "h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
                  client.status === 'active' ? 'bg-emerald-500/10' : client.status === 'warning' ? 'bg-amber-500/10' : 'bg-slate-800'
                )}>
                  <Building2 className={cn(
                    "h-4.5 w-4.5",
                    client.status === 'active' ? 'text-emerald-400' : client.status === 'warning' ? 'text-amber-400' : 'text-slate-500'
                  )} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{client.name}</p>
                  <p className="text-xs text-slate-500">{client.industry}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{client.revenue}</p>
                  <p className="text-xs text-slate-500">MRR</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{client.leads}</p>
                  <p className="text-xs text-slate-500">Leads</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className={cn("h-2 w-2 rounded-full", client.health >= 80 ? 'bg-emerald-500' : client.health >= 60 ? 'bg-amber-500' : 'bg-rose-500')} />
                    <span className={cn("text-sm font-medium", client.health >= 80 ? 'text-emerald-400' : client.health >= 60 ? 'text-amber-400' : 'text-rose-400')}>{client.health}</span>
                  </div>
                  <span className={cn("text-xs", client.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400')}>{client.change}</span>
                </div>
                <span className={cn(
                  "text-[10px] font-medium px-2 py-0.5 rounded-full border",
                  client.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  client.status === 'warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                  'bg-slate-800 text-slate-500 border-slate-700/50'
                )}>{client.status}</span>
                <ExternalLink className="h-4 w-4 text-slate-600 group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: Target, label: 'Avg. Revenue/Client', value: '$5,350', change: '+6.8%' },
          { icon: Users, label: 'New Clients (30d)', value: '2', change: '+1 vs last month' },
          { icon : Shield, label: 'Accounts at Risk', value: '1', change: 'SkyBridge Ltd needs attention' },
        ].map((s) => (
          <div key={s.label} className="bg-slate-900/30 border border-slate-800/60 rounded-lg p-4 flex items-center justify-between group hover:bg-slate-900/50 transition-all">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-slate-800/60"><s.icon className="h-4 w-4 text-slate-400" /></div>
              <div><p className="text-xs text-slate-500">{s.label}</p><p className="text-base font-semibold text-white">{s.value}</p></div>
            </div>
            <span className="text-xs font-medium text-emerald-400">{s.change}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
