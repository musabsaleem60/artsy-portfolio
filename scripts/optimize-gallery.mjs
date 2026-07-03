import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const sourceDir = path.join(projectRoot, "public", "gallery");
const outputDir = path.join(projectRoot, "public", "gallery-web");
const dataFile = path.join(projectRoot, "data", "images.ts");
const supported = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

await fs.mkdir(outputDir, { recursive: true });

for (const file of await fs.readdir(outputDir)) {
  await fs.rm(path.join(outputDir, file), { force: true });
}

const sourceFiles = (await fs.readdir(sourceDir))
  .filter((file) => supported.has(path.extname(file).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const images = [];

for (const [index, file] of sourceFiles.entries()) {
  const id = index + 1;
  const outputName = `portfolio-${String(id).padStart(3, "0")}.webp`;
  const inputPath = path.join(sourceDir, file);
  const outputPath = path.join(outputDir, outputName);

  const result = await sharp(inputPath)
    .rotate()
    .resize({
      width: 1800,
      height: 1800,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 76, effort: 5 })
    .toFile(outputPath);

  images.push({
    id,
    src: `/gallery-web/${outputName}`,
    alt: `Weds by Artsy portfolio photograph ${id}`,
    width: result.width,
    height: result.height,
  });
}

const lines = [
  "export type GalleryImage = {",
  "  id: number;",
  "  src: string;",
  "  alt: string;",
  "  width: number;",
  "  height: number;",
  "};",
  "",
  "export const galleryImages: GalleryImage[] = [",
];

for (const image of images) {
  lines.push(
    "  {",
    `    id: ${image.id},`,
    `    src: "${image.src}",`,
    `    alt: "${image.alt}",`,
    `    width: ${image.width},`,
    `    height: ${image.height},`,
    "  },",
  );
}

lines.push("];", "");

await fs.writeFile(dataFile, lines.join("\n"), "utf8");

const originals = await totalBytes(sourceDir);
const optimized = await totalBytes(outputDir);
const saved = originals > 0 ? Math.round((1 - optimized / originals) * 100) : 0;

console.log(
  `Optimized ${images.length} images from ${formatBytes(originals)} to ${formatBytes(
    optimized,
  )} (${saved}% smaller).`,
);

async function totalBytes(dir) {
  const files = await fs.readdir(dir);
  let total = 0;

  for (const file of files) {
    const stat = await fs.stat(path.join(dir, file));
    if (stat.isFile()) {
      total += stat.size;
    }
  }

  return total;
}

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
