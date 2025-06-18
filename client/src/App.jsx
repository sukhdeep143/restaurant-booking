import React from "react";
import "./index.css";

function App() {
  return (
    <div>
      {/* Navbar */}
      <header>
        <div className="logo">🍽️ RESTAURANT</div>
        <nav>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Menu</a>
          <a href="#">Events</a>
          <a href="#">Gallery</a>
          <a href="#">Review</a>
        </nav>
        <div className="auth-buttons">
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      </header>

          {/* Hero Section */}
          <section className="hero">
      <img src="/images/homepage.png" alt="Homepage" />
      <div className="hero-text">
        <h2>Experience the Taste of Tradition with a Modern Twist</h2>
        <p>
          At our restaurant, we craft unforgettable dishes using fresh, locally-sourced ingredients.
        </p>
        <p>
          From the first bite to the last, enjoy handcrafted flavors made with passion and care.
        </p>
      </div>
    </section>
        

      {/* Footer */}
      <footer>
  <div className="footer-container">
    <div className="footer-info">
      <h4>Contact</h4>
      <p>📍 1224 Vantala Landscape Yard, New Delhi, 123456</p>
      <p>✉️ Email: info@restaurant.com</p>
      <p>📞 Phone: +91 98765 43210</p>
    </div>

    <div className="footer-links">
      <h4>Quick Links</h4>
      <a href="#">About Us</a>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Careers</a>
    </div>

    <div className="footer-social">
      <h4>Follow Us</h4>
      <a href="#">Facebook</a>
      <a href="#">Instagram</a>
      <a href="#">Twitter</a>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© {new Date().getFullYear()} Restaurant. All rights reserved.</p>
  </div>
</footer>

    </div>
  );
}

export default App;
