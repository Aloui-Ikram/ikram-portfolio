# Ikram Aloui · Portfolio

Personal site for Ikram Aloui, cloud-native security engineer. Built with Next.js 16 (App Router),
Tailwind CSS v4, and Framer Motion.

Live at **[ikram-portfolio.vercel.app](https://ikram-portfolio.vercel.app)**.

## Editing content

**All site content lives in one file: [`src/content/data.ts`](src/content/data.ts).** Sections read
from it, so adding a merged PR, a blog post, or a new role means editing that file only, with no
component changes needed.

Every claim in that file traces back to a verified source (GitHub API, the live blog posts, the
technical report PDFs, or the CV). Please keep it that way: don't add a line you can't point at.

Two framing rules are deliberate and worth preserving:

- The research section is **"Technical Reports & Applied Research"**. Those three documents are
  solo-authored technical reports, not peer-reviewed papers. Never label them "publications".
- **No phone number anywhere**, including the resume PDFs. The security variant is served publicly
  at `/Ikram_Aloui_Resume.pdf`, so anything on it is downloadable by anyone. Email is the contact
  channel.

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
npx tsc --noEmit     # typecheck
```

## Resume

The resume lives in [`resume/`](resume/) and is generated from editable HTML + CSS via headless
Chrome. Two variants share one stylesheet:

| File | Audience |
| --- | --- |
| `resume-security.html` | Cloud-native / security engineering roles |
| `resume-ai.html` | AI-training platforms (Mercor, Shipd) and general software engineering |

```bash
node resume/build.mjs
```

This writes both PDFs into `resume/` and copies the security variant to
`public/Ikram_Aloui_Resume.pdf`, which is what the site's "Download CV" button serves. Set
`CHROME_BIN` if Chrome isn't on your `PATH`.

To restyle both resumes at once, edit `resume/resume.css`.

## Deployment

Deployed to Vercel as its own project, separate from any earlier portfolio:

```bash
npx vercel          # first run: links/creates the project
npx vercel --prod   # deploy to production
```

## Notes on the build

- **Scroll reveals are CSS-driven, not `whileInView`.** `Reveal` is a *server* component that only
  emits `data-reveal="out"`; a single `<RevealObserver />` flips all ~74 of them to `"in"`. Keeping
  those blocks out of the client bundle is what took Lighthouse performance from 89 to 94.
- **Content is never hidden behind JavaScript.** The hidden start state is scoped behind a `.js`
  class added by an inline head script before first paint, and the observer has a failsafe timer.
  With JS disabled, or if IntersectionObserver never fires, every section renders fully visible
  rather than permanently blank. The same applies to the collapsed pull requests, which stay in the
  DOM (`.pr-collapsed`) so crawlers see all 20.
- **`* { border-color }` must stay inside `@layer base`.** Unlayered rules outrank Tailwind's utility
  layer, which would silently break every `border-[...]` utility on the site.
- `npm` overrides pin patched `postcss` and `sharp` so `npm audit` reports zero vulnerabilities
  without downgrading Next.js.
