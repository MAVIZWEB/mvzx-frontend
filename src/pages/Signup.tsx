 import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, UserPlus, Wallet as WalletIcon } from "lucide-react";
import { api, setAuth } from "../services/api";
import { generateRealWallet, encryptPrivateKey } from "../services/walletService";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    pin: "",
    confirmPin: ""
  });
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const generateWallet = () => {
    const wallet = generateRealWallet();
    setWalletAddress(wallet.address);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (formData.pin.length !== 4 || !/^\d+$/.test(formData.pin)) {
        throw new Error("PIN must be exactly 4 digits");
      }

      if (formData.pin !== formData.confirmPin) {
        throw new Error("PINs do not match");
      }

      const address = walletAddress || generateRealWallet().address;
      
      // FIXED: Use api.signup instead of api.register
      const res = await api.signup(formData.email, address);
      
      if (res?.token && res?.user) {
        setAuth(res.token);
        localStorage.setItem("mvzx_user", JSON.stringify(res.user));
        localStorage.setItem("mvzx_wallet", address);
        setSuccess("Account created successfully! Redirecting...");
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-red-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/70">Email + 4-digit PIN. Your wallet will be created securely.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Wallet Address
            </label>
            <div className="relative">
              <WalletIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
                placeholder="Optional: Enter existing wallet or generate new"
              />
              <button
                type="button"
                onClick={generateWallet}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs bg-purple-600 hover:bg-purple-700 rounded text-white"
              >
                Generate
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              4-digit PIN
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="password"
                value={formData.pin}
                onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
                placeholder="Enter 4-digit PIN"
                maxLength={4}
                pattern="\d{4}"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Confirm PIN
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="password"
                value={formData.confirmPin}
                onChange={(e) => setFormData({ ...formData, confirmPin: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
                placeholder="Confirm 4-digit PIN"
                maxLength={4}
                pattern="\d{4}"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm">
              {success}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 font-semibold"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="text-center text-sm text-white/70">
            Already have an account?{" "}
            <Link to="/" className="text-purple-300 hover:text-purple-100 underline">
              Sign In
            </Link>
          </div>
        </form>

        <div className="mt-6 p-4 bg-white/5 rounded-lg">
          <div className="flex items-center text-sm text-white/50">
            <WalletIcon className="w-4 h-4 mr-2" />
            <span>Your wallet address will be generated and stored securely</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
