import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    api
      .get("/bookings/my")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  return (
    <div className="page">
      <div className="hero compact">
        <div>
          <h1 className="title">My Bookings ✅</h1>
          <p className="subtitle">Your booked events in one place.</p>
        </div>
      </div>

      {loading ? (
        <p className="muted">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <div className="empty">
          <h3>No bookings yet</h3>
          <p className="muted">Go to Home and book your first event.</p>
          <button className="btn btnPrimary" onClick={() => navigate("/")}>
            Browse Events
          </button>
        </div>
      ) : (
        <div className="grid">
          {bookings.map((b, idx) => {
            const ev = b.events;
            return (
              <div key={idx} className="card">
                <h3 className="cardTitle">{ev?.title || "Event"}</h3>
                <p className="cardMeta">
                  <span>📅 {ev?.date}</span>
                  <span className="dot">•</span>
                  <span>📍 {ev?.location}</span>
                </p>
                <div className="badge green">BOOKED</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}