 import { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !pin || !confirmPin) {
      setMessage("All fields are required.");
      return;
    }

    if (pin !== confirmPin) {
      setMessage("PIN and Confirm PIN do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/users/signup", {
        email,
        pin,
      });

      setWalletAddress(res.data.walletAddress); // wallet assigned by backend
      setMessage("Signup successful! Your wallet address is: " + res.data.walletAddress);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block mb-1">4-digit PIN</label>
          <input
            type="password"
            value={pin}
            maxLength={4}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Confirm PIN</label>
          <input
            type="password"
            value={confirmPin}
            maxLength={4}
            onChange={(e) => setConfirmPin(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}

      {walletAddress && (
        <p className="mt-2 text-center text-green-400 font-mono">
          Wallet: {walletAddress}
        </p>
      )}
    </div>
  );
};

export default SignupForm;
