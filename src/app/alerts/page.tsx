
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AlertTriangle, CheckCircle2, Clock, Filter, Info, ShieldAlert } from 'lucide-react';
import { mockAlerts } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Alert Center</h1>
          <p className="text-slate-400">Actionable intelligence requiring executive attention.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 border border-red-500/20 p-4 rounded-xl flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <ShieldAlert className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Critical</p>
              <p className="text-2xl font-bold text-white">{mockAlerts.filter(a => a.level === 'critical').length}</p>
            </div>
          </div>
          
          <div className="bg-slate-900/50 border border-amber-500/20 p-4 rounded-xl flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Warnings</p>
              <p className="text-2xl font-bold text-white">{mockAlerts.filter(a => a.level === 'warning').length}</p>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-blue-500/20 p-4 rounded-xl flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Info className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Information</p>
              <p className="text-2xl font-bold text-white">{mockAlerts.filter(a => a.level === 'info').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-300">Filter Alerts</span>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs font-medium bg-slate-800 text-white rounded-md border border-slate-700 hover:bg-slate-700 transition-colors">
                All Categories
              </button>
              <button className="px-3 py-1 text-xs font-medium bg-slate-800 text-white rounded-md border border-slate-700 hover:bg-slate-700 transition-colors">
                Recent First
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-800/50">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="p-5 hover:bg-slate-800/20 transition-colors group">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={cn(
                      "mt-1 h-2 w-2 rounded-full",
                      alert.level === 'critical' ? "bg-red-500" : 
                      alert.level === 'warning' ? "bg-amber-500" : "bg-blue-500"
                    )} />
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                          alert.level === 'critical' ? "bg-red-500/10 text-red-400 border border-red-500/20" : 
                          alert.level === 'warning' ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : 
                          "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        )}>
                          {alert.level}
                        </span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-400">{alert.category}</span>
                      </div>
                      <h3 className="text-base font-semibold text-white mb-1">{alert.title}</h3>
                      <p className="text-sm text-slate-400 max-w-2xl">{alert.description}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end space-y-3">
                    <div className="flex items-center text-xs text-slate-500 space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                    <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition-all opacity-0 group-hover:opacity-100">
                      Resolve Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
