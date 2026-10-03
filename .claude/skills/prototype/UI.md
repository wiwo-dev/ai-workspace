# UI prototype

Build **several radically different versions** of one thing on a single page, with a floating bar to flip between them. The user flips through, picks one (or steals bits from each), and the rest gets thrown away.

If the question is about rules or a flow rather than looks, use [LOGIC.md](LOGIC.md).

## When this is the right shape

- "What should this thumbnail / cover / slide look like?"
- "Show me a few directions for the landing page before we commit."
- "Try a different layout for this."
- Any time the user would otherwise pick between three vague ideas in their head.

## Start from what already exists

A version is easier to judge in its real context: the real photo, the real headline, the real size. If the project already has a design (a `thumbnail.html`, a page, a slide), build the versions **from it**: same content, same frame, same dimensions, different direction. Reuse the project's existing text; don't add new labels, claims or taglines on your own. If there is nothing to start from, use realistic placeholder copy (never lorem ipsum) and tell the user which text you made up.

## Process

### 1. State the question and pick how many

Default to **3 versions**. More than 5 stops being different and becomes noise, so cap there. Write the plan in one line at the top of the page, e.g. "Three directions for the freediving reel thumbnail, same frame, 9:16."

### 2. Make them radically different

Hold each version to the purpose and the real content. Versions must differ in **structure**: layout, hierarchy, where the eye goes first, type treatment, how the image is used. Not just colours. Three slightly tweaked versions teach nothing; if two come out too similar, redo one with an explicit "not like the others" constraint.

Give each a short name that says its direction: `A · Big type on top`, `B · Split screen`, `C · Minimal corner label`.

Use `/impeccable`'s guidance so none of them look like generic AI output.

### 3. One file, all versions

Put every version in `index.html`, each in its own block (`<section data-variant="A">` …), with only the current one visible. Fixed-size designs (thumbnails, covers, slides) render at their real size, scaled down to fit the window if needed, so proportions stay true. For 9:16 covers, add a `G` key that toggles the platform crop lines and safe zone from `/thumbnail` (Sizes and safe zones), so every version can be judged as it will look on the Instagram grid.

### 4. The switcher bar

A small fixed bar at the bottom centre, clearly not part of the design being judged (a dark pill with a soft shadow):

- **←** previous version, **→** next version (both wrap around).
- A label in between: the key and the name, e.g. `B · Split screen`.
- The ← → keys on the keyboard do the same, except when typing in an input or textarea.
- The current version is kept in the URL (`?variant=B`), so a reload or a shared link shows the same one.

### 5. Hand it over

Open the page and tell them how to flip ("use the arrows at the bottom, or the ← → keys"). The most useful answer is often a mix: "the type from A with the photo crop from C". That's the real design.

### 6. Capture and continue

Write `VERDICT.md` and the README line as described in [SKILL.md](SKILL.md). Then build the real thing from the winner, properly: for a thumbnail, that's the project's `thumbnail.html`, rendered to PNG as usual. Leave the prototype page as it is, as the record.

## Anti-patterns

- **Versions that differ only in colour or wording.** That's a tweak, not a prototype.
- **Sharing too much between versions.** Shared content is fine; a shared layout defeats the point.
- **Treating the prototype as the final file.** It was built fast. Rebuild the winner cleanly.
