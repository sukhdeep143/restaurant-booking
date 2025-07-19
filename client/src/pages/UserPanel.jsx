// import React from "react";
// import UserProfile from "../components/UserProfile";
// import BookingForm from "../components/BookingForm";
// import BookingHistory from "../components/BookingHistory";

// export default function UserPanel() {
//   return (
//     <div className="bg-gray-300 min-h-screen p-4 sm:p-6 md:p-8">
//       <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
//           🧑‍💼 User Panel – Restaurant Booking
//         </h2>

//         {/* Profile */}
//         <UserProfile />

//         {/* Booking Form */}
//         <BookingForm />

//         {/* Booking History */}
//         <BookingHistory />

//         {/* Logout Button */}
//         <div className="text-center mt-6">
//           <button
//             onClick={() => alert("You have been logged out.")}
//             className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition duration-200"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useRef } from "react";
import UserProfile from "../components/UserProfile";
import BookingForm from "../components/BookingForm";
import BookingHistory from "../components/BookingHistory";
import Dashboard from "../components/dashboard";

const Section = ({ title, children }) => (
  <section className="admin-section">
    <h2 className="admin-section-title">{title}</h2>
    <div className="admin-section-content">{children}</div>
  </section>
);

export default function UserPanel() {
  const bookingFormRef = useRef(null);
  const bookingHistoryRef = useRef(null);
  const profileRef = useRef(null);
  const dashboardRef = useRef(null);
  const [activeSection, setActiveSection] = useState("dashboard");

  const [userStats] = useState({
    upcomingBooking: "July 20, 2025 at 7:30 PM",
    totalBookings: 15,
    lastVisit: "July 10, 2025",
    profileCompletion: "80% completed",
    recentBookings: [
      "✅ July 10, 2025 – Table for 4",
      "✅ July 01, 2025 – Table for 2",
      "❌ June 25, 2025 – Cancelled"
    ]
  });

  const scrollToSection = (ref, section) => {
    setActiveSection(section);
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <Section >
            <div ref={dashboardRef}>
              <Dashboard 
                onBookTableClick={() => scrollToSection(bookingFormRef, "book_table")}
                onBookingHistoryClick={() => scrollToSection(bookingHistoryRef, "my_bookings")}
                onProfileClick={() => scrollToSection(profileRef, "profile")}
                stats={userStats}
              />
            </div>
          </Section>
        );
      case "book_table":
        return (
          <Section title="Book a Table 🍽️">
            <div ref={bookingFormRef}>
              <BookingForm />
            </div>
          </Section>
        );
      case "my_bookings":
        return (
          <Section>
            <div ref={bookingHistoryRef}>
              <BookingHistory />
            </div>
          </Section>
        );
      case "profile":
        return (
          <Section title="My Profile 🧑">
            <div ref={profileRef}>
              <UserProfile />
            </div>
          </Section>
        );
      case "logout":
        alert("You have been logged out.");
        window.location.href = "/";
        return null;
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">User Panel</h2>
        <nav>
          <div className="sidebar-section-title">OVERVIEW</div>
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`nav-button ${activeSection === "dashboard" ? "active" : ""}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveSection("profile")}
            className={`nav-button ${activeSection === "profile" ? "active" : ""}`}
          >
            My Profile
          </button>

          <div className="sidebar-section-title">BOOKINGS</div>
          <button
            onClick={() => setActiveSection("book_table")}
            className={`nav-button ${activeSection === "book_table" ? "active" : ""}`}
          >
            Book a Table
          </button>
          <button
            onClick={() => setActiveSection("my_bookings")}
            className={`nav-button ${activeSection === "my_bookings" ? "active" : ""}`}
          >
            My Bookings
          </button>

          <div className="sidebar-section-title">ACCOUNT</div>
          <button
            onClick={() => setActiveSection("logout")}
            className="nav-button logout-button"
          >
            Logout
          </button>
        </nav>
        <footer className="sidebar-footer">Logged in as: User</footer>
      </aside>

      <main className="main-content">
        {/* <h1 className="page-title">
          {activeSection.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
        </h1> */}
        {renderSection()}
        <div className="footer-links">
          Copyright © Restaurant System 2025 |
          <a href="#"> Privacy Policy</a> · <a href="#">Terms</a>
        </div>
      </main>
    </div>
  );
}
