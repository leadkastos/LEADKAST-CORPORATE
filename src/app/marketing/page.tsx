
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BarChart3, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight, PieChart as PieChartIcon } from 'lucide-react';
import { mockMarketingMetrics } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
} from 'recharts';

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'];

export default function MarketingIntelligencePage() {
  const totalSpend = mockMarketingMetrics.channelPerformance.reduce((acc, c) => acc + c.spend, 0);
  
  const pieData = mockMarketingMetrics.channelPerformance.map(c => ({
    name: c.name,
    value: c.spend
  }));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Marketing Intelligence</h1>
            <p className="text-slate-400">Consolidated performance data across all advertising channels.</p>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-lg">
             <button className="px-3 py-1.5 text-xs font-bold text-white bg-slate-800 rounded-md">Last 30 Days</button>
             <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors">Last Quarter</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockMarketingMetrics.summary.map((metric, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-all">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">{metric.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
                <span className={cn(
                  "text-xs font-bold flex items-center mb-1",
                  metric.trend.startsWith('+') ? "text-emerald-500" : "text-rose-500"
                )}>
                  {metric.trend.startsWith('+') ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Channel Efficiency (ROAS)</h3>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockMarketingMetrics.channelPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Bar dataKey="roas" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40}>
                    {mockMarketingMetrics.channelPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <PieChartIcon className="h-5 w-5 text-indigo-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Budget Allocation</h3>
              </div>
            </div>

            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-3">
              {mockMarketingMetrics.channelPerformance.map((channel, i) => {
                const percent = Math.round((channel.spend / totalSpend) * 100);
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-xs text-slate-400">{channel.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-200">{percent}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
             <div className="flex items-center space-x-2">
               <Users className="h-5 w-5 text-blue-400" />
               <h3 className="text-sm font-bold text-white uppercase tracking-wider">Granular Performance</h3>
             </div>
             <button className="text-xs text-blue-400 hover:text-white font-bold transition-colors uppercase tracking-widest">Export CSV</button>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/30 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800">
                  <th className="px-6 py-4">Channel</th>
                  <th className="px-6 py-4">Spend</th>
                  <th className="px-6 py-4">Leads</th>
                  <th className="px-6 py-4">CPL</th>
                  <th className="px-6 py-4 text-right">ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {mockMarketingMetrics.channelPerformance.map((channel, i) => (
                  <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                    <td className="px-6 py-4 font-bold text-white group-hover:text-blue-400 transition-colors">{channel.name}</td>
                    <td className="px-6 py-4 text-slate-300 font-medium">${channel.spend.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-300">{channel.leads}</td>
                    <td className="px-6 py-4 text-slate-300 font-medium">${channel.cpl.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 font-bold text-xs">
                        {channel.roas}x
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-500">
             <TrendingUp className="h-24 w-24 text-white" />
           </div>
           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div className="max-w-2xl">
               <div className="flex items-center space-x-2 mb-3">
                 <div className="p-1.5 rounded-md bg-blue-500/20"><BarChart3 className="h-4 w-4 text-blue-400" /></div>
                 <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest">AI Optimization Engine</h4>
               </div>
               <p className="text-sm text-slate-300 leading-relaxed">
                 Reallocating <span className="text-white font-bold">15%</span> of Google Ads budget to Meta Ads could increase total lead volume by <span className="text-emerald-400 font-bold">~8%</span> based on current conversion trends and historical seasonality.
               </p>
             </div>
             <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg transition-all shrink-0">Apply Optimization</button>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

