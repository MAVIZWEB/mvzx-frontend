import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-gray-600">Page not found.</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">Go Home</Link>
      </div>
    </div>
  );
}
