-- Create leads table (CRM simulation)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    status TEXT DEFAULT 'new', -- new, contact_attempted, spoke, qualified, lost, won, dormant
    source TEXT,
    last_activity_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create action_items table
CREATE TABLE IF NOT EXISTS action_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'medium', -- low, medium, high, critical
    status TEXT DEFAULT 'pending', -- pending, completed, dismissed
    category TEXT DEFAULT 'general', -- revenue_recovery, marketing, appointment, follow_up
    related_lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    due_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_items ENABLE ROW LEVEL SECURITY;

-- Policies for leads
CREATE POLICY "Users can view their own leads" ON leads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own leads" ON leads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own leads" ON leads FOR UPDATE USING (auth.uid() = user_id);

-- Policies for action_items
CREATE POLICY "Users can view their own action items" ON action_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own action items" ON action_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own action items" ON action_items FOR UPDATE USING (auth.uid() = user_id);

-- Mock dormant leads logic (Revenue Recovery)
CREATE OR REPLACE FUNCTION generate_revenue_recovery_actions(p_user_id UUID) 
RETURNS VOID AS $$
BEGIN
    -- Identify leads with no activity for more than 7 days that are not won/lost
    INSERT INTO action_items (user_id, title, description, priority, category, related_lead_id, due_at)
    SELECT 
        user_id,
        'Revenue Recovery: Follow up with ' || first_name || ' ' || last_name,
        'Lead has been dormant for more than 7 days. Re-engage to recover potential revenue.',
        'high',
        'revenue_recovery',
        id,
        NOW() + INTERVAL '1 day'
    FROM leads
    WHERE user_id = p_user_id 
      AND status NOT IN ('won', 'lost', 'dormant')
      AND last_activity_at < NOW() - INTERVAL '7 days'
      AND NOT EXISTS (
          SELECT 1 FROM action_items 
          WHERE related_lead_id = leads.id 
            AND status = 'pending' 
            AND category = 'revenue_recovery'
      );
END;
$$ LANGUAGE plpgsql;
