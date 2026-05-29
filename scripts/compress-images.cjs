#!/usr/bin/env node
/**
 * Lossless/near-lossless batch compression for static marketing assets.
 * Run: node scripts/compress-images.cjs
 */
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const ROOT = process.cwd();

const TARGET_DIRS = [
  "public/partner-logos-noindex",
  "public/lovable-uploads",
  "public/og",
  "src/assets",
];

const EXTRA_FILES = [
  "public/hero-product-demo.png",
  "public/hero-gif-extension-top.png",
  "public/hero-gif-extension-bottom.png",
  "public/compatibility-panorama.png",
];

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) acc.push(full);
  }
  return acc;
}

function isLogo(filePath) {
  return (
    filePath.includes(`${path.sep}partner-logos-noindex${path.sep}`) ||
    /[/\\][^/\\]*-logo\.(png|webp)$/i.test(filePath) ||
    /[/\\][^/\\]*logo[^/\\]*\.(png|webp)$/i.test(filePath)
  );
}

function isUiScreenshot(filePath) {
  return (
    filePath.includes("core-advantage") ||
    filePath.includes("security-report") ||
    filePath.includes("ai-self-healing") ||
    filePath.includes("execution-report") ||
    filePath.includes("40829201") ||
    filePath.includes("screenshot") ||
    filePath.includes("release-") ||
    filePath.includes("auto-bug")
  );
}

function maxWidthFor(filePath, meta) {
  if (isLogo(filePath)) return 640;
  if (isUiScreenshot(filePath)) return 1400;
  if (filePath.includes(`${path.sep}og${path.sep}`)) return meta.width;
  if (/\.(jpe?g)$/i.test(filePath)) return 1600;
  if (filePath.includes(`${path.sep}src${path.sep}assets${path.sep}`)) return 1600;
  if (filePath.includes("illustration")) return 1200;
  if (filePath.includes("panorama") || filePath.includes("hero-gif-extension")) return 1600;
  return 1400;
}

async function compressOne(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const before = fs.statSync(filePath).size;
  const meta = await sharp(filePath).metadata();

  let pipeline = sharp(filePath);
  const limit = maxWidthFor(filePath, meta);
  const resized = Boolean(meta.width && limit && meta.width > limit);

  if (resized) {
    pipeline = pipeline.resize({ width: limit, withoutEnlargement: true });
  }

  let buffer;
  if (ext === ".png") {
    buffer = await pipeline
      .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
      .toBuffer();
  } else if (ext === ".webp") {
    buffer = await pipeline.webp({ quality: 88, effort: 6, smartSubsample: true }).toBuffer();
  } else {
    buffer = await pipeline
      .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer();
  }

  const after = buffer.length;
  const saved = before - after;
  const worthWriting = saved > 512 || (resized && after <= before);

  if (worthWriting) {
    fs.writeFileSync(filePath, buffer);
  }

  return {
    file: path.relative(ROOT, filePath),
    before,
    after: worthWriting ? after : before,
    saved: worthWriting ? saved : 0,
    resized,
    skipped: !worthWriting,
  };
}

async function main() {
  const files = new Set([
    ...TARGET_DIRS.flatMap((d) => walk(path.join(ROOT, d))),
    ...EXTRA_FILES.map((f) => path.join(ROOT, f)).filter((f) => fs.existsSync(f)),
  ]);

  const results = [];
  for (const file of [...files].sort()) {
    try {
      results.push(await compressOne(file));
    } catch (err) {
      console.error("FAILED", file, err.message);
    }
  }

  const changed = results.filter((r) => r.saved > 0);
  const totalBefore = changed.reduce((s, r) => s + r.before, 0);
  const totalAfter = changed.reduce((s, r) => s + r.after, 0);
  const totalSaved = totalBefore - totalAfter;

  changed
    .sort((a, b) => b.saved - a.saved)
    .forEach((r) => {
      const pct = ((r.saved / r.before) * 100).toFixed(1);
      console.log(
        `${r.file}: ${(r.before / 1024).toFixed(1)}KB → ${(r.after / 1024).toFixed(1)}KB (-${pct}%)${r.resized ? " [resized]" : ""}`,
      );
    });

  console.log(
    `\nCompressed ${changed.length}/${results.length} files. Saved ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${totalBefore ? ((totalSaved / totalBefore) * 100).toFixed(1) : 0}%).`,
  );
}

main();
