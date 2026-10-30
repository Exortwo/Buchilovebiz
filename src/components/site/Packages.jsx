import Reveal from "./Reveal";
import { mixedFlavorPackages, singleFlavorPackages } from "@/data/site";

const peso = (amount) => `₱${amount.toLocaleString("en-PH")}`;

function PackageCard({ children, delay = 0 }) {
  return (
    <Reveal delay={delay} variant="drop" className="h-full">
      <article className="h-full rounded-[1.5rem] border border-[#ffcd6b]/20 bg-[#2b1a11]/65 p-5 shadow-[0_24px_50px_-34px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:p-6">
        {children}
      </article>
    </Reveal>
  );
}

export default function Packages() {
  return (
    <section id="packages" className="relative scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffcd6b]/90">
            Made for sharing
          </p>
          <h2 className="mt-4 font-heading text-[clamp(1.85rem,5.5vw,2.9rem)] leading-[1.08] text-[#fffbf2]">
            BUCHI BOX PACKAGES
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[#f7e6cd]/85">
            Choose one favorite or bring home a little of every flavor.
          </p>
        </Reveal>

        <div className="mt-12">
          <Reveal>
            <h3 className="font-heading text-xl text-[#ffc45c] sm:text-2xl">
              Single-flavor packages
            </h3>
          </Reveal>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {singleFlavorPackages.map((box, index) => (
              <PackageCard key={box.name} delay={index * 80}>
                <h4 className="font-heading text-lg leading-snug text-[#fffbf2]">{box.name}</h4>
                <p className="mt-2 text-sm text-[#e8c9a0]/75">{box.pieces} pieces · one flavor</p>
                <ul className="mt-5 space-y-3 border-t border-[#ffcd6b]/15 pt-4">
                  {box.prices.map((item) => (
                    <li
                      key={item.flavor}
                      className="flex items-center justify-between gap-4 text-sm text-[#f7e6cd]/90"
                    >
                      <span>{item.flavor}</span>
                      <span className="font-heading text-[#ffc45c]">{peso(item.price)}</span>
                    </li>
                  ))}
                </ul>
              </PackageCard>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Reveal>
            <h3 className="font-heading text-xl text-[#ffc45c] sm:text-2xl">
              Mixed-flavor packages
            </h3>
          </Reveal>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {mixedFlavorPackages.map((box, index) => (
              <PackageCard key={box.name} delay={index * 80}>
                <h4 className="font-heading text-lg leading-snug text-[#fffbf2]">{box.name}</h4>
                <div className="mt-2 flex items-baseline justify-between gap-3">
                  <p className="text-sm text-[#e8c9a0]/75">{box.pieces} pieces</p>
                  <p className="font-heading text-xl text-[#ffc45c]">{peso(box.price)}</p>
                </div>
                <ul className="mt-5 space-y-3 border-t border-[#ffcd6b]/15 pt-4">
                  {box.portions.map((item) => (
                    <li
                      key={item.flavor}
                      className="flex items-center justify-between gap-4 text-sm text-[#f7e6cd]/90"
                    >
                      <span>{item.flavor}</span>
                      <span>{item.pieces} pieces</span>
                    </li>
                  ))}
                </ul>
              </PackageCard>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <div className="mt-9 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] border border-[#fffbf2]/25 bg-[#fffbf2]/10 px-5 py-5 backdrop-blur-sm sm:flex-row sm:items-center sm:px-7">
            <p className="text-[15px] leading-relaxed text-[#fff6e6]">
              Found your box? Get in touch to place an order.
            </p>
            <a
              href="#order"
              className="shrink-0 rounded-full bg-[#fffbf2] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#2b1a11] transition-colors hover:bg-[#ffe9c4]"
            >
              Order a box
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
