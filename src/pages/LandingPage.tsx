 import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, Wallet, Trophy, Crown, Sparkles } from "lucide-react";
import { api, loadAuth, isAuthenticated } from "../services/api";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";
import AuthModal from "../components/AuthModal";
import LeaderboardGlass from "../components/LeaderboardGlass";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(isAuthenticated());
  const [badge, setBadge] = useState("Bronze");
  const [wins, setWins] = useState(0);
  const [wallet, setWallet] = useState(0);
  const [demoWarning, setDemoWarning] = useState(!userLoggedIn);

  useEffect(() => {
    if (userLoggedIn) {
      loadUserData();
    }
  }, [userLoggedIn]);

  const loadUserData = async () => {
    try {
      const [walletRes, matrixRes] = await Promise.all([
        api.getWallet().catch(() => ({ balances: [] })),
        api.getMatrixStatus().catch(() => null)
      ]);

      const mvzxBalance = walletRes.balances?.find((b: any) => b.token === "MVZx");
      setWallet(mvzxBalance ? parseFloat(mvzxBalance.amount) : 0);

      if (matrixRes?.badge) setBadge(matrixRes.badge.name);
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  };

  return (
    <div className="min-h-screen w-full text-white flex flex-col bg-gradient-to-b from-purple-900 to-red-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#FFD700] border-b border-yellow-300">
        <div className="flex items-center justify-between px-4 pt-3">
          <div className="flex items-center gap-2">
            <img src="https://i.imgur.com/VbxvCK6.jpeg" alt="MAVIZ" className="h-8 w-8 rounded-full ring-2 ring-yellow-400/50" />
          </div>
          <div className="text-center leading-tight">
            <h1 className="text-[15px] font-extrabold tracking-wide text-gray-900">MAVIZ SWAPS</h1>
            <p className="text-[12px] text-gray-800">Token Swap & Earn</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => userLoggedIn ? navigate("/dashboard") : setIsAuthModalOpen(true)}
              className="px-3 py-1 text-xs rounded-full bg-purple-700 hover:bg-purple-800 border border-purple-600 text-white"
            >
              <User className="w-3.5 h-3.5 mr-1" />
              {userLoggedIn ? "Dashboard" : "Sign Up"}
            </Button>
            <Button 
              onClick={() => userLoggedIn ? navigate("/dashboard") : setIsAuthModalOpen(true)}
              className="px-2.5 py-1 rounded-full bg-purple-700 hover:bg-purple-800 border border-purple-600"
            >
              <Menu className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
        <div className="px-4 pb-2 pt-1">
          <p className="text-[12px] text-gray-800">
            MAVIZ – P2P Escrow Swap, Games, Airdrop, Mining, Unlock Affiliate Rewards in USDT, Spin & Earn, Voting & more
          </p>
          {demoWarning && <p className="text-[12px] text-orange-800 font-semibold mt-1">⚠️ This is a demo until signup</p>}
        </div>
      </header>

      {/* Main content with wheel */}
      <main className="flex-1 px-3 pb-3 overflow-auto">
        {/* Your wheel implementation here */}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setUserLoggedIn(true);
          setDemoWarning(false);
          loadUserData();
        }}
      />
    </div>
  );
}
