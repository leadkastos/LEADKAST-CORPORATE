'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  Layers, 
  TrendingUp, 
  Target, 
  DollarSign, 
  ChevronRight,
  Filter,
  Plus,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockPipelineIntelligence } from '@/lib/mock-data';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function PipelineIntelligence() {
  const { summary, stages } = mockPipelineIntelligence;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Pipeline Intelligence</h1>
            <p className="text-slate-400">Funnel visualization, stage velocity, and deal distribution.</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Deal</span>
          </button>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summary.map((stat, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs font-bold text-emerald-400 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {stat.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Funnel Chart */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-8">Stage Distribution (Volume)</h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stages} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} width={100} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {stages.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Deal Value Breakdown */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Pipeline Value</h3>
            <div className="space-y-6">
              {stages.map((stage, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-300">{stage.name}</span>
                    <span className="font-bold text-white">${(stage.value / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${(stage.value / 900000) * 100}%`,
                        backgroundColor: stage.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-xl">
               <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Opportunity</span>
               </div>
               <p className="text-xs text-slate-300 leading-relaxed">
                  You have <span className="text-white font-bold">$300k</span> in the Closing stage. Focus your follow-ups here to hit the Q3 target.
               </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
