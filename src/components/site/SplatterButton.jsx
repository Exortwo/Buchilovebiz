import { cn } from "@/lib/utils";

const DOTS = [
  { tx: "-46px", ty: "-30px", size: 7, delay: 0 },
  { tx: "42px", ty: "-34px", size: 5, delay: 60 },
  { tx: "-38px", ty: "26px", size: 5, delay: 120 },
  { tx: "48px", ty: "20px", size: 7, delay: 30 },
  { tx: "-58px", ty: "2px", size: 4, delay: 90 },
  { tx: "58px", ty: "-4px", size: 4, delay: 150 },
  { tx: "4px", ty: "-48px", size: 6, delay: 45 },
  { tx: "-6px", ty: "44px", size: 6, delay: 105 },
];

export default function SplatterButton({ as: Tag = "button", className, children, ...props }) {
  return (
    <Tag
      className={cn(
        "group/splatter relative isolate inline-flex items-center justify-center gap-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffe0a8] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        className
      )}
      {...props}
    >
      {DOTS.map((dot, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="splatter-dot"
          style={{
            left: "50%",
            top: "50%",
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animationDelay: `${dot.delay}ms`,
            "--tx": dot.tx,
            "--ty": dot.ty,
          }}
        />
      ))}
      {children}
    </Tag>
  );
}