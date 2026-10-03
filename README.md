![AI like a dev](.github/banner.jpg)

# ai-workspace

A starter folder for working with Claude as an agent: you give it a folder, and it works on real files and builds the small tools it needs. Made for non-developers.

## About

I use this repo in my **AI like a dev** workshops. Most people I meet use AI as a chat window: ask a question, copy the answer, paste it somewhere. Developers work with it differently. The agent sits inside a project folder, runs tools, and writes its own small scripts and skills when a job keeps coming back. The workshop shows that way of working to people who don't write code, and this repo is what they clone at the start. It sets up their Mac, comes with a few skills for content work (thumbnails, captions, design checks, cleaner writing), and gives them a `projects/` folder to keep using after the session.

## Get started (about 20 minutes, most of it waiting)

You don't need a GitHub account or any developer experience.

1. **Install the Claude app** from https://claude.ai/download and log in. You need a paid Claude plan (Pro or higher) for the Code tab.
2. **Open the Code tab** and choose your home folder as the folder to work in.
3. **Copy this whole message, paste it into the chat, and send it:**

```
Hi! I'm setting up for a workshop about working with AI agents. I'm not a developer, so please explain things simply as you go, and when you need me to do something, tell me exactly where to look and what to click.

1. Download the workshop folder from https://github.com/wiwo-dev/ai-workspace. I'd like it in my home folder as ~/ai-workspace. Explain in a sentence why that's a good place, and check with me before putting it somewhere else.
   If git isn't installed yet, my Mac will offer to install "command line developer tools". Tell me to click Install (not "Get Xcode"), and try again once it's done.
2. Open ~/ai-workspace/.claude/skills/environment-setup/SKILL.md and follow it step by step to set up my Mac.
3. When everything is ready, tell me how to start a new chat in the Code tab inside the ai-workspace folder, so I can use it from now on.
```

Claude checks your Mac, installs what's missing and explains each step. You may need to type your Mac password once.

## What's inside

- `projects/`: one numbered folder per piece of work. Start one with `/new-project`.
- `scripts/`: small ready-made tools Claude can use (or adapt): pull frames from a video, turn HTML into an image.
- `.claude/skills/`: saved how-tos. In the Code tab, type `/` to see them.
- `CLAUDE.md`: house rules Claude reads every time it works here.

## Skills to try

Open a Code tab chat inside the `ai-workspace` folder and type `/` to see the list.

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
| `/environment-setup` | Checks your Mac's tools again and fixes anything missing |

## Getting updates

Ask Claude: "pull the latest ai-workspace updates". Your `projects/` folder is yours and won't be touched.
