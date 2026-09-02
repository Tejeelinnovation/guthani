import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Workspace root is 3 levels up from scripts directory
const workspaceRoot = path.resolve(__dirname, "../../..");
const photoshootDirName = "Guthni photoshoot edited ";
const photoshootDir = path.join(workspaceRoot, photoshootDirName);

const runGit = (args) => {
  try {
    const cmd = `git ${args}`;
    console.log(`Running: ${cmd}`);
    return execSync(cmd, { cwd: workspaceRoot, stdio: "inherit" });
  } catch (err) {
    console.error(`Command failed: git ${args}`);
    throw err;
  }
};

const getProductNumber = (dirName) => {
  const match = dirName.match(/^Product\s+(\d+)$/i);
  return match ? parseInt(match[1], 10) : Infinity;
};

try {
  // Read all product directories
  const productDirs = fs.readdirSync(photoshootDir)
    .filter(name => {
      const fullPath = path.join(photoshootDir, name);
      const stat = fs.statSync(fullPath);
      return stat.isDirectory() && /^Product\s+\d+$/i.test(name);
    })
    .sort((a, b) => getProductNumber(a) - getProductNumber(b));

  for (const dirName of productDirs) {
    const productNum = getProductNumber(dirName);
    // Only upload products 10 to 25
    if (productNum < 10 || productNum > 25) continue;

    console.log(`\n================ Processing Product ${productNum} ================`);
    const productPath = path.join(photoshootDir, dirName);
    
    // Read files in product folder
    const files = fs.readdirSync(productPath)
      .filter(fileName => {
        if (fileName.startsWith(".") || fileName.startsWith("._")) return false;
        const ext = path.extname(fileName).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
      })
      .sort(); // Sort files alphabetically

    for (const file of files) {
      const relativeFilePath = `${photoshootDirName}/${dirName}/${file}`;
      
      // Stage the single file
      runGit(`add "${relativeFilePath}"`);
      
      // Check if there are any changes staged (to avoid empty commits if already pushed)
      try {
        execSync("git diff --cached --quiet", { cwd: workspaceRoot });
        console.log(`No changes for: ${relativeFilePath} (already pushed)`);
      } catch (e) {
        // diff exited with code 1, which means there are staged changes to commit
        runGit(`commit -m "feat: add photoshoot product ${productNum} - ${file}"`);
        runGit("push origin main");
      }
    }
  }
  console.log("\nAll remaining photoshoot images pushed successfully!");
} catch (error) {
  console.error("Error during individual push:", error);
  process.exit(1);
}
