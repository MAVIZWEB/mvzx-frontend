import { useState } from "react";
import api from "../services/api";

export default function Home() {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  async function signup() {
    const res = await api.post("/auth/signup", { email, pin });
    alert(`Signed up! AIRDROP: 0.5 MVZx sent to wallet ${res.data.wallet}`);
  }

  return (
    <div className="p-10">
      <h1>MVZx Signup + AIRDROP</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="4-digit PIN" onChange={e => setPin(e.target.value)} />
      <button onClick={signup}>Signup & Claim AIRDROP</button>
    </div>
  );
}
