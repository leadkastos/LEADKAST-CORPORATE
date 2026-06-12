/**
 * Subscription tier definitions and feature-gate configuration.
 * Maps human-readable plans to Stripe Price IDs and feature flags.
 */

export type SubscriptionTier = 'free' | 'pro' | 'business' | 'enterprise';

export interface PlanFeature {
  key: string;
  label: string;
  description: string;
}

export interface PlanDefinition {
  id: SubscriptionTier;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  stripePriceIdMonthly: string;
  stripePriceIdAnnual: string;
  features: PlanFeature[];
  maxUsers: number;
  maxIntegrations: number;
  maxCampaigns: number;
  aiReports: boolean;
  customBranding: boolean;
  prioritySupport: boolean;
  apiAccess: boolean;
}

export const PLANS: Record<SubscriptionTier, PlanDefinition> = {
  free: {
    id: 'free',
    name: 'Free',
    description: 'Basic business intelligence for solopreneurs',
    monthlyPrice: 0,
    annualPrice: 0,
    stripePriceIdMonthly: '',
    stripePriceIdAnnual: '',
    features: [
      { key: 'dashboard', label: 'Executive Dashboard', description: 'Core KPIs and metrics' },
      { key: 'morning-brief', label: 'Morning Brief', description: 'Daily email summary' },
      { key: 'basic-alerts', label: 'Executive Alerts', description: 'Up to 5 active alerts' },
    ],
    maxUsers: 1,
    maxIntegrations: 2,
    maxCampaigns: 3,
    aiReports: false,
    customBranding: false,
    prioritySupport: false,
    apiAccess: false,
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    description: 'For growing businesses that need deeper insights',
    monthlyPrice: 49,
    annualPrice: 490,
    stripePriceIdMonthly: process.env.STRIPE_PRICE_ID_PRO || 'price_pro_monthly',
    stripePriceIdAnnual: process.env.STRIPE_PRICE_ID_PRO_ANNUAL || 'price_pro_annual',
    features: [
      { key: 'dashboard', label: 'Executive Dashboard', description: 'Core KPIs and metrics' },
      { key: 'morning-brief', label: 'Morning Brief', description: 'Daily email summary' },
      { key: 'daily-wrap', label: 'Daily Wrap', description: 'Evening performance recap' },
      { key: 'unlimited-alerts', label: 'Unlimited Alerts', description: 'Real-time executive alerts' },
      { key: 'ai-reports', label: 'AI-Powered Reports', description: 'Automated weekly reports' },
      { key: 'integrations', label: 'Up to 5 Integrations', description: 'Connect CRM, Ads, Finance' },
      { key: 'historical', label: '90-Day History', description: 'Access to historical data' },
    ],
    maxUsers: 3,
    maxIntegrations: 5,
    maxCampaigns: 10,
    aiReports: true,
    customBranding: false,
    prioritySupport: false,
    apiAccess: false,
  },
  business: {
    id: 'business',
    name: 'Business',
    description: 'For teams that need full business intelligence',
    monthlyPrice: 149,
    annualPrice: 1490,
    stripePriceIdMonthly: process.env.STRIPE_PRICE_ID_BUSINESS || 'price_business_monthly',
    stripePriceIdAnnual: process.env.STRIPE_PRICE_ID_BUSINESS_ANNUAL || 'price_business_annual',
    features: [
      { key: 'dashboard', label: 'Executive Dashboard', description: 'Core KPIs and metrics' },
      { key: 'morning-brief', label: 'Morning Brief', description: 'Daily email summary' },
      { key: 'daily-wrap', label: 'Daily Wrap', description: 'Evening performance recap' },
      { key: 'unlimited-alerts', label: 'Unlimited Alerts', description: 'Real-time executive alerts' },
      { key: 'ai-reports', label: 'AI-Powered Reports', description: 'Automated weekly & monthly reports' },
      { key: 'integrations', label: 'Unlimited Integrations', description: 'Connect all your tools' },
      { key: 'historical', label: 'Unlimited History', description: 'Full historical data access' },
      { key: 'team', label: 'Team Access (10 users)', description: 'Share with your leadership team' },
      { key: 'custom-branding', label: 'Custom Branding', description: 'White-label reports and emails' },
      { key: 'priority-support', label: 'Priority Support', description: '24/7 priority support' },
      { key: 'api', label: 'API Access', description: 'Programmatic access to your data' },
    ],
    maxUsers: 10,
    maxIntegrations: 20,
    maxCampaigns: -1, // unlimited
    aiReports: true,
    customBranding: true,
    prioritySupport: true,
    apiAccess: true,
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom intelligence for large organizations',
    monthlyPrice: -1, // custom pricing
    annualPrice: -1,
    stripePriceIdMonthly: '', // custom — handled via sales
    stripePriceIdAnnual: '',
    features: [
      { key: 'dashboard', label: 'Executive Dashboard', description: 'Core KPIs and metrics' },
      { key: 'morning-brief', label: 'Morning Brief', description: 'Daily email summary' },
      { key: 'daily-wrap', label: 'Daily Wrap', description: 'Evening performance recap' },
      { key: 'unlimited-alerts', label: 'Unlimited Alerts', description: 'Real-time executive alerts' },
      { key: 'ai-reports', label: 'Custom AI Reports', description: 'Tailored reports and insights' },
      { key: 'integrations', label: 'Unlimited Integrations', description: 'Connect all your tools' },
      { key: 'historical', label: 'Unlimited History', description: 'Full historical data access' },
      { key: 'team', label: 'Unlimited Team Members', description: 'Full organization access' },
      { key: 'custom-branding', label: 'Custom Branding', description: 'White-label everything' },
      { key: 'dedicated-support', label: 'Dedicated Support', description: 'Named account manager' },
      { key: 'api', label: 'Full API Access', description: 'Custom API rate limits' },
      { key: 'sso', label: 'SSO/SAML', description: 'Single sign-on integration' },
      { key: 'custom', label: 'Custom Integrations', description: 'Build bespoke data connectors' },
    ],
    maxUsers: -1, // unlimited
    maxIntegrations: -1,
    maxCampaigns: -1,
    aiReports: true,
    customBranding: true,
    prioritySupport: true,
    apiAccess: true,
  },
};

export const DEFAULT_TIER: SubscriptionTier = 'free';

export function getPlan(tier: SubscriptionTier): PlanDefinition {
  return PLANS[tier];
}

export function getPriceId(tier: SubscriptionTier, interval: 'month' | 'year'): string {
  const plan = PLANS[tier];
  return interval === 'month' ? plan.stripePriceIdMonthly : plan.stripePriceIdAnnual;
}

/**
 * Returns the tier from a Stripe Price ID, or 'free' if not found.
 */
export function getTierFromPriceId(priceId: string): SubscriptionTier {
  for (const [tier, plan] of Object.entries(PLANS)) {
    if (plan.stripePriceIdMonthly === priceId || plan.stripePriceIdAnnual === priceId) {
      return tier as SubscriptionTier;
    }
  }
  return 'free';
}