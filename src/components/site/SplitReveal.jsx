import { useEffect, useRef, useState } from "react";
import SplitStage from "./split/SplitStage";
import { flavorIndexAt } from "./split/flavors";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function SplitReveal() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const progressRef = useRef(0);
  const flavorRef = useRef(0);
  const [stillOnly, setStillOnly] = useState(false);
  const [flavorIndex, setFlavorIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setStillOnly(true);
  }, []);

  useEffect(() => {
    if (stillOnly) return undefined;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = track.offsetHeight - window.innerHeight;
      const progress = distance > 0 ? clamp(-track.getBoundingClientRect().top / distance, 0, 1) : 0;
      progressRef.current = progress;
      stage.style.setProperty("--split", progress.toFixed(4));
      stage.style.setProperty("--copy", clamp((progress - 0.58) / 0.14, 0, 1).toFixed(4));
      const splashIn = clamp((progress - 0.1) / 0.18, 0, 1);
      const splashOut = 1 - clamp((progress - 0.42) / 0.2, 0, 1);
      stage.style.setProperty("--splash", (splashIn * splashOut).toFixed(4));
      const flavorsIn = clamp((progress - 0.38) / 0.16, 0, 1);
      const flavorsOut = 1 - clamp((progress - 0.82) / 0.18, 0, 1);
      stage.style.setProperty("--flavors", (flavorsIn * flavorsOut).toFixed(4));
      stage.classList.toggle("is-open", progress > 0.6);

      const nextFlavor = flavorIndexAt(progress);
      if (nextFlavor !== flavorRef.current) {
        flavorRef.current = nextFlavor;
        setFlavorIndex(nextFlavor);
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [stillOnly]);

  if (stillOnly) {
    return (
      <section id="split" className="split-section relative overflow-hidden bg-[#241409] px-4 py-16">
        <SplitStage progressRef={progressRef} showCanvas={false} open flavorIndex={flavorIndex} />
      </section>
    );
  }

  return (
    <section id="split" className="split-section relative">
      <div ref={trackRef} className="relative h-[280vh] sm:h-[340vh]">
        <div
          ref={stageRef}
          className="split-pin sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden"
        >
          <SplitStage progressRef={progressRef} flavorIndex={flavorIndex} />
        </div>
      </div>
    </section>
  );
}