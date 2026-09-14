export function getMatchingRecipes(
  recipes,
  state,
  mealType,
  diet
) {
  return recipes.filter((recipe) => {
    return (
      recipe.state === state &&
      recipe.mealType === mealType &&
      recipe.diet === diet
    );
  });
}