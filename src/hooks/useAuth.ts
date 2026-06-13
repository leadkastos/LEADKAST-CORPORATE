'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  full_name: string | null;
  role: 'super_admin' | 'business_owner' | 'manager';
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setProfile(profileData);
        } else if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
          // Mock user for visual demo
          setUser({ id: 'mock-user', email: 'admin@leadkast.com' } as any);
          setProfile({ id: 'mock-user', full_name: 'LeadKast Admin', role: 'business_owner' });
        }
      } catch (err) {
        console.warn('Supabase auth failed, using mock user');
        setUser({ id: 'mock-user', email: 'admin@leadkast.com' } as any);
        setProfile({ id: 'mock-user', full_name: 'LeadKast Admin', role: 'business_owner' });
      }
      
      setLoading(false);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setProfile(profileData);
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  return {
    user,
    profile,
    loading,
    signOut: () => supabase.auth.signOut(),
  };
}
