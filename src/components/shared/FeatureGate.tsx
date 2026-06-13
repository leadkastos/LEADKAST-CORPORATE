/**
 * Feature gate HOC and utilities for UI component protection.
 * Prevents rendering of premium features for free-tier users.
 */

'use client';

import { useSubscription } from '@/hooks/useSubscription';
import { hasTierAccess, hasFeature } from '@/lib/feature-gate';
import type { SubscriptionTier } from '@/lib/plans';
import { Loader2, Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface FeatureGateProps {
  feature: string;
  minimumTier?: SubscriptionTier;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * FeatureGate determines if the current user's subscription tier has
 * access to the specified feature. Shows an upgrade prompt if not.
 *
 * Usage:
 * <FeatureGate feature="ai-reports" minimumTier="pro">
 *   <ReportsPage />
 * </FeatureGate>
 */
export function FeatureGate({ feature, minimumTier, fallback, children }: FeatureGateProps) {
  const { tier, loading } = useSubscription();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
      </div>
    );
  }

  const userTier = tier || 'free';
  const requiredTier = minimumTier || 'pro';

  const hasAccess = hasTierAccess(userTier, requiredTier) && hasFeature(userTier, feature);

  if (hasAccess) {
    return <>{children}</>;
  }

  // Show custom fallback or default upgrade prompt
  return (
    <>
      {fallback || (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-slate-800 mb-4">
            <Lock className="h-6 w-6 text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Premium Feature
          </h3>
          <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
            Upgrade to{' '}
            <span className="text-blue-400 font-semibold">
              {requiredTier === 'pro' ? 'Pro' : 'Business'}
            </span>{' '}
            to unlock this feature and get access to advanced business intelligence tools.
          </p>
          <Link
            href="/settings/billing"
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Upgrade Now
          </Link>
        </div>
      )}
    </>
  );
}

/**
 * Determines if a component should be rendered based on subscription tier.
 * For use in server components or conditional logic.
 */
export function canAccess(tier: SubscriptionTier | undefined | null, minimumTier: SubscriptionTier): boolean {
  return hasTierAccess(tier || 'free', minimumTier);
}

/**
 * Returns the correct component based on subscription tier.
 * If the user has access, renders the premium children.
 * Otherwise, renders the locked fallback.
 */
export function TierGuard({
  tier,
  minimumTier = 'pro',
  children,
  fallback,
}: {
  tier: SubscriptionTier | undefined | null;
  minimumTier?: SubscriptionTier;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  if (canAccess(tier, minimumTier)) {
    return <>{children}</>;
  }
  return <>{fallback || null}</>;
}