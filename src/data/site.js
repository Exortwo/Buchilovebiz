const MEDIA = "https://media.base44.com/images/public/6ae1ab0174e2cd9a827f50f8";

export const images = {
  hero: `${MEDIA}/aab56defd_generated_34c49c23.png`,
  about: `${MEDIA}/4764d41d9_generated_160bd5a2.png`,
  // Placeholder for the split-buchi section — swap this for your own photo.
  split: `${MEDIA}/4a30654ff_generated_image.png`,
  splitSplash: `${import.meta.env.BASE_URL}images/buchi-splash.png`,
  splitFlavors: `${import.meta.env.BASE_URL}images/buchi-flavors.png`,
  menu: [
    `${MEDIA}/d6318685d_generated_e4efcbec.png`,
    `${MEDIA}/b8b94588f_generated_232e2035.png`,
    `${MEDIA}/8f9d43558_generated_4ae41c2b.png`,
    `${MEDIA}/9b86913d0_generated_9ed91841.png`,
  ],
};

export const flavors = [
  {
    name: "Classic Mung Bean",
    description:
      "Slow-cooked munggo folded into a smooth, lightly sweet paste. The original — the one that started it all.",
    price: 20,
    tag: "Best seller",
  },
  {
    name: "Ube Halaya",
    description:
      "Purple yam simmered with coconut milk until jammy and deep, tucked inside a crisp sesame shell.",
    price: 25,
    tag: "Crowd favorite",
  },
  {
    name: "Tablea Chocolate",
    description:
      "Dark Filipino tablea that turns glossy and molten the second you bite through the crust.",
    price: 30,
    tag: "Melty center",
  },
  {
    name: "Buko Pandan",
    description:
      "Young coconut and pandan, fragrant and milky, with little strips of chewy coconut throughout.",
    price: 30,
    tag: "New",
  },
];

export const singleFlavorPackages = [
  {
    name: "Little Cravings Box",
    pieces: 10,
    prices: [
      { flavor: "Mungbean", price: 190 },
      { flavor: "Ube", price: 238 },
      { flavor: "Chocolate", price: 285 },
      { flavor: "Buko Pandan", price: 285 },
    ],
  },
  {
    name: "Happy Sharing Box",
    pieces: 50,
    prices: [
      { flavor: "Mungbean", price: 920 },
      { flavor: "Ube", price: 1150 },
      { flavor: "Chocolate", price: 1380 },
      { flavor: "Buko Pandan", price: 1380 },
    ],
  },
  {
    name: "Ultimate Buchi Feast",
    pieces: 100,
    prices: [
      { flavor: "Mungbean", price: 1800 },
      { flavor: "Ube", price: 2250 },
      { flavor: "Chocolate", price: 2700 },
      { flavor: "Buko Pandan", price: 2700 },
    ],
  },
];

export const mixedFlavorPackages = [
  {
    name: "Buchi Sampler Box",
    pieces: 10,
    price: 242,
    portions: [
      { flavor: "Mungbean", pieces: 3 },
      { flavor: "Ube", pieces: 3 },
      { flavor: "Chocolate", pieces: 2 },
      { flavor: "Buko Pandan", pieces: 2 },
    ],
  },
  {
    name: "Flavor Fiesta Box",
    pieces: 50,
    price: 1201,
    portions: [
      { flavor: "Mungbean", pieces: 13 },
      { flavor: "Ube", pieces: 13 },
      { flavor: "Chocolate", pieces: 12 },
      { flavor: "Buko Pandan", pieces: 12 },
    ],
  },
  {
    name: "Grand Buchi Collection",
    pieces: 100,
    price: 2363,
    portions: [
      { flavor: "Mungbean", pieces: 25 },
      { flavor: "Ube", pieces: 25 },
      { flavor: "Chocolate", pieces: 25 },
      { flavor: "Buko Pandan", pieces: 25 },
    ],
  },
];

export const reasons = [
  {
    icon: "flame",
    title: "Crisp, never greasy",
    body:
      "We fry at the right heat in small batches, so every shell crackles when you bite and nothing tastes heavy.",
  },
  {
    icon: "chef",
    title: "Chewy to the last bite",
    body:
      "Real glutinous rice, kneaded by hand every morning. That soft bounce is the whole point of a good buchi.",
  },
  {
    icon: "clock",
    title: "Fried when you order",
    body:
      "Nothing sits under a lamp. Ten minutes from hot oil to your box — still warm when it reaches your hands.",
  },
];

export const reviews = [
  {
    name: "Ana R.",
    meta: "Ordered the Ube box",
    quote:
      "The ube one is dangerous. I ordered six, told myself two for later, and finished four before I got home.",
  },
  {
    name: "Miguel S.",
    meta: "Weekend regular",
    quote:
      "Crispy outside, soft and chewy inside — exactly like the buchi my lola used to make on Sundays.",
  },
  {
    name: "Joy & the office crew",
    meta: "Friday bulk order",
    quote:
      "We order every Friday now. The tablea ones disappear from the pantry in about four minutes.",
  },
];

export const contact = {
  phoneDisplay: "Phone: (+63) 917 123 4567",
  phoneHref: "tel:+639171234567",
  facebook: "https://www.facebook.com/buchilove",
  instagram: "https://www.instagram.com/buchilove",
  location: "Crossing Terminal, Calamba, Laguna",
  hours: "Tue – Sun · 9:00 AM – 7:00 PM",
};