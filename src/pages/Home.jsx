import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [bookingId, setBookingId] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleBook = async (eventId) => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setBookingId(eventId);
      await api.post("/bookings", { eventId });
      alert("Booking successful");
      navigate("/bookings");
    } catch (error) {
      alert(error?.response?.data?.message || "Booking failed");
    } finally {
      setBookingId(null);
    }
  };

  return (
    <div className="homePage">
      <section className="mainHero">
        <div className="heroLeft">
          <p className="heroTag">EVENT MANAGEMENT SOFTWARE</p>
          <h1 className="heroHeading">
            An event tech platform for in-person, virtual, and hybrid experiences
          </h1>
          <p className="heroText">
            Plan, manage, and book amazing events with a modern event platform.
            Create smooth experiences for attendees, manage registrations,
            and simplify your entire workflow.
          </p>

          <div className="heroButtons">
            <button className="primaryBtn" onClick={() => navigate("/signup")}>
              Get Started
            </button>
            <button className="secondaryBtn" onClick={() => navigate("/bookings")}>
              My Bookings
            </button>
          </div>
        </div>

        <div className="heroFormCard">
          <h2>See the power of your event platform</h2>

          <div className="heroFormGrid">
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
            <input type="text" placeholder="Organization" />
            <input type="text" placeholder="Phone number" />
          </div>

          <input type="email" placeholder="Work email" className="fullInput" />
          <input type="text" placeholder="Job function" className="fullInput" />
          <input type="text" placeholder="Country" className="fullInput" />
          <input type="text" placeholder="Event type" className="fullInput" />

          <button className="formBtn">Get started</button>
        </div>
      </section>

      <section className="heroVideoSection">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="heroVideo"
  >
    <source src="/event-platform.mp4" type="video/mp4" />
  </video>

  <div className="heroOverlay">
    <h1>Online Event Management Platform</h1>
    <p>Discover and book amazing events instantly</p>
  </div>
</section>

      <section className="eventsSection">
        <div className="sectionTop">
          <h2>Upcoming Events</h2>
          <p>Book your favorite events quickly and easily.</p>
        </div>

        <div className="eventsGrid">
          {events.length === 0 ? (
            <p className="noEventsText">No events found</p>
          ) : (
            events.map((event) => (
              <div className="eventCard" key={event.id}>
                <div className="eventCardTop">
                  <span className="eventBadge">Live Event</span>
                </div>

                <h3>{event.title}</h3>
                <p>📅 {event.date}</p>
                <p>📍 {event.location}</p>

                <button
                  className="bookBtn"
                  onClick={() => handleBook(event.id)}
                  disabled={bookingId === event.id}
                >
                  {bookingId === event.id ? "Booking..." : "Book Now"}
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {showVideo && (
        <div className="videoModal" onClick={() => setShowVideo(false)}>
          <div className="videoModalContent" onClick={(e) => e.stopPropagation()}>
            <button className="closeVideoBtn" onClick={() => setShowVideo(false)}>
              ✕
            </button>

            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Event video"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}