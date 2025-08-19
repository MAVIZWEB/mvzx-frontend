 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrizeWheel from "../components/PrizeWheel";

type LandingProps = {
  user: { email: string; wallet: string } | null;
  setUser: (u: { email: string; wallet: string }) => void;
};

export default function LandingPage({ user, setUser }: LandingProps) {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email || !pin) return;
    const wallet = "MVZX-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    setUser({ email, wallet });
    localStorage.setItem("mvzx_user", JSON.stringify({ email, wallet }));
    setShowSignup(false);
  };

  const handleProtectedAction = (path: string) => {
    if (!user) {
      setShowSignup(true);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-red-900 via-red-700 to-cream text-white flex flex-col items-center relative overflow-hidden">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4">
        <img src="https://i.imgur.com/VbxvCK6.jpeg" alt="Logo" className="h-12 rounded-lg shadow-md" />
        <button className="text-xl font-bold">☰</button>
      </header>

      {/* Description */}
      <div className="text-center mt-2">
        <h1 className="text-2xl font-extrabold">MVZx — Instant Spin & Earn</h1>
        <p className="text-sm opacity-80">Buy, Mine, Trade, Vote and Win instantly!</p>
      </div>

      {/* Prize Wheel */}
      <div className="mt-4">
        <PrizeWheel onRequireSignup={() => setShowSignup(true)} />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-3 gap-3 mt-4 w-full px-4">
        {[
          { label: "Buy MVZx", path: "/buy" },
          { label: "Airdrop", path: "/airdrop" },
          { label: "Sign Up", path: "/" },
          { label: "Escrow Trade", path: "/escrow" },
          { label: "Mining", path: "/mining" },
          { label: "Voting", path: "/voting" },
          { label: "Leaderboard", path: "/leaderboard" },
        ].map((btn, i) => (
          <button
            key={i}
            className="bg-white/20 backdrop-blur-md text-sm font-semibold rounded-xl py-3 px-2 hover:bg-white/30 transition shadow"
            onClick={() => handleProtectedAction(btn.path)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl shadow-lg p-6 w-80">
            <h2 className="text-lg font-bold mb-4">Sign Up</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full mb-3"
            />
            <input
              type="number"
              placeholder="4-digit PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full mb-3"
            />
            <button
              onClick={handleSignup}
              className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800"
            >
              Create Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
