 import React, { useState } from "react";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "deposit">("home");

  const menuItems = ["Home", "Buy", "Escrow", "Mining", "Airdrop"];

  // Placeholder Spin & Win logic
  const handleSpin = () => {
    alert("Spin triggered! Rewards logic to be implemented.");
  };

  // Placeholder Deposit Submit
  const handleDepositSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Deposit submitted! Admin approval & token transfer logic to be implemented.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#40E0D0",
        fontFamily: "Arial, sans-serif",
        color: "#000",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "1rem",
          textAlign: "center",
          borderBottom: "2px solid #000",
        }}
      >
        {/* Logo & Title */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src="logo.png" // replace with actual logo path
            alt="MAVIZ Logo"
            style={{ width: "120px", marginBottom: "0.5rem" }}
          />
          <h1 style={{ margin: 0 }}>MAVIZ LIQUIDITY & REVENUE SHARING</h1>
        </div>

        {/* Menu Row */}
        <nav style={{ marginTop: "1rem" }}>
          {menuItems.map((item) => (
            <button
              key={item}
              style={{
                margin: "0 10px",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                borderRadius: "5px",
                border: "1px solid #000",
                background: "#fff",
                fontWeight: "bold",
              }}
              onClick={() =>
                setCurrentPage(item === "Home" ? "home" : "deposit")
              }
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ marginTop: "0.5cm", padding: "1rem" }}>
        {currentPage === "home" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Spin & Win Game */}
            <div
              style={{
                width: "65vw",
                height: "65vh",
                backgroundColor: "#fff",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              🎡 Spin & Win Game Placeholder 🎡
              <button
                onClick={handleSpin}
                style={{
                  marginTop: "1rem",
                  padding: "1rem 2rem",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#ffcc00",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Spin Now
              </button>
            </div>

            {/* Feature Buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              {["ESCROW TRADE", "BUY MVZX", "AIRDROP", "MINING"].map(
                (feature) => (
                  <button
                    key={feature}
                    style={{
                      padding: "1rem 2rem",
                      borderRadius: "10px",
                      border: "none",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {feature}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Manual Deposit Page */}
        {currentPage === "deposit" && (
          <div
            style={{
              maxWidth: "500px",
              margin: "0 auto",
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "20px",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Manual Deposit
            </h2>
            <p>
              Pay to: <strong>Masses 1026664654 UBA</strong>
            </p>
            <form onSubmit={handleDepositSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label>Wallet Address:</label>
                <input
                  type="text"
                  required
                  style={{ width: "100%", padding: "0.5rem" }}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>Date on Receipt:</label>
                <input
                  type="date"
                  required
                  style={{ width: "100%", padding: "0.5rem" }}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>Time on Receipt:</label>
                <input
                  type="time"
                  required
                  style={{ width: "100%", padding: "0.5rem" }}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>Phone Number:</label>
                <input
                  type="tel"
                  pattern="\d{10,15}"
                  placeholder="e.g. 08012345678"
                  required
                  style={{ width: "100%", padding: "0.5rem" }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#40E0D0",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "#000",
                }}
              >
                Submit Deposit
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
