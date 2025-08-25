 // src/pages/Landing.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu, User, Wallet, Trophy, Crown, Sparkles,
  Coins, Gift, Cpu, Handshake, Vote, Building,
  Volume2, VolumeX
} from "lucide-react";
import { api, loadAuth, isAuthenticated } from "../services/api";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";
import AuthModal from "../components/AuthModal";

/* ---------------- Leaderboard ---------------- */
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
        const res = await api.getLeaderboard?.();
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
    <Card className="bg-white/10 backdrop-blur-md border-white/10 p-3">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="w-4 h-4 text-yellow-400" />
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

/* ---------------- Landing Page ---------------- */
export default function LandingPage() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(isAuthenticated());
  const [badge, setBadge] = useState("Bronze");
  const [wins, setWins] = useState(0);
  const [wallet, setWallet] = useState(0);

  // Spin state
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  // Free spins (demo)
  const [freeSpins, setFreeSpins] = useState<number>(() => {
    const s = localStorage.getItem("mvzx_free_spins");
    return s ? Math.max(0, parseInt(s)) : 3;
  });

  // Sound
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  // Prize map
  const prizes = useMemo(() => [
    { label: "0.125 MVZx", color: "#fbbf24", isLose: false }, 
    { label: "0.25 MVZx",  color: "#f97316", isLose: false }, 
    { label: "Try Again",  color: "#6b7280", isLose: true  }, 
    { label: "0.5 MVZx",   color: "#3b82f6", isLose: false }, 
    { label: "0.75 MVZx",  color: "#8b5cf6", isLose: false }, 
    { label: "3 MVZx 🎉",  color: "#22c55e", isLose: false }, 
  ], []);

  /* ---------------- Sound ---------------- */
  const beepFallback = () => {
    try {
      const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx = new Ctx();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle"; o.frequency.value = 880;
      o.connect(g); g.connect(ctx.destination);
      const t = ctx.currentTime;
      g.gain.setValueAtTime(0.001, t);
      g.gain.exponentialRampToValueAtTime(0.2, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o.start(); o.stop(t + 0.32);
    } catch {}
  };

  const playWinSound = () => {
    if (muted) return;
    const el = audioRef.current;
    if (el) {
      try { el.currentTime = 0; el.play().catch(beepFallback); } catch { beepFallback(); }
    } else { beepFallback(); }
  };

  /* ---------------- Spin ---------------- */
  const spin = async () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    let prizeIndex = Math.floor(Math.random() * prizes.length);
    setRotation(rotation + 360 * 4 + prizeIndex * (360 / prizes.length));

    window.setTimeout(() => {
      const chosen = prizes[prizeIndex];
      setSpinning(false);

      if (chosen.isLose) {
        setResult("Try again 🎯");
      } else {
        setResult(`🎉 You won ${chosen.label}`);
        playWinSound();
        setWins((w) => w + 1);
      }
    }, 4200);
  };

  return (
    <div className="min-h-screen w-full text-white flex flex-col"
      style={{ background: "linear-gradient(135deg, #3a0006 0%, #1a0020 50%, #000524 100%)" }}>
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#FFD700] border-b border-yellow-300">
        <div className="flex items-center justify-between px-4 pt-3">
          <h1 className="text-[15px] font-extrabold text-gray-900">MAVIZ SWAPS</h1>
          <Button
            onClick={() => (userLoggedIn ? navigate("/dashboard") : setIsAuthModalOpen(true))}
            className="px-3 py-1 text-xs rounded-full bg-purple-700 text-white"
          >
            {userLoggedIn ? "Dashboard" : "Sign Up"}
          </Button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-3 pb-3 overflow-auto">
        {/* Spin Section */}
        <Card className="mt-3 p-3 bg-white/10 border border-white/15">
          <LeaderboardGlass />
          <div className="flex justify-center mt-4">
            <Button onClick={spin} disabled={spinning} className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-lg">
              {spinning ? "Spinning..." : "SPIN NOW"}
            </Button>
            <button onClick={() => setMuted((m) => !m)} className="ml-2 p-2 bg-white/10 rounded-lg">
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
          {result && <p className="mt-3 text-center font-semibold">{result}</p>}
        </Card>

        {/* Feature Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { to: "/buy", labels: ["Buy MVZx"], bg: "#16a34a", icon: Coins },
            { to: "/airdrop", labels: ["Airdrop"], bg: "#db2777", icon: Gift },
            { to: "/mining", labels: ["Mining"], bg: "#ca8a04", icon: Cpu },
            { to: "/directbuy", labels: ["Direct Transfer"], bg: "#2563eb", icon: Building },
            { to: "/escrow", labels: ["Escrow"], bg: "#4338ca", icon: Handshake },
            { to: "/voting", labels: ["Voting"], bg: "#15803d", icon: Vote },
          ].map((b, i) => (
            <Link key={i} to={b.to}>
              <Button className="w-full h-12 flex flex-col justify-center items-center text-[11px] font-semibold"
                style={{ backgroundColor: b.bg }}>
                <b.icon className="w-4 h-4 mb-1" />
                {b.labels.map((l, j) => <span key={j}>{l}</span>)}
              </Button>
            </Link>
          ))}
        </div>
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
          try { loadAuth(); } catch {}
        }}
      />

      {/* Win SFX */}
      <audio ref={audioRef} src="/sounds/win.mp3" preload="auto" />
    </div>
  );
}
