CREATE TABLE public.site_data (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_data TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_data TO authenticated;
GRANT ALL ON public.site_data TO service_role;
ALTER TABLE public.site_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site_data readable by everyone" ON public.site_data FOR SELECT USING (true);
CREATE POLICY "site_data writable by authenticated" ON public.site_data FOR ALL TO authenticated USING (true) WITH CHECK (true);
INSERT INTO public.site_data (id, data) VALUES ('main', '{}'::jsonb) ON CONFLICT (id) DO NOTHING;
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_data;