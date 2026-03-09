import React, { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingId, setBookingId] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/events").then((res) => setEvents(res.data)).catch(console.error);
    api.get("/bookings/my").then((res) => setBookings(res.data)).catch(console.error);
  }, []);

  const bookedEventIds = useMemo(() => {
    return new Set(bookings.map((b) => b.events?.id).filter(Boolean));
  }, [bookings]);

  const nextEvent = useMemo(() => {
    const bookedEvents = bookings
      .map((b) => b.events)
      .filter(Boolean)
      .filter((e) => new Date(e.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    return bookedEvents[0] || null;
  }, [bookings]);

  const handleBook = async (eventId) => {
    try {
      setBookingId(eventId);
      await api.post("/bookings", { eventId });
      alert("Booking successful");
      const refreshed = await api.get("/bookings/my");
      setBookings(refreshed.data);
    } catch (error) {
      alert(error?.response?.data?.message || "Booking failed");
    } finally {
      setBookingId(null);
    }
  };

  return (
    <div className="homePage">
      <section className="eventsSection">
        <div className="dashboardTop">
          <div className="dashboardWelcome cardLite">
            <p className="heroTag">WELCOME BACK</p>
            <h2 className="sectionMainTitle">Hi, {user?.name || "User"} 👋</h2>
            <p className="dashboardText">
              Manage your bookings, discover new events, and track your upcoming schedule.
            </p>
          </div>

          <div className="dashboardStats">
            <div className="statCard">
              <span>Total Bookings</span>
              <h3>{bookings.length}</h3>
            </div>

            <div className="statCard">
              <span>Upcoming Event</span>
              <h3>{nextEvent ? nextEvent.title : "None"}</h3>
            </div>

            <div className="statCard">
              <span>Reminder</span>
              <h3>{nextEvent ? getReminderText(nextEvent.date) : "No reminder"}</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="eventsSection">
        <div className="sectionTop">
          <h2>Available Events</h2>
          <p>Browse all events and join the ones you like.</p>
        </div>

        <div className="eventsGrid">
          {events.map((event) => {
            const alreadyBooked = bookedEventIds.has(event.id);

            return (
              <div className="eventCard" key={event.id}>
                <span className="eventBadge">{alreadyBooked ? "Booked" : "Live Event"}</span>
                <h3>{event.title}</h3>
                <p>📅 {event.date}</p>
                <p>📍 {event.location}</p>

                <button
                  className="bookBtn"
                  onClick={() => handleBook(event.id)}
                  disabled={alreadyBooked || bookingId === event.id}
                >
                  {alreadyBooked
                    ? "Already Booked"
                    : bookingId === event.id
                    ? "Booking..."
                    : "Book Now"}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function getReminderText(dateString) {
  const today = new Date();
  const eventDate = new Date(dateString);
  const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

  if (diff < 0) return "Completed";
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day left";
  return `${diff} days left`;
}