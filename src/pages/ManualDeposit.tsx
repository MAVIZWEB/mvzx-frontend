 import React, { useState } from "react";
import { submitManualDeposit } from "../lib/api";
import MatrixStatus from "../components/MatrixStatus";

export default function ManualDeposit() {
  const [userId, setUserId] = useState<string>(() => localStorage.getItem("mvzx_user") || "demo-user");
  const [walletAddress, setWalletAddress] = useState("");
  const [amountNGN, setAmountNGN] = useState<number>(2000);
  const [receiptDate, setReceiptDate] = useState("");
  const [receiptTime, setReceiptTime] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [result, setResult] = useState<{ticketId:string;status:string} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (amountNGN < 2000 || amountNGN % 2000 !== 0) {
      setError("Amount must be N2,000 or a multiple of N2,000.");
      return;
    }
    if (!walletAddress.startsWith("0x") || walletAddress.length < 10) {
      setError("Enter a valid BNB Chain (BEP-20) address starting with 0x.");
      return;
    }

    try {
      setBusy(true);
      const r = await submitManualDeposit({
        userId, walletAddress, amountNGN, receiptDate, receiptTime, phone, note,
      });
      setResult(r);
    } catch (e:any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Manual Bank Deposit</h1>
        <p className="text-gray-600 mt-1">
          Pay to: <strong>Masses 1026664654 UBA</strong>. Fill details below. Admin will verify and the system
          credits your MVZx to the wallet you provide.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={submit} className="bg-white rounded-xl shadow p-5 space-y-4">
          <div>
            <label className="text-sm text-gray-600">User ID</label>
            <input className="input" value={userId} onChange={e=>setUserId(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-gray-600">Wallet Address (BEP-20)</label>
            <input className="input" value={walletAddress} onChange={e=>setWalletAddress(e.target.value)} placeholder="0x..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Amount (NGN)</label>
              <input type="number" className="input" value={amountNGN} min={2000} step={2000}
                     onChange={e=>setAmountNGN(parseInt(e.target.value || "0",10))}/>
              <p className="text-xs text-gray-500">Multiples of ₦2,000 only (matrix positions).</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input className="input" placeholder="+234..." value={phone} onChange={e=>setPhone(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Date on receipt</label>
              <input type="date" className="input" value={receiptDate} onChange={e=>setReceiptDate(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Time on receipt</label>
              <input type="time" className="input" value={receiptTime} onChange={e=>setReceiptTime(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Note (optional)</label>
            <textarea className="input" rows={3} value={note} onChange={e=>setNote(e.target.value)} />
          </div>

          {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}
          {result && (
            <div className="p-3 bg-green-100 text-green-700 rounded">
              Ticket <b>{result.ticketId}</b> submitted ({result.status}). You’ll be credited after admin approval.
            </div>
          )}

          <button disabled={busy} className={`px-5 py-2 rounded text-white ${busy ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}>
            {busy ? "Submitting..." : "Submit Deposit Ticket"}
          </button>
        </form>

        {/* Live matrix progress */}
        <div>
          <MatrixStatus userId={userId} />
        </div>
      </div>
    </div>
  );
}

/* Tailwind helper (optional in your global CSS):
.input { @apply w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500;}
*/
