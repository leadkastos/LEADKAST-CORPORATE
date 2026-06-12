
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Zap, AlertCircle, Clock, DollarSign, ArrowRight, MousePointer2, TrendingDown, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import { mockRevenueRecovery } from '@/lib/mock-data';
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
  LineChart,
  Line
} from 'recharts';

const COLORS = ['#f43f5e', '#fbbf24', '#3b82f6', '#10b981'];

export default function RevenueRecoveryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Revenue Recovery</h1>
            <p className="text-slate-400">Automated identification and re-engagement of leaking revenue.</p>
          </div>
          <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center space-x-2 shadow-lg shadow-amber-500/10">
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Scanning Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockRevenueRecovery.summary.map((metric, i) => (
            <div key={i} className={cn(
              "p-6 rounded-xl border transition-all hover:scale-[1.02]",
              metric.level === 'high' ? "bg-rose-500/5 border-rose-500/20" : 
              metric.level === 'medium' ? "bg-amber-500/5 border-amber-500/20" :
              metric.level === 'low' ? "bg-blue-500/5 border-blue-500/20" :
              "bg-emerald-500/5 border-emerald-500/20"
            )}>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">{metric.label}</p>
              <h3 className={cn(
                "text-2xl font-bold",
                metric.level === 'high' ? "text-rose-400" : 
                metric.level === 'medium' ? "text-amber-400" : 
                metric.level === 'low' ? "text-blue-400" :
                "text-emerald-400"
              )}>{metric.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recovery Efficiency Trend</h3>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockRevenueRecovery.trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="recovered" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
                  <Line type="monotone" dataKey="atRisk" stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4">
               <div className="flex items-center space-x-2"><div className="h-3 w-3 rounded-full bg-emerald-500" /><span className="text-xs text-slate-400">Recovered Revenue</span></div>
               <div className="flex items-center space-x-2"><div className="h-3 w-3 border-t-2 border-dashed border-rose-500 w-4" /><span className="text-xs text-slate-400">At-Risk Trend</span></div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <PieChartIcon className="h-5 w-5 text-rose-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">At-Risk Breakdown</h3>
              </div>
            </div>

            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Dormant', value: 85000 },
                      { name: 'No-Show', value: 35000 },
                      { name: 'Contract', value: 25000 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#f43f5e" />
                    <Cell fill="#fbbf24" />
                    <Cell fill="#3b82f6" />
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
               <div className="flex items-center justify-between"><span className="text-xs text-slate-400">Dormant Leads</span><span className="text-xs font-bold text-white">$85k</span></div>
               <div className="flex items-center justify-between"><span className="text-xs text-slate-400">No-Show Followup</span><span className="text-xs font-bold text-white">$35k</span></div>
               <div className="flex items-center justify-between"><span className="text-xs text-slate-400">Contract Pending</span><span className="text-xs font-bold text-white">$25k</span></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center">
              <Zap className="h-4 w-4 text-amber-400 mr-2" />
              Prioritized Recovery Actions
            </h3>
            <button className="text-xs text-blue-400 font-bold hover:text-white transition-colors uppercase tracking-widest">Clear All</button>
          </div>
          <div className="divide-y divide-slate-800/50">
            {mockRevenueRecovery.recoveryActions.map((action, i) => (
              <div key={i} className="p-6 hover:bg-slate-800/20 transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-blue-500/50 transition-colors">
                      <AlertCircle className={cn(
                        "h-5 w-5",
                        action.type === 'Dormant Lead' ? "text-rose-500" : "text-amber-500"
                      )} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{action.type}</p>
                      <h4 className="text-lg font-bold text-white mb-0.5">{action.lead}</h4>
                      <div className="flex items-center space-x-3 text-xs text-slate-400">
                        <span className="flex items-center">
                          <DollarSign className="h-3 w-3 mr-0.5 text-emerald-500" />
                          {action.value.toLocaleString()} Potential
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-0.5 text-blue-500" />
                          Dormant for {action.age}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-xl shadow-blue-600/20 transition-all transform group-hover:scale-105">
                    <span>Re-engage Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
             <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Automation Health Center</h3>
             <div className="space-y-4">
               {[
                 { name: 'Auto-Reactivation Campaigns', status: 'RUNNING', color: 'bg-emerald-500' },
                 { name: 'No-Show Smart Followup', status: 'RUNNING', color: 'bg-emerald-500' },
                 { name: 'Loss Recovery Sequencing', status: 'PAUSED', color: 'bg-slate-600', opacity: true }
               ].map((item, i) => (
                 <div key={i} className={cn("flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all cursor-pointer", item.opacity && "opacity-60")}>
                   <div className="flex items-center space-x-3">
                     <div className={cn("h-2.5 w-2.5 rounded-full", item.color)} />
                     <span className="text-sm text-slate-200 font-bold">{item.name}</span>
                   </div>
                   <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded border", item.status === 'RUNNING' ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" : "text-slate-400 border-slate-700 bg-slate-800")}>{item.status}</span>
                 </div>
               ))}
             </div>
           </div>

           <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-xl p-6 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
               <Zap className="h-32 w-32 text-white" />
             </div>
             <div className="relative z-10">
               <div className="flex items-center space-x-2 mb-4">
                 <div className="p-2 rounded-lg bg-blue-500/20"><TrendingUp className="h-4 w-4 text-blue-400" /></div>
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider">Strategic Recommendation</h3>
               </div>
               <p className="text-sm text-slate-300 leading-relaxed mb-8">
                 Your "No-Show" recovery rate is currently <span className="text-white font-bold">22%</span>. By implementing our suggested <span className="text-blue-400 font-bold">"VIP Reactivation"</span> sequence, you could increase this to <span className="text-emerald-400 font-bold">35%</span> based on similar business benchmarks.
               </p>
               <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 py-3 text-white text-sm font-bold rounded-xl shadow-lg transition-all">
                 <span>Enable VIP Reactivation</span>
                 <MousePointer2 className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
               </button>
             </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

