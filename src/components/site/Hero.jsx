import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Image } from "@/components/ui/image";
import OilBubbles from "./OilBubbles";
import SplatterButton from "./SplatterButton";
import Reveal from "./Reveal";
import { images } from "@/data/site";

export default function Hero() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const shift = Math.min(window.scrollY * 0.14, 130);
        el.style.transform = `translate3d(0, ${shift}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:pb-28 lg:pt-36">
      <OilBubbles />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(217,119,6,0.28),transparent_68%)] blur-3xl" />
      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#3b2111]/60" />
      

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-10 lg:gap-16">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ffcd6b]/30 bg-[#ffcd6b]/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.26em] text-[#ffdca4] sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffcd6b]" />
              Fried fresh, in small batches
            </span>
          </Reveal>

          <div className="relative mt-6">
            <div aria-hidden="true" className="sizzle-glow absolute -inset-x-12 -inset-y-10" />
            <Reveal delay={80}>
              <h1 className="relative font-heading text-[clamp(2.7rem,11.5vw,5.2rem)] leading-[0.92] tracking-[-0.02em] text-[#fffbf2] text-glow">
                BUCHI
                <br className="md:hidden" />
                <span className="text-[#ffc45c] md:ml-4">LOVE</span>
              </h1>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[#f7e6cd]/85 sm:text-lg">
              Crisp golden sesame shell, soft chewy rice heart, warm sweet filling inside. Little
              fried rice balls, made the slow way — and best eaten while still hot.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <SplatterButton
                as="a"
                href="#order"
                className="rounded-full bg-[#d97706] px-7 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#fffbf2] shadow-[0_18px_40px_-18px_rgba(217,119,6,0.95)] transition-all hover:-translate-y-0.5 hover:bg-[#e88410] active:translate-y-0">
                
                Order Now
              </SplatterButton>
              <SplatterButton
                as="a"
                href="#menu"
                className="rounded-full border border-[#ffcd6b]/35 px-7 py-4 text-sm font-medium text-[#ffe7c4] transition-colors hover:border-[#ffcd6b]/70 hover:bg-[#ffcd6b]/10">
                
                See the menu
              </SplatterButton>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-[#e8c9a0]/70">
              Enjoy freshly made buchi without spending too much. Prices start at just ₱20 per
              piece.
            </p>
          </Reveal>
        </div>

        <Reveal variant="drop" delay={150} className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_50%_45%,rgba(255,186,84,0.34),transparent_70%)] blur-2xl" />
          
          <div ref={parallaxRef} className="hero-parallax relative">
            <div className="float-bob relative overflow-hidden rounded-[2rem] border border-[#ffcd6b]/20 shadow-[0_50px_90px_-45px_rgba(0,0,0,0.9)]">
              <Image
                src={images.hero}
                alt="Golden sesame-coated buchi piled together, one broken open to show its sweet filling"
                className="aspect-[4/5] w-full sm:aspect-[5/5] md:aspect-[4/5]" />
              
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2b1a11]/60 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 left-3 flex items-center gap-3 rounded-2xl bg-[#fffbf2] px-4 py-3 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.7)] sm:left-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d97706] opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d97706]" />
              </span>
              <div>
                <p className="font-heading text-[13px] leading-none text-[#2b1a11]">Fresh batch</p>
                <p className="mt-1 text-[11px] leading-none text-[#7a5a3f]">Fried today · still warm</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 flex max-w-6xl justify-center">
        <a
          href="#story"
          className="group inline-flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#e8c9a0]/70 transition-colors hover:text-[#ffcd6b]">
          
          Scroll to sizzle
          <ArrowDown className="h-4 w-4 animate-bounce text-[#ffc45c]" />
        </a>
      </div>
    </section>);

}