import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Zap,
  ArrowUpRight,
  Plus
} from 'lucide-react';

export default function Home() {
  const { profile } = useAuth();

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Executive Overview</h1>
          <p className="text-slate-400 mt-1">Welcome back, {profile?.full_name?.split(' ')[0] || 'Executive'}. Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            Download Report
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard 
          title="Total Revenue" 
          value="$128,430" 
          change="+12.5%" 
          trend="up" 
          icon={DollarSign} 
          iconColor="text-emerald-400"
        />
        <KpiCard 
          title="Active Customers" 
          value="1,240" 
          change="+3.2%" 
          trend="up" 
          icon={Users} 
          iconColor="text-blue-400"
        />
        <KpiCard 
          title="Conversion Rate" 
          value="4.8%" 
          change="-0.4%" 
          trend="down" 
          icon={TrendingUp} 
          iconColor="text-indigo-400"
        />
        <KpiCard 
          title="Business Health" 
          value="94/100" 
          change="Stable" 
          trend="neutral" 
          icon={Zap} 
          iconColor="text-amber-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Revenue Growth</h2>
            <select className="bg-slate-800 border-none text-slate-400 text-xs rounded-md px-2 py-1 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64 flex items-end space-x-2 px-2">
            {[40, 60, 45, 90, 65, 80, 55, 70, 85, 60, 75, 95].map((height, i) => (
              <div key={i} className="flex-1 bg-blue-500/20 rounded-t-sm relative group">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-t-sm transition-all duration-500 group-hover:bg-blue-400" 
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Executive Alerts</h2>
          <div className="space-y-4">
            {[
              { title: 'Ad spend spike detected', time: '2h ago', type: 'warning' },
              { title: 'New high-value customer', time: '4h ago', type: 'success' },
              { title: 'CRM integration sync error', time: '6h ago', type: 'error' },
              { title: 'Weekly target reached', time: '1d ago', type: 'success' },
            ].map((alert, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer group">
                <div className={cn(
                  "mt-1 h-2 w-2 rounded-full",
                  alert.type === 'warning' ? "bg-amber-500" :
                  alert.type === 'success' ? "bg-emerald-500" :
                  "bg-rose-500"
                )}></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-300 group-hover:text-white transition-colors">{alert.title}</p>
                  <p className="text-xs text-slate-500">{alert.time}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium">
            View All Alerts
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
