 import React, { useState } from "react";

const Airdrop: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    wallet: "",
    email: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect backend logic here
    console.log("Airdrop claimed:", form);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          🎁 Claim Your MVZx Airdrop
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Fill the form below to instantly claim your free MVZx Tokens.
        </p>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
            <input
              type="text"
              name="wallet"
              placeholder="Wallet Address"
              value={form.wallet}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email (or Phone)"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl shadow-md hover:bg-green-700"
            >
              Claim Airdrop
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-semibold text-green-700 mb-2">
              ✅ Airdrop Claimed Successfully!
            </h2>
            <p className="text-gray-600">
              Your MVZx tokens will be credited shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Airdrop;
