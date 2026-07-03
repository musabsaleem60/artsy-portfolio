"use client";

import { GalleryImage } from "@/data/images";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type ImageCardProps = {
  image: GalleryImage;
  onOpen: () => void;
  priority?: boolean;
};

export default function ImageCard({ image, onOpen, priority }: ImageCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-[6px] bg-graphite text-left shadow-soft outline-none ring-gold/70 transition focus-visible:ring-2"
      aria-label={`Open ${image.alt}`}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
      >
        {!loaded ? (
          <div className="absolute inset-0 animate-pulse bg-[linear-gradient(115deg,#151211,#2a241f,#181412)]" />
        ) : null}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.045 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes="(min-width: 1560px) 20vw, (min-width: 1180px) 25vw, (min-width: 900px) 33vw, (min-width: 520px) 50vw, 100vw"
            className={`object-cover transition duration-700 ${
              loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
            }`}
            onLoad={() => setLoaded(true)}
          />
        </motion.div>
      </div>
    </button>
  );
}
