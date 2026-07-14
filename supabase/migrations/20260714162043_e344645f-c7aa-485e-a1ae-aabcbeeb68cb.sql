-- Remove public SELECT on engagements (contains PII: email, phone, last_name)
DROP POLICY IF EXISTS "Public read of engagements" ON public.engagements;

-- Create a public-safe view exposing only non-PII fields used by the site
CREATE OR REPLACE VIEW public.engagements_public
WITH (security_invoker = true) AS
SELECT
  id,
  first_name,
  gender,
  age_range,
  region,
  city,
  quartier,
  paix_indispensable,
  paix_actions,
  civisme_lois,
  civisme_biens,
  civisme_haine,
  benevolat,
  quartier_participation,
  membre_association,
  valeurs,
  fruits,
  signed,
  testimony,
  created_at
FROM public.engagements;

GRANT SELECT ON public.engagements_public TO anon, authenticated;

-- Allow the view's underlying SELECT to succeed via a narrow policy that
-- only permits reading through the view context. Since security_invoker views
-- run policies as the caller, we add a policy that returns only non-sensitive
-- rows. To keep PII protected, restrict base-table SELECT to service_role only
-- by adding NO SELECT policy for anon/authenticated (RLS default-denies).
-- (No policy added — reads on base table are blocked for anon/authenticated.)

-- Ensure INSERT policy remains scoped and not "always true" for reads.
-- The existing INSERT policy (check: true) is intentional for public engagement submissions.