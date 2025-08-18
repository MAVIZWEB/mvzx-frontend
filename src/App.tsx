import React, { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png"; // Restore your logo path

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "deposit">("home");
  const [spinResult, setSpinResult] = useState<string>("");

  const menuRow1 = ["Home", "Buy", "Escrow"];
  const menuRow2 = ["Mining", "Airdrop"];

  // --- Spin & Win Handler ---
  const handleSpin = () => {
    // Placeholder for backend logic
    alert("Spin triggered! Rewards logic to be implemented.");
    setSpinResult("You won a placeholder amount! Backend logic pending.");
  };

  // --- Manual Deposit Handler ---
  const handleDepositSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Deposit submitted! Admin approval & token transfer logic to be implemented.");
  };

  const handleCancel = () => {
    setCurrentPage("home");
  };

  return (
    <div className="App" style={{ minHeight: "100vh", fontFamily: "Arial, sans-serif", color: "#000" }}>
      {/* Header */}
      <header style={{ padding: "1rem", textAlign: "center", borderBottom: "2px solid #000" }}>
        <img src={logo} alt="MAVIZ Logo" style={{ width: "120px", marginBottom: "0.5rem" }} />
        <h1 style={{ margin: 0 }}>MAVIZ LIQUIDITY & REVENUE SHARING</h1>
        <p style={{ margin: "0.5rem 0" }}>Buy, Earn & Participate in MVZx Revenue Sharing!</p>
        <nav style={{ marginTop: "0.5rem" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            {menuRow1.map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item === "Home" ? "home" : "deposit")}
                style={{ margin: "0 8px", padding: "0.5rem 1rem", borderRadius: "5px", border: "1px solid #000", cursor: "pointer", backgroundColor: "#fff" }}
              >
                {item}
              </button>
            ))}
          </div>
          <div>
            {menuRow2.map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item === "Home" ? "home" : "deposit")}
                style={{ margin: "0 8px", padding: "0.5rem 1rem", borderRadius: "5px", border: "1px solid #000", cursor: "pointer", backgroundColor: "#fff" }}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main style={{ marginTop: "0.5cm", padding: "1rem" }}>
        {currentPage === "home" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Spin & Win Game Top */}
            <div
              style={{
                width: "80vw",
                height: "70vh",
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
              🎡 Spin & Win 🎡
              <button
                onClick={handleSpin}
                style={{
                  display: "block",
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
              {spinResult && (
                <p style={{ marginTop: "1rem", fontSize: "1rem" }}>{spinResult}</p>
              )}
            </div>

            {/* Feature Buttons Bottom */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              {["ESCROW TRADE", "BUY MVZX", "AIRDROP", "MINING"].map((feature) => (
                <button
                  key={feature}
                  onClick={() => setCurrentPage(feature === "BUY MVZX" ? "deposit" : "home")}
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
              ))}
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
              position: "relative",
            }}
          >
            <button
              onClick={handleCancel}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                border: "none",
                background: "transparent",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Manual Deposit</h2>
            <p>Pay to: <strong>Masses 1026664654 UBA</strong></p>
            <form onSubmit={handleDepositSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label>Wallet Address:</label>
                <input type="text" required style={{ width: "100%", padding: "0.5rem" }} />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>Date on Receipt:</label>
                <input type="date" required style={{ width: "100%", padding: "0.5rem" }} />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>Time on Receipt:</label>
                <input type="time" required style={{ width: "100%", padding: "0.5rem" }} />
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
