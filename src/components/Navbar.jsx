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
    <header className="topNav">
      <div className="topNavInner">
        <div className="brand" onClick={() => navigate(user ? "/dashboard" : "/")}>
          <span className="brandDot" />
          <span>Online Event Management</span>
        </div>

        <nav className="navLinks">
          <Link to={user ? "/dashboard" : "/"}>Home</Link>
          {user && <Link to="/bookings">My Bookings</Link>}

          {user ? (
            <>
              <span className="userText">Hi, {user.name || user.email}</span>
              <button className="navBtn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <button className="navBtn" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}