---
name: prototype
description: Use when the user types /prototype, wants to see a few different versions of something before committing (a thumbnail, a landing page, a slide, a layout), or wants to check whether some rules or a flow make sense (pricing tiers, a booking or onboarding flow) by clicking through it.
---

# Prototype

A prototype is **a quick, throwaway page that answers one question**. The question decides the shape. Adapted from Matt Pocock's `prototype` skill (see `LICENSE.md`), reshaped for this workspace: everything lives inside a project folder and runs as one HTML file.

The user is probably not a developer. Before you build, explain in a sentence or two what a prototype is ("a quick test page so we can see options before committing to one") and what they'll get.

## Pick a branch

Work out which question is being answered, from what they said or by asking:

- **"What should this look like?"** → [UI.md](UI.md). Three radically different versions on one page, with a small bar (and ← → keys) to flip between them.
- **"Do these rules / does this flow make sense?"** → [LOGIC.md](LOGIC.md). One page with a button for every action, a readable "what's true right now" panel, and guided walkthroughs of the tricky cases.

The two produce very different pages, so a wrong guess wastes the prototype. If it's genuinely unclear, ask.

## Where it lives

Always inside a project:

```
projects/NN-name/prototypes/<question-slug>/
  index.html     the prototype, one self-contained file
  VERDICT.md     written at the end (see below)
```

- If there's no project for this yet, run `/new-project` first. Never put a prototype in the workspace root or in `scripts/`.
- `<question-slug>` is a short kebab-case name for the question, e.g. `thumbnail-directions`, `pricing-tiers`.
- If assets are needed (frames, photos), reference them from the project folder with relative paths (`../../frames/frame-03.jpg`) instead of copying them.

## Rules for both branches

1. **Throwaway, and obviously so.** Put a small "Prototype" label in the page and state the question at the top. No tests, no polish beyond what makes it usable, no abstractions.
2. **Trivial to run.** One `index.html` with everything inline: no framework, no build step, no server. Open it for them with `open projects/NN-name/prototypes/<slug>/index.html`, and tell them they can double-click it in Finder later.
3. **No saving by default.** State lives in the page and resets on reload, unless saving is the thing being tested.
4. **Show what changed.** After every click (logic) or every switch (UI), the page makes the current state or the current version obvious.
5. **Capture the answer when done.** When the user has picked a version or the question is settled:
   - Write `VERDICT.md` next to `index.html`: the question, the answer, which version won (or which bits of which), and why, in a few lines.
   - Add one line to the project's `README.md` under `## Notes` (add that heading if it's missing), linking to the prototype folder.
   - Keep the prototype folder; it's a record the user can reopen. Then do the real thing (for example, build the final `thumbnail.html` from the winning direction).
