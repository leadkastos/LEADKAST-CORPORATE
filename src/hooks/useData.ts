import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  type KpiData, type AlertItem, type ActionItem, type ActivityItem,
  type ReportData, type CampaignData, type ChannelMetric,
  executiveAlerts, actionItems, recentActivity, reports,
  kpiMetrics, marketingKpis, growthKpis, channelMetrics,
  campaignData, billingHistory, currentPlan, quarterlyData,
  growthDrivers, forecastMonths, marketingMonthlyData,
} from './mock-data';

export const queryKeys = {
  dashboard: { all: ['dashboard'] as const, kpis: () => ['dashboard','kpis'] as const },
  marketing: { all: ['marketing'] as const, kpis: () => ['marketing','kpis'] as const, campaigns: () => ['marketing','campaigns'] as const, channels: () => ['marketing','channels'] as const },
  revenue: { all: ['revenue'] as const, monthly: () => ['revenue','monthly'] as const, customers: () => ['revenue','customers'] as const, quarterly: () => ['revenue','quarterly'] as const },
  growth: { all: ['growth'] as const, kpis: () => ['growth','kpis'] as const, drivers: () => ['growth','drivers'] as const, forecast: () => ['growth','forecast'] as const },
  alerts: { all: ['alerts'] as const, list: () => ['alerts','list'] as const },
  actions: { all: ['actions'] as const, list: () => ['actions','list'] as const },
  reports: { all: ['reports'] as const, list: () => ['reports','list'] as const },
  activity: { all: ['activity'] as const, recent: () => ['activity','recent'] as const },
  billing: { all: ['billing'] as const, plan: () => ['billing','plan'] as const, history: () => ['billing','history'] as const },
};

async function simulateDelay(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function useDashboardKpis() {
  return useQuery({ queryKey: queryKeys.dashboard.kpis(), queryFn: async () => { await simulateDelay(200); return kpiMetrics; } });
}

export function useMarketingKpis() {
  return useQuery({ queryKey: queryKeys.marketing.kpis(), queryFn: async () => { await simulateDelay(200); return marketingKpis; } });
}

export function useGrowthKpis() {
  return useQuery({ queryKey: queryKeys.growth.kpis(), queryFn: async () => { await simulateDelay(200); return growthKpis; } });
}

export function useRevenueMonthly() {
  return useQuery({
    queryKey: queryKeys.revenue.monthly(),
    queryFn: async () => {
      await simulateDelay(250);
      const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return [108,112,118,122,128,135,142,148,155,162,170,180].map((v,i) => ({ month: labels[i], value: v }));
    },
  });
}

export function useCustomerGrowth() {
  return useQuery({
    queryKey: queryKeys.revenue.customers(),
    queryFn: async () => {
      await simulateDelay(250);
      const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return [820,845,872,901,935,972,1012,1055,1100,1148,1198,1250].map((v,i) => ({ month: labels[i], value: v }));
    },
  });
}

export function useRevenueQuarterly() {
  return useQuery({ queryKey: queryKeys.revenue.quarterly(), queryFn: async () => { await simulateDelay(200); return quarterlyData; } });
}

export function useCampaigns() {
  return useQuery({ queryKey: ['marketing','campaigns'], queryFn: async () => { await simulateDelay(350); return campaignData; } });
}

export function useMarketingChannels() {
  return useQuery({ queryKey: ['marketing','channels'], queryFn: async () => { await simulateDelay(200); return channelMetrics; } });
}

export function useGrowthDrivers() {
  return useQuery({ queryKey: ['growth','drivers'], queryFn: async () => { await simulateDelay(200); return growthDrivers; } });
}

export function useForecast() {
  return useQuery({ queryKey: ['growth','forecast'], queryFn: async () => { await simulateDelay(250); return forecastMonths; } });
}

export function useAlerts(filters?: { type?: string }) {
  return useQuery({
    queryKey: ['alerts','list', filters],
    queryFn: async () => {
      await simulateDelay(200);
      let result = [...executiveAlerts];
      if (filters?.type && filters.type !== 'all') result = result.filter(a => a.type === filters.type);
      return result;
    },
  });
}

export function useActions(filters?: { priority?: string }) {
  return useQuery({
    queryKey: ['actions','list', filters],
    queryFn: async () => {
      await simulateDelay(200);
      let result = [...actionItems];
      if (filters?.priority && filters.priority !== 'all') result = result.filter(a => a.priority === filters.priority);
      return result;
    },
  });
}

export function useResolveAlert() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: async (id: number) => { await simulateDelay(400); return { resolvedId: id }; }, onSuccess: () => qc.invalidateQueries({ queryKey: ['alerts'] }) });
}

export function useReports() {
  return useQuery({ queryKey: ['reports','list'], queryFn: async () => { await simulateDelay(350); return reports; } });
}

export function useRecentActivity() {
  return useQuery({ queryKey: ['activity','recent'], queryFn: async () => { await simulateDelay(200); return recentActivity; } });
}

export function useCurrentPlan() {
  return useQuery({ queryKey: ['billing','plan'], queryFn: async () => { await simulateDelay(200); return currentPlan; } });
}

export function useBillingHistory() {
  return useQuery({ queryKey: ['billing','history'], queryFn: async () => { await simulateDelay(250); return billingHistory; } });
}