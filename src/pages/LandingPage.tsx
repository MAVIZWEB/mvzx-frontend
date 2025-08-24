import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  User,
  Wallet,
  Trophy,
  Crown,
  Sparkles,
  Coins,
  Gift,
  Cpu,
  Handshake,
  Vote,
  Building,
} from "lucide-react";
import { api, loadAuth, isAuthenticated } from "../services/api";
import Button from "../components/UI/Button";

export default function LandingPage() {
  const navigate = useNavigate();
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    loadAuth();
    setAuthLoaded(true);
  }, []);

  useEffect(() => {
    if (authLoaded && isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [authLoaded, navigate]);

  const featureButtons = useMemo(
    () => [
      { icon: Wallet, label: "Wallet", path: "/wallet" },
      { icon: Trophy, label: "Rewards", path: "/rewards" },
      { icon: Crown, label: "Staking", path: "/staking" },
      { icon: Sparkles, label: "Trading", path: "/trading" },
      { icon: Coins, label: "ICO", path: "/ico" },
      { icon: Gift, label: "Referrals", path: "/referrals" },
      { icon: Cpu, label: "AI Trading", path: "/aitrading" },
      { icon: Handshake, label: "Partnership", path: "/partnership" },
      { icon: Vote, label: "Governance", path: "/governance" },
      { icon: Building, label: "Direct Deposit", path: "/directbuy" },
    ],
    []
  );

  const handleNavigation = (path: string) => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-6">
      {/* Header */}
      <header className="w-full flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold text-yellow-400">MVZx Platform</h1>
        <nav className="flex items-center gap-4">
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/signup")} variant="secondary">
            Sign Up
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-10">
        <h2 className="text-4xl font-bold mb-4">
          Trade, Earn, and Grow with <span className="text-yellow-400">MVZx</span>
        </h2>
        <p className="text-gray-300 max-w-2xl">
          A next-gen crypto platform offering trading, staking, referrals, and AI-powered rewards.
        </p>
        <div className="mt-6 flex gap-4">
          <Button onClick={() => navigate("/signup")}>Get Started</Button>
          <Button variant="secondary" onClick={() => navigate("/ico")}>
            Join ICO
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-16 w-full max-w-4xl">
        {featureButtons.map((btn, idx) => (
          <div
            key={idx}
            onClick={() => handleNavigation(btn.path)}
            className="flex flex-col items-center p-4 bg-gray-800 rounded-2xl shadow-md cursor-pointer hover:bg-gray-700 transition"
          >
            <btn.icon className="w-8 h-8 text-yellow-400 mb-2" />
            <span>{btn.label}</span>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-20 text-gray-500 text-sm">
        © {new Date().getFullYear()} MVZx. All rights reserved.
      </footer>
    </div>
  );
}
