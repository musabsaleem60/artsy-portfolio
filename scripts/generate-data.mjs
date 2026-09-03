import fs from "node:fs/promises";
import path from "node:path";

const sourceDir = "G:/My Drive/Artsy Portfolio/Portfolio Images";
const projectRoot = process.cwd();
const dataFile = path.join(projectRoot, "data", "portfolio.ts");
const supported = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const categoryMap = {
  Mehandi: { id: "mehndi", title: "Mehndi" },
  Barat: { id: "barat", title: "Barat" },
  Nikkah: { id: "nikah", title: "Nikah" },
  Engagement: { id: "engagement", title: "Engagement" },
  Valima: { id: "valima", title: "Valima" },
};

const videosData = {
  barat: [
    { id: "barat-vid-1", youtubeUrl: "https://www.youtube.com/watch?v=-iL96JC3AUo", title: "YUSRA BARAT PROMO" },
    { id: "barat-vid-2", youtubeUrl: "https://www.youtube.com/watch?v=ot7uKDEo1lQ", title: "Shahzaib Promo Baraat" },
    { id: "barat-vid-3", youtubeUrl: "https://www.youtube.com/watch?v=2yngjhmmGyQ", title: "Hateez's Baraat" },
    { id: "barat-vid-4", youtubeUrl: "https://www.youtube.com/watch?v=xqA7KjffwIg", title: "ARSALAN & FAIZA BARAT PROMO" },
    { id: "barat-vid-5", youtubeUrl: "https://www.youtube.com/watch?v=ITL93YA6bQo", title: "Arsal Promo Baraat" },
    { id: "barat-vid-6", youtubeUrl: "https://www.youtube.com/watch?v=phUX9tuiCaE", title: "Ali & Fatima Baraat Promo" },
  ],
  nikah: [
    { id: "nikah-vid-1", youtubeUrl: "https://www.youtube.com/watch?v=g42ykqMTe0E", title: "Sultan & Amna Nikah Promo" },
  ],
  valima: [
    { id: "valima-vid-1", youtubeUrl: "https://www.youtube.com/watch?v=S77ICf1B5Xw", title: "MARIF VALIMA PROMO" },
    { id: "valima-vid-2", youtubeUrl: "https://www.youtube.com/watch?v=mWbz1aZ6hys", title: "ANOOSHA & ARSAL Promo Valima" },
  ],
  engagement: [
    { id: "engagement-vid-1", youtubeUrl: "https://www.youtube.com/watch?v=oOPI8qe2gRM", title: "AUN & DUA PROMO Engagement" },
  ],
  mehndi: [],
};

async function generate() {
  let folders = [];
  try {
    folders = await fs.readdir(sourceDir);
  } catch (e) {
    console.error("Could not read G: drive.");
    return;
  }

  const portfolioData = [];

  for (const folder of folders) {
    if (!categoryMap[folder]) continue;
    
    const categoryInfo = categoryMap[folder];
    const catSourceDir = path.join(sourceDir, folder);
    
    const files = await fs.readdir(catSourceDir);
    const sourceFiles = files
      .filter((file) => supported.has(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
      
    const images = [];
    
    for (let i = 0; i < sourceFiles.length; i++) {
      const id = i + 1;
      const outputName = `img-${String(id).padStart(3, "0")}.webp`;
      
      images.push({
        id: `${categoryInfo.id}-img-${id}`,
        src: `/gallery-web/${categoryInfo.id}/${outputName}`,
        alt: `Artsy ${categoryInfo.title} photography - ${id}`,
        width: 1080,
        height: 1620,
      });
    }
    
    portfolioData.push({
      id: categoryInfo.id,
      title: categoryInfo.title,
      images,
      videos: videosData[categoryInfo.id] || [],
    });
  }

  const orderedCategories = ["mehndi", "barat", "nikah", "engagement", "valima"];
  const sortedPortfolioData = orderedCategories.map(catId => 
    portfolioData.find(cat => cat.id === catId)
  ).filter(Boolean);

  const lines = [
    `export type PortfolioImage = {`,
    `  id: string;`,
    `  src: string;`,
    `  alt: string;`,
    `  width: number;`,
    `  height: number;`,
    `};`,
    ``,
    `export type PortfolioVideo = {`,
    `  id: string;`,
    `  youtubeUrl: string;`,
    `  title: string;`,
    `};`,
    ``,
    `export type PortfolioCategory = {`,
    `  id: string;`,
    `  title: string;`,
    `  images: PortfolioImage[];`,
    `  videos: PortfolioVideo[];`,
    `};`,
    ``,
    `export const portfolioData: PortfolioCategory[] = ${JSON.stringify(sortedPortfolioData, null, 2)};`,
    ``,
  ];

  await fs.writeFile(dataFile, lines.join("\n"), "utf8");
  console.log("portfolio.ts generated.");
}

generate();
