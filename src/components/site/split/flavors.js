/* The filling travels through five flavors as the section scrolls.
   Each flavour holds for a stretch, then melts into the next one. */
export const CORE_FLAVORS = [
  { name: "Mung bean", color: "#a8b06a" },
  { name: "Ube", color: "#7d4bb5" },
  { name: "Chocolate", color: "#4a2a1a" },
  { name: "Cheese", color: "#e6b83c" },
  { name: "Custard", color: "#f0ddac" },
];

const START = 0.56;
const SPAN = 0.42;
const BANDS = [0, 0.3, 0.52, 0.72, 0.88, 1];

const clamp01 = (value) => Math.min(1, Math.max(0, value));

const smoothstep = (edge0, edge1, value) => {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

export function flavorSequence(progress) {
  return clamp01((progress - START) / SPAN);
}

/* Continuous 0 → 4 position, used to blend the filling colour. */
export function flavorBlendAt(progress) {
  const t = flavorSequence(progress);
  for (let i = 0; i < CORE_FLAVORS.length; i += 1) {
    if (t < BANDS[i + 1]) {
      const local = (t - BANDS[i]) / (BANDS[i + 1] - BANDS[i]);
      return Math.min(CORE_FLAVORS.length - 1, i + smoothstep(0.7, 1, local));
    }
  }
  return CORE_FLAVORS.length - 1;
}

/* The name switches halfway through the melt, so it always matches the colour. */
export function flavorIndexAt(progress) {
  return Math.round(flavorBlendAt(progress));
}