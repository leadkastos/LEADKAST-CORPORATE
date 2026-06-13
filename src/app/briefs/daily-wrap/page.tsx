
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Mail, Send, Share2, Moon } from 'lucide-react';

export default function DailyWrapPreview() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Daily Wrap</h1>
            <p className="text-slate-400">6:00 PM Performance Recap & Tomorrow's Outlook.</p>
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
        <div className="bg-slate-950 rounded-2xl shadow-2xl overflow-hidden min-h-[800px] border border-slate-800">
          <div className="p-12 space-y-12">
            <div className="text-center space-y-4">
               <div className="mx-auto h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                 <Moon className="h-6 w-6 text-white" />
               </div>
               <h2 className="text-3xl font-bold text-white tracking-tight">Today's Recap</h2>
               <p className="text-slate-500 font-medium uppercase tracking-[0.2em] text-xs">Friday, June 12 • 6:00 PM</p>
            </div>

            {/* Main Stats Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 flex items-center justify-between">
               <div className="text-center px-4 flex-1 border-r border-slate-800">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Revenue</p>
                  <p className="text-3xl font-bold text-white">$12,450</p>
                  <p className="text-xs text-green-500 font-bold mt-1">Goal: $10k (Exceeded)</p>
               </div>
               <div className="text-center px-4 flex-1 border-r border-slate-800">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">New Deals</p>
                  <p className="text-3xl font-bold text-white">4</p>
                  <p className="text-xs text-slate-500 font-bold mt-1">Avg. $2.5k Value</p>
               </div>
               <div className="text-center px-4 flex-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Engagement</p>
                  <p className="text-3xl font-bold text-white">92%</p>
                  <p className="text-xs text-green-500 font-bold mt-1">+5% vs yesterday</p>
               </div>
            </div>

            {/* Highlights Checklist */}
            <div className="space-y-6">
               <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Key Highlights</h3>
               <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                 <div className="flex items-start space-x-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <p className="text-sm text-slate-300 leading-relaxed">Closed <span className="text-white font-bold">TechCore Deal </span> for $12k. Integration already underway.</p>
                 </div>
                 <div className="flex items-start space-x-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <p className="text-sm text-slate-300 leading-relaxed">Marketing spend ROI hit <span className="text-white font-bold">4.2x </span> today, highest in 30 days.</p>
                 </div>
                 <div className="flex items-start space-x-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <p className="text-sm text-slate-300 leading-relaxed">Generated <span className="text-white font-bold">14 new proposals </span> for Q3 pipeline growth.</p>
                 </div>
                 <div className="flex items-start space-x-4">
                    <div className="mt-1 h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                    <p className="text-sm text-slate-300 leading-relaxed">Detected <span className="text-white font-bold">8 missed calls </span>. Automated followup triggered.</p>
                 </div>
               </div>
            </div>

            {/* Tomorrow Outlook */}
            <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-8 space-y-4">
               <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest">Priority for Tomorrow</h3>
               <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-6 w-6 rounded-full border border-indigo-500/30 flex items-center justify-center text-[10px] text-indigo-400 font-bold">1</div>
                    <p className="text-sm text-slate-200">Executive meeting with <span className="font-bold">Aria Green </span> at 10:00 AM.</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-6 w-6 rounded-full border border-indigo-500/30 flex items-center justify-center text-[10px] text-indigo-400 font-bold">2</div>
                    <p className="text-sm text-slate-200">Review updated <span className="font-bold">Q4 Revenue Forecast </span> by noon.</p>
                  </div>
               </div>
            </div>

            <div className="pt-12 text-center">
              <p className="text-xs text-slate-600 font-medium">Good night. We'll be back at 8:00 AM.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
