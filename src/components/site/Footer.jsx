import { Facebook, Instagram, Phone } from "lucide-react";
import { contact } from "@/data/site";

const LINKS = [
  { label: "Our story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Packages", href: "#packages" },
  { label: "Why you'll love it", href: "#why" },
  { label: "Reviews", href: "#reviews" },
  { label: "Order", href: "#order" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#1f1109] px-4 pb-10 pt-16 text-[#f7e6cd] sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 border-b border-[#ffcd6b]/15 pb-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-heading text-2xl leading-none text-[#ffc45c]">BUCHI LOVE</p>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-[#e8c9a0]/70">
              Golden fried sesame rice balls with warm sweet fillings. Made fresh, in small batches,
              every single day.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={contact.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="BUCHI LOVE on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ffcd6b]/25 text-[#ffc45c] transition-colors hover:bg-[#ffcd6b]/10"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.8} />
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="BUCHI LOVE on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ffcd6b]/25 text-[#ffc45c] transition-colors hover:bg-[#ffcd6b]/10"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.8} />
              </a>
              <a
                href={contact.phoneHref}
                aria-label="Call BUCHI LOVE"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ffcd6b]/25 text-[#ffc45c] transition-colors hover:bg-[#ffcd6b]/10"
              >
                <Phone className="h-4 w-4" strokeWidth={1.8} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#c9a882]/70">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[14px] text-[#f7e6cd]/80 transition-colors hover:text-[#ffc45c]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#c9a882]/70">Reach us</p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[#f7e6cd]/80">
              <li>
                <a href={contact.phoneHref} className="transition-colors hover:text-[#ffc45c]">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>{contact.hours}</li>
              <li className="leading-relaxed text-[#f7e6cd]/65">{contact.location}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[11px] text-[#c9a882]/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BUCHI LOVE. Fried with real sesame and a lot of patience.</p>
          <p className="uppercase tracking-[0.18em]">Crisp outside · Chewy inside</p>
        </div>
      </div>
    </footer>
  );
}