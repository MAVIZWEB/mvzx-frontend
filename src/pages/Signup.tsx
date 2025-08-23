 // src/pages/Signup.tsx
import React, { useState } from "react";
import { api, setAuth } from "../services/api";
import { ethers } from "ethers";

async function encryptJson(privateKey: string, pin: string) {
  const enc = new TextEncoder().encode(pin);
  const keyMaterial = await crypto.subtle.importKey("raw", enc, "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: new TextEncoder().encode("mvzx-salt"), iterations: 120000, hash: "SHA-256" }, keyMaterial, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const pt = new TextEncoder().encode(privateKey);
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, pt);
  return btoa(JSON.stringify({ iv: Array.from(iv), ct: Array.from(new Uint8Array(ct)) }));
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string|null>(null);

  const submit = async (e:React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg(null);
    try {
      const wallet = ethers.Wallet.createRandom();
      const address = wallet.address;
      const blob = await encryptJson(wallet.privateKey, pin);
      localStorage.setItem("mvzx_keystore", blob);
      localStorage.setItem("mvzx_wallet", address);

      const res:any = await api.signup(email, address);
      if (res?.token) setAuth(res.token);
      setMsg(`✅ Created. Wallet ${address.slice(0,6)}…${address.slice(-4)}`);
    } catch (err:any) {
      setMsg(`❌ ${err.message}`);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-2">📝 Create Account</h1>
        <p className="text-center text-gray-600 mb-6">Email + 4-digit PIN. Wallet (BSC) is created in your browser and encrypted with your PIN.</p>
        <form onSubmit={submit} className="space-y-4">
          <input className="w-full border rounded-xl p-3 text-black placeholder-gray-400 bg-white" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <input className="w-full border rounded-xl p-3 text-black placeholder-gray-400 bg-white" type="password" placeholder="4-digit PIN" value={pin} onChange={e=>setPin(e.target.value)} required maxLength={4}/>
          <button disabled={loading} className={`w-full rounded-xl text-white py-3 ${loading ? "bg-gray-400" : "bg-purple-700 hover:bg-purple-800"}`}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        {msg && <p className="mt-4 text-center">{msg}</p>}
      </div>
    </div>
  );
}
