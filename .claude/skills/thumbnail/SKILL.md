---
name: thumbnail
description: Use when the user types /thumbnail or wants a thumbnail, cover image, poster frame or text-on-image graphic, especially from one of their videos.
---

# Thumbnail

Build thumbnails as HTML + CSS and render them to PNG with Playwright. This gives exact control over where every word sits, and it renders in seconds. **Never use HyperFrames for thumbnails**: it's for video and far slower.

Work inside a project folder (`projects/NN-name/`). If there isn't one, run `/new-project` first.

`scripts/` has ready-made tools. Before using one, check it does exactly what this task needs. If it doesn't, adapt it or write a new one inside the project folder (and tell the user why). The commands below are suggestions, not the only way.

## 1. Understand the ask

Ask only what you don't know:
- Which video or photo? (Usually in `input/`.)
- Where will it be posted? Default 9:16 (Reels, TikTok, Shorts). 16:9 for YouTube, 4:5 for an Instagram grid post.
- What's the video about, in one sentence? Any words that must be on it?
- Any style they like? A screenshot in `input/` is worth a paragraph.

## 2. Watch the video

Pull a set of stills and a contact sheet so you can see the video. You can use `scripts/extract-frames.ts`:

```bash
bun scripts/extract-frames.ts "projects/NN-name/input/<clip>" projects/NN-name/frames 12
```

Open `frames/contact-sheet.jpg` and look at it. Pick the 2–3 frames with a clear subject, a readable face or expression, and room for text. `frames/frames.json` maps each frame to its time. If you need a frame from an exact moment, pull just that one with ffmpeg.

If the script says the clip is HDR (recent iPhones film in HDR by default) and the frames look dull or washed out, convert the clip to normal SDR video first, then extract again. Check the frames before you build on them.

## 3. Propose before you build

Offer 2–3 options, each a frame + a headline (2–5 words, punchy, no clickbait clichés) + where the text goes. Run headlines through `/humanizer` thinking: no "Unlock", "Game-changer", "Here's why". Let them pick or mix.

## 4. Build the HTML

Write `projects/NN-name/thumbnail.html`:
- `<body>` exactly the target size (1080×1920 for 9:16, 1280×720 for 16:9, 1080×1350 for 4:5), `margin:0`, `overflow:hidden`.
- Frame as a full-bleed background: `<img src="frames/frame-03.jpg">` with `object-fit:cover`. Relative paths work.
- Big, heavy type. One or two words can take an accent colour. Add a soft dark gradient or text shadow behind text so it reads on any frame.
- Keep text away from the edges and out of the bottom 20% on 9:16 (platform buttons cover it).
- Use a distinctive Google Font via `<link>` rather than Arial or Inter. Use `/impeccable` if you want a design check.

See `projects/00-example/thumbnail.html` for a working example.

## 5. Render and show

Render the HTML to a PNG with Playwright and open it. You can use `scripts/render-html.ts` (sizes: `9:16`, `16:9`, `4:5`, `1:1`):

```bash
bun scripts/render-html.ts projects/NN-name/thumbnail.html projects/NN-name/output/thumbnail.png 9:16
open projects/NN-name/output/thumbnail.png
```

Look at the PNG yourself before showing it: check the font loaded, nothing is cut off, and the text reads.

## 6. Iterate

Ask what to change. Edit the HTML, re-render, show again. To compare options side by side, save `thumbnail-a.html`, `thumbnail-b.html` and render each.
