-- Create ad_metrics table
CREATE TABLE IF NOT EXISTS ad_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    integration_id UUID REFERENCES integrations(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    spend NUMERIC(12, 2) DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    leads INTEGER DEFAULT 0,
    appointments INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, integration_id, date)
);

-- Enable RLS
ALTER TABLE ad_metrics ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own ad metrics"
    ON ad_metrics FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ad metrics"
    ON ad_metrics FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ad metrics"
    ON ad_metrics FOR UPDATE
    USING (auth.uid() = user_id);

-- Create a view for aggregated marketing KPIs
CREATE OR REPLACE VIEW marketing_intelligence_summary AS
SELECT 
    user_id,
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
GROUP BY user_id;
