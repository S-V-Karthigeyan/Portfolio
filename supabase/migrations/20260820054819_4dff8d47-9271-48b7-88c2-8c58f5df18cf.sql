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

drop policy if exists "portfolio_images_public_read" on storage.objects;
create policy "portfolio_images_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'portfolio-images');

drop policy if exists "portfolio_images_public_write" on storage.objects;
create policy "portfolio_images_public_write"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'portfolio-images');

drop policy if exists "portfolio_images_public_update" on storage.objects;
create policy "portfolio_images_public_update"
  on storage.objects for update
  to anon, authenticated
  using (bucket_id = 'portfolio-images')
  with check (bucket_id = 'portfolio-images');

drop policy if exists "portfolio_images_public_delete" on storage.objects;
create policy "portfolio_images_public_delete"
  on storage.objects for delete
  to anon, authenticated
  using (bucket_id = 'portfolio-images');