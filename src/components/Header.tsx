 import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MVZx</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/signup" className="hover:text-yellow-400">Signup</Link>
        <Link to="/login" className="hover:text-yellow-400">Login</Link>
        <Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link>
      </nav>
    </header>
  );
};
