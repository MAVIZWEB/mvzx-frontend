import React, { useState } from "react";
import { createDeposit, initFlutterwavePayment } from "../api";

function Deposit() {
  const token = localStorage.getItem("token");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("manual");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (method === "manual") {
        await createDeposit({ amount, method }, token);
        setMessage("✅ Deposit submitted. Awaiting admin approval.");
      } else {
        const email = prompt("Enter your Flutterwave email:");
        const res = await initFlutterwavePayment(amount, "NGN", email, token);
        window.location.href = res.payment_link;
      }
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Deposit Funds</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Amount (NGN)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="manual">Manual Bank Transfer</option>
          <option value="flutterwave">Flutterwave</option>
        </select>
        <button type="submit">Deposit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Deposit;
