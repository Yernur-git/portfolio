# Yernur Visuals

Portfolio site for Yernur Visuals: photo, video, editing, reels and short commercial work.

## Commands

```bash
npm run dev
npm run build
npm run build:pages
npm test
```

Videos and their posters are hosted in `public/videos/` as H.264/AAC MP4 files with fast-start enabled. The native player supports seeking, volume and fullscreen. Video cards and the viewer have no visible titles or descriptions. Photos retain their Google Drive image sources. Russian is the default language on every visit; the header switches to English for the current page.

To add a video, use a stable work ID in `app/page.tsx` and matching `public/videos/<id>.mp4` and `<id>.jpg`. `NEXT_PUBLIC_BASE_PATH` is configured automatically for GitHub Pages.

GitHub Pages builds the static version from `.github/workflows/pages.yml` with `GITHUB_PAGES=true`, which applies the `/portfolio` base path.
