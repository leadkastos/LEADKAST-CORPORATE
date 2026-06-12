'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useSubscription } from '@/hooks/useSubscription';
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

const tierIcons: Record<string, React.ReactNode> = {
  dashboard: <BarChart3 className="h-4 w-4 text-blue-400" />,
  'morning-brief': <Zap className="h-4 w-4 text-amber-400" />,
  'daily-wrap': <Layers className="h-4 w-4 text-indigo-400" />,
  'unlimited-alerts': <Zap className="h-4 w-4 text-rose-400" />,
  'ai-reports': <Sparkles className="h-4 w-4 text-purple-400" />,
  integrations: <LinkIcon className="h-4 w-4 text-cyan-400" />,
  historical: <Layers className="h-4 w-4 text-green-400" />,
  team: <Users className="h-4 w-4 text-blue-400" />,
  'custom-branding': <Palette className="h-4 w-4 text-pink-400" />,
  'priority-support': <HeadphonesIcon className="h-4 w-4 text-emerald-400" />,
  'dedicated-support': <HeadphonesIcon className="h-4 w-4 text-emerald-400" />,
  api: <Code2 className="h-4 w-4 text-slate-400" />,
  sso: <Users className="h-4 w-4 text-indigo-400" />,
  custom: <Code2 className="h-4 w-4 text-amber-400" />,
};

const billingHistory = [
  { date: 'Dec 1, 2025', amount: '$149.00', status: 'paid' as const, plan: 'Business - Monthly', invoice: '#INV-2025-1201' },
  { date: 'Nov 1, 2025', amount: '$149.00', status: 'paid' as const, plan: 'Business - Monthly', invoice: '#INV-2025-1101' },
  { date: 'Oct 1, 2025', amount: '$149.00', status: 'paid' as const, plan: 'Business - Monthly', invoice: '#INV-2025-1001' },
];

const statusStyles = {
  paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  failed: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export default function BillingPage() {
  const {
    tier,
    isActive,
    isTrialing,
    loading,
    error,
    createCheckout,
    openPortal,
    refetch,
    subscription,
  } = useSubscription();

  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  const handleUpgrade = async (planTier: 'pro' | 'business', interval: 'month' | 'year') => {
    setCheckoutLoading(`${planTier}-${interval}`);
    try {
      const url = await createCheckout(planTier, interval);
      if (url) {
        window.location.href = url;
      }
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handlePortal = async () => {
    setPortalLoading(true);
    try {
      const url = await openPortal();
      if (url) {
        window.location.href = url;
      }
    } finally {
      setPortalLoading(false);
    }
  };

  const displayTier = tier || 'free';
  const currentPlan = PLANS[displayTier as SubscriptionTier];
  const planOrder: SubscriptionTier[] = ['free', 'pro', 'business', 'enterprise'];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-blue-400" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Subscription and Billing</h1>
            </div>
            <p className="text-slate-400 mt-1 text-sm">Manage your plan, billing history, and subscription preferences.</p>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            {isActive && displayTier !== 'free' && (
              <button 
                onClick={handlePortal}
                disabled={portalLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center shadow-lg shadow-blue-600/20 disabled:opacity-50"
              >
                {portalLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CreditCard className="h-4 w-4 mr-2" />}
                Manage Payment Methods
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Plan Summary Card */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <div className={cn("h-3 w-3 rounded-full animate-pulse", isActive ? "bg-emerald-500" : "bg-slate-500")} />
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full border", 
                    isActive 
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
                      : "text-slate-400 bg-slate-500/10 border-slate-500/20"
                  )}>
                    {isActive ? "Active" : "Inactive"}
                  </span>
                  {isTrialing && (
                    <span className="text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">Trial</span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white mt-3">{currentPlan.name} Plan</h2>
                <div className="flex items-baseline mt-1">
                  <span className="text-3xl font-bold text-white">
                    {currentPlan.monthlyPrice > 0 ? `$${currentPlan.monthlyPrice}` : 'Custom'}
                  </span>
                  {currentPlan.monthlyPrice > 0 && <span className="text-slate-500 ml-1">/month</span>}
                </div>
                {subscription?.current_period_end && (
                  <p className="text-xs text-slate-500 mt-1">
                    Next billing: {new Date(subscription.current_period_end).toLocaleDateString()}
                  </p>
                )}
              </div>
              {displayTier !== 'enterprise' && (
                <button 
                  onClick={() => document.getElementById('plans-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium border border-blue-500/20 bg-blue-500/5 px-4 py-2 rounded-lg hover:bg-blue-500/10 transition-all"
                >
                  Change Plan
                </button>
              )}
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
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Key Features</h3>
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
            <h2 className="text-base font-semibold text-white mb-5">Usage Summary</h2>
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-400">Seats Used</span>
                  <span className="text-sm font-medium text-white">1 / {currentPlan.maxUsers === -1 ? '∞' : currentPlan.maxUsers}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all" 
                    style={{ width: currentPlan.maxUsers === -1 ? '1%' : `${(1 / currentPlan.maxUsers) * 100}%` }} 
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-400">Integrations</span>
                  <span className="text-sm font-medium text-white">0 / {currentPlan.maxIntegrations === -1 ? '∞' : currentPlan.maxIntegrations}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all" 
                    style={{ width: '0%' }} 
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-400">Campaigns</span>
                  <span className="text-sm font-medium text-white">0 / {currentPlan.maxCampaigns === -1 ? '∞' : currentPlan.maxCampaigns}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all" 
                    style={{ width: '0%' }} 
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-800/60">
              <div className="flex items-center justify-between">
                <div><p className="text-sm text-slate-500">Status</p><p className="text-lg font-bold text-white capitalize">{displayTier}</p></div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Auto-renew</p>
                  <p className={cn("text-lg font-bold", subscription?.cancel_at_period_end === false ? "text-emerald-400" : "text-rose-400")}>
                    {subscription?.cancel_at_period_end === false ? "On" : "Off"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div id="plans-grid" className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Available Plans</h2>
            <p className="text-slate-400 mt-2 text-sm">Choose the best intelligence tier for your business growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {planOrder.map((planId) => {
              const plan = PLANS[planId];
              const isCurrent = displayTier === planId;
              const isUpgrade = planOrder.indexOf(planId) > planOrder.indexOf(displayTier as SubscriptionTier);
              const isDowngrade = planOrder.indexOf(planId) < planOrder.indexOf(displayTier as SubscriptionTier);

              return (
                <div
                  key={planId}
                  className={cn(
                    "relative rounded-2xl border p-6 transition-all flex flex-col",
                    isCurrent
                      ? 'bg-blue-500/5 border-blue-500/30 shadow-lg shadow-blue-500/5'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  )}
                >
                  {isCurrent && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-600 rounded-full text-[10px] font-semibold text-white uppercase tracking-wider">
                      Current
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <div className="mt-3">
                      {plan.monthlyPrice > 0 ? (
                        <>
                          <span className="text-3xl font-bold text-white">${plan.monthlyPrice}</span>
                          <span className="text-slate-400 text-sm ml-1">/mo</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-white">{planId === 'free' ? '$0' : 'Custom'}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-2 h-8">{plan.description}</p>
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature.key} className="flex items-start space-x-2.5">
                        <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-sm text-slate-300">{feature.label}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-800 pt-4 mt-auto">
                    <div className="flex justify-between">
                      <span>Users</span>
                      <span className="text-slate-400 font-medium">
                        {plan.maxUsers === -1 ? 'Unlimited' : plan.maxUsers}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Integrations</span>
                      <span className="text-slate-400 font-medium">
                        {plan.maxIntegrations === -1 ? 'Unlimited' : plan.maxIntegrations}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    {isCurrent ? (
                      <button
                        disabled
                        className="w-full py-2.5 rounded-lg bg-blue-600/20 text-blue-400 font-medium text-sm cursor-default"
                      >
                        Current Plan
                      </button>
                    ) : plan.monthlyPrice > 0 ? (
                      isDowngrade ? (
                        <button
                          onClick={handlePortal}
                          disabled={portalLoading}
                          className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors disabled:opacity-50"
                        >
                          {portalLoading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'Downgrade'}
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <button
                            onClick={() => handleUpgrade(planId as 'pro' | 'business', 'month')}
                            disabled={checkoutLoading === `${planId}-month`}
                            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors flex items-center justify-center disabled:opacity-50"
                          >
                            {checkoutLoading === `${planId}-month` ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 mr-1.5" />
                            )}
                            Subscribe
                          </button>
                        </div>
                      )
                    ) : planId === 'enterprise' ? (
                      <a
                        href="mailto:sales@leadkastos.com"
                        className="block w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm text-center transition-colors"
                      >
                        Contact Sales
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2.5 rounded-lg bg-slate-800/20 text-slate-500 font-medium text-sm cursor-default"
                      >
                        Free Tier
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 sm:p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-white">Billing History</h2>
              <p className="text-xs text-slate-500 mt-0.5">Recent invoices and payment records</p>
            </div>
            <button 
              onClick={handlePortal}
              disabled={portalLoading}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center disabled:opacity-50"
            >
              View In Stripe<ChevronRight className="h-3 w-3 ml-0.5" />
            </button>
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
                      <button 
                        onClick={handlePortal}
                        className="text-slate-500 hover:text-white transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {billingHistory.length === 0 && (
              <div className="text-center py-8 text-slate-500 italic">No invoices found.</div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
