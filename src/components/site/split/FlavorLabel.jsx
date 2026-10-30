import { CORE_FLAVORS } from "./flavors";
import { cn } from "@/lib/utils";

/* Sits under the buchi; the active filling name fades in as the core changes. */
export default function FlavorLabel({ index = 0 }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-[9%] z-20 flex flex-col items-center sm:bottom-[11%]"
      style={{ opacity: "var(--copy)" }}
    >
      <span className="mb-1.5 text-[9px] uppercase tracking-[0.34em] text-[#e8c9a0]/65">Filling</span>
      <div className="relative h-5 w-full max-w-[20rem]">
        {CORE_FLAVORS.map((flavor, i) => (
          <span key={flavor.name} className={cn("flavor-name", i === index && "is-active")}>
            {flavor.name}
          </span>
        ))}
      </div>
    </div>
  );
}