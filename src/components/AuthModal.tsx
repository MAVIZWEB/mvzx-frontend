 // src/components/AuthModal.tsx
import React, { useState } from "react";
import { api } from "../services/api";
import Button from "./UI/Button";
import Card from "./UI/Card";

type Props = {
  isOpen: boolean;
  onClose: ()=>void;
  onSuccess?: ()=>void;
};

export default function AuthModal({ isOpen, onClose, onSuccess }: Props) {
  const [mode, setMode] = useState<"signup"|"login">("signup");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string|null>(null);

  if (!isOpen) return null;

  const submit = async (e?:React.FormEvent) => {
    e?.preventDefault();
    setLoading(true); setMsg(null);
    try {
      if (mode === "signup") {
        const res = await api.signup(email, pin, wallet);
        if (res?.token) {
          setMsg("Account created ✓");
          onSuccess?.();
          onClose();
        } else {
          setMsg("Signup successful (no token returned)");
        }
      } else {
        const res = await api.login(email, pin, wallet);
        if (res?.token) {
          setMsg("Logged in ✓");
          onSuccess?.();
          onClose();
        } else {
          setMsg("Login OK");
        }
      }
    } catch (err:any) {
      setMsg(err.message || "Auth error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <Card className="max-w-md w-full p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold">{mode === "signup" ? "Create Account" : "Sign In"}</h3>
          <button onClick={onClose} className="text-sm">Close</button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-xs">Email</label>
            <input className="w-full border rounded p-2" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs">4-digit PIN</label>
            <input type="password" maxLength={4} className="w-full border rounded p-2" value={pin} onChange={e=>setPin(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs">Wallet address (0x... optional)</label>
            <input className="w-full border rounded p-2" value={wallet} onChange={e=>setWallet(e.target.value)} placeholder="0x..." />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={loading}>{loading? "Please wait..." : (mode==="signup"?"Create":"Sign In")}</Button>
            <button type="button" className="px-3 py-2 rounded bg-gray-200" onClick={()=>setMode(mode==="signup"?"login":"signup")}>
              {mode==="signup" ? "Switch to Sign In" : "Switch to Sign Up"}
            </button>
          </div>
          {msg && <div className="text-sm text-red-600">{msg}</div>}
        </form>
      </Card>
    </div>
  );
}
