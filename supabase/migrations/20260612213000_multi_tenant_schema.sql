-- Migration: Multi-Tenant Architecture (Organizations)
-- This migration transitions the schema from user-based scoping to organization-based scoping.

-- 1. Create Organizations Table
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Organization Members junction table
CREATE TABLE IF NOT EXISTS organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT CHECK (role IN ('owner', 'admin', 'member')) DEFAULT 'member',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);

-- 3. Backfill Organizations for existing users
DO $$
DECLARE
    user_record RECORD;
    new_org_id UUID;
BEGIN
    FOR user_record IN SELECT id, email FROM auth.users LOOP
        -- Create a default organization for each user
        INSERT INTO organizations (name, slug)
        VALUES (COALESCE(user_record.email, 'Organization'), 'org-' || substring(user_record.id::text, 1, 8))
        RETURNING id INTO new_org_id;

        -- Add user as owner
        INSERT INTO organization_members (organization_id, user_id, role)
        VALUES (new_org_id, user_record.id, 'owner');
    END LOOP;
END $$;

-- 4. Transition Profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
UPDATE profiles p SET organization_id = om.organization_id 
FROM organization_members om 
WHERE p.id = om.user_id;

-- 5. Transition Subscriptions
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS unique_user_subscription;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
UPDATE subscriptions s SET organization_id = p.organization_id 
FROM profiles p 
WHERE s.user_id = p.id;
-- Once backfilled, we can ideally make it NOT NULL and UNIQUE per org
-- ALTER TABLE subscriptions ALTER COLUMN organization_id SET NOT NULL;
-- ALTER TABLE subscriptions ADD CONSTRAINT unique_org_subscription UNIQUE (organization_id);

-- 6. Transition Integrations
ALTER TABLE user_integrations RENAME TO organization_integrations;
ALTER TABLE organization_integrations ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
UPDATE organization_integrations oi SET organization_id = p.organization_id 
FROM profiles p 
WHERE oi.user_id = p.id;
-- Unique per org+integration
ALTER TABLE organization_integrations DROP CONSTRAINT IF EXISTS user_integrations_user_id_integration_id_key;
-- ALTER TABLE organization_integrations ADD CONSTRAINT unique_org_integration UNIQUE (organization_id, integration_id);

-- 7. Transition Data Tables
-- Ad Metrics
ALTER TABLE ad_metrics ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
UPDATE ad_metrics t SET organization_id = p.organization_id FROM profiles p WHERE t.user_id = p.id;

-- Leads
ALTER TABLE leads ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
UPDATE leads t SET organization_id = p.organization_id FROM profiles p WHERE t.user_id = p.id;

-- Action Items
ALTER TABLE action_items ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
UPDATE action_items t SET organization_id = p.organization_id FROM profiles p WHERE t.user_id = p.id;

-- Alerts
ALTER TABLE alerts ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
UPDATE alerts t SET organization_id = p.organization_id FROM profiles p WHERE t.user_id = p.id;

-- Appointments
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
UPDATE appointments t SET organization_id = p.organization_id FROM profiles p WHERE t.user_id = p.id;

-- Reviews
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
UPDATE reviews t SET organization_id = p.organization_id FROM profiles p WHERE t.user_id = p.id;

-- 8. Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- 9. RLS Policies
CREATE POLICY "Users can view organizations they belong to" ON organizations FOR SELECT USING (id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));
CREATE POLICY "Owners can update their organization" ON organizations FOR UPDATE USING (id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid() AND role = 'owner'));
CREATE POLICY "Members can view other members in same org" ON organization_members FOR SELECT USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));

-- 10. Update existing RLS policies to be organization-based
CREATE OR REPLACE FUNCTION get_my_organizations()
RETURNS setof uuid AS $$
    SELECT organization_id FROM organization_members WHERE user_id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
DROP POLICY IF EXISTS "Users can view profiles in their organization" ON profiles;
CREATE POLICY "Users can view profiles in their organization" ON profiles FOR SELECT USING (organization_id IN (SELECT get_my_organizations()) OR id = auth.uid());

-- Subscriptions
DROP POLICY IF EXISTS "Users can view their own subscription" ON subscriptions;
CREATE POLICY "Users can view their organization subscription" ON subscriptions FOR SELECT USING (organization_id IN (SELECT get_my_organizations()));

-- Integrations
DROP POLICY IF EXISTS "Users can view their own integrations." ON organization_integrations;
CREATE POLICY "Users can view their organization integrations" ON organization_integrations FOR SELECT USING (organization_id IN (SELECT get_my_organizations()));
CREATE POLICY "Members can manage their organization integrations" ON organization_integrations FOR ALL USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid() AND role IN ('owner', 'admin')));

-- Data Tables
DROP POLICY IF EXISTS "Users can view their own ad metrics" ON ad_metrics;
CREATE POLICY "Users can view their organization ad metrics" ON ad_metrics FOR SELECT USING (organization_id IN (SELECT get_my_organizations()));

DROP POLICY IF EXISTS "Users can view their own leads" ON leads;
CREATE POLICY "Users can view their organization leads" ON leads FOR SELECT USING (organization_id IN (SELECT get_my_organizations()));

DROP POLICY IF EXISTS "Users can view their own alerts" ON alerts;
CREATE POLICY "Users can view their organization alerts" ON alerts FOR SELECT USING (organization_id IN (SELECT get_my_organizations()));

DROP POLICY IF EXISTS "Users can view their own action items" ON action_items;
CREATE POLICY "Users can view their organization action items" ON action_items FOR SELECT USING (organization_id IN (SELECT get_my_organizations()));

DROP POLICY IF EXISTS "Users can view their own appointments" ON appointments;
CREATE POLICY "Users can view their organization appointments" ON appointments FOR SELECT USING (organization_id IN (SELECT get_my_organizations()));

DROP POLICY IF EXISTS "Users can view their own reviews" ON reviews;
CREATE POLICY "Users can view their organization reviews" ON reviews FOR SELECT USING (organization_id IN (SELECT get_my_organizations()));

-- 11. Update Revenue Recovery Function to handle organizations
CREATE OR REPLACE FUNCTION generate_revenue_recovery_actions_v2(p_org_id UUID, p_user_id UUID) 
RETURNS VOID AS $
BEGIN
    INSERT INTO action_items (organization_id, user_id, title, description, priority, category, related_lead_id, due_at)
    SELECT 
        organization_id,
        p_user_id,
        'Revenue Recovery: Follow up with ' || first_name || ' ' || last_name,
        'Lead has been dormant for more than 7 days. Re-engage to recover potential revenue.',
        'high',
        'revenue_recovery',
        id,
        NOW() + INTERVAL '1 day'
    FROM leads
    WHERE organization_id = p_org_id 
      AND status NOT IN ('won', 'lost', 'dormant')
      AND last_activity_at < NOW() - INTERVAL '7 days'
      AND NOT EXISTS (
          SELECT 1 FROM action_items 
          WHERE related_lead_id = leads.id 
            AND status = 'pending' 
            AND category = 'revenue_recovery'
      );
END;
$ LANGUAGE plpgsql;

-- 12. Update Marketing Intelligence View
DROP VIEW IF EXISTS marketing_intelligence_summary;
CREATE OR REPLACE VIEW marketing_intelligence_summary AS
SELECT 
    organization_id,
    SUM(spend) as total_spend,
    SUM(impressions) as total_impressions,
    SUM(clicks) as total_clicks,
    SUM(leads) as total_leads,
    SUM(appointments) as total_appointments,
    CASE 
        WHEN SUM(leads) > 0 THEN SUM(spend) / SUM(leads) 
        ELSE 0 
    END as cost_per_lead,
    CASE 
        WHEN SUM(appointments) > 0 THEN SUM(spend) / SUM(appointments) 
        ELSE 0 
    END as cost_per_appointment
FROM ad_metrics
GROUP BY organization_id;

-- 13. Update Engagement Logs
ALTER TABLE engagement_logs ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id);
UPDATE engagement_logs t SET organization_id = p.organization_id FROM profiles p WHERE t.user_id = p.id;
DROP POLICY IF EXISTS "Users can view their own engagement logs" ON engagement_logs;
CREATE POLICY "Users can view their organization engagement logs" ON engagement_logs FOR SELECT USING (organization_id IN (SELECT get_my_organizations()));
DROP POLICY IF EXISTS "Users can insert their own engagement logs" ON engagement_logs;
CREATE POLICY "Users can insert their organization engagement logs" ON engagement_logs FOR INSERT WITH CHECK (organization_id IN (SELECT get_my_organizations()));

-- 14. Update Executive Analytics View
DROP VIEW IF EXISTS executive_analytics_kpis;
CREATE OR REPLACE VIEW executive_analytics_kpis AS
WITH org_metrics AS (
    SELECT 
        o.id as organization_id,
        (SELECT count(*) FROM organization_integrations ui WHERE ui.organization_id = o.id AND ui.status = 'active') as active_integrations,
        (SELECT count(*) FROM alerts a WHERE a.organization_id = o.id) as total_alerts,
        (SELECT count(*) FROM alerts a WHERE a.organization_id = o.id AND a.status = 'resolved') as resolved_alerts,
        (SELECT count(*) FROM engagement_logs el WHERE el.organization_id = o.id AND el.event_type = 'dashboard_login') as dashboard_logins,
        (SELECT count(*) FROM engagement_logs el WHERE el.organization_id = o.id AND el.event_type = 'morning_brief_open') as morning_brief_opens
    FROM organizations o
)
SELECT 
    organization_id,
    active_integrations as connectedness_score,
    CASE 
        WHEN total_alerts > 0 THEN (resolved_alerts::float / total_alerts::float) * 100 
        ELSE 0 
    END as alert_action_rate,
    dashboard_logins,
    morning_brief_opens,
    (dashboard_logins + morning_brief_opens) as total_engagement_score
FROM org_metrics;
