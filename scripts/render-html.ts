#!/usr/bin/env bun
// Renders an HTML file to a PNG with Playwright. Used for thumbnails, covers and text graphics.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const SIZES = {
  "9:16": [1080, 1920],
  "16:9": [1280, 720],
  "4:5": [1080, 1350],
  "1:1": [1080, 1080],
} as const satisfies Record<string, [number, number]>;

export async function renderHtml(htmlPath: string, outPath: string, width: number, height: number): Promise<void> {
  await mkdir(dirname(resolve(outPath)), { recursive: true });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    // file:// so relative paths (../frames/x.jpg, fonts/) resolve next to the HTML file
    await page.goto(pathToFileURL(resolve(htmlPath)).href, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width, height } });
  } finally {
    await browser.close();
  }
}

if (import.meta.main) {
  const [html, out, size = "9:16"] = Bun.argv.slice(2);
  if (!html || !out || !(size in SIZES)) {
    console.error("Usage: bun scripts/render-html.ts <page.html> <out.png> [9:16|16:9|4:5|1:1]");
    process.exit(1);
  }
  const [w, h] = SIZES[size as keyof typeof SIZES];
  await renderHtml(html, out, w, h);
  console.log(`Saved ${out} (${w}x${h})`);
}
