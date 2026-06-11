import { createClient } from '@/lib/supabase';

export interface AdData {
  date: string;
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  appointments: number;
}

export const fetchMockAdData = async (integrationSlug: string, days: number = 30): Promise<AdData[]> => {
  const data: AdData[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Randomish data based on integration
    let baseSpend = integrationSlug === 'meta-ads' ? 50 : 75;
    let multiplier = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    
    const spend = +(baseSpend * multiplier).toFixed(2);
    const impressions = Math.floor(spend * (integrationSlug === 'meta-ads' ? 100 : 40));
    const clicks = Math.floor(impressions * (0.01 + Math.random() * 0.02));
    const leads = Math.floor(clicks * (0.05 + Math.random() * 0.1));
    const appointments = Math.floor(leads * (0.2 + Math.random() * 0.3));

    data.push({
      date: date.toISOString().split('T')[0],
      spend,
      impressions,
      clicks,
      leads,
      appointments
    });
  }

  return data;
};

export const syncMarketingData = async (userId: string, integrationId: string, integrationSlug: string) => {
  const supabase = createClient();
  const mockData = await fetchMockAdData(integrationSlug);

  const records = mockData.map(item => ({
    user_id: userId,
    integration_id: integrationId,
    ...item
  }));

  const { error } = await supabase
    .from('ad_metrics')
    .upsert(records, { onConflict: 'user_id,integration_id,date' });

  if (error) {
    console.error(`Error syncing ${integrationSlug}:`, error);
    return { success: false, error };
  }

  return { success: true, count: records.length };
};
