-- Phase 2: Billing Integration with Multi-Tenant Organizations
-- This migration updates the billing system to work with organization-based scoping
-- after the multi-tenant schema transition (20260612213000)

-- 1. Create organization-level tier lookup function
CREATE OR REPLACE FUNCTION get_organization_tier(p_org_id UUID)
RETURNS subscription_tier
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  org_tier subscription_tier;
BEGIN
  SELECT tier INTO org_tier FROM public.subscriptions WHERE organization_id = p_org_id;
  RETURN COALESCE(org_tier, 'free'::subscription_tier);
END;
$$;

-- 2. Update get_user_tier to delegate to organization tier
CREATE OR REPLACE FUNCTION get_user_tier(p_user_id UUID)
RETURNS subscription_tier
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_org_id UUID;
  org_tier subscription_tier;
BEGIN
  -- Get the user's primary organization
  SELECT organization_id INTO user_org_id FROM profiles WHERE id = p_user_id;
  IF user_org_id IS NOT NULL THEN
    SELECT tier INTO org_tier FROM public.subscriptions WHERE organization_id = user_org_id;
    RETURN COALESCE(org_tier, 'free'::subscription_tier);
  END IF;
  -- Fallback: check by user_id directly
  SELECT tier INTO org_tier FROM public.subscriptions WHERE user_id = p_user_id;
  RETURN COALESCE(org_tier, 'free'::subscription_tier);
END;
$$;

-- 3. Update create_default_subscription to include organization_id
CREATE OR REPLACE FUNCTION create_default_subscription()
RETURNS TRIGGER AS $$
DECLARE
  user_org_id UUID;
BEGIN
  -- Get the user's organization from their profile
  SELECT organization_id INTO user_org_id FROM profiles WHERE id = NEW.id;

  INSERT INTO public.subscriptions (user_id, organization_id, tier, status)
  VALUES (NEW.id, user_org_id, 'free', 'active')
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Drop and recreate the trigger
DROP TRIGGER IF EXISTS trg_create_subscription_on_signup ON auth.users;
CREATE TRIGGER trg_create_subscription_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_default_subscription();

-- 5. Enable the org-level unique constraint (commented out in multi-tenant migration)
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS unique_org_subscription;
ALTER TABLE subscriptions ADD CONSTRAINT unique_org_subscription UNIQUE (organization_id);

-- 6. Add index on organization_id
CREATE INDEX IF NOT EXISTS idx_subscriptions_organization_id ON subscriptions (organization_id);

-- 7. Add service role policies for webhook operations
DROP POLICY IF EXISTS "Service role can manage all subscriptions" ON subscriptions;
CREATE POLICY "Service role can manage all subscriptions" ON subscriptions
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Owners can manage their organization subscription" ON subscriptions;
CREATE POLICY "Owners can manage their organization subscription" ON subscriptions
  FOR UPDATE
  USING (organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
  ));