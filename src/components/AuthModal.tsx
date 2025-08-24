import React, { useState } from "react";
import { X, Mail, Lock, UserPlus, LogIn, Wallet as WalletIcon } from "lucide-react";
import { api, setAuth } from "../services/api";
import { generateRealWallet, encryptPrivateKey } from "../services/walletService";
import Button from "./UI/Button";
import Card from "./UI/Card";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    wallet: "",
    pin: "",
    confirmPin: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const generateWallet = () => {
    const wallet = generateRealWallet();
    setFormData({ ...formData, wallet: wallet.address });
  };

  const resetForm = () => {
    setFormData({ email: "", wallet: "", pin: "", confirmPin: "" });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isLogin) {
        // Login logic
        const res = await api.login(formData.email, formData.wallet);
        if (res?.token && res?.user) {
          setAuth(res.token);
          localStorage.setItem("mvzx_user", JSON.stringify(res.user));
          localStorage.setItem("mvzx_wallet", formData.wallet);
          setSuccess("Login successful!");
          setTimeout(() => {
            onSuccess();
            onClose();
            resetForm();
          }, 1000);
        }
      } else {
        // Signup logic
        if (formData.pin.length !== 4 || !/^\d+$/.test(formData.pin)) {
          throw new Error("PIN must be exactly 4 digits");
        }

        if (formData.pin !== formData.confirmPin) {
          throw new Error("PINs do not match");
        }

        const walletAddress = formData.wallet || generateRealWallet().address;
        const res = await api.register(formData.email, walletAddress);
        
        if (res?.token && res?.user) {
          setAuth(res.token);
          localStorage.setItem("mvzx_user", JSON.stringify(res.user));
          localStorage.setItem("mvzx_wallet", walletAddress);
          setSuccess("Account created successfully!");
          setTimeout(() => {
            onSuccess();
            onClose();
            resetForm();
          }, 1500);
        }
      }
    } catch (err: any) {
      setError(err.message || `${isLogin ? "Login" : "Signup"} failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            {isLogin ? (
              <LogIn className="w-8 h-8 text-white" />
            ) : (
              <UserPlus className="w-8 h-8 text-white" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {isLogin ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-white/70">
            {isLogin ? "Enter your email and wallet address" : "Email + 4-digit PIN. Wallet will be created securely."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                value={formData.wallet}
                onChange={(e) => setFormData({ ...formData, wallet: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
                placeholder={isLogin ? "Enter your wallet address" : "Optional: Enter existing wallet or we'll create one"}
                required={isLogin}
              />
              {!isLogin && (
                <button
                  type="button"
                  onClick={generateWallet}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs bg-purple-600 hover:bg-purple-700 rounded text-white"
                >
                  Generate
                </button>
              )}
            </div>
          </div>

          {!isLogin && (
            <>
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
            </>
          )}

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
                {isLogin ? "Signing In..." : "Creating Account..."}
              </div>
            ) : (
              isLogin ? "Sign In" : "Create Account"
            )}
          </Button>

          <div className="text-center text-sm text-white/70">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                resetForm();
              }}
              className="text-purple-300 hover:text-purple-100 underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
