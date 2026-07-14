
ALTER TABLE public.engagements
  ADD CONSTRAINT engagements_first_name_length CHECK (char_length(first_name) BETWEEN 1 AND 80),
  ADD CONSTRAINT engagements_last_name_length CHECK (char_length(last_name) BETWEEN 1 AND 80),
  ADD CONSTRAINT engagements_region_length CHECK (char_length(region) BETWEEN 1 AND 60),
  ADD CONSTRAINT engagements_city_length CHECK (city IS NULL OR char_length(city) <= 80),
  ADD CONSTRAINT engagements_quartier_length CHECK (quartier IS NULL OR char_length(quartier) <= 80),
  ADD CONSTRAINT engagements_email_length CHECK (email IS NULL OR char_length(email) <= 200),
  ADD CONSTRAINT engagements_phone_length CHECK (phone IS NULL OR char_length(phone) <= 40),
  ADD CONSTRAINT engagements_testimony_length CHECK (testimony IS NULL OR char_length(testimony) <= 500),
  ADD CONSTRAINT engagements_valeurs_size CHECK (array_length(valeurs, 1) IS NULL OR array_length(valeurs, 1) <= 20),
  ADD CONSTRAINT engagements_fruits_size CHECK (array_length(fruits, 1) IS NULL OR array_length(fruits, 1) <= 20),
  ADD CONSTRAINT engagements_actions_size CHECK (array_length(paix_actions, 1) IS NULL OR array_length(paix_actions, 1) <= 20);
