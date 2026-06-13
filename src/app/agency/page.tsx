'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  Users, 
  BarChart3, 
  Target, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  Search,
  Filter,
  ExternalLink,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockAgencyDashboard } from '@/lib/mock-data';

export default function AgencyDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Agency Dashboard</h1>
            <p className="text-slate-400">Portfolio oversight and client performance tracking.</p>
          </div>
          <div className="flex space-x-3">
             <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search clients..."
                className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none w-64"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
              <Users className="h-4 w-4" />
              <span>Add Client</span>
            </button>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            label="Total Clients" 
            value={mockAgencyDashboard.totalClients.toString()} 
            icon={<Users className="h-5 w-5 text-blue-400" />} 
          />
          <StatCard 
            label="Active Campaigns" 
            value={mockAgencyDashboard.activeCampaigns.toString()} 
            icon={<Target className="h-5 w-5 text-indigo-400" />} 
          />
          <StatCard 
            label="Managed Spend" 
            value={mockAgencyDashboard.totalManagedSpend} 
            icon={<BarChart3 className="h-5 w-5 text-emerald-400" />} 
          />
          <StatCard 
            label="Avg. Client Health" 
            value={`${mockAgencyDashboard.avgClientHealth}%`} 
            icon={<Activity className="h-5 w-5 text-amber-400" />} 
          />
        </div>

        {/* Client List */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Client Portfolio</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800/50 bg-slate-800/20">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Client</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Health Score</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Monthly Spend</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {mockAgencyDashboard.clients.map((client, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                          {client.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium text-white">{client.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              client.health >= 90 ? "bg-green-500" :
                              client.health >= 75 ? "bg-blue-500" :
                              client.health >= 60 ? "bg-amber-500" : "bg-red-500"
                            )}
                            style={{ width: `${client.health}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-slate-300">{client.health}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300 font-medium">{client.spend}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn(
                        "inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        client.status === 'active' ? "bg-green-500/10 text-green-400" :
                        client.status === 'warning' ? "bg-amber-500/10 text-amber-400" :
                        "bg-red-500/10 text-red-400"
                      )}>
                        {client.status === 'active' ? <ShieldCheck className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                        <span>{client.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-500 hover:text-white transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}
