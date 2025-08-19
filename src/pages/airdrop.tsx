import React, { useState } from "react";

const Airdrop = () => {
  const [wallet, setWallet] = useState("");
  const [name, setName] = useState("");
  const [claimed, setClaimed] = useState(false);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: call API or smart contract here
    setClaimed(true);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🎁 Claim Your Airdrop</h2>
      {claimed ? (
        <div className="p-4 bg-green-100 text-green-800 rounded text-center">
          ✅ Airdrop successfully claimed!
        </div>
      ) : (
        <form onSubmit={handleClaim} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Wallet Address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Full Name / Email"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Claim Airdrop
          </button>
        </form>
      )}
    </div>
  );
};

export default Airdrop;
