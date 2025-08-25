import React from "react";

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

export default function Header({ username, onLogout }: HeaderProps) {
  return (
    <header className="bg-gray-900 flex justify-between items-center p-4 shadow-md">
      <h1 className="text-xl font-bold text-white">MVZx Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-white">Hello, {username}</span>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
