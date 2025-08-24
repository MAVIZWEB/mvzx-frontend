 import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Coins, Bank, AlertCircle } from "lucide-react";
import { api } from "../services/api";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";

const MIN_USDT = 1.5;
const MIN_NGN = 2000;

export default function Buy() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: MIN_USDT,
    currency: "USDT" as "USDT" | "NGN",
    method: "USDT" as "USDT" | "FLW" | "MANUAL"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quote, setQuote] = useState<any>(null);

  useEffect(() => {
    if (formData.amount >= (formData.currency === "USDT" ? MIN_USDT : MIN_NGN)) {
      fetchQuote();
    }
  }, [formData.amount, formData.currency]);

  const fetchQuote = async () => {
    try {
      const quoteData = await api.getQuote(formData.amount, formData.currency);
      setQuote(quoteData);
    } catch (err) {
      console.error("Failed to fetch quote:", err);
    }
  };

  const positionsFrom = (amount: number, currency: "USDT" | "NGN") => {
    const unit = currency === "USDT" ? MIN_USDT : MIN_NGN;
    return Math.max(1, Math.floor(amount / unit));
  };

  const positions = positionsFrom(formData.amount, formData.currency);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const minAmount = formData.currency === "USDT" ? MIN_USDT : MIN_NGN;
      if (formData.amount < minAmount) {
        throw new Error(`Minimum amount is ${minAmount} ${formData.currency}`);
      }

      const res = await api.createOrder(formData.method, formData.amount, formData.currency);
      
      if (res?.redirectUrl) {
        window.location.href = res.redirectUrl;
      } else if (res?.depositAddress) {
        alert(`Please send ${formData.amount} ${formData.currency} to: ${res.depositAddress}`);
        navigate("/dashboard");
      } else if (res?.status === "paid") {
        alert(`Payment successful! ${positions} matrix positions assigned.`);
        navigate("/dashboard");
      } else {
        setError("Unexpected response from server");
      }
    } catch (err: any) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const min = formData.currency === "USDT" ? MIN_USDT : MIN_NGN;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-red-900 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white/70 hover:text-white mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <Card className="p-6">
          <h1 className="text-2xl font-bold text-white mb-2">💰 Buy MVZx Tokens</h1>
          <p className="text-white/70 mb-6">
            1 MVZX = 0.15 USDT ≈ ₦200. Minimum: {min} {formData.currency}. Only multiples create matrix positions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields same as before */}
            {/* ... */}
          </form>
        </Card>
      </div>
    </div>
  );
}
