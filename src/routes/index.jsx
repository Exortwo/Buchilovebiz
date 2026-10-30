import { createFileRoute } from "@tanstack/react-router";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import SplitReveal from "@/components/site/SplitReveal";
import About from "@/components/site/About";
import Menu from "@/components/site/Menu";
import Packages from "@/components/site/Packages";
import WhyLove from "@/components/site/WhyLove";
import Reviews from "@/components/site/Reviews";
import ContactOrder from "@/components/site/ContactOrder";
import Footer from "@/components/site/Footer";
import CreamBackground from "@/components/site/CreamBackground";
import { flavors } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BUCHI LOVE — Golden fried sesame rice balls" },
      {
        name: "description",
        content:
          "Crisp golden sesame shell, chewy rice heart, warm sweet filling. BUCHI LOVE makes small batches of Filipino buchi to order — pick a filling and we'll get the oil hot.",
      },
    ],
  }),
  component: BuchiLovePage,
});

function BuchiLovePage() {
  return (
    <div className="fry-gradient relative min-h-screen [overflow-x:clip]">
      <div
        aria-hidden="true"
        className="grain-overlay pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
      />
      <CreamBackground />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <SplitReveal />
        <About />
        <Menu flavors={flavors} />
        <Packages />
        <WhyLove />
        <Reviews />
        <ContactOrder flavors={flavors} />
      </main>
      <Footer />
    </div>
  );
}