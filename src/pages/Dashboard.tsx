 import React from "react";
import { GameWheel } from "../components/GameWheel";

export const Dashboard: React.FC = () => (
  <div className="p-4">
    <h1 className="text-3xl font-bold text-center">Dashboard</h1>
    <GameWheel />
  </div>
);
