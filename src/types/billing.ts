import type { SubscriptionTier } from '@/lib/plans';

export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete' | 'incomplete_expired';
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  trial_end: string | null;
  created_at: string;
  updated_at: string;
}

export interface CheckoutSessionResponse {
  url: string | null;
  sessionId: string | null;
}

export interface PortalSessionResponse {
  url: string | null;
}

export interface SubscriptionResponse {
  subscription: Subscription | null;
  tier: SubscriptionTier;
  isActive: boolean;
  isTrialing: boolean;
  isCanceled: boolean;
  willCancel: boolean;
}

export interface BillingError {
  error: string;
}