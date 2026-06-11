import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { cn } from '@/lib/utils';
import {
  Search, Download, Filter, Calendar, FileText,
  BarChart3, TrendingUp, Users, DollarSign,
  ChevronRight, ExternalLink, Clock, Eye, ArrowUpRight,
  PieChart, Activity,
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
  { id: 5, title: 'Revenue by Product Line', category: 'revenue', description: 'Revenue performance across all product lines and tiers.', date: 'Nov 30, 2025', pages: 14, readTime: '18 min', status: 'updated' as const, trend: 'up' as const, value: '+9.8%', chart: [38,45,42,55,50,65] },
  { id: 6, title: 'Churn Risk Assessment', category: 'customers', description: 'Churn indicators, at-risk accounts, retention strategies.', date: 'Nov 22, 2025', pages: 8, readTime: '10 min', status: 'new' as const, trend: 'down' as const, value: '-2.1%', chart: [70,65,68,60,55,50] },
  { id: 7, title: 'Ad Spend ROI Analysis', category: 'marketing', description: 'Return on ad spend across Google, LinkedIn, and Meta.', date: 'Nov 27, 2025', pages: 10, readTime: '12 min', status: 'updated' as const, trend: 'up' as const, value: '+22.3%', chart: [25,32,40,35,48,55] },
  { id: 8, title: 'Operational Efficiency Report', category: 'operations', description: 'Process metrics, resource allocation, automation ROI.', date: 'Nov 20, 2025', pages: 6, readTime: '7 min', status: 'archived' as const, trend: 'neutral' as const, value: '+3.0%', chart: [55,58,55,60,62,65] },
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
          <button className="border border-slate-800 text-slate-400 px-4 py-2 rounded-lg text-sm font-medium hover:text-white hover:border-slate-700 transition-all bg-slate-900/50 flex items-center"><Calendar className="h-4 w-4 mr-2" />Dec 2025</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all flex items-center shadow-lg shadow-blue-600/20"><Download className="h-4 w-4 mr-2" />Export All</button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input type="text" placeholder="Search reports by title, category..." className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all" />
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-slate-700/50 bg-slate-800/60 text-slate-400 text-sm hover:text-white hover:border-slate-600 transition-all"><Filter className="h-4 w-4" /><span>Filters</span></button>
            <select className="bg-slate-800/60 border border-slate-700/50 text-slate-400 text-sm rounded-lg px-3 py-2 outline-none hover:border-slate-600 cursor-pointer"><option>All Time</option><option>Last 30 Days</option><option>Last Quarter</option><option>Year to Date</option></select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
        {reportCategories.map((cat) => (
          <button key={cat.id} className={cn("flex items-center space-x-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all whitespace-nowrap shrink-0", cat.id === 'all' ? 'bg-blue-600/20 border-blue-500/30 text-blue-300' : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700')}>
            <cat.icon className="h-4 w-4" />
            <span>{cat.label}</span>
            <span className={cn("text-[11px] px-1.5 py-0.5 rounded-full", cat.id === 'all' ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-500')}>{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
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
                  {report.status === 'new' ? 'New' : report.status === 'updated' ? 'Updated' : 'Archived'}
                </span>
                <div className="flex items-center space-x-1 text-[11px] text-slate-500"><Clock className="h-3 w-3" /><span>{report.readTime}</span></div>
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors mb-1">{report.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">{report.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                <div className="flex items-center space-x-3 text-xs text-slate-500">
                  <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" />{report.date}</span>
                  <span className="flex items-center"><FileText className="h-3 w-3 mr-1" />{report.pages}p</span>
                </div>
                <span className={cn("text-xs font-semibold", report.trend === 'up' ? 'text-emerald-400' : report.trend === 'down' ? 'text-rose-400' : 'text-slate-400')}>{report.value}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex -space-x-1">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 border border-slate-800 flex items-center justify-center"><Eye className="h-3 w-3 text-blue-400" /></div>
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 border border-slate-800 flex items-center justify-center"><Download className="h-3 w-3 text-emerald-400" /></div>
                  <div className="h-6 w-6 rounded-full bg-indigo-500/20 border border-slate-800 flex items-center justify-center"><ExternalLink className="h-3 w-3 text-indigo-400" /></div>
                </div>
                <button className="flex items-center text-xs font-medium text-blue-400 hover:text-blue-300 group/btn">View Report<ChevronRight className="h-3.5 w-3.5 ml-0.5 transition-transform group-hover/btn:translate-x-0.5" /></button>
              </div>
            </div>
          </div>
        ))}
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