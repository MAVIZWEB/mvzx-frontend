 import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, Wallet, Trophy, Crown } from "lucide-react";

import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";

const API_BASE = import.meta.env.VITE_API_BASE;

function formatNumber(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function playWinChime() {
  try {
    const audio = new Audio("/sounds/win.mp3"); // put an mp3 in /public/sounds
    audio.play().catch(() => {});
  } catch {}
}

function LeaderboardGlass() {
  const [rows, setRows] = useState<{ user: string; prize: string; ts: string }[]>([
    { user: "Grace", prize: "20 MVZx", ts: "2m ago" },
    { user: "Ahmed", prize: "10 MVZx", ts: "5m ago" },
    { user: "Sola", prize: "50 MVZx", ts: "12m ago" },
    { user: "Ife", prize: "5 MVZx", ts: "18m ago" },
  ]);

  useEffect(() => {
    let mounted = true;
    if (!API_BASE) return;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/public/leaderboard`, { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json();
        if (mounted && Array.isArray(data?.items)) {
          setRows(
            data.items.slice(0, 6).map((r: any) => ({
              user: String(r.user ?? "User"),
              prize: String(r.prize ?? "—"),
              ts: String(r.ts ?? ""),
            }))
          );
        }
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="rounded-2xl bg-white/6 backdrop-blur-md border border-white/10 shadow-md p-3">
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
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  const [badge, setBadge] = useState<"Bronze" | "Silver" | "Gold" | "Platinum">("Bronze");
  const [wins, setWins] = useState<number>(0);
  const [wallet, setWallet] = useState<number>(0);
  const [demoWarning, setDemoWarning] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!API_BASE) return;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/public/landing-summary`, { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        if (data?.badge) setBadge(data.badge);
        if (typeof data?.wins === "number") setWins(data.wins);
        if (typeof data?.wallet === "number") setWallet(data.wallet);
        setDemoWarning(!data?.signedUp);
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const prizes = useMemo(() => ["5 MVZx", "10 MVZx", "Try Again", "15 MVZx", "20 MVZx", "50 MVZx"], []);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const spin = async () => {
    if (spinning) return;
    setResult(null);
    setSpinning(true);

    let prizeIndex = Math.floor(Math.random() * prizes.length);
    try {
      if (API_BASE && !demoWarning) {
        const res = await fetch(`${API_BASE}/game/spin`, { method: "POST", credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (typeof data?.prizeIndex === "number") prizeIndex = Math.max(0, Math.min(prizes.length - 1, data.prizeIndex));
        }
      }
    } catch {}

    const segment = 360 / prizes.length;
    const stopAt = 360 * 5 + prizeIndex * segment + segment / 2;
    setRotation(stopAt);

    window.setTimeout(() => {
      const chosen = prizes[prizeIndex];
      setResult(chosen);
      setSpinning(false);
      if (chosen !== "Try Again") {
        playWinChime();
        setWins((w) => w + 1);
      }
    }, 4500);
  };

  const wheelSize = 280;
  const colors = ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"]; // different colors

  return (
    <div className="min-h-screen w-full text-white flex flex-col" style={{ background: "linear-gradient(180deg,#3a0006,#0f0f0f)" }}>
      {/* Header */}
      <header className="sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 pt-3" style={{ background: "#3a0006" }}>
          <div className="flex items-center gap-2">
            <img src="https://i.imgur.com/VbxvCK6.jpeg" alt="MVZX" className="h-8 w-8 rounded-full ring-2 ring-white/30" />
          </div>
          <div className="text-center leading-tight">
            <h1 className="text-[15px] font-extrabold tracking-wide text-red-900">MAVIZ LIQUIDITY</h1>
            <p className="text-[12px] opacity-95">MVZx Buy & Earn</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate("/signup")} className="px-3 py-1 text-xs rounded-full bg-white/20 hover:bg-white/30 border border-white/20">
              <User className="w-3.5 h-3.5 mr-1" />
              Sign Up
            </Button>
            <Button onClick={() => navigate("/dashboard")} className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="px-4 pb-2 pt-1">
          <p className="text-[12px] opacity-95">
            Buy MVZx with <strong>Flutterwave</strong> or <strong>USDT</strong> & unlock rewards: P2P trading, matrix, mining, voting & more.
          </p>
          {demoWarning && <p className="text-[12px] text-yellow-300 font-semibold mt-1">⚠️ Demo until signup</p>}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-3 pb-3 overflow-auto">
        <Card className="relative rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-2xl p-3 mt-3">
          <div className="text-center mb-2">
            <h2 className="text-sm font-extrabold tracking-wide">INSTANT SPIN & EARN</h2>
          </div>

          {/* Wheel */}
          <div className="flex flex-col items-center">
            <div className="relative" style={{ width: wheelSize, height: wheelSize }}>
              <div
                className="rounded-full"
                style={{
                  width: wheelSize,
                  height: wheelSize,
                  border: "6px solid rgba(255,255,255,0.3)",
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? "transform 4.5s cubic-bezier(0.33, 1, 0.68, 1)" : "none",
                }}
              >
                {prizes.map((label, i) => {
                  const segment = 360 / prizes.length;
                  const startAngle = i * segment;
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        width: "50%",
                        height: "50%",
                        backgroundColor: colors[i],
                        transformOrigin: "100% 100%",
                        transform: `rotate(${startAngle}deg) skewY(${90 - segment}deg)`,
                        clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "30%",
                          left: "105%",
                          transform: `rotate(${segment / 2}deg)`,
                          transformOrigin: "0 0",
                          fontSize: "11px",
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-transparent border-b-yellow-300" />
            </div>

            <Button onClick={spin} disabled={spinning} className="mt-3 w-full max-w-xs py-2 rounded-xl bg-white/20 hover:bg-white/30 border border-white/25 text-white font-bold tracking-wide">
              {spinning ? "Spinning..." : "SPIN NOW"}
            </Button>
            {result && <div className="mt-2 text-sm font-semibold">{result === "Try Again" ? "No luck—try again!" : `🎉 You won: ${result}`}</div>}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <Link to="/buy">
              <Button className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold">Buy with Flutterwave</Button>
            </Link>
            <Link to="/buy-usdt">
              <Button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold">Buy with USDT</Button>
            </Link>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="px-4 py-3 text-[11px] text-white/70 text-center">
        &copy; {new Date().getFullYear()} MAVIZ. All rights reserved.
      </footer>
    </div>
  );
}
