"use client";

import ImageCard from "@/components/ImageCard";
import PortfolioLightbox from "@/components/Lightbox";
import { GalleryImage } from "@/data/images";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const BATCH_SIZE = 16;

type MasonryGalleryProps = {
  images: GalleryImage[];
};

export default function MasonryGallery({ images }: MasonryGalleryProps) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const visibleImages = useMemo(
    () => images.slice(0, visibleCount),
    [images, visibleCount],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((count) =>
            Math.min(count + BATCH_SIZE, images.length),
          );
        }
      },
      { rootMargin: "900px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [images.length]);

  return (
    <section
      id="gallery"
      className="mx-auto max-w-[2400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      <motion.div layout className="masonry">
        <AnimatePresence mode="popLayout">
          {visibleImages.map((image, index) => (
            <motion.div
              layout
              key={image.id}
              className="masonry-item"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.42, delay: Math.min(index * 0.018, 0.18) }}
            >
              <ImageCard
                image={image}
                priority={index < 6}
                onOpen={() => setLightboxIndex(index)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div ref={sentinelRef} className="h-12" aria-hidden="true" />

      {visibleCount < images.length ? (
        <div className="mt-8 flex justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border border-gold/25 border-t-gold" />
        </div>
      ) : null}

      <PortfolioLightbox
        images={images}
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(-1)}
      />
    </section>
  );
}
