#!/usr/bin/env bun
// Pulls evenly spaced stills from a video plus one contact sheet, so an agent can "watch" it.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

function run(cmd: string[]): string {
  const p = Bun.spawnSync(cmd, { stderr: "pipe" });
  if (p.exitCode !== 0) throw new Error(`${cmd[0]} failed: ${p.stderr.toString().slice(-500)}`);
  return p.stdout.toString();
}

export async function extractFrames(video: string, outDir: string, count = 12) {
  await mkdir(outDir, { recursive: true });
  const duration = Number(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", video]).trim());
  if (!(duration > 0)) throw new Error(`Could not read the length of ${video}`);

  const frames: { file: string; seconds: number }[] = [];
  for (let i = 0; i < count; i++) {
    const seconds = Number(((duration * (i + 0.5)) / count).toFixed(2)); // middle of each slice, never the very end
    const file = join(outDir, `frame-${String(i + 1).padStart(2, "0")}.jpg`);
    run(["ffmpeg", "-y", "-v", "error", "-ss", String(seconds), "-i", video, "-frames:v", "1", "-q:v", "2", file]);
    frames.push({ file, seconds });
  }
  await writeFile(join(outDir, "frames.json"), JSON.stringify(frames, null, 2));

  const cols = 4;
  const rows = Math.ceil(count / cols);
  const sheet = join(outDir, "contact-sheet.jpg");
  run(["ffmpeg", "-y", "-v", "error", "-i", join(outDir, "frame-%02d.jpg"),
    "-vf", `scale=360:-2,tile=${cols}x${rows}:padding=8:color=white`, "-frames:v", "1", "-q:v", "3", sheet]);
  return { frames, sheet };
}

if (import.meta.main) {
  const [video, outDir, count = "12"] = Bun.argv.slice(2);
  if (!video || !outDir) {
    console.error("Usage: bun scripts/extract-frames.ts <video> <outDir> [count=12]");
    process.exit(1);
  }
  const { frames, sheet } = await extractFrames(video, outDir, Number(count));
  console.log(`Saved ${frames.length} frames and ${sheet}`);
}
