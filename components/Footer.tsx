import { Instagram, Mail, MessageCircle } from "lucide-react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: Instagram,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/923361879079",
    icon: MessageCircle,
  },
  {
    label: "Email",
    href: "mailto:hello@wedsbyartsy.com",
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-porcelain/10 bg-ink px-5 py-10 text-porcelain sm:px-8">
      <div className="mx-auto flex max-w-[1920px] flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-serif text-3xl font-semibold leading-none">
            Weds by Artsy
          </p>
          <p className="mt-2 text-sm text-mist">
            Copyright &copy; {new Date().getFullYear()} Weds by Artsy. All rights
            reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="grid h-11 w-11 place-items-center rounded-full border border-porcelain/14 text-porcelain transition hover:border-gold hover:bg-gold hover:text-ink"
              title={label}
            >
              <Icon size={18} strokeWidth={1.8} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
