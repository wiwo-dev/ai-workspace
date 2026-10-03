# ai-intro

A starter folder for working with Claude as an agent, not just a chat. Built for the Foundera AI session.

## Get started (about 20 minutes, most of it waiting)

1. **Install the Claude app** from https://claude.ai/download and log in. You need a paid Claude plan (Pro or higher) for the Code tab.
2. **Open the Code tab** and pick your home folder. Paste this:
   > Clone https://github.com/wiwo-dev/ai-intro into ~/ai-intro. If git isn't installed, tell me what to click.

   (If your Mac asks to install "command line developer tools", say yes, then ask Claude to try again.)
3. **Switch the Code tab to the `ai-intro` folder** and type:
   > /environment-setup

   Claude checks your Mac and installs what's missing. It'll explain each step. You may need to type your Mac password once.
4. **Bring a short video** (10–30 seconds, vertical) to the session.

## What's inside

- `projects/`: one numbered folder per piece of work. Start one with `/new-project`.
- `scripts/`: small ready-made tools Claude can use (or adapt): pull frames from a video, turn HTML into an image.
- `.claude/skills/`: saved how-tos. Type `/` in Claude to see them.
- `CLAUDE.md`: house rules Claude reads every time it works here.

## Skills to try

| Skill | What it does |
|---|---|
| `/new-project` | Starts a numbered project folder |
| `/thumbnail` | Makes a thumbnail from your video |
| `/grill-me` | Claude interviews you until the plan is clear, before building anything |
| `/handoff` | Wraps up a long chat so you can continue fresh in a new one |
| `/humanizer` | Removes the AI smell from text |
| `/impeccable` | Design guidance that avoids the generic AI look |
| `/hyperframes` | Video: captions, motion graphics, edits |
| `/genmedia` | AI images and video through fal.ai (optional) |

## Getting updates

Ask Claude: "pull the latest ai-intro updates". Your `projects/` folder is yours and won't be touched.
