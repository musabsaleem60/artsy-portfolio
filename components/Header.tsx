"use client";

import { MessageCircle, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const whatsappHref = "https://wa.me/923361879079";

const categories = [
  { name: "Mehndi", href: "/portfolio/mehndi" },
  { name: "Barat", href: "/portfolio/barat" },
  { name: "Nikah", href: "/portfolio/nikah" },
  { name: "Engagement", href: "/portfolio/engagement" },
  { name: "Valima", href: "/portfolio/valima" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const updateHeader = () => setSolid(window.scrollY > 80);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid || menuOpen
            ? "border-b border-porcelain/10 bg-ink/92 shadow-[0_12px_40px_rgba(0,0,0,0.42)] backdrop-blur-xl"
            : "bg-transparent text-porcelain"
        }`}
      >
        <div className="mx-auto flex max-w-[1920px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-semibold tracking-[0.2em] uppercase transition ${
                solid || menuOpen ? "text-porcelain" : "text-porcelain"
              }`}
            >
              Artsy
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link
                href="/"
                className={`text-xs font-medium uppercase tracking-[0.2em] transition ${
                  pathname === "/" ? "text-gold" : (solid ? "text-mist hover:text-porcelain" : "text-porcelain/78 hover:text-porcelain")
                }`}
              >
                Home
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className={`text-xs font-medium uppercase tracking-[0.2em] transition ${
                    pathname === cat.href ? "text-gold" : (solid ? "text-mist hover:text-porcelain" : "text-porcelain/78 hover:text-porcelain")
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                solid || menuOpen
                  ? "border-gold/35 bg-gold text-ink hover:bg-champagne"
                  : "border-porcelain/28 bg-porcelain/12 text-porcelain backdrop-blur-md hover:border-porcelain/60 hover:bg-porcelain/20"
              }`}
              aria-label="Contact Weds by Artsy on WhatsApp"
            >
              <MessageCircle size={16} strokeWidth={1.8} />
              <span className="hidden sm:inline">Contact</span>
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-porcelain p-1"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-porcelain/10 bg-ink/95 backdrop-blur-xl absolute top-full left-0 right-0">
            <nav className="flex flex-col px-5 py-4">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-xs font-medium uppercase tracking-[0.2em] border-b border-porcelain/5 ${
                  pathname === "/" ? "text-gold" : "text-porcelain/80"
                }`}
              >
                Home
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-3 text-xs font-medium uppercase tracking-[0.2em] border-b border-porcelain/5 ${
                    pathname === cat.href ? "text-gold" : "text-porcelain/80"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
