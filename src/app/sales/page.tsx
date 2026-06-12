
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Target, Users, Phone, Calendar, Trophy, ArrowUpRight, BarChart3, LineChart as LineChartIcon, Activity } from 'lucide-react';
import { mockSalesMetrics } from '@/lib/mock-data';
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
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'];

export default function SalesPerformancePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Sales Performance</h1>
            <p className="text-slate-400">Tracking team efficiency and conversion outcomes.</p>
          </div>
          <div className="flex items-center space-x-3 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
             <button className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-md shadow-lg">Daily</button>
             <button className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors">Weekly</button>
             <button className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors">Monthly</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockSalesMetrics.summary.map((metric, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center">
                  {metric.label === 'Calls' ? <Phone className="h-4 w-4 text-blue-400" /> : 
                   metric.label === 'Appointments' ? <Calendar className="h-4 w-4 text-indigo-400" /> :
                   metric.label === 'Closed Won' ? <Trophy className="h-4 w-4 text-amber-400" /> :
                   <Target className="h-4 w-4 text-green-400" />}
                </div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{metric.label}</p>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded",
                  metric.trend.startsWith('+') ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                )}>
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Activity vs. Outcomes Trend</h3>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockSalesMetrics.trends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="won" stroke="#10b981" fillOpacity={1} fill="url(#colorWon)" strokeWidth={3} />
                  <Line type="monotone" dataKey="appointments" stroke="#6366f1" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4">
               <div className="flex items-center space-x-2"><div className="h-3 w-3 rounded-full bg-emerald-500" /><span className="text-xs text-slate-400">Deals Won</span></div>
               <div className="flex items-center space-x-2"><div className="h-3 w-3 rounded-full bg-indigo-500" /><span className="text-xs text-slate-400">Appointments</span></div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Performer Value</h3>
              </div>
            </div>
            
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSalesMetrics.teamPerformance} layout="vertical" margin={{ left: -20 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} width={80} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
               <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Team Insight</p>
               <p className="text-xs text-slate-300 leading-relaxed">
                 <span className="text-white font-bold">Alex Johnson</span> is outperforming the team average by <span className="text-emerald-400">24%</span> in total deal value this week.
               </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Performance Leaderboard</h3>
            </div>
            <button className="text-xs text-blue-400 hover:text-white font-medium transition-colors">Full Report</button>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/30 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800">
                  <th className="px-6 py-4">Sales Representative</th>
                  <th className="px-6 py-4">Deals Won</th>
                  <th className="px-6 py-4">Total Value</th>
                  <th className="px-6 py-4">Win Rate</th>
                  <th className="px-6 py-4">Progress to Goal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {mockSalesMetrics.teamPerformance.map((rep, i) => (
                  <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-700 group-hover:border-blue-500/50 transition-colors">
                          {rep.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">{rep.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-medium">{rep.deals}</td>
                    <td className="px-6 py-4 text-slate-300 font-bold">${rep.value.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-300">{rep.rate}%</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden min-w-[100px]">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${rep.rate * 2.5}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">{Math.round(rep.rate * 2.5)}%</span>
                      </div>
                    </td>
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

