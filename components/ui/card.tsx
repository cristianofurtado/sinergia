import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  children: React.ReactNode;
}

export function Card({
  hoverable = false,
  className = "",
  children,
  ...props
}: CardProps) {
  const baseStyles =
    "bg-white rounded-xl border border-surface-border p-6 shadow-soft transition-all duration-200";
  const hoverStyles = hoverable
    ? "hover:border-slate-300 hover:shadow-card hover:-translate-y-0.5"
    : "";

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}

