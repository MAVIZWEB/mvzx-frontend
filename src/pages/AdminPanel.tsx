import React, { useEffect, useState } from "react";
import { Check, X, Eye, Download } from "lucide-react";
import { api } from "../services/api";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";

interface DepositRequest {
  id: string;
  userId: string;
  walletAddress: string;
  amountNGN: number;
  receiptDate: string;
  receiptTime: string;
  phone: string;
  note: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  user?: {
    email: string;
    wallet: string;
  };
}

export default function AdminPanel() {
  const [deposits, setDeposits] = useState<DepositRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchDeposits = async () => {
    try {
      const data = await api.getDepositRequests();
      setDeposits(data);
    } catch (err: any) {
      setMessage(err.message || "Failed to load deposits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    try {
      await api.processDeposit(id, action);
      setMessage(`Deposit ${action}d successfully`);
      fetchDeposits();
    } catch (err: any) {
      setMessage(err.message || `Failed to ${action} deposit`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-red-900 flex items-center justify-center">
        <div className="text-white">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-red-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Admin Panel - Manual Deposits</h1>
          <Button onClick={fetchDeposits} variant="outline">
            Refresh
          </Button>
        </div>

        {message && (
          <Card className="p-4 mb-6 bg-blue-500/20 border-blue-500/30">
            <div className="text-blue-300 text-center">{message}</div>
          </Card>
        )}

        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3 text-white/70">User</th>
                  <th className="text-left p-3 text-white/70">Wallet</th>
                  <th className="text-left p-3 text-white/70">Amount</th>
                  <th className="text-left p-3 text-white/70">Date/Time</th>
                  <th className="text-left p-3 text-white/70">Phone</th>
                  <th className="text-left p-3 text-white/70">Status</th>
                  <th className="text-left p-3 text-white/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((deposit) => (
                  <tr key={deposit.id} className="border-b border-white/5">
                    <td className="p-3">
                      <div className="text-white">{deposit.user?.email || deposit.userId}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-white/70 text-sm font-mono">
                        {deposit.walletAddress.slice(0, 8)}...{deposit.walletAddress.slice(-6)}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-white font-semibold">₦{deposit.amountNGN}</div>
                      <div className="text-white/60 text-sm">
                        {(deposit.amountNGN / 2000).toFixed(0)} positions
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-white/70 text-sm">
                        {new Date(deposit.receiptDate).toLocaleDateString()}
                      </div>
                      <div className="text-white/60 text-xs">{deposit.receiptTime}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-white/70">{deposit.phone}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        deposit.status === "approved" ? "bg-green-500/20 text-green-300" :
                        deposit.status === "rejected" ? "bg-red-500/20 text-red-300" :
                        "bg-yellow-500/20 text-yellow-300"
                      }`}>
                        {deposit.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {deposit.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAction(deposit.id, "approve")}
                            className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700"
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleAction(deposit.id, "reject")}
                            className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700"
                          >
                            <X className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {deposits.length === 0 && (
              <div className="text-center py-8 text-white/50">
                <div className="text-lg mb-2">No pending deposits</div>
                <div className="text-sm">All deposits have been processed</div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
