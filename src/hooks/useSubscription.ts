'use client';

import { useEffect, useState, useCallback } from 'react';
import type { SubscriptionResponse } from '@/types/billing';

/**
 * Hook to fetch and track the current user's subscription status.
 * Used by components to gate features and show upgrade prompts.
 */
export function useSubscription() {
  const [data, setData] = useState<SubscriptionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/billing/subscription');
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Failed to fetch subscription');
      }
      const json: SubscriptionResponse = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  /**
   * Create a Stripe Checkout Session for upgrading.
   */
  const createCheckout = useCallback(async (
    tier: 'pro' | 'business',
    interval: 'month' | 'year' = 'month'
  ): Promise<string | null> => {
    try {
      const res = await fetch('/api/billing/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, interval }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      return json.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create checkout');
      return null;
    }
  }, []);

  /**
   * Open the Stripe Customer Portal for managing billing.
   */
  const openPortal = useCallback(async (): Promise<string | null> => {
    try {
      const res = await fetch('/api/billing/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      return json.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open portal');
      return null;
    }
  }, []);

  return {
    ...data,
    loading,
    error,
    refetch: fetchSubscription,
    createCheckout,
    openPortal,
  };
}