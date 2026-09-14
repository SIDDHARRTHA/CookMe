const Icon = ({
  name,
  size = 18,
  color = "currentColor",
  strokeWidth = 2,
  style = {},
  className = ""
}) => {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style,
    className,
    xmlns: "http://www.w3.org/2000/svg"
  };

  const icons = {
    /* =========================================
       CHEF HAT
    ========================================= */

    chefHat: (
      <svg {...commonProps}>
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6z" />
        <line x1="6" y1="17" x2="18" y2="17" />
      </svg>
    ),

    /* =========================================
       TARGET
    ========================================= */

    target: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    ),

    /* =========================================
       CHEVRONS
    ========================================= */

    chevronDown: (
      <svg {...commonProps}>
        <polyline points="6 9 12 15 18 9" />
      </svg>
    ),

    chevronLeft: (
      <svg {...commonProps}>
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ),

    /* =========================================
       SUN
    ========================================= */

    sun: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="4" />

        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />

        <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />

        <line x1="2" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />

        <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
      </svg>
    ),

    sunFilled: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        style={style}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="5" />

        <path
          d="
            M12 1
            V3
            M12 21
            V23
            M1 12
            H3
            M21 12
            H23
            M4.22 4.22
            L5.64 5.64
            M18.36 18.36
            L19.78 19.78
            M4.22 19.78
            L5.64 18.36
            M18.36 5.64
            L19.78 4.22
          "
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    ),

    /* =========================================
       UTENSILS
    ========================================= */

    utensils: (
      <svg {...commonProps}>
        <path d="M7 2v8" />
        <path d="M4 2v8a3 3 0 0 0 6 0V2" />
        <path d="M7 13v9" />

        <path d="M17 2v20" />
        <path d="M17 2c-2 1-3 3-3 6v4h6V8c0-3-1-5-3-6z" />
      </svg>
    ),

    utensilsFilled: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        style={style}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 2h2v8a1 1 0 0 0 2 0V2h2v8a3 3 0 0 1-3 3v9H5v-9a3 3 0 0 1-3-3V2h2z" />

        <path d="M15 2h2v20h-2z" />

        <path d="M17 2c2 1 3 3 3 6v4h-5V8c0-3 1-5 2-6z" />
      </svg>
    ),

    /* =========================================
       CUP
    ========================================= */

    cup: (
      <svg {...commonProps}>
        <path d="M5 8h12v7a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z" />
        <path d="M17 10h2a3 3 0 0 1 0 6h-2" />
        <line x1="7" y1="4" x2="7" y2="6" />
        <line x1="11" y1="3" x2="11" y2="6" />
        <line x1="15" y1="4" x2="15" y2="6" />
      </svg>
    ),

    cupFilled: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        style={style}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 7h14v8a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V7z" />

        <path
          d="M18 9h1a3 3 0 0 1 0 6h-1"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
        />

        <rect x="7" y="3" width="2" height="3" rx="1" />
        <rect x="11" y="2" width="2" height="4" rx="1" />
        <rect x="15" y="3" width="2" height="3" rx="1" />
      </svg>
    ),

    /* =========================================
       MOON
    ========================================= */

    moon: (
      <svg {...commonProps}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),

    moonFilled: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        style={style}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),

    /* =========================================
       SEARCH
    ========================================= */

    search: (
      <svg {...commonProps}>
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" />
      </svg>
    ),

    /* =========================================
       MAP PIN
    ========================================= */

    mapPin: (
      <svg {...commonProps}>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),

    /* =========================================
       VEGETARIAN
    ========================================= */

    vegMark: (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={style}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
    />

    <circle
      cx="12"
      cy="12"
      r="4"
      fill={color}
    />
  </svg>
),

    /* =========================================
       NON VEGETARIAN
    ========================================= */

    nonVegMark: (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={style}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
    />

    <path
      d="M12 8
         C9.8 8 8.5 9.6 8.5 12
         C8.5 14.4 9.8 16 12 16
         C14.2 16 15.5 14.4 15.5 12
         C15.5 9.6 14.2 8 12 8Z"
      fill={color}
      stroke="none"
    />
  </svg>
),
    /* =========================================
       EGG
    ========================================= */

    eggMark: (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={style}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
    />

    <ellipse
      cx="12"
      cy="13"
      rx="5"
      ry="6"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
    />

    <circle
      cx="12"
      cy="13"
      r="2"
      fill={color}
    />
  </svg>
),
    /* =========================================
       HELP
    ========================================= */

    help: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />

        <path d="M9.5 9a2.5 2.5 0 1 1 4.3 1.75c-.8.8-1.8 1.2-1.8 2.75" />

        <circle
          cx="12"
          cy="17"
          r="0.8"
          fill={color}
          stroke="none"
        />
      </svg>
    ),

    /* =========================================
       LEAF
    ========================================= */

    leaf: (
      <svg {...commonProps}>
        <path d="M20 4C12 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16z" />
        <path d="M4 20c4-4 7-7 12-10" />
      </svg>
    ),

    /* =========================================
       CLOCK
    ========================================= */

    clock: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </svg>
    ),

    /* =========================================
       PEOPLE
    ========================================= */

    people: (
      <svg {...commonProps}>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />

        <path d="M3 20a6 6 0 0 1 12 0" />
        <path d="M14 15a5 5 0 0 1 7 5" />
      </svg>
    ),

    /* =========================================
       HEART
    ========================================= */

    heart: (
      <svg {...commonProps}>
        <path d="M20.8 8.6c0 5.5-8.8 10.4-8.8 10.4S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 6.2a4.6 4.6 0 0 1 8.8 2.4z" />
      </svg>
    ),

    heartFilled: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        style={style}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.8 8.6c0 5.5-8.8 10.4-8.8 10.4S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 6.2a4.6 4.6 0 0 1 8.8 2.4z" />
      </svg>
    ),

    /* =========================================
       SHARE
    ========================================= */

    share: (
      <svg {...commonProps}>
        <circle cx="18" cy="5" r="2.5" />
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="19" r="2.5" />

        <line x1="8.2" y1="10.8" x2="15.8" y2="6.2" />
        <line x1="8.2" y1="13.2" x2="15.8" y2="17.8" />
      </svg>
    ),

    /* =========================================
       LIGHTBULB
    ========================================= */

    lightbulb: (
      <svg {...commonProps}>
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M8.5 15.5C7.5 14.4 7 13 7 11.5a5 5 0 1 1 10 0c0 1.5-.5 2.9-1.5 4" />
        <path d="M12 2v1" />
        <path d="M4.9 4.9l.7.7" />
        <path d="M2 12h1" />
        <path d="M19.1 4.9l-.7.7" />
        <path d="M22 12h-1" />
      </svg>
    ),

    /* =========================================
       CHECK
    ========================================= */

    check: (
      <svg {...commonProps}>
        <polyline points="5 12 10 17 19 7" />
      </svg>
    )
  };

  return icons[name] || null;
};

export default Icon;