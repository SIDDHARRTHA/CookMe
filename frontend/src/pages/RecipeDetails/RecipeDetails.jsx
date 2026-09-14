import { useState, useEffect, useRef } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import recipes from "../../data/recipes";
import { getRecipeImage } from "../../utils/recipeImages";

const TABS = [
  { key: "ingredients", label: "Ingredients", icon: "🥘" },
  { key: "recipe", label: "Recipe", icon: "📖" },
  { key: "tips", label: "Tips", icon: "💡" }
];

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("ingredients");
  const [checkedItems, setCheckedItems] = useState({});
  const [allCheckedFlash, setAllCheckedFlash] = useState(false);
  const autoAdvanceTimer = useRef(null);

  /* Bug 2 fix: reset tab + checklist when navigating to a different recipe */
  useEffect(() => {
    setActiveTab("ingredients");
    setCheckedItems({});
    setAllCheckedFlash(false);
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
  }, [id]);

  const recipe = recipes.find(
    (item) => item.id === id
  );

  if (!recipe) {
    return (
      <main className="recipe-details-page">

        <button
          type="button"
          className="back-box"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ←
        </button>

        <div className="recipe-not-found">

          <h1>
            Recipe not found
          </h1>

          <p>
            We couldn't find this recipe.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Back to CookMe
          </button>

        </div>

      </main>
    );
  }

  const heroImage =
    getRecipeImage(recipe);

  const toggleIngredient = (index) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [index]: !prev[index] };

      /* Bug 1 fix: auto-advance to Recipe tab when all ingredients checked */
      if (next[index] && totalIngredients > 0) {
        const newCheckedCount = Object.values(next).filter(Boolean).length;
        if (newCheckedCount === totalIngredients) {
          setAllCheckedFlash(true);
          autoAdvanceTimer.current = setTimeout(() => {
            setActiveTab("recipe");
            setAllCheckedFlash(false);
          }, 500);
        }
      }

      return next;
    });
  };

  const checkedCount = Object.values(checkedItems)
    .filter(Boolean).length;
  const totalIngredients =
    Array.isArray(recipe.fullIngredients)
      ? recipe.fullIngredients.length
      : 0;

  /* -----------------------------------------------
     Suggestions: same mealType + diet, different
     states — filtered by user's preference context.
     ----------------------------------------------- */
  const getSuggestions = () => {
    /* Try suggestedIds first, but filter by same diet */
    if (
      Array.isArray(recipe.suggestedIds) &&
      recipe.suggestedIds.length > 0
    ) {
      const fromIds = recipe.suggestedIds
        .map((sid) =>
          recipes.find((r) => r.id === sid)
        )
        .filter(Boolean)
        .filter(
          (r) =>
            r.id !== recipe.id &&
            r.diet === recipe.diet
        );

      if (fromIds.length > 0) {
        return fromIds.slice(0, 6);
      }
    }

    /* Fallback: same mealType + diet from other states */
    return recipes
      .filter(
        (r) =>
          r.id !== recipe.id &&
          r.mealType === recipe.mealType &&
          r.diet === recipe.diet &&
          r.state !== recipe.state
      )
      .slice(0, 6);
  };

  const suggestions = getSuggestions();

  /* -----------------------------------------------
     TAB CONTENT RENDERERS
     ----------------------------------------------- */
  const renderRecipeTab = () => (
    <div className="rd-tab-panel rd-tab-recipe">

      {/* STEPS */}
      <div className="rd-steps-section" style={{ marginTop: 0 }}>

        <p className="rd-section-eyebrow">
          HOW TO MAKE IT
        </p>

        <h2 className="rd-section-title">
          Steps
        </h2>

        <div className="rd-steps-list">
          {Array.isArray(recipe.steps) &&
            recipe.steps.map((step, index) => (
              <div
                className="rd-step"
                key={index}
              >
                <div className="rd-step-number">
                  {index + 1}
                </div>

                <div className="rd-step-text">
                  <p>
                    {typeof step === "string"
                      ? step
                      : step.text ||
                        step.instruction ||
                        step.description ||
                        JSON.stringify(step)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

    </div>
  );

  const renderIngredientsTab = () => (
    <div className="rd-tab-panel rd-tab-ingredients">

      {/* HERO IMAGE */}
      <div className="rd-hero-image">
        {heroImage ? (
          <img
            src={heroImage}
            alt={recipe.title}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="rd-hero-fallback">
            🍳
          </div>
        )}
      </div>

      {/* INTRO */}
      <div className="rd-intro">

        <div className="rd-intro-badges">
          <span className={`rd-diet-pill ${
            recipe.diet
              .toLowerCase()
              .replace(/[^a-z]+/g, "-")
          }`}>
            {recipe.diet}
          </span>

          <span className="rd-meal-pill">
            {recipe.mealType}
          </span>
        </div>

        <p className="rd-state-label">
          {recipe.state}
        </p>

        <h1 className="rd-title">
          {recipe.title}
        </h1>

        {recipe.description && (
          <p className="rd-description">
            {recipe.description}
          </p>
        )}

        <div className="rd-meta-row">
          <div className="rd-meta-chip">
            <span className="rd-meta-icon">⏱</span>
            <span>{recipe.time}</span>
          </div>

          <div className="rd-meta-chip">
            <span className="rd-meta-icon">👥</span>
            <span>{recipe.servings}</span>
          </div>
        </div>

      </div>

      <div className={`rd-ingredients-header${allCheckedFlash ? " all-checked" : ""}`} style={{ marginTop: "28px" }}>
        <div>
          <p className="rd-section-eyebrow">
            WHAT YOU NEED
          </p>
          <h2 className="rd-section-title">
            Ingredients
          </h2>
        </div>

        <div className="rd-ingredients-progress">
          <div className="rd-progress-ring">
            <svg viewBox="0 0 36 36">
              <circle
                className="rd-progress-bg"
                cx="18" cy="18" r="15.5"
                fill="none"
                strokeWidth="3"
              />
              <circle
                className="rd-progress-fill"
                cx="18" cy="18" r="15.5"
                fill="none"
                strokeWidth="3"
                strokeDasharray={`${
                  totalIngredients > 0
                    ? (checkedCount / totalIngredients) * 97.4
                    : 0
                } 97.4`}
                strokeLinecap="round"
              />
            </svg>
            <span className="rd-progress-text">
              {checkedCount}/{totalIngredients}
            </span>
          </div>
        </div>
      </div>

      <div className="rd-checklist">

        {Array.isArray(recipe.fullIngredients) &&
          recipe.fullIngredients.map(
            (ingredient, index) => {
              const isChecked = !!checkedItems[index];
              const name =
                typeof ingredient === "string"
                  ? ingredient
                  : ingredient.name ||
                    ingredient.ingredient ||
                    JSON.stringify(ingredient);
              const qty =
                typeof ingredient === "object"
                  ? ingredient.qty
                  : null;

              return (
                <label
                  className={`rd-checklist-item ${
                    isChecked ? "checked" : ""
                  }`}
                  key={index}
                >
                  <input
                    type="checkbox"
                    className="rd-checkbox-input"
                    checked={isChecked}
                    onChange={() =>
                      toggleIngredient(index)
                    }
                  />

                  <span className="rd-checkbox-custom">
                    {isChecked && (
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 6L5 8.5L9.5 3.5"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>

                  <span className="rd-checklist-info">
                    <span className="rd-checklist-name">
                      {name}
                    </span>
                    {qty && (
                      <span className="rd-checklist-qty">
                        {qty}
                      </span>
                    )}
                  </span>

                </label>
              );
            }
          )}

      </div>

    </div>
  );

  const renderTipsTab = () => (
    <div className="rd-tab-panel rd-tab-tips">

      {/* COOKING TIPS */}
      <div className="rd-tips-section">

        <p className="rd-section-eyebrow">
          PRO TIPS
        </p>

        <h2 className="rd-section-title">
          Cooking Tips
        </h2>

        {/* Main tip */}
        {recipe.tip && (
          <div className="rd-tip-card">
            <div className="rd-tip-icon-wrap">
              💡
            </div>
            <div>
              <p className="rd-tip-label">
                COOKING TIP
              </p>
              <p className="rd-tip-text">
                {recipe.tip}
              </p>
            </div>
          </div>
        )}

        {/* Tips list */}
        {Array.isArray(recipe.tipsList) &&
          recipe.tipsList.map((tip, index) => (
            <div
              className="rd-tip-card"
              key={index}
            >
              <div className="rd-tip-icon-wrap">
                ✨
              </div>
              <div>
                <p className="rd-tip-label">
                  {tip.title || "TIP"}
                </p>
                <p className="rd-tip-text">
                  {tip.desc || tip.description || ""}
                </p>
              </div>
            </div>
          ))}

      </div>

      {/* SUGGESTIONS */}
      {suggestions.length > 0 && (
        <div className="rd-suggestions-section">

          <p className="rd-section-eyebrow">
            YOU MIGHT ALSO LIKE
          </p>

          <h2 className="rd-section-title">
            More {recipe.diet}{" "}
            {recipe.mealType} Picks
          </h2>

          <p className="rd-suggestions-subtitle">
            Similar {recipe.mealType.toLowerCase()}{" "}
            dishes from across India
          </p>

          <div className="rd-suggestions-scroll">
            {suggestions.map((s) => {
              const sImage =
                getRecipeImage(s);

              return (
                <article
                  className="rd-suggestion-card"
                  key={s.id}
                  onClick={() =>
                    navigate(`/recipes/${s.id}`)
                  }
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" ||
                      e.key === " "
                    ) {
                      navigate(
                        `/recipes/${s.id}`
                      );
                    }
                  }}
                >
                  <div className="rd-sug-image">
                    {sImage ? (
                      <img
                        src={sImage}
                        alt={s.title}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="rd-sug-fallback">
                        🍳
                      </div>
                    )}

                    <span
                      className={`rd-sug-diet ${
                        s.diet
                          .toLowerCase()
                          .replace(
                            /[^a-z]+/g,
                            "-"
                          )
                      }`}
                    >
                      {s.diet}
                    </span>
                  </div>

                  <div className="rd-sug-info">
                    <h3 className="rd-sug-title">
                      {s.title}
                    </h3>

                    <p className="rd-sug-state">
                      {s.state}
                    </p>

                    <div className="rd-sug-meta">
                      <span>⏱ {s.time}</span>
                      <span>👥 {s.servings}</span>
                    </div>
                  </div>

                </article>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );

  return (
    <main className="recipe-details-page">

      {/* TAB BAR with merged BACK */}
      <div className="rd-tab-bar">

        <button
          type="button"
          className="back-box"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ←
        </button>

        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`rd-tab ${
              activeTab === tab.key
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab(tab.key)
            }
          >
            <span className="rd-tab-icon">
              {tab.icon}
            </span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="rd-tab-content">
        {activeTab === "recipe" &&
          renderRecipeTab()}
        {activeTab === "ingredients" &&
          renderIngredientsTab()}
        {activeTab === "tips" &&
          renderTipsTab()}
      </div>

    </main>
  );
}

export default RecipeDetails;