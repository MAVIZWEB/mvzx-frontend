 import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Wallet, Trophy, Crown, LogOut, BarChart3, RefreshCw, Coins } from "lucide-react";
import { api, loadAuth, clearAuth } from "../services/api";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Badge from "../components/UI/Badge";
import MatrixStatus from "../components/MatrixStatus";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [wallet, setWallet] = useState<any[]>([]);
  const [matrix, setMatrix] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const token = loadAuth();
    if (!token) {
      navigate("/");
      return;
    }
    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      setRefreshing(true);
      const [walletRes, matrixRes] = await Promise.all([
        api.getWallet().catch(() => ({ balances: [] })),
        api.getMatrixStatus().catch(() => null)
      ]);
      
      if (walletRes?.balances) setWallet(walletRes.balances);
      if (matrixRes) setMatrix(matrixRes);
      
      const userData = localStorage.getItem("mvzx_user");
      if (userData) setUser(JSON.parse(userData));
      
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-red-900 flex items-center justify-center">
        <div className="text-white">Loading dashboard...</div>
      </div>
    );
  }

  const mvzxBalance = wallet.find((b: any) => b.token === "MVZx")?.amount || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-red-900 text-white p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">MAVIZ Dashboard</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchUserData}
            disabled={refreshing}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
          <Button onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
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
              <p className="text-sm opacity-75">
                {user?.wallet ? `${user.wallet.slice(0, 8)}...${user.wallet.slice(-6)}` : "No wallet connected"}
              </p>
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
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Wallet size={18} />
            Wallet Balance
          </h3>
          <Link to="/buy">
            <Button className="flex items-center gap-1 text-sm py-1 px-3">
              <Coins size={14} />
              Add Funds
            </Button>
          </Link>
        </div>
        <div className="space-y-2">
          {wallet.map((balance, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="font-medium">{balance.token}</span>
              <span className="font-bold text-lg">{parseFloat(balance.amount).toFixed(2)}</span>
            </div>
          ))}
          {wallet.length === 0 && (
            <div className="text-center py-6">
              <Wallet className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-white/70">No balances yet</p>
              <Link to="/buy">
                <Button className="mt-3 bg-gradient-to-r from-purple-600 to-pink-600">
                  Buy MVZx Tokens
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Card>

      {/* Matrix Status */}
      <MatrixStatus />

      {/* Quick Actions */}
      <Card>
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/buy">
            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              Buy MVZx
            </Button>
          </Link>
          <Link to="/directbuy">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              Bank Deposit
            </Button>
          </Link>
          <Link to="/game">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Spin & Earn
            </Button>
          </Link>
          <Link to="/matrix-tree">
            <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              View Matrix
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
