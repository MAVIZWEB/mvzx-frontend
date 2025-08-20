import React, { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

type Method = "USDT" | "FLW" | "MANUAL";
type Curr = "USDT" | "NGN";

const MIN_USDT = 1.5;   // 1 position
const MIN_NGN  = 2000;

function positionsFrom(amount: number, currency: Curr) {
  const unit = currency === "USDT" ? MIN_USDT : MIN_NGN;
  return Math.floor(amount / unit); // only multiples create positions
}

const Buy: React.FC = () => {
  const [method, setMethod] = useState<Method>("USDT");
  const [currency, setCurrency] = useState<Curr>("USDT");
  const [amount, setAmount] = useState<number>(3); // default 2 positions
  const [quote, setQuote] = useState<any>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const positions = useMemo(() => positionsFrom(amount, currency), [amount, currency]);

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const q = await api.quote(amount, currency);
        if (ok) setQuote(q);
      } catch { /* ignore preview errors */ }
    })();
    return () => { ok = false; };
  }, [amount, currency]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setStatus(null);
    try {
      const res = await api.createOrder({ method, amount, currency });
      setStatus(`✅ Order created. ${positions} matrix position(s) reserved.`);
      if (res?.redirectUrl) window.location.href = res.redirectUrl; // e.g., Flutterwave checkout
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    } finally { setLoading(false); }
  };

  const min = currency === "USDT" ? MIN_USDT : MIN_NGN;

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">💰 MVZx Buy & Earn</h1>
        <p className="text-gray-600 mb-6">
          1 MVZX = 0.15 USDT ≈ ₦200. Minimum per purchase: 1.5 USDT / ₦2000.
          Only multiples create matrix positions. Extra amount still credits tokens.
        </p>

        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="block text-sm font-semibold">Payment Method</label>
            <select className="w-full border rounded-xl p-3" value={method}
                    onChange={(e)=>setMethod(e.target.value as Method)}>
              <option value="USDT">USDT (BEP-20)</option>
              <option value="FLW">Flutterwave (NGN)</option>
              <option value="MANUAL">Manual Bank Deposit</option>
            </select>

            <label className="block text-sm font-semibold">Currency</label>
            <select className="w-full border rounded-xl p-3" value={currency}
                    onChange={(e)=>setCurrency(e.target.value as Curr)}>
              <option value="USDT">USDT</option>
              <option value="NGN">NGN</option>
            </select>

            <label className="block text-sm font-semibold">
              Amount ({currency}) — minimum {min}
            </label>
            <input type="number" min={min} step={currency==="USDT" ? 0.01 : 100}
                   value={amount} onChange={(e)=>setAmount(Number(e.target.value))}
                   className="w-full border rounded-xl p-3" required />

            <div className="p-3 bg-gray-50 rounded-xl text-sm">
              <div>Positions from this order: <b>{positions}</b></div>
              {quote && (
                <>
                  <div>Token credit: <b>{quote.tokens} MVZX</b></div>
                  <div>Matrix computed base (50%): <b>{quote.matrixBase}</b></div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-blue-50">
              <h3 className="font-semibold mb-2">Matrix Highlights</h3>
              <ul className="list-disc ml-5 text-sm">
                <li>2×5 binary; auto-place extra positions under your first.</li>
                <li>JB 10% of computed base, MC 16.2% per leg, NSP 5% per leg.</li>
                <li>Auto-advance when stage legs fill (62 per stage).</li>
              </ul>
            </div>

            <button disabled={loading}
                    className={`w-full rounded-xl text-white py-3 ${loading?"bg-gray-400":"bg-green-600 hover:bg-green-700"}`}>
              {loading ? "Processing..." : "Proceed to Pay"}
            </button>

            {method === "MANUAL" && (
              <div className="text-xs text-gray-600">
                Bank: <b>UBA</b> — Name: <b>Masses</b> — Acct: <b>1026664654</b><br/>
                After transfer, go to <b>Direct Transfer Buy</b> to submit details.
              </div>
            )}
          </div>
        </form>

        {status && <p className="mt-4">{status}</p>}
      </div>
    </div>
  );
};

export default Buy;
