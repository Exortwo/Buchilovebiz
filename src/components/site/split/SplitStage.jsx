import { lazy, Suspense } from "react";
import { Image } from "@/components/ui/image";
import OilBubbles from "../OilBubbles";
import SplitCopy from "./SplitCopy";
import FlavorLabel from "./FlavorLabel";
import { images } from "@/data/site";
import { cn } from "@/lib/utils";

const Buchi3D = lazy(() => import("./Buchi3D"));

const SPARKS = [
  { left: "26%", top: "34%", sx: "-18px", sy: "-34px", delay: "0ms" },
  { left: "71%", top: "28%", sx: "16px", sy: "-30px", delay: "130ms" },
  { left: "62%", top: "64%", sx: "22px", sy: "-24px", delay: "260ms" },
  { left: "35%", top: "60%", sx: "-16px", sy: "-36px", delay: "390ms" },
  { left: "49%", top: "24%", sx: "8px", sy: "-38px", delay: "520ms" },
];

function StillFigure() {
  return (
    <Image
      src={images.split}
      alt="A buchi split in half showing the chewy rice dough ring and sweet filling, with steam rising"
      fittingType="fit"
      className="absolute inset-0 h-full w-full"
    />
  );
}

function Steam() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[36%] h-28 w-24 -translate-x-1/2"
      style={{ opacity: "var(--copy)" }}
    >
      {[
        { left: "22%", delay: "0s", drift: "-14px" },
        { left: "48%", delay: "-1.1s", drift: "8px" },
        { left: "72%", delay: "-2.2s", drift: "16px" },
      ].map((wisp) => (
        <span
          key={wisp.left}
          className="steam"
          style={{ left: wisp.left, animationDelay: wisp.delay, "--steam-drift": wisp.drift }}
        />
      ))}
    </div>
  );
}

export default function SplitStage({ progressRef, showCanvas = true, open = false, flavorIndex = 0 }) {
  return (
    <div
      className={cn(
        "split-stage",
        open ? "split-stage-open min-h-[78svh]" : "h-full",
        "relative flex w-full items-center justify-center overflow-hidden"
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[#241409]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(255,170,64,0.2),transparent_62%)]"
      />
      <OilBubbles className="opacity-40" />
      <div
        aria-hidden="true"
        className="split-glow pointer-events-none absolute left-1/2 top-1/2 h-[min(82vmin,34rem)] w-[min(82vmin,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-2 py-14">
        <div className="sizzle-host relative h-full max-h-[68svh] w-full max-w-3xl">
          {showCanvas && (
            <>
              <Image
                src={images.splitSplash}
                alt=""
                fittingType="fit"
                className="split-splash pointer-events-none absolute left-1/2 top-1/2 z-0 h-[84%] w-[120%] max-w-none object-contain"
              />
              <Image
                src={images.splitFlavors}
                alt=""
                fittingType="fit"
                className="split-flavors pointer-events-none absolute left-1/2 top-1/2 z-0 h-[84%] w-[120%] max-w-none object-contain"
              />
            </>
          )}
          <div
            aria-hidden="true"
            className="buchi-shadow pointer-events-none absolute left-1/2 top-[76%] h-[9%] w-[52%] -translate-x-1/2 rounded-[50%] blur-xl"
          />
          {showCanvas ? (
            <Suspense fallback={<StillFigure />}>
              <Buchi3D progressRef={progressRef} />
            </Suspense>
          ) : (
            <StillFigure />
          )}
          <Steam />
          {SPARKS.map((spark, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="sizzle-spark z-10"
              style={{
                left: spark.left,
                top: spark.top,
                "--sx": spark.sx,
                "--sy": spark.sy,
                animationDelay: spark.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
        <SplitCopy />
      </div>

      <FlavorLabel index={flavorIndex} />

      <p className="split-hint pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-[#e8c9a0]/70">
        Keep scrolling
      </p>
    </div>
  );
}