import {
  useLocation,
  useNavigate
} from "react-router-dom";

import recipes from "../../data/recipes";
import { getRecipeImage } from "../../utils/recipeImages";

function Recipes() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    state,
    mealType,
    diet
  } = location.state || {};

  const matchingRecipes = recipes.filter(
    (recipe) =>
      (!state || recipe.state === state) &&
      (!mealType || recipe.mealType === mealType) &&
      recipe.diet === diet
  );

  const handleRecipeClick = (recipe) => {
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <main className="recipes-page">

      {/* HEADER */}

  <div className="rp-header-card">

    {/* TOP ROW: back arrow + filter info */}
    <div className="rp-header-top">

      <button
        type="button"
        className="rp-arrow-box"
        onClick={() => navigate("/")}
        aria-label="Back to preferences"
      >
        ←
      </button>

      <div className="rp-filter-info">
        <p className="rp-filter-label">
          Showing recipes for
        </p>
        <div className="rp-filter-values">
          <span>{state || "All States"}</span>
          <span className="rp-dot">·</span>
          <span>{mealType || "All Meals"}</span>
          <span className="rp-dot">·</span>
          <span>{diet}</span>
        </div>
      </div>

    </div>


    {/* BOTTOM: choose a recipe */}
    <div className="rp-header-bottom">
      <p className="rp-eyebrow">
        CHOOSE A RECIPE
      </p>
      <p className="rp-count">
        {matchingRecipes.length}{" "}
        {matchingRecipes.length === 1
          ? "recipe"
          : "recipes"}{" "}
        found
      </p>
    </div>

  </div>

      {/* RESULTS */}

      {matchingRecipes.length === 0 ? (

        <div className="recipes-empty">

          <div className="recipes-empty-icon">
            ?
          </div>

          <h2>
            No recipes found
          </h2>

          <p>
            Try another combination of
            state, meal type or preference.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Change Preferences
          </button>

        </div>

      ) : (

        <div className="recipe-grid">

          {matchingRecipes.map((recipe) => {

            const image =
              getRecipeImage(recipe);

            return (
              <article
                key={recipe.id}
                className="recipe-card"
                onClick={() =>
                  handleRecipeClick(recipe)
                }
                tabIndex={0}
                role="button"
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    handleRecipeClick(recipe);
                  }
                }}
              >

                {/* IMAGE */}

                <div className="recipe-card-image">

                  {image ? (

                    <img
                      src={image}
                      alt={recipe.title}
                      loading="lazy"
                      decoding="async"
                    />

                  ) : (

                    <div className="recipe-image-fallback">
                      <span>
                        🍳
                      </span>
                    </div>

                  )}

                  {/* DIET */}

                  <span
                    className={`recipe-diet-badge ${
                      recipe.diet
                        .toLowerCase()
                        .replace(
                          /[^a-z]+/g,
                          "-"
                        )
                    }`}
                  >
                    {recipe.diet}
                  </span>

                </div>

                {/* CONTENT */}

                <div className="recipe-card-content">

                  <h2 className="recipe-card-title">
                    {recipe.title}
                  </h2>

                  <p className="recipe-card-state">
                    {recipe.state}
                  </p>

                  <div className="recipe-card-meta">

                    <span>
                      ⏱
                      <strong>
                        {recipe.time}
                      </strong>
                    </span>

                    <span>
                      👥
                      <strong>
                        {recipe.servings}
                      </strong>
                    </span>

                  </div>

                  <div className="recipe-card-footer">

                    <span>
                      {recipe.mealType}
                    </span>

                    <span className="recipe-card-arrow">
                      →
                    </span>

                  </div>

                </div>

              </article>
            );
          })}

        </div>

      )}

    </main>
  );
}

export default Recipes;