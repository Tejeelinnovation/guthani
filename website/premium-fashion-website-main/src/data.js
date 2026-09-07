// GUTHANI — Site Data
// All content centralized for CMS-ready architecture

export const BRAND = {
  name: "GUTHANI",
  tagline: "A Modern Indian Jewellery Edit",
  whatsapp: "918320016364",
  whatsappDisplay: "+91 8320016364",
  email: "guthniverse@gmail.com",
  instagram: "https://www.instagram.com/guthniverse?stkn=MWsxN3U0MWFubzVyMg==",
  location: "Indore, India",
};

export const NAV_LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Festive Edit", href: "#festive" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Instagram", href: "https://www.instagram.com/guthniverse?stkn=MWsxN3U0MWFubzVyMg==" },
];

export const COLLECTIONS = [
  {
    id: "sarees",
    number: "01",
    name: "Statement Necklaces",
    tagline: "Handcrafted bead, pearl, and fabric statement pieces.",
    image: "new_webp_format_images/Product 1/IMG_2827.webp",
    image2: "new_webp_format_images/Product 2/IMG_2834.webp",
    count: "24 Pieces",
  },
  {
    id: "lehengas",
    number: "02",
    name: "Jute & Beaded Edits",
    tagline: "Artisanal multi-strand jute and vibrant bead creations.",
    image: "new_webp_format_images/Product 6/IMG_2871.webp",
    image2: "new_webp_format_images/Product 7/IMG_2876.webp",
    count: "18 Pieces",
  },
  {
    id: "suits",
    number: "03",
    name: "Pearl & Metal Elegance",
    tagline: "Glossy faux pearls blended with oxidized metal chains.",
    image: "new_webp_format_images/Product 11/IMG_2901.webp",
    image2: "new_webp_format_images/Product 12/IMG_2894.webp",
    count: "21 Pieces",
  },
  {
    id: "kurta-sets",
    number: "04",
    name: "Artisanal Chokers & Strands",
    tagline: "Intricately woven fabric elements and carved charms.",
    image: "new_webp_format_images/Product 16/IMG_2919.webp",
    image2: "new_webp_format_images/Product 17/IMG_2910.webp",
    count: "32 Pieces",
  },
  {
    id: "festive-edit",
    number: "05",
    name: "Festive Jewellery Edit",
    tagline: "Handcrafted statement jewellery designed for grand celebrations.",
    image: "new_webp_format_images/Product 21/IMG_2950.webp",
    image2: "new_webp_format_images/Product 22/IMG_2943.webp",
    count: "Limited",
  },
  {
    id: "new-arrivals",
    number: "06",
    name: "New Arrivals",
    tagline: "The latest handcrafted jewellery from Atelier GUTHANI.",
    image: "new_webp_format_images/Product 23/IMG_2996.webp",
    image2: "new_webp_format_images/Product 24/IMG_3001.webp",
    count: "Just In",
  },
];

export const PRODUCTS = [
  {
    id: "product-1",
    name: "Product 1",
    category: "Jewellery · Collection",
    collectionSlug: ["sarees", "festive-edit", "new-arrivals"],
    price: "Enquire for Price",
    fabric: "Fine Handcrafted Bead & Fabric Jewellery",
    color: "Silver & Gemstones",
    sizes: ["Standard / Adjustable"],
    description: "A signature handcrafted piece from the Guthani Collection. Meticulously designed with traditional motifs and modern craftsmanship.",
    styling: "Pair with ethnic wear or contemporary outfits for an elegant style statement.",
    image: "new_webp_format_images/Product 1/IMG_2827.webp",
    image2: "new_webp_format_images/Product 1/IMG_2828.webp",
    images: [
      "new_webp_format_images/Product 1/IMG_2827.webp",
      "new_webp_format_images/Product 1/IMG_2828.webp",
      "new_webp_format_images/Product 1/IMG_2829.webp"
    ],
    ratio: "tall",
  },
  {
    id: "product-6",
    name: "Handmade Jute & Beaded Multi-Strand Statement Necklace",
    category: "Jewellery · Collection",
    collectionSlug: ["lehengas", "new-arrivals"],
    price: "Enquire for Price",
    fabric: "Natural jute twine, wooden beads, acrylic beads, and simulated pearls",
    color: "Natural jute, hot pink, orange, ivory, and brown",
    sizes: ["18 inches (matinee length)"],
    claspType: "Wooden toggle button and loop closure",
    description: "A lightweight, handcrafted multi-strand necklace made with natural jute twine, vibrant acrylic beads, glossy ivory faux pearls, and rustic wooden accents.",
    styling: "Pair with cotton dresses, kurtas, sarees, or relaxed bohemian and ethnic outfits.",
    image: "new_webp_format_images/Product 6/IMG_2871.webp",
    image2: "new_webp_format_images/Product 6/IMG_2872.webp",
    images: [
      "new_webp_format_images/Product 6/IMG_2871.webp",
      "new_webp_format_images/Product 6/IMG_2872.webp",
      "new_webp_format_images/Product 6/IMG_2873.webp",
      "new_webp_format_images/Product 6/IMG_2874.webp"
    ],
    ratio: "portrait",
  },
  {
    id: "product-11",
    name: "Product 11",
    category: "Jewellery · Collection",
    collectionSlug: ["suits"],
    price: "Enquire for Price",
    fabric: "Fine Handcrafted Bead & Fabric Jewellery",
    color: "Silver & Gemstones",
    sizes: ["Standard / Adjustable"],
    description: "Handcrafted bead jewellery in a palette that moves effortlessly from day to evening.",
    styling: "Wear with festive or contemporary outfits.",
    image: "new_webp_format_images/Product 11/IMG_2901.webp",
    image2: "new_webp_format_images/Product 11/IMG_2902.webp",
    images: [
      "new_webp_format_images/Product 11/IMG_2901.webp",
      "new_webp_format_images/Product 11/IMG_2902.webp",
      "new_webp_format_images/Product 11/IMG_2903.webp",
      "new_webp_format_images/Product 11/IMG_2904.webp"
    ],
    ratio: "square",
  },
  {
    id: "product-16",
    name: "Product 16",
    category: "Jewellery · Collection",
    collectionSlug: ["kurta-sets", "new-arrivals"],
    price: "Enquire for Price",
    fabric: "Fine Handcrafted Bead & Fabric Jewellery",
    color: "Silver & Gemstones",
    sizes: ["Standard / Adjustable"],
    description: "A structured design with a smooth finish. Reimagines classic Indian heritage jewellery.",
    styling: "Tailored outfits or traditional sarees.",
    image: "new_webp_format_images/Product 16/IMG_2919.webp",
    image2: "new_webp_format_images/Product 16/IMG_2922.webp",
    images: [
      "new_webp_format_images/Product 16/IMG_2919.webp",
      "new_webp_format_images/Product 16/IMG_2922.webp",
      "new_webp_format_images/Product 16/IMG_2923.webp"
    ],
    ratio: "tall",
  },
  {
    id: "product-21",
    name: "Product 21",
    category: "Jewellery · Collection",
    collectionSlug: ["festive-edit", "new-arrivals"],
    price: "Enquire for Price",
    fabric: "Fine Handcrafted Bead & Fabric Jewellery",
    color: "Silver & Gemstones",
    sizes: ["Standard / Adjustable"],
    description: "A statement piece designed to sparkle after sundown.",
    styling: "Pair with festive attire or evening wear.",
    image: "new_webp_format_images/Product 21/IMG_2950.webp",
    image2: "new_webp_format_images/Product 21/IMG_2951.webp",
    images: [
      "new_webp_format_images/Product 21/IMG_2950.webp",
      "new_webp_format_images/Product 21/IMG_2951.webp",
      "new_webp_format_images/Product 21/IMG_2952.webp",
      "new_webp_format_images/Product 21/IMG_2953.webp"
    ],
    ratio: "portrait",
  },
  {
    id: "product-25",
    name: "Product 25",
    category: "Jewellery · Collection",
    collectionSlug: ["festive-edit", "new-arrivals"],
    price: "Enquire for Price",
    fabric: "Fine Handcrafted Bead & Fabric Jewellery",
    color: "Silver & Gemstones",
    sizes: ["Standard / Adjustable"],
    description: "An elegant handcrafted creation with intricate details across each section.",
    styling: "Pair with your favorite occasion wear.",
    image: "new_webp_format_images/Product 25/IMG_3005.webp",
    image2: "new_webp_format_images/Product 25/IMG_3005.webp",
    images: [
      "new_webp_format_images/Product 25/IMG_3005.webp"
    ],
    ratio: "square",
  },
];

export const LOOKBOOK = [
  { image: "new_webp_format_images/Product 1/IMG_2827.webp", caption: "Product 1 — Fine Jewellery, Festive 2026" },
  { image: "new_webp_format_images/Product 3/IMG_2842.webp", caption: "Product 3 — Handcrafted Edit" },
  { image: "new_webp_format_images/Product 6/IMG_2871.webp", caption: "Product 6 — Campaign 01 / Indore" },
  { image: "new_webp_format_images/Product 11/IMG_2901.webp", caption: "Product 11 — Signature Piece" },
  { image: "new_webp_format_images/Product 16/IMG_2919.webp", caption: "Product 16 — The Festive Edit" },
  { image: "new_webp_format_images/Product 21/IMG_2950.webp", caption: "Product 21 — Portrait / Editorial" },
  { image: "new_webp_format_images/Product 24/IMG_3001.webp", caption: "Product 24 — Heritage Jewellery" },
];

export const CRAFT_IMAGES = [
  { src: "new_webp_format_images/Product 2/IMG_2834.webp", label: "Bead Craftsmanship" },
  { src: "new_webp_format_images/Product 7/IMG_2876.webp", label: "Handcrafted Motifs" },
  { src: "new_webp_format_images/Product 12/IMG_2894.webp", label: "Pearl & Charm Settings" },
  { src: "new_webp_format_images/Product 17/IMG_2910.webp", label: "Artisanal Detail" },
];

export const BRAND_VALUES = [
  { n: "01", title: "Crafted with Intention", body: "Every piece begins with a story, natural beads, and handcrafted design." },
  { n: "02", title: "Handcrafted Bead & Fabric Jewellery", body: "We combine natural jute, wooden beads, faux pearls, and oxidized metal." },
  { n: "03", title: "Festive-Ready Styling", body: "Designed to move through long nights of celebration with statement grace." },
  { n: "04", title: "Quality You Can Feel", body: "Jute twine, wooden beads, and carved charms assembled by India's finest artisans." },
];

export const TESTIMONIALS = [
  {
    quote: "Wore the Guthani handcrafted necklace for my sister's wedding. I have never felt more elegant — the beadwork is stunning.",
    name: "Aanya Kapoor",
    city: "Mumbai",
    image: "new_webp_format_images/Product 4/IMG_2852.webp",
  },
  {
    quote: "GUTHANI feels like wearing a statement piece of art. The beads and pearls shine with subtle grace.",
    name: "Priya Mehta",
    city: "Bangalore",
    image: "new_webp_format_images/Product 9/IMG_2880.webp",
  },
  {
    quote: "Finally — Indian jewellery made of beads and fabric accents that feels contemporary and regal.",
    name: "Rhea Desai",
    city: "Delhi",
    image: "new_webp_format_images/Product 14/IMG_2932.webp",
  },
];

export const SOCIAL = [
  { type: "image", src: "new_webp_format_images/Product 1/IMG_2829.webp", caption: "Festive Edit · Behind the scenes" },
  { type: "image", src: "new_webp_format_images/Product 5/IMG_2865.webp", caption: "Guthani Product 5" },
  { type: "reel", src: "new_webp_format_images/Product 8/IMG_2862.webp", caption: "Campaign film — Indore" },
  { type: "image", src: "new_webp_format_images/Product 13/IMG_2884.webp", caption: "Signature Jewellery" },
  { type: "image", src: "new_webp_format_images/Product 18/IMG_2906.webp", caption: "Customer styling" },
  { type: "reel", src: "new_webp_format_images/Product 20/IMG_2956.webp", caption: "Festive 2026" },
  { type: "image", src: "new_webp_format_images/Product 22/IMG_2943.webp", caption: "Atelier process" },
  { type: "image", src: "new_webp_format_images/Product 25/IMG_3005.webp", caption: "Portrait session" },
];

export const HOW_TO_ORDER = [
  { n: "01", title: "Discover", body: "Find the handcrafted bead and fabric jewellery piece that speaks to your style." },
  { n: "02", title: "Enquire", body: "Message us directly on WhatsApp — no carts, no friction." },
  { n: "03", title: "Personalise", body: "Confirm size, length, and bespoke styling." },
  { n: "04", title: "Celebrate", body: "Your GUTHANI statement jewellery is handcrafted and delivered to you." },
];

export const PORTAL_LOOKS = [
  { image: "new_webp_format_images/Product 1/IMG_2827.webp", label: "Product 1 · Bead & Pearl" },
  { image: "new_webp_format_images/Product 6/IMG_2871.webp", label: "Product 6 · Jute & Wood" },
  { image: "new_webp_format_images/Product 11/IMG_2901.webp", label: "Product 11 · Handcrafted" },
  { image: "new_webp_format_images/Product 16/IMG_2919.webp", label: "Product 16 · Statement" },
];

// Helper to build WhatsApp URL
export const waLink = (message) => {
  const base = `https://wa.me/${BRAND.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
};
