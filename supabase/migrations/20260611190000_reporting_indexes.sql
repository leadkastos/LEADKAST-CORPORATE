-- Add indexes for reporting performance
CREATE INDEX IF NOT EXISTS idx_leads_user_created ON leads(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_ad_metrics_user_date ON ad_metrics(user_id, date);
CREATE INDEX IF NOT EXISTS idx_appointments_user_scheduled ON appointments(user_id, scheduled_at);
CREATE INDEX IF NOT EXISTS idx_action_items_user_created ON action_items(user_id, created_at);
