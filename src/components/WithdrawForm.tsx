here import { useState } from "react";
import api from "../services/api";

export default function WithdrawForm({ userId }: { userId: number }) {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("BANK");

  async function withdraw() {
    const res = await api.post("/withdraw", { userId, amount, type });
    alert(`Withdrawal requested: ${res.data.amount} via ${res.data.method}`);
  }

  return (
    <div>
      <input type="number" onChange={e => setAmount(Number(e.target.value))} placeholder="Amount" />
      <select onChange={e => setType(e.target.value)}>
        <option value="BANK">Bank</option>
        <option value="USDT">USDT</option>
      </select>
      <button onClick={withdraw}>Withdraw</button>
    </div>
  );
          }
