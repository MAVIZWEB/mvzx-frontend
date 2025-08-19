import React from "react";

type BadgeDisplayProps = {
  badge: string;
};

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badge }) => {
  return (
    <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm shadow">
      {badge}
    </span>
  );
};

export default BadgeDisplay;
