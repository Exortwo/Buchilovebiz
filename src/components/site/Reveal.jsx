import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  up: "reveal",
  drop: "reveal-drop",
  roll: "reveal-roll",
};

export default function Reveal({ children, className, delay = 0, variant = "up" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let done = false;
    let observer;
    let frame = 0;
    let timer = 0;

    const inView = () => {
      const rect = el.getBoundingClientRect();
      const height = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < height * 0.94 && rect.bottom > 0;
    };

    const show = () => {
      if (done) return;
      done = true;
      setShown(true);
      teardown();
    };

    const check = () => {
      if (inView()) show();
    };

    function teardown() {
      if (observer) observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    }

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) show();
        },
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
      );
      observer.observe(el);
    }

    frame = window.requestAnimationFrame(check);
    timer = window.setTimeout(check, 700);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return teardown;
  }, []);

  return (
    <div
      ref={ref}
      className={cn(VARIANTS[variant] || VARIANTS.up, shown && "is-in", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}