 import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-white shadow-md shadow-black/20 backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;
