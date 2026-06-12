
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Archive, Search, Filter, FileText, Download, Trash2 } from 'lucide-react';
import { mockReports } from '@/lib/mock-data';

export default function ArchivePage() {
  const archivedReports = mockReports.filter(r => r.status === 'archived');
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Document Archive</h1>
            <p className="text-slate-400">Historical reports and legacy business intelligence.</p>
          </div>
          <div className="flex space-x-3">
             <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search archive..." 
                className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none w-64"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
           <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/20">
             <div className="flex items-center space-x-2">
               <Filter className="h-4 w-4 text-slate-400" />
               <span className="text-sm font-medium text-slate-300">All Folders</span>
             </div>
           </div>

           {archivedReports.length > 0 ? (
             <div className="divide-y divide-slate-800/50">
               {archivedReports.map((report) => (
                 <div key={report.id} className="p-5 hover:bg-slate-800/20 transition-colors group">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                           <FileText className="h-5 w-5" />
                        </div>
                        <div>
                           <h4 className="text-white font-bold mb-0.5">{report.name}</h4>
                           <p className="text-xs text-slate-500">{report.type} • Archived on {report.date}</p>
                        </div>
                     </div>
                     <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                           <Download className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                           <Trash2 className="h-4 w-4" />
                        </button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="p-20 text-center">
                <div className="inline-block p-4 rounded-full bg-slate-800/50 mb-4">
                  <Archive className="h-8 w-8 text-slate-600" />
                </div>
                <h3 className="text-white font-bold">No archived items</h3>
                <p className="text-sm text-slate-500 mt-1">Archived reports will appear here for long-term storage.</p>
             </div>
           )}
        </div>
      </div>
    </DashboardLayout>
  );
}
