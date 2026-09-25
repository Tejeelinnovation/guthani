import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Workspace root is 3 levels up from scripts directory
const workspaceRoot = path.resolve(__dirname, "../../..");
const photoshootDirName = "new_webp_format_images";
const photoshootDir = path.join(workspaceRoot, photoshootDirName);

const getProductNumber = (dirName) => {
  const match = dirName.match(/^Product\s+(\d+)$/i);
  return match ? parseInt(match[1], 10) : Infinity;
};

const CUSTOM_DATA = {
  6: {
    name: "Handmade Jute & Beaded Multi-Strand Statement Necklace",
    description: "A lightweight, handcrafted multi-strand necklace made with natural jute twine, vibrant acrylic beads, glossy ivory faux pearls, and rustic wooden accents. The hand-braided rope construction creates an eco-friendly boho-chic look, while the colourful bead combination adds a playful statement.",
    fabric: "Natural jute twine, wooden beads, acrylic beads, and simulated pearls",
    color: "Natural jute, hot pink, orange, ivory, and brown",
    sizes: ["18 inches (matinee length)"],
    claspType: "Wooden toggle button and loop closure",
    styling: "Pair with cotton dresses, kurtas, sarees, or relaxed bohemian and ethnic outfits. The vibrant pink and orange bead accents make it ideal as a standalone statement accessory for casual, festive, and daytime looks.",
    care: "Keep the jute strands completely dry and away from water, humidity, and perfumes. Avoid pulling or stretching the braided strands. Clean gently with a dry, soft cloth and store flat or loosely coiled in a dry place.",
    amazonLink: "https://www.amazon.in"
  },
  24: {
    name: "Guthni Handmade Round Woven Sling Bag with Pink Bow",
    description: "Add a touch of charm to your wardrobe with this beautiful handmade round woven handbag. Designed with a distinctive circular shape and an attractive pink bow, this bag combines traditional handcrafted appeal with a trendy contemporary look. The woven texture gives it a natural and elegant appearance, while the decorative bow adds a playful and stylish finish. Its convenient handle makes it comfortable to carry on your shoulder or by hand.",
    fabric: "Natural-fiber woven material, fabric bow accent",
    color: "Natural fiber & Pink bow",
    sizes: ["Standard Round Sling Bag"],
    claspType: "Shoulder strap / Handheld",
    styling: "Style it with casual cotton dresses, kurtas, or everyday western outfits. Ideal for casual outings, parties, vacations, shopping, and daytime events.",
    care: "Keep dry. Spot clean gently with a soft dry cloth. Avoid exposure to water, rain, and direct heat to protect the natural-fiber weave and fabric bow.",
    amazonLink: "https://www.amazon.in/dp/B0HK7KMY51"
  },
  27: {
    name: "Guthni Handcrafted Pearl & Butterfly Statement Necklace",
    description: "Handcrafted statement necklace featuring a clean strand of glossy off-white faux pearls, accented with dark oxidized metal chains, delicate white fabric elements, carved butterfly charms, and dangling feature pearls. A distinctive mixed-media design combining traditional beadwork with contemporary artisanal detailing.",
    fabric: "Faux pearls, fabric ornaments, carved charms, and oxidized dark metal alloy chains",
    color: "Off-white, white, and oxidized dark metal",
    sizes: ["Adjustable / standard statement necklace length"],
    claspType: "Hook-and-loop closure with adjustable chain detailing",
    styling: "Wear it as a statement piece with sarees, kurtas, dresses, or minimalist solid-colour outfits. The pearl-and-chain combination works well for festive occasions, evening wear, and contemporary ethnic styling.",
    care: "Handle the fabric and pearl elements gently. Keep away from water, moisture, perfumes, and chemicals. Store flat or in a separate soft pouch to prevent the metal chains from tangling and the fabric accents from getting damaged.",
    amazonLink: "https://www.amazon.in"
  },
  28: {
    name: "Guthni Handcrafted Mixed-Media Statement Necklace",
    description: "An asymmetric handcrafted necklace combining classic uniform faux pearls with earthy wooden beads, dark metal chain links, and a delicate hand-painted enamel floral charm. Its contemporary mixed-media design blends elegant pearl detailing with rustic and artisanal elements for a distinctive statement look.",
    fabric: "Faux pearls, natural wood beads, enamel, and oxidized dark metal alloy chain",
    color: "Ivory, natural wood brown, dark metal, and floral enamel accents",
    sizes: ["Standard statement necklace length with extension chain"],
    claspType: "Adjustable hook-and-chain closure",
    styling: "Style with sarees, kurtas, dresses, or contemporary ethnic outfits for an asymmetric statement look. The combination of pearls, wood, and dark metal makes it suitable for casual, festive, ethnic, and party wear.",
    care: "Keep away from water, moisture, perfumes, and harsh chemicals. Wipe the pearls, wooden beads, and metal components gently with a soft, dry cloth after use. Store separately to prevent the dark metal chain from scratching or tangling with other jewellery.",
    amazonLink: "https://www.amazon.in"
  },
  31: {
    name: "Guthni Handcrafted Royal Blue Crochet & Cowrie Shell Choker",
    description: "Handcrafted ethnic bohemian choker necklace featuring an intricate royal blue fabric crochet center panel, tightly wrapped thread-coated light metal rod collar, genuine cowrie shells, traditional oxidized silver-toned cylindrical pendant, miniature bells, multi-colored seed bead strands, and dangling vintage-style coins.",
    fabric: "Light metal rod coated with premium thread, handcrafted royal blue fabric crochet base, genuine cowrie shells, oxidized silver-toned cylindrical pendant, miniature bells, multi-colored seed beads, and vintage-style coin dangles",
    color: "Royal Blue, Silver, and Multi-colored seed bead accents",
    sizes: ["15 to 16 inches (Adjustable collar fit)"],
    claspType: "Flexible open-ended choker collar",
    styling: "Perfectly complements ethnic wear, fusion outfits, sarees, kurtis, and bohemian-inspired casual clothing. Ideal for festive occasions, parties, and cultural events.",
    care: "Store in a dry place away from moisture, perfumes, and direct chemicals. Wipe gently with a soft cotton cloth.",
    amazonLink: "https://www.amazon.in"
  },
  32: {
    name: "Guthni Handcrafted Gujarati Mirror Work & Cowrie Shell Choker",
    description: "Handcrafted traditional ethnic necklace featuring intricate thread embroidery, classic reflective mirror work, a rich fringe of natural cowrie shells (kaudi), and delicate pearl bead accents attached to a vibrant orange fabric-wrapped flexible neck wire.",
    fabric: "Premium fabric, cotton thread, traditional mirrors, natural cowrie shells, and faux pearls",
    color: "Vibrant Orange, Multicolor embroidery, and White pearls & cowrie shells",
    sizes: ["15 to 16 inches (Choker / Short necklace fit)"],
    claspType: "Flexible neck wire collar style",
    styling: "Perfect for traditional events, ethnic wear, Navratri, festive celebrations, cultural programs, parties, or bohemian-chic daily styling. Effortlessly complements sarees, lehengas, kurtis, and bohemian outfits.",
    care: "Store in a dry place away from moisture, perfumes, and harsh chemicals. Handle mirror work and cowrie shells gently.",
    amazonLink: "https://www.amazon.in"
  },
  33: {
    name: "Guthni Handcrafted Oxidized Silver Talisman Collar Necklace",
    description: "Authentic handcrafted ethnic statement collar necklace featuring a traditional oxidized silver-plated central amulet (tabiz) pendant, vintage-style coin charms, and dangling multi-strand multicolored bead fringes attached to a sturdy metal-core collar ring enclosed in soft thread wrapping.",
    fabric: "Oxidized silver-plated metal core collar ring, alloy metal accents, and premium multi-colored glass seed beads",
    color: "Oxidized Silver, Multicolored seed beads",
    sizes: ["15 to 16 inches (Adjustable open-collar fit)"],
    claspType: "Open-ended flexible collar ring with smooth metallic bead terminals",
    styling: "Perfect complement for traditional attire, festive wear, boho-chic outfits, and ethnic fusion styles.",
    care: "Store in a dry place away from moisture, perfumes, and direct chemicals to maintain the oxidized silver finish.",
    amazonLink: "https://www.amazon.in"
  },
  34: {
    name: "Guthni Handcrafted Green Thread & Cowrie Shell Statement Choker",
    description: "Handcrafted statement choker necklace featuring a flexible green yarn-wrapped band adorned with an artistic floral cluster of genuine white cowrie shells, graceful silver-toned chains, smooth green resin beads, and a joyful cluster of multi-colored miniature ghungroos (bells) that create a soft chime.",
    fabric: "Thread-wrapped metal ring, genuine cowrie shells, resin beads, metallic chains, and mini ghungroos (bells)",
    color: "Green, White, and Multi-color Ghungroo accents",
    sizes: ["15 to 16 inches (Choker length)"],
    claspType: "Slip-on / Flexible Band Style",
    styling: "Perfect accessory for traditional wear, Garba nights, ethnic festivals, cultural events, or casual fusion outfits.",
    care: "Keep thread and cowrie shells dry. Store in a soft pouch away from moisture and perfumes.",
    amazonLink: "https://www.amazon.in"
  },
  35: {
    name: "Guthni Handcrafted Pink Thread Ring Necklace with Cowries & Ghungroo",
    description: "Expertly handcrafted ethnic statement necklace featuring a vibrant pink thread-wrapped flexible metal ring, complemented by multi-strand silver-toned chains adorned with natural cowrie shells, fabric thread balls, and traditional ghungroos.",
    fabric: "Metal ring with premium pink thread wrapping, alloy chains, natural cowrie shells, thread balls, and metallic ghungroos (bells)",
    color: "Vibrant Pink, Silver, and White cowrie shells",
    sizes: ["15 to 16 inches (Collar / Choker length)"],
    claspType: "Flexible Open-Ring Style",
    styling: "Perfect accessory for ethnic wear, Navratri Garba outfits, bohemian fashion, cultural festivals, and casual styling.",
    care: "Store in a dry place away from water and humidity. Clean gently with a soft dry cloth.",
    amazonLink: "https://www.amazon.in"
  },
  36: {
    name: "Guthni Handcrafted Yellow Textile & Faux Pearl Collar Necklace with Gold Coins",
    description: "Handcrafted statement necklace featuring a sturdy metal ring meticulously wrapped in bright yellow textile yarn, finished with sleek silver-tone metallic bead ends. The centerpiece showcases an artistic cluster of lustrous faux pearls bordered by intricate, antique-finish gold coins.",
    fabric: "Metal core ring, high-quality yellow textile yarn, artificial pearls, and antique-finish metallic coins",
    color: "Bright Yellow, Gold, and White Pearls",
    sizes: ["15 to 16 inches (Collar length)"],
    claspType: "Open-end flexible collar style with metallic bead finials",
    styling: "An ideal accessory for festive celebrations, traditional functions, ethnic gatherings, kurtis, sarees, or fusion wear.",
    care: "Keep away from water and harsh chemicals. Store flat in a dry box or soft pouch.",
    amazonLink: "https://www.amazon.in"
  },
  38: {
    name: "Guthni Handcrafted Multicolour Beaded Statement Necklace",
    description: "Handmade statement necklace featuring a bright yellow lightweight metal neckpiece decorated with multiple strands of colourful beads and assorted hanging decorative pendants and charms, creating a playful, bohemian and eye-catching look.",
    fabric: "Yellow lightweight metal neckpiece, multicolour decorative beads, and assorted hanging charms & pendants",
    color: "Yellow neckpiece, Multicolour beads & charms",
    sizes: ["15 to 16 inches"],
    claspType: "Slip-on / Open-collar style",
    styling: "Suitable for casual outings, festive occasions, parties, traditional Indian outfits, fusion wear, kurtis, dresses or casual clothing.",
    care: "Store in a dry place. Clean gently with a soft cloth. Keep away from water and perfumes.",
    amazonLink: "https://www.amazon.in"
  }
};

try {
  const productDirs = fs.readdirSync(photoshootDir)
    .filter(name => {
      const fullPath = path.join(photoshootDir, name);
      const stat = fs.statSync(fullPath);
      return stat.isDirectory() && /^Product\s+\d+$/i.test(name);
    })
    .sort((a, b) => getProductNumber(a) - getProductNumber(b));

  const products = productDirs.map(dirName => {
    const productNum = getProductNumber(dirName);
    const productPath = path.join(photoshootDir, dirName);
    
    // Custom explicit image order per product to prioritize product shots over model shots
    const PRODUCT_IMAGE_ORDER = {
      6: ["IMG_2873.webp", "IMG_2874.webp", "IMG_2871.webp", "IMG_2872.webp"],
    };

    // Read files in product folder
    const files = fs.readdirSync(productPath)
      .filter(fileName => {
        if (fileName.startsWith(".") || fileName.startsWith("._")) return false;
        const ext = path.extname(fileName).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
      })
      .sort((a, b) => {
        const order = PRODUCT_IMAGE_ORDER[productNum];
        if (order) {
          const idxA = order.indexOf(a);
          const idxB = order.indexOf(b);
          if (idxA !== -1 && idxB !== -1) return idxA - idxB;
          if (idxA !== -1) return -1;
          if (idxB !== -1) return 1;
        }
        return a.localeCompare(b);
      });

    const imagePaths = files.map(file => `${photoshootDirName}/${dirName}/${file}`);

    let collectionSlug = [];
    if (productNum >= 1 && productNum <= 5) collectionSlug = ["sarees", "new-arrivals"];
    else if (productNum >= 6 && productNum <= 10) collectionSlug = ["lehengas", "new-arrivals"];
    else if (productNum >= 11 && productNum <= 15) collectionSlug = ["suits", "new-arrivals"];
    else if (productNum >= 16 && productNum <= 20) collectionSlug = ["kurta-sets", "new-arrivals"];
    else if (productNum >= 21 && productNum <= 38) collectionSlug = ["festive-edit", "new-arrivals"];

    const custom = CUSTOM_DATA[productNum] || {};

    return {
      id: `product-${productNum}`,
      name: custom.name || `Product ${productNum}`,
      category: "Jewellery · Collection",
      collectionSlug: collectionSlug,
      price: "Enquire for Price",
      fabric: custom.fabric || "Fine Handcrafted Jewellery",
      color: custom.color || "Silver & Gemstones",
      sizes: custom.sizes || ["Standard / Adjustable"],
      claspType: custom.claspType || "Hook-and-chain / Adjustable",
      description: custom.description || "A premium handcrafted piece from the Guthni Collection. Meticulously designed with traditional motifs and modern craftsmanship.",
      styling: custom.styling || "Pair with ethnic wear or contemporary outfits for an elegant style statement.",
      care: custom.care || "Store in an airtight zip-lock bag. Keep away from water, perfumes, and other chemicals.",
      amazonLink: custom.amazonLink || "https://www.amazon.in",
      ratio: "portrait",
      images: imagePaths
    };
  });

  // Ensure Virtual entries for Product 27 and Product 28 exist if they aren't on disk as separate directories
  [27, 28].forEach(num => {
    if (!products.some(p => p.id === `product-${num}`)) {
      const custom = CUSTOM_DATA[num];
      const fallbackImages = num === 27 
        ? ["new_webp_format_images/Product 24/IMG_3001.webp"]
        : ["new_webp_format_images/Product 25/IMG_3005.webp"];

      products.push({
        id: `product-${num}`,
        name: custom.name,
        category: "Jewellery · Collection",
        collectionSlug: ["festive-edit", "new-arrivals"],
        price: "Enquire for Price",
        fabric: custom.fabric,
        color: custom.color,
        sizes: custom.sizes,
        claspType: custom.claspType,
        description: custom.description,
        styling: custom.styling,
        care: custom.care,
        amazonLink: custom.amazonLink || "https://www.amazon.in",
        ratio: "portrait",
        images: fallbackImages
      });
    }
  });

  const outputContent = `// Centralized product data generated from photoshoot folder structure
export const ALL_PRODUCTS = ${JSON.stringify(products, null, 2)};
`;

  fs.writeFileSync(path.resolve(__dirname, "../src/photoshootData.js"), outputContent, "utf8");
  console.log(`Successfully generated metadata for ${products.length} products in src/photoshootData.js`);
} catch (error) {
  console.error("Error generating product data:", error);
  process.exit(1);
}
