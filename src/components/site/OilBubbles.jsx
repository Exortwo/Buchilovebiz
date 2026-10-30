import { cn } from "@/lib/utils";

const BUBBLES = [
  { left: "4%", size: 9, duration: 15, delay: -1, drift: "26px", opacity: 0.5 },
  { left: "11%", size: 15, duration: 19, delay: -7, drift: "-18px", opacity: 0.38 },
  { left: "19%", size: 6, duration: 12, delay: -4, drift: "14px", opacity: 0.6 },
  { left: "27%", size: 12, duration: 21, delay: -12, drift: "30px", opacity: 0.32 },
  { left: "34%", size: 5, duration: 14, delay: -9, drift: "-22px", opacity: 0.55 },
  { left: "41%", size: 18, duration: 24, delay: -3, drift: "20px", opacity: 0.24 },
  { left: "48%", size: 8, duration: 16, delay: -14, drift: "-26px", opacity: 0.48 },
  { left: "55%", size: 11, duration: 20, delay: -6, drift: "18px", opacity: 0.34 },
  { left: "62%", size: 6, duration: 13, delay: -11, drift: "-14px", opacity: 0.58 },
  { left: "69%", size: 16, duration: 23, delay: -2, drift: "28px", opacity: 0.28 },
  { left: "76%", size: 8, duration: 17, delay: -8, drift: "-20px", opacity: 0.46 },
  { left: "83%", size: 12, duration: 22, delay: -15, drift: "24px", opacity: 0.3 },
  { left: "89%", size: 5, duration: 12, delay: -5, drift: "-16px", opacity: 0.62 },
  { left: "94%", size: 14, duration: 25, delay: -10, drift: "22px", opacity: 0.26 },
  { left: "58%", size: 4, duration: 11, delay: -13, drift: "12px", opacity: 0.6 },
  { left: "22%", size: 4, duration: 10, delay: -16, drift: "-12px", opacity: 0.55 },
];

export default function OilBubbles({ className }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {BUBBLES.map((bubble, index) => (
        <span
          key={index}
          className="bubble"
          style={{
            left: bubble.left,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            "--bubble-drift": bubble.drift,
            "--bubble-opacity": bubble.opacity,
          }}
        />
      ))}
    </div>
  );
}