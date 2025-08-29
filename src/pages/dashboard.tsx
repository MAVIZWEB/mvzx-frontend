import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    api.get("/user/balance").then(res => setBalance(res.data.balance));
  }, []);

  return (
    <div className="p-10">
      <h1>Dashboard</h1>
      <p>MVZx Balance: {balance}</p>
    </div>
  );
}
