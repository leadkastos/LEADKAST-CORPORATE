import { createClient } from '@/lib/supabase';

export const seedAlertsData = async (userId: string) => {
  const supabase = createClient();

  // 1. Seed some reviews (including negative ones)
  const reviews = [
    {
      user_id: userId,
      platform: 'google',
      author_name: 'Angry Customer',
      rating: 1,
      comment: 'Terrible service! Would not recommend.',
      posted_at: new Date().toISOString()
    },
    {
      user_id: userId,
      platform: 'google',
      author_name: 'Happy Client',
      rating: 5,
      comment: 'Excellent work!',
      posted_at: new Date().toISOString()
    }
  ];

  await supabase.from('reviews').insert(reviews);

  // 2. Seed some appointments (including no-shows)
  const { data: leads } = await supabase.from('leads').select('id').eq('user_id', userId).limit(5);
  
  if (leads && leads.length > 0) {
    const appointments = [
      {
        user_id: userId,
        lead_id: leads[0].id,
        scheduled_at: new Date().toISOString(),
        status: 'no_show'
      },
      {
        user_id: userId,
        lead_id: leads[1].id,
        scheduled_at: new Date().toISOString(),
        status: 'scheduled'
      }
    ];
    await supabase.from('appointments').insert(appointments);
  }

  // 3. Ensure we have ad_metrics with a drop/increase to trigger alerts
  const today = new Date().toISOString().split('T')[0];
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  const { data: integrations } = await supabase.from('integrations').select('id').eq('slug', 'meta-ads').single();
  
  if (integrations) {
    const metrics = [
      {
        user_id: userId,
        integration_id: integrations.id,
        date: yesterday,
        spend: 100,
        leads: 10,
        impressions: 1000,
        clicks: 50
      },
      {
        user_id: userId,
        integration_id: integrations.id,
        date: today,
        spend: 10, // Massive drop
        leads: 0,  // Massive CPL increase (infinite effectively)
        impressions: 100,
        clicks: 5
      }
    ];
    await supabase.from('ad_metrics').upsert(metrics, { onConflict: 'user_id,integration_id,date' });
  }

  return { success: true };
};
