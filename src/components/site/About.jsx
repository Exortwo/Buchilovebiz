import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";
import { images } from "@/data/site";

export default function About() {
  return (
    <section id="story" className="relative scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-14">
        <Reveal variant="roll" className="relative order-2 md:order-1">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-5 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,186,84,0.22),transparent_70%)] blur-xl" />
          
          <div className="relative overflow-hidden rounded-[1.9rem] border border-[#ffcd6b]/20 shadow-[0_40px_80px_-45px_rgba(0,0,0,0.85)]">
            <Image
              src={images.about}
              alt="Two hands holding a single golden sesame buchi over a wooden table"
              className="aspect-[4/3] w-full" />
            
          </div>
          <div className="absolute -right-2 -top-5 rotate-3 rounded-full border border-[#ffcd6b]/30 bg-[#2b1a11]/85 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#ffdca4] backdrop-blur-sm sm:-right-4">
            Since 2019
          </div>
        </Reveal>

        <div className="order-1 md:order-2">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffcd6b]/90">Our story</p>
            <h2 className="mt-4 font-heading text-[clamp(1.85rem,5.5vw,2.9rem)] leading-[1.08] text-[#fffbf2]">
              From Classmates to Buchi Makers
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 text-[16.5px] leading-relaxed text-[#f7e6cd]/85">It all started with a simple idea among classmates. One day, we realized that one of our classmates had a special talent for making delicious buchi. Inspired by this, we decided to turn that talent into a small business that we could build together.With teamwork, passion, and a shared goal, we began our journey of making and selling buchi. Each of us took part in preparing, packaging, and selling our products, making the business a team effort.For us, this business is more than just selling buchi. It is an opportunity to share something delicious with others, learn the basics of entrepreneurship, and create meaningful memories as classmates. What started as a simple idea has become our way of turning friendship and talent into something special, one buchi at a time.



            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-4 text-[16.5px] leading-relaxed text-[#f7e6cd]/75">
              We still roll every piece by hand, still toast our own sesame, and still refuse to
              fry more than a batch at a time. It takes longer. It tastes like it too.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#ffcd6b]/20 pt-6">
              {[
              { value: "300+", label: "Rolled each batch" },
              { value: "6", label: "Pieces per box" },
              { value: "0", label: "Frozen shortcuts" }].
              map((stat) =>
              <div key={stat.label}>
                  <p className="font-heading text-2xl text-[#ffc45c] sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-[11px] uppercase leading-relaxed tracking-[0.14em] text-[#e8c9a0]/70">
                    {stat.label}
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>);

}