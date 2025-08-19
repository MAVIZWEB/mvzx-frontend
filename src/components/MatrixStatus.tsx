import React, { useEffect, useMemo, useState } from "react";
import { getMatrixStatus, MatrixStatus } from "../lib/api";

// Constants per your plan
const LEGS_PER_STAGE = 62;            // 2x5 matrix total legs for display
const PER_LEG_PAYOUT = 0.162;         // 16.2% of the computed half (display logic)
const HALF_COMPUTED_NGN = 1000;       // half of N2000 per purchase (or half of 1.5 USDT)

export default function MatrixStatus({ userId }: { userId: string }) {
  const [data, setData] = useState<MatrixStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getMatrixStatus(userId)
      .then((d) => mounted && setData(d))
      .catch((e) => mounted && setErr(e.message))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [userId]);

  // Derived UI metrics
  const legsFilled = useMemo(() => {
    // If backend later returns legs filled, use it directly. For now, derive from earningsSoFar.
    if (!data) return 0;
    const perLegNaira = HALF_COMPUTED_NGN * PER_LEG_PAYOUT; // 1000 * 0.162 = 162 NGN/leg
    const legs = Math.floor((data.earningsSoFar || 0) / perLegNaira);
    return Math.max(0, Math.min(LEGS_PER_STAGE, legs));
  }, [data]);

  const legPayoutNaira = Math.round(HALF_COMPUTED_NGN * PER_LEG_PAYOUT); // 162
  const stageTargetNaira = legPayoutNaira * LEGS_PER_STAGE;              // 10044

  if (loading) return <div className="p-4">Loading matrix status…</div>;
  if (err) return <div className="p-4 text-red-600">Error: {err}</div>;
  if (!data) return null;

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Matrix Progress</h3>
        <div className="text-sm text-gray-500">User: {data.userId}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Stage" value={`Stage ${data.stage}`} />
        <Stat label="Position" value={data.position} />
        <Stat label="Legs Filled" value={`${legsFilled}/${LEGS_PER_STAGE}`} />
        <Stat label="Per-Leg Payout" value={`₦${legPayoutNaira.toLocaleString()}`} />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Earnings So Far" value={`₦${(data.earningsSoFar || 0).toLocaleString()}`} />
        <Card title="Earnings Left" value={`₦${(data.earningsLeft || 0).toLocaleString()}`} />
        <Card title="Stage Target" value={`₦${stageTargetNaira.toLocaleString()}`} />
      </div>

      <div className="mt-5">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${(legsFilled / LEGS_PER_STAGE) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Credit triggers every 6 legs filled. Auto-advance to next stage when all {LEGS_PER_STAGE} legs complete.
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 text-center">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
function Card({ title, value }: { title: string; value: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}
