import { useState } from "react";

import Icon from "../../components/common/Icon";
import HeroSlideshow from "../../components/home/HeroSlideshow";
import { locations } from "../../data/locations";

function getPrefMark(preference) {
  switch (preference) {
    case "Non-Vegetarian":
      return {
        iconName: "nonVegMark",
        color: "#8B4513"
      };

    case "Eggetarian":
      return {
        iconName: "eggMark",
        color: "#D97706"
      };

    case "Vegetarian":
    default:
      return {
        iconName: "vegMark",
        color: "#3F9142"
      };
  }
}

function Home({ filters, setFilters, onSearch }) {
  const [locationMode, setLocationMode] =
    useState("manual");

  const [isDetecting, setIsDetecting] =
    useState(false);

  const [detectStatus, setDetectStatus] =
    useState("");

  const handleMealTileClick = (meal) => {
    setFilters(previous => ({
      ...previous,
      mealType: meal
    }));
  };

  const detectGPSLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Geolocation is not supported by your browser. Using manual selection."
      );

      setLocationMode("manual");

      return;
    }

    setIsDetecting(true);
    setDetectStatus("Accessing GPS...");
    setLocationMode("detect");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const {
          latitude,
          longitude
        } = position.coords;

        setDetectStatus(
          "Geocoding location..."
        );

        /*
         * Simple frontend fallback.
         * Later this can be replaced with a proper
         * location service/backend.
         */
        let detectedState = "Karnataka";

        if (
          latitude >= 12.0 &&
          latitude <= 18.5 &&
          longitude >= 74.0 &&
          longitude <= 78.5
        ) {
          detectedState = "Karnataka";
        } else if (
          latitude >= 18.5 &&
          latitude <= 22.0 &&
          longitude >= 72.0 &&
          longitude <= 76.5
        ) {
          detectedState = "Maharashtra";
        } else if (
          latitude >= 28.3 &&
          latitude <= 28.9 &&
          longitude >= 76.8 &&
          longitude <= 77.4
        ) {
          detectedState = "Delhi (NCT)";
        } else if (
          latitude >= 24.5 &&
          latitude <= 30.5 &&
          longitude >= 77.0 &&
          longitude <= 84.5
        ) {
          detectedState = "Uttar Pradesh";
        } else if (
          latitude >= 8.0 &&
          latitude <= 13.5 &&
          longitude >= 76.2 &&
          longitude <= 80.3
        ) {
          detectedState = "Tamil Nadu";
        } else if (
          latitude >= 21.5 &&
          latitude <= 27.5 &&
          longitude >= 85.0 &&
          longitude <= 89.9
        ) {
          detectedState = "West Bengal";
        } else if (
          latitude >= 23.5 &&
          latitude <= 30.2 &&
          longitude >= 69.5 &&
          longitude <= 78.2
        ) {
          detectedState = "Rajasthan";
        }

        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          const data = await response.json();

          if (data?.principalSubdivision) {
            const matchedLocation =
              locations.find(location =>
                location.state
                  .toLowerCase()
                  .includes(
                    data.principalSubdivision.toLowerCase()
                  ) ||
                data.principalSubdivision
                  .toLowerCase()
                  .includes(
                    location.state.toLowerCase()
                  )
              );

            if (matchedLocation) {
              detectedState =
                matchedLocation.state;
            }
          }
        } catch {
          // Keep fallback state.
        }

        setFilters(previous => ({
          ...previous,
          country: "India",
          state: detectedState
        }));

        setIsDetecting(false);
        setDetectStatus("");
      },

      () => {
        setIsDetecting(false);
        setDetectStatus("");

        alert(
          "GPS location access was denied or unavailable. Falling back to manual selection."
        );

        setLocationMode("manual");
      },

      {
        timeout: 8000
      }
    );
  };

  const currentPrefMark =
    getPrefMark(filters.preference);

  const mealIcons = {
    Breakfast: {
      outline: "sun",
      filled: "sunFilled"
    },

    Lunch: {
      outline: "utensils",
      filled: "utensilsFilled"
    },

    Snacks: {
      outline: "cup",
      filled: "cupFilled"
    },

    Dinner: {
      outline: "moon",
      filled: "moonFilled"
    }
  };

  const getMealIcon = mealType => {
    const isActive =
      filters.mealType === mealType;

    return isActive
      ? mealIcons[mealType].filled
      : mealIcons[mealType].outline;
  };

  return (
    <div className="page-container">
      <div className="screen-container">

        {/* HERO */}
        <div className="hero-section">

          <div className="hero-title-row">
            <h1 className="hero-headline">
              WHAT TO COOK TODAY ?
            </h1>
          </div>

          <p className="hero-subtext">
            Discover delicious recipes based on
            your preference.
          </p>

          <div className="hero-image-wrapper">

            <div className="hero-top-blur" />

            <HeroSlideshow />

            <div className="hero-vignette" />

          </div>
        </div>

        {/* PREFERENCE CARD */}
        <div className="preference-card">

          <div className="card-title-row">

            <div className="title-icon">
              <Icon
                name="target"
                size={16}
                color="#E8622C"
              />
            </div>

            <span>
              Tell us your preference
            </span>

          </div>

          {/* LOCATION METHOD */}
          <div className="location-mode-grid">

            <div
              className={`location-mode-tile ${
                locationMode === "detect"
                  ? "active"
                  : ""
              }`}
              onClick={detectGPSLocation}
            >
              <Icon
                name="mapPin"
                size={18}
                color="#E8622C"
              />

              <span className="mode-tile-title">
                Detect my location
              </span>

              <span className="mode-tile-desc">
                Use GPS Auto-fill
              </span>
            </div>

            <div
              className={`location-mode-tile ${
                locationMode === "manual"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setLocationMode("manual")
              }
            >
              <Icon
                name="target"
                size={18}
                color="#8A7F74"
              />

              <span className="mode-tile-title">
                Enter manually
              </span>

              <span className="mode-tile-desc">
                Pick State / UT
              </span>
            </div>

          </div>

          {/* DETECTED LOCATION */}
          {locationMode === "detect" ? (

            <div className="detected-location-box">

              <div className="detected-header-row">

                <span
                  className="dropdown-label"
                  style={{ marginLeft: 0 }}
                >
                  Current Location
                </span>

                <span className="detected-badge">
                  📍 Auto-detected
                </span>

              </div>

              {isDetecting ? (

                <div
                  style={{
                    fontSize: "13px",
                    color: "#8A7F74",
                    fontWeight: 600
                  }}
                >
                  ⏳{" "}
                  {detectStatus ||
                    "Detecting GPS location..."}
                </div>

              ) : (

                <div className="detected-values">
                  India • {filters.state}
                </div>

              )}

              <button
                className="change-location-btn"
                onClick={() =>
                  setLocationMode("manual")
                }
              >
                Use manual instead
              </button>

            </div>

          ) : (

            /* MANUAL LOCATION */
            <div className="dropdown-group">

              {/* COUNTRY */}
              <div className="dropdown-field">

                <label className="dropdown-label">
                  Country
                </label>

                <div className="dropdown-select-wrap">

                  <span className="dropdown-left-icon">
                    🇮🇳
                  </span>

                  <select
                    className="custom-select"
                    value={filters.country}
                    onChange={event =>
                      setFilters({
                        ...filters,
                        country:
                          event.target.value
                      })
                    }
                  >
                    <option value="India">
                      India
                    </option>
                  </select>

                  <span className="dropdown-right-chevron">
                    <Icon
                      name="chevronDown"
                      size={16}
                    />
                  </span>

                </div>

              </div>

              {/* STATE */}
              <div className="dropdown-field">

                <label className="dropdown-label">
                  Your State / UT
                </label>

                <div className="dropdown-select-wrap">

                  <span className="dropdown-left-icon">

                    <Icon
                      name="mapPin"
                      size={16}
                      color="#E8622C"
                    />

                  </span>

                  <select
                    className="custom-select"
                    value={filters.state}
                    onChange={event =>
                      setFilters({
                        ...filters,
                        state:
                          event.target.value
                      })
                    }
                  >
                    <option value="" disabled>
                      Select State / UT
                    </option>
                    {locations.map(location => (
                      <option
                        key={location.state}
                        value={location.state}
                      >
                        {location.state}{" "}
                        {location.isUt
                          ? "(UT)"
                          : ""}
                      </option>
                    ))}
                  </select>


                  <span className="dropdown-right-chevron">

                    <Icon
                      name="chevronDown"
                      size={16}
                    />

                  </span>

                </div>

              </div>

            </div>
          )}

          {/* PREFERENCE */}
          <div
            className="dropdown-group"
            style={{
              marginTop:
                locationMode === "manual"
                  ? "0"
                  : "8px",

              marginBottom: 0
            }}
          >

            <div className="dropdown-field">

              <label className="dropdown-label">
                Preference
              </label>

              <div className="dropdown-select-wrap">

                <span className="dropdown-left-icon">

                  <Icon
                    name={
                      currentPrefMark.iconName
                    }
                    size={16}
                    color={
                      currentPrefMark.color
                    }
                  />

                </span>

                <select
                  className="custom-select"
                  value={filters.preference}
                  onChange={event =>
                    setFilters({
                      ...filters,
                      preference:
                        event.target.value
                    })
                  }
                >
                  <option value="Vegetarian">
                    Vegetarian
                  </option>

                  <option value="Non-Vegetarian">
                    Non-Vegetarian
                  </option>

                  <option value="Eggetarian">
                    Eggetarian
                  </option>
                  
                </select>

                <span className="dropdown-right-chevron">

                  <Icon
                    name="chevronDown"
                    size={16}
                  />

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* MEAL TYPE */}
        <div className="meal-type-section">

          <div className="section-label">
            MEAL TYPE
          </div>

          <div className="meal-type-grid">

            {[
              "Breakfast",
              "Lunch",
              "Snacks",
              "Dinner"
            ].map(meal => (

              <div
                key={meal}
                className={`meal-tile ${
                  filters.mealType === meal
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleMealTileClick(meal)
                }
              >

                <div
                  className={`meal-icon-badge ${
                    meal.toLowerCase()
                  }`}
                >
                  <Icon
                    name={getMealIcon(meal)}
                    size={20}
                  />
                </div>

                <span className="meal-tile-name">
                  {meal}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* SEARCH */}
        <div className="find-recipe-bar">

          <button
            className="btn-primary"
            onClick={onSearch}
          >
            <Icon
              name="search"
              size={18}
              color="#FFFFFF"
            />

            <span>
              Find My Recipe
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}

export default Home;