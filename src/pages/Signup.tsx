 import { useState } from "react";
import { signupUser } from "../services/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signupUser({ name, email, password });
      setMessage("Signup successful! You can now log in.");
      console.log(res.data);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg w-96 shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-white">Sign Up</h1>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded text-white font-bold"
        >
          Sign Up
        </button>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
}
