import React, { useState } from "react";
import { initCardPayment, transferUSDT } from "../lib/api";
import MatrixStatus from "../components/MatrixStatus";

export default function Buy() {
  const [tab, setTab] = useState<"usdt"|"card">("usdt");
  const [userId, setUserId] = useState<string>(() => localStorage.getItem("mvzx_user") || "demo-user");

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Buy MVZx</h1>
      <p className="text-gray-600">1 MVZX = 0.15 USDT = ₦200. Minimum purchase = 1.5 USDT / ₦2,000. Multiples only count for matrix positions.</p>

      <div className="flex gap-2">
        <button className={`tab ${tab==="usdt"?"tab-active":""}`} onClick={()=>setTab("usdt")}>USDT (BEP-20)</button>
        <button className={`tab ${tab==="card"?"tab-active":""}`} onClick={()=>setTab("card")}>Card / Flutterwave</button>
      </div>

      {tab === "usdt" ? <USDTForm userId={userId}/> : <CardForm userId={userId}/>}

      <MatrixStatus userId={userId} />
    </div>
  );
}

function USDTForm({ userId }: { userId: string }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState(""); // platform wallet A shown to user
  const [amountUSDT, setAmountUSDT] = useState<number>(1.5);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setMsg(null);
    if (amountUSDT < 1.5) { setErr("Minimum is 1.5 USDT."); return; }
    try {
      setBusy(true);
      // Backend will verify multiples logic & assign matrix positions
      const r = await transferUSDT({ fromAddress: from, toAddress: to, amountUSDT });
      setMsg(`Transfer submitted. TxId: ${r.txId}. Matrix placement will update shortly.`);
    } catch (e:any) {
      setErr(e.message);
    } finally { setBusy(false); }
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-xl shadow p-5 space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="From (your BEP-20 USDT address)">
          <input className="input" placeholder="0x..." value={from} onChange={e=>setFrom(e.target.value)} />
        </Field>
        <Field label="To (platform wallet A)">
          <input className="input" placeholder="0xPlatformWalletA" value={to} onChange={e=>setTo(e.target.value)} />
        </Field>
        <Field label="Amount (USDT)">
          <input type="number" min={1.5} step="0.75" className="input" value={amountUSDT} onChange={e=>setAmountUSDT(parseFloat(e.target.value || "0"))}/>
          <p className="text-xs text-gray-500 mt-1">Multiples of 1.5 USDT recommended for matrix positions.</p>
        </Field>
      </div>

      {err && <div className="p-3 bg-red-100 text-red-700 rounded">{err}</div>}
      {msg && <div className="p-3 bg-green-100 text-green-700 rounded">{msg}</div>}

      <button disabled={busy} className={`px-5 py-2 rounded text-white ${busy ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}>
        {busy ? "Processing…" : "Send USDT & Credit MVZx"}
      </button>
    </form>
  );
}

function CardForm({ userId }: { userId: string }) {
  const [amountNGN, setAmountNGN] = useState(2000);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const init = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (amountNGN < 2000 || amountNGN % 2000 !== 0) {
      setErr("Amount must be ₦2,000 or a multiple of ₦2,000.");
      return;
    }
    try {
      setBusy(true);
      const { checkoutUrl } = await initCardPayment({ userId, amountNGN, email, phone });
      window.location.href = checkoutUrl; // redirect to Flutterwave
    } catch (e:any) {
      setErr(e.message);
      setBusy(false);
    }
  };

  return (
    <form onSubmit={init} className="bg-white rounded-xl shadow p-5 space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <Field label="Amount (NGN)">
          <input type="number" min={2000} step={2000} className="input" value={amountNGN} onChange={e=>setAmountNGN(parseInt(e.target.value || "0",10))}/>
        </Field>
        <Field label="Email">
          <input type="email" className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        </Field>
        <Field label="Phone (+234…)">
          <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} />
        </Field>
      </div>
      {err && <div className="p-3 bg-red-100 text-red-700 rounded">{err}</div>}
      <button disabled={busy} className={`px-5 py-2 rounded text-white ${busy ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}>
        {busy ? "Redirecting…" : "Pay with Card (Flutterwave)"}
      </button>
    </form>
  );
}

function Field({label, children}:{label:string;children:React.ReactNode}) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      {children}
    </div>
  );
}
