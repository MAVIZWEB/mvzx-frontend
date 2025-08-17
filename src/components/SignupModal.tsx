import React, { useState } from "react";
import { signup, login } from "../api";

type Props = { onClose:()=>void; onLoginSuccess:()=>void };

export default function SignupModal({ onClose, onLoginSuccess }: Props) {
  const [mode, setMode] = useState<"signup"|"login">("signup");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  async function handleSignup(e?:React.FormEvent){
    e?.preventDefault();
    setError(null); setLoading(true);
    try {
      const res = await signup(email, wallet, pin);
      if ((res as any).token) {
        localStorage.setItem("maviz_token", (res as any).token);
        onLoginSuccess();
        onClose();
      } else {
        setError((res as any).message || "Signup failed");
      }
    } catch (err:any) {
      setError(err.message || String(err));
    } finally { setLoading(false) }
  }

  async function handleLogin(e?:React.FormEvent){
    e?.preventDefault();
    setError(null); setLoading(true);
    try {
      const res = await login(email, pin);
      if ((res as any).token) {
        localStorage.setItem("maviz_token", (res as any).token);
        onLoginSuccess();
        onClose();
      } else {
        setError((res as any).message || "Login failed");
      }
    } catch (err:any) {
      setError(err.message || String(err));
    } finally { setLoading(false) }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3 style={{margin:0}}>{mode==="signup"?"Create account":"Sign in"}</h3>
        <p className="small" style={{marginTop:6}}>{mode==="signup"?"Signup with email, wallet and a 4-digit PIN":"Login with email and PIN"}</p>
        <form onSubmit={mode==="signup"?handleSignup:handleLogin}>
          <div className="form-row">
            <label className="small">Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          {mode==="signup" && (
            <div className="form-row">
              <label className="small">Wallet Address (0x...)</label>
              <input className="input" value={wallet} onChange={e=>setWallet(e.target.value)} placeholder="0x..." />
            </div>
          )}
          <div className="form-row">
            <label className="small">4-digit PIN</label>
            <input className="input" value={pin} onChange={e=>setPin(e.target.value)} placeholder="1234" />
          </div>

          {error && <div style={{color:"crimson",marginBottom:8}}>{error}</div>}

          <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Please wait..." : (mode==="signup"?"Create account":"Sign in")}
            </button>
          </div>
        </form>

        <div style={{marginTop:10, fontSize:13}}>
          {mode==="signup" ? (
            <span>Already have an account? <button onClick={()=>setMode("login")} style={{color:"#2563eb",background:"none",border:"none",cursor:"pointer"}}>Sign in</button></span>
          ) : (
            <span>Need new account? <button onClick={()=>setMode("signup")} style={{color:"#2563eb",background:"none",border:"none",cursor:"pointer"}}>Create</button></span>
          )}
        </div>
      </div>
    </div>
  );
}
