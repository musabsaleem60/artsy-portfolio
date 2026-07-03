"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MasonryGallery from "@/components/MasonryGallery";
import { galleryImages } from "@/data/images";

export default function GalleryShell() {
  return (
    <>
      <Header />
      <Hero />
      <MasonryGallery images={galleryImages} />
    </>
  );
}
