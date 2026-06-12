
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Target, Users, Phone, Calendar, Trophy, ArrowUpRight } from 'lucide-react';
import { mockSalesMetrics } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function SalesPerformancePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Sales Performance</h1>
          <p className="text-slate-400">Tracking team efficiency and conversion outcomes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockSalesMetrics.summary.map((metric, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center">
                  {metric.label === 'Calls' ? <Phone className="h-4 w-4 text-blue-400" /> : 
                   metric.label === 'Appointments' ? <Calendar className="h-4 w-4 text-indigo-400" /> :
                   metric.label === 'Closed Won' ? <Trophy className="h-4 w-4 text-amber-400" /> :
                   <Target className="h-4 w-4 text-green-400" />}
                </div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{metric.label}</p>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded",
                  metric.trend.startsWith('+') ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                )}>
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Performers</h3>
            <button className="text-xs text-blue-400 hover:text-white font-medium transition-colors">View All Members</button>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/30 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800">
                  <th className="px-6 py-4">Sales Representative</th>
                  <th className="px-6 py-4">Deals Won</th>
                  <th className="px-6 py-4">Total Value</th>
                  <th className="px-6 py-4">Win Rate</th>
                  <th className="px-6 py-4">Efficiency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {mockSalesMetrics.teamPerformance.map((rep, i) => (
                  <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-700">
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
                        <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden min-w-[60px]">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${rep.rate * 2.5}%` }} />
                        </div>
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
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
