import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color?: "green" | "red" | "blue" | "gray";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, color = "gray", className }) => {
  const colors: Record<string, string> = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${colors[color]} ${className}`}
    >
      {children}
    </span>
  );
};

export { Badge };
