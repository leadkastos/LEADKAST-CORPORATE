'use client';

import React, { useState } from 'react';
import { Bell, X, AlertCircle, AlertTriangle, Info, Check } from 'lucide-react';
import { useAlerts } from '@/hooks/useAlerts';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export function NotificationBell() {
  const { alerts, count, resolve, refresh, loading } = useAlerts();
  const [isOpen, setIsOpen] = useState(false);

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white transition-colors"
      >
        <Bell className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-slate-950"></span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <h3 className="text-sm font-semibold text-white flex items-center">
                Executive Alerts
                {count > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 bg-red-500/20 text-red-500 text-[10px] rounded-full border border-red-500/20">
                    {count}
                  </span>
                )}
              </h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => refresh()}
                  className="text-[10px] text-slate-400 hover:text-white transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {alerts.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="h-6 w-6 text-slate-600" />
                  </div>
                  <p className="text-sm text-slate-400">All clear! No active alerts.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-800">
                  {alerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={cn(
                        "p-4 hover:bg-slate-800/50 transition-colors group relative",
                        alert.level === 'critical' ? "border-l-2 border-red-500" : 
                        alert.level === 'warning' ? "border-l-2 border-amber-500" : ""
                      )}
                    >
                      <div className="flex gap-3">
                        <div className="mt-0.5 shrink-0">
                          {getLevelIcon(alert.level)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white mb-0.5">
                            {alert.title}
                          </p>
                          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                            {alert.description}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-2">
                            {formatDistanceToNow(new Date(alert.created_at), { addSuffix: true })}
                          </p>
                        </div>
                        <button 
                          onClick={() => resolve(alert.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-green-500 transition-all shrink-0"
                          title="Mark as resolved"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {alerts.length > 0 && (
              <div className="p-3 border-t border-slate-800 bg-slate-900/50">
                <button className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors text-center font-medium">
                  View All Intelligence
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
