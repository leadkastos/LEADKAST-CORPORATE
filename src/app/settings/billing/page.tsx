import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { cn } from '@/lib/utils';
import {
  CreditCard, DollarSign, Users, Zap, Check,
  Download, Plus, ChevronRight, Calendar,
  Clock,
} from 'lucide-react';

const currentPlan = {
  name: 'Enterprise', price: '$2,499', period: '/month',
  users: 25, storage: '1TB', support: '24/7 Priority',
  features: ['Unlimited reports and dashboards', 'Custom integrations (API access)', 'Advanced analytics and forecasting', 'Dedicated account manager', 'SSO and role-based access', '99.99% SLA guarantee'],
};

const billingHistory = [
  { date: 'Dec 1, 2025', amount: '$2,499.00', status: 'paid' as const, plan: 'Enterprise - Monthly', invoice: '#INV-2025-1201' },
  { date: 'Nov 1, 2025', amount: '$2,499.00', status: 'paid' as const, plan: 'Enterprise - Monthly', invoice: '#INV-2025-1101' },
  { date: 'Oct 1, 2025', amount: '$2,499.00', status: 'paid' as const, plan: 'Enterprise - Monthly', invoice: '#INV-2025-1001' },
  { date: 'Sep 1, 2025', amount: '$2,499.00', status: 'paid' as const, plan: 'Enterprise - Monthly', invoice: '#INV-2025-0901' },
  { date: 'Aug 1, 2025', amount: '$1,999.00', status: 'paid' as const, plan: 'Professional - Monthly', invoice: '#INV-2025-0801' },
  { date: 'Jul 1, 2025', amount: '$1,999.00', status: 'paid' as const, plan: 'Professional - Monthly', invoice: '#INV-2025-0701' },
];

const statusStyles = {
  paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  failed: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Subscription and Billing</h1>
          </div>
          <p className="text-slate-400 mt-1 text-sm">Manage your plan, billing history, and subscription preferences.</p>
        </div>
        <div className="flex items-center space-x-3 shrink-0">
          <button className="border border-slate-800 text-slate-400 px-4 py-2 rounded-lg text-sm font-medium hover:text-white hover:border-slate-700 bg-slate-900/50 flex items-center"><Download className="h-4 w-4 mr-2" />All Invoices</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center shadow-lg shadow-blue-600/20"><Plus className="h-4 w-4 mr-2" />Add Payment Method</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 sm:p-6 hover:border-slate-700/80">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Active</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-3">{currentPlan.name} Plan</h2>
              <div className="flex items-baseline mt-1">
                <span className="text-3xl font-bold text-white">{currentPlan.price}</span>
                <span className="text-slate-500 ml-1">{currentPlan.period}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Billed monthly / Next billing: Jan 1, 2026</p>
            </div>
            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium border border-blue-500/20 bg-blue-500/5 px-4 py-2 rounded-lg hover:bg-blue-500/10 transition-all">Upgrade Plan</button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: Users, label: 'Users', value: `${currentPlan.users} seats` },
              { icon: Zap, label: 'Storage', value: currentPlan.storage },
              { icon: Clock, label: 'Support', value: currentPlan.support },
            ].map((d) => (
              <div key={d.label} className="bg-slate-800/40 rounded-xl p-3.5">
                <div className="flex items-center space-x-2 mb-1">
                  <d.icon className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-[11px] text-slate-500">{d.label}</span>
                </div>
                <p className="text-sm font-semibold text-white">{d.value}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Plan Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentPlan.features.map((f) => (
                <div key={f} className="flex items-center space-x-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="text-sm text-slate-300">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 sm:p-6 hover:border-slate-700/80">
          <h2 className="text-base font-semibold text-white mb-5">Usage Summary</h2>
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-400">Team Members</span>
                <span className="text-sm font-medium text-white">12 / {currentPlan.users}</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: '48%' }} /></div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-400">Storage Used</span>
                <span className="text-sm font-medium text-white">340 GB / {currentPlan.storage}</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: '34%' }} /></div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-400">API Calls / Month</span>
                <span className="text-sm font-medium text-white">48k / 100k</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 rounded-full" style={{ width: '48%' }} /></div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-400">Reports Generated</span>
                <span className="text-sm font-medium text-white">142 / 500</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-amber-500 rounded-full" style={{ width: '28%' }} /></div>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-800/60">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-slate-500">Total Spent (YTD)</p><p className="text-xl font-bold text-white">$14,994</p></div>
              <div className="text-right"><p className="text-sm text-slate-500">Avg Monthly</p><p className="text-xl font-bold text-white">$2,499</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-5 sm:p-6 hover:border-slate-700/80">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-white">Billing History</h2>
            <p className="text-xs text-slate-500 mt-0.5">Recent invoices and payment records</p>
          </div>
          <button className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center">View All<ChevronRight className="h-3 w-3 ml-0.5" /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800/60">
                <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Invoice</th>
                <th className="text-left py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Plan</th>
                <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Amount</th>
                <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="text-right py-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500"></th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((b) => (
                <tr key={b.invoice} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors">
                  <td className="py-3.5 px-2 text-slate-200">{b.date}</td>
                  <td className="py-3.5 px-2 text-slate-400 font-mono text-xs">{b.invoice}</td>
                  <td className="py-3.5 px-2 text-slate-300">{b.plan}</td>
                  <td className="py-3.5 px-2 text-right text-white font-medium">{b.amount}</td>
                  <td className="py-3.5 px-2 text-right">
                    <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full border", statusStyles[b.status])}>{b.status}</span>
                  </td>
                  <td className="py-3.5 px-2 text-right">
                    <button className="text-slate-500 hover:text-white transition-colors"><Download className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}