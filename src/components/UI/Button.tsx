 import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

const Button: React.FC<ButtonProps> = ({ children, className = "", variant = "primary", ...props }) => {
  const baseClasses = "relative inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/25 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border border-purple-500",
    secondary: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border border-green-500",
    outline: "bg-white/5 border border-white/20 text-white hover:bg-white/10"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      <span className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none bg-gradient-to-tr from-white/30 to-white/0 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
    </button>
  );
};

export default Button;
