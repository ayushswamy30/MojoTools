-- SEED — demo data for local development and previews. Mirrors src/features/content/site.ts.
-- Replace with the owner's real brand and category lists (TASKS T3.4, T0.5).

insert into public.brands (name, slug, description, product_types, is_featured, sort) values
  ('Brand A', 'brand-a', 'SEED placeholder', array['Power Tools', 'Hand Tools'], true, 1),
  ('Brand B', 'brand-b', 'SEED placeholder', array['Power Tools', 'Measuring'], true, 2),
  ('Brand C', 'brand-c', 'SEED placeholder', array['Hand Tools', 'Fasteners & Hardware'], true, 3),
  ('Brand D', 'brand-d', 'SEED placeholder', array['Machinery'], true, 4),
  ('Brand E', 'brand-e', 'SEED placeholder', array['Safety'], true, 5),
  ('Brand F', 'brand-f', 'SEED placeholder', array['Measuring', 'Hand Tools'], true, 6),
  ('Brand G', 'brand-g', 'SEED placeholder', array['Fasteners & Hardware'], false, 7),
  ('Brand H', 'brand-h', 'SEED placeholder', array['Machinery', 'Power Tools'], false, 8);

insert into public.categories (name, slug, icon, sort) values
  ('Power Tools', 'power-tools', 'drill', 1),
  ('Hand Tools', 'hand-tools', 'wrench', 2),
  ('Machinery', 'machinery', 'factory', 3),
  ('Measuring & Testing', 'measuring-testing', 'ruler', 4),
  ('Cutting & Abrasives', 'cutting-abrasives', 'disc', 5),
  ('Fasteners & Hardware', 'fasteners-hardware', 'nut', 6),
  ('Safety & PPE', 'safety-ppe', 'hard-hat', 7),
  ('Welding', 'welding', 'flame', 8);
