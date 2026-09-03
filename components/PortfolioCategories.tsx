"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import Image from "next/image";

export default function PortfolioCategories() {
  return (
    <section className="mx-auto max-w-[1920px] px-4 py-20 sm:px-8 lg:px-10" id="portfolio">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-light tracking-widest text-porcelain uppercase">Our Portfolio</h2>
        <p className="mt-4 text-sm text-porcelain/60 max-w-2xl mx-auto">
          Explore our collection of premium wedding photography and cinematography.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.map((category, index) => {
          // Use the first image of the category as the cover
          const coverImage = category.images.length > 0 ? category.images[0].src : "/gallery-web/portfolio-001.webp"; // fallback

          return (
            <Link key={category.id} href={`/portfolio/${category.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl aspect-[3/4] cursor-pointer"
              >
                <Image
                  src={coverImage}
                  alt={`${category.title} Portfolio`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col items-center">
                  <h3 className="text-2xl font-light tracking-[0.2em] text-porcelain uppercase mb-2">
                    {category.title}
                  </h3>
                  <span className="text-xs tracking-widest text-gold opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 uppercase border-b border-gold pb-1">
                    View Gallery
                  </span>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
