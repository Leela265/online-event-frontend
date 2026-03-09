import React, { useEffect, useState } from "react";
import { api } from "../services/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/my").then((res) => setBookings(res.data)).catch(console.error);
  }, []);

  return (
    <div className="homePage">
      <section className="eventsSection">
        <div className="sectionTop">
          <h2>My Bookings</h2>
          <p>See all events you have already joined or booked.</p>
        </div>

        <div className="eventsGrid">
          {bookings.length === 0 ? (
            <p className="noEventsText">No bookings found</p>
          ) : (
            bookings.map((booking, index) => {
              const event = booking.events;
              const status = getStatus(event?.date);

              return (
                <div className="eventCard" key={index}>
                  <span className="eventBadge">{status}</span>
                  <h3>{event?.title || "Booked Event"}</h3>
                  <p>📅 {event?.date}</p>
                  <p>📍 {event?.location}</p>
                  <p>⏰ Reminder: {getReminderText(event?.date)}</p>
                  <button className="bookBtn" disabled>
                    Joined
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}

function getStatus(dateString) {
  const today = new Date();
  const eventDate = new Date(dateString);

  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const e = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate()).getTime();

  if (e < t) return "Completed";
  if (e === t) return "Today";
  return "Upcoming";
}

function getReminderText(dateString) {
  const today = new Date();
  const eventDate = new Date(dateString);
  const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

  if (diff < 0) return "Event completed";
  if (diff === 0) return "Starts today";
  if (diff === 1) return "Starts tomorrow";
  return `Starts in ${diff} days`;
}