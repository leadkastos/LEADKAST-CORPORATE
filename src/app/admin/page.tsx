
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ShieldCheck, Users, Settings, Activity, ArrowRight, Lock, Key } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Administration</h1>
          <p className="text-slate-400">System configuration and organizational management.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/permissions" className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 transition-all group">
             <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6 text-blue-400" />
             </div>
             <h3 className="text-lg font-bold text-white mb-2">User Permissions</h3>
             <p className="text-sm text-slate-500 mb-6">Manage roles, access levels, and security policies for your team.</p>
             <div className="flex items-center text-blue-400 text-sm font-bold">
                <span>Manage Permissions</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
             </div>
          </Link>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-all group cursor-pointer">
             <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="h-6 w-6 text-indigo-400" />
             </div>
             <h3 className="text-lg font-bold text-white mb-2">System Audit</h3>
             <p className="text-sm text-slate-500 mb-6">View detailed activity logs and system performance metrics.</p>
             <div className="flex items-center text-indigo-400 text-sm font-bold">
                <span>View Logs</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
             </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all group cursor-pointer">
             <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lock className="h-6 w-6 text-slate-400" />
             </div>
             <h3 className="text-lg font-bold text-white mb-2">Security Settings</h3>
             <p className="text-sm text-slate-500 mb-6">Configure SSO, 2FA, and other advanced security requirements.</p>
             <div className="flex items-center text-slate-400 text-sm font-bold">
                <span>Configure Security</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
             </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
           <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Organization Health</h3>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Total Users</p>
                 <p className="text-3xl font-bold text-white">24</p>
                 <p className="text-xs text-green-500 mt-1 font-bold">+2 this month</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Active Sessions</p>
                 <p className="text-3xl font-bold text-white">8</p>
                 <p className="text-xs text-slate-500 mt-1 font-medium">Currently online</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Data Storage</p>
                 <p className="text-3xl font-bold text-white">4.2 GB</p>
                 <p className="text-xs text-slate-500 mt-1 font-medium">12% of quota</p>
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">API Requests</p>
                 <p className="text-3xl font-bold text-white">12.5k</p>
                 <p className="text-xs text-slate-500 mt-1 font-medium">Last 24 hours</p>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
