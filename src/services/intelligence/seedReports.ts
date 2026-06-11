import { createClient } from '@/lib/supabase';
import { subDays, startOfDay } from 'date-fns';

export const seedReportingData = async (userId: string) => {
  const supabase = createClient();
  
  // 1. Create a bunch of leads with various statuses and dates
  const sources = ['Meta Ads', 'Google Ads', 'Organic', 'Referral'];
  const statuses = ['new', 'contact_attempted', 'spoke', 'qualified', 'won', 'lost'];
  
  const leadsToInsert = [];
  for (let i = 0; i < 50; i++) {
    const daysAgo = Math.floor(Math.random() * 45); // up to 45 days ago
    const createdAt = subDays(new Date(), daysAgo);
    
    leadsToInsert.push({
      user_id: userId,
      first_name: `Lead`,
      last_name: `${i}`,
      email: `lead${i}@example.com`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      created_at: createdAt.toISOString(),
      last_activity_at: createdAt.toISOString()
    });
  }
  
  await supabase.from('leads').insert(leadsToInsert);
  
  // 2. Create some appointments
  const { data: leads } = await supabase.from('leads').select('id').eq('user_id', userId).limit(20);
  
  if (leads) {
    const appointmentsToInsert = leads.map((lead, index) => {
      const daysAgo = Math.floor(Math.random() * 30);
      return {
        user_id: userId,
        lead_id: lead.id,
        scheduled_at: subDays(new Date(), daysAgo).toISOString(),
        status: index % 5 === 0 ? 'no_show' : 'completed'
      };
    });
    
    await supabase.from('appointments').insert(appointmentsToInsert);
  }
  
  // 3. Create some action items
  const actionsToInsert = [];
  for (let i = 0; i < 15; i++) {
    const daysAgo = Math.floor(Math.random() * 14);
    actionsToInsert.push({
      user_id: userId,
      title: `Task ${i}`,
      status: Math.random() > 0.3 ? 'completed' : 'pending',
      priority: 'medium',
      category: 'follow_up',
      created_at: subDays(new Date(), daysAgo).toISOString(),
      completed_at: Math.random() > 0.3 ? new Date().toISOString() : null
    });
  }
  
  await supabase.from('action_items').insert(actionsToInsert);

  return { success: true };
};
