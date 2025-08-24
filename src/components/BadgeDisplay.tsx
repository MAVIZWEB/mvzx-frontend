import React from "react";

interface Props {
  stage: number;
  className?: string;
}

const COLORS = [
  "#CD7F32", // Bronze
  "#C0C0C0", // Silver
  "#FFD700", // Gold
  "#40E0D0", // Turquoise
  "#7B68EE", // SlateBlue
  "#00BFFF", // DeepSkyBlue
  "#32CD32", // LimeGreen
  "#FF8C00", // DarkOrange
  "#FF1493", // DeepPink
  "#4B0082", // Indigo
];

const LABELS = ["Bronze", "Silver", "Gold", "Aqua", "Royal", "Sky", "Lime", "Amber", "Ruby", "Indigo"];

const BadgeDisplay: React.FC<Props> = ({ stage, className = "" }) => {
  const idx = Math.min(Math.max(stage, 1), 10) - 1;
  return (
    <div 
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-bold ${className}`}
      style={{ background: COLORS[idx] }}
    >
      <span>Stage {stage}</span>
      <span className="opacity-90">{LABELS[idx]}</span>
    </div>
  );
};

export default BadgeDisplay;
