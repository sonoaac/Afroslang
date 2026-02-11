import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';

const ROOT = process.cwd();

const inputPath = path.join(ROOT, 'public', 'afrolingologo.png');
const outputPath = path.join(ROOT, 'public', 'afrolingologo-bird.png');

if (!fs.existsSync(inputPath)) {
  console.error(`Input not found: ${inputPath}`);
  process.exit(1);
}

const input = fs.readFileSync(inputPath);
const png = PNG.sync.read(input);

// Convert near-white pixels to transparent.
// This works best when the background is a flat/near-flat white.
const threshold = 245; // 0-255
const soften = 22; // feathering range

for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < png.width; x++) {
    const idx = (png.width * y + x) << 2;
    const r = png.data[idx];
    const g = png.data[idx + 1];
    const b = png.data[idx + 2];
    const a = png.data[idx + 3];

    if (a === 0) continue;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    // treat as background if it's very bright and low chroma
    const isNearWhite = min >= threshold && (max - min) <= 18;
    if (!isNearWhite) continue;

    // Feather edges: pixels slightly below threshold become partially transparent
    const brightness = (r + g + b) / 3;
    const t = Math.max(0, Math.min(1, (brightness - (threshold - soften)) / soften));
    // t=0 -> keep, t=1 -> fully transparent
    const newAlpha = Math.round((1 - t) * a);
    png.data[idx + 3] = newAlpha;
  }
}

const out = PNG.sync.write(png);
fs.writeFileSync(outputPath, out);
console.log(`Wrote: ${outputPath}`);
