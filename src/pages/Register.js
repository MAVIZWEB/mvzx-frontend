// src/pages/Register.js
import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE =
    process.env.REACT_APP_API_URL ||
    "https://mvzx-backend.onrender.com/api";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${API_BASE}/auth/register`, form);
      setMessage("✅ Registration successful! Please log in.");
      setForm({ email: "", password: "" });
    } catch (err) {
      console.error(err);
      setMessage(
        "❌ " +
          (err.response?.data?.error || err.message || "Registration failed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
