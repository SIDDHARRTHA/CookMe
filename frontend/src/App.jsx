import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import CookLoader from "./components/loader/CookLoader";
import Header from "./components/layout/Header";

import Home from "./pages/Home/Home";
import Recipes from "./pages/Recipes/Recipes";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
function AppContent() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    country: "India",
    state: "",
    mealType: "",
    preference: "Vegetarian"
  });

  const handleSearch = () => {
  navigate("/recipes", {
    state: {
      state: filters.state,
      mealType: filters.mealType,
      diet: filters.preference
    }
  });
};

  const handleGoHome = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="mobile-app-container">

      <CookLoader />

      <Header
        onGoHome={handleGoHome}
      />

      <main className="app-content">

        <Routes>

          <Route
            path="/"
            element={
              <Home
                filters={filters}
                setFilters={setFilters}
                onSearch={handleSearch}
              />
            }
          />

          <Route
            path="/recipes"
            element={<Recipes />}
          />

          <Route
            path="/recipes/:id"
            element={<RecipeDetails />}
          />

        </Routes>

      </main>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;