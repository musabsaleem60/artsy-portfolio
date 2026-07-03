# Weds by Artsy Gallery Portfolio

A single-page wedding photography gallery portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, `next/image`, and `yet-another-react-lightbox`.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Replace Gallery Images

All gallery content lives in `data/images.ts`.

The current gallery images were imported from:

```text
G:\My Drive\Artsy Portfolio
```

To re-import photos from that folder, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\import-gallery.ps1 -Source "G:\My Drive\Artsy Portfolio"
```

The script copies every `.jpg`, `.jpeg`, `.png`, `.webp`, and `.avif` into `public/gallery` with neutral filenames and regenerates `data/images.ts` with the correct dimensions.

For faster loading, optimize the imported originals:

```powershell
npm run optimize:gallery
```

This creates compressed WebP files in `public/gallery-web` and updates the site to use those web images.

## Structure

```text
app/
components/
  Header.tsx
  Hero.tsx
  MasonryGallery.tsx
  ImageCard.tsx
  Lightbox.tsx
  Footer.tsx
data/
  images.ts
```

The gallery renders only the first 20 filtered images, then loads additional batches with `IntersectionObserver` as the user scrolls.
