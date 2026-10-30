import { useEffect } from "react";

/* Slow cream swirls poured behind the page. Each blob drifts on its own
   animation and slides a little with the scroll (deeper blobs move more). */
const BLOBS = [
  {
    top: "-8%",
    left: "-14%",
    w: "clamp(260px, 42vw, 620px)",
    h: "clamp(240px, 34vw, 520px)",
    color: "rgba(255, 247, 230, 0.34)",
    depth: 0.85,
    duration: "26s",
    delay: "0s",
    mobile: true,
  },
  {
    top: "4%",
    left: "46%",
    w: "clamp(240px, 38vw, 560px)",
    h: "clamp(220px, 30vw, 460px)",
    color: "rgba(246, 227, 193, 0.3)",
    depth: 0.55,
    duration: "32s",
    delay: "-6s",
    mobile: true,
  },
  {
    top: "24%",
    left: "-18%",
    w: "clamp(260px, 44vw, 640px)",
    h: "clamp(220px, 32vw, 480px)",
    color: "rgba(214, 165, 92, 0.26)",
    depth: 0.35,
    duration: "38s",
    delay: "-14s",
    mobile: false,
  },
  {
    top: "38%",
    left: "58%",
    w: "clamp(240px, 40vw, 600px)",
    h: "clamp(240px, 34vw, 520px)",
    color: "rgba(255, 240, 214, 0.26)",
    depth: 0.72,
    duration: "29s",
    delay: "-9s",
    mobile: false,
  },
  {
    top: "54%",
    left: "6%",
    w: "clamp(280px, 46vw, 660px)",
    h: "clamp(240px, 34vw, 520px)",
    color: "rgba(233, 205, 158, 0.3)",
    depth: 0.5,
    duration: "34s",
    delay: "-18s",
    mobile: true,
  },
  {
    top: "70%",
    left: "52%",
    w: "clamp(260px, 42vw, 600px)",
    h: "clamp(220px, 30vw, 460px)",
    color: "rgba(255, 244, 220, 0.28)",
    depth: 0.3,
    duration: "40s",
    delay: "-4s",
    mobile: false,
  },
  {
    top: "84%",
    left: "-10%",
    w: "clamp(280px, 48vw, 680px)",
    h: "clamp(240px, 32vw, 500px)",
    color: "rgba(222, 178, 112, 0.26)",
    depth: 0.62,
    duration: "31s",
    delay: "-12s",
    mobile: true,
  },
];

export default function CreamBackground() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      root.style.setProperty("--cream-shift", `${window.scrollY * 0.22}px`);
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
      root.style.removeProperty("--cream-shift");
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="cream-layer pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {BLOBS.map((blob, index) => (
        <div
          key={index}
          className={blob.mobile ? "cream-float" : "cream-float hidden sm:block"}
          style={{
            top: blob.top,
            left: blob.left,
            width: blob.w,
            height: blob.h,
            "--depth": blob.depth,
          }}
        >
          <span
            className="cream-melt"
            style={{
              background: `radial-gradient(circle at 42% 38%, ${blob.color}, transparent 70%)`,
              animationDuration: blob.duration,
              animationDelay: blob.delay,
            }}
          />
        </div>
      ))}
    </div>
  );
}