"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const whatsappHref = "https://wa.me/923361879079";

export default function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const updateHeader = () => setSolid(window.scrollY > 80);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid
          ? "border-b border-porcelain/10 bg-ink/92 shadow-[0_12px_40px_rgba(0,0,0,0.42)] backdrop-blur-xl"
          : "bg-transparent text-porcelain"
      }`}
    >
      <div className="mx-auto flex max-w-[1920px] flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
            solid
              ? "border-gold/35 bg-gold text-ink hover:bg-champagne"
              : "border-porcelain/28 bg-porcelain/12 text-porcelain backdrop-blur-md hover:border-porcelain/60 hover:bg-porcelain/20"
          }`}
          aria-label="Contact Weds by Artsy on WhatsApp"
        >
          <MessageCircle size={16} strokeWidth={1.8} />
          <span>Contact</span>
          <span className="hidden sm:inline">+92 336 1879079</span>
        </a>

        <a
          href="#gallery"
          className={`text-xs font-medium uppercase tracking-[0.22em] transition ${
            solid
              ? "text-mist hover:text-porcelain"
              : "text-porcelain/78 hover:text-porcelain"
          }`}
        >
          Gallery
        </a>
      </div>
    </header>
  );
}
