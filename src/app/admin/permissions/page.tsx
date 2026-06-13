
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ShieldCheck, UserPlus, Search, Filter, MoreVertical, Shield } from 'lucide-react';
import { mockPermissions } from '@/lib/mock-data';

export default function PermissionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">User Permissions</h1>
            <p className="text-slate-400">Manage organizational roles and platform access levels.</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition-all">
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
           <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/20">
             <div className="flex items-center space-x-4">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                 <input 
                   type="text" 
                   placeholder="Search roles or users..." 
                   className="bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:ring-1 focus:ring-blue-500 outline-none w-64"
                 />
               </div>
             </div>
             <button className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-all">
               <Filter className="h-3.5 w-3.5" />
               <span>Sort</span>
             </button>
           </div>

           <div className="p-0 overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-slate-800/30 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800">
                   <th className="px-6 py-4">Role Name</th>
                   <th className="px-6 py-4">Active Users</th>
                   <th className="px-6 py-4">Platform Access</th>
                   <th className="px-6 py-4 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-800/50 text-sm">
                 {mockPermissions.map((role, i) => (
                   <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                     <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Shield className="h-4 w-4 text-blue-400" />
                          </div>
                          <span className="font-bold text-white">{role.role}</span>
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex -space-x-2">
                           {[...Array(Math.min(role.users, 4))].map((_, idx) => (
                             <div key={idx} className="h-7 w-7 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-slate-400">
                               U{idx}
                             </div>
                           ))}
                           {role.users > 4 && (
                             <div className="h-7 w-7 rounded-full bg-slate-900 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-slate-500">
                               +{role.users - 4}
                             </div>
                           )}
                        </div>
                     </td>
                     <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700 text-xs font-medium">
                          {role.access}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-500 hover:text-white transition-colors">
                           <MoreVertical className="h-4 w-4" />
                        </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        <div className="p-6 bg-blue-600/5 border border-blue-500/10 rounded-2xl">
           <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2">Audit Log</h3>
           <div className="space-y-4 mt-6">
              {[
                { action: 'Role Updated', user: 'Admin', target: 'Manager', time: '2 hours ago' },
                { action: 'New User Added', user: 'Admin', target: 'Alex Johnson', time: '5 hours ago' },
                { action: 'Access Revoked', user: 'System', target: 'External Contractor', time: 'Yesterday' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between text-xs border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-200 font-bold">{log.action}</span>
                    <span className="text-slate-500">by {log.user} for {log.target}</span>
                  </div>
                  <span className="text-slate-500 italic">{log.time}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
