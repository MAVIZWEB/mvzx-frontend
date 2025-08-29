 // frontend/src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { signup, login, getProfile } from "../services/api";

export default function Home() {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [ref, setRef] = useState<string>(new URLSearchParams(window.location.search).get("ref") || "");
  const [message, setMessage] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile().then(r => setProfile(r.data)).catch(() => {});
    }
  }, []);

  async function handleSignup() {
    setMessage("Processing signup...");
    try {
      const res = await signup(email || undefined, pin, ref || undefined);
      const data = res.data;
      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("mvzx_user", JSON.stringify(data.user));
      if (data.airdrop !== undefined) {
        const prev = Number(localStorage.getItem("mvzx_balance") || 0);
        localStorage.setItem("mvzx_balance", String(prev + Number(data.airdrop)));
      }
      setMessage("Signup successful — AIRDROP credited.");
      setProfile(data.user);
    } catch (e: any) {
      setMessage("Signup failed: " + (e?.response?.data?.error || e.message));
    }
  }

  async function handleLogin() {
    setMessage("Logging in...");
    try {
      const res = await login(email || undefined, pin);
      const data = res.data;
      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("mvzx_user", JSON.stringify(data.user));
        setProfile(data.user);
      }
      setMessage("Login successful");
    } catch (e: any) {
      setMessage("Login failed: " + (e?.response?.data?.error || e.message));
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Create account — AIRDROP 0.5 MVZx</h2>
        <input className="border p-2 w-full mb-3" placeholder="Email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 w-full mb-3" placeholder="4-digit PIN" value={pin} onChange={(e) => setPin(e.target.value)} />
        <input className="border p-2 w-full mb-3" placeholder="Referral code (optional)" value={ref} onChange={(e) => setRef(e.target.value)} />
        <div className="flex gap-2">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={handleSignup}>Sign up</button>
          <button className="bg-gray-200 px-4 py-2 rounded" onClick={handleLogin}>Login</button>
        </div>
        {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
      </div>

      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Quick info</h2>
        <p className="text-sm text-gray-600 mb-2">Backend: <span className="font-mono">{process.env.REACT_APP_API_BASE || "https://mvzx-backend.onrender.com"}</span></p>
        <p className="text-sm text-gray-600">After signup you will receive a token stored in your browser used for authenticated calls (stake, purchases, withdrawals).</p>

        <div className="mt-4">
          <h3 className="text-sm font-semibold">Your profile</h3>
          {profile ? (
            <pre className="text-xs bg-gray-50 p-2 rounded mt-2">{JSON.stringify(profile, null, 2)}</pre>
          ) : (
            <p className="text-xs text-gray-500">Not logged in</p>
          )}
        </div>
      </div>
    </div>
  );
}
