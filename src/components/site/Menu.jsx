import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";
import { images } from "@/data/site";

const SPARKS = [
  { left: "24%", top: "38%", sx: "10px", sy: "-26px" },
  { left: "58%", top: "26%", sx: "-14px", sy: "-30px" },
  { left: "70%", top: "56%", sx: "16px", sy: "-18px" },
  { left: "38%", top: "66%", sx: "-10px", sy: "-28px" },
];

export default function Menu({ flavors }) {
  return (
    <section id="menu" className="relative scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#fff3dc]/85">The menu</p>
          <h2 className="mt-4 max-w-2xl font-heading text-[clamp(1.85rem,5.5vw,2.9rem)] leading-[1.08] text-[#fffbf2]">
            Pick your filling.
          </h2>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[#fff1da]/85">
            Hand-rolled, sesame-coated and fried to order. Choose your favorite filling, then find
            a box size in our package list.
          </p>
        </Reveal>

        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {flavors.map((flavor, index) => (
            <Reveal key={flavor.name} variant="drop" delay={index * 90} className="h-full">
              <article className="buchi-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-[#fffbf2] p-3 shadow-[0_30px_55px_-32px_rgba(43,26,17,0.75)]">
                <div className="card-glow pointer-events-none absolute inset-0 rounded-[1.75rem]" />

                <div className="relative overflow-hidden rounded-[1.35rem] bg-[#2b1a11]">
                  <Image
                    src={flavor.image || images.menu[index % images.menu.length]}
                    alt={`${flavor.name} buchi`}
                    className="buchi-photo aspect-square w-full"
                  />
                  <span aria-hidden="true" className="photo-sheen pointer-events-none absolute inset-0 z-10" />
                  {SPARKS.map((spark, i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className="sizzle-spark"
                      style={{
                        left: spark.left,
                        top: spark.top,
                        "--sx": spark.sx,
                        "--sy": spark.sy,
                        animationDelay: `${i * 90}ms`,
                      }}
                    />
                  ))}
                  {flavor.tag && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#2b1a11]/85 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#ffcd6b] backdrop-blur-sm">
                      {flavor.tag}
                    </span>
                  )}
                </div>

                <div className="relative flex flex-1 flex-col px-2 pb-1 pt-4">
                  <h3 className="font-heading text-[16px] leading-snug text-[#2b1a11]">
                    {flavor.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-[#5c4030]">
                    {flavor.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#e9d6b9] pt-3">
                    <span className="font-heading text-lg text-[#a9691f]">₱{flavor.price} each</span>
                    <a
                      href="#order"
                      className="rounded-full px-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#2b1a11] underline decoration-[#d97706] decoration-2 underline-offset-4 transition-colors hover:text-[#d97706]"
                    >
                      Order
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-9 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] border border-[#fffbf2]/25 bg-[#fffbf2]/10 px-5 py-5 backdrop-blur-sm sm:flex-row sm:items-center sm:px-7">
            <p className="text-[15px] leading-relaxed text-[#fff6e6]">
              Sharing with a group? Explore our single-flavor and mixed-flavor boxes.
            </p>
            <a
              href="#packages"
              className="shrink-0 rounded-full bg-[#fffbf2] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#2b1a11] transition-colors hover:bg-[#ffe9c4]"
            >
              View box packages
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}