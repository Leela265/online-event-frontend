import React, { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);

      // Save in context (and localStorage via AuthContext)
      login({ token: res.data.token, user: res.data.user });

      alert("✅ Login successful");
      navigate("/");
    } catch (e2) {
      alert(e2?.response?.data?.message || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authWrap">
      <form className="authCard" onSubmit={handleSubmit}>
        <h2 className="authTitle">Welcome Back</h2>
        <p className="authSub">Login to book your events.</p>

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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="authHint">
          New here?{" "}
          <span className="authLink" onClick={() => navigate("/signup")}>
            Create account
          </span>
        </p>
      </form>
    </div>
  );
}