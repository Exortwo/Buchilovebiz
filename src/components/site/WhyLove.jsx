import { Flame, ChefHat, Clock3 } from "lucide-react";
import Reveal from "./Reveal";
import { reasons } from "@/data/site";

const ICONS = {
  flame: Flame,
  chef: ChefHat,
  clock: Clock3,
};

export default function WhyLove() {
  return (
    <section id="why" className="relative scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#4a2c1a]/75">Why you'll love it</p>
          <h2 className="mt-4 max-w-2xl font-heading text-[clamp(1.85rem,5.5vw,2.9rem)] leading-[1.08] text-[#2b1a11]">
            Three reasons one box is never enough.
          </h2>
        </Reveal>

        <div className="mt-11 grid gap-5 md:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = ICONS[reason.icon] || Flame;
            return (
              <Reveal key={reason.title} delay={index * 110} className="h-full">
                <div className="group relative flex h-full flex-col rounded-[1.75rem] border border-[#2b1a11]/10 bg-[#fffbf2]/80 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#2b1a11]/20 hover:bg-[#fffbf2] hover:shadow-[0_30px_60px_-35px_rgba(43,26,17,0.55)] sm:p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2b1a11] text-[#ffc45c] shadow-[0_14px_30px_-14px_rgba(43,26,17,0.8)] transition-transform duration-500 group-hover:-rotate-6">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-6 font-heading text-[17px] leading-snug text-[#2b1a11]">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#5c4030]">{reason.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}