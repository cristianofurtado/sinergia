import React from "react";

interface SinergiaLogoProps {
  variant?: "dark" | "light"; // "dark" = for light backgrounds; "light" = for dark navy backgrounds
  className?: string;
  height?: number;
}

export function SinergiaLogo({
  variant = "light",
  className = "",
  height = 36,
}: SinergiaLogoProps) {
  // Ratio is ~4:1 width:height
  const width = Math.round(height * 4.2);
  const textColor = variant === "light" ? "#FFFFFF" : "#0A192F";
  const barNavy = variant === "light" ? "#38BDF8" : "#0F2042";
  const barBlue = variant === "light" ? "#60A5FA" : "#1D4ED8";
  const orange = "#F97316";
  const amber = "#F59E0B";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 210 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Sinergia Logo"
    >
      {/* SÍNERG in bold modern sans */}
      <text
        x="6"
        y="36"
        fontFamily="system-ui, -apple-system, 'Inter', 'Segoe UI', Roboto, sans-serif"
        fontSize="34"
        fontWeight="900"
        letterSpacing="-0.03em"
        fill={textColor}
      >
        SÍNERG
      </text>

      {/* IA in solar orange */}
      <text
        x="133"
        y="36"
        fontFamily="system-ui, -apple-system, 'Inter', 'Segoe UI', Roboto, sans-serif"
        fontSize="34"
        fontWeight="900"
        letterSpacing="-0.03em"
        fill={orange}
      >
        IA
      </text>

      {/* Upward Energy / Growth Symbol (Bars + Ascending Arrow) */}
      <g transform="translate(172, 10)">
        {/* Bar 1: Base */}
        <rect
          x="2"
          y="18"
          width="4.5"
          height="12"
          rx="1.5"
          fill={barNavy}
        />
        {/* Bar 2: Mid */}
        <rect
          x="8.5"
          y="12"
          width="4.5"
          height="18"
          rx="1.5"
          fill={barBlue}
        />
        {/* Bar 3: High */}
        <rect
          x="15"
          y="6"
          width="4.5"
          height="24"
          rx="1.5"
          fill={amber}
        />

        {/* Upward Energy Vector Arrow */}
        <path
          d="M0 24 Q 10 16, 25 3"
          stroke={orange}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M19 2 L 26 2 L 26 9 Z"
          fill={orange}
        />
      </g>
    </svg>
  );
}
