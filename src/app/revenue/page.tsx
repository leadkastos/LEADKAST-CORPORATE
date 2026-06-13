'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Layers,
  Zap,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockRevenueIntelligence } from '@/lib/mock-data';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function RevenueIntelligence() {
  const { summary, revenueMix, growthTrend } = mockRevenueIntelligence;
  const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7'];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Revenue Intelligence</h1>
          <p className="text-slate-400">Deep dive into ARR, MRR, LTV, and churn dynamics.</p>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summary.map((stat, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className={cn(
                  "text-xs font-bold flex items-center",
                  stat.trend.startsWith('+') ? "text-emerald-500" : "text-rose-500"
                )}>
                  {stat.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MRR Growth Trend */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-8">MRR Growth Trend</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="mrr" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Revenue Mix</h3>
            <div className="h-[250px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueMix}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {revenueMix.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {revenueMix.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
                   <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-sm font-medium text-slate-300">{item.name}</span>
                   </div>
                   <span className="text-sm font-bold text-white">${(item.value / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Churn Analytics */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white">Churn Trend</h3>
              <div className="flex items-center space-x-4">
                 <div className="flex items-center space-x-1.5">
                    <div className="h-2 w-2 rounded-full bg-rose-500" />
                    <span className="text-xs text-slate-500">Churn Rate (%)</span>
                 </div>
              </div>
           </div>
           <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={growthTrend}>
                    <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                    <Bar dataKey="churn" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={40} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
