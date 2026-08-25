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