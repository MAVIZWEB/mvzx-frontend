 import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();
  const [wallet, setWallet] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!wallet || !pin || pin.length !== 4) {
      alert("Enter wallet and 4-digit PIN");
      return;
    }
    const u = { wallet, email, pin };
    localStorage.setItem("mvzx_user", JSON.stringify(u));
    alert("Saved. You're signed in locally.");
    nav("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form onSubmit={handleSave} className="bg-white shadow p-6 rounded max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Signup / Quick Wallet</h2>

        <label className="block text-sm">Wallet Address</label>
        <input className="w-full border rounded px-3 py-2 mb-3" value={wallet} onChange={e => setWallet(e.target.value)} placeholder="0x..." />

        <label className="block text-sm">Email (optional)</label>
        <input className="w-full border rounded px-3 py-2 mb-3" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />

        <label className="block text-sm">4-digit PIN</label>
        <input className="w-full border rounded px-3 py-2 mb-4" value={pin} onChange={e => setPin(e.target.value)} placeholder="1234" maxLength={4} />

        <div className="flex gap-3">
          <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded">Save Account</button>
          <Link to="/" className="flex-1 text-center py-2 border rounded">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
