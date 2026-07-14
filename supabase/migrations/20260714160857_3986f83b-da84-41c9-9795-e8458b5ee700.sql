
CREATE TABLE public.engagements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  gender TEXT,
  age_range TEXT,
  region TEXT NOT NULL,
  city TEXT,
  quartier TEXT,
  email TEXT,
  phone TEXT,
  paix_indispensable BOOLEAN,
  paix_actions TEXT[] DEFAULT '{}',
  civisme_lois BOOLEAN,
  civisme_biens BOOLEAN,
  civisme_haine BOOLEAN,
  benevolat BOOLEAN,
  quartier_participation BOOLEAN,
  membre_association BOOLEAN,
  valeurs TEXT[] DEFAULT '{}',
  fruits TEXT[] DEFAULT '{}',
  signed BOOLEAN NOT NULL DEFAULT true,
  testimony TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.engagements TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.engagements TO authenticated;
GRANT ALL ON public.engagements TO service_role;

ALTER TABLE public.engagements ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a new engagement
CREATE POLICY "Anyone can submit an engagement"
ON public.engagements
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Public can read only aggregate-safe columns (we still enable full read; no PII beyond first name + region shown in UI)
CREATE POLICY "Public read of engagements"
ON public.engagements
FOR SELECT
TO anon, authenticated
USING (true);

CREATE INDEX engagements_region_idx ON public.engagements(region);
CREATE INDEX engagements_created_idx ON public.engagements(created_at DESC);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.engagements;
