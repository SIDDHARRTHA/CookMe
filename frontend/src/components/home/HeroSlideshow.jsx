import { useEffect, useRef, useState } from "react";

import { getRecipeImage } from "../../utils/recipeImages";

function HeroSlideshow() {
  const slides = [
    {
      src:
        getRecipeImage("madhya-pradesh-breakfast-indori-poha") ||
        getRecipeImage("maharashtra-breakfast-kanda-poha"),
      name: "Poha",
      alt: "Delicious Poha with peanuts and spices"
    },
    {
      src: getRecipeImage("karnataka-breakfast-mysore-masala-dosa"),
      name: "Masala Dosa",
      alt: "Crispy Golden Masala Dosa"
    },
    {
      src: getRecipeImage("karnataka-breakfast-rava-idli"),
      name: "Rava Idli",
      alt: "Steamed Rava Idli with Chutney"
    },
    {
      src: getRecipeImage("andhra-pradesh-breakfast-upma-rava"),
      name: "Rava Upma",
      alt: "Authentic South Indian Upma"
    },
    {
      src: getRecipeImage("tamil-nadu-breakfast-ven-pongal"),
      name: "Ven Pongal",
      alt: "Hot Ghee Ven Pongal"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const timerRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      startTimer();
    }
  };

  return (
    <div
      className="hero-slideshow-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      {/* SLIDES */}
      <div className="hero-slides-wrapper">
        {slides.map((slide, idx) => (
          <div
            key={slide.name}
            className={`hero-slide-item ${idx === currentIndex ? "active" : ""}`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="hero-slideshow-dots">
        {slides.map((slide, idx) => (
          <button
            key={slide.name}
            type="button"
            className={`hero-dot ${idx === currentIndex ? "active" : ""}`}
            onClick={() => {
              setCurrentIndex(idx);
              startTimer();
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlideshow;