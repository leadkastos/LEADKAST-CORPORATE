'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Archive, Search, Filter, FileText, Download, Trash2, Folder, HardDrive, LayoutGrid, List, ChevronRight, Clock, Shield } from 'lucide-react';
import { mockReports } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function ArchivePage() {
  const [view, setView] = React.useState<'grid' | 'list'>('list');
  const archivedReports = mockReports.filter(r => r.status === 'archived' || r.status === 'final');
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Document Archive</h1>
            <p className="text-slate-400">Historical reports and legacy business intelligence.</p>
          </div>
          <div className="flex items-center space-x-3">
             <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search archive..." 
                className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none w-full md:w-64"
              />
            </div>
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
               <button 
                 onClick={() => setView('list')}
                 className={cn("p-1.5 rounded-md transition-all", view === 'list' ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300")}
               >
                 <List className="h-4 w-4" />
               </button>
               <button 
                 onClick={() => setView('grid')}
                 className={cn("p-1.5 rounded-md transition-all", view === 'grid' ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300")}
               >
                 <LayoutGrid className="h-4 w-4" />
               </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                 <div className="flex items-center space-x-2 mb-6">
                    <HardDrive className="h-5 w-5 text-blue-500" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Storage Usage</h3>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between text-xs mb-1">
                       <span className="text-slate-400">856 MB of 2 GB used</span>
                       <span className="text-white font-bold">42%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                       <div className="bg-blue-600 h-full rounded-full" style={{ width: '42%' }} />
                    </div>
                    <button className="w-full py-2 text-xs font-bold text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/10 transition-all">Upgrade Storage</button>
                 </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                 <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Categories</h3>
                 <nav className="space-y-1">
                    {[
                       { name: 'All Documents', count: 24, icon: Archive, active: true },
                       { name: 'Financial Reports', count: 8, icon: Shield },
                       { name: 'Marketing Audits', count: 12, icon: Folder },
                       { name: 'Operations', count: 4, icon: Folder },
                    ].map((cat) => (
                       <button key={cat.name} className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all",
                          cat.active ? "bg-blue-600/10 text-blue-400" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                       )}>
                          <div className="flex items-center space-x-3">
                             <cat.icon className="h-4 w-4" />
                             <span>{cat.name}</span>
                          </div>
                          <span className="opacity-60">{cat.count}</span>
                       </button>
                    ))}
                 </nav>
              </div>
           </div>

           <div className="lg:col-span-3">
              {view === 'list' ? (
                 <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="divide-y divide-slate-800/50">
                       {archivedReports.map((report) => (
                          <div key={report.id} className="p-4 hover:bg-slate-800/20 transition-colors group cursor-pointer">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                   <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-400 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all">
                                      <FileText className="h-5 w-5" />
                                   </div>
                                   <div>
                                      <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{report.name}</h4>
                                      <div className="flex items-center space-x-3 mt-0.5">
                                         <span className="text-[10px] text-slate-500 uppercase tracking-widest">{report.type}</span>
                                         <span className="text-[10px] text-slate-600">•</span>
                                         <div className="flex items-center text-[10px] text-slate-500">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {report.date}
                                         </div>
                                      </div>
                                   </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                   <div className="hidden md:block">
                                      <span className={cn(
                                         "px-2 py-0.5 rounded text-[10px] font-bold border",
                                         report.status === 'archived' ? "text-amber-400 border-amber-500/20 bg-amber-500/5" : "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
                                      )}>
                                         {report.status.toUpperCase()}
                                      </span>
                                   </div>
                                   <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                                         <Download className="h-4 w-4" />
                                      </button>
                                      <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-all">
                                         <Trash2 className="h-4 w-4" />
                                      </button>
                                      <ChevronRight className="h-4 w-4 text-slate-700" />
                                   </div>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              ) : (
                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {archivedReports.map((report) => (
                       <div key={report.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all group cursor-pointer relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                             <FileText className="h-16 w-16 text-white" />
                          </div>
                          <div className="relative z-10">
                             <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-400 mb-4 group-hover:text-blue-400 transition-colors">
                                <FileText className="h-5 w-5" />
                             </div>
                             <h4 className="text-white font-bold mb-1 line-clamp-1 group-hover:text-blue-400 transition-colors">{report.name}</h4>
                             <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">{report.type}</p>
                             <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
                                <div className="flex items-center text-[10px] text-slate-500">
                                   <Clock className="h-3 w-3 mr-1" />
                                   {report.date}
                                </div>
                                <div className="flex space-x-1">
                                   <button className="p-1.5 text-slate-500 hover:text-white transition-colors"><Download className="h-3.5 w-3.5" /></button>
                                </div>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              )}
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

