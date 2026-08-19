# Permanent Portfolio

Add a backend to this project (use Lovable Cloud / Supabase) so that the portfolio's content becomes fully and permanently editable by me, with changes visible to every visitor — not just stored in the browser like it is now.

Specifically:

Create a database table (or tables) that stores all editable content: hero (title, tagline), about (heading, text), contact (heading, blurb, email, footer), gallery images, experience entries, education entries, skills, and projects (including each project's images).

Set up storage (Supabase Storage bucket) for uploaded images, so I can upload a new image, replace an existing one, or delete one for: the hero section, the about section, and each project's image set.

Extend the existing EditPanel.tsx / content.tsx system (currently in src/components/portfolio/) so that:

It loads content from the database instead of DEFAULT_CONTENT + localStorage.

Every section is editable — including hero and about/contact text, which aren't editable yet.

Every image has an upload/replace/remove control, not just text fields.

"Save changes" writes to the database and storage, so the change appears for all visitors immediately (or on next page load).

Keep the existing passcode gate (karthigeyan20) in front of the edit panel.

Keep the visual design and layout of the site exactly as-is — this is only about wiring content to a real backend and expanding the edit panel's coverage.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0ce5d0c4-f55f-4068-a775-c2545082ea91).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
