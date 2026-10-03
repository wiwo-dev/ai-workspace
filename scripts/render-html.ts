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

// Instagram Reel cover zones, checked 2026-10-03: the profile grid crops 9:16 covers to a centred 3:4,
// the home feed shows them at 4:5, and full-screen the caption and buttons cover the bottom ~20%.
const GUIDES = `(() => {
  const w = innerWidth, h = innerHeight, grid = (h - w * 4 / 3) / 2, feed = (h - w * 5 / 4) / 2;
  const box = document.createElement("div");
  box.style.cssText = "position:fixed;inset:0;z-index:2147483647;pointer-events:none;font:600 22px system-ui;";
  const line = (y, color, dash, label) => box.insertAdjacentHTML("beforeend",
    '<div style="position:absolute;left:0;right:0;top:' + (y - 2) + 'px;border-top:4px ' + dash + ' ' + color + '"></div>' +
    '<div style="position:absolute;left:12px;top:' + (y + 6) + 'px;color:' + color + ';text-shadow:0 0 4px #000">' + label + '</div>');
  line(grid, "rgb(255,0,200)", "solid", "profile grid 3:4");
  line(h - grid, "rgb(255,0,200)", "solid", "profile grid 3:4");
  line(feed, "rgb(0,220,255)", "dashed", "home feed 4:5");
  line(h - feed, "rgb(0,220,255)", "dashed", "home feed 4:5");
  box.insertAdjacentHTML("beforeend", '<div style="position:absolute;left:0;right:0;bottom:0;height:' + h * 0.2 +
    'px;background:rgba(255,255,255,.18);color:#fff;padding:12px;text-shadow:0 0 4px #000">full-screen: caption + buttons</div>');
  document.body.appendChild(box);
})()`;

export async function renderHtml(
  htmlPath: string, outPath: string, width: number, height: number, opts: { guides?: boolean } = {},
): Promise<void> {
  await mkdir(dirname(resolve(outPath)), { recursive: true });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    // file:// so relative paths (../frames/x.jpg, fonts/) resolve next to the HTML file
    await page.goto(pathToFileURL(resolve(htmlPath)).href, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    if (opts.guides && Math.abs(width / height - 9 / 16) < 0.01) await page.evaluate(GUIDES);
    await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width, height } });
  } finally {
    await browser.close();
  }
}

if (import.meta.main) {
  const args = Bun.argv.slice(2).filter((a) => a !== "--guides");
  const [html, out, size = "9:16"] = args;
  if (!html || !out || !(size in SIZES)) {
    console.error("Usage: bun scripts/render-html.ts <page.html> <out.png> [9:16|16:9|4:5|1:1] [--guides]");
    process.exit(1);
  }
  const [w, h] = SIZES[size as keyof typeof SIZES];
  await renderHtml(html, out, w, h, { guides: Bun.argv.includes("--guides") });
  console.log(`Saved ${out} (${w}x${h})`);
}
