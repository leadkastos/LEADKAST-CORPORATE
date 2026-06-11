'use client';

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, Zap, BarChart3, 
  Activity, Calendar, Clock, 
  Mail, MousePointer2, Link as LinkIcon,
  ShieldCheck, Share2, Rocket
} from 'lucide-react';

const engagementTrend = [
  { day: 'Mon', logins: 4, opens: 3 },
  { day: 'Tue', logins: 6, opens: 5 },
  { day: 'Wed', logins: 3, opens: 4 },
  { day: 'Thu', logins: 8, opens: 7 },
  { day: 'Fri', logins: 5, opens: 6 },
  { day: 'Sat', logins: 2, opens: 1 },
  { day: 'Sun', logins: 1, opens: 2 },
];

export default function GrowthPage() {
  const { kpis, loading, logEngagement } = useAnalytics();

  useEffect(() => {
    logEngagement('dashboard_login', { page: 'growth' });
  }, []);

  const healthScore = kpis ? Math.round((kpis.connectednessScore * 10 + kpis.alertActionRate) / 2) : 0;

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Growth Analytics</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Executive engagement and business health metrics.</p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <button className="border border-slate-800 text-slate-400 px-4 py-2 rounded-lg text-sm font-medium hover:text-white hover:border-slate-700 transition-all bg-slate-900/50 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Last 7 Days
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <KpiCard 
          title="Business Health Score" 
          value={loading ? "..." : `${healthScore}/100`} 
          change={loading ? "" : "+2pts"} 
          trend="up" 
          icon={Zap} 
          iconColor="text-amber-400" 
          subtitle="Based on integrations & alerts"
          sparkline={[75, 78, 82, 80, 85, 88, healthScore || 85]}
        />
        <KpiCard 
          title="Connectedness Score" 
          value={loading ? "..." : `${kpis?.connectednessScore || 0}`} 
          change={loading ? "" : "Active"} 
          trend="neutral" 
          icon={ShieldCheck} 
          iconColor="text-blue-400" 
          subtitle="Total active integrations"
          sparkline={[2, 2, 3, 3, 3, 4, kpis?.connectednessScore || 4]}
        />
        <KpiCard 
          title="Alert Action Rate" 
          value={loading ? "..." : `${Math.round(kpis?.alertActionRate || 0)}%`} 
          change={loading ? "" : "+5%"} 
          trend="up" 
          icon={Activity} 
          iconColor="text-emerald-400" 
          subtitle="Percentage of alerts resolved"
          sparkline={[60, 65, 70, 68, 75, 72, kpis?.alertActionRate || 75]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Executive Engagement Chart */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white flex items-center">
                <MousePointer2 className="h-5 w-5 mr-2 text-blue-400" />
                Executive Engagement
              </h2>
              <p className="text-xs text-slate-500 mt-1">Dashboard logins and Morning Brief opens</p>
            </div>
          </div>
          
          <div className="h-64 flex items-end space-x-2 group">
            {engagementTrend.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col justify-end space-y-1">
                <div className="relative group/bar">
                  <div 
                    className="w-full bg-blue-500/20 rounded-t-sm transition-all duration-300 group-hover/bar:bg-blue-500/40" 
                    style={{ height: `${item.logins * 20}px` }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-sm" style={{ height: '2px' }} />
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 whitespace-nowrap z-10">
                    Logins: {item.logins}
                  </div>
                </div>
                <div className="relative group/bar2">
                  <div 
                    className="w-full bg-emerald-500/20 rounded-t-sm transition-all duration-300 group-hover/bar2:bg-emerald-500/40" 
                    style={{ height: `${item.opens * 20}px` }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-t-sm" style={{ height: '2px' }} />
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar2:opacity-100 whitespace-nowrap z-10">
                    Opens: {item.opens}
                  </div>
                </div>
                <span className="text-[10px] text-slate-600 text-center mt-2 font-medium uppercase">{item.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-slate-800/60">
            <div className="flex items-center space-x-1.5">
              <div className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
              <span className="text-[11px] text-slate-500">Dashboard Logins</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
              <span className="text-[11px] text-slate-500">Morning Brief Opens</span>
            </div>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-6">
            <h3 className="text-white font-medium mb-4 flex items-center">
              <Rocket className="h-4 w-4 mr-2 text-indigo-400" />
              Engagement Breakdown
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-500/10"><Activity className="h-4 w-4 text-blue-400" /></div>
                  <div>
                    <p className="text-sm text-slate-300 font-medium">Dashboard Logins</p>
                    <p className="text-xs text-slate-500">Total sessions this week</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-white">{kpis?.dashboardLogins || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10"><Mail className="h-4 w-4 text-emerald-400" /></div>
                  <div>
                    <p className="text-sm text-slate-300 font-medium">Morning Brief Opens</p>
                    <p className="text-xs text-slate-500">Emails viewed this week</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-white">{kpis?.morningBriefOpens || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10"><BarChart3 className="h-4 w-4 text-indigo-400" /></div>
                  <div>
                    <p className="text-sm text-slate-300 font-medium">Report Downloads</p>
                    <p className="text-xs text-slate-500">PDFs generated</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-white">4</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-white font-medium mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-blue-400" />
              Intelligence Tip
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your engagement is up <span className="text-emerald-400 font-bold">12%</span> compared to last week. 
              Reviewing your Morning Brief consistently correlates with a 15% faster lead response time.
            </p>
            <button className="mt-4 text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center">
              View Insights Guide <ChevronRight className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
