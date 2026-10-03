# ai-workspace

A workspace for making things with Claude: thumbnails, captions, graphics, small tools. Each piece of work gets its own folder in `projects/`.

## Who you're working with

The person here is probably not technical. They have used AI as a chat window and are now trying agentic work for the first time.

- Before you run commands or write code, say in one or two plain sentences what you're about to do and why.
- When something fails, figure it out and fix it yourself. Then explain what happened in plain words. Don't paste raw error logs at them.
- Don't use jargon without a short explanation. "Terminal", "repo", "script" all need a few words the first time.
- Show results: open the image, the folder or the page so they can see it.

## How this folder is organised

- `projects/NN-short-name/` holds one piece of work each (`01-first-thumbnail`, `02-launch-video`). Use `/new-project` to start one.
- Inside a project: `input/` for their files (videos, photos), `frames/` for stills pulled from video, `output/` for finished files, `prototypes/` for quick throwaway test pages (`/prototype`), `README.md` for the brief, notes and references.
- Never create files in the workspace root, including temporary helper scripts: put those in the project folder or in `/tmp`. If something doesn't belong to a project yet, start one with `/new-project`.
- `scripts/` holds reusable tools shared by every project.
- `.claude/skills/` holds skills (saved how-tos). Type `/` in Claude to see them.

## Tools and conventions

- Use pnpm, never npm (`pnpm add`, `pnpm dlx`). It's faster and saves disk space.
- Write scripts in TypeScript and run them with Bun (`bun scripts/x.ts`). Use Python with uv (`uv run`) when a task needs Python libraries, typically heavy image or video work.
- `scripts/` has ready-made tools. Before using one, check it does exactly what this task needs. If it doesn't, adapt it or write a new one inside the project folder (and tell the user why).
  - `scripts/render-html.ts` turns an HTML page into a PNG with Playwright. You can use it for thumbnails, covers and text graphics: `bun scripts/render-html.ts <page.html> <out.png> [9:16|16:9|4:5|1:1] [--guides]`. `--guides` draws the Instagram crop lines on a 9:16 render for checking.
  - `scripts/extract-frames.ts` pulls evenly spaced stills from a video plus a contact sheet. You can use it to "watch" a video: `bun scripts/extract-frames.ts <video> <outDir> [count]`, then look at `contact-sheet.jpg`.
- Thumbnails, covers and text graphics are HTML + CSS rendered to PNG with Playwright. Never use HyperFrames for still images: it's for video and much slower.
- Background removal, mattes and cutouts: use `/cutout`. It runs a free local model first (after asking about the one-time download) and only suggests fal.ai if that isn't good enough.
- Run any text meant for the public (captions, posts, headlines) through `/humanizer`.
- For design work, use `/impeccable` to avoid the generic AI look.
- AI image or video generation: fal.ai via `genmedia` if the user set it up (`FAL_KEY` in `.env`). If they didn't, say so and offer other options. Never spend money without asking first.

## Context

Long conversations get worse over time. When a chat gets long or the topic changes, suggest `/handoff` and a fresh chat.
