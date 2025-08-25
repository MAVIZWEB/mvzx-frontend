 import React, { useState } from "react";
import { signup } from "../api/user";
import { useNavigate } from "react-router-dom";

export const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (pin !== confirmPin) return alert("PINs do not match");
    try {
      await signup(email, pin, confirmPin);
      alert("Signup successful!");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-gray-800 rounded">
      <h2 className="text-2xl mb-4">Signup</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-2 p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="4-digit PIN"
        className="w-full mb-2 p-2 rounded"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        maxLength={4}
      />
      <input
        type="password"
        placeholder="Confirm PIN"
        className="w-full mb-2 p-2 rounded"
        value={confirmPin}
        onChange={(e) => setConfirmPin(e.target.value)}
        maxLength={4}
      />
      <button
        onClick={handleSignup}
        className="w-full mt-2 p-2 bg-yellow-500 text-gray-900 font-bold rounded"
      >
        Signup
      </button>
    </div>
  );
};
