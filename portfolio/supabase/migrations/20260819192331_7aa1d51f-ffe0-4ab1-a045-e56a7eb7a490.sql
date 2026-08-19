create table if not exists public.portfolio_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.portfolio_content to anon, authenticated;
grant all on public.portfolio_content to service_role;

alter table public.portfolio_content enable row level security;

drop policy if exists "portfolio_content_public_read" on public.portfolio_content;
create policy "portfolio_content_public_read"
  on public.portfolio_content for select
  to anon, authenticated
  using (true);

drop policy if exists "portfolio_content_public_write" on public.portfolio_content;
create policy "portfolio_content_public_write"
  on public.portfolio_content for all
  to anon, authenticated
  using (true)
  with check (true);