
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Layers, ArrowUpRight, ArrowRight, DollarSign, Filter, Search } from 'lucide-react';
import { mockPipelineData } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function PipelinePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Sales Pipeline</h1>
            <p className="text-slate-400">Visualizing deal flow and stage-gate health.</p>
          </div>
          <div className="flex space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search deals..." 
                className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none w-64"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-all">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockPipelineData.summary.map((metric, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-2">{metric.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
                <span className="text-xs font-bold text-green-500 flex items-center mb-1">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-10">Funnel Analysis</h3>
          <div className="flex flex-col space-y-6">
            {mockPipelineData.stages.map((stage, i) => {
              const maxCount = Math.max(...mockPipelineData.stages.map(s => s.count));
              const width = (stage.count / maxCount) * 100;
              return (
                <div key={i} className="group flex items-center">
                  <div className="w-40 shrink-0">
                    <p className="text-sm font-bold text-white mb-0.5">{stage.name}</p>
                    <p className="text-[11px] text-slate-500 uppercase tracking-wider">{stage.count} Deals</p>
                  </div>
                  <div className="flex-1 h-12 relative flex items-center px-4">
                    <div 
                      className={cn(
                        "h-full rounded-r-lg flex items-center justify-end px-4 transition-all duration-1000",
                        i === 0 ? "bg-blue-600/60" : i === 1 ? "bg-blue-600/70" : i === 2 ? "bg-blue-600/80" : i === 3 ? "bg-blue-600/90" : "bg-blue-600"
                      )}
                      style={{ width: `${width}%` }}
                    >
                      <span className="text-xs font-bold text-white">${(stage.value / 1000).toLocaleString()}k</span>
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <button className="text-blue-400 hover:text-white transition-colors">
                      <ArrowRight className="h-5 w-5 ml-auto" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden p-6">
           <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Strategic Insights</h3>
           <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
             Pipeline velocity has increased by 12% this month. However, the conversion rate from 
             <span className="text-white font-semibold"> Proposal </span> to 
             <span className="text-white font-semibold"> Negotiation </span> has dipped slightly (4.5%). 
             AI recommends prioritizing 1:1 reviews for deals in the Proposal stage with values over $25k.
           </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
