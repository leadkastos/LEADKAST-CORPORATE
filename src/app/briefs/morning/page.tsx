
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Mail, Send, Eye, Clock, Layout, Share2, Download } from 'lucide-react';

export default function MorningBriefPreview() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Morning Brief</h1>
            <p className="text-slate-400">8:00 AM Executive Intelligence Summary.</p>
          </div>
          <div className="flex space-x-3">
             <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-all">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-600/20 transition-all">
              <Send className="h-4 w-4" />
              <span>Send Now</span>
            </button>
          </div>
        </div>

        {/* Email Preview Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[800px]">
          <div className="bg-slate-950 p-8 border-b border-slate-800">
             <div className="flex justify-between items-start">
               <div>
                 <div className="h-8 w-8 rounded-lg bg-blue-600 mb-4 flex items-center justify-center">
                   <Mail className="h-4 w-4 text-white" />
                 </div>
                 <h2 className="text-2xl font-bold text-white tracking-tight">Your Morning Brief</h2>
                 <p className="text-slate-500 text-sm mt-1">Friday, June 12, 2026</p>
               </div>
               <div className="text-right">
                 <div className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                   <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Platform Healthy</span>
                 </div>
               </div>
             </div>
          </div>

          <div className="bg-slate-950 p-8 space-y-10">
            {/* Metric Grid */}
            <div className="grid grid-cols-3 gap-6">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Revenue</p>
                <p className="text-xl font-bold text-white">$42,850.00</p>
                <p className="text-[10px] font-bold text-green-500 mt-1">+12.4%</p>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">New Leads</p>
                <p className="text-xl font-bold text-white">48</p>
                <p className="text-[10px] font-bold text-green-500 mt-1">+8.2%</p>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Conversion</p>
                <p className="text-xl font-bold text-white">18.4%</p>
                <p className="text-[10px] font-bold text-red-500 mt-1">-1.5%</p>
              </div>
            </div>

            {/* Narrative */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Executive Summary</h3>
              <p className="text-slate-300 leading-relaxed">
                Good morning. Performance is strong today with a <span className="text-white font-bold">$42k revenue day </span> 
                driven primarily by Meta Ads. We've identified <span className="text-blue-400 font-bold underline">12 high-priority leads </span> 
                that are currently untouched. We recommend immediate followup to capitalize on the 48-hour interest window.
              </p>
            </div>

            {/* Alerts */}
            <div className="space-y-4">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Critical Alerts</h3>
               <div className="space-y-3">
                 <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center justify-between">
                   <span className="text-sm text-red-200 font-medium">Facebook Ad Spend Spike (+40%)</span>
                   <button className="text-[10px] font-bold text-red-400 uppercase underline">Investigate</button>
                 </div>
                 <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-center justify-between">
                   <span className="text-sm text-amber-200 font-medium">12 Untouched High-Value Leads</span>
                   <button className="text-[10px] font-bold text-amber-400 uppercase underline">Assign Team</button>
                 </div>
               </div>
            </div>

            <div className="pt-10 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-600">
                Sent automatically by LeadKast OS Intelligence Engine.
              </p>
              <div className="flex justify-center space-x-4 mt-4 text-[10px] font-bold text-slate-500 uppercase">
                <button>Settings</button>
                <button>Unsubscribe</button>
                <button>Help Center</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
