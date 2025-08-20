 import React, { useState } from "react";
import { api, setAuth } from "../services/api";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg(null);
    try {
      const res = await api.signup(email, pin);
      if (res?.token) setAuth(res.token);
      setMsg("✅ Account created. Wallet assigned. You’re signed in.");
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-2">📝 Sign Up</h1>
        <p className="text-center text-gray-600 mb-6">
          Create your account with email + 4-digit PIN. Your wallet (0x…) is your ID.
        </p>
        <form onSubmit={submit} className="space-y-4">
          <input className="w-full border rounded-xl p-3" type="email" placeholder="Email"
                 value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input className="w-full border rounded-xl p-3" type="password" placeholder="4-digit PIN"
                 value={pin} onChange={(e)=>setPin(e.target.value)} required maxLength={4} />
          <button disabled={loading}
                  className={`w-full rounded-xl text-white py-3 ${loading?"bg-gray-400":"bg-purple-700 hover:bg-purple-800"}`}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        {msg && <p className="mt-4 text-center">{msg}</p>}
      </div>
    </div>
  );
};

export default Signup;
