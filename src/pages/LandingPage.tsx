 import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, Wallet, Trophy, Crown, Sparkles, Coins, Gift, Cpu, Handshake, Vote, Bank } from "lucide-react";
import { api, loadAuth, isAuthenticated } from "../services/api";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";
import AuthModal from "../components/AuthModal";

function LeaderboardGlass() {
  const [rows, setRows] = useState<{ user: string; prize: string; ts: string }[]>([
    { user: "Edu", prize: "20 MVZx", ts: "2m ago" },
    { user: "Isa", prize: "10 MVZx", ts: "5m ago" },
    { user: "Ike", prize: "50 MVZx", ts: "12m ago" },
    { user: "Ayo", prize: "5 MVZx", ts: "18m ago" },
  ]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.getLeaderboard();
        if (mounted && Array.isArray(res?.items)) {
          setRows(
            res.items.slice(0, 6).map((r: any) => ({
              user: String(r.user ?? "User"),
              prize: String(r.prize ?? "—"),
              ts: String(r.ts ?? ""),
            }))
          );
        }
      } catch {}
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <Card className="bg-white/6 backdrop-blur-md border-white/10 p-3">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="w-4 h-4" />
        <p className="text-xs font-semibold tracking-wide">Recent Wins</p>
      </div>
      <div className="max-h-20 overflow-auto pr-1">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-b-0">
            <span className="truncate">{r.user}</span>
            <span className="font-semibold">{r.prize}</span>
            <span className="text-[11px] opacity-80">{r.ts}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(isAuthenticated());
  const [badge, setBadge] = useState("Bronze");
  const [wins, setWins] = useState(0);
  const [wallet, setWallet] = useState(0);
  const [miningActive, setMiningActive] = useState(false);
  const [minedAmount, setMinedAmount] = useState(0);
  const [demoWarning, setDemoWarning] = useState(!userLoggedIn);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const prizes = useMemo(() => ["1 MVZx", "2 MVZx", "Try Again", "3 MVZx", "5 MVZx", "8 MVZx"], []);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userLoggedIn) {
      loadUserData();
    }
  }, [userLoggedIn]);

  useEffect(() => {
    if (!miningActive) return;
    let start = Date.now();
    let interval = setInterval(() => {
      let elapsed = Date.now() - start;
      setMinedAmount(Math.min(elapsed, 180000));
      if (elapsed >= 180000) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [miningActive]);

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

  const spin = async () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    let prizeIndex = Math.floor(Math.random() * prizes.length);
    try {
      if (!demoWarning) {
        const res = await api.spin();
        if (typeof res?.prizeIndex === "number") {
          prizeIndex = Math.max(0, Math.min(prizes.length - 1, res.prizeIndex));
        }
      }
    } catch {}

    const segment = 360 / prizes.length;
    const stopAt = rotation + 360 * 4 + (prizeIndex * segment + segment / 2);
    setRotation(stopAt);

    setTimeout(() => {
      const chosen = prizes[prizeIndex];
      setResult(chosen);
      setSpinning(false);
      if (chosen !== "Try Again") {
        setWins(w => w + 1);
      }
    }, 4200);
  };

  const vh = Math.max(600, window.innerHeight);
  const wheelSize = Math.min(260, Math.max(210, Math.floor(vh * 0.33)));

  return (
    <div className="min-h-screen w-full text-white flex flex-col" style={{ background: "linear-gradient(135deg, #3a0006 0%, #1a0020 50%, #000524 100%)" }}>
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

      {/* Main Content */}
      <main className="flex-1 px-3 pb-3 overflow-auto">
        {/* Wheel Card */}
        <Card className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl p-3 mt-3">
          <div className="text-center mb-2">
            <h2 className="text-sm font-extrabold tracking-wide">INSTANT SPIN & EARN</h2>
          </div>
          
          {/* Status */}
          <Card className="flex items-center justify-between gap-2 rounded-full px-3 py-2 bg-white/10 border border-white/15 mb-2">
            <div className="flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 opacity-90" />
              <Badge>{badge}</Badge>
            </div>
            <div className="text-[12px]">Wins: <span className="font-semibold">{wins}</span></div>
            <div className="flex items-center gap-1 text-[12px]">
              <Wallet className="w-3.5 h-3.5 opacity-90" />
              <span>{wallet.toFixed(2)} MVZx</span>
            </div>
          </Card>

          {/* Wheel + Leaderboard */}
          <div className="relative flex flex-col items-center mb-3">
            <div className="absolute inset-x-3 -top-2 z-10">
              <LeaderboardGlass />
            </div>
            <div className="h-16" />
            
            {/* Wheel Container */}
            <div className="relative z-20" style={{ width: wheelSize, height: wheelSize }}>
              <div
                ref={wheelRef}
                className="absolute inset-0 rounded-full border-2 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-sm"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? "transform 4.2s cubic-bezier(0.33, 1, 0.68, 1)" : "none",
                  background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)",
                }}
              >
                {/* Wheel content would go here */}
              </div>
              
              {/* Center circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1/3 h-1/3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 border-2 border-white/30 shadow-lg flex items-center justify-center">
                  <Sparkles className="w-1/2 h-1/2 text-white" />
                </div>
              </div>
            </div>

            {/* Pointer */}
            <div className="mt-2 mb-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[16px] border-transparent border-b-yellow-300 drop-shadow-lg z-10" />
            
            {/* Spin Button */}
            <Button 
              onClick={spin} 
              disabled={spinning} 
              className="w-full max-w-xs py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 border-0 text-white font-bold tracking-wide mt-2"
            >
              {spinning ? "Spinning..." : "SPIN NOW"}
            </Button>
            
            {/* Result Display */}
            {result && (
              <div className="mt-2 p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-md">
                <div className="text-sm font-semibold text-center text-white">
                  {result === "Try Again" ? "Try again! 🎯" : `🎉 ${result}`}
                </div>
              </div>
            )}
          </div>

          {/* Feature Buttons */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { to: "/buy", labels: ["MVZx", "Buy & Earn"], bg: "#16a34a", icon: Coins },
              { to: "/airdrop", labels: ["Airdrop"], bg: "#db2777", icon: Gift },
              { to: "/mining", labels: ["Mining"], bg: "#ca8a04", icon: Cpu },
              { to: "/directbuy", labels: ["Direct", "Deposit"], bg: "#2563eb", icon: Bank },
              { to: "/escrow", labels: ["Escrow", "P2P Trade"], bg: "#4338ca", icon: Handshake },
              { to: "/voting", labels: ["Voting"], bg: "#15803d", icon: Vote },
            ].map((b, i) => (
              <Link key={i} to={b.to}>
                <Button className="w-full h-12 flex flex-col justify-center items-center text-[11px] font-semibold leading-tight border border-white/15 hover:brightness-110" style={{ backgroundColor: b.bg }}>
                  <b.icon className="w-4 h-4 mb-1" />
                  {b.labels.map((l, j) => <span key={j}>{l}</span>)}
                </Button>
              </Link>
            ))}
          </div>

          {/* Demo Mining */}
          <Card className="mt-4 p-3 bg-white/5 border-white/10">
            <div className="flex justify-center items-center gap-3">
              <Button
                onClick={() => setMiningActive(!miningActive)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-[12px] ${
                  miningActive ? "bg-green-600 hover:bg-green-700" : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {miningActive ? "Stop Mining" : "Start Mining"}
              </Button>
              <span className="font-mono text-xs">{(minedAmount / 1000).toFixed(2)}s</span>
            </div>
            {miningActive && (
              <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(minedAmount / 180000) * 100}%` }}
                ></div>
              </div>
            )}
          </Card>
        </Card>
      </main>

      {/* Footer */}
      <footer className="px-4 py-3 text-[11px] text-white/70 text-center">
        &copy; {new Date().getFullYear()} MAVIZ. All rights reserved.
      </footer>

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
