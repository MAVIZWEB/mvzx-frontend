 // src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Wallet, Trophy, Crown, LogOut, BarChart3 } from "lucide-react";
import { api, loadAuth } from "../services/api";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [wallet, setWallet] = useState<any[]>([]);
  const [matrix, setMatrix] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuth();
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [walletRes, matrixRes] = await Promise.all([
        api.wallet(),
        api.matrixStatus()
      ]);
      
      if (walletRes?.balances) setWallet(walletRes.balances);
      if (matrixRes) setMatrix(matrixRes);
      
      // Get user info from localStorage or make API call
      const userData = localStorage.getItem("mvzx_user");
      if (userData) setUser(JSON.parse(userData));
      
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("mvzx_jwt");
    localStorage.removeItem("mvzx_user");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-red-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-red-900 text-white p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">MAVIZ Dashboard</h1>
        <Button onClick={handleLogout} className="flex items-center gap-2">
          <LogOut size={16} />
          Logout
        </Button>
      </header>

      {/* User Info */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <User size={24} />
            </div>
            <div>
              <h2 className="font-semibold">{user?.email || "User"}</h2>
              <p className="text-sm opacity-75">{user?.wallet ? `${user.wallet.slice(0, 8)}...${user.wallet.slice(-6)}` : "No wallet"}</p>
            </div>
          </div>
          {matrix?.badge && (
            <Badge className="flex items-center gap-1">
              <Crown size={14} />
              {matrix.badge.name}
            </Badge>
          )}
        </div>
      </Card>

      {/* Wallet Balance */}
      <Card className="mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Wallet size={18} />
          Wallet Balance
        </h3>
        <div className="space-y-2">
          {wallet.map((balance, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-white/5 rounded">
              <span>{balance.token}</span>
              <span className="font-bold">{balance.amount.toFixed(2)}</span>
            </div>
          ))}
          {wallet.length === 0 && (
            <p className="text-center opacity-75 py-4">No balances yet</p>
          )}
        </div>
      </Card>

      {/* Matrix Status */}
      {matrix && (
        <Card className="mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <BarChart3 size={18} />
            Affiliate Status
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-3 rounded text-center">
              <div className="text-sm opacity-75">Stage</div>
              <div className="text-xl font-bold">{matrix.stage || 1}</div>
            </div>
            <div className="bg-white/5 p-3 rounded text-center">
              <div className="text-sm opacity-75">Position</div>
              <div className="text-xl font-bold">{matrix.position || 0}</div>
            </div>
            <div className="bg-white/5 p-3 rounded text-center col-span-2">
              <div className="text-sm opacity-75">Earnings</div>
              <div className="text-xl font-bold">{matrix.earnings ? matrix.earnings.toFixed(2) : "0.00"} MVZx</div>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/buy">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Buy MVZx
            </Button>
          </Link>
          <Link to="/escrow">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              P2P Trade
            </Button>
          </Link>
          <Link to="/directbuy">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Bank Deposit
            </Button>
          </Link>
          <Link to="/voting">
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Voting
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
