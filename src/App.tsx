import React, { useState } from "react";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "deposit">("home");
  const [userWallet, setUserWallet] = useState<string>("");
  const [spinResult, setSpinResult] = useState<string>("");

  const menuItems = ["Home", "Buy", "Escrow", "Mining", "Airdrop"];

  // --- Spin & Win Handler ---
  const handleSpin = async () => {
    if (!userWallet) {
      alert("Please enter your wallet address first.");
      return;
    }
    try {
      const res = await fetch("/api/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: userWallet, spinType: "free" }),
      });
      const data = await res.json();
      if (data.success) {
        setSpinResult(
          `Congratulations! You won ${data.amount} MVZx. TX: ${data.txHash}`
        );
      } else {
        setSpinResult(`Spin failed: ${data.error}`);
      }
    } catch (err: any) {
      console.error(err);
      setSpinResult("Spin failed. Try again later.");
    }
  };

  // --- Manual Deposit Handler ---
  const handleDepositSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      walletAddress: formData.get("walletAddress"),
      date: formData.get("date"),
      time: formData.get("time"),
      phone: formData.get("phone"),
    };
    try {
      const res = await fetch("/api/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        alert("Deposit submitted! Admin will approve and tokens will be sent.");
      } else {
        alert(`Deposit failed: ${data.error}`);
      }
    } catch (err: any) {
      console.error(err);
      alert("Deposit submission failed. Try again later.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#40E0D0", // turquoise
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
        <h1 style={{ margin: 0 }}>MAVIZ LIQUIDITY & REVENUE SHARING</h1>
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

      {/* Content */}
      <main style={{ marginTop: "0.5cm", padding: "1rem" }}>
        {currentPage === "home" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Wallet Input */}
            <div style={{ marginBottom: "1rem" }}>
              <label>Enter Your Wallet Address: </label>
              <input
                type="text"
                value={userWallet}
                onChange={(e) => setUserWallet(e.target.value)}
                placeholder="0x..."
                style={{ padding: "0.5rem", width: "300px" }}
              />
            </div>

            {/* Spin & Win Placeholder */}
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
              🎡 Spin & Win Game 🎡
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
                <p style={{ marginTop: "1rem", fontSize: "1rem" }}>
                  {spinResult}
                </p>
              )}
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
                  name="walletAddress"
                  type="text"
                  required
                  style={{ width: "100%", padding: "0.5rem" }}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>Date on Receipt:</label>
                <input
                  name="date"
                  type="date"
                  required
                  style={{ width: "100%", padding: "0.5rem" }}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>Time on Receipt:</label>
                <input
                  name="time"
                  type="time"
                  required
                  style={{ width: "100%", padding: "0.5rem" }}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>Phone Number:</label>
                <input
                  name="phone"
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
