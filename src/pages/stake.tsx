import { useState } from "react";
import api from "../services/api";

export default function Stake() {
  const [amount, setAmount] = useState(0);

  async function stake() {
    const res = await api.post("/stake/create", { amount });
    alert(`Staked ${res.data.amount} MVZx. Will mature in 150 days`);
  }

  return (
    <div className="p-10">
      <h1>Special Staking (100% in 150 days)</h1>
      <input type="number" placeholder="Amount to stake" onChange={e => setAmount(Number(e.target.value))} />
      <button onClick={stake}>Stake</button>
    </div>
  );
}
