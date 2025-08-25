 import { useState } from "react";
import SignupForm from "./SignupForm";
import GameWheel from "./GameWheel";

const Main = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {!walletAddress ? (
        <>
          <div className="text-center py-10">
            <h1 className="text-4xl font-bold">Welcome to MAVIZ SWAPS</h1>
            <p className="mt-2 text-gray-400">
              Demo mode active. Signup to unlock full features!
            </p>
          </div>
          <SignupForm onSignupSuccess={setWalletAddress} />
        </>
      ) : (
        <GameWheel walletAddress={walletAddress} />
      )}
    </div>
  );
};

export default Main;
