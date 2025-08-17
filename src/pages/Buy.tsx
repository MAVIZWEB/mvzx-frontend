import React from "react";
import { Link } from "react-router-dom";

export default function Buy() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h2 className="text-2xl font-bold mb-4">Buy MVZX Tokens</h2>
      <p className="text-gray-600">Direct purchase and company buybacks will be available here.</p>
      <Link to="/" className="text-blue-600 mt-4 hover:underline">Back Home</Link>
    </div>
  );
}
