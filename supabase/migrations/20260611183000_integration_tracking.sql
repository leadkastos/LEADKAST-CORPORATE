-- Table for available integration types
create table integrations (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  icon_url text,
  category text not null,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Table for user-specific integration connections
create table user_integrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  integration_id uuid references integrations on delete cascade not null,
  status text check (status in ('active', 'inactive', 'error', 'disconnected')) default 'inactive',
  credentials jsonb, -- Store encrypted tokens or API keys
  settings jsonb default '{}',
  last_synced_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, integration_id)
);

-- Table for sync logs
create table sync_logs (
  id uuid primary key default gen_random_uuid(),
  user_integration_id uuid references user_integrations on delete cascade not null,
  status text check (status in ('success', 'error', 'in_progress')) not null,
  message text,
  error_details jsonb,
  started_at timestamp with time zone default now(),
  completed_at timestamp with time zone,
  records_processed integer default 0
);

-- Set up Row Level Security (RLS)
alter table integrations enable row level security;
alter table user_integrations enable row level security;
alter table sync_logs enable row level security;

-- Integrations are viewable by all authenticated users
create policy "Integrations are viewable by authenticated users." on integrations
  for select using (auth.role() = 'authenticated');

-- User integrations are only viewable/manageable by the owner
create policy "Users can view their own integrations." on user_integrations
  for select using (auth.uid() = user_id);

create policy "Users can manage their own integrations." on user_integrations
  for all using (auth.uid() = user_id);

-- Sync logs are viewable by the integration owner
create policy "Users can view their own sync logs." on sync_logs
  for select using (
    exists (
      select 1 from user_integrations 
      where user_integrations.id = sync_logs.user_integration_id 
      and user_integrations.user_id = auth.uid()
    )
  );

-- Insert Phase 1 active integrations
insert into integrations (name, slug, description, category) values
('GoHighLevel', 'gohighlevel', 'All-in-one sales and marketing platform.', 'CRM'),
('Meta Ads', 'meta-ads', 'Manage and track Facebook and Instagram ad campaigns.', 'Marketing'),
('Google Ads', 'google-ads', 'Track performance of Google Search and Display ads.', 'Marketing'),
('Google Business Profile', 'google-business', 'Manage local business presence and reviews.', 'Sales');
