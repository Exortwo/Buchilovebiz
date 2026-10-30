import { Star, Quote } from "lucide-react";
import Reveal from "./Reveal";
import { reviews } from "@/data/site";

export default function Reviews() {
  return (
    <section id="reviews" className="relative scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#4a2c1a]/75">
                Customer reviews
              </p>
              <h2 className="mt-4 font-heading text-[clamp(1.85rem,5.5vw,2.9rem)] leading-[1.08] text-[#2b1a11]">
                Warm words from regulars.
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#2b1a11]/12 bg-[#fffbf2]/70 px-4 py-2">
              <div className="flex text-[#d97706]">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                ))}
              </div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#5c4030]">
                4.9 average
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-11 grid gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 110} className="h-full">
              <figure className="relative flex h-full flex-col rounded-[1.75rem] bg-[#fffbf2] p-6 shadow-[0_26px_50px_-32px_rgba(43,26,17,0.5)] sm:p-7">
                <Quote className="h-6 w-6 text-[#e2a35a]" strokeWidth={2} />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[#3d2a1d]">
                  "{review.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[#ecd9bd] pt-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2b1a11] font-heading text-[12px] text-[#ffc45c]">
                    {review.name.slice(0, 1)}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#2b1a11]">{review.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#8a6a4e]">
                      {review.meta}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}