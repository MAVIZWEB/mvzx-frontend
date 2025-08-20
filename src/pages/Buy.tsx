 import React, { useState } from "react";

const Buy: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("USDT");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend or payment API
    console.log("Buying MVZx:", { amount, method });
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          💰 MVZx Buy & Earn
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Purchase MVZx tokens and start earning instantly.
        </p>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              placeholder="Enter Amount (USD or NGN)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border rounded-xl"
              required
            />
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full p-3 border rounded-xl"
            >
              <option value="USDT">USDT (Crypto)</option>
              <option value="Naira">Naira (Flutterwave)</option>
              <option value="Manual">Manual Deposit</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700"
            >
              Buy MVZx
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-semibold text-green-700 mb-2">
              ✅ Purchase Request Submitted!
            </h2>
            <p className="text-gray-600">
              You will receive payment instructions shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buy;
