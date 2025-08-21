 import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, Wallet, Trophy, Crown } from "lucide-react";

// Local UI atoms
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";

// --- Helpers ---------------------------------------------------------------
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
  } catch {
    /* ignore */
  }
}

// --- Leaderboard glass (same style as original landing page) ------------------------
function LeaderboardGlass() {
  const [rows, setRows] = useState<{ user: string; prize: string; ts: string }[]>([
    { user: "Grace", prize: "20 MVZx", ts: "2m ago" },
    { user: "Ahmed", prize: "10 MVZx", ts: "5m ago" },
    { user: "Sola", prize: "50 MVZx", ts: "12m ago" },
    { user: "Ife", prize: "5 MVZx", ts: "18m ago" },
  ]);
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

// --- Main Landing Page -----------------------------------------------------
export default function LandingPage() {
  const navigate = useNavigate();

  const [badge, setBadge] = useState<"Bronze" | "Silver" | "Gold" | "Platinum">("Bronze");
  const [wins, setWins] = useState<number>(0);
  const [wallet, setWallet] = useState<number>(0);

  const [demoMode, setDemoMode] = useState(true);

  // Demo Mining Button state
  const [mining, setMining] = useState(false);
  const [mineCounter, setMineCounter] = useState(0);

  const prizes = useMemo(
    () => ["5 MVZx", "10 MVZx", "Try Again", "15 MVZx", "20 MVZx", "50 MVZx"],
    []
  );
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = () => {
    if (spinning) return;
    setResult(null);
    setSpinning(true);

    let prizeIndex = Math.floor(Math.random() * prizes.length);

    const segment = 360 / prizes.length;
    const stopAt = rotation + 360 * 4 + (prizeIndex * segment + segment / 2);
    setRotation(stopAt);

    window.setTimeout(() => {
      const chosen = prizes[prizeIndex];
      setResult(chosen);
      setSpinning(false);
      if (!demoMode && chosen !== "Try Again") {
        playWinChime();
        setWins((w) => w + 1);
      }
    }, 4200);
  };

  // Demo Mining counter
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mining) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= 180_000) {
          setMining(false);
          clearInterval(interval);
        } else {
          setMineCounter(elapsed);
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [mining]);

  const vh = Math.max(600, window.innerHeight);
  const wheelSize = Math.min(260, Math.max(210, Math.floor(vh * 0.33)));

  return (
    <div
      className="min-h-screen w-full text-white flex flex-col"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% -10%, rgba(255,255,255,0.08), transparent), linear-gradient(180deg, #7b0e17 0%, #d90429 65%, #7b0e17 100%)",
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-30" style={{ background: "linear-gradient(180deg, #0d2a36 0%, #095f61 100%)" }}>
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
            <p className="text-[12px] opacity-95">MVZx Buy & Earn</p>
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
              aria-label="Menu / Dashboard"
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

      {/* Main */}
      <main className="flex-1 px-3 pb-3">
        <Card className="relative rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-2xl p-3">
          {/* Demo warning */}
          {demoMode && (
            <div className="text-xs text-yellow-300 font-semibold text-center mb-2">
              ⚠️ Demo mode – Sign up to earn real MVZx
            </div>
          )}

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

          {/* Leaderboard & Wheel */}
          <div className="relative flex flex-col items-center">
            <div className="absolute inset-x-3 -top-2">
              <LeaderboardGlass />
            </div>
            <div className="h-16" />

            {/* Wheel */}
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
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: `rotate(${-rotation}deg)` }}
              >
                <div className="rounded-full bg-[#d90429] text-white text-xs font-extrabold px-4 py-3 shadow-xl border border-white/30">
                  SPIN
                </div>
              </div>
              {prizes.map((label, i) => {
                const angle = (360 / prizes.length) * i + (360 / prizes.length) / 2;
                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 text-[11px] font-bold text-[#7b0e17] drop-shadow text-center"
                    style={{
                      transform: `rotate(${angle}deg) translate(${wheelSize * 0.32}px) rotate(${-angle}deg)`,
                      transformOrigin: "0 0",
                      whiteSpace: "nowrap",
                      width: 60,
                    }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>

            {/* Pointer */}
            <div className="mt-2 mb-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-transparent border-b-yellow-300 drop-shadow" />

            {/* Spin Button */}
            <Button
              onClick={spin}
              disabled={spinning}
              className="w-full max-w-xs py-2 rounded-xl bg-white/20 hover:bg-white/30 border border-white/25 text-white font-bold tracking-wide"
            >
              {spinning ? "Spinning..." : "SPIN NOW"}
            </Button>

            {/* Result */}
            {result && (
              <div className="mt-2 text-sm font-semibold text-center">
                {result === "Try Again" ? "No luck—try again!" : `🎉 You won: ${result}`}
              </div>
            )}
          </div>

          {/* Feature Buttons 3x2 grid, uniform smaller size */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <Link to="/buy">
              <Button className="w-full h-12 flex flex-col justify-center items-center text-[11px] font-semibold leading-tight border border-white/15 bg-[#16a34a] hover:brightness-110">
                <span>MVZx</span>
                <span>Buy & Earn</span>
              </Button>
            </Link>
            <Link to="/airdrop">
              <Button className="w-full h-12 flex flex-col justify-center items-center text-[11px] font-semibold leading-tight border border-white/15 bg-[#db2777] hover:brightness-110">
                <span>Airdrop</span>
              </Button>
            </Link>
            <Link to="/mining">
              <Button className="w-full h-12 flex flex-col justify-center items-center text-[11px] font-semibold leading-tight border border-white/15 bg-[#ca8a04] hover:brightness-110">
                <span>Mining</span>
              </Button>
            </Link>
            <Link to="/directbuy">
              <Button className="w-full h-12 flex flex-col justify-center items-center text-[11px] font-semibold leading-tight border border-white/15 bg-[#2563eb] hover:brightness-110">
                <span>Direct</span>
                <span>Deposit Buy</span>
              </Button>
            </Link>
            <Link to="/escrow">
              <Button className="w-full h-12 flex flex-col justify-center items-center text-[11px] font-semibold leading-tight border border-white/15 bg-[#4338ca] hover:brightness-110">
                <span>Escrow</span>
                <span>P2P Trade</span>
              </Button>
            </Link>
            <Link to="/voting">
              <Button className="w-full h-12 flex flex-col justify-center items-center text-[11px] font-semibold leading-tight border border-white/15 bg-[#15803d] hover:brightness-110">
                <span>Voting</span>
              </Button>
            </Link>
          </div>

          {/* Demo Mining Button */}
          <div className="mt-2 flex justify-center items-center gap-2">
            <Button
              onClick={() => setMining(true)}
              className={`px-4 py-2 rounded-lg border border-white/15 font-semibold ${
                mining ? "bg-green-600 hover:brightness-110" : "bg-orange-500 hover:brightness-110"
              }`}
            >
              {mining ? "Mining..." : "Start Mining"}
            </Button>
            <span className="text-xs">{(mineCounter / 1000).toFixed(1)}s</span>
          </div>
        </Card>
      </main>

      <footer className="text-[11px] text-center opacity-90 pb-2">
        © {new Date().getFullYear()} MAVIZ (MVZx)
      </footer>
    </div>
  );
}
