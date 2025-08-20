import React, { useState } from "react";

const DirectBuy: React.FC = () => {
  const [payerName, setPayerName] = useState("");
  const [receiptTime, setReceiptTime] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ payerName, receiptTime, phone });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">
          🏦 Direct Transfer Buy
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Upload payment details for manual approval.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Payer Full Name"
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
              className="w-full p-3 border rounded-xl"
              required
            />
            <input
              type="text"
              placeholder="Date & Time on Receipt"
              value={receiptTime}
              onChange={(e) => setReceiptTime(e.target.value)}
              className="w-full p-3 border rounded-xl"
              required
            />
            <input
              type="tel"
              placeholder="Nigeria Mobile Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-xl"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl"
            >
              Submit Payment Proof
            </button>
          </form>
        ) : (
          <div className="text-center text-green-700 font-semibold">
            ✅ Submitted for admin review.
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectBuy;
