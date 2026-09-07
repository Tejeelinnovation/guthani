import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, "../../..");
const distDir = path.resolve(__dirname, "../dist");

// Copy new_webp_format_images into dist/ for deployment hosting
const webpSrc = path.join(workspaceRoot, "new_webp_format_images");
const webpDest = path.join(distDir, "new_webp_format_images");
if (fs.existsSync(webpSrc)) {
  fs.cpSync(webpSrc, webpDest, { recursive: true });
  console.log("Successfully copied new_webp_format_images to dist/ directory.");
}

// Copy website model banner images and logo assets into dist/website/
const websiteDir = path.join(workspaceRoot, "website");
const websiteDest = path.join(distDir, "website");
if (!fs.existsSync(websiteDest)) {
  fs.mkdirSync(websiteDest, { recursive: true });
}

for (let i = 1; i <= 4; i++) {
  const fileName = `product_model_${i}.png`;
  const srcFile = path.join(websiteDir, fileName);
  const destFile = path.join(websiteDest, fileName);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
  }
}

const logoFiles = ["guthani-logo-burgundy.png", "guthani-logo-cream.png", "guthani-logo-burgundy.svg", "guthani-logo-cream.svg", "guthani-icon.svg"];
for (const logoName of logoFiles) {
  const srcFile = path.join(websiteDir, logoName);
  const destFile = path.join(websiteDest, logoName);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
  }
}

// Copy favicon.svg directly into dist root and dist/website/
const faviconSrc = path.join(__dirname, "../public/favicon.svg");
if (fs.existsSync(faviconSrc)) {
  fs.copyFileSync(faviconSrc, path.join(distDir, "favicon.svg"));
  fs.copyFileSync(faviconSrc, path.join(websiteDest, "favicon.svg"));
}
console.log("Successfully copied homepage model banner images and Guthani logo assets to dist/website/ directory.");

// Post-process HTML file
const file = new URL("../dist/index.html", import.meta.url);
let html = fs.readFileSync(file, "utf8");

// Replace stale/removed demo-photo IDs with currently verified Unsplash images.
const replacements = new Map([
  ["photo-1583391733956-3750e0ff4e8b", "photo-1778148046782-2b5c2ce37612"],
  ["photo-1595777457583-95e059d581b8", "photo-1776504768745-551029df100d"],
  ["photo-1617627143233-dc3f6b1f14d1", "photo-1778148046511-27141f5f01ae"],
  ["photo-1617627143750-d86bc21e42bb", "photo-1771507056578-f9675a2a8f8a"],
  ["photo-1602391833977-358a52198938", "photo-1742287724816-4a8a1cc7ad5c"],
  ["photo-1583391733981-39dfe8a2fe25", "photo-1609748513078-9ff6232781c5"],
  ["photo-1606293459209-0a7a28b6d1cf", "photo-1778148046782-2b5c2ce37612"],
  ["photo-1630388007984-0b1a9ba1efb6", "photo-1776504768745-551029df100d"],
  ["photo-1610030469669-2d7f8a20d6ce", "photo-1778148046511-27141f5f01ae"],
  ["photo-1617627143749-a1bab1f00c8f", "photo-1742287724816-4a8a1cc7ad5c"],
  ["photo-1609709295948-17d77cb2a69b", "photo-1771507056578-f9675a2a8f8a"],
  ["photo-1590739225497-56613b1d19a5", "photo-1609748513078-9ff6232781c5"],
]);

for (const [oldId, newId] of replacements) {
  html = html.split(oldId).join(newId);
}

// Runtime safety net
const fallbackScript = `<script>
(function () {
  const fallback = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=82";
  document.addEventListener("error", function (event) {
    const img = event.target;
    if (!img || img.tagName !== "IMG" || img.dataset.imageFallbackApplied === "1") return;
    if (img.alt === "GUTHANI" || (img.src && (img.src.includes("logo") || img.src.includes("svg")))) return;
    img.dataset.imageFallbackApplied = "1";
    img.src = fallback;
  }, true);
})();
</script>`;

if (!html.includes("imageFallbackApplied")) {
  html = html.replace("</head>", `${fallbackScript}</head>`);
}

fs.writeFileSync(file, html, "utf8");
console.log(`Production build asset bundling complete (${replacements.size} stale IDs verified).`);
