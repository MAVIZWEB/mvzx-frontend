import React, { useEffect, useState } from "react";
import SignupModal from "./components/SignupModal";
import { startMining, miningStatus, claimAirdrop, createFlutterwavePayment } from "./api";

const LOGO = "https://i.imgur.com/VbxvCK6.jpeg";
const TELEGRAM = "https://t.me/MAVIZq";

function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem("maviz_token"));
  useEffect(()=> {
    const onStorage = () => setToken(localStorage.getItem("maviz_token"));
    window.addEventListener("storage", onStorage);
    return ()=> window.removeEventListener("storage", onStorage);
  }, []);
  return { token, loggedIn: !!token, refresh: ()=> setToken(localStorage.getItem("maviz_token")) };
}

export default function App(){
  const auth = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [miningOn, setMiningOn] = useState(false);
  const [miningEnd, setMiningEnd] = useState<number|null>(null);
  const [mined, setMined] = useState<number>(0);
  const [claiming, setClaiming] = useState(false);
  const [statusText, setStatusText] = useState("");

  useEffect(()=> {
    let t: any;
    if (miningOn && miningEnd) {
      t = setInterval(() => {
        const now = Date.now();
        if (now >= miningEnd) {
          setMiningOn(false);
          setStatusText("Mining session ended. Start again to continue.");
          clearInterval(t);
        } else {
          // increment optimistic mined display: assume rate 0.001 MVZx/sec => 3.6 MVZx/hr (you can change)
          setMined(prev => +(prev + 0.001).toFixed(6));
        }
      }, 1000);
    }
    return ()=> clearInterval(t);
  }, [miningOn, miningEnd]);

  // sync with backend status on load
  useEffect(()=>{
    if (auth.loggedIn) {
      miningStatus().then((res:any)=>{
        if (res?.active) {
          setMiningOn(true);
          setMiningEnd(res.endsAt ? new Date(res.endsAt).getTime() : Date.now() + 24*3600*1000);
          setMined(res.current || 0);
        }
      }).catch(()=>{/* ignore network errors here */});
    }
  }, [auth.loggedIn]);

  // Helpers
  async function requireAuthOrOpen() {
    if (!auth.loggedIn) {
      setShowModal(true);
      return false;
    }
    return true;
  }

  async function handleMineClick(){
    const ok = await requireAuthOrOpen();
    if (!ok) return;
    // call backend to start mining (or restart)
    try {
      const res:any = await startMining();
      if (res?.endsAt) {
        setMiningOn(true);
        setMiningEnd(new Date(res.endsAt).getTime());
        setMined(res.current || 0);
        setStatusText("Mining active — enjoy your free MVZx!");
      } else {
        // fallback: start 24h locally
        setMiningOn(true);
        setMiningEnd(Date.now() + 24*3600*1000);
        setStatusText("Mining active locally (offline mode)");
      }
    } catch (err:any) {
      alert("Failed to start mining: " + (err.message || String(err)));
    }
  }

  async function handleClaimAirdrop(){
    const ok = await requireAuthOrOpen();
    if (!ok) return;
    setClaiming(true);
    try {
      const res:any = await claimAirdrop();
      if (res?.success) {
        alert("Airdrop claimed! Check your wallet balance.");
      } else {
        alert("Airdrop result: " + (res?.message || "unknown"));
      }
    } catch (err:any) {
      alert("Airdrop failed: " + (err.message || String(err)));
    } finally { setClaiming(false) }
  }

  async function handleBuyNow(){
    const ok = await requireAuthOrOpen();
    if (!ok) return;
    // Redirect to buy page or initiate Flutterwave payment creation
    const amountNGN = 2000; // placeholder; replace with UI input later
    try {
      const res:any = await createFlutterwavePayment(amountNGN);
      if (res?.checkoutUrl) {
        window.location.href = res.checkoutUrl;
      } else {
        alert("Payment endpoint returned no checkout URL. Implement backend /payment/flutterwave.");
      }
    } catch (err:any) {
      alert("Payment error: " + (err.message || String(err)));
    }
  }

  // UI colors for mine button
  const mineBtnClass = miningOn ? "btn-green" : "btn-orange";

  return (
    <div className="container center">
      <img src={LOGO} className="logo" alt="MAVIZ logo" />
      <div className="title">MAVIZ (MVZx)<br/>LIQUIDITY & REVENUE SHARING SYSTEM</div>

      <div style={{height:16}} />

      <div className="card">
        <p className="lead" style={{textAlign:"center"}}>
          ✅ <strong>EARN:</strong> You can Earn up to <span style={{fontWeight:800,color:"#16a34a"}}>N2M</span> in Days Just Buying. That's it.
        </p>
        <p className="lead">
          ✅ <strong>NOTE:</strong> This is a <strong>Community Reward System</strong> for Buyers & Not A Right. The <strong style={{color:"#4f46e5"}}>MVZx Tokens</strong> you Buy is your Right but the Revenue Sharing is Benevolence for Community Building.
        </p>
        <p className="lead">
          ✅ <strong>HOW:</strong> Earn Bonuses as others Buy MAVIZ (MVZx) Tokens because Purchases after yours, using your affiliate link or not, pays you worldwide. First Earning is <strong>N10K (7.5 USDT)</strong>. Early to Buy, Early to Earn.
        </p>

        <div className="cta-row" style={{marginTop:18}}>
          <button className="btn btn-primary" onClick={handleBuyNow}>Buy MVZx Now</button>
          <a className="btn btn-telegram" href={TELEGRAM} target="_blank" rel="noreferrer">Join the Community</a>
          <button className={`btn ${mineBtnClass}`} onClick={handleMineClick}>
            {miningOn ? "Mining: ON" : "Start Free Mining"}
          </button>
          <button className="btn btn-primary" onClick={handleClaimAirdrop} disabled={claiming}>
            {claiming ? "Claiming..." : "Claim Airdrop"}
          </button>
        </div>

        <div style={{marginTop:12, textAlign:"center"}}>
          <div className="small">Mined (optimistic):</div>
          <div className="counter">{mined.toFixed(6)} MVZx</div>
          <div className="small" style={{marginTop:6}}>{statusText || "Click 'Start Free Mining' to begin (24h) — sign up required."}</div>
        </div>
      </div>

      <div className="footer">
        <div>First earning N10K (7.5 USDT). Token symbol: MVZx</div>
      </div>

      {showModal && <SignupModal onClose={()=>setShowModal(false)} onLoginSuccess={()=>{ /* refresh UI */ }} /> }
    </div>
  );
}
