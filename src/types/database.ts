export interface Integration {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_url: string | null;
  category: string;
  is_active: boolean;
  created_at: string;
}

export interface UserIntegration {
  id: string;
  user_id: string;
  integration_id: string;
  status: 'active' | 'inactive' | 'error' | 'disconnected';
  credentials: any;
  settings: any;
  last_synced_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SyncLog {
  id: string;
  user_integration_id: string;
  status: 'success' | 'error' | 'in_progress';
  message: string | null;
  error_details: any;
  started_at: string;
  completed_at: string | null;
  records_processed: number;
}
