'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { Alert } from '@/types/database';

export function useAlerts() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await fetch('/api/intelligence/alerts');
      const result = await response.json();
      if (result.data) {
        setAlerts(result.data);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const refresh = useCallback(async () => {
    if (!user) return;
    
    try {
      await fetch('/api/intelligence/alerts/refresh', { method: 'POST' });
      await fetchAlerts();
    } catch (error) {
      console.error('Error refreshing alerts:', error);
    }
  }, [user, fetchAlerts]);

  const resolve = useCallback(async (alertId: string) => {
    try {
      await fetch('/api/intelligence/alerts/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertId })
      });
      setAlerts(prev => prev.filter(a => a.id !== alertId));
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  return {
    alerts,
    loading,
    refresh,
    resolve,
    count: alerts.length
  };
}
