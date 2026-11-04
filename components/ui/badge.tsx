import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "brand" | "outline" | "success";
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors";

  const variants = {
    default: "bg-slate-100 text-slate-700 border border-slate-200/60",
    brand: "bg-brand-50 text-brand-700 border border-brand-200/60",
    outline: "bg-transparent text-slate-600 border border-slate-300",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

