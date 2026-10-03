---
name: cutout
description: Use when the user wants to remove or replace a background, cut out a person or object, make a matte, mask or alpha, get a transparent PNG, put text behind someone's head (the "text behind subject" or depth effect), make a sticker or cut-out look, isolate a product, or fake a green screen on a photo. Also for /cutout, "remove bg", "delete the background", "cut me out", "clipping path", "subject extraction". For video, it points to the right tool.
---

# Cutout (background removal and mattes)

Cut a person or object out of a photo so it sits on a transparent background. That cutout (also called a matte or mask) is what makes effects like text behind someone's head work: background, then text, then the cutout on top.

The user is probably not technical. Say what you're doing in plain words: "I'll cut you out of the photo so the text can sit behind your head."

## Default: run it locally (free)

Use BiRefNet through `rembg`, run with `uvx` (comes with uv, nothing else to install). It's free, the photo never leaves their Mac, and it works without a fal key.

| Subject | Model | One-time download |
|---|---|---|
| A person (selfie, portrait, talking head still) | `birefnet-portrait` | about 1 GB |
| An object, product, animal, logo, anything else | `birefnet-general` | about 1 GB |
| Same, on slow internet or a small disk | `birefnet-general-lite` | about 225 MB, a bit less precise |

**Before the first run, ask.** The models download once to `~/.rembg/models/` and stay there. Check whether the model is already there first; if it isn't, tell them:

> "To cut this out on your Mac I need to download a free AI model once, about 1 GB. After that it's free, private and takes about 10 seconds per photo. If you'd rather not download it, I can do it on fal.ai instead: faster to start, costs less than a cent per photo, but needs your fal account. Which do you prefer?"

Only download after they say yes. If they choose fal, use the fal section below.

Run it (first run takes a minute or two, mostly the download):

```bash
uvx --from "rembg[cpu,cli]" rembg i -m birefnet-portrait "projects/NN-name/input/photo.jpg" "projects/NN-name/input/photo-cutout.png"
```

Keep cutouts inside the project (next to the original in `input/`, or in a `work/` folder), never in the workspace root.

Don't use rembg's default model (`bria-rmbg`): its licence doesn't allow commercial use. BiRefNet is MIT-licensed.

## Always check the result

Transparent edges hide mistakes. Put the cutout on a loud colour and look at it before using it:

```bash
uv run -q --with pillow python -c "
from PIL import Image; im = Image.open('CUTOUT.png').convert('RGBA'); im.thumbnail((1200, 1200))
bg = Image.new('RGBA', im.size, (255, 0, 200, 255)); bg.alpha_composite(im); bg.convert('RGB').save('/tmp/cutout-check.jpg')"
```

Open `/tmp/cutout-check.jpg` and check for leftover background (bits of window or sky in the hair is the classic), missing pieces (ears, fingers, the ends of a moustache), and halos. If it's not clean, try the other model once (portrait vs general). Show the user the check image.

## When to suggest fal.ai

Suggest fal if the local result still isn't clean after one retry, if the edges are very hard (fine flyaway hair, fur, glass, smoke, a busy background the same colour as the subject), or if the user wants speed over privacy. fal is optional in this workspace, so only offer it if `FAL_KEY` is set in `.env`, and **ask before spending**, even though it's under a cent.

```bash
URL=$(~/.genmedia/bin/genmedia upload "projects/NN-name/input/photo.jpg" --json | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('cdn_url') or d.get('url'))")
~/.genmedia/bin/genmedia run fal-ai/birefnet/v2 --image_url "$URL" --output_format png --download "projects/NN-name/input/photo-cutout.{ext}" --json
```

Check the result the same way.

## Video

For a moving subject (talking head, someone walking), use HyperFrames' local matting instead: `pnpm dlx hyperframes remove-background clip.mp4 -o subject.webm` (it downloads its own model, about 170 MB, once). For captions behind a person in a video, `/embedded-captions` does the whole thing.

## Using the cutout

For text behind a person in a thumbnail: in the HTML, stack the original photo, then the text, then the cutout PNG on top, all positioned identically (same size, same `object-fit`, same crop). See `/thumbnail`.
