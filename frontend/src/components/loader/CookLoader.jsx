import { useEffect, useState } from "react";
import Icon from "../common/Icon";
import "./CookLoader.css";

function CookLoader() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setHiding(true);
    }, 2600);

    const removeTimer = setTimeout(() => {
      setGone(true);
    }, 3200);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (gone) {
    return null;
  }

  return (
    <div
      className={`cook-loader ${hiding ? "is-hidden" : ""}`}
      aria-hidden="true"
    >
      <div className="cook-scene">

        {/* Heat waves */}
        <div className="cook-heat">
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* Pan */}
        <div className="cook-pan">
          <div className="cook-pan-body">
            <div className="cook-pan-handle" />
          </div>
        </div>

        {/* Flames */}
        <div className="cook-flames">
          <div className="cook-flame f1" />
          <div className="cook-flame f2" />
          <div className="cook-flame f3" />
          <div className="cook-flame f4" />
          <div className="cook-flame f5" />
        </div>

        {/* Stove */}
        <div className="cook-stove">
          <div className="cook-burner" />
          <div className="cook-stove-base" />
        </div>

        {/* Blur */}
        <div className="cook-blur-top" />
      </div>

      {/* Brand */}
      <div className="cook-loader-brand">
        <div className="logo-icon-wrap">
          <Icon
            name="chefHat"
            size={24}
            color="#E8622C"
          />
        </div>

        <span className="cook-loader-title">
          CookMe
        </span>
      </div>

      {/* Loading text */}
      <div className="cook-loader-sub">
        <span>Heating things up</span>

        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>
    </div>
  );
}

export default CookLoader;