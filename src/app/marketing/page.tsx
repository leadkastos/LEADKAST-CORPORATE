'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { cn } from '@/lib/utils';
import {
  TrendingUp, Users, DollarSign, Target,
  BarChart3, Globe, Mail, PieChart,
  ArrowUpRight, ChevronRight, Calendar,
  Download, Plus, Lightbulb, Activity,
  MousePointerClick, MessageSquare, Eye,
} from 'lucide-react';
import { useState } from 'react';

const kpiMetrics = [
  { title: 'Campaign ROI', value: '342%', change: '+28%', trend: 'up' as const, icon: TrendingUp, iconColor: 'text-emerald-400', subtitle: 'vs 314% last quarter', sparkline: [60,65,62,70,75,72,78,82,80,85,88,92] },
  { title: 'Customer CAC', value: '$1,240', change: '-12%', trend: 'up' as const, icon: DollarSign, iconColor: 'text-blue-400', subtitle: 'Down from $1,410 — efficient', sparkline: [80,78,75,72,70,68,65,62,60,58,55,52] },
  { title: 'Marketing MQLs', value: '2,847', change: '+18.5%', trend: 'up' as const, icon: Users, iconColor: 'text-indigo-400', subtitle: '512 this month / 22% SQL conv', sparkline: [40,45,48,52,50,55,58,62,65,68,72,78] },
  { title: 'Conversion Rate', value: '5.8%', change: '+0.6%', trend: 'up' as const, icon: Target, iconColor: 'text-violet-400', subtitle: 'Above industry avg of 3.2%', sparkline: [55,52,58,54,60,56,62,58,64,60,66,62] },
];

const campaignData = [
  { name: 'Q4 Brand Awareness', channel: 'Display + Social', spend: 45, impressions: 1240, clicks: 28.4, conversions: 2.1, revenue: 186, roi: 413, status: 'active' as const },
  { name: 'Holiday Promo 2025', channel: 'Email + Search', spend: 32, impressions: 680, clicks: 18.2, conversions: 3.8, revenue: 158, roi: 494, status: 'active' as const },
  { name: 'Enterprise Lead Gen', channel: 'LinkedIn', spend: 28, impressions: 420, clicks: 8.6, conversions: 1.2, revenue: 96, roi: 343, status: 'active' as const },
  { name: 'Content Syndication', channel: 'Partner Network', spend: 18, impressions: 890, clicks: 12.4, conversions: 0.9, revenue: 52, roi: 289, status: 'paused' as const },
  { name: 'Retargeting Campaign', channel: 'Display', spend: 12, impressions: 520, clicks: 6.8, conversions: 1.5, revenue: 42, roi: 350, status: 'active' as const },
  { name: 'Q3 Brand Campaign', channel: 'Social + Video', spend: 38, impressions: 1500, clicks: 32.1, conversions: 2.4, revenue: 172, roi: 453, status: 'ended' as const },
];

const statusStyles = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  paused: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  ended: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

const channelMetrics = [
  { name: 'Organic Search', mqls: 980, cac: 680, conv: '6.2%', roi: '420%', change: '+18%', color: 'bg-blue-500' },
  { name: 'Paid Search', mqls: 720, cac: 1280, conv: '4.8%', roi: '310%', change: '+8%', color: 'bg-indigo-500' },
  { name: 'Social Media', mqls: 540, cac: 920, conv: '5.1%', roi: '365%', change: '+22%', color: 'bg-violet-500' },
  { name: 'Email Marketing', mqls: 380, cac: 450, conv: '8.4%', roi: '580%', change: '+12%', color: 'bg-emerald-500' },
  { name: 'Paid Social', mqls: 227, cac: 1560, conv: '3.2%', roi: '245%', change: '-5%', color: 'bg-rose-500' },
];

const topContent = [
  { title: 'Enterprise SaaS Buyer\'s Guide 2025', type: 'Ebook', views: 12400, leads: 342, conv: '2.8%' },
  { title: 'ROI Calculator: Marketing Automation', type: 'Tool', views: 9800, leads: 521, conv: '5.3%' },
  { title: 'The State of B2B Marketing Q4', type: 'Report', views: 15200, leads: 428, conv: '2.8%' },
  { title: 'Webinar: Scaling Customer Acquisition', type: 'Webinar', views: 6800, leads: 215, conv: '3.2%' },
];

const monthlyData = [
  { month: 'Jul', spend: 28, revenue: 94 },
  { month: 'Aug', spend: 32, revenue: 105 },
  { month: 'Sep', spend: 30, revenue: 112 },
  { month: 'Oct', spend: 35, revenue: 128 },
  { month: 'Nov', spend: 38, revenue: 145 },
  { month: 'Dec', spend: 42, revenue: 162 },
];

export default function MarketingPage() {
  const [sortField, setSortField] = useState<string>('roi');
  const [sortAsc, setSortAsc] = useState(false);

  const sortedCampaigns = [...campaignData].sort((a, b) => {
    const val = a[sortField as keyof typeof a] as number;
    const valB = b[sortField as keyof typeof b] as number;
    return sortAsc ? val - valB : valB - val;
  });

  return (
    <DashboardLayout>
      {/* ══════ HEADER ══════ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <TrendingUp className="h-6 w-6 text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Marketing Intelligence</h1>
          </div>
          <p className="text-slate-400 text-sm">Executive-level marketing KPIs, campaign performance, and channel analytics.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="border border-slate-700/80 text-slate-400 px-4 py-2.5 rounded-xl text-sm font-medium hover:text-white hover:border-slate-600 transition-all bg-slate-800/40 flex items-center gap-2"><Calendar className="h-4 w-4" />This Quarter<ChevronRight className="h-3 w-3 -rotate-90" /></button>
          <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2"><Download className="h-4 w-4" />Export</button>
        </div>
      </div>

      {/* ══════ KPI STRIP ══════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6">
        {kpiMetrics.map((m) => <KpiCard key={m.title} {...m} />)}
      </div>

      {/* ══════ MAIN GRID ══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Budget vs Revenue Chart */}
        <div className="lg:col-span-7 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5 sm:p-6 hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-blue-400" /><h2 className="text-lg font-semibold text-white">Marketing Performance</h2></div>
              <p className="text-xs text-slate-500 mt-0.5">Spend vs revenue attribution — last 6 months</p>
            </div>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">4.2x avg ROAS</span>
          </div>
          <div className="relative">
            <div className="absolute -left-1 top-0 bottom-6 flex flex-col justify-between text-[10px] text-slate-600 font-medium">
              {['$200k','$150k','$100k','$50k','$0'].map(l => <span key={l}>{l}</span>)}
            </div>
            <div className="h-64 ml-12 pl-1">
              <div className="relative h-full">
                {[0,1,2,3,4].map(i => <div key={i} className="absolute left-0 right-0 border-t border-slate-800/30" style={{ top: `${i*25}%` }} />)}
                <div className="absolute inset-0 bottom-0 flex items-end gap-3">
                  {monthlyData.map((m, i) => (
                    <div key={m.month} className="flex-1 flex flex-col items-center justify-end h-[92%]">
                      {/* Revenue bar */}
                      <div className="w-full bg-emerald-500/20 rounded-t-sm relative group/bar mb-0.5" style={{ height: `${(m.revenue/200)*85}%` }}>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm transition-all duration-500 group-hover/bar:from-emerald-500" style={{ height: '100%' }} />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 whitespace-nowrap shadow-xl z-10 border border-slate-700/50">Rev: ${m.revenue}k</div>
                      </div>
                      {/* Spend bar */}
                      <div className="w-full bg-blue-500/20 rounded-t-sm relative group/bar" style={{ height: `${(m.spend/200)*85}%` }}>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm transition-all duration-500 group-hover/bar:from-blue-500" style={{ height: '100%' }} />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 whitespace-nowrap shadow-xl z-10 border border-slate-700/50">Spend: ${m.spend}k</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex ml-12 mt-3">{monthlyData.map(m => <div key={m.month} className="flex-1 text-center"><span className="text-[10px] text-slate-600 font-medium">{m.month}</span></div>)}</div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-800/50">
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /><span className="text-[11px] text-slate-500">Revenue</span></div>
            <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-sm bg-blue-500" /><span className="text-[11px] text-slate-500">Spend</span></div>
            <span className="text-[11px] font-medium text-emerald-400 ml-auto">Revenue up 72% vs spend up 50%</span>
          </div>
        </div>

        {/* Channel Performance */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5 sm:p-6 hover:border-slate-700/80 transition-all">
          <div className="flex items-center gap-2 mb-4"><Globe className="h-5 w-5 text-indigo-400" /><h2 className="text-lg font-semibold text-white">Channel Performance</h2></div>
          <p className="text-xs text-slate-500 mb-5">MQLs, CAC, and ROI by acquisition channel</p>
          <div className="space-y-4">
            {channelMetrics.map((ch) => (
              <div key={ch.name} className="group p-3 rounded-xl border border-slate-800/40 hover:bg-slate-800/30 hover:border-slate-700/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-2.5 w-2.5 rounded-full", ch.color)} />
                    <span className="text-sm font-medium text-slate-200">{ch.name}</span>
                  </div>
                  <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full", ch.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400')}>{ch.change}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div><p className="text-xs font-semibold text-white">{ch.mqls}</p><p className="text-[9px] text-slate-600">MQLs</p></div>
                  <div><p className="text-xs font-semibold text-white">${ch.cac}</p><p className="text-[9px] text-slate-600">CAC</p></div>
                  <div><p className="text-xs font-semibold text-white">{ch.conv}</p><p className="text-[9px] text-slate-600">Conv</p></div>
                  <div><p className="text-xs font-semibold text-emerald-400">{ch.roi}</p><p className="text-[9px] text-slate-600">ROI</p></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-500"><span className="text-amber-400 font-medium">Recommendation:</span> Increase email marketing budget — lowest CAC ($450) with highest ROI (580%).</p>
          </div>
        </div>
      </div>

      {/* ══════ CAMPAIGN TABLE ══════ */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5 sm:p-6 hover:border-slate-700/80 transition-all mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2"><Activity className="h-5 w-5 text-emerald-400" /><h2 className="text-lg font-semibold text-white">Active Campaigns</h2></div>
            <p className="text-xs text-slate-500 mt-0.5">Click column headers to sort — 6 campaigns tracked</p>
          </div>
          <button className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 bg-blue-500/5 px-3 py-1.5 rounded-lg border border-blue-500/20 hover:bg-blue-500/10"><Plus className="h-3 w-3" />New Campaign</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800/60">
                {['Campaign', 'Channel', 'Spend', 'Impressions', 'Clicks', 'Conv Rate', 'Revenue', 'ROI', 'Status'].map((h) => (
                  <th key={h} className="text-left py-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 cursor-pointer hover:text-slate-300 transition-colors whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedCampaigns.map((c, i) => (
                <tr key={c.name} className={cn("border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors cursor-pointer", i === campaignData.length - 1 && "border-b-0")}>
                  <td className="py-3.5 px-2 text-slate-200 font-medium whitespace-nowrap">{c.name}</td>
                  <td className="py-3.5 px-2 text-slate-400 text-xs">{c.channel}</td>
                  <td className="py-3.5 px-2 text-slate-200">${c.spend}k</td>
                  <td className="py-3.5 px-2 text-slate-200">{c.impressions}K</td>
                  <td className="py-3.5 px-2 text-slate-200">{c.clicks}K</td>
                  <td className="py-3.5 px-2 text-slate-200">{c.conversions}%</td>
                  <td className="py-3.5 px-2 text-slate-200 font-medium">${c.revenue}k</td>
                  <td className="py-3.5 px-2"><span className="text-emerald-400 font-medium">{c.roi}%</span></td>
                  <td className="py-3.5 px-2"><span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", statusStyles[c.status])}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════ CONTENT + QUICK STATS ══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Content */}
        <div className="lg:col-span-7 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5 sm:p-6 hover:border-slate-700/80 transition-all">
          <div className="flex items-center gap-2 mb-5"><MessageSquare className="h-5 w-5 text-violet-400" /><h2 className="text-lg font-semibold text-white">Top Performing Content</h2></div>
          <div className="space-y-3">
            {topContent.map((item, i) => (
              <div key={item.title} className="flex items-center gap-4 p-3 rounded-xl border border-slate-800/40 hover:bg-slate-800/30 hover:border-slate-700/50 transition-all cursor-pointer group">
                <div className="h-10 w-10 rounded-xl bg-slate-800/60 ring-1 ring-slate-700/50 flex items-center justify-center text-slate-500 text-sm font-bold shrink-0">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors truncate">{item.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-slate-600 bg-slate-800/60 px-2 py-0.5 rounded-full">{item.type}</span>
                    <span className="text-xs text-slate-500"><Eye className="h-3 w-3 inline mr-0.5" />{item.views.toLocaleString()} views</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-white">{item.leads}</p>
                  <p className="text-[10px] text-slate-500">leads</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-emerald-400">{item.conv}</p>
                  <p className="text-[10px] text-slate-500">conv</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-5 space-y-4">
          {[
            { icon: MousePointerClick, label: 'Click-Through Rate', value: '3.8%', change: '+0.4%', sub: 'vs 3.4% last month', color: 'text-blue-400' },
            { icon: Eye, label: 'Total Impressions', value: '5.2M', change: '+22%', sub: '3.1M organic / 2.1M paid', color: 'text-indigo-400' },
            { icon: Mail, label: 'Email Open Rate', value: '24.6%', change: '+2.1%', sub: 'Above industry avg of 18%', color: 'text-emerald-400' },
            { icon: DollarSign, label: 'Cost per Lead', value: '$184', change: '-$22', sub: 'vs $206 last quarter', color: 'text-amber-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-xl p-4 flex items-center justify-between group hover:border-slate-700/80 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg bg-slate-800/60 ring-1 ring-slate-700/50", stat.color)}><stat.icon className="h-4 w-4" /></div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">{stat.label}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] text-slate-600">{stat.sub}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-400">{stat.change}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}