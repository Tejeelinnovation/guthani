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
        // Ignore hidden files and check for image extensions
        if (fileName.startsWith(".") || fileName.startsWith("._")) return false;
        const ext = path.extname(fileName).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
      })
      .sort(); // Sort files alphabetically

    // Relative path from workspace root
    const imagePaths = files.map(file => `${photoshootDirName}/${dirName}/${file}`);

    // Map product index to collections to keep category views working nicely
    // 25 products total:
    // Product 1 - 5 -> sarees
    // Product 6 - 10 -> lehengas
    // Product 11 - 15 -> suits
    // Product 16 - 20 -> kurta-sets
    // Product 21 - 25 -> festive-edit
    let collectionSlug = [];
    if (productNum >= 1 && productNum <= 5) collectionSlug = ["sarees", "new-arrivals"];
    else if (productNum >= 6 && productNum <= 10) collectionSlug = ["lehengas", "new-arrivals"];
    else if (productNum >= 11 && productNum <= 15) collectionSlug = ["suits", "new-arrivals"];
    else if (productNum >= 16 && productNum <= 20) collectionSlug = ["kurta-sets", "new-arrivals"];
    else if (productNum >= 21 && productNum <= 25) collectionSlug = ["festive-edit", "new-arrivals"];

    return {
      id: `product-${productNum}`,
      name: `Product ${productNum}`,
      category: "Jewellery · Collection",
      collectionSlug: collectionSlug,
      price: "Enquire for Price",
      fabric: "Fine Handcrafted Jewellery",
      color: "Silver & Gemstones",
      sizes: ["Standard / Adjustable"],
      description: "A premium handcrafted piece from the Guthni Collection. Meticulously designed with traditional motifs and modern craftsmanship.",
      styling: "Pair with ethnic wear or contemporary outfits for an elegant style statement.",
      care: "Store in an airtight zip-lock bag. Keep away from water, perfumes, and other chemicals.",
      ratio: "portrait",
      images: imagePaths
    };
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
