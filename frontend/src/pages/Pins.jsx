import React from "react";
import "../css/About.css";

export default function Pins() {
  return (
    <div className="about-page">
      <div className="about-container shadow-lg">
        <h1 className="about-title">About Our Blog</h1>
        <p className="about-description">
          Welcome to our blog! Here, we share insightful articles, tutorials,
          and resources on web development, technology trends, and creative
          ideas. Our goal is to inspire and empower readers to learn and grow
          in the digital world.
        </p>

        <h2 className="about-subtitle">Our Mission</h2>
        <p className="about-description">
          We aim to provide high-quality content that is both informative and
          engaging. Whether you're a beginner or a seasoned developer, our
          articles are designed to give you practical knowledge you can use in
          real-world projects.
        </p>

        <h2 className="about-subtitle">Connect With Us</h2>
        <p className="about-description">
          Follow us on social media and subscribe to our newsletter to stay
          updated with the latest posts. We love hearing from our readers —
          your feedback helps us improve!
        </p>
      </div>
    </div>
  );
}
