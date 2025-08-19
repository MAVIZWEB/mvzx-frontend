 import React, { useState } from "react";
import MatrixStatus from "../components/MatrixStatus";

// This is a UI starter. Backend endpoints can be added later for creating and releasing escrows.
export default function Escrow() {
  const [userId, setUserId] = useState<string>(() => localStorage.getItem("mvzx_user") || "demo-user");
  const [orderType, setOrderType] = useState<"buy"|"sell">("buy");
  const [amountMVZX, setAmountMVZX] = useState<number>(10);
  const [pricePerMVZX, setPricePerMVZX] = useState<number>(200); // NGN
  const [counterparty, setCounterparty] = useState("");
  const [note, setNote] = useState("");

  const createEscrow = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`(Mock) Created ${orderType.toUpperCase()} escrow: ${amountMVZX} MVZx @ ₦${pricePerMVZX} with ${counterparty}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Escrow Trade</h1>
      <p className="text-gray-600">Secure P2P trades for MVZx with blockchain settlement after both sides confirm.</p>

      <form onSubmit={createEscrow} className="bg-white rounded-xl shadow p-5 space-y-4">
        <div className="flex gap-3">
          <button type="button" className={`tab ${orderType==="buy"?"tab-active":""}`} onClick={()=>setOrderType("buy")}>Buy</button>
          <button type="button" className={`tab ${orderType==="sell"?"tab-active":""}`} onClick={()=>setOrderType("sell")}>Sell</button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Amount (MVZx)">
            <input type="number" className="input" min={1} step="1" value={amountMVZX} onChange={e=>setAmountMVZX(parseFloat(e.target.value||"0"))} />
          </Field>
          <Field label="Price per MVZx (NGN)">
            <input type="number" className="input" min={1} step="1" value={pricePerMVZX} onChange={e=>setPricePerMVZX(parseFloat(e.target.value||"0"))} />
          </Field>
          <Field label="Counterparty Wallet / Username">
            <input className="input" value={counterparty} onChange={e=>setCounterparty(e.target.value)} />
          </Field>
        </div>

        <div>
          <label className="text-sm text-gray-600">Note</label>
          <textarea className="input" rows={3} value={note} onChange={e=>setNote(e.target.value)} />
        </div>

        <button className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded">Create Escrow (Mock)</button>
      </form>

      <MatrixStatus userId={userId} />
    </div>
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
