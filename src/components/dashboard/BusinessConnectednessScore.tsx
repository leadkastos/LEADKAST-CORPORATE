
import React from 'react';
import { Shield, Zap, CheckCircle2 } from 'lucide-react';
import { getConnectednessScore } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function BusinessConnectednessScore({ className }: { className?: string }) {
  const score = getConnectednessScore();
  
  return (
    <div className={cn("bg-slate-900/50 border border-slate-800 rounded-2xl p-6 overflow-hidden relative group", className)}>
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
        <Shield className="h-24 w-24 text-blue-500" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Business Connectedness</h3>
          <div className="flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            SECURE
          </div>
        </div>
        
        <div className="flex items-end space-x-4 mb-6">
          <span className="text-5xl font-black text-white tracking-tight">{score}%</span>
          <div className="pb-1">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-tighter">System Score</p>
            <p className="text-[10px] text-slate-500 font-medium">Updated 5m ago</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-1000"
              style={{ width: `${score}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Your platform is <span className="text-white font-bold">high-connected</span>. All Phase 1 integrations are operational and syncing data.
          </p>
        </div>
        
        <div className="mt-6 flex items-center space-x-4">
          <div className="flex -space-x-2">
             {[1, 2, 3].map((i) => (
               <div key={i} className="h-6 w-6 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center">
                 <Zap className="h-3 w-3 text-blue-400" />
               </div>
             ))}
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">3 Active Data Streams</span>
        </div>
      </div>
    </div>
  );
}
