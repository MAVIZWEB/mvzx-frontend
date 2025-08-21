 import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, Wallet, Trophy, Crown } from "lucide-react";

import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";

const API_BASE = import.meta.env.VITE_API_BASE;

// Helper to format numbers
function formatNumber(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

// Tiny win chime using WebAudio
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
  } catch {
    /* ignore */
  }
}

// Leaderboard matching landing page styling
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

  // Status capsule
  const [badge, setBadge] = useState<"Bronze" | "Silver" | "Gold" | "Platinum">("Bronze");
  const [wins, setWins] = useState<number>(0);
  const [wallet, setWallet] = useState<number>(0);

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
      } catch {}
    })();
    return () => { mounted = false; };
  }, []);

  // Wheel
  const prizes = useMemo(() => ["5 MVZx", "10 MVZx", "Try Again", "15 MVZx", "20 MVZx", "50 MVZx"], []);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = async () => {
    if (spinning) return;
    setResult(null);
    setSpinning(true);

    // Fake spin for demo if no signup
    let prizeIndex = Math.floor(Math.random() * prizes.length);

    const segment = 360 / prizes.length;
    const stopAt = rotation + 360 * 4 + (prizeIndex * segment + segment / 2);
    setRotation(stopAt);

    window.setTimeout(() => {
      const chosen = prizes[prizeIndex];
      setResult(chosen);
      setSpinning(false);
      playWinChime();
      setWins((w) => w + 1);
    }, 4200);
  };

  // Demo mining state
  const [mining, setMining] = useState(false);
  const [miningCount, setMiningCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (mining) {
      const start = Date.now();
      interval = setInterval(() => {
        const elapsed = Date.now() - start;
        if (elapsed >= 180000) {
          clearInterval(interval);
          setMining(false);
        } else setMiningCount(elapsed);
      }, 16);
    }
    return () => clearInterval(interval);
  }, [mining]);

  // Mobile-first sizing
  const wheelSize = 220;

  return (
    <div
      className="min-h-screen w-full text-white flex flex-col"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% -10%, rgba(255,255,255,0.08), transparent), linear-gradient(180deg, #7b0e17 0%, #d90429 65%, #7b0e17 100%)",
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 pt-3">
          <div className="flex items-center gap-2">
            <img
              src="https://i.imgur.com/VbxvCK6.jpeg"
              alt="MAVIZ"
              className="h-8 w-8 rounded-full ring-2 ring-white/30"
            />
          </div>
          <div className="text-center leading-tight">
            <h1 className="text-[15px] font-extrabold tracking-wide">MAVIZ LIQUIDITY</h1>
            <p className="text-[12px] opacity-90">MVZx Buy & Earn</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/signup")}
              className="px-3 py-1 text-xs rounded-full bg-white/20 hover:bg-white/30 border border-white/20"
            >
              <User className="w-3.5 h-3.5 mr-1" />
              Sign Up
            </Button>
            <Button
              onClick={() => navigate("/dashboard")}
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="px-4 pb-2 pt-1">
          <p className="text-[12px] opacity-95">
            MAVIZ – Spin. Earn. Trade. Buy MVZx and unlock matrix rewards, P2P escrow trading, voting, mining & more.
          </p>
        </div>
      </header>

      <main className="flex-1 px-3 pb-2">
        <Card className="relative rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-2xl p-3">
          {/* Status Capsule */}
          <div className="flex items-center justify-between gap-2 rounded-full px-3 py-2 bg-white/10 border border-white/15 mb-2">
            <div className="flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 opacity-90" />
              <Badge>{badge}</Badge>
            </div>
            <div className="text-[12px]">
              Wins: <span className="font-semibold">{formatNumber(wins)}</span>
            </div>
            <div className="flex items-center gap-1 text-[12px]">
              <Wallet className="w-3.5 h-3.5 opacity-90" />
              <span>{formatNumber(wallet)} MVZx</span>
            </div>
          </div>

          {/* Wheel + Leaderboard */}
          <div className="relative flex flex-col items-center">
            <div className="absolute inset-x-3 -top-2">
              <LeaderboardGlass />
            </div>
            <div className="h-16" />
            <div
              ref={wheelRef}
              className="relative rounded-full border-4 border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              style={{
                width: wheelSize,
                height: wheelSize,
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? "transform 4.2s cubic-bezier(0.33, 1, 0.68, 1)" : "none",
                background: `
                  radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 55%, transparent 60%),
                  conic-gradient(
                    rgba(255,255,255,0.85) 0deg 60deg,
                    rgba(255,255,255,0.15) 60deg 120deg,
                    rgba(255,255,255,0.85) 120deg 180deg,
                    rgba(255,255,255,0.15) 180deg 240deg,
                    rgba(255,255,255,0.85) 240deg 300deg,
                    rgba(255,255,255,0.15) 300deg 360deg
                  )`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${-rotation}deg)` }}>
                <div className="rounded-full bg-[#d90429] text-white text-xs font-extrabold px-4 py-3 shadow-xl border border-white/30">
                  SPIN
                </div>
              </div>
            </div>
            <div className="mt-2 mb-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-transparent border-b-yellow-300 drop-shadow" />
            <Button
              onClick={spin}
              disabled={spinning}
              className="w-full max-w-[120px] py-1.5 rounded-xl bg-white/20 hover:bg-white/30 border border-white/25 text-white font-bold text-xs tracking-wide"
            >
              {spinning ? "Spinning..." : "SPIN NOW"}
            </Button>
            {result && (
              <div className="mt-2 text-sm font-semibold">{result === "Try Again" ? "No luck—try again!" : `🎉 You won: ${result}`}</div>
            )}
          </div>

          {/* Feature Buttons 3x2 */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <Link to="/buy">
              <Button className="w-full h-14 flex flex-col justify-center items-center text-xs font-semibold leading-tight border border-white/15 bg-[#16a34a] hover:brightness-110">
                <span>MVZx</span>
                <span>Buy & Earn</span>
              </Button>
            </Link>
            <Link to="/airdrop">
              <Button className="w-full h-14 flex flex-col justify-center items-center text-xs font-semibold leading-tight border border-white/15 bg-[#db2777] hover:brightness-110">
                <span>Airdrop</span>
              </Button>
            </Link>
            <Link to="/mining">
              <Button className="w-full h-14 flex flex-col justify-center items-center text-xs font-semibold leading-tight border border-white/15 bg-[#ca8a04] hover:brightness-110">
                <span>Mining</span>
              </Button>
            </Link>
            <Link to="/directbuy">
              <Button className="w-full h-14 flex flex-col justify-center items-center text-xs font-semibold leading-tight border border-white/15 bg-[#2563eb] hover:brightness-110">
                <span>Direct</span>
                <span>Deposit Buy</span>
              </Button>
            </Link>
            <Link to="/escrow">
              <Button className="w-full h-14 flex flex-col justify-center items-center text-xs font-semibold leading-tight border border-white/15 bg-[#4338ca] hover:brightness-110">
                <span>Escrow</span>
                <span>P2P Trade</span>
              </Button>
            </Link>
            <Link to="/voting">
              <Button className="w-full h-14 flex flex-col justify-center items-center text-xs font-semibold leading-tight border border-white/15 bg-[#15803d] hover:brightness-110">
                <span>Voting</span>
              </Button>
            </Link>
          </div>

          {/* Demo Mining Button */}
          <div className="mt-3 flex items-center gap-2">
            <Button
              onClick={() => setMining(true)}
              disabled={mining}
              className={`flex-1 h-12 text-xs font-semibold ${
                mining ? "bg-green-600 hover:brightness-110" : "bg-orange-500 hover:brightness-110"
              } border border-white/15`}
            >
              {mining ? "Mining" : "Start Mining"}
            </Button>
            <div className="w-16 text-center text-xs font-mono">
              {(miningCount / 1000).toFixed(2)}s
            </div>
          </div>
        </Card>
      </main>

      <footer className="text-[11px] text-center opacity-90 pb-2">
        © {new Date().getFullYear()} MAVIZ (MVZx)
      </footer>
    </div>
  );
}
