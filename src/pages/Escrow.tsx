 import React from "react";
import { Link } from "react-router-dom";

export default function Escrow() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-2xl bg-white p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-3">Escrow P2P Exchange (Preview)</h2>
        <p className="mb-4 text-gray-700">
          This is a simple P2P escrow interface placeholder. Buyers and sellers will create offers,
          lock funds in escrow and confirm transfer. Company can also perform buybacks here.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <button className="py-2 bg-blue-600 text-white rounded">Create Offer</button>
          <button className="py-2 bg-green-600 text-white rounded">Browse Offers</button>
        </div>

        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">Back Home</Link>
      </div>
    </div>
  );
}
