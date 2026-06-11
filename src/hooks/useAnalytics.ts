import { useState, useEffect } from 'react';
import { BusinessHealthKPIs } from '@/services/intelligence/analyticsService';

export function useAnalytics() {
  const [kpis, setKpis] = useState<BusinessHealthKPIs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKpis = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/intelligence/analytics/health');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const data = await response.json();
      setKpis(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(setLoading(false) as any); // Workaround for some build issues sometimes
      setLoading(false);
    }
  };

  const logEngagement = async (eventType: 'dashboard_login' | 'morning_brief_open' | 'report_download' | 'daily_wrap_open', metadata: any = {}) => {
    try {
      await fetch('/api/intelligence/analytics/engagement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType, metadata }),
      });
    } catch (err) {
      console.error('Error logging engagement:', err);
    }
  };

  useEffect(() => {
    fetchKpis();
  }, []);

  return { kpis, loading, error, fetchKpis, logEngagement };
}
