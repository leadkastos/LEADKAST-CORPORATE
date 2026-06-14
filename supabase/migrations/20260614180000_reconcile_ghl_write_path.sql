-- Migration: Reconcile GHL write path (leads + ad_metrics)
-- Purpose: make the schema match what GHLAdapter.sync() writes, using the
-- organization-owned model. Additive and policy-swap only. Does NOT touch
-- billing tables or organization_integrations.
--
-- Defects addressed (all confirmed against GHLAdapter.sync()):
--   leads:
--     - adapter writes leads.external_id, which did not exist
--     - adapter upserts onConflict(organization_id, external_id) with no
--       matching unique constraint
--     - adapter omits user_id, but user_id was NOT NULL
--     - INSERT/UPDATE RLS were still user-scoped (auth.uid() = user_id),
--       blocking org-scoped writes
--   ad_metrics:
--     - adapter upserts onConflict(organization_id, integration_id, date) but
--       the unique key was (user_id, integration_id, date)
--     - adapter omits user_id, but user_id was NOT NULL
--     - no INSERT/UPDATE RLS policy existed at all
--
-- Relies on get_my_organizations() (defined in 20260612213000).

-- ===========================================================================
-- 1. LEADS
-- ===========================================================================

-- 1a. Org-owned model: user_id no longer required.
ALTER TABLE public.leads ALTER COLUMN user_id DROP NOT NULL;

-- 1b. Add external_id used by the GHL adapter to dedupe contacts.
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS external_id TEXT;

-- 1c. Unique index so onConflict(organization_id, external_id) works.
--     Non-partial so PostgREST can reliably infer the conflict target.
--     Postgres treats NULLs as distinct in a unique index, so multiple
--     manual/seed leads with NULL external_id do NOT collide.
CREATE UNIQUE INDEX IF NOT EXISTS leads_org_external_id_key
  ON public.leads (organization_id, external_id);

-- 1d. Dashboard read index (existing index is user_id-based; reads are by org).
CREATE INDEX IF NOT EXISTS idx_leads_org_created
  ON public.leads (organization_id, created_at);

-- 1e. Replace the dangling user-scoped INSERT/UPDATE policies with org-scoped
--     ones. The SELECT policy was already org-scoped in 20260612213000.
DROP POLICY IF EXISTS "Users can insert their own leads" ON public.leads;
DROP POLICY IF EXISTS "Users can update their own leads" ON public.leads;

CREATE POLICY "Members can insert organization leads" ON public.leads
  FOR INSERT WITH CHECK (organization_id IN (SELECT get_my_organizations()));

CREATE POLICY "Members can update organization leads" ON public.leads
  FOR UPDATE USING (organization_id IN (SELECT get_my_organizations()))
  WITH CHECK (organization_id IN (SELECT get_my_organizations()));

-- ===========================================================================
-- 2. AD_METRICS
-- ===========================================================================

-- 2a. Org-owned model: user_id no longer required.
ALTER TABLE public.ad_metrics ALTER COLUMN user_id DROP NOT NULL;

-- 2b. Unique key matching the adapter's onConflict target.
--     The original table-level UNIQUE(user_id, integration_id, date) is left in
--     place (harmless once user_id is nullable); we add the org-based key the
--     adapter actually uses.
CREATE UNIQUE INDEX IF NOT EXISTS ad_metrics_org_integration_date_key
  ON public.ad_metrics (organization_id, integration_id, date);

-- 2c. Dashboard read index.
CREATE INDEX IF NOT EXISTS idx_ad_metrics_org_date
  ON public.ad_metrics (organization_id, date);

-- 2d. Add the INSERT/UPDATE policies that never existed (only SELECT did).
CREATE POLICY "Members can insert organization ad metrics" ON public.ad_metrics
  FOR INSERT WITH CHECK (organization_id IN (SELECT get_my_organizations()));

CREATE POLICY "Members can update organization ad metrics" ON public.ad_metrics
  FOR UPDATE USING (organization_id IN (SELECT get_my_organizations()))
  WITH CHECK (organization_id IN (SELECT get_my_organizations()));
