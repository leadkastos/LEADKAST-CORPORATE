
'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Shield,
  Zap,
  Loader2,
  Filter,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockIntegrations } from '@/lib/mock-data';
import { BusinessConnectednessScore } from '@/components/dashboard/BusinessConnectednessScore';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(mockIntegrations);
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleConnect = (id: string) => {
    setConnectingId(id);
    // Simulate connection
    setTimeout(() => {
      setIntegrations(prev => prev.map(int => 
        int.id === id ? { ...int, status: 'connected', lastSync: 'Just now' } : int
      ));
      setConnectingId(null);
    }, 2000);
  };

  const handleSyncAll = async () => {
    try {
      setIsSyncing(true);
      const response = await fetch('/api/integrations/sync', {
        method: 'POST',
      });
      const data = await response.json();
      console.log('Sync results:', data);
      
      if (data.success) {
        setIntegrations(prev => prev.map(int => ({
          ...int,
          lastSync: 'Just now'
        })));
      }
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Integrations</h1>
            <p className="text-slate-400">Connect your business ecosystem to LeadKast OS.</p>
          </div>
          <div className="flex space-x-3">
             <button
              onClick={handleSyncAll}
              disabled={isSyncing}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw className={cn("h-4 w-4", isSyncing && "animate-spin")} />
              <span>{isSyncing ? 'Syncing...' : 'Sync All Now'}</span>
            </button>
             <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search tools..." 
                className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none w-64"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((item) => (
                <div 
                  key={item.id}
                  className={cn(
                    "bg-slate-900/50 border rounded-2xl p-6 transition-all duration-300 flex flex-col group",
                    item.status === 'connected' ? "border-blue-500/30" : "border-slate-800 hover:border-slate-700"
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center text-white shrink-0",
                      item.status === 'connected' ? "bg-blue-600/20 border border-blue-500/30" : "bg-slate-800"
                    )}>
                      {item.category === 'CRM' ? <Shield className={cn("h-6 w-6", item.status === 'connected' ? "text-blue-400" : "text-slate-500")} /> : 
                       <Zap className={cn("h-6 w-6", item.status === 'connected' ? "text-blue-400" : "text-slate-500")} />}
                    </div>
                    {item.status === 'coming_soon' ? (
                       <span className="text-[10px] font-bold text-slate-600 bg-slate-800 px-2 py-0.5 rounded uppercase tracking-widest">Soon</span>
                    ) : (
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        item.status === 'connected' ? "bg-green-500 animate-pulse" : 
                        item.status === 'error' ? "bg-red-500" : "bg-slate-600"
                      )} />
                    )}
                  </div>

                  <h3 className="font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">{item.category}</p>
                  <p className="text-sm text-slate-400 mb-6 flex-1">{item.description}</p>

                  <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between">
                    {item.status === 'connected' ? (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[10px] text-slate-500 italic">Synced {item.lastSync}</span>
                        <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors">Manage</button>
                      </div>
                    ) : item.status === 'coming_soon' ? (
                       <button disabled className="w-full py-2 bg-slate-800 text-slate-600 text-xs font-bold rounded-lg cursor-not-allowed">Coming Soon</button>
                    ) : (
                      <button
                        onClick={() => handleConnect(item.id)}
                        disabled={connectingId === item.id}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center"
                      >
                        {connectingId === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Connect Now'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <BusinessConnectednessScore />
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Integration Activity</h3>
              <div className="space-y-4">
                {[
                  { event: 'Data Refreshed', tool: 'GoHighLevel', time: '2m ago' },
                  { event: 'New Lead Synced', tool: 'Meta Ads', time: '14m ago' },
                  { event: 'Token Renewed', tool: 'GoHighLevel', time: '1h ago' },
                ].map((log, i) => (
                  <div key={i} className="flex items-start space-x-3 text-xs border-b border-slate-800/50 pb-3 last:border-0 last:pb-0">
                    <RefreshCw className="h-3 w-3 text-slate-500 mt-0.5" />
                    <div className="flex-1">
                       <p className="text-slate-300 font-medium">{log.event}</p>
                       <p className="text-slate-500">{log.tool} • {log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
