import React, { createContext, useContext, useState, useEffect } from "react";

type BalanceContextType = {
  balance: number;
  setBalance: (value: number) => void;
};

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0);

  // Load from localStorage on mount
  useEffect(() => {
    const savedBalance = localStorage.getItem("mvzx_balance");
    setBalance(savedBalance ? parseFloat(savedBalance) : 0);
  }, []);

  // Save whenever it changes
  useEffect(() => {
    localStorage.setItem("mvzx_balance", balance.toString());
  }, [balance]);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) throw new Error("useBalance must be used inside BalanceProvider");
  return context;
};
