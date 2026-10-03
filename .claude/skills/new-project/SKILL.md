---
name: new-project
description: Use when the user types /new-project or wants to start a new piece of work (a thumbnail, a video, captions, a graphic, a small tool) in this workspace.
---

# New project

Every piece of work gets its own numbered folder in `projects/`. This keeps things findable and lets the user come back later.

1. Ask two short questions (skip any they already answered):
   - "What should we call it? A few words is fine."
   - "In one sentence, what do you want to end up with?"
2. Find the next number: look at `projects/`, take the highest `NN-` prefix, add 1. Start at `01`. Two digits.
3. Make a short kebab-case name from their answer, for example `03-launch-thumbnail`.
4. Create:
   ```
   projects/NN-name/
     README.md
     input/
     output/
   ```
   `README.md`:
   ```markdown
   # <Name>

   **Goal:** <their sentence>

   ## References
   <links, screenshots, voice notes go here or in input/>

   ## Notes
   ```
5. Tell them where it is and what goes where: "Put your video or photos in `input/` (drag them into the folder in Finder or VS Code). Finished files will land in `output/`." Open the folder for them with `open projects/NN-name`.
6. Ask for references if they have any: screenshots of styles they like, examples, a voice note. More context gets better results.
7. Suggest the next step. For a thumbnail, `/thumbnail`. To see a few directions before committing, `/prototype` (it creates `prototypes/` inside the project when needed). For anything bigger or fuzzy, `/grill-me` so you agree on the plan first.
