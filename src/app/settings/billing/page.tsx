'use client';
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PLANS } from '@/lib/plans';
import type { SubscriptionTier } from '@/lib/plans';
import { cn } from '@/lib/utils';
import {
  Loader2,
  CreditCard,
  Check,
  X,
  ArrowUpRight,
  Sparkles,
  Users,
  BarChart3,
  HeadphonesIcon,
  Download,
  ChevronRight,
  Clock,
  DollarSign,
  Zap,
  Shield,
  TrendingUp,
  Activity,
  Radio,
  RefreshCw,
  CircleCheck,
  AlertCircle,
  FileText,
  Link as LinkIcon,
} from 'lucide-react';

const billingHistory = [
  { date: 'Jun 1, 2026', amount: '$149.00', status: 'paid' as const, plan: 'Business - Monthly', invoice: '#INV-2026-0601' },
  { date: 'May 1, 2026', amount: '$149.00', status: 'paid' as const, plan: 'Business - Monthly', invoice: '#INV-2026-0501' },
  { date: 'Apr 1, 2026', amount: '$149.00', status: 'paid' as const, plan: 'Business - Monthly', invoice: '#INV-2026-0401' },
  { date: 'Mar 1, 2026', amount: '$49.00', status: 'paid' as const, plan: 'Pro - Monthly', invoice: '#INV-2026-0301' },
  { date: 'Feb 1, 2026', amount: '$49.00', status: 'paid' as const, plan: 'Pro - Monthly', invoice: '#INV-2026-0201' },
];

const statusStyles = {
  paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  failed: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};
const statusIcons = {
  paid: CircleCheck,
  pending: Clock,
  failed: AlertCircle,
};

const usageMetrics = [
  { label: 'Leads Processed', used: 847, limit: 1000, unit: 'leads', icon: Users, color: 'text-blue-400' },
  { label: 'Active Integrations', used: 3, limit: 20, unit: 'connections', icon: LinkIcon, color: 'text-emerald-400' },
  { label: 'Team Members', used: 3, limit: 10, unit: 'users', icon: Users, color: 'text-indigo-400' },
  { label: 'AI Reports', used: 8, limit: -1, unit: 'generated', icon: BarChart3, color: 'text-violet-400' },
];

export default function BillingPage() {
  const [tier, setTier] = useState<SubscriptionTier>('business');
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('month');

  const handleUpgrade = (planTier: SubscriptionTier) => {
    setLoading(true);
    setTimeout(() => {
      setTier(planTier);
      setLoading(false);
    }, 1200);
  };

  const currentPlan = PLANS[tier];
  const planOrder: SubscriptionTier[] = ['free', 'pro', 'business', 'enterprise'];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <CreditCard className="h-6 w-6 text-blue-400" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Billing & Subscription</h1>
            </div>
            <p className="text-slate-400 text-sm">Manage your plan, usage, and billing history.</p>
          </div>
        </div>

        {/* Current Plan + Usage Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Plan Summary */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border text-emerald-400 bg-emerald-500/10 border-emerald-500/20">Active</span>
                  <span className="text-[10px] text-slate-600">Since Jan 2026</span>
                </div>
                <h2 className="text-xl font-bold text-white">{currentPlan.name} Plan</h2>
                <div className="flex items-baseline mt-1">
                  <span className="text-3xl font-bold text-white">
                    {currentPlan.monthlyPrice > 0
                      ? billingCycle === 'month'
                        ? `$${currentPlan.monthlyPrice}`
                        : `$${(currentPlan.annualPrice / 12).toFixed(0)}`
                      : 'Custom'}
                  </span>
                  {currentPlan.monthlyPrice > 0 && (
                    <span className="text-slate-500 ml-1.5 text-sm">/month</span>
                  )}
                  {billingCycle === 'year' && currentPlan.annualPrice > 0 && (
                    <span className="ml-3 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ${currentPlan.annualPrice}/yr — Save 17%
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  Next billing: July 1, 2026
                </p>
              </div>
              <button
                onClick={() => document.getElementById('plans-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm text-blue-400 hover:text-blue-300 font-medium border border-blue-500/20 bg-blue-500/5 px-4 py-2 rounded-xl hover:bg-blue-500/10 transition-all flex items-center gap-1.5 shrink-0"
              >
                Change Plan <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Quick Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-5 border-t border-slate-800/40">
              {[
                { icon: Shield, label: 'Security', value: 'Enterprise-grade' },
                { icon: Activity, label: 'Uptime SLA', value: '99.99%' },
                { icon: Radio, label: 'Sync Frequency', value: 'Real-time' },
                { icon: HeadphonesIcon, label: 'Support', value: currentPlan.prioritySupport ? '24/7 Priority' : 'Standard' },
              ].map((s) => (
                <div key={s.label} className="text-center p-3 rounded-xl bg-slate-800/30 border border-slate-800/40">
                  <s.icon className="h-4 w-4 text-blue-400 mx-auto mb-1.5" />
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</p>
                  <p className="text-xs font-semibold text-white mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-blue-400" /> Payment Method
            </h3>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800/50">
              <div className="h-10 w-14 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-[9px] font-black text-white tracking-wider">VISA</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">Visa ending in 4242</p>
                <p className="text-xs text-slate-500">Expires 12/27</p>
              </div>
              <button className="text-xs text-blue-400 hover:text-blue-300 font-medium shrink-0">Update</button>
            </div>
            <button className="mt-3 w-full text-xs text-slate-500 hover:text-white py-2 rounded-lg border border-dashed border-slate-700/50 hover:border-slate-600 transition-all">
              + Add Payment Method
            </button>
          </div>
        </div>

        {/* Usage Visualizations */}
        <div>
          <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-400" /> Current Usage
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {usageMetrics.map((m) => {
              const Icon = m.icon;
              const pct = m.limit > 0 ? Math.min(Math.round((m.used / m.limit) * 100), 100) : 100;
              const isNearLimit = m.limit > 0 && pct >= 80;
              return (
                <div key={m.label} className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className={cn("h-4 w-4", m.color)} />
                      <span className="text-xs text-slate-400 font-medium">{m.label}</span>
                    </div>
                    {m.limit > 0 && (
                      <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", isNearLimit ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20')}>
                        {isNearLimit ? `${100 - pct}% remaining` : `${m.used} / ${m.limit}`}
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-bold text-white">{m.used.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-600">{m.unit}</p>
                  </div>
                  {m.limit > 0 && (
                    <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", isNearLimit ? 'bg-amber-500' : 'bg-blue-500')}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}
                  {m.limit < 0 && (
                    <div className="mt-3 flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-medium">Unlimited</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Billing Cycle Toggle + Plans Grid */}
        <div id="plans-grid" className="pt-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Choose Your Tier</h2>
            <p className="text-slate-400 mt-2 text-sm">Scale your intelligence as your business grows.</p>
            {/* Billing Cycle Toggle */}
            <div className="flex items-center justify-center mt-5">
              <div className="inline-flex bg-slate-900 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setBillingCycle('month')}
                  className={cn("px-4 py-2 text-sm font-medium rounded-lg transition-all", billingCycle === 'month' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white')}
                >Monthly</button>
                <button
                  onClick={() => setBillingCycle('year')}
                  className={cn("px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5", billingCycle === 'year' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white')}
                >Annual <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Save 17%</span></button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {planOrder.map((planId) => {
              const plan = PLANS[planId];
              const isCurrent = tier === planId;
              const price = billingCycle === 'month' ? plan.monthlyPrice : plan.annualPrice;
              const isPopular = planId === 'business';
              return (
                <div
                  key={planId}
                  className={cn(
                    "relative rounded-2xl border p-6 transition-all flex flex-col group hover:-translate-y-0.5 duration-200",
                    isCurrent
                      ? 'bg-blue-600/5 border-blue-500/50 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/20'
                      : isPopular && !isCurrent
                        ? 'bg-slate-900/60 border-indigo-500/40 hover:border-indigo-500/60 shadow-md shadow-indigo-500/5'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  )}
                >
                  {/* Labels */}
                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-lg shadow-blue-600/30 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Active Plan
                    </div>
                  )}
                  {isPopular && !isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-lg shadow-indigo-500/30">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6 pt-1">
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{plan.description}</p>
                    <div className="mt-4 flex items-baseline">
                      {plan.monthlyPrice > 0 ? (
                        <>
                          <span className="text-3xl font-bold text-white">${billingCycle === 'month' ? plan.monthlyPrice : plan.annualPrice}</span>
                          <span className="text-slate-500 text-sm ml-1">/{billingCycle === 'month' ? 'mo' : 'yr'}</span>
                          {billingCycle === 'month' && plan.annualPrice > 0 && (
                            <span className="ml-2 text-[10px] text-slate-600 line-through">${plan.annualPrice}/yr</span>
                          )}
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-white">{planId === 'free' ? '$0' : 'Custom'}</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature.key} className="flex items-start space-x-3">
                        <Check className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{feature.label}</span>
                          <p className="text-[10px] text-slate-600">{feature.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleUpgrade(planId)}
                    disabled={isCurrent || loading}
                    className={cn(
                      "w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2",
                      isCurrent
                        ? "bg-slate-800 text-slate-500 cursor-default"
                        : planId === 'enterprise'
                          ? "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
                          : "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/20 hover:from-blue-500 hover:to-blue-400"
                    )}
                  >
                    {isCurrent ? (
                      <><Check className="h-4 w-4" /> Active</>
                    ) : loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : planId === 'enterprise' ? (
                      'Contact Sales'
                    ) : (
                      'Upgrade'
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-800/60 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" /> Billing History
            </h3>
            <button className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1">
              <Download className="h-3.5 w-3.5" /> Download All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="border-b border-slate-800/60">
                <tr>
                  <th className="px-6 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Invoice</th>
                  <th className="px-6 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Plan</th>
                  <th className="px-6 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-3 text-right"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {billingHistory.map((invoice, i) => {
                  const StatusIcon = statusIcons[invoice.status];
                  return (
                    <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                      <td className="px-6 py-4 text-sm font-medium text-slate-300">{invoice.invoice}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{invoice.date}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{invoice.plan}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">{invoice.amount}</td>
                      <td className="px-6 py-4">
                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-flex items-center gap-1", statusStyles[invoice.status])}>
                          <StatusIcon className="h-3 w-3" />
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50">
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-800/60 flex items-center justify-between">
            <span className="text-xs text-slate-600">Showing 5 of 12 invoices</span>
            <button className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
              View All <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
