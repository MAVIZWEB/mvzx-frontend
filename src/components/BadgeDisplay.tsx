import React from "react";

type Props = { stage: number };

// 10 rank colors for MLM Stage badges
const COLORS = [
  "#CD7F32", // 1 Bronze
  "#C0C0C0", // 2 Silver
  "#FFD700", // 3 Gold
  "#40E0D0", // 4 Turquoise
  "#7B68EE", // 5 SlateBlue
  "#00BFFF", // 6 DeepSkyBlue
  "#32CD32", // 7 LimeGreen
  "#FF8C00", // 8 DarkOrange
  "#FF1493", // 9 DeepPink
  "#4B0082", // 10 Indigo
];

const LABELS = ["Bronze","Silver","Gold","Aqua","Royal","Sky","Lime","Amber","Ruby","Indigo"];

const BadgeDisplay: React.FC<Props> = ({ stage }) => {
  const idx = Math.min(Math.max(stage, 1), 10) - 1;
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-white"
         style={{ background: COLORS[idx] }}>
      <span className="text-xs font-bold">Stage {stage}</span>
      <span className="text-xs opacity-90">{LABELS[idx]} Rank</span>
    </div>
  );
};

export default BadgeDisplay;
