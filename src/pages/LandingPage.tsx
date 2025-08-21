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
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(440, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.55);
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
  const [miningActive, setMiningActive] = useState(false);
  const [minedAmount, setMinedAmount] = useState(0);
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
  const wheelRef = useRef<HTMLDivElement>(null);

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
    const stopAt = rotation + 360 * 4 + (prizeIndex * segment + segment / 2);
    setRotation(stopAt);

    window.setTimeout(() => {
      const chosen = prizes[prizeIndex];
      setResult(chosen);
      setSpinning(false);
      if (chosen !== "Try Again") {
        playWinChime();
        setWins((w) => w + 1);
      }
    }, 4200);
  };

  const vh = Math.max(600, window.innerHeight);
  const wheelSize = Math.min(260, Math.max(210, Math.floor(vh * 0.33)));

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

  return (
    <div className="min-h-screen w-full text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 pt-3" style={{ background: "#3a0006" }}>
          <div className="flex items-center gap-2">
            <img src="https://i.imgur.com/VbxvCK6.jpeg" alt="MAVIZ" className="h-8 w-8 rounded-full ring-2 ring-white/30" />
          </div>
          <div className="text-center leading-tight">
            <h1 className="text-[15px] font-extrabold tracking-wide">MAVIZ LIQUIDITY</h1>
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
            MAVIZ – Spin. Earn. Trade. Buy MVZx and unlock matrix rewards, P2P escrow trading, voting, mining & more.
          </p>
          {demoWarning && <p className="text-[12px] text-yellow-300 font-semibold mt-1">⚠️ This is a demo until signup</p>}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-3 pb-3 overflow-auto">
        {/* Wheel Card */}
        <Card className="relative rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-2xl p-3 mt-3">
          <div className="text-center mb-2">
            <h2 className="text-sm font-extrabold tracking-wide">INSTANT SPIN & EARN</h2>
          </div>
          {/* Status */}
          <div className="flex items-center justify-between gap-2 rounded-full px-3 py-2 bg-white/10 border border-white/15 mb-2">
            <div className="flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 opacity-90" />
              <Badge>{badge}</Badge>
            </div>
            <div className="text-[12px]">Wins: <span className="font-semibold">{formatNumber(wins)}</span></div>
            <div className="flex items-center gap-1 text-[12px]">
              <Wallet className="w-3.5 h-3.5 opacity-90" />
              <span>{formatNumber(wallet)} MVZx</span>
            </div>
          </div>

          {/* Wheel + Leaderboard */}
          <div className="relative flex flex-col items-center mb-3">
            <div className="absolute inset-x-3 -top-2"><LeaderboardGlass /></div>
            <div className="h-16" />

            {/* Wheel with sectors + stickers */}
            <div
              ref={wheelRef}
              className="relative rounded-full border-4 border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.15)] overflow-hidden"
              style={{
                width: wheelSize,
                height: wheelSize,
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? "transform 4.2s cubic-bezier(0.33, 1, 0.68, 1)" : "none",
              }}
            >
              {prizes.map((label, i) => {
                const angle = (360 / prizes.length) * i;
                const midAngle = angle + 180 / prizes.length;
                const colors = ["#FACC15", "#3B82F6", "#10B981"];
                return (
                  <React.Fragment key={i}>
                    {/* Sector divider line */}
                    <div
                      className="absolute left-1/2 top-1/2 w-px bg-white/30"
                      style={{
                        height: wheelSize / 2,
                        transform: `rotate(${angle}deg) translateY(-${wheelSize / 4}px)`,
                        transformOrigin: "bottom center",
                      }}
                    />
                    {/* Sticker inside sector */}
                    <div
                      className="absolute left-1/2 top-1/2 px-2 py-1 rounded font-bold text-xs"
                      style={{
                        transform: `rotate(${midAngle}deg) translate(${wheelSize * 0.28}px) rotate(${-midAngle}deg)`,
                        backgroundColor: colors[i % colors.length],
                        color: "#000",
                      }}
                    >
                      {label}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="mt-2 mb-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-transparent border-b-yellow-300 drop-shadow" />
            <Button onClick={spin} disabled={spinning} className="w-full max-w-xs py-2 rounded-xl bg-white/20 hover:bg-white/30 border border-white/25 text-white font-bold tracking-wide">
              {spinning ? "Spinning..." : "SPIN NOW"}
            </Button>
            {result && <div className="mt-2 text-sm font-semibold">{result === "Try Again" ? "No luck—try again!" : `🎉 You won: ${result}`}</div>}
          </div>

          {/* Feature Buttons */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { to: "/buy", labels: ["MVZx", "Buy & Earn"], bg: "#16a34a" },
              { to: "/airdrop", labels: ["Airdrop"], bg: "#db2777" },
              { to: "/mining", labels: ["Mining"], bg: "#ca8a04" },
              { to: "/directbuy", labels: ["Direct", "Deposit Buy"], bg: "#2563eb" },
              { to: "/escrow", labels: ["Escrow", "P2P Trade"], bg: "#4338ca" },
              { to: "/voting", labels: ["Voting"], bg: "#15803d" },
            ].map((b, i) => (
              <Link key={i} to={b.to}>
                <Button className="w-full h-12 flex flex-col justify-center items-center text-[11px] font-semibold leading-tight border border-white/15 hover:brightness-110" style={{ backgroundColor: b.bg }}>
                  {b.labels.map((l, j) => <span key={j}>{l}</span>)}
                </Button>
              </Link>
            ))}
          </div>

          {/* Demo Mining */}
          <div className="mt-4 flex justify-center items-center gap-3">
            <Button
              onClick={() => setMiningActive(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-[12px] ${
                miningActive ? "bg-green-600 hover:bg-green-700" : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {miningActive ? "Mining" : "Start Mining"}
            </Button>
            <span className="font-mono text-xs">{((minedAmount / 1000).toFixed(2))}s</span>
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
