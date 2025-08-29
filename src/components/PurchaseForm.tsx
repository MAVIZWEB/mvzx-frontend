import { useState } from "react";
import api from "../services/api";

export default function PurchaseForm({ userId }: { userId: number }) {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("NGN");

  async function purchase() {
    const res = await api.post("/purchase", { userId, amount, currency });
    alert(`Purchase success! Tokens: ${res.data.tokens}, Matrix assigned: ${res.data.matrixAssigned}`);
  }

  return (
    <div>
      <input type="number" onChange={e => setAmount(Number(e.target.value))} placeholder="Amount" />
      <select onChange={e => setCurrency(e.target.value)}>
        <option value="NGN">NGN</option>
        <option value="USDT">USDT</option>
      </select>
      <button onClick={purchase}>Buy MVZx</button>
    </div>
  );
}
