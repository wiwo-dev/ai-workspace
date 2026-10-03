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

test("re-running with a smaller count leaves no stale frames from the earlier run", async () => {
  const dir = await mkdtemp(join(tmpdir(), "frames rerun "));
  const video = join(dir, "clip.mp4");
  Bun.spawnSync(["ffmpeg", "-y", "-f", "lavfi", "-i", "testsrc=duration=2:size=320x568:rate=25", "-pix_fmt", "yuv420p", video]);
  const out = join(dir, "frames");
  await extractFrames(video, out, 8);
  await extractFrames(video, out, 4);
  const files = (await readdir(out)).filter((f) => /^frame-\d\d\.jpg$/.test(f));
  expect(files).toHaveLength(4);
}, 60_000);

test("flags HDR (HLG) clips, like recent iPhone footage, so frames can be checked for dull colours", async () => {
  const dir = await mkdtemp(join(tmpdir(), "frames hdr "));
  const sdr = join(dir, "sdr.mp4");
  const hlg = join(dir, "hlg.mp4");
  Bun.spawnSync(["ffmpeg", "-y", "-f", "lavfi", "-i", "testsrc=duration=1:size=320x568:rate=25", "-pix_fmt", "yuv420p", sdr]);
  Bun.spawnSync(["ffmpeg", "-y", "-f", "lavfi", "-i", "testsrc=duration=1:size=320x568:rate=25", "-pix_fmt", "yuv420p10le",
    "-c:v", "libx265", "-x265-params", "colorprim=bt2020:transfer=arib-std-b67:colormatrix=bt2020nc:log-level=error", "-tag:v", "hvc1", hlg]);
  expect((await extractFrames(sdr, join(dir, "a"), 2)).hdr).toBe(false);
  expect((await extractFrames(hlg, join(dir, "b"), 2)).hdr).toBe(true);
}, 60_000);
