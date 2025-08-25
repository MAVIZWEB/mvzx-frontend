 import { useState } from "react";
import toast from "react-hot-toast";

export default function DirectTransferBuy() {
  const [form, setForm] = useState({
    amount: "",
    wallet: "",
    bankReference: "",
    receiptUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/direct-transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Transfer request submitted! Awaiting admin approval.");
        setForm({ amount: "", wallet: "", bankReference: "", receiptUrl: "" });
      } else {
        toast.error("Failed to submit transfer request");
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
        <h2 className="text-2xl font-bold text-center mb-6">Direct Transfer Buy</h2>

        <input
          type="number"
          name="amount"
          placeholder="Enter amount sent"
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

        <input
          type="text"
          name="bankReference"
          placeholder="Bank Transfer Reference No."
          value={form.bankReference}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded-lg"
          required
        />

        <input
          type="text"
          name="receiptUrl"
          placeholder="Link to Upload Receipt (e.g. Imgur/Drive)"
          value={form.receiptUrl}
          onChange={handleChange}
          className="w-full mb-6 px-3 py-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Submit for Admin Approval
        </button>
      </form>
    </div>
  );
}
