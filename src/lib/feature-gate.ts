/**
 * Feature gating based on subscription tier.
 * Used both server-side (API routes) and client-side (components/hooks).
 * Updated for multi-tenant organization-based access.
 */

import type { SubscriptionTier } from './plans';
import { PLANS, DEFAULT_TIER } from './plans';

/**
 * Tier hierarchy for comparison.
 * Higher index = more premium.
 */
const TIER_ORDER: SubscriptionTier[] = ['free', 'pro', 'business', 'enterprise'];

function tierIndex(tier: SubscriptionTier): number {
  return TIER_ORDER.indexOf(tier);
}

/**
 * Check if a user's tier has access to at least the given tier.
 */
export function hasTierAccess(userTier: SubscriptionTier, minimumTier: SubscriptionTier): boolean {
  return tierIndex(userTier) >= tierIndex(minimumTier);
}

/**
 * Feature gate — checks if a specific feature is available for the given tier.
 */
export function hasFeature(tier: SubscriptionTier, featureKey: string): boolean {
  const plan = PLANS[tier] || PLANS[DEFAULT_TIER];
  return plan.features.some((f) => f.key === featureKey);
}

/**
 * Check numeric limits.
 * Returns -1 for unlimited.
 */
export function getLimit(tier: SubscriptionTier, limitKey: 'maxUsers' | 'maxIntegrations' | 'maxCampaigns'): number {
  const plan = PLANS[tier] || PLANS[DEFAULT_TIER];
  return plan[limitKey];
}

/**
 * Check if usage is within plan limits.
 * -1 means unlimited.
 */
export function isWithinLimit(tier: SubscriptionTier, limitKey: 'maxUsers' | 'maxIntegrations' | 'maxCampaigns', current: number): boolean {
  const limit = getLimit(tier, limitKey);
  return limit === -1 || current < limit;
}

/**
 * Get a human-readable limit string for display.
 */
export function getLimitDisplay(tier: SubscriptionTier, limitKey: 'maxUsers' | 'maxIntegrations' | 'maxCampaigns'): string {
  const limit = getLimit(tier, limitKey);
  if (limit === -1) return 'Unlimited';
  return `${limit}`;
}

/**
 * Check if AI-powered reports are enabled for the tier.
 */
export function hasAiReports(tier: SubscriptionTier): boolean {
  return PLANS[tier]?.aiReports ?? false;
}

/**
 * Check if custom branding is enabled.
 */
export function hasCustomBranding(tier: SubscriptionTier): boolean {
  return PLANS[tier]?.customBranding ?? false;
}

/**
 * Check if priority support is available.
 */
export function hasPrioritySupport(tier: SubscriptionTier): boolean {
  return PLANS[tier]?.prioritySupport ?? false;
}

/**
 * Check if API access is enabled.
 */
export function hasApiAccess(tier: SubscriptionTier): boolean {
  return PLANS[tier]?.apiAccess ?? false;
}

/**
 * Fetch the subscription tier for the current user's organization.
 * Calls the GET /api/billing/subscription endpoint.
 * Falls back to 'free' if unavailable.
 */
export async function fetchUserTier(): Promise<SubscriptionTier> {
  try {
    const res = await fetch('/api/billing/subscription');
    if (!res.ok) return 'free';
    const data = await res.json();
    return data.tier || 'free';
  } catch {
    return 'free';
  }
}

/**
 * Fetch the organization ID for the current user.
 */
export async function fetchOrganizationId(): Promise<string | null> {
  try {
    const res = await fetch('/api/billing/subscription');
    if (!res.ok) return null;
    const data = await res.json();
    return data.organizationId || null;
  } catch {
    return null;
  }
}