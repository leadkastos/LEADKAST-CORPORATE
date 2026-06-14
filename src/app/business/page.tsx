'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  Building2, 
  MapPin, 
  Users2, 
  TrendingUp,
  LayoutDashboard,
  Settings,
  MoreVertical,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockBusinessDashboard } from '@/lib/mock-data';

export default function BusinessDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{mockBusinessDashboard.businessName}</h1>
              <p className="text-slate-400">Corporate headquarters and location oversight.</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
              <Plus className="h-4 w-4" />
              <span>New Location</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Locations</p>
                  <p className="text-4xl font-bold text-white">{mockBusinessDashboard.locations}</p>
                </div>
                <MapPin className="h-10 w-10 text-slate-700" />
              </div>
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Total Staff</p>
                  <p className="text-4xl font-bold text-white">{mockBusinessDashboard.totalEmployees}</p>
                </div>
                <Users2 className="h-10 w-10 text-slate-700" />
              </div>
            </div>

            {/* Department Performance */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-white">Department Health</h2>
                <TrendingUp className="h-5 w-5 text-slate-500" />
              </div>
              <div className="space-y-6">
                {mockBusinessDashboard.departmentScores.map((dept, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-300">{dept.name}</span>
                      <span className="font-bold text-white">{dept.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          dept.score >= 90 ? "bg-green-500" :
                          dept.score >= 80 ? "bg-blue-500" :
                          dept.score >= 70 ? "bg-amber-500" : "bg-red-500"
                        )}
                        style={{ width: `${dept.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions / Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/20">
              <h3 className="font-bold mb-2">Corporate Strategy</h3>
              <p className="text-blue-100 text-sm mb-6">Your current growth target is set to 15% MRR increase for Q3.</p>
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-all backdrop-blur-sm border border-white/20">
                View Strategy Map
              </button>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Internal Tools</h3>
              <div className="space-y-3">
                <ToolItem icon={<LayoutDashboard className="h-4 w-4" />} name="Central Registry" />
                <ToolItem icon={<Building2 className="h-4 w-4" />} name="Asset Management" />
                <ToolItem icon={<Users2 className="h-4 w-4" />} name="Talent Portal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ToolItem({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800 transition-all group">
      <div className="flex items-center space-x-3">
        <div className="text-slate-500 group-hover:text-blue-400 transition-colors">{icon}</div>
        <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{name}</span>
      </div>
      <MoreVertical className="h-4 w-4 text-slate-700 opacity-0 group-hover:opacity-100 transition-all" />
    </button>
  );
}
