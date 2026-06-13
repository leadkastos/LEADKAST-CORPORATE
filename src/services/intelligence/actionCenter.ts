import { createClient } from '@/lib/supabase';

export const refreshActionItems = async (orgId: string, userId: string) => {
  const supabase = createClient();
  
  // Call the updated stored procedure
  const { error } = await supabase.rpc('generate_revenue_recovery_actions_v2', { 
    p_org_id: orgId,
    p_user_id: userId 
  });
  
  if (error) {
    console.error('Error refreshing action items:', error);
    return { success: false, error };
  }

  return { success: true };
};

export const getActionItems = async (orgId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('action_items')
    .select('*, leads(*)')
    .eq('organization_id', orgId)
    .eq('status', 'pending')
    .order('priority', { ascending: false });

  return { data, error };
};

export const updateActionItemStatus = async (itemId: string, status: 'completed' | 'dismissed') => {
  const supabase = createClient();
  const { error } = await supabase
    .from('action_items')
    .update({ 
      status, 
      completed_at: status === 'completed' ? new Date().toISOString() : null 
    })
    .eq('id', itemId);

  return { success: !error, error };
};
