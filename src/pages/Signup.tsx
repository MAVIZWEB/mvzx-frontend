import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h2 className="text-2xl font-bold mb-4">Signup / Signin</h2>
      <p className="text-gray-600">Wallet connect & pin will go here.</p>
      <Link to="/" className="text-blue-600 mt-4 hover:underline">Back Home</Link>
    </div>
  );
}
