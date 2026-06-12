
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DollarSign, ArrowUpRight, ArrowDownRight, PieChart, Activity, Zap } from 'lucide-react';
import { mockRevenueMetrics } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function RevenueOperationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Revenue Operations</h1>
          <p className="text-slate-400">Executive financial health and growth tracking.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockRevenueMetrics.summary.map((metric, i) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Revenue Mix</h3>
            <div className="space-y-8">
              {mockRevenueMetrics.revenueBySource.map((source, i) => {
                const total = mockRevenueMetrics.revenueBySource.reduce((acc, s) => acc + s.value, 0);
                const percent = Math.round((source.value / total) * 100);
                return (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "h-3 w-3 rounded-full",
                          i === 0 ? "bg-blue-500" : i === 1 ? "bg-indigo-500" : "bg-slate-600"
                        )} />
                        <span className="text-sm font-semibold text-slate-300">{source.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-bold text-white">${source.value.toLocaleString()}</span>
                        <span className="text-xs text-slate-500 w-8 text-right">{percent}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          i === 0 ? "bg-blue-500" : i === 1 ? "bg-indigo-500" : "bg-slate-600"
                        )}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Financial Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start space-x-4">
                  <TrendingUp className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-green-400 mb-1">Growth Opportunity</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Upselling service packages to the top 10% of subscription users could increase ARR by an estimated $84,000.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start space-x-4">
                  <Activity className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-amber-400 mb-1">Churn Warning</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      "Services" revenue saw a 2% decline this month. Recommend reviewing customer satisfaction scores for Q2.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="mt-8 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg border border-slate-700 transition-all flex items-center justify-center space-x-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Generate Full Financial Audit</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
