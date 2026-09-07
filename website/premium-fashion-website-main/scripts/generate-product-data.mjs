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
    
    // Read files in product folder
    const files = fs.readdirSync(productPath)
      .filter(fileName => {
        if (fileName.startsWith(".") || fileName.startsWith("._")) return false;
        const ext = path.extname(fileName).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
      })
      .sort();

    const imagePaths = files.map(file => `${photoshootDirName}/${dirName}/${file}`);

    let collectionSlug = [];
    if (productNum >= 1 && productNum <= 5) collectionSlug = ["sarees", "new-arrivals"];
    else if (productNum >= 6 && productNum <= 10) collectionSlug = ["lehengas", "new-arrivals"];
    else if (productNum >= 11 && productNum <= 15) collectionSlug = ["suits", "new-arrivals"];
    else if (productNum >= 16 && productNum <= 20) collectionSlug = ["kurta-sets", "new-arrivals"];
    else if (productNum >= 21 && productNum <= 28) collectionSlug = ["festive-edit", "new-arrivals"];

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
