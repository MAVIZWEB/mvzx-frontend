// src/components/BadgeDisplay.tsx
import React from "react";
import { stageBadges } from "../constants/stageBadges";

interface BadgeDisplayProps {
  stage: number;   // user MLM stage
  size?: "sm" | "md" | "lg";  // optional size
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ stage, size = "md" }) => {
  const badge = stageBadges[stage] || { name: "Unranked", color: "#999" };

  const sizeClasses =
    size === "sm"
      ? "text-xs px-2 py-1"
      : size === "lg"
      ? "text-lg px-5 py-2"
      : "text-sm px-3 py-1";

  return (
    <span
      className={`inline-block rounded-full font-semibold shadow-md ${sizeClasses}`}
      style={{
        backgroundColor: badge.color,
        color: "#fff",
      }}
    >
      {badge.name}
    </span>
  );
};

export default BadgeDisplay;
