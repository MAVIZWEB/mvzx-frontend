import React from "react";
import BadgeDisplay from "../components/BadgeDisplay";

const Dashboard: React.FC = () => {
  // Example user progress data
  const currentStage = 1;
  const nextStage = 2;
  const totalMC = 10200; // example MC value

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      <div className="grid gap-6">
        {/* Current Badge */}
        <div className="p-4 border rounded-xl shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">Your Badge</h2>
          <BadgeDisplay badge="Bronze" />
        </div>

        {/* Progress Section */}
        <div className="p-4 border rounded-xl shadow bg-white">
          <h2 className="text-lg font-semibold mb-2">Progress</h2>
          <p>Current Stage: {currentStage}</p>
          <p>Next Stage: {nextStage}</p>
          <p>Total MC to Expect: {totalMC}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
