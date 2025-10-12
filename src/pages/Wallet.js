import React, { useEffect, useState } from "react";
import { fetchWallet, createWallet } from "../api";

function Wallet() {
  const token = localStorage.getItem("token");
  const [wallet, setWallet] = useState(null);
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const res = await fetchWallet(token);
        setWallet(res);
      } catch (err) {
        setWallet(null);
      }
    };
    loadWallet();
  }, [token]);

  const handleCreateWallet = async (e) => {
    e.preventDefault();
    if (pin.length !== 4) return setMessage("❌ PIN must be 4 digits");
    try {
      const res = await createWallet(pin, token);
      setMessage("✅ Wallet created!");
      setWallet(res.wallet);
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="wallet-container">
      <h2>My Wallet</h2>
      {wallet ? (
        <div>
          <p>Wallet Address: <b>{wallet.address}</b></p>
          <p>Balance: {wallet.balance} MVZx</p>
        </div>
      ) : (
        <form onSubmit={handleCreateWallet}>
          <input type="number" placeholder="Enter 4-digit PIN" value={pin} onChange={(e) => setPin(e.target.value)} required />
          <button type="submit">Create Wallet</button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Wallet;
