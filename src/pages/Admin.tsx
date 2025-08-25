import React, { useState } from "react";
import { api } from "../services/api";

const Admin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const login = async () => {
    setMsg(null);
    try {
      await api.adminLogin({ email, pin });
      setMsg("✅ Admin logged in.");
      window.location.href = "/admin/dashboard"; // placeholder for actual dashboard
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-2xl shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Admin Login / Signup</h1>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-3 p-3 border rounded-xl" />
        <input type="password" placeholder="4-digit PIN" value={pin} onChange={e=>setPin(e.target.value)} className="w-full mb-3 p-3 border rounded-xl" />
        <button onClick={login} className="w-full py-3 bg-red-600 text-white rounded-xl hover:bg-red-700">Login / Signup</button>
        {msg && <p className="mt-3">{msg}</p>}
      </div>
    </div>
  );
};

export default Admin;
