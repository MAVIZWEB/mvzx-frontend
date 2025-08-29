import React, { useState } from "react";
import { signup } from "../services/api";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [wallet, setWallet] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup() {
    const result = await signup({
      email,
      pinHash: btoa(pin), // 🔑 in prod replace with bcrypt
      wallet,
    });
    if (result.error) setMessage("❌ " + result.error);
    else setMessage("✅ Signup successful! Wallet: " + wallet);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Signup</h1>
      <input className="border p-2 mb-2 w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 mb-2 w-full" placeholder="4-digit PIN" value={pin} onChange={(e) => setPin(e.target.value)} />
      <input className="border p-2 mb-2 w-full" placeholder="Wallet Address" value={wallet} onChange={(e) => setWallet(e.target.value)} />
      <button className="bg-black text-white p-2 rounded w-full" onClick={handleSignup}>Sign Up</button>
      <p className="mt-2">{message}</p>
    </div>
  );
}
