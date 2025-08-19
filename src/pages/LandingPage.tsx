 import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrizeWheel from "../components/PrizeWheel";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("maviz_token");

  const requireAuth = (path: string) => {
    if (!token) {
      navigate("/signup");
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    document.title = "MVZx — Spin & Earn";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden">
      {/* Glassy overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/5"></div>

      {/* Header with Logo */}
      <header className="z-10 w-full flex items-center justify-center py-2">
        <img
          src="https://i.imgur.com/VbxvCK6.jpeg"
          alt="MVZx Logo"
          className="h-14 rounded-xl shadow-lg"
        />
      </header>

      {/* Tagline */}
      <div className="z-10 text-center px-3">
        <h1 className="text-lg md:text-2xl font-bold tracking-wide">
          MVZx — Instant Spin & Earn
        </h1>
        <p className="text-sm opacity-80">Buy • Mine • Trade • Vote</p>
      </div>

      {/* Prize Wheel */}
      <div className="z-10 flex justify-center items-center my-2 w-full">
        <div className="w-64 h-64 sm:w-72 sm:h-72 glass-card flex items-center justify-center">
          <PrizeWheel />
        </div>
      </div>

      {/* Buttons */}
      <div className="z-10 grid grid-cols-2 gap-3 px-4 w-full max-w-md mb-4">
        <button
          onClick={() => requireAuth("/buy")}
          className="py-2 rounded-xl bg-white/20 text-cream-100 font-medium shadow hover:bg-white/30 backdrop-blur-md"
        >
          Buy MVZx & Earn
        </button>
        <button
          onClick={() => requireAuth("/airdrop")}
          className="py-2 rounded-xl bg-white/20 text-cream-100 font-medium shadow hover:bg-white/30 backdrop-blur-md"
        >
          Airdrop
        </button>
        <button
          onClick={() => requireAuth("/signup")}
          className="py-2 rounded-xl bg-white/20 text-cream-100 font-medium shadow hover:bg-white/30 backdrop-blur-md"
        >
          Sign Up
        </button>
        <button
          onClick={() => requireAuth("/escrow")}
          className="py-2 rounded-xl bg-white/20 text-cream-100 font-medium shadow hover:bg-white/30 backdrop-blur-md"
        >
          Escrow P2P Trade
        </button>
        <button
          onClick={() => requireAuth("/transfer")}
          className="py-2 rounded-xl bg-white/20 text-cream-100 font-medium shadow hover:bg-white/30 backdrop-blur-md"
        >
          Manual Transfer
        </button>
        <button
          onClick={() => requireAuth("/mining")}
          className="py-2 rounded-xl bg-white/20 text-cream-100 font-medium shadow hover:bg-white/30 backdrop-blur-md"
        >
          Mining
        </button>
        <button
          onClick={() => requireAuth("/voting")}
          className="py-2 rounded-xl bg-white/20 text-cream-100 font-medium shadow hover:bg-white/30 backdrop-blur-md"
        >
          Voting
        </button>
        <button
          onClick={() => requireAuth("/dashboard")}
          className="py-2 rounded-xl bg-white/20 text-cream-100 font-medium shadow hover:bg-white/30 backdrop-blur-md"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
