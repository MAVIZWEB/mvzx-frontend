 import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, Trophy } from "lucide-react";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";

const API_BASE = import.meta.env.VITE_API_BASE;

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
    return () => { mounted = false; };
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

// Animated number component
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    let start = display;
    const diff = value - start;
    if (diff === 0) return;
    const steps = Math.min(Math.abs(diff), 20); // max steps
    const stepValue = diff / steps;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplay(prev => prev + stepValue);
      if (i >= steps) {
        setDisplay(value);
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [value]);
  return <span>{Math.floor(display)}</span>;
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [demoMining, setDemoMining] = useState<number>(0);
  const [totalDemo, setTotalDemo] = useState<number>(0);

  const prizes = useMemo(() => ["5 MVZx","10 MVZx","Try Again","15 MVZx","20 MVZx","50 MVZx"], []);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    if (!API_BASE) return;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/public/landing-summary`, { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        if (data?.signedIn) setIsSignedIn(true);
      } catch {}
    })();
    return () => { mounted = false; };
  }, []);

  const spin = async () => {
    if (spinning) return;
    setResult(null);
    setSpinning(true);

    let prizeIndex = Math.floor(Math.random() * prizes.length);

    if (isSignedIn && API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/game/spin`, { method: "POST", credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (typeof data?.prizeIndex === "number") prizeIndex = data.prizeIndex;
        }
      } catch {}
    }

    const segment = 360 / prizes.length;
    const stopAt = rotation + 360 * 4 + (prizeIndex * segment + segment / 2);
    setRotation(stopAt);

    window.setTimeout(() => {
      const chosen = prizes[prizeIndex];
      setResult(chosen);

      if (!isSignedIn) {
        const fake = Math.floor(Math.random() * 5) + 1;
        setDemoMining(dm => dm + fake);
        setTotalDemo(td => td + fake);
      }

      setSpinning(false);
    }, 4200);
  };

  const vh = Math.max(600, window.innerHeight);
  const wheelSize = Math.min(260, Math.max(210, Math.floor(vh * 0.33)));

  return (
    <div className="min-h-screen w-full text-white flex flex-col"
      style={{ background:"radial-gradient(1200px 600px at 50% -10%, rgba(255,255,255,0.08), transparent), linear-gradient(180deg, #7b0e17 0%, #d90429 65%, #7b0e17 100%)" }}>

      {/* Header */}
      <header className="sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 pt-3">
          <div className="flex items-center gap-2">
            <img src="https://i.imgur.com/VbxvCK6.jpeg" alt="MAVIZ" className="h-8 w-8 rounded-full ring-2 ring-white/30"/>
          </div>
          <div className="text-center leading-tight">
            <h1 className="text-[15px] font-extrabold tracking-wide">MAVIZ LIQUIDITY</h1>
            <p className="text-[12px] opacity-95">MVZx Buy &amp; Earn</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate("/signup")} className="px-3 py-1 text-xs rounded-full bg-white/20 hover:bg-white/30 border border-white/20">
              <User className="w-3.5 h-3.5 mr-1" /> Sign Up
            </Button>
            <Button onClick={() => navigate("/dashboard")} className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10" aria-label="Menu / Dashboard">
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

      {!isSignedIn && <div className="text-center text-yellow-300 text-sm py-1 font-semibold">Demo Mode – Sign up to earn real MVZx!</div>}

      {/* Feature Buttons */}
      <div className="grid grid-cols-3 gap-2 mt-3 px-3">
        <Link to="/buy"><Button className="w-full h-16 flex flex-col justify-center items-center text-xs font-semibold leading-tight border border-white/15 bg-[#16a34a] hover:brightness-110"><span>MVZx</span><span>Buy & Earn</span></Button></Link>
        <Link to="/airdrop"><Button className="w-full h-16 flex flex-col justify-center items-center text-xs font-semibold leading-tight border border-white/15 bg-[#db2777] hover:brightness-110"><span>Airdrop</span></Button></Link>
        <Link to="/mining"><Button className="w-full h-16 flex flex-col justify-center items-center text-xs font-semibold leading-tight border border-white/15 bg-[#ca8a04] hover:brightness-110"><span>Mining</span></Button></Link>
        <Link to="/directbuy"><Button className="w-full h-16 flex flex-col justify-center items-center text-xs font-semibold leading-tight border border-white/15 bg-[#2563eb] hover:brightness-110"><span>Direct</span><span>Deposit Buy</span></Button></Link>
        <Link to="/escrow"><Button className="w-full h-16 flex flex-col justify-center items-center text-xs font-semibold leading-tight border border-white/15 bg-[#4338ca] hover:brightness-110"><span>Escrow</span><span>P2P Trade</span></Button></Link>
        <Link to="/voting"><Button className="w-full h-16 flex flex-col justify-center items-center text-xs font-semibold leading-tight border border-white/15 bg-[#15803d] hover:brightness-110"><span>Voting</span></Button></Link>
      </div>

      <div className="px-3 mt-3"><LeaderboardGlass /></div>

      {/* Wheel */}
      <div className="flex flex-col items-center px-3 mt-3">
        <div ref={wheelRef} className="relative rounded-full border-4 border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          style={{
            width: wheelSize,
            height: wheelSize,
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4.2s cubic-bezier(0.33, 1, 0.68, 1)" : "none",
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 55%, transparent 60%),
                         conic-gradient(rgba(255,255,255,0.85) 0deg 60deg, rgba(255,255,255,0.15) 60deg 120deg,
                                        rgba(255,255,255,0.85) 120deg 180deg, rgba(255,255,255,0.15) 180deg 240deg,
                                        rgba(255,255,255,0.85) 240deg 300deg, rgba(255,255,255,0.15) 300deg 360deg)`}}>
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${-rotation}deg)` }}>
            <div className="rounded-full bg-[#d90429] text-white text-xs font-extrabold px-4 py-3 shadow-xl border border-white/30">SPIN</div>
          </div>
          {prizes.map((label, i) => {
            const angle = (360 / prizes.length) * i + (360 / prizes.length)/2;
            return <div key={i} className="absolute left-1/2 top-1/2 text-[11px] font-bold text-[#7b0e17] drop-shadow"
              style={{ transform: `rotate(${angle}deg) translate(${wheelSize*0.32}px) rotate(${-angle}deg)`, transformOrigin: "0 0", whiteSpace: "nowrap" }}>{label}</div>;
          })}
        </div>
        <div className="mt-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-transparent border-b-yellow-300 drop-shadow" />
        <Button onClick={spin} disabled={spinning} className="w-full max-w-xs py-2 rounded-xl bg-white/20 hover:bg-white/30 border border-white/25 text-white font-bold tracking-wide">
          {spinning ? "Spinning..." : "SPIN NOW"}
        </Button>
        {result && <div className="mt-2 text-sm font-semibold">{result==="Try Again"?"No luck—try again!":`🎉 You won: ${result}`}</div>}
      </div>

      {/* Demo Mining Button */}
      {!isSignedIn && (
        <div className="flex items-center justify-center gap-3 mt-4 px-3">
          <Button
            onClick={() => setDemoMining(dm => { setTotalDemo(td => td + 1); return dm + 1; })}
            className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2">
            Start Mining
          </Button>
          <div className="text-white font-bold text-lg min-w-[60px] text-center">
            <AnimatedNumber value={demoMining} /> MVZx
          </div>
        </div>
      )}
    </div>
  );
}
