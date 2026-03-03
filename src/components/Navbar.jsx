import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 24px", borderBottom: "1px solid #ddd" }}>
      <h3 style={{ margin: 0 }}>Online Event Management</h3>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/bookings">My Bookings</Link>

        {user ? (
          <>
            <span style={{ opacity: 0.8 }}>Hi, {user.name || user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
}