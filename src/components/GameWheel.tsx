 import React, { useEffect, useState } from "react";
import axios from "axios";
import GameWheel from "../components/GameWheel";

interface User {
  id: string;
  email: string;
  balance: number; // MVZx balance
  freeSpins: number;
}

export default function GamePage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Signup/Login (simple)
  const handleLogin = async () => {
    if (!email) return alert("Enter your email");

    setLoading(true);
    try {
      const res = await axios.post("https://your-backend-domain.com/users/login", { email });
      // backend returns user object with id, balance, freeSpins
      setUser(res.data.user);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Try again.");
    }
    setLoading(false);
  };

  // Handle reward from wheel
  const handleReward = (reward: string) => {
    if (!user) return;

    let newBalance = user.balance;
    let newFreeSpins = user.freeSpins;

    if (reward === "Try Again") {
      // do nothing
    } else {
      // parse number from reward string
      const amount = parseInt(reward.split(" ")[0]);
      newBalance += amount;
    }

    newFreeSpins = Math.max(0, newFreeSpins - 1);

    setUser({ ...user, balance: newBalance, freeSpins: newFreeSpins });
  };

  // Buy MVZx to continue
  const handleBuyMVZx = async () => {
    if (!user) return;

    const amount = parseInt(prompt("Enter how many MVZx to buy:", "10") || "0");
    if (!amount || amount <= 0) return;

    try {
      const res = await axios.post("https://your-backend-domain.com/users/buy", {
        userId: user.id,
        amount,
      });
      setUser({ ...user, balance: res.data.balance });
      alert(`You bought ${amount} MVZx!`);
    } catch (error) {
      console.error("Buy error:", error);
      alert("Purchase failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-6">
      {!user ? (
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center">Login / Signup</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded text-black"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded font-bold disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login / Signup"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 w-full max-w-lg">
          <div className="flex justify-between w-full bg-gray-800 p-4 rounded">
            <div>
              <p className="font-bold">Email:</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="font-bold">MVZx Balance:</p>
              <p>{user.balance}</p>
            </div>
            <div>
              <p className="font-bold">Free Spins:</p>
              <p>{user.freeSpins}</p>
            </div>
          </div>

          <GameWheel
            userId={user.id}
            freeSpins={user.freeSpins}
            onReward={handleReward}
          />

          {user.freeSpins <= 0 && (
            <button
              onClick={handleBuyMVZx}
              className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded font-bold"
            >
              Buy MVZx to Spin
            </button>
          )}
        </div>
      )}
    </div>
  );
}
