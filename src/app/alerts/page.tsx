'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  AlertTriangle, 
  Bell, 
  Filter, 
  Search, 
  CheckCircle2, 
  Clock,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockAlerts } from '@/lib/mock-data';

export default function AlertsCenter() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Alert Center</h1>
            <p className="text-slate-400">Real-time intelligence and anomaly detection.</p>
          </div>
          <div className="flex space-x-3">
             <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search alerts..."
                className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white outline-none w-64 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {mockAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={cn(
                "group p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden",
                alert.level === 'critical' ? "bg-rose-500/5 border-rose-500/20 hover:border-rose-500/40" :
                alert.level === 'warning' ? "bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40" :
                "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              )}
            >
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-start space-x-4">
                  <div className={cn(
                    "mt-1 p-2 rounded-xl",
                    alert.level === 'critical' ? "bg-rose-500/20 text-rose-500" :
                    alert.level === 'warning' ? "bg-amber-500/20 text-amber-400" :
                    "bg-blue-500/20 text-blue-400"
                  )}>
                    {alert.level === 'critical' ? <AlertTriangle className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">{alert.title}</h3>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest",
                        alert.level === 'critical' ? "bg-rose-500/10 text-rose-500" :
                        alert.level === 'warning' ? "bg-amber-500/10 text-amber-400" :
                        "bg-blue-500/10 text-blue-400"
                      )}>
                        {alert.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">{alert.description}</p>
                    <div className="flex items-center space-x-4 mt-4">
                       <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{alert.time}</span>
                       </div>
                       <button className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center">
                          Investigate <ChevronRight className="h-3 w-3 ml-1" />
                       </button>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-slate-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
