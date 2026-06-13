'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  ClipboardList, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Filter,
  Search,
  Zap,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockActionItems } from '@/lib/mock-data';

export default function ActionCenter() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Action Center</h1>
            <p className="text-slate-400">Prioritized tasks to drive business growth and recovery.</p>
          </div>
          <div className="flex space-x-3">
             <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search actions..."
                className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white outline-none w-64 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
              <ClipboardList className="h-4 w-4" />
              <span>Create Task</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
             <div className="flex items-center space-x-6 border-b border-slate-800 pb-4 mb-6">
                <button className="text-sm font-bold text-white border-b-2 border-blue-500 pb-4">All Tasks</button>
                <button className="text-sm font-bold text-slate-500 hover:text-white transition-colors pb-4">High Priority</button>
                <button className="text-sm font-bold text-slate-500 hover:text-white transition-colors pb-4">Revenue Focus</button>
                <button className="text-sm font-bold text-slate-500 hover:text-white transition-colors pb-4">Completed</button>
             </div>

             <div className="space-y-4">
                {mockActionItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={cn(
                          "mt-1 p-3 rounded-xl",
                          item.priority === 'critical' ? "bg-rose-500/10 text-rose-500" : "bg-blue-500/10 text-blue-500"
                        )}>
                          <Target className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</h3>
                            <span className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest",
                              item.priority === 'critical' ? "bg-rose-500/10 text-rose-500" : "bg-blue-500/10 text-blue-500"
                            )}>
                              {item.priority}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed mb-4">{item.description}</p>
                          <div className="flex items-center space-x-6">
                             <div className="flex items-center space-x-1.5 text-xs text-emerald-500 font-bold">
                                <TrendingUp className="h-3.5 w-3.5" />
                                <span>{item.impact} Impact</span>
                             </div>
                             <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                                <Clock className="h-3.5 w-3.5" />
                                <span>Due Today</span>
                             </div>
                             <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
                                <span className="px-2 py-0.5 bg-slate-800 rounded uppercase tracking-tighter text-[9px]">{item.category}</span>
                             </div>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition-all font-bold text-xs px-4">
                        Action
                      </button>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-xl shadow-indigo-900/20">
               <div className="flex items-center space-x-2 mb-4">
                  <Zap className="h-5 w-5 text-indigo-200" />
                  <h3 className="font-bold">Intelligence Insight</h3>
               </div>
               <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                  Resolving "Critical" actions within 4 hours has been shown to increase quarterly retention by up to 12%.
               </p>
               <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-white w-[65%]" />
               </div>
               <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest text-center">Team Resolution Rate: 65%</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
               <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Pending Approval</h3>
               <div className="space-y-4">
                  {[
                    { title: 'Budget Adjustment', dept: 'Marketing', value: '+$2,500' },
                    { title: 'New Deal Discount', dept: 'Sales', value: '15%' },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-800/30 border border-slate-800/50 flex items-center justify-between">
                       <div>
                          <p className="text-sm font-medium text-slate-200">{item.title}</p>
                          <p className="text-[10px] text-slate-500">{item.dept}</p>
                       </div>
                       <span className="text-xs font-bold text-blue-400">{item.value}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-6 py-2 border border-slate-800 rounded-lg text-xs font-bold text-slate-500 hover:text-white hover:bg-slate-800 transition-all">
                  View Queue
               </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
