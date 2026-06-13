'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  Zap, 
  AlertCircle, 
  Clock, 
  DollarSign, 
  ArrowUpRight,
  ChevronRight,
  ShieldAlert,
  Search,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockRevenueRecovery } from '@/lib/mock-data';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function RevenueRecovery() {
  const { summary, atRiskBreakdown, recentLosses } = mockRevenueRecovery;
  const COLORS = ['#f43f5e', '#fbbf24', '#3b82f6'];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Revenue Recovery</h1>
          <p className="text-slate-400">Identify at-risk accounts, reclaim dormant leads, and fix failed payments.</p>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summary.map((stat, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap className="h-12 w-12 text-white" />
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className={cn(
                  "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
                  stat.level === 'high' ? "bg-rose-500/10 text-rose-500" :
                  stat.level === 'medium' ? "bg-amber-500/10 text-amber-400" :
                  "bg-blue-500/10 text-blue-400"
                )}>
                  {stat.level}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* At Risk Pie Chart */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">At-Risk Breakdown</h3>
            <div className="h-[250px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={atRiskBreakdown}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {atRiskBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {atRiskBreakdown.map((item, i) => (
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

          {/* Table of Losses */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Priority Recovery Targets</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter targets..."
                  className="bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-white outline-none w-48 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800/50 bg-slate-800/20">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Company</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Value</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Age</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {recentLosses.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-white">{item.company}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-rose-500">{item.value}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                          item.status === 'Failed Pay' ? "bg-rose-500/10 text-rose-500 border-rose-500/20" : "bg-slate-800 text-slate-400 border-slate-700"
                        )}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-slate-500">{item.age}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition-colors">
                          Recover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-800 text-center">
              <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors">View All Targets</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
