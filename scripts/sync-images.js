import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");
const frontendRecipesDir = path.join(rootDir, "frontend", "src", "data", "recipes");
const picturesDir = path.resolve(rootDir, "..", "project pictures");
const targetDir = path.join(rootDir, "frontend", "src", "assets", "images", "recipes");
const legacyImagesDir = path.join(rootDir, "frontend", "src", "assets", "images");

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Read all recipe files from frontend/src/data/recipes (recipes.*.json)
const recipeFiles = fs
  .readdirSync(frontendRecipesDir)
  .filter((f) => f.startsWith("recipes.") && f.endsWith(".json"));
const recipes = [];

for (const file of recipeFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(frontendRecipesDir, file), "utf8"));
  const list = Array.isArray(content) ? content : content.recipes || [];
  for (const r of list) {
    recipes.push({
      _id: r.id,
      id: r.id,
      title: r.title || r.name,
      state: r.state,
      image: r.image,
      heroImage: r.heroImage,
      file
    });
  }
}

console.log(`Loaded ${recipes.length} recipes from ${recipeFiles.length} frontend recipe files.`);

// 2. Read all picture files from project pictures
const pictureFiles = [];
const stateDirs = fs
  .readdirSync(picturesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory());

for (const sDir of stateDirs) {
  const sPath = path.join(picturesDir, sDir.name);
  const files = fs
    .readdirSync(sPath)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  for (const f of files) {
    pictureFiles.push({
      state: sDir.name,
      filename: f,
      ext: path.extname(f).toLowerCase(),
      basename: path.basename(f, path.extname(f)),
      fullPath: path.join(sPath, f)
    });
  }
}

console.log(`Loaded ${pictureFiles.length} project pictures across ${stateDirs.length} states.`);

// Normalization helper with Puducherry typos and character handling
function normalize(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents/diacritics (e.g. ã -> a)
    .replace(/&/g, " and ")
    .replace(/\bvadai\b/g, "vada")
    .replace(/\bpuyavbaise\b/g, "puyabaise")
    .replace(/\bpuducheery\b/g, "puducherry")
    .replace(/\bcury\b/g, "curry")
    .replace(/\bbanana cassava\b/g, "banana")
    .replace(/[_\-–—/(),.+]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// 3. Match pictures to recipes (including Andaman & Nicobar)
const recipeMatches = new Map(); // recipe.id -> pictureFile
const usedPicPaths = new Set();

// Pass 1: Prioritize matching within the same state
for (const r of recipes) {
  const rNormTitle = normalize(r.title);
  const rNormState = normalize(r.state);
  const idParts = (r.id || "").split("-");
  const idDish = idParts.slice(2).join(" ");
  const rNormIdDish = normalize(idDish);

  const sameStatePics = pictureFiles.filter((p) => {
    const pNormState = normalize(p.state);
    return (
      pNormState === rNormState ||
      rNormState.includes(pNormState) ||
      pNormState.includes(rNormState)
    );
  });

  // Exact match in state
  let match = sameStatePics.find((p) => {
    const pNormName = normalize(p.basename);
    return pNormName === rNormTitle || pNormName === rNormIdDish;
  });

  // Substring match in state
  if (!match) {
    match = sameStatePics.find((p) => {
      const pNormName = normalize(p.basename);
      return (
        pNormName.includes(rNormTitle) ||
        rNormTitle.includes(pNormName) ||
        (rNormIdDish &&
          (pNormName.includes(rNormIdDish) || rNormIdDish.includes(pNormName)))
      );
    });
  }

  if (match) {
    recipeMatches.set(r.id, match);
    usedPicPaths.add(match.fullPath);
  }
}

// Pass 2: Fallback for dishes with exact same name in other states
for (const r of recipes) {
  if (recipeMatches.has(r.id)) continue;

  const rNormTitle = normalize(r.title);
  const idParts = (r.id || "").split("-");
  const idDish = idParts.slice(2).join(" ");
  const rNormIdDish = normalize(idDish);

  const match = pictureFiles.find((p) => {
    const pNormName = normalize(p.basename);
    return pNormName === rNormTitle || (rNormIdDish && pNormName === rNormIdDish);
  });

  if (match) {
    recipeMatches.set(r.id, match);
    usedPicPaths.add(match.fullPath);
  }
}

// 4. Non-destructive copy check: do not overwrite existing files
let alreadyWiredCount = 0;
let newlyCopiedCount = 0;

for (const [recipeId, pic] of recipeMatches.entries()) {
  const destPath = path.join(targetDir, `${recipeId}.jpg`);
  if (fs.existsSync(destPath)) {
    alreadyWiredCount++;
  } else {
    fs.copyFileSync(pic.fullPath, destPath);
    newlyCopiedCount++;
  }
}

// Migrate legacy pongal.png if present and destination doesn't exist
const legacyPongal = path.join(legacyImagesDir, "pongal.png");
const destPongal = path.join(targetDir, "tamil-nadu-breakfast-ven-pongal.jpg");
if (fs.existsSync(legacyPongal) && !fs.existsSync(destPongal)) {
  fs.copyFileSync(legacyPongal, destPongal);
  console.log(`Migrated legacy pongal.png -> recipes/tamil-nadu-breakfast-ven-pongal.jpg`);
}

console.log(`\n========================================`);
console.log(`Already wired (untouched): ${alreadyWiredCount}`);
console.log(`Newly copied images:       ${newlyCopiedCount}`);
console.log(`Total active recipe images in ${targetDir}: ${alreadyWiredCount + newlyCopiedCount}`);
console.log(`Used unique pictures: ${usedPicPaths.size} / ${pictureFiles.length}`);

// 5. Unmatched reporting
const unmatchedPics = pictureFiles.filter((p) => !usedPicPaths.has(p.fullPath));
console.log(`\nUnmatched Pictures Count: ${unmatchedPics.length}`);
if (unmatchedPics.length > 0) {
  unmatchedPics.forEach((p) => console.log(`  [${p.state}] ${p.filename}`));
} else {
  console.log("  All project pictures (100%) successfully matched!");
}

const unmatchedRecipes = recipes.filter((r) => !recipeMatches.has(r._id));
console.log(`\nUnmatched Recipes Count: ${unmatchedRecipes.length}`);
console.log(`Unmatched Recipes by state:`);
const missingByState = {};
for (const r of unmatchedRecipes) {
  missingByState[r.state] = (missingByState[r.state] || 0) + 1;
}
Object.entries(missingByState).forEach(([st, count]) => {
  console.log(`  ${st}: ${count} recipes missing images`);
});
console.log(`========================================\n`);
