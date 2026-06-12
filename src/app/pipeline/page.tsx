
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Layers, ArrowUpRight, ArrowRight, DollarSign, Filter, Search, TrendingUp, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
import { mockPipelineData } from '@/lib/mock-data';
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

export default function PipelinePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none w-full md:w-64"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-all">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockPipelineData.summary.map((metric, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-all">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">{metric.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
                <span className={cn(
                  "text-xs font-bold flex items-center mb-1",
                  metric.trend.includes('+') ? "text-emerald-500" : "text-rose-500"
                )}>
                  {metric.trend.includes('+') ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : null}
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
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Pipeline Stage Distribution</h3>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">By Deal Count</div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockPipelineData.stages} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {mockPipelineData.stages.map((entry, index) => (
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
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Pipeline Value Mix</h3>
              </div>
            </div>

            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockPipelineData.stages}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockPipelineData.stages.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-2">
              {mockPipelineData.stages.map((stage, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-xs text-slate-400">{stage.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-200">${(stage.value / 1000).toLocaleString()}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <div className="flex items-center space-x-2 mb-10">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Strategic Funnel Analysis</h3>
          </div>
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
                        i === 0 ? "bg-blue-600/20" : i === 1 ? "bg-blue-600/30" : i === 2 ? "bg-blue-600/40" : i === 3 ? "bg-blue-600/50" : "bg-blue-600/60"
                      )}
                      style={{ width: `${width}%`, borderRight: `2px solid ${COLORS[i % COLORS.length]}` }}
                    >
                      <span className="text-xs font-bold text-white">${(stage.value / 1000).toLocaleString()}k</span>
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <button className="text-blue-400 hover:text-white transition-colors group">
                      <ArrowRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden p-6">
           <div className="flex items-center space-x-2 mb-4">
             <div className="p-2 rounded-lg bg-blue-500/10"><TrendingUp className="h-4 w-4 text-blue-400" /></div>
             <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Executive Insight</h3>
           </div>
           <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
             Pipeline velocity has increased by <span className="text-emerald-400 font-semibold">12%</span> this month. However, the conversion rate from 
             <span className="text-white font-semibold"> Proposal </span> to 
             <span className="text-white font-semibold"> Negotiation </span> has dipped slightly (4.5%). 
             AI recommends prioritizing 1:1 reviews for deals in the Proposal stage with values over <span className="text-white font-semibold">$25k</span>.
           </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

