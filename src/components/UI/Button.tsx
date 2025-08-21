 import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`
        relative inline-flex items-center justify-center
        px-4 py-2 rounded-xl font-semibold text-white
        transition-all duration-200
        border border-white/20
        bg-gradient-to-b from-white/10 to-white/5
        backdrop-blur-sm
        hover:from-white/20 hover:to-white/10
        active:scale-95 active:brightness-110
        shadow-lg shadow-white/10
        focus:outline-none focus:ring-2 focus:ring-white/25
        ${className}
      `}
    >
      {children}
      {/* subtle shine effect */}
      <span className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none bg-gradient-to-tr from-white/30 to-white/0 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
    </button>
  );
};

export default Button;
