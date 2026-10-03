---
name: environment-setup
description: Use when the user types /environment-setup, is setting up this workspace for the first time, or a tool this repo relies on (brew, git, node, pnpm, bun, python, uv, ffmpeg, Playwright, VS Code) is missing or broken.
---

# Environment setup

Get this Mac ready so you (the agent) can use the usual developer tools freely. Check each tool, install only what's missing, and finish with a short report. Safe to run again at any time.

## Who you're helping

The user is probably not technical. Assume they have never used a terminal.

- Start by telling them, in two or three sentences, what's about to happen: you'll check their Mac for a handful of free tools and install the missing ones, it takes 10–20 minutes, and they may need to type their Mac password once.
- Before each install, give one plain sentence on what the tool is for (see the table). No more.
- **When something fails, don't stop and don't hand them the error.** Read it, work out the cause, fix it, try again. Search the web if you need to. Only ask the user when you truly need them (a password, clicking an installer, a decision), and then tell them exactly what to click or type.
- Keep updates short. They'll be watching.

## This is written for macOS

If the user is on Windows or Linux, don't follow the commands below. Work out the equivalent for their system (winget or the official installers on Windows), tell them that's what you're doing, and get to the same end state.

## Why each tool

| Tool | Plain-language reason |
|---|---|
| Homebrew | An app store for developer tools. Everything else installs through it. |
| git | Keeps a history of your project folders and downloads projects from GitHub. |
| Node.js + pnpm | Runs JavaScript tools. pnpm installs them fast and saves disk space. |
| Bun | Runs the small TypeScript scripts in `scripts/`. |
| Python + uv | Python has the best libraries for image and video work; uv installs them cleanly. |
| ffmpeg | The Swiss army knife for video and audio: cutting, converting, pulling frames. |
| Playwright (Chromium) | A browser Claude can drive, used to turn HTML designs into PNG images. |
| VS Code | An editor for looking at the files in this folder, side by side. |

## Steps

Run each check first. Skip the step if it passes.

### 1. Homebrew

Check: `command -v brew || test -x /opt/homebrew/bin/brew || test -x /usr/local/bin/brew`

If brew exists but `command -v brew` finds nothing, it's installed but not on this shell's PATH. Skip the install and jump to the "make it permanent" lines below, then carry on.

Homebrew's installer needs the Mac password, and you can't type it for them. Use the official macOS installer package so they can click through it:

```bash
curl -fsSL -o /tmp/Homebrew.pkg https://github.com/Homebrew/brew/releases/latest/download/Homebrew.pkg && open /tmp/Homebrew.pkg
```

Tell the user: "A Homebrew installer window just opened. Click Continue and Install, type your Mac password when asked, then tell me when it says the installation was successful."

After they confirm:
- Your shell won't know about brew yet. Use the full path: `/opt/homebrew/bin/brew` on Apple Silicon, `/usr/local/bin/brew` on Intel.
- Make it permanent for future terminals:
  ```bash
  BREW=$( [ -x /opt/homebrew/bin/brew ] && echo /opt/homebrew/bin/brew || echo /usr/local/bin/brew )
  grep -q 'brew shellenv' ~/.zprofile 2>/dev/null || echo "eval \"\$($BREW shellenv)\"" >> ~/.zprofile
  eval "$($BREW shellenv)"
  ```
- In every later command in this session, run `eval "$(<brew path> shellenv)"` first if `brew` isn't found.

If the `.pkg` route fails, fall back to asking them to open the Terminal app and paste the one-line install command from https://brew.sh, then come back.

### 2. Command-line tools

Check each with `command -v <name>`. Install everything missing in one go:

```bash
brew install git node pnpm oven-sh/bun/bun python uv ffmpeg
```

Then confirm versions: `git --version && node -v && pnpm -v && bun -v && python3 --version && uv --version && ffmpeg -version | head -1`.

Node must be 22 or newer. If an older Node comes first on PATH (for example from nvm), tell the user and use `brew link --overwrite node`, or leave their version manager alone and install Node 22+ through it.

### 3. VS Code

Check: `test -d "/Applications/Visual Studio Code.app"`. Install: `brew install --cask visual-studio-code`.

Then make sure the `code` command works (`command -v code`). If not, it lives at `/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code`; you can link it with `ln -sf "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" "$(brew --prefix)/bin/code"`.

### 4. This folder's own tools

From the repo root:

```bash
pnpm install
pnpm exec playwright install chromium
```

Prove it works by rendering the example thumbnail:

```bash
bun scripts/render-html.ts projects/00-example/thumbnail.html /tmp/setup-check.png && open /tmp/setup-check.png
```

### 5. fal.ai (optional, recommended)

Ask, don't assume: "Do you want to set up AI image and video generation? I recommend fal.ai: one account gives you most image and video models, you pay per use, and about $5 goes a long way. You can skip this and do it later, or use another service."

If yes:
1. Install the CLI: `curl -fsSL https://genmedia.sh/install | bash`
2. Tell them to create an account at https://fal.ai, add a few dollars of credit, and create a key at https://fal.ai/dashboard/keys.
3. Ask them to paste the key. Write it to `.env` as `FAL_KEY=...` (copy `.env.example` if `.env` doesn't exist). Never commit `.env` and never repeat the key back.
4. The installer puts genmedia in `~/.genmedia/bin`, which may not be on PATH yet. Use the full path: `~/.genmedia/bin/genmedia setup --non-interactive --api-key "$FAL_KEY"` (read the key from `.env`).
5. Check it with a free command: `~/.genmedia/bin/genmedia pricing bytedance/seedream/v5/pro/text-to-image --json`.

If no: note it in the report and move on.

### 6. Git identity

Check `git config --global user.name` and `user.email`. If either is empty, ask for their name and email and set them. Explain: git labels every saved version with a name.

## Finish

Show a short table: each tool, ✅ or ❌, version. For any ❌, one line on what's wrong and what you'll try next (and then try it).

End with what to do next, in plain words:
- "Open this folder in VS Code: `code .`. You'll see the same files Claude sees."
- "Start your first project with `/new-project`."
- If anything was installed, tell them: "Start a new chat (or restart the Claude app) before the next step, so it picks up the new tools."
