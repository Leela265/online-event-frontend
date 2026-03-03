import React, { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      alert("✅ Registered successfully! Please login.");
      navigate("/login");
    } catch (e2) {
      alert(e2?.response?.data?.message || "❌ Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authWrap">
      <form className="authCard" onSubmit={handleSubmit}>
        <h2 className="authTitle">Create Account</h2>
        <p className="authSub">Join and book events instantly.</p>

        <label className="authLabel">Name</label>
        <input
          className="authInput"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label className="authLabel">Email</label>
        <input
          className="authInput"
          name="email"
          type="email"
          placeholder="you@mail.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label className="authLabel">Password</label>
        <input
          className="authInput"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="btn btnPrimary authBtn" disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="authHint">
          Already have an account?{" "}
          <span className="authLink" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}