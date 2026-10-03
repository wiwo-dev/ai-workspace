import { test, expect } from "bun:test";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";
import { renderHtml } from "./render-html";

async function pixelAt(png: string, x: number, y: number): Promise<number[]> {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const b64 = Buffer.from(await Bun.file(png).arrayBuffer()).toString("base64");
    return await page.evaluate(async ({ b64, x, y }) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      return [img.width, img.height, ...ctx.getImageData(x, y, 1, 1).data.slice(0, 3)];
    }, { b64, x, y });
  } finally { await browser.close(); }
}

test("renders at exact size and loads sibling files via file://", async () => {
  const dir = await mkdtemp(join(tmpdir(), "render html "));
  await writeFile(join(dir, "style.css"), "html,body{margin:0;background:rgb(255,0,0)}");
  await writeFile(join(dir, "page.html"), `<link rel="stylesheet" href="style.css"><body></body>`);
  const out = join(dir, "out", "thumb.png");
  await renderHtml(join(dir, "page.html"), out, 540, 960);
  const [w, h, r, g, b] = await pixelAt(out, 10, 10);
  expect([w, h]).toEqual([540, 960]);
  expect([r, g, b]).toEqual([255, 0, 0]);
}, 60_000);

test("guides draw the Instagram crop lines on a 9:16 render, and are off by default", async () => {
  const dir = await mkdtemp(join(tmpdir(), "render guides "));
  await writeFile(join(dir, "page.html"), `<body style="margin:0;background:rgb(0,0,0)"></body>`);
  const plain = join(dir, "plain.png");
  const guided = join(dir, "guided.png");
  await renderHtml(join(dir, "page.html"), plain, 1080, 1920);
  await renderHtml(join(dir, "page.html"), guided, 1080, 1920, { guides: true });
  // 3:4 profile-grid crop line at y=240, centre of the frame stays untouched
  expect((await pixelAt(plain, 540, 240)).slice(2)).toEqual([0, 0, 0]);
  expect((await pixelAt(guided, 540, 240)).slice(2)).not.toEqual([0, 0, 0]);
  expect((await pixelAt(guided, 540, 960)).slice(2)).toEqual([0, 0, 0]);
}, 60_000);
