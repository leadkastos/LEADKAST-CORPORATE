import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { cn } from '@/lib/utils';
import {
  Search, Download, Filter, Calendar, FileText,
  BarChart3, TrendingUp, Users, DollarSign,
  ChevronRight, ExternalLink, Clock, Eye, ArrowUpRight,
  PieChart, Activity, Plus, Settings, Mail
} from 'lucide-react';

const reportCategories = [
  { id: 'all', label: 'All Reports', icon: FileText, count: 12 },
  { id: 'revenue', label: 'Revenue', icon: DollarSign, count: 4 },
  { id: 'marketing', label: 'Marketing', icon: TrendingUp, count: 3 },
  { id: 'customers', label: 'Customers', icon: Users, count: 3 },
  { id: 'operations', label: 'Operations', icon: Activity, count: 2 },
];

const reports = [
  { id: 1, title: 'Monthly Revenue Report', category: 'revenue', description: 'Revenue streams, MRR trends, and growth metrics.', date: 'Dec 1, 2025', pages: 8, readTime: '12 min', status: 'updated' as const, trend: 'up' as const, value: '+12.5%', chart: [42,55,48,70,62,85] },
  { id: 2, title: 'Marketing Performance Dashboard', category: 'marketing', description: 'Channel attribution, campaign ROI, and conversion analysis.', date: 'Nov 28, 2025', pages: 12, readTime: '15 min', status: 'new' as const, trend: 'up' as const, value: '+18.2%', chart: [35,48,52,60,55,72] },
  { id: 3, title: 'Customer Acquisition Analysis', category: 'customers', description: 'CAC trends, LTV analysis, cohort retention by segment.', date: 'Nov 25, 2025', pages: 10, readTime: '10 min', status: 'updated' as const, trend: 'up' as const, value: '+5.4%', chart: [50,52,55,58,62,68] },
  { id: 4, title: 'Q4 Executive Summary', category: 'all', description: 'Quarterly business health review with key insights.', date: 'Oct 1, 2025', pages: 6, readTime: '8 min', status: 'archived' as const, trend: 'neutral' as const, value: 'Stable', chart: [60,65,62,70,68,75] },
];

const scheduledReports = [
  { id: 1, title: 'Weekly Performance Digest', frequency: 'Every Monday', nextRun: 'Jun 15, 2026', recipients: 3, icon: Mail },
  { id: 2, title: 'Monthly Revenue Audit', frequency: '1st of the month', nextRun: 'Jul 1, 2026', recipients: 5, icon: PieChart },
];

const statusStyles = {
  new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  updated: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  archived: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

const chartColor = { up: 'from-emerald-500 to-emerald-400', down: 'from-rose-500 to-rose-400', neutral: 'from-blue-500 to-blue-400' };

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Reporting Center</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Deep-dive reports and analytics for data-driven decisions.</p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all flex items-center shadow-lg shadow-blue-600/20"><Plus className="h-4 w-4 mr-2" />Create Custom Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Col: Filters and Main List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search & Filters */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input type="text" placeholder="Search reports..." className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all" />
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-slate-700/50 bg-slate-800/60 text-slate-400 text-sm hover:text-white hover:border-slate-600 transition-all"><Filter className="h-4 w-4" /><span>Filters</span></button>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {reportCategories.map((cat) => (
              <button key={cat.id} className={cn("flex items-center space-x-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all whitespace-nowrap shrink-0", cat.id === 'all' ? 'bg-blue-600/20 border-blue-500/30 text-blue-300' : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700')}>
                <cat.icon className="h-4 w-4" />
                <span>{cat.label}</span>
                <span className={cn("text-[11px] px-1.5 py-0.5 rounded-full", cat.id === 'all' ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-500')}>{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reports.map((report) => (
              <div key={report.id} className="group bg-slate-900/50 border border-slate-800/80 rounded-xl overflow-hidden hover:border-slate-700/80 transition-all hover:shadow-lg hover:shadow-slate-900/30 cursor-pointer">
                <div className="h-24 px-5 pt-4 pb-2 bg-slate-900/80">
                  <div className="flex items-end h-full space-x-1.5">
                    {report.chart.map((h, i) => (
                      <div key={i} className="flex-1 bg-slate-800/50 rounded-t-sm relative">
                        <div className={cn("absolute bottom-0 left-0 right-0 bg-gradient-to-t rounded-t-sm transition-all duration-500 group-hover:opacity-80", chartColor[report.trend])} style={{ height: `${h}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider", statusStyles[report.status])}>
                      {report.status}
                    </span>
                    <div className="flex items-center space-x-1 text-[11px] text-slate-500"><Clock className="h-3 w-3" /><span>{report.readTime}</span></div>
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors mb-1">{report.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">{report.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                    <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" />{report.date}</span>
                    </div>
                    <span className={cn("text-xs font-semibold", report.trend === 'up' ? 'text-emerald-400' : report.trend === 'down' ? 'text-rose-400' : 'text-slate-400')}>{report.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Scheduled Reports & Custom Builder */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Scheduled</h3>
              <Settings className="h-4 w-4 text-slate-500 cursor-pointer hover:text-white transition-colors" />
            </div>
            <div className="space-y-4">
              {scheduledReports.map((s) => (
                <div key={s.id} className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-lg group hover:border-blue-500/30 transition-all cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                      <s.icon className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{s.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{s.frequency}</p>
                      <div className="flex items-center mt-2 space-x-3">
                        <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">Next: {s.nextRun}</span>
                        <span className="text-[10px] text-slate-400 flex items-center"><Users className="h-3 w-3 mr-1" />{s.recipients}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 border border-dashed border-slate-700 rounded-lg text-xs text-slate-500 hover:text-slate-300 hover:border-slate-500 transition-all">+ Schedule New</button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Generation</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Report Type</label>
                <select className="w-full bg-slate-900/80 border border-slate-700/50 text-slate-300 text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500/40 transition-all">
                  <option>Executive Summary</option>
                  <option>Marketing ROI Audit</option>
                  <option>Sales Pipeline Snapshot</option>
                  <option>Financial Health Check</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Timeframe</label>
                <select className="w-full bg-slate-900/80 border border-slate-700/50 text-slate-300 text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500/40 transition-all">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Month to Date</option>
                  <option>Quarter to Date</option>
                </select>
              </div>
              <button className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center">
                <Zap className="h-3.5 w-3.5 mr-2" />
                Generate Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="mt-8 bg-slate-900/30 border border-slate-800/60 rounded-xl p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: 'Total Reports', value: '12', icon: FileText },
            { label: 'Updated This Week', value: '4', icon: Activity },
            { label: 'Avg. Read Time', value: '11 min', icon: Clock },
            { label: 'Last Generated', value: '2h ago', icon: BarChart3 },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-slate-800/60"><stat.icon className="h-4 w-4 text-slate-400" /></div>
              <div><p className="text-xs text-slate-500">{stat.label}</p><p className="text-lg font-semibold text-white">{stat.value}</p></div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
