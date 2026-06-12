
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BarChart3, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { mockMarketingMetrics } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function MarketingIntelligencePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketing Intelligence</h1>
          <p className="text-slate-400">Consolidated performance data across all advertising channels.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockMarketingMetrics.summary.map((metric, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-2">{metric.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
                <span className={cn(
                  "text-xs font-bold flex items-center mb-1",
                  metric.trend.startsWith('+') ? "text-green-500" : "text-red-500"
                )}>
                  {metric.trend.startsWith('+') ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Channel Performance</h3>
              <select className="bg-slate-800 border-none text-xs text-slate-300 rounded focus:ring-0">
                <option>Last 30 Days</option>
                <option>Last Quarter</option>
              </select>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/30 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800">
                    <th className="px-6 py-4">Channel</th>
                    <th className="px-6 py-4">Spend</th>
                    <th className="px-6 py-4">Leads</th>
                    <th className="px-6 py-4">CPL</th>
                    <th className="px-6 py-4">ROAS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 text-sm">
                  {mockMarketingMetrics.channelPerformance.map((channel, i) => (
                    <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">{channel.name}</td>
                      <td className="px-6 py-4 text-slate-300">${channel.spend.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-300">{channel.leads}</td>
                      <td className="px-6 py-4 text-slate-300">${channel.cpl.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-md font-bold">
                          {channel.roas}x
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Budget Distribution</h3>
            <div className="space-y-6">
              {mockMarketingMetrics.channelPerformance.map((channel, i) => {
                const totalSpend = mockMarketingMetrics.channelPerformance.reduce((acc, c) => acc + c.spend, 0);
                const percent = Math.round((channel.spend / totalSpend) * 100);
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 font-medium">{channel.name}</span>
                      <span className="text-white font-bold">{percent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          i === 0 ? "bg-blue-500" : i === 1 ? "bg-indigo-500" : "bg-slate-600"
                        )}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 p-4 bg-blue-600/10 border border-blue-500/20 rounded-lg">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">AI Optimization Tip</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Reallocating 15% of Google Ads budget to Meta Ads could increase total lead volume by ~8% based on current conversion trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
