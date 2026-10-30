import SplatterButton from "../SplatterButton";

export default function SplitCopy() {
  return (
    <div className="split-copy relative flex max-w-[15rem] flex-col items-center text-center sm:max-w-sm">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-10 -inset-y-8 rounded-full bg-[radial-gradient(circle,rgba(36,20,9,0.82),rgba(36,20,9,0.42)_58%,transparent_78%)] blur-md"
      />
      <p className="relative font-heading text-[clamp(1.3rem,4.6vw,2.3rem)] leading-[1.12] tracking-[-0.01em] text-[#fff6e6] text-glow">
        Crispy outside,
        <br />
        sweet inside.
      </p>
      <SplatterButton
        as="a"
        href="#order"
        className="relative mt-5 rounded-full bg-[#d97706] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fffbf2] shadow-[0_16px_36px_-16px_rgba(217,119,6,0.95)] transition-all hover:-translate-y-0.5 hover:bg-[#e88410] sm:px-7 sm:py-3.5 sm:text-sm"
      >
        Order Now
      </SplatterButton>
    </div>
  );
}