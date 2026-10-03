import { test, expect } from "bun:test";
import { mkdtemp, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { extractFrames } from "./extract-frames";

test("short clip with spaces in its path gives N frames, a json index and a contact sheet", async () => {
  const dir = await mkdtemp(join(tmpdir(), "frames test "));
  const video = join(dir, "my clip.mp4");
  const gen = Bun.spawnSync(["ffmpeg", "-y", "-f", "lavfi", "-i", "testsrc=duration=2:size=320x568:rate=25", "-pix_fmt", "yuv420p", video]);
  expect(gen.exitCode).toBe(0);

  const out = join(dir, "frames");
  const { frames, sheet } = await extractFrames(video, out, 6);

  expect(frames).toHaveLength(6);
  const files = (await readdir(out)).filter((f) => /^frame-\d\d\.jpg$/.test(f));
  expect(files).toHaveLength(6);
  for (let i = 1; i < frames.length; i++) expect(frames[i].seconds).toBeGreaterThan(frames[i - 1].seconds);
  expect(await Bun.file(sheet).exists()).toBe(true);
  expect(await Bun.file(join(out, "frames.json")).json()).toEqual(frames);
}, 60_000);
