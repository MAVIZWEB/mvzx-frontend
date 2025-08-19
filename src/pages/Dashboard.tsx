import React, { useEffect, useState } from "react";
import BadgeDisplay from "./components/BadgeDisplay";

interface Badge {
  name: string;
  color: string;
  requiredMC: number;
}

interface UserStatus {
  userId: string;
  stage: number;
  position: number;
  expectedEarnings: number;
  earningsSoFar: number;
  earningsLeft: number;
  badge: Badge;
  nextStage: Badge | null;
}

const Dashboard: React.FC = () => {
  const [status, setStatus] = useState<UserStatus | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/status/1")
      .then((res) => res.json())
      .then((data) => setStatus(data));
  }, []);

  if (!status) return <p>Loading...</p>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">User Dashboard</h2>

      <div>
        <p>User ID: {status.userId}</p>
        <p>Stage: {status.stage}</p>
        <p>
          Current Rank:{" "}
          <BadgeDisplay stage={status.stage} />
        </p>
      </div>

      {status.nextStage && (
        <div className="mt-4 p-3 border rounded-lg shadow">
          <h3 className="text-lg font-semibold">Next Target 🚀</h3>
          <p>
            Next Stage:{" "}
            <span style={{ color: status.nextStage.color }}>
              {status.nextStage.name}
            </span>
          </p>
          <p>Required MC: {status.nextStage.requiredMC}</p>
        </div>
      )}

      <div className="mt-4">
        <p>Expected Earnings: {status.expectedEarnings}</p>
        <p>Earnings So Far: {status.earningsSoFar}</p>
        <p>Earnings Left: {status.earningsLeft}</p>
      </div>
    </div>
  );
};

export default Dashboard;
