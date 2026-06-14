-- Migration: Fix organization_integrations constraints and sync_logs RLS
-- Surgical fixes only. Does NOT create or drop any tables.
-- Addresses two confirmed defects left behind by the multi-tenant transition
-- (20260612213000_multi_tenant_schema.sql):
--   1. The unique(organization_id, integration_id) constraint was left commented
--      out, so the GHL OAuth callback's
--      upsert(..., onConflict: 'organization_id,integration_id') has no matching
--      constraint and fails at runtime.
--   2. The sync_logs SELECT policy still scopes visibility by user_id, which can
--      be null for organization-created integrations after the org transition,
--      silently hiding sync logs.

-- ---------------------------------------------------------------------------
-- 1. Add the missing unique constraint on organization_integrations
--    Guarded so re-running is safe and so it will not error if a row-level
--    duplicate somehow exists (it raises a clear notice instead).
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'organization_integrations_org_integration_key'
  ) THEN
    BEGIN
      ALTER TABLE public.organization_integrations
        ADD CONSTRAINT organization_integrations_org_integration_key
        UNIQUE (organization_id, integration_id);
    EXCEPTION WHEN unique_violation THEN
      RAISE NOTICE 'Cannot add unique(organization_id, integration_id): duplicate rows exist. Resolve duplicates, then re-run this migration.';
    END;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 2. Replace the sync_logs SELECT policy so visibility follows the
--    organization, not the (possibly null) user_id, matching the
--    org-based model the rest of the schema now uses.
--    Relies on get_my_organizations(), defined in 20260612213000.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view their own sync logs." ON public.sync_logs;

CREATE POLICY "Users can view their organization sync logs" ON public.sync_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.organization_integrations oi
      WHERE oi.id = sync_logs.user_integration_id
        AND oi.organization_id IN (SELECT get_my_organizations())
    )
  );
