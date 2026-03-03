import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null); // for button loading
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleBook = async (eventId) => {
    if (!user) {
      alert("Please login to book an event");
      navigate("/login");
      return;
    }

    try {
      setBookingId(eventId);
      await api.post("/bookings", { eventId });
      alert("✅ Booking successful!");
    } catch (e) {
      alert(e?.response?.data?.message || "Booking failed");
    } finally {
      setBookingId(null);
    }
  };

  return (
    <div className="page">
      <div className="hero">
        <div>
          <h1 className="title">Discover Events ✨</h1>
          <p className="subtitle">
            Book amazing events for experiences in seconds. 
          </p>
        </div>
        <div className="glow" />
      </div>

      {loading ? (
        <p className="muted">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="muted">No events found</p>
      ) : (
        <div className="grid">
          {events.map((e) => (
            <div key={e.id} className="card">
              <div className="cardTop">
                <div>
                  <h3 className="cardTitle">{e.title}</h3>
                  <p className="cardMeta">
                    <span>📅 {e.date}</span>
                    <span className="dot">•</span>
                    <span>📍 {e.location}</span>
                  </p>
                </div>
                <div className="badge">LIVE</div>
              </div>

              <div className="cardActions">
                <button
                  className="btn btnGhost"
                  onClick={() => navigate("/bookings")}
                >
                  View Bookings
                </button>

                <button
                  className="btn btnPrimary"
                  onClick={() => handleBook(e.id)}
                  disabled={bookingId === e.id}
                >
                  {bookingId === e.id ? "Booking..." : "Book Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}