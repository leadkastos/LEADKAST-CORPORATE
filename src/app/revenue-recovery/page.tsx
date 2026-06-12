
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Zap, AlertCircle, Clock, DollarSign, ArrowRight, MousePointer2 } from 'lucide-react';
import { mockRevenueRecovery } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function RevenueRecoveryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Revenue Recovery</h1>
            <p className="text-slate-400">Automated identification and re-engagement of leaking revenue.</p>
          </div>
          <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Scanning Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockRevenueRecovery.summary.map((metric, i) => (
            <div key={i} className={cn(
              "p-6 rounded-xl border",
              metric.level === 'high' ? "bg-red-500/5 border-red-500/20" : 
              metric.level === 'medium' ? "bg-amber-500/5 border-amber-500/20" :
              "bg-slate-900/50 border-slate-800"
            )}>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-2">{metric.label}</p>
              <h3 className={cn(
                "text-2xl font-bold",
                metric.level === 'high' ? "text-red-400" : 
                metric.level === 'medium' ? "text-amber-400" : "text-white"
              )}>{metric.value}</h3>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center">
              <Zap className="h-4 w-4 text-amber-400 mr-2" />
              Prioritized Recovery Actions
            </h3>
          </div>
          <div className="divide-y divide-slate-800/50">
            {mockRevenueRecovery.recoveryActions.map((action, i) => (
              <div key={i} className="p-6 hover:bg-slate-800/20 transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                      <AlertCircle className={cn(
                        "h-5 w-5",
                        action.type === 'Dormant Lead' ? "text-red-500" : "text-amber-500"
                      )} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{action.type}</p>
                      <h4 className="text-lg font-bold text-white mb-0.5">{action.lead}</h4>
                      <div className="flex items-center space-x-3 text-xs text-slate-400">
                        <span className="flex items-center">
                          <DollarSign className="h-3 w-3 mr-0.5" />
                          {action.value.toLocaleString()} Potential
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-0.5" />
                          Dormant for {action.age}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-xl shadow-blue-600/20 transition-all transform group-hover:translate-x-1">
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
             <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Automation Status</h3>
             <div className="space-y-4">
               <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                 <div className="flex items-center space-x-3">
                   <div className="h-2 w-2 rounded-full bg-green-500" />
                   <span className="text-sm text-slate-300 font-medium">Auto-Reactivation Campaigns</span>
                 </div>
                 <span className="text-xs font-bold text-green-500">RUNNING</span>
               </div>
               <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                 <div className="flex items-center space-x-3">
                   <div className="h-2 w-2 rounded-full bg-green-500" />
                   <span className="text-sm text-slate-300 font-medium">No-Show Smart Followup</span>
                 </div>
                 <span className="text-xs font-bold text-green-500">RUNNING</span>
               </div>
               <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700 opacity-50">
                 <div className="flex items-center space-x-3">
                   <div className="h-2 w-2 rounded-full bg-slate-600" />
                   <span className="text-sm text-slate-300 font-medium">Loss Recovery Sequencing</span>
                 </div>
                 <span className="text-xs font-bold text-slate-500">PAUSED</span>
               </div>
             </div>
           </div>

           <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-blue-500/20 rounded-xl p-6 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
               <Zap className="h-32 w-32 text-white" />
             </div>
             <div className="relative z-10">
               <h3 className="text-lg font-bold text-white mb-2">Smart Recovery Tip</h3>
               <p className="text-sm text-slate-300 leading-relaxed mb-6">
                 Your "No-Show" recovery rate is currently 22%. By implementing our suggested "VIP Reactivation" sequence, you could increase this to 35% based on similar business benchmarks.
               </p>
               <button className="flex items-center space-x-2 text-blue-400 font-bold hover:text-white transition-colors group">
                 <span>Enable VIP Reactivation</span>
                 <MousePointer2 className="h-4 w-4 group-hover:animate-bounce" />
               </button>
             </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
