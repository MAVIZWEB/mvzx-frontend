 import React, { useState } from "react";
import { api } from "../services/api";

const DirectBuy: React.FC = () => {
  const [payerName, setPayerName] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [receiptTime, setReceiptTime] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState<number>(2000);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg(null);
    try {
      await api.manualDeposit({ payerName, receiptDate, receiptTime, phone, amount, currency: "NGN" });
      setMsg("✅ Submitted. Admin will verify and credit MVZx + matrix positions.");
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex justify-center p-6 bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">🏦 Direct Transfer Buy</h1>
        <p className="text-gray-600 mb-4">
          Pay to: <b>Masses • UBA • 1026664654</b> — then submit details below.
        </p>
        <form onSubmit={submit} className="grid gap-4">
          <input className="border rounded-xl p-3" placeholder="Payer Full Name"
                 value={payerName} onChange={e=>setPayerName(e.target.value)} required />
          <input className="border rounded-xl p-3" type="date"
                 value={receiptDate} onChange={e=>setReceiptDate(e.target.value)} required />
          <input className="border rounded-xl p-3" type="time"
                 value={receiptTime} onChange={e=>setReceiptTime(e.target.value)} required />
          <input className="border rounded-xl p-3" type="tel" placeholder="Nigeria Mobile (e.g., 080...)"
                 value={phone} onChange={e=>setPhone(e.target.value)} required />
          <input className="border rounded-xl p-3" type="number" min={2000} step={100}
                 value={amount} onChange={e=>setAmount(Number(e.target.value))} required />
          <button disabled={loading}
                  className={`w-full rounded-xl text-white py-3 ${loading?"bg-gray-400":"bg-blue-600 hover:bg-blue-700"}`}>
            {loading ? "Submitting..." : "Submit Payment Proof"}
          </button>
        </form>
        {msg && <p className="mt-4">{msg}</p>}
      </div>
    </div>
  );
};

export default DirectBuy;
