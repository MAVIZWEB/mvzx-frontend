 import React, { useState } from "react";
import { login } from "../api/user";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(email, pin);
      localStorage.setItem("mvzx_token", res.data.token);
      localStorage.setItem("mvzx_wallet", res.data.wallet);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-gray-800 rounded">
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-2 p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="PIN"
        className="w-full mb-2 p-2 rounded"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        maxLength={4}
      />
      <button
        onClick={handleLogin}
        className="w-full mt-2 p-2 bg-yellow-500 text-gray-900 font-bold rounded"
      >
        Login
      </button>
    </div>
  );
};
