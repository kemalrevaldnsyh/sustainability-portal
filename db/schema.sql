create extension if not exists pgcrypto;

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  code text,
  type text not null,
  version text,
  period text,
  scope text,
  jurisdiction text,
  body text,
  reference_no text,
  status text,
  submitted_date date,
  issuer text,
  certificate_no text,
  issued date,
  expires date,
  license_no text,
  issued_by text,
  description text,
  updated_by text,
  updated_at date,
  effective_date date,
  action text default 'View',
  category text not null,
  ou_name text,
  created_at timestamptz not null default now()
);

create index if not exists idx_documents_category on public.documents(category);
create index if not exists idx_documents_ou_name on public.documents(ou_name);
