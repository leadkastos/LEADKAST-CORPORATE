'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  MousePointer2, 
  Users,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockMarketingIntelligence } from '@/lib/mock-data';
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
  Cell
} from 'recharts';

export default function MarketingIntelligence() {
  const { summary, channels, dailyTrends } = mockMarketingIntelligence;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketing Intelligence</h1>
          <p className="text-slate-400">Holistic performance tracking across all paid and organic channels.</p>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summary.map((stat, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className={cn(
                  "text-xs font-bold flex items-center",
                  stat.trend.startsWith('+') ? "text-emerald-500" : "text-rose-500"
                )}>
                  {stat.trend.startsWith('+') ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {stat.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Trend Chart */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white">Performance Trends</h3>
              <div className="flex space-x-2">
                 <button className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-medium text-white border border-slate-700">Spend</button>
                 <button className="px-3 py-1 bg-slate-900 rounded-lg text-xs font-medium text-slate-500 border border-slate-800 hover:text-white transition-colors">Leads</button>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyTrends}>
                  <defs>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="spend" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSpend)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Channel Performance */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Channel ROAS</h3>
            <div className="h-[250px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channels}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                     cursor={{fill: 'transparent'}}
                     contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  />
                  <Bar dataKey="roas" radius={[4, 4, 0, 0]}>
                    {channels.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : index === 1 ? '#6366f1' : '#8b5cf6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {channels.map((channel, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-800/50">
                   <div className="flex items-center space-x-3">
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        i === 0 ? "bg-blue-500" : i === 1 ? "bg-indigo-500" : "bg-violet-500"
                      )} />
                      <span className="text-sm font-medium text-slate-300">{channel.name}</span>
                   </div>
                   <span className="text-sm font-bold text-white">{channel.roas}x</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Channel Table */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
           <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Channel Efficiency</h3>
              <button className="text-blue-400 text-sm font-medium hover:text-blue-300">Detailed Report</button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800/50 bg-slate-800/20">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Channel</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Spend</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Leads</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Avg. CPL</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">ROAS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {channels.map((channel, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{channel.name}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">${channel.spend.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{channel.leads}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">${channel.cpl}</td>
                      <td className="px-6 py-4 font-bold text-emerald-400 text-sm">{channel.roas}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Support for AreaChart
import { AreaChart, Area } from 'recharts';
