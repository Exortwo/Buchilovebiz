import SplatterButton from "./SplatterButton";

const LINKS = [
  { label: "Our story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Packages", href: "#packages" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#order" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-full border border-[#ffcd6b]/25 bg-[#2b1a11]/70 px-4 py-2 backdrop-blur-md"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffcd6b] shadow-[0_0_12px_rgba(255,205,107,0.9)]" />
          <span className="font-heading text-[11px] tracking-[0.16em] text-[#fffbf2] sm:text-xs">
            BUCHI LOVE
          </span>
        </a>

        <nav className="hidden items-center gap-7 rounded-full border border-white/10 bg-[#2b1a11]/55 px-6 py-2.5 backdrop-blur-md md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#f3e0c6]/80 transition-colors hover:text-[#ffcd6b]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <SplatterButton
          as="a"
          href="#order"
          className="rounded-full bg-[#d97706] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#fffbf2] shadow-[0_10px_30px_-12px_rgba(217,119,6,0.9)] transition-colors hover:bg-[#c46a05] sm:text-[13px]"
        >
          Order
        </SplatterButton>
      </div>
    </header>
  );
}