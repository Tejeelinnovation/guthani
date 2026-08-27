// GUTHANI — Site Data
// All content centralized for CMS-ready architecture

export const BRAND = {
  name: "GUTHANI",
  tagline: "A Modern Indian Edit",
  whatsapp: "919999999999",
  instagram: "guthani",
  location: "Indore, India",
};

export const NAV_LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Festive Edit", href: "#festive" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Our Story", href: "#story" },
  { label: "Instagram", href: "#instagram" },
];

export const COLLECTIONS = [
  {
    id: "sarees",
    number: "01",
    name: "Sarees",
    tagline: "A modern interpretation of timeless draping.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=85",
    image2: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80",
    count: "24 Pieces",
  },
  {
    id: "lehengas",
    number: "02",
    name: "Lehengas",
    tagline: "Couture silhouettes for the grandest nights.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=85",
    image2: "https://images.unsplash.com/photo-1617627143233-dc3f6b1f14d1?w=900&q=80",
    count: "18 Pieces",
  },
  {
    id: "suits",
    number: "03",
    name: "Suits",
    tagline: "Tailored elegance, rooted in heritage.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&q=85",
    image2: "https://images.unsplash.com/photo-1602391833977-358a52198938?w=900&q=80",
    count: "21 Pieces",
  },
  {
    id: "kurta-sets",
    number: "04",
    name: "Kurta Sets",
    tagline: "Elevated everyday luxury.",
    image: "https://images.unsplash.com/photo-1583391733981-39dfe8a2fe25?w=1200&q=85",
    image2: "https://images.unsplash.com/photo-1606293459209-0a7a28b6d1cf?w=900&q=80",
    count: "32 Pieces",
  },
  {
    id: "festive-edit",
    number: "05",
    name: "Festive Edit",
    tagline: "Designed for celebrations that become memories.",
    image: "https://images.unsplash.com/photo-1630388007984-0b1a9ba1efb6?w=1200&q=85",
    image2: "https://images.unsplash.com/photo-1610030469669-2d7f8a20d6ce?w=900&q=80",
    count: "Limited",
  },
  {
    id: "new-arrivals",
    number: "06",
    name: "New Arrivals",
    tagline: "The latest from Atelier GUTHANI.",
    image: "https://images.unsplash.com/photo-1617627143749-a1bab1f00c8f?w=1200&q=85",
    image2: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80",
    count: "Just In",
  },
];

export const PRODUCTS = [
  {
    id: "isha-saree",
    name: "The Isha Saree",
    category: "Sarees · Festive Edit",
    collectionSlug: ["sarees", "festive-edit", "new-arrivals"],
    price: "Enquire for Price",
    fabric: "Handwoven silk with zari border",
    color: "Wine & Antique Gold",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A signature silk saree in deep wine, finished with a hand-embroidered zari border. Cut for the modern woman who honours tradition without compromising on presence.",
    styling: "Pair with heirloom jhumkas and a low bun for a candle-lit reception.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=85",
    image2: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=85",
    ratio: "tall",
  },
  {
    id: "meera-lehenga",
    name: "The Meera Lehenga",
    category: "Lehengas · Couture",
    collectionSlug: ["lehengas"],
    price: "Enquire for Price",
    fabric: "Raw silk with hand embroidery",
    color: "Ivory & Soft Rose",
    sizes: ["XS", "S", "M", "L"],
    description: "A bridal-adjacent lehenga in ivory silk with rose-gold zardozi embroidery. Light, modern, unforgettable.",
    styling: "Style with a sheer veil and minimal jewellery for a day ceremony.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=85",
    image2: "https://images.unsplash.com/photo-1617627143233-dc3f6b1f14d1?w=900&q=85",
    ratio: "portrait",
  },
  {
    id: "anaya-kurta",
    name: "The Anaya Kurta Set",
    category: "Kurta Sets · Everyday",
    collectionSlug: ["kurta-sets"],
    price: "₹ 18,900",
    fabric: "Chanderi silk with chikankari",
    color: "Champagne",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Hand-embroidered chikankari on chanderi silk, in a palette that moves effortlessly from lunch to evening.",
    styling: "Wear with white palazzo trousers and slip-on juttis.",
    image: "https://images.unsplash.com/photo-1583391733981-39dfe8a2fe25?w=900&q=85",
    image2: "https://images.unsplash.com/photo-1602391833977-358a52198938?w=900&q=85",
    ratio: "square",
  },
  {
    id: "riti-suit",
    name: "The Riti Suit",
    category: "Suits · Contemporary",
    collectionSlug: ["suits", "new-arrivals"],
    price: "₹ 24,500",
    fabric: "Handwoven banarasi with satin lining",
    color: "Deep Burgundy",
    sizes: ["XS", "S", "M", "L"],
    description: "A structured silhouette with a soft hand-feel. The Riti reimagines the classic Indian suit with architectural lines.",
    styling: "Tailored trousers and a single strand of pearls.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=900&q=85",
    image2: "https://images.unsplash.com/photo-1606293459209-0a7a28b6d1cf?w=900&q=85",
    ratio: "tall",
  },
  {
    id: "nisha-saree",
    name: "The Nisha Saree",
    category: "Sarees · Cocktail",
    collectionSlug: ["sarees", "new-arrivals"],
    price: "₹ 32,900",
    fabric: "French chiffon with sequin work",
    color: "Midnight",
    sizes: ["S", "M", "L"],
    description: "A lightweight sequinned chiffon in midnight navy, cut to move like liquid after sundown.",
    styling: "A sequin bustier and hair swept to one side.",
    image: "https://images.unsplash.com/photo-1617627143749-a1bab1f00c8f?w=900&q=85",
    image2: "https://images.unsplash.com/photo-1610030469669-2d7f8a20d6ce?w=900&q=85",
    ratio: "portrait",
  },
  {
    id: "kavya-lehenga",
    name: "The Kavya Lehenga",
    category: "Lehengas · Festive",
    collectionSlug: ["lehengas", "festive-edit", "new-arrivals"],
    price: "Enquire for Price",
    fabric: "Organza with thread embroidery",
    color: "Blush & Gold",
    sizes: ["XS", "S", "M", "L"],
    description: "Voluminous organza lehenga in soft blush, with delicate thread-gold embroidery across each panel.",
    styling: "Wear with a choli of your choice and a tulle dupatta.",
    image: "https://images.unsplash.com/photo-1630388007984-0b1a9ba1efb6?w=900&q=85",
    image2: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=85",
    ratio: "square",
  },
];

export const LOOKBOOK = [
  { image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=85", caption: "Isha — Handwoven Silk, Festive 2026" },
  { image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1600&q=85", caption: "Meera — Couture Lehenga" },
  { image: "https://images.unsplash.com/photo-1617627143233-dc3f6b1f14d1?w=1200&q=85", caption: "Campaign 01 / Indore" },
  { image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&q=85", caption: "Riti — Structured Suit" },
  { image: "https://images.unsplash.com/photo-1630388007984-0b1a9ba1efb6?w=1600&q=85", caption: "The Festive Edit" },
  { image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&q=85", caption: "Portrait / Editorial" },
  { image: "https://images.unsplash.com/photo-1602391833977-358a52198938?w=1200&q=85", caption: "Anaya — Chikankari" },
];

export const CRAFT_IMAGES = [
  { src: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=1400&q=85", label: "Zari Embroidery" },
  { src: "https://images.unsplash.com/photo-1590739225497-56613b1d19a5?w=1400&q=85", label: "Handwoven Silk" },
  { src: "https://images.unsplash.com/photo-1610030469669-2d7f8a20d6ce?w=1400&q=85", label: "Threadwork" },
  { src: "https://images.unsplash.com/photo-1583391733981-39dfe8a2fe25?w=1400&q=85", label: "Chikankari" },
];

export const BRAND_VALUES = [
  { n: "01", title: "Crafted with Intention", body: "Every piece begins with a story, a fabric, and a woman in mind." },
  { n: "02", title: "Modern Indian Silhouettes", body: "We reinterpret tradition with architectural lines and a light hand." },
  { n: "03", title: "Festive-Ready Styling", body: "Designed to move through long nights of celebration with ease." },
  { n: "04", title: "Quality You Can Feel", body: "Handloom, silk and zari sourced from India's finest artisan clusters." },
];

export const TESTIMONIALS = [
  {
    quote: "Wore the Meera Lehenga for my sister's wedding. I have never felt more seen — the embroidery is museum-quality.",
    name: "Aanya Kapoor",
    city: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    quote: "GUTHANI feels like wearing a secret. The fabric falls like nothing I own, and the fit was tailored to me over WhatsApp.",
    name: "Priya Mehta",
    city: "Bangalore",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    quote: "Finally — Indian wear that feels fashion, not fancy dress. The Isha Saree is now my most complimented piece.",
    name: "Rhea Desai",
    city: "Delhi",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
];

export const SOCIAL = [
  { type: "image", src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80", caption: "Festive Edit · Behind the scenes" },
  { type: "image", src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80", caption: "The Meera Lehenga" },
  { type: "reel", src: "https://images.unsplash.com/photo-1617627143233-dc3f6b1f14d1?w=800&q=80", caption: "Campaign film — Indore" },
  { type: "image", src: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80", caption: "The Riti Suit" },
  { type: "image", src: "https://images.unsplash.com/photo-1583391733981-39dfe8a2fe25?w=800&q=80", caption: "Customer styling" },
  { type: "reel", src: "https://images.unsplash.com/photo-1630388007984-0b1a9ba1efb6?w=800&q=80", caption: "Festive 2026" },
  { type: "image", src: "https://images.unsplash.com/photo-1602391833977-358a52198938?w=800&q=80", caption: "Atelier process" },
  { type: "image", src: "https://images.unsplash.com/photo-1610030469669-2d7f8a20d6ce?w=800&q=80", caption: "Portrait session" },
];

export const HOW_TO_ORDER = [
  { n: "01", title: "Discover", body: "Find the look that feels like you, from our curated edits." },
  { n: "02", title: "Enquire", body: "Message us directly on WhatsApp — no carts, no friction." },
  { n: "03", title: "Personalise", body: "Confirm size, colour, availability and bespoke styling." },
  { n: "04", title: "Celebrate", body: "Your GUTHANI look is handcrafted and shipped to you." },
];

export const PORTAL_LOOKS = [
  { image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=85", label: "Isha · Silk" },
  { image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=85", label: "Meera · Lehenga" },
  { image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&q=85", label: "Riti · Suit" },
  { image: "https://images.unsplash.com/photo-1617627143749-a1bab1f00c8f?w=1200&q=85", label: "Nisha · Saree" },
];

// Helper to build WhatsApp URL
export const waLink = (message) => {
  const base = `https://wa.me/${BRAND.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
};
