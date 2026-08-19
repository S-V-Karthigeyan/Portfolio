# Editing this portfolio

Every visible part of the site — hero text and portrait, the about text,
contact details, experience, education, skills, projects (text and all three
images per project), the screens gallery, and the marquee strip — is now
editable from the **Edit** button in the bottom-right corner of the site.
Changes save to a Supabase backend, so once it's connected, edits are visible
to everyone who visits the site, not just you.

## One-time setup (~5 minutes)

1. **Create/connect a Supabase project.**
   - Easiest: in Lovable, open this project and click **Connect Supabase**
     (a.k.a. Lovable Cloud). It creates a project for you and wires up the
     env vars automatically — you can skip step 3 below.
   - Or manually: create a free project at supabase.com.

2. **Run the schema.** Open `supabase/schema.sql` in this repo, copy it into
   your Supabase project's SQL editor (Database → SQL Editor), and run it.
   This creates the `portfolio_content` table and a public `portfolio-images`
   storage bucket, with the access policies the app expects.

3. **Set environment variables** (skip if Lovable did this for you in step 1).
   Copy `.env.example` to `.env` and fill in:
   - `VITE_SUPABASE_URL` — Project Settings → API → Project URL
   - `VITE_SUPABASE_ANON_KEY` — Project Settings → API → anon/public key

4. **Install the new dependency.** `@supabase/supabase-js` was added to
   `package.json` — run your usual install (`bun install` / `npm install`)
   so it's actually present in `node_modules`.

5. **Change the passcode.** Open `src/components/portfolio/EditPanel.tsx`
   and change `PASSCODE = "karthigeyan20"` to something private. It's baked
   into the client bundle, so treat it as a light deterrent, not real
   security — anyone determined could still find it in devtools. That's an
   intentional tradeoff to keep this simple for a personal portfolio; it's
   not meant to protect sensitive data.

## Using it

- Click **Edit**, enter the passcode, and every section is right there:
  text fields, and an **Upload / Replace / Remove** control under every
  image (hero portrait, each project's 3 images, gallery shots, marquee
  images). Use **Add** to add a new experience/education/skill/project/
  gallery image/marquee image, and **Remove**/the trash icon to delete one.
- **Save changes** writes everything to Supabase. If the backend isn't
  connected yet, it falls back to saving in your browser only (localStorage)
  and tells you so.
- **Reset to default** restores the original seed content (from
  `DEFAULT_CONTENT` in `src/components/portfolio/content.tsx`).

## What changed under the hood (for future reference)

- `src/lib/supabase.ts` — Supabase client, returns `null` if env vars aren't
  set (site still works, just without persistence).
- `src/lib/images.ts` — upload/delete helpers for the `portfolio-images`
  storage bucket.
- `src/components/portfolio/content.tsx` — the single source of truth for
  all editable content; loads from and saves to the `portfolio_content`
  table instead of only `localStorage`.
- `src/components/portfolio/data.ts` — default project/skill data now points
  at `/assets/*.png` (served from `public/assets`, stable filenames) instead
  of hashed `src/assets` imports, so seed image URLs saved to the database
  don't break on the next build.
- `HeroSection.tsx`, `AboutSection.tsx`, `ContactSection.tsx`,
  `MarqueeSection.tsx` now read their text/images from content instead of
  being hardcoded — previously only Experience/Education/Skills/Projects
  text was actually wired up to the (localStorage-only) editor.
- `ProjectItem` (in `content.tsx`) now carries `image1` / `image2` /
  `imageMain` directly, and `ProjectsSection` / `ProjectCard` read
  exclusively from saved content instead of merging with static defaults —
  previously project image edits were silently ignored.
