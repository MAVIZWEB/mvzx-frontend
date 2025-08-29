 // frontend/src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { getMatrix, getLocalUser } from "../services/api";

export default function Dashboard() {
  const [matrix, setMatrix] = useState<any[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const user = getLocalUser();
  const userId = user?.id;

  useEffect(() => {
    async function load() {
      if (!userId) {
        setMessage("Not logged in");
        return;
      }
      try {
        const res = await getMatrix(Number(userId));
        setMatrix(res.data.matrix || []);
      } catch (e: any) {
        setMessage("Failed to load matrix: " + (e?.response?.data?.error || e.message));
      }
    }
    load();
  }, [userId]);

  const storedBalance = Number(localStorage.getItem("mvzx_balance") || 0);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold">Account</h2>
        <p className="mt-2">Wallet: <span className="font-mono">{user?.wallet ?? "—"}</span></p>
        <p>Referral code: <span className="font-mono">{user?.referralCode ?? "—"}</span></p>
        <p className="mt-2">Balance (mirror): <strong>{storedBalance}</strong> MVZx</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold">Matrix</h2>
        {matrix.length === 0 && <p className="text-sm text-gray-500 mt-2">No matrix records found.</p>}
        {matrix.map((m) => (
          <div key={m.id} className="border p-3 rounded mt-3">
            <div>Stage <strong>{m.stage}</strong> — Legs: {m.legsFilled}</div>
            <div>Credited: {m.creditedNGN} NGN — Pending: {m.pendingNGN} NGN — Completed: {m.completed ? "Yes" : "No"}</div>
          </div>
        ))}
        {message && <p className="mt-3 text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
}
