
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
  Link as LinkIcon,
  BarChart3,
  Palette,
  HeadphonesIcon,
  Code2,
  Zap,
  Layers,
  Download,
  Plus,
  ChevronRight,
  Clock,
  DollarSign,
} from 'lucide-react';

const billingHistory = [
  { date: 'Jun 1, 2026', amount: '$149.00', status: 'paid' as const, plan: 'Business - Monthly', invoice: '#INV-2026-0601' },
  { date: 'May 1, 2026', amount: '$149.00', status: 'paid' as const, plan: 'Business - Monthly', invoice: '#INV-2026-0501' },
  { date: 'Apr 1, 2026', amount: '$149.00', status: 'paid' as const, plan: 'Business - Monthly', invoice: '#INV-2026-0401' },
];

const statusStyles = {
  paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  failed: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export default function BillingPage() {
  const [tier, setTier] = useState<SubscriptionTier>('business');
  const [loading, setLoading] = useState(false);

  const handleUpgrade = (planTier: SubscriptionTier) => {
    setLoading(true);
    setTimeout(() => {
      setTier(planTier);
      setLoading(false);
    }, 1000);
  };

  const currentPlan = PLANS[tier];
  const planOrder: SubscriptionTier[] = ['free', 'pro', 'business', 'enterprise'];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-blue-400" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Billing & Subscription</h1>
            </div>
            <p className="text-slate-400 mt-1 text-sm">Manage your plan and billing history (Preview Mode).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Plan Summary Card */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full border text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
                    Active
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-3">{currentPlan.name} Plan</h2>
                <div className="flex items-baseline mt-1">
                  <span className="text-3xl font-bold text-white">
                    {currentPlan.monthlyPrice > 0 ? `$${currentPlan.monthlyPrice}` : 'Custom'}
                  </span>
                  {currentPlan.monthlyPrice > 0 && <span className="text-slate-500 ml-1">/month</span>}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Next billing: July 1, 2026
                </p>
              </div>
              <button 
                onClick={() => document.getElementById('plans-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm text-blue-400 hover:text-blue-300 font-medium border border-blue-500/20 bg-blue-500/5 px-4 py-2 rounded-lg hover:bg-blue-500/10 transition-all"
              >
                Change Plan
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { icon: Users, label: 'Users', value: currentPlan.maxUsers === -1 ? 'Unlimited' : `${currentPlan.maxUsers} seats` },
                { icon: LinkIcon, label: 'Integrations', value: currentPlan.maxIntegrations === -1 ? 'Unlimited' : currentPlan.maxIntegrations },
                { icon: Clock, label: 'Support', value: currentPlan.prioritySupport ? '24/7 Priority' : 'Standard' },
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
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Included Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentPlan.features.slice(0, 6).map((f) => (
                  <div key={f.key} className="flex items-center space-x-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span className="text-sm text-slate-300">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Usage Summary Card */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-white mb-5">Platform Usage</h2>
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-400">Active Seats</span>
                  <span className="text-sm font-medium text-white">4 / {currentPlan.maxUsers === -1 ? '∞' : currentPlan.maxUsers}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all" 
                    style={{ width: currentPlan.maxUsers === -1 ? '10%' : `${(4 / currentPlan.maxUsers) * 100}%` }} 
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-400">Integrations</span>
                  <span className="text-sm font-medium text-white">3 / {currentPlan.maxIntegrations === -1 ? '∞' : currentPlan.maxIntegrations}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all" 
                    style={{ width: currentPlan.maxIntegrations === -1 ? '15%' : `${(3 / currentPlan.maxIntegrations) * 100}%` }} 
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-400">AI Reports</span>
                  <span className="text-sm font-medium text-white">8 / 20</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all" 
                    style={{ width: '40%' }} 
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-800/60">
              <div className="flex items-center justify-between">
                <div><p className="text-sm text-slate-500">Method</p><p className="text-sm font-bold text-white font-mono">•••• 4242</p></div>
                <button className="text-xs font-bold text-blue-400">Update</button>
              </div>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div id="plans-grid" className="pt-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white">Choose Your Tier</h2>
            <p className="text-slate-400 mt-2 text-sm">Scale your intelligence as your business grows.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {planOrder.map((planId) => {
              const plan = PLANS[planId];
              const isCurrent = tier === planId;

              return (
                <div
                  key={planId}
                  className={cn(
                    "relative rounded-2xl border p-6 transition-all flex flex-col group",
                    isCurrent
                      ? 'bg-blue-600/5 border-blue-500 shadow-lg shadow-blue-500/5'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  )}
                >
                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-full text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
                      Active Plan
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      {plan.monthlyPrice > 0 ? (
                        <>
                          <span className="text-3xl font-bold text-white">${plan.monthlyPrice}</span>
                          <span className="text-slate-500 text-sm ml-1">/mo</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-white">{planId === 'free' ? '$0' : 'Custom'}</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature.key} className="flex items-start space-x-3">
                        <Check className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{feature.label}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleUpgrade(planId)}
                    disabled={isCurrent || loading}
                    className={cn(
                      "w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2",
                      isCurrent 
                        ? "bg-slate-800 text-slate-500 cursor-default" 
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                    )}
                  >
                    {loading && !isCurrent ? <Loader2 className="h-4 w-4 animate-spin" /> : isCurrent ? 'Active' : 'Upgrade'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* History */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden mt-12">
           <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Invoices</h3>
              <button className="text-xs text-blue-400 font-bold hover:text-white transition-colors">Download All</button>
           </div>
           <div className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <tbody className="divide-y divide-slate-800/50 text-sm">
                    {billingHistory.map((invoice, i) => (
                      <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{invoice.date}</td>
                        <td className="px-6 py-4 text-slate-400">{invoice.plan}</td>
                        <td className="px-6 py-4 text-slate-300 font-bold">{invoice.amount}</td>
                        <td className="px-6 py-4 text-right">
                           <button className="p-2 text-slate-500 hover:text-white transition-colors">
                              <Download className="h-4 w-4" />
                           </button>
                        </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
