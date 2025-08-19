// src/pages/Airdrop.tsx
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Airdrop: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const handleClaim = async () => {
    if (loading || claimed) return;
    setLoading(true);

    try {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setClaimed(true);
      toast.success("🎁 Airdrop claimed! MVZx credited to your wallet.");
    } catch (err) {
      toast.error("Failed to claim airdrop. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">🎁 MVZx Airdrop</h2>
      <p className="text-gray-600">
        Get free MVZx tokens instantly!  
        Connect your wallet and click claim to receive your airdrop.
      </p>

      <div className="p-6 border rounded-xl bg-gradient-to-r from-green-50 to-green-100 shadow">
        {claimed ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-green-700">✅ You’ve claimed your airdrop!</p>
            <p className="text-gray-600 mt-2">Check your balance in the dashboard.</p>
          </div>
        ) : (
          <button
            onClick={handleClaim}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-bold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Claiming..." : "Claim Airdrop"}
          </button>
        )}
      </div>

      <div className="text-sm text-gray-500">
        * Limited to one claim per wallet.  
        * Rewards credited instantly to your account.
      </div>
    </div>
  );
};

export default Airdrop;
