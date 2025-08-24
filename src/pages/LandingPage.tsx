 // src/pages/LandingPage.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, Wallet, Trophy, Crown, Sparkles, Coins, Gift, Cpu, Handshake, Vote, Building } from "lucide-react";
import { api, loadAuth, isAuthenticated } from "../services/api";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";
import AuthModal from "../components/AuthModal";

function LeaderboardGlass() {
  const [rows, setRows] = useState<{ user: string; prize: string; ts: string }[]>([]);
  useEffect(()=>{ let m=true; (async()=>{
    try {
      const res = await api.getLeaderboard();
      if(m && Array.isArray(res?.items)) setRows(res.items.slice(0,6).map((r:any)=>({user:r.user||"User", prize:r.prize||"—", ts:r.ts||""})));
    } catch {}
  })(); return ()=>{m=false}; }, []);
  return (
    <Card className="bg-white/6 backdrop-blur-md border-white/10 p-3">
      <div className="flex items-center gap-2 mb-2"><Trophy className="w-4 h-4" /><p className="text-xs font-semibold">Recent Wins</p></div>
      <div className="max-h-20 overflow-auto pr-1">
        {rows.map((r,i)=>(<div key={i} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-b-0">
          <span className="truncate">{r.user}</span><span className="font-semibold">{r.prize}</span><span className="text-[11px] opacity-80">{r.ts}</span>
        </div>))}
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
  const [walletBalance, setWalletBalance] = useState(0);
  const [miningActive, setMiningActive] = useState(false);
  const [minedAmount, setMinedAmount] = useState(0);
  const [demoWarning, setDemoWarning] = useState(!userLoggedIn);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement|null>(null);
  const prizes = useMemo(()=>["1 MVZx","2 MVZx","Try Again","3 MVZx","5 MVZx","8 MVZx"], []);
  const segment = 360 / prizes.length;

  useEffect(()=>{ if(userLoggedIn) loadUserData(); },[userLoggedIn]);

  async function loadUserData(){
    try {
      const [wallet, matrix] = await Promise.all([ api.getWallet().catch(()=>({balances:[]})), api.getMatrixStatus().catch(()=>null) ]);
      const mvzx = wallet.balances?.find((b:any)=>b.token==="MVZx")?.amount;
      setWalletBalance(mvzx ? Number(mvzx) : 0);
      if(matrix?.badge) setBadge(matrix.badge.name || "Bronze");
      setDemoWarning(false);
    } catch (e) { console.error(e); }
  }

  // sound
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

  const spin = async () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // ask backend for result (backend authoritative)
    let serverIndex = Math.floor(Math.random() * prizes.length); // fallback
    try {
      const res = await api.spin(prizes);
      if (typeof res?.prizeIndex === "number") serverIndex = Math.max(0, Math.min(prizes.length-1, res.prizeIndex));
    } catch(e){ console.warn("spin api failed", e); }

    // animate wheel to serverIndex
    const current = rotation % 360;
    // make sure we rotate multiple full turns + land at correct sector center
    const target = (360 * 5) + (serverIndex * segment + segment/2);
    const stopAt = current + target;
    setRotation(stopAt);

    // reveal after animation
    setTimeout(()=>{
      const chosen = prizes[serverIndex] ?? "Try Again";
      setResult(chosen);
      setSpinning(false);
      if (chosen !== "Try Again") {
        playWinChime();
        setWins(w=>w+1);
        // update local wallet display (reload balances)
        if (userLoggedIn) loadUserData();
      }
    }, 4400);
  };

  // wheel size responsive
  const vh = Math.max(600, window.innerHeight);
  const wheelSize = Math.min(320, Math.max(220, Math.floor(vh * 0.33)));

  // rendering sectors with proper rotation transform
  return (
    <div className="min-h-screen w-full text-white flex flex-col" style={{ background: "linear-gradient(135deg, #3a0006 0%, #1a0020 50%, #000524 100%)" }}>
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
            <Button onClick={() => userLoggedIn ? navigate("/dashboard") : setIsAuthModalOpen(true)} className="px-3 py-1 text-xs rounded-full bg-purple-700 hover:bg-purple-800 border border-purple-600 text-white">
              <User className="w-3.5 h-3.5 mr-1" />{userLoggedIn ? "Dashboard" : "Sign Up"}
            </Button>
            <Button onClick={() => userLoggedIn ? navigate("/dashboard") : setIsAuthModalOpen(true)} className="px-2.5 py-1 rounded-full bg-purple-700 hover:bg-purple-800 border border-purple-600">
              <Menu className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
        <div className="px-4 pb-2 pt-1">
          <p className="text-[12px] text-gray-800">MAVIZ – P2P Escrow Swap, Games, Airdrop, Mining, Unlock Affiliate Rewards in USDT, Spin & Earn, Voting & more</p>
          {demoWarning && <p className="text-[12px] text-orange-800 font-semibold mt-1">⚠️ This is a demo until signup</p>}
        </div>
      </header>

      <main className="flex-1 px-3 pb-3 overflow-auto">
        <Card className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl p-3 mt-3">
          <div className="text-center mb-2"><h2 className="text-sm font-extrabold tracking-wide">INSTANT SPIN & EARN</h2></div>

          <Card className="flex items-center justify-between gap-2 rounded-full px-3 py-2 bg-white/10 border border-white/15 mb-2">
            <div className="flex items-center gap-1.5"><Crown className="w-3.5 h-3.5 opacity-90" /><Badge>{badge}</Badge></div>
            <div className="text-[12px]">Wins: <span className="font-semibold">{wins}</span></div>
            <div className="flex items-center gap-1 text-[12px]"><Wallet className="w-3.5 h-3.5 opacity-90" /><span>{walletBalance.toFixed(2)} MVZx</span></div>
          </Card>

          <div className="relative flex flex-col items-center mb-3">
            <div className="absolute inset-x-3 -top-2 z-10"><LeaderboardGlass /></div>
            <div className="h-16" />

            <div style={{ width: wheelSize, height: wheelSize }} className="relative z-20">
              {/* spinning wheel */}
              <div ref={wheelRef}
                   style={{
                     width: wheelSize,
                     height: wheelSize,
                     borderRadius: "50%",
                     transform: `rotate(${rotation}deg)`,
                     transition: spinning ? "transform 4.2s cubic-bezier(0.33, 1, 0.68, 1)" : "none",
                     position: "relative",
                     overflow: "hidden",
                     boxShadow: "0 0 30px rgba(255,255,255,0.08)",
                   }}>
                {/* render sectors */}
                {prizes.map((label, i) => {
                  const angle = (360 / prizes.length) * i;
                  const rad = (wheelSize / 2) * 0.85;
                  const textAngle = angle + segment / 2;
                  const x = (wheelSize / 2) + Math.cos((textAngle - 90) * (Math.PI/180)) * rad;
                  const y = (wheelSize / 2) + Math.sin((textAngle - 90) * (Math.PI/180)) * rad;
                  const bg = i % 2 === 0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)";
                  return (
                    <div key={i} style={{
                      position: "absolute",
                      left: 0, top: 0, width: wheelSize, height: wheelSize,
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: "50% 50%",
                      clipPath: `polygon(50% 50%, 100% 0, 100% 100%)`,
                      background: bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}>
                      <div style={{
                        position: "absolute",
                        left: `${x - wheelSize*0.05}px`,
                        top: `${y - 12}px`,
                        transform: `rotate(${-(angle + segment/2)}deg)`,
                        width: wheelSize*0.4,
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 12,
                        color: "#000"
                      }}>{label}</div>
                    </div>
                  );
                })}
              </div>

              {/* center */}
              <div style={{ position:"absolute", left: "50%", top:"50%", transform:"translate(-50%,-50%)" }}>
                <div style={{ width: wheelSize*0.28, height: wheelSize*0.28, borderRadius: "50%", background: "linear-gradient(90deg,#FBBF24,#FB923C)", display: "flex", alignItems:"center", justifyContent:"center", boxShadow: "0 10px 25px rgba(0,0,0,0.25)" }}>
                  <Sparkles className="text-white" />
                </div>
              </div>
            </div>

            <div className="mt-2 mb-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[16px] border-transparent border-b-yellow-300 drop-shadow-lg z-10" />

            <Button onClick={spin} disabled={spinning} className="w-full max-w-xs py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500">
              {spinning ? "Spinning..." : "SPIN NOW"}
            </Button>

            {result && (
              <div className="mt-2 p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-md">
                <div className="text-sm font-semibold text-center text-white">
                  {result === "Try Again" ? "Try again! 🎯" : `🎉 ${result}`}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            {[ { to: "/buy", labels: ["MVZx","Buy & Earn"], bg: "#16a34a", icon: Coins },
              { to: "/airdrop", labels: ["Airdrop"], bg: "#db2777", icon: Gift },
              { to: "/mining", labels: ["Mining"], bg: "#ca8a04", icon: Cpu },
              { to: "/directbuy", labels: ["Direct","Deposit"], bg: "#2563eb", icon: Building },
              { to: "/escrow", labels: ["Escrow","P2P Trade"], bg: "#4338ca", icon: Handshake },
              { to: "/voting", labels: ["Voting"], bg: "#15803d", icon: Vote } ].map((b,i)=>(
              <Link key={i} to={b.to}>
                <Button className="w-full h-12 flex flex-col justify-center items-center text-[11px] font-semibold leading-tight" style={{ backgroundColor: b.bg }}>
                  <b.icon className="w-4 h-4 mb-1" />
                  {b.labels.map((l,j)=>(<span key={j}>{l}</span>))}
                </Button>
              </Link>
            ))}
          </div>

          <Card className="mt-4 p-3 bg-white/5 border-white/10">
            <div className="flex justify-center items-center gap-3">
              <Button onClick={()=>setMiningActive(!miningActive)} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-[12px] ${miningActive ? "bg-green-600" : "bg-orange-500"}`}>
                {miningActive ? "Stop Mining" : "Start Mining"}
              </Button>
              <span className="font-mono text-xs">{(minedAmount/1000).toFixed(2)}s</span>
            </div>
            {miningActive && <div className="mt-2 w-full bg-gray-700 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: `${(minedAmount/180000)*100}%` }} /></div>}
          </Card>
        </Card>
      </main>

      <footer className="px-4 py-3 text-[11px] text-white/70 text-center">&copy; {new Date().getFullYear()} MAVIZ. All rights reserved.</footer>

      <AuthModal isOpen={isAuthModalOpen} onClose={()=>setIsAuthModalOpen(false)} onSuccess={()=>{
        setUserLoggedIn(true); setDemoWarning(false); loadUserData();
      }} />
    </div>
  );
}
