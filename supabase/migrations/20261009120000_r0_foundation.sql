-- R0 foundation (TASKS T3.1–T3.3): brands, categories, enquiries, newsletter subscribers, storage.
-- Conventions (RULES §4): uuid ids, created_at/updated_at with trigger, RLS on every table.

-- updated_at trigger ---------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- brands ----------------------------------------------------------------------
create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_path text,
  description text,
  product_types text[] not null default '{}',
  is_authorised boolean not null default false,
  is_featured boolean not null default false,
  sort integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index brands_active_sort_idx on public.brands (is_active, sort);
create trigger brands_set_updated_at before update on public.brands
  for each row execute function public.set_updated_at();

-- categories (full tree schema; R0 uses the top level) -------------------------
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  parent_id uuid references public.categories (id) on delete restrict,
  path text,
  icon text,
  image_path text,
  image_alt text,
  sort integer not null default 0,
  spec_filters jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index categories_parent_idx on public.categories (parent_id);
create index categories_active_sort_idx on public.categories (is_active, sort);
create trigger categories_set_updated_at before update on public.categories
  for each row execute function public.set_updated_at();

-- enquiries (R0 lead table; converts to RFQs in R1) ----------------------------
create type public.enquiry_type as enum ('contact', 'quote', 'price_list', 'dealer', 'support');
create type public.enquiry_status as enum ('new', 'contacted', 'qualified', 'closed', 'spam');

create sequence public.enquiry_number_seq;

create or replace function public.next_enquiry_number()
returns text
language sql
as $$
  select 'ENQ-' || to_char(now() at time zone 'Asia/Kolkata', 'YYYY') || '-'
    || lpad(nextval('public.enquiry_number_seq')::text, 5, '0');
$$;

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  number text not null unique default public.next_enquiry_number(),
  type public.enquiry_type not null,
  status public.enquiry_status not null default 'new',
  name text not null check (char_length(name) between 2 and 100),
  mobile text not null check (mobile ~ '^[6-9][0-9]{9}$'),
  email text check (email is null or char_length(email) <= 254),
  company text check (company is null or char_length(company) <= 150),
  gstin text check (gstin is null or gstin ~ '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$'),
  message text not null check (char_length(message) between 5 and 4000),
  brand_id uuid references public.brands (id) on delete set null,
  category_id uuid references public.categories (id) on delete set null,
  attachment_path text,
  assigned_to uuid,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  consent_at timestamptz not null,
  rfq_id uuid, -- FK added with the rfqs table in R1 (TASKS T7.4)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index enquiries_status_created_idx on public.enquiries (status, created_at desc);
create index enquiries_type_idx on public.enquiries (type);
create index enquiries_brand_idx on public.enquiries (brand_id);
create index enquiries_category_idx on public.enquiries (category_id);
create trigger enquiries_set_updated_at before update on public.enquiries
  for each row execute function public.set_updated_at();

-- newsletter subscribers -------------------------------------------------------
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null check (char_length(email) <= 254),
  topic text not null default 'newsletter' check (topic in ('newsletter', 'online_ordering_launch')),
  consent_at timestamptz not null,
  unsubscribed_at timestamptz,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (email, topic)
);
create trigger newsletter_subscribers_set_updated_at before update on public.newsletter_subscribers
  for each row execute function public.set_updated_at();

-- Row-Level Security (ARCHITECTURE §8) -----------------------------------------
alter table public.brands enable row level security;
alter table public.categories enable row level security;
alter table public.enquiries enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "Public can read active brands" on public.brands
  for select to anon, authenticated using (is_active);
create policy "Public can read active categories" on public.categories
  for select to anon, authenticated using (is_active);
-- enquiries / newsletter_subscribers: no policies for anon/authenticated → no access.
-- Inserts go through the server action with the service role (which bypasses RLS).
-- Staff read access arrives with profiles + is_staff() in R1 (TASKS T7.1).

-- Storage (T3.3) ---------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('public-media', 'public-media', true, 5242880,
    array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/avif']),
  ('enquiry-attachments', 'enquiry-attachments', false, 10485760,
    array[
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
      'image/jpeg',
      'image/png',
      'image/webp'
    ])
on conflict (id) do nothing;

create policy "Public can read public media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'public-media');
-- enquiry-attachments: private; service role only (no policies for anon/authenticated).
