'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useSubscription } from '@/hooks/useSubscription';
import { PLANS } from '@/lib/plans';
import type { SubscriptionTier } from '@/lib/plans';
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Billing & Plan</h1>
            <p className="text-slate-400 mt-1">
              Manage your subscription and billing information.
            </p>
          </div>
          {isActive && displayTier !== 'free' && (
            <button
              onClick={handlePortal}
              disabled={portalLoading}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium py-2.5 px-5 rounded-lg transition-colors flex items-center disabled:opacity-50 text-sm"
            >
              {portalLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <CreditCard className="h-4 w-4 mr-2" />
              )}
              Manage Billing
            </button>
          )}
        </div>

        {/* Current Plan Banner */}
        {currentPlan && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-bold text-white">Current Plan</h2>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {currentPlan.name}
                  </span>
                  {isTrialing && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Trial
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm mt-1">{currentPlan.description}</p>
                {currentPlan.monthlyPrice > 0 && (
                  <p className="text-slate-300 text-sm mt-2">
                    ${currentPlan.monthlyPrice}/mo or ${currentPlan.annualPrice}/yr
                  </p>
                )}
                {displayTier === 'free' && (
                  <p className="text-xs text-slate-500 mt-2">
                    Free tier includes basic features. Upgrade for full intelligence.
                  </p>
                )}
              </div>
              {error && (
                <div className="text-xs text-rose-400 max-w-xs text-right">{error}</div>
              )}
            </div>
          </div>
        )}

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {planOrder.map((planId) => {
            const plan = PLANS[planId];
            const isCurrent = displayTier === planId;
            const isUpgrade = planOrder.indexOf(planId) > planOrder.indexOf(displayTier as SubscriptionTier);
            const isDowngrade = planOrder.indexOf(planId) < planOrder.indexOf(displayTier as SubscriptionTier);

            return (
              <div
                key={planId}
                className={`relative rounded-2xl border p-6 transition-all ${
                  isCurrent
                    ? 'bg-blue-500/5 border-blue-500/30 shadow-lg shadow-blue-500/5'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
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
                      <span className="text-2xl font-bold text-white">Custom</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature.key} className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-sm text-slate-300">{feature.label}</span>
                        <p className="text-[10px] text-slate-500">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-800 pt-4 mt-4">
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
                          Subscribe Monthly
                        </button>
                        <button
                          onClick={() => handleUpgrade(planId as 'pro' | 'business', 'year')}
                          disabled={checkoutLoading === `${planId}-year`}
                          className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors flex items-center justify-center disabled:opacity-50"
                        >
                          {checkoutLoading === `${planId}-year` ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            'Save ~17% — '
                          )}
                          ${plan.annualPrice}/yr
                        </button>
                      </div>
                    )
                  ) : (
                    <a
                      href="mailto:sales@leadkastos.com"
                      className="block w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm text-center transition-colors"
                    >
                      Contact Sales
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white">Feature Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left p-4 text-slate-400 font-semibold">Feature</th>
                  {planOrder.map((planId) => (
                    <th key={planId} className="p-4 text-center text-slate-400 font-semibold">
                      {PLANS[planId].name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Users', key: 'maxUsers', type: 'limit' },
                  { label: 'Integrations', key: 'maxIntegrations', type: 'limit' },
                  { label: 'AI-Powered Reports', key: 'aiReports', type: 'bool' },
                  { label: 'Custom Branding', key: 'customBranding', type: 'bool' },
                  { label: 'Priority Support', key: 'prioritySupport', type: 'bool' },
                  { label: 'API Access', key: 'apiAccess', type: 'bool' },
                ].map((row) => (
                  <tr key={row.key} className="border-b border-slate-800/50">
                    <td className="p-4 text-slate-300">{row.label}</td>
                    {planOrder.map((planId) => {
                      const plan = PLANS[planId];
                      const val = (plan as any)[row.key];
                      return (
                        <td key={planId} className="p-4 text-center">
                          {row.type === 'limit' ? (
                            val === -1 ? (
                              <span className="text-emerald-500 font-medium">Unlimited</span>
                            ) : (
                              <span className="text-slate-400">{val}</span>
                            )
                          ) : val ? (
                            <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-slate-600 mx-auto" />
                          )}
                        </td>
                      );
                    })}
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