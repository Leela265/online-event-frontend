import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="homePage">
      <section className="mainHero">
        <div className="heroLeft">
          <p className="heroTag">EVENT MANAGEMENT PLATFORM</p>
          <h1 className="heroHeading">
            Manage, promote, and book events with one smart platform
          </h1>
          <p className="heroText">
            Build better event experiences for workshops, conferences, tech meetups,
            startup sessions, virtual events, and hybrid experiences. Make registration,
            bookings, and event planning faster and easier.
          </p>

          <div className="heroButtons">
            <button className="primaryBtn" onClick={() => navigate("/signup")}>
              Get Started
            </button>
            <button className="secondaryBtn" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>

        <div className="heroFormCard">
          <h2>Event Platform Action</h2>
          <p className="heroMiniText">
            Start managing events with a modern digital system.
          </p>

          <div className="heroFeatureList">
            <div className="heroFeatureItem">✅ Smart event booking flow</div>
            <div className="heroFeatureItem">✅ User login and registration</div>
            <div className="heroFeatureItem">✅ Booking reminders and status</div>
            <div className="heroFeatureItem">✅ Dashboard for upcoming events</div>
            <div className="heroFeatureItem">✅ My bookings management</div>
          </div>

          <button className="formBtn" onClick={() => navigate("/signup")}>
            Start Now
          </button>
        </div>
      </section>

      <section className="platformActionSection">
        <div className="platformActionGrid">
          <div className="platformCard">
            <div className="platformIcon">🎟</div>
            <h3>Book Events Easily</h3>
            <p>
              Let users discover events, register quickly, and manage all bookings
              from one place.
            </p>
          </div>

          <div className="platformCard">
            <div className="platformIcon">📅</div>
            <h3>Track Upcoming Events</h3>
            <p>
              Show users what event is next, how many days are left, and what they
              have already joined.
            </p>
          </div>

          <div className="platformCard">
            <div className="platformIcon">📊</div>
            <h3>Smart Dashboard</h3>
            <p>
              Provide a simple dashboard with booking counts, reminders, and event
              overview.
            </p>
          </div>
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
          <h2>Why choose our platform?</h2>
          <p>Everything needed to manage events in one beautiful workflow.</p>
        </div>

        <div className="eventsGrid">
          <div className="eventCard">
            <span className="eventBadge">Fast Access</span>
            <h3>Easy Registration</h3>
            <p>Users can sign up, login, and start booking events quickly.</p>
          </div>

          <div className="eventCard">
            <span className="eventBadge">User Focused</span>
            <h3>My Bookings</h3>
            <p>Track booked events, upcoming status, and joined history clearly.</p>
          </div>

          <div className="eventCard">
            <span className="eventBadge">Platform Ready</span>
            <h3>Better Event Experience</h3>
            <p>Modern UI, event flow, reminder logic, and a clean dashboard.</p>
          </div>
        </div>
      </section>

      <footer className="siteFooter">
        <div className="siteFooterInner">
          <div>
            <h3>Online Event Management</h3>
            <p>
              A smart platform to manage bookings, discover events, and improve
              event experiences.
            </p>
          </div>

          <div className="footerLinks">
            <span onClick={() =>name}>NAME: LEELA BHAVANI</span>
            <span onClick={() => gmail}>Gmail: leelabhavani265@gmail.com</span>
          </div>
        </div>

        <div className="footerBottom">
          © 2026 Online Event Management. All rights reserved.
        </div>
      </footer>
    </div>
  );
}