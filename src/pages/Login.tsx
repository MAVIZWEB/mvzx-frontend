import { useState } from "react";
import { login } from "../api/user";

export default function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !pin) {
      setError("All fields are required");
      return;
    }
    if (pin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }

    try {
      const res = await login(email, pin);
      const token = res.data.token; // backend returns { token: 'jwt...', wallet: '0x...' }
      localStorage.setItem("mvzx_token", token);
      localStorage.setItem("mvzx_wallet", res.data.wallet);
      onLogin(token);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="password"
          placeholder="4-digit PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          maxLength={4}
          className="p-2 rounded bg-gray-800 text-white"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
