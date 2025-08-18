import React, { useState } from "react";
import { Link } from "react-router-dom";

type User = { wallet: string; email?: string; pin: string } | null;

export default function Buy() {
  const [user, setUser] = useState<User>(() => {
    const raw = localStorage.getItem("mvzx_user");
    return raw ? JSON.parse(raw) : null;
  });

  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const [amount, setAmount] = useState<number>(2000); // Naira default for stage1 example
  const [currency, setCurrency] = useState<"NGN" | "USDT">("NGN");
  const [bankRef, setBankRef] = useState("");
  const [bankName, setBankName] = useState("");
  const [depositor, setDepositor] = useState("");

  function requireSignup(next: () => void) {
    if (!user) {
      setShowSignupPrompt(true);
      return;
    }
    next();
  }

  async function startCardCheckout() {
    requireSignup(async () => {
      // placeholder API call to backend to create checkout session
      const api = import.meta.env.VITE_API_BASE_URL || "";
      try {
        const res = await fetch(`${api}/api/payments/checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, currency, wallet: user!.wallet, email: user!.email }),
        });
        const j = await res.json();
        alert("Checkout initiated (placeholder). Backend response: " + (j.message || JSON.stringify(j)));
      } catch (err) {
        console.error(err);
        alert("Checkout failed (placeholder). See console.");
      }
    });
  }

  async function submitManualDeposit(e: React.FormEvent) {
    e.preventDefault();
    requireSignup(async () => {
      const api = import.meta.env.VITE_API_BASE_URL || "";
      try {
        const payload = { amount, currency, bankName, depositor, bankRef, wallet: user!.wallet, email: user!.email };
        const res = await fetch(`${api}/api/deposits/manual`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const j = await res.json();
        alert("Deposit submitted. Admin will review. Response: " + (j.message || JSON.stringify(j)));
      } catch (err) {
        console.error(err);
        alert("Deposit submit failed (placeholder).");
      }
    });
  }

  function onSaveSignup(data: any) {
    localStorage.setItem("mvzx_user", JSON.stringify(data));
    setUser(data);
    setShowSignupPrompt(false);
    alert("Signup saved locally.");
  }

  return (
    <div className="min-h-screen flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-3xl space-y-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold">Buy MVZx</h2>
          <p className="text-sm text-gray-600 mb-4">Choose to buy via Card/USDT checkout or submit a manual bank deposit for admin approval.</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded">
              <h3 className="font-semibold">Card / USDT Checkout</h3>
              <div className="mt-3">
                <label className="block text-sm mb-1">Amount</label>
                <input type="number" className="w-full border rounded px-3 py-2 mb-2" value={amount} onChange={e => setAmount(Number(e.target.value))} />
                <label className="block text-sm mb-1">Currency</label>
                <select className="w-full border rounded px-3 py-2 mb-2" value={currency} onChange={e => setCurrency(e.target.value as any)}>
                  <option value="NGN">NGN</option>
                  <option value="USDT">USDT</option>
                </select>
                <button onClick={startCardCheckout} className="w-full bg-yellow-600 text-white py-2 rounded">Proceed to Checkout</button>
              </div>
            </div>

            <div className="p-4 border rounded">
              <h3 className="font-semibold">Manual Bank Deposit (Admin Approval)</h3>
              <form onSubmit={submitManualDeposit} className="mt-3">
                <label className="block text-sm mb-1">Depositor Name</label>
                <input className="w-full border rounded px-3 py-2 mb-2" value={depositor} onChange={e => setDepositor(e.target.value)} />
                <label className="block text-sm mb-1">Bank Name</label>
                <input className="w-full border rounded px-3 py-2 mb-2" value={bankName} onChange={e => setBankName(e.target.value)} />
                <label className="block text-sm mb-1">Bank Reference</label>
                <input className="w-full border rounded px-3 py-2 mb-3" value={bankRef} onChange={e => setBankRef(e.target.value)} />
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Submit Deposit</button>
              </form>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold">Account</h3>
          <div className="mt-3">
            {user ? (
              <div className="text-sm text-gray-700">
                <div>Wallet: <code>{user.wallet}</code></div>
                <div>Email: {user.email || "—"}</div>
                <div className="mt-2">
                  <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => { localStorage.removeItem("mvzx_user"); setUser(null); alert("Signed out locally."); }}>
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-sm">
                Not signed up. <button className="text-blue-600 underline" onClick={() => setShowSignupPrompt(true)}>Quick signup</button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="text-blue-600 hover:underline">Back Home</Link>
        </div>
      </div>

      {showSignupPrompt && (
        <SignupModal onSave={onSaveSignup} onClose={() => setShowSignupPrompt(false)} />
      )}
    </div>
  );
}

function SignupModal({ onSave, onClose }: { onSave: (d: any) => void; onClose: () => void }) {
  const [wallet, setWallet] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white p-5 rounded w-full max-w-md">
        <h3 className="font-semibold mb-3">Quick Signup</h3>
        <label className="block text-sm">Wallet Address</label>
        <input className="w-full border rounded px-3 py-2 mb-2" value={wallet} onChange={e => setWallet(e.target.value)} placeholder="0x..." />
        <label className="block text-sm">Email</label>
        <input className="w-full border rounded px-3 py-2 mb-2" value={email} onChange={e => setEmail(e.target.value)} />
        <label className="block text-sm">4-digit PIN</label>
        <input className="w-full border rounded px-3 py-2 mb-3" maxLength={4} value={pin} onChange={e => setPin(e.target.value)} />
        <div className="flex gap-3">
          <button className="flex-1 bg-green-600 text-white py-2 rounded" onClick={() => { if (!wallet || pin.length !== 4) { alert("Provide wallet and 4-digit PIN"); return; } onSave({ wallet, email, pin }); }}>
            Save & Continue
          </button>
          <button className="flex-1 border rounded py-2" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
