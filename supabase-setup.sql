-- Ejecuta este archivo en Supabase > SQL Editor, una sola vez.
create extension if not exists pgcrypto;

create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.portfolio_admins enable row level security;
drop policy if exists "admins can read own admin record" on public.portfolio_admins;
create policy "admins can read own admin record" on public.portfolio_admins
  for select to authenticated using (user_id = auth.uid());
grant select on public.portfolio_admins to authenticated;

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  course text not null check (course in ('algoritmos','apps')),
  section text not null,
  title text not null,
  description text not null default '',
  file_path text not null unique,
  public_url text not null,
  original_name text not null,
  content_type text not null default 'application/octet-stream',
  created_at timestamptz not null default now(),
  constraint valid_course_section check (
    (course = 'algoritmos' and section ~ '^week-(0[1-9]|1[0-6])$') or
    (course = 'apps' and (section in ('taller-1','taller-2') or section ~ '^taller-1-week-0[1-8]$' or section ~ '^taller-2-week-(0[9]|1[0-8])$'))
  )
);
-- Si la tabla ya existía, actualiza su restricción para las semanas de ambos talleres.
alter table public.portfolio_items drop constraint if exists valid_course_section;
alter table public.portfolio_items add constraint valid_course_section check (
  (course = 'algoritmos' and section ~ '^week-(0[1-9]|1[0-6])$') or
  (course = 'apps' and (section in ('taller-1','taller-2') or section ~ '^taller-1-week-0[1-8]$' or section ~ '^taller-2-week-(0[9]|1[0-8])$'))
);
alter table public.portfolio_items enable row level security;
grant select on public.portfolio_items to anon, authenticated;
grant insert, delete on public.portfolio_items to authenticated;
drop policy if exists "published work is public" on public.portfolio_items;
create policy "published work is public" on public.portfolio_items for select to anon, authenticated using (true);
drop policy if exists "admins can publish work" on public.portfolio_items;
create policy "admins can publish work" on public.portfolio_items for insert to authenticated
  with check (exists (select 1 from public.portfolio_admins a where a.user_id = auth.uid()));
drop policy if exists "admins can remove work" on public.portfolio_items;
create policy "admins can remove work" on public.portfolio_items for delete to authenticated
  using (exists (select 1 from public.portfolio_admins a where a.user_id = auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-files', 'portfolio-files', true, 52428800,
  array['image/jpeg','image/png','image/webp','image/gif','image/avif','application/pdf',
    'application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip','application/x-zip-compressed','text/plain','text/csv','text/x-sql',
    'application/octet-stream']
) on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
drop policy if exists "portfolio files are publicly readable" on storage.objects;
create policy "portfolio files are publicly readable" on storage.objects for select to anon, authenticated
  using (bucket_id = 'portfolio-files');
drop policy if exists "admins can upload portfolio files" on storage.objects;
create policy "admins can upload portfolio files" on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio-files' and exists (select 1 from public.portfolio_admins a where a.user_id = auth.uid()));
drop policy if exists "admins can delete portfolio files" on storage.objects;
create policy "admins can delete portfolio files" on storage.objects for delete to authenticated
  using (bucket_id = 'portfolio-files' and exists (select 1 from public.portfolio_admins a where a.user_id = auth.uid()));

-- Rate limit for the public AI endpoint; only the Edge Function service role can use it.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
create table if not exists private.jheyvx_chat_limits (
  ip_hash text primary key,
  window_started timestamptz not null,
  request_count integer not null
);
revoke all on private.jheyvx_chat_limits from public, anon, authenticated;
create or replace function public.take_jheyvx_chat_slot(p_ip_hash text)
returns boolean language plpgsql security definer set search_path = '' as $$
declare v_count integer;
begin
  delete from private.jheyvx_chat_limits where window_started < now() - interval '1 day';
  insert into private.jheyvx_chat_limits as current_limit(ip_hash, window_started, request_count)
  values (p_ip_hash, now(), 1)
  on conflict (ip_hash) do update set
    window_started = case when now() - current_limit.window_started >= interval '1 minute' then now() else current_limit.window_started end,
    request_count = case when now() - current_limit.window_started >= interval '1 minute' then 1 else current_limit.request_count + 1 end
  returning request_count into v_count;
  return v_count <= 12;
end;
$$;
revoke all on function public.take_jheyvx_chat_slot(text) from public, anon, authenticated;
grant execute on function public.take_jheyvx_chat_slot(text) to service_role;
