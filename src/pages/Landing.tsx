 // src/pages/Landing.tsx
import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Landing: React.FC = () => {
  const [formData, setFormData] = useState({ amount: "", wallet: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (endpoint: string) => {
    try {
      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setMessage(data.message || "Success");
    } catch (err) {
      setMessage("Error: " + (err as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">MVZX Token Platform</h1>

      {/* Escrow Form */}
      <div className="w-full max-w-md bg-gray-100 shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Escrow Purchase</h2>
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="text"
          name="wallet"
          placeholder="Wallet Address"
          value={formData.wallet}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />

        <button
          onClick={() => handleSubmit("escrow")}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Escrow
        </button>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col gap-3 w-full max-w-md">
        <button
          onClick={() => handleSubmit("direct-transfer")}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Direct Transfer Buy
        </button>
        <button
          onClick={() => handleSubmit("referral")}
          className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Referral Buy
        </button>
        <button
          onClick={() => handleSubmit("stake")}
          className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
        >
          Stake Tokens
        </button>
      </div>

      {/* Admin Checks */}
      <div className="w-full max-w-md bg-gray-100 shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">ADMIN CHECKS</h2>
        <button
          onClick={() => handleSubmit("admin-check")}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          ADMIN CHECK
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="mt-4 text-center text-sm text-gray-700">{message}</div>
      )}
    </div>
  );
};

export default Landing;
