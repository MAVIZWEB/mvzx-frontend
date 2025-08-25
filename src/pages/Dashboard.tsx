 import { useState } from "react";
import Header from "../components/Header";
import GameWheel from "../components/GameWheel";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Dashboard() {
  // For demonstration: replace with actual auth
  const [user, setUser] = useState<User>({
    id: "12345",
    name: "John Doe",
    email: "john@example.com",
  });

  const handleLogout = () => {
    // Clear any auth tokens, redirect to login
    console.log("User logged out");
    setUser({ id: "", name: "", email: "" });
    window.location.href = "/login"; // adjust route
  };

  if (!user.id) {
    return <p className="text-center mt-16 text-white">Redirecting to login...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header username={user.name} onLogout={handleLogout} />
      <main className="flex flex-col items-center mt-12">
        <h2 className="text-2xl text-white font-bold mb-6">Spin & Earn Rewards</h2>
        <GameWheel userId={user.id} />
      </main>
    </div>
  );
}
