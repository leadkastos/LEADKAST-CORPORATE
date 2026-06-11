'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { createClient } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ExternalLink,
  Shield,
  Zap,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Integration, UserIntegration } from '@/types/database';

// Mock data for Phase 1 + Future integrations
const ALL_INTEGRATIONS = [
  { name: 'GoHighLevel', slug: 'gohighlevel', category: 'CRM', phase: 1, description: 'All-in-one sales and marketing platform.' },
  { name: 'Meta Ads', slug: 'meta-ads', category: 'Marketing', phase: 1, description: 'Facebook and Instagram ad campaigns.' },
  { name: 'Google Ads', slug: 'google-ads', category: 'Marketing', phase: 1, description: 'Google Search and Display performance.' },
  { name: 'Google Business Profile', slug: 'google-business', category: 'Sales', phase: 1, description: 'Local business presence and reviews.' },
  { name: 'HubSpot', slug: 'hubspot', category: 'CRM', phase: 2, description: 'Advanced CRM and marketing automation.' },
  { name: 'Salesforce', slug: 'salesforce', category: 'CRM', phase: 2, description: 'Enterprise-grade sales management.' },
  { name: 'LinkedIn Ads', slug: 'linkedin-ads', category: 'Marketing', phase: 2, description: 'Professional B2B ad platform.' },
  { name: 'Shopify', slug: 'shopify', category: 'E-commerce', phase: 2, description: 'E-commerce store performance data.' },
];

export default function IntegrationsPage() {
  const { user } = useAuth();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [userIntegrations, setUserIntegrations] = useState<UserIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectingSlug, setConnectingSlug] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const [intRes, userIntRes] = await Promise.all([
          supabase.from('integrations').select('*'),
          supabase.from('user_integrations').select('*').eq('user_id', user.id)
        ]);

        if (intRes.data) setIntegrations(intRes.data);
        if (userIntRes.data) setUserIntegrations(userIntRes.data);
      } catch (err) {
        console.error('Error fetching integrations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, supabase]);

  const handleConnect = async (integration: any) => {
    if (!user) return;
    setConnectingSlug(integration.slug);

    // Simulate OAuth/Connection flow
    setTimeout(async () => {
      try {
        const existingInt = integrations.find(i => i.slug === integration.slug);
        if (!existingInt) return;

        const { data, error } = await supabase
          .from('user_integrations')
          .upsert({
            user_id: user.id,
            integration_id: existingInt.id,
            status: 'active',
            last_synced_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id,integration_id' })
          .select()
          .single();

        if (error) throw error;

        setUserIntegrations(prev => {
          const filtered = prev.filter(ui => ui.integration_id !== existingInt.id);
          return [...filtered, data];
        });
      } catch (err) {
        console.error('Failed to connect:', err);
      } finally {
        setConnectingSlug(null);
      }
    }, 1500);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Integrations</h1>
        <p className="text-slate-400 mt-1">Connect your business tools to power the Executive Intelligence Platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ALL_INTEGRATIONS.map((item) => {
          const dbInt = integrations.find(i => i.slug === item.slug);
          const userInt = dbInt ? userIntegrations.find(ui => ui.integration_id === dbInt.id) : null;
          const isPhase1 = item.phase === 1;
          const isConnecting = connectingSlug === item.slug;

          return (
            <div 
              key={item.slug}
              className={cn(
                "group relative bg-slate-900/50 border rounded-2xl p-6 transition-all duration-300 flex flex-col",
                userInt?.status === 'active' ? "border-emerald-500/50" : "border-slate-800 hover:border-slate-700"
              )}
            >
              {!isPhase1 && (
                <div className="absolute top-3 right-3">
                  <span className="bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Coming Soon
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-4 mb-4">
                <div className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center text-white",
                  isPhase1 ? "bg-slate-800 group-hover:bg-slate-700 transition-colors" : "bg-slate-900/30 grayscale"
                )}>
                  {item.category === 'CRM' ? <Shield className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight">{item.name}</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{item.category}</p>
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-6 flex-1">
                {item.description}
              </p>

              <div className="mt-auto pt-6 border-t border-slate-800/50">
                {userInt?.status === 'active' ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-emerald-500 text-xs font-medium">
                      <CheckCircle2 className="h-4 w-4 mr-1.5" />
                      Connected
                    </div>
                    <button className="p-1.5 text-slate-500 hover:text-white transition-colors">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={!isPhase1 || isConnecting}
                    onClick={() => handleConnect(item)}
                    className={cn(
                      "w-full py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center",
                      isPhase1 
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20" 
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    )}
                  >
                    {isConnecting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-1.5" />
                        Connect
                      </>
                    )}
                  </button>
                )}
              </div>
              
              {userInt?.last_synced_at && (
                <div className="mt-3 flex items-center justify-center">
                  <span className="text-[10px] text-slate-500 italic">
                    Last sync: {new Date(userInt.last_synced_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
