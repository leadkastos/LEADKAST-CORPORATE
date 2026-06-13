-- Table for engagement logs
CREATE TABLE IF NOT EXISTS engagement_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    event_type TEXT NOT NULL, -- dashboard_login, morning_brief_open, report_download
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE engagement_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own engagement logs" ON engagement_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own engagement logs" ON engagement_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create a view for Executive Analytics KPIs
CREATE OR REPLACE VIEW executive_analytics_kpis AS
WITH user_metrics AS (
    SELECT 
        p.id as user_id,
        (SELECT count(*) FROM user_integrations ui WHERE ui.user_id = p.id AND ui.status = 'active') as active_integrations,
        (SELECT count(*) FROM alerts a WHERE a.user_id = p.id) as total_alerts,
        (SELECT count(*) FROM alerts a WHERE a.user_id = p.id AND a.status = 'resolved') as resolved_alerts,
        (SELECT count(*) FROM engagement_logs el WHERE el.user_id = p.id AND el.event_type = 'dashboard_login') as dashboard_logins,
        (SELECT count(*) FROM engagement_logs el WHERE el.user_id = p.id AND el.event_type = 'morning_brief_open') as morning_brief_opens
    FROM profiles p
)
SELECT 
    user_id,
    active_integrations as connectedness_score,
    CASE 
        WHEN total_alerts > 0 THEN (resolved_alerts::float / total_alerts::float) * 100 
        ELSE 0 
    END as alert_action_rate,
    dashboard_logins,
    morning_brief_opens,
    (dashboard_logins + morning_brief_opens) as total_engagement_score
FROM user_metrics;

-- Grant access to the view
ALTER VIEW executive_analytics_kpis OWNER TO postgres;
GRANT SELECT ON executive_analytics_kpis TO authenticated;
GRANT SELECT ON executive_analytics_kpis TO service_role;
