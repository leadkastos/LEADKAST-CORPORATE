'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  AlertTriangle, 
  ChevronRight, 
  ArrowUpRight, 
  Lightbulb,
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowDownRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  mockExecutiveDashboard, 
  mockAlerts, 
  mockActionItems 
} from '@/lib/mock-data';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export default function ExecutiveDashboard() {
  const { healthScore, morningBrief, kpis, performanceTrend } = mockExecutiveDashboard;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Morning Brief Section */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-indigo-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="h-32 w-32 text-white" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-white">{morningBrief.greeting}</h2>
                <p className="text-slate-400 max-w-2xl">{morningBrief.summary}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-white">{healthScore}</div>
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Health Score</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-medium text-white">{morningBrief.topAction}</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-amber-500/10 rounded-full border border-amber-500/20 backdrop-blur-md">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-medium text-amber-400">{morningBrief.alertsCount} Alerts</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{kpi.label}</span>
                <div className={cn(
                  "p-1.5 rounded-lg",
                  kpi.trendType === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                )}>
                  {kpi.trendType === 'up' ? <TrendingUp className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-white">{kpi.value}</div>
                <div className={cn(
                  "text-xs font-bold",
                  kpi.trendType === 'up' ? "text-emerald-500" : "text-rose-500"
                )}>{kpi.trend}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Performance Overview</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] text-slate-500">Revenue</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 rounded-full bg-slate-700" />
                  <span className="text-[10px] text-slate-500">Target</span>
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceTrend}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="target" stroke="#475569" fill="transparent" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Needs Attention</h3>
            <div className="space-y-4">
              {mockAlerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded",
                      alert.level === 'critical' ? "bg-rose-500/10 text-rose-500" : "bg-amber-500/10 text-amber-400"
                    )}>
                      {alert.category}
                    </span>
                    <span className="text-[10px] text-slate-500">{alert.time}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{alert.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1">{alert.description}</p>
                </div>
              ))}
              <button className="w-full py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors border-t border-slate-800 mt-2">
                View All Alerts
              </button>
            </div>
          </div>
        </div>

        {/* Final Row: Actions & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Next Actions</h3>
            <div className="space-y-3">
              {mockActionItems.slice(0, 3).map((action) => (
                <div key={action.id} className="flex items-start space-x-4 p-4 rounded-xl bg-slate-800/20 border border-slate-800/50 hover:bg-slate-800/40 transition-all cursor-pointer">
                  <div className={cn(
                    "mt-1 p-2 rounded-lg",
                    action.priority === 'critical' ? "bg-rose-500/10 text-rose-500" : "bg-blue-500/10 text-blue-500"
                  )}>
                    <Target className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{action.title}</h4>
                      <span className="text-[10px] font-bold text-slate-500">{action.category}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{action.description}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-1 text-[10px] font-bold text-emerald-500">
                        <TrendingUp className="h-3 w-3" />
                        <span>{action.impact} Impact</span>
                      </div>
                      <div className="flex items-center space-x-1 text-[10px] font-bold text-slate-500">
                        <Clock className="h-3 w-3" />
                        <span>Due Today</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-600 mt-1" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Pipeline Summary</h3>
            <div className="grid grid-cols-2 gap-4 h-[calc(100%-3rem)]">
              <div className="bg-slate-800/20 rounded-xl p-4 border border-slate-800/50 flex flex-col justify-center text-center">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Open Deals</p>
                <p className="text-3xl font-black text-white">158</p>
                <p className="text-[10px] text-emerald-400 font-bold mt-1">+12 this week</p>
              </div>
              <div className="bg-slate-800/20 rounded-xl p-4 border border-slate-800/50 flex flex-col justify-center text-center">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Pipeline Value</p>
                <p className="text-3xl font-black text-white">$3.16M</p>
                <p className="text-[10px] text-emerald-400 font-bold mt-1">+$420k this week</p>
              </div>
              <div className="col-span-2 bg-slate-800/20 rounded-xl p-4 border border-slate-800/50">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-white">Deal Velocity</span>
                    <span className="text-xs text-slate-500">Avg. 18 days to close</span>
                 </div>
                 <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[75%]" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
