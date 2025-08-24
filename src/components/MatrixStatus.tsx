 import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import Card from "./UI/Card";
import Badge from "./UI/Badge";

const stageBadges: Record<number, { name: string; color: string }> = {
  1: { name: "Bronze", color: "#cd7f32" },
  2: { name: "Silver", color: "#c0c0c0" },
  3: { name: "Gold", color: "#ffd700" },
  4: { name: "Platinum", color: "#e5e4e2" },
  5: { name: "Emerald", color: "#50c878" },
  6: { name: "Ruby", color: "#e0115f" },
  7: { name: "Sapphire", color: "#0f52ba" },
  8: { name: "Diamond", color: "#b9f2ff" },
  9: { name: "Crown", color: "#9932cc" },
  10: { name: "Legend", color: "#ff4500" }
};

export default function MatrixStatus() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.getMatrixStatus()
      .then(data => { if (mounted) setData(data); })
      .catch(() => { if (mounted) setData(null); })
      .finally(() => { if (mounted) setLoading(false); });
    
    return () => { mounted = false; };
  }, []);

  if (loading) return <Card className="p-4">Loading matrix status…</Card>;
  if (!data) return <Card className="p-4 text-red-300">No matrix data</Card>;

  const progress = Math.min(100, Math.max(0, (data.position / 2) * 100));
  const badge = stageBadges[data.stage] || { name: "Bronze", color: "#cd7f32" };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-white">Matrix Progress</h3>
        <Badge style={{ backgroundColor: badge.color }}>{badge.name}</Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="p-2 bg-white/5 rounded text-center">
          <div className="text-xs text-white/60">Stage</div>
          <div className="font-semibold text-white">Stage {data.stage}</div>
        </div>
        <div className="p-2 bg-white/5 rounded text-center">
          <div className="text-xs text-white/60">Position</div>
          <div className="font-semibold text-white">{data.position}/2</div>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-white/60 mb-1">
          <span>Earnings This Stage</span>
          <span>{Number(data.earnings || 0).toFixed(2)} MVZx</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="text-xs text-white/60">
        {data.position === 2 ? (
          <span className="text-green-400">✅ Ready for payout! Next purchase will complete this stage.</span>
        ) : data.position === 1 ? (
          <span className="text-yellow-400">⚠️ 1 more position needed for stage completion</span>
        ) : (
          "Fill 2 positions to complete this stage and receive rewards"
        )}
      </div>
    </Card>
  );
}
