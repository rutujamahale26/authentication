import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Home/Home.css";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (location.state?.fromRegistration) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="home-navbar">
        <div className="brand-name">Caves InfoTech</div>
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </nav>

      {/* Welcome Section */}
      <div className="home-card">
        {showMessage && (
          <div className="welcome-msg">
            🎉 Registration successful! Welcome to Caves InfoTech.
          </div>
        )}
        <h1>Welcome to Caves InfoTech</h1>
        <p className="tagline">
          Empowering your digital future through innovation and technology.
        </p>
        <button className="primary-btn" onClick={handleLogin}>
          Login to Your Account
        </button>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Web Development</h3>
            <p>
              Responsive websites, custom portals, and high-performance web apps
              tailored to your business goals.
            </p>
          </div>
          <div className="service-card">
            <h3>Cloud Solutions</h3>
            <p>
              Secure and scalable cloud infrastructure with seamless deployment
              and 24/7 uptime support.
            </p>
          </div>
          <div className="service-card">
            <h3>AI & Automation</h3>
            <p>
              Leverage machine learning and automation to streamline operations
              and gain predictive insights.
            </p>
          </div>
        </div>
        <div className="chatbot">💬 Chat with us</div>
      </div>
    </div>
  );
};

export default Home;
