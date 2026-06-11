import { useState, useEffect } from 'react';

export interface ReportStats {
  marketing: {
    totalSpend: number;
    totalLeads: number;
    cpl: number;
    roas: number;
  };
  conversions: {
    leadToAppointmentRate: number;
    appointmentToWonRate: number;
  };
  engagement: {
    actionCompletionRate: number;
  };
  revenue: {
    totalRevenue: number;
    wonLeads: number;
  };
}

export function useReports(timeframe: '7d' | '30d' | 'mtd' = '30d') {
  const [stats, setStats] = useState<ReportStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/intelligence/reports?timeframe=${timeframe}`);
      if (!response.ok) throw new Error('Failed to fetch report stats');
      const data = await response.json();
      setStats(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [timeframe]);

  return { stats, loading, error, refetch: fetchStats };
}
