# Yernur Visuals

Portfolio site for Yernur Visuals: photo, video, editing, reels and short commercial work.

## Commands

```bash
npm run dev
npm run build
npm run build:pages
npm test
```

Videos and their posters are hosted in `public/videos/` as H.264/AAC MP4 files with fast-start enabled. The native player supports seeking, volume and fullscreen. Photo and video cards and the viewer have no visible titles, descriptions or dates. Photos retain their Google Drive image sources and accessible alt text. Russian is the default language on every visit; the header switches to English for the current page. The contact section includes WhatsApp.

To add a video, use a stable work ID in `app/page.tsx` and matching `public/videos/<id>.mp4` and `<id>.jpg`. `NEXT_PUBLIC_BASE_PATH` is configured automatically for GitHub Pages.

SEO targets photography, videography and editing in Almaty. Canonical and structured data are defined in `app/layout.tsx`; `public/robots.txt` and `public/sitemap.xml` point to the primary Vercel URL. See `SEO.md` for verification and account-dependent next steps. The home URL starts at the top on reload; a back-to-top button appears after scrolling and respects reduced-motion preferences.

GitHub Pages builds the static version from `.github/workflows/pages.yml` with `GITHUB_PAGES=true`, which applies the `/portfolio` base path.
