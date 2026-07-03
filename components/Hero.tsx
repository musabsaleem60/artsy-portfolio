"use client";

import { motion } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal text-porcelain"
    >
      <div className="absolute inset-0">
        <video
          src="/videos/yusra_barat_promo.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,21,20,0.42),rgba(23,21,20,0.16)_42%,rgba(23,21,20,0.62))]" />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-5 text-center"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.36em] text-champagne">
          Editorial Wedding Photography
        </p>
        <h1 className="font-serif text-[clamp(3.6rem,9vw,9.5rem)] font-semibold leading-[0.86] tracking-normal">
          Weds by Artsy
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-7 text-porcelain/86 sm:text-lg">
          Intimate frames, grand celebrations, and quiet in-between moments
          preserved with an editorial eye.
        </p>
      </motion.div>

      <a
        href="#gallery"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.24em] text-porcelain/75 transition hover:text-porcelain"
        aria-label="Scroll to gallery"
      >
        <span>Gallery</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={20} strokeWidth={1.6} />
        </motion.span>
      </a>

      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-8 right-8 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/40 text-porcelain backdrop-blur-md transition hover:bg-charcoal/60 hover:scale-105 active:scale-95"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </section>
  );
}
