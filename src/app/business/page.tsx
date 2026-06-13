'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { cn } from '@/lib/utils';
import {
  Building2, Users, TrendingUp, DollarSign, BarChart3,
  Activity, Target, Zap, Clock, ShoppingCart, CreditCard,
  ArrowUpRight,
} from 'lucide-react';

export default function BusinessDashboardPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-white">Acme Corp</h1>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
            </div>
            <p className="text-slate-400 text-sm">SaaS • Connected since Jan 2026</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select className="bg-slate-900 border border-slate-800 text-slate-400 text-xs rounded-lg px-3 py-2 outline-none hover:border-slate-700 cursor-pointer">
            <option>Last 30 days</option><option>Last quarter</option><option>Year to date</option>
          </select>
          <button className="border border-slate-700 text-slate-400 px-4 py-2 rounded-lg text-sm font-medium hover:text-white hover:border-slate-600 transition-all">View Report</button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard title="Monthly Revenue" value="$12,430" change="+8.2%" trend="up" icon={DollarSign} iconColor="text-emerald-400" subtitle="$8.2k MRR / 24% YoY" sparkline={[30,42,38,55,48,62,58,70,65,78,72,85]} />
        <KpiCard title="Active Customers" value="342" change="+5.2%" trend="up" icon={Users} iconColor="text-blue-400" subtitle="12 new / 3 churned" sparkline={[50,52,55,58,60,62,65,68,72,75,78,82]} />
        <KpiCard title="Conversion Rate" value="4.8%" change="-0.4%" trend="down" icon={TrendingUp} iconColor="text-indigo-400" subtitle="vs 5.2% last month" sparkline={[72,75,70,68,72,65,62,60,58,55,52,48]} />
        <KpiCard title="Business Health" value="92/100" change="Stable" trend="neutral" icon={Activity} iconColor="text-amber-400" subtitle="3 integrations active" sparkline={[80,82,85,82,86,88,90,89,91,92,92,93]} />
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-6">
          <h2 className="text-base font-semibold text-white mb-1">Revenue Performance</h2>
          <p className="text-xs text-slate-500 mb-5">Monthly comparison vs target</p>
          <div className="h-48 flex items-end space-x-3">
            {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
              <div key={m} className="flex-1 flex flex-col items-center justify-end h-full space-y-1">
                <div className="w-full bg-indigo-500/20 rounded-t-sm relative" style={{height: `${[45,50,48,55,52,60,58,65,62,70,68,75][i]}%`}}>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-sm" style={{height: '100%'}} />
                </div>
                <div className="w-full bg-emerald-500/20 rounded-t-sm relative" style={{height: `${[40,45,42,50,48,55,52,58,56,62,60,65][i]}%`}}>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm" style={{height: '100%'}} />
                </div>
                <span className="text-[10px] text-slate-600 font-medium">{m.slice(0,3)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-slate-800/60">
            <div className="flex items-center space-x-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-indigo-500" /><span className="text-[11px] text-slate-500">Revenue</span></div>
            <div className="flex items-center space-x-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /><span className="text-[11px] text-slate-500">Target</span></div>
            <div className="text-[11px] text-emerald-500 ml-auto font-medium">On track +8.2%</div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-6">
          <h2 className="text-base font-semibold text-white mb-1">Channel Distribution</h2>
          <p className="text-xs text-slate-500 mb-5">Marketing channel performance</p>
          <div className="space-y-4">
            {[
              { name: 'Organic Search', value: 42, color: 'bg-blue-500', amount: '$5.2k' },
              { name: 'Paid Ads', value: 28, color: 'bg-indigo-500', amount: '$3.5k' },
              { name: 'Social Media', value: 18, color: 'bg-violet-500', amount: '$2.2k' },
              { name: 'Referrals', value: 12, color: 'bg-emerald-500', amount: '$1.5k' },
            ].map((ch) => (
              <div key={ch.name}>
                <div className="flex items-center justify-between mb-1"><div className="flex items-center space-x-2"><div className={cn("h-2.5 w-2.5 rounded-full", ch.color)} /><span className="text-sm text-slate-400">{ch.name}</span></div><span className="text-sm font-medium text-white">{ch.value}%</span></div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className={cn("h-full rounded-full transition-all", ch.color)} style={{width: `${ch.value}%`}} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Activity, label: 'Page Views', value: '24.5k', change: '+8.2%' },
          { icon: ShoppingCart, label: 'Orders', value: '342', change: '+5.7%' },
          { icon: CreditCard, label: 'Avg. Order Value', value: '$186', change: '-2.1%', down: true },
          { icon: Clock, label: 'Avg. Response Time', value: '2.4h', change: '-18%' },
        ].map((s) => (
          <div key={s.label} className="bg-slate-900/30 border border-slate-800/60 rounded-lg p-4 flex items-center justify-between group hover:bg-slate-900/50 transition-all">
            <div className="flex items-center space-x-3"><div className="p-2 rounded-lg bg-slate-800/60"><s.icon className="h-4 w-4 text-slate-400" /></div><div><p className="text-xs text-slate-500">{s.label}</p><p className="text-base font-semibold text-white">{s.value}</p></div></div>
            <span className={cn("text-xs font-medium", s.down ? 'text-rose-400' : 'text-emerald-400')}>{s.change}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
