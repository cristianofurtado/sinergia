import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "solar" | "navy" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizes = {
    sm: "text-xs px-3.5 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2 font-medium",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
  };

  const variants = {
    primary:
      "bg-brand-blue text-white hover:bg-brand-primary active:bg-brand-deep focus-visible:ring-brand-blue shadow-sm hover:shadow",
    solar:
      "bg-solar-500 text-slate-950 font-bold hover:bg-solar-400 active:bg-solar-600 focus-visible:ring-solar-400 shadow-md hover:shadow-glow",
    navy:
      "bg-brand-navy text-white hover:bg-brand-dark active:bg-slate-950 focus-visible:ring-brand-navy shadow-sm hover:shadow",
    outline:
      "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 focus-visible:ring-slate-400",
    ghost:
      "text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-400",
  };

  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
