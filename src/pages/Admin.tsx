 import React, { useState } from "react";
import { api } from "../services/api";

const AdminPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const login = async () => {
    try {
      const res = await api.login({ email, pin });
      setMsg("✅ Logged in successfully.");
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">ADMIN LOGIN</h1>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="mb-3 p-3 border rounded-xl w-full max-w-sm" />
      <input placeholder="4-digit PIN" value={pin} onChange={e=>setPin(e.target.value)} className="mb-3 p-3 border rounded-xl w-full max-w-sm" />
      <button onClick={login} className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl">ADMIN LOGIN</button>
      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
};

export default AdminPage;
