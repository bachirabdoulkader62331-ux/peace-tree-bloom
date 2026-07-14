DROP POLICY IF EXISTS "Anyone can submit an engagement" ON public.engagements;

CREATE POLICY "Anyone can submit a signed engagement"
ON public.engagements
FOR INSERT
TO anon, authenticated
WITH CHECK (
  signed = true
  AND length(btrim(first_name)) BETWEEN 1 AND 80
  AND length(btrim(last_name)) BETWEEN 1 AND 80
  AND length(btrim(region)) BETWEEN 1 AND 80
  AND (email IS NULL OR length(email) <= 200)
  AND (phone IS NULL OR length(phone) <= 40)
  AND (testimony IS NULL OR length(testimony) <= 500)
);