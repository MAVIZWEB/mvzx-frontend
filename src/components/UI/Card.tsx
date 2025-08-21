 import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <div
      {...props}
      className={`
        relative bg-white/5 backdrop-blur-lg border border-white/10
        rounded-2xl shadow-2xl shadow-white/10
        p-4
        transition-all duration-200
        hover:shadow-2xl hover:shadow-white/20
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
