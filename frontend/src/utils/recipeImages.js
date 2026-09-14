const imageModules = import.meta.glob(
  "../assets/images/recipes/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);

const imageLookup = {};
for (const [filePath, url] of Object.entries(imageModules)) {
  const filename = filePath.split("/").pop();
  if (filename) {
    imageLookup[filename] = url;
    const base = filename.replace(/\.[^.]+$/, "");
    imageLookup[base] = url;
  }
}

/**
 * Resolves recipe image from dynamically imported assets.
 * Looks up by recipe._id or recipe.id first,
 * then falls back to recipe.heroImage / recipe.image (with or without extension),
 * then returns null.
 * Also supports string input for backwards compatibility.
 */
export function getRecipeImage(recipe) {
  if (!recipe) {
    return null;
  }

  // Backwards compatibility if called with a string path or slug
  if (typeof recipe === "string") {
    const raw = recipe.split("/").pop();
    const clean = raw?.replace(/\.[^.]+$/, "");
    return (
      imageLookup[recipe] ||
      (raw && imageLookup[raw]) ||
      (clean && imageLookup[clean]) ||
      null
    );
  }

  // 1. Look up by recipe._id or recipe.id
  const id = recipe._id || recipe.id;
  if (id && imageLookup[id]) {
    return imageLookup[id];
  }

  // 2. Fall back to recipe.heroImage or recipe.image
  const hero = recipe.heroImage || recipe.image;
  if (hero) {
    const rawHero = hero.split("/").pop();
    const cleanHero = rawHero?.replace(/\.[^.]+$/, "");
    if (rawHero && imageLookup[rawHero]) {
      return imageLookup[rawHero];
    }
    if (cleanHero && imageLookup[cleanHero]) {
      return imageLookup[cleanHero];
    }
  }

  return null;
}