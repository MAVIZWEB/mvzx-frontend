 import { useState } from "react";
import toast from "react-hot-toast";

export default function BuyMVZX() {
  const [form, setForm] = useState({
    amount: "",
    wallet: "",
    paymentMethod: "USDT",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Purchase request submitted!");
        setForm({ amount: "", wallet: "", paymentMethod: "USDT" });
      } else {
        toast.error("Failed to submit purchase");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Buy MVZX</h2>

        <input
          type="number"
          name="amount"
          placeholder="Enter amount to buy"
          value={form.amount}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
          required
        />

        <input
          type="text"
          name="wallet"
          placeholder="Your Wallet Address"
          value={form.wallet}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
          required
        />

        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="w-full mb-6 px-3 py-2 border rounded-lg"
        >
          <option value="USDT">USDT (TRC20)</option>
          <option value="ETH">ETH</option>
          <option value="BTC">BTC</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Submit Purchase
        </button>
      </form>
    </div>
  );
}
