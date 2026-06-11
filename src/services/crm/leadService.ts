import { createClient } from '@/lib/supabase';

export const generateMockLeads = async (userId: string, count: number = 20) => {
  const supabase = createClient();
  const leads = [];
  const sources = ['Meta Ads', 'Google Ads', 'Website', 'Referral'];
  const statuses = ['new', 'contact_attempted', 'spoke', 'qualified', 'dormant'];

  for (let i = 0; i < count; i++) {
    const source = sources[Math.floor(Math.random() * sources.length)];
    const status = Math.random() > 0.3 ? statuses[Math.floor(Math.random() * statuses.length)] : 'new';
    
    // Some leads are old to test revenue recovery
    const daysAgo = Math.floor(Math.random() * 15);
    const activityDate = new Date();
    activityDate.setDate(activityDate.getDate() - daysAgo);

    leads.push({
      user_id: userId,
      first_name: `Lead${i}`,
      last_name: `Test${i}`,
      email: `lead${i}@example.com`,
      phone: `555-01${i.toString().padStart(2, '0')}`,
      status,
      source,
      last_activity_at: activityDate.toISOString(),
      created_at: activityDate.toISOString()
    });
  }

  const { error } = await supabase.from('leads').insert(leads);
  return { success: !error, error };
};
