import React from 'react';
import './CSS/About.css'; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Welcome to ChillLearn</h1>
        <p>Your go-to platform for practice exams and study resources.</p>
      </header>
      <section className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            ChillLearn is dedicated to helping students succeed by providing a
            comprehensive platform for practice exams and study materials. Whether
            you're preparing for your next big exam or just looking to brush up on
            key concepts, ChillLearn offers the tools to help you perform at your best.
          </p>
        </div>
        <div className="about-section">
          <h2>Features</h2>
          <ul>
            <li>Access to a wide range of practice exams for various subjects</li>
            <li>Study materials and resources to enhance your learning</li>
            <li>Track your progress and performance over time</li>
            <li>Convenient and easy-to-use interface</li>
            <li>Customizable study plans</li>
          </ul>
        </div>
        <div className="about-section">
          <h2>Why Choose ChillLearn?</h2>
          <p>
            We understand the challenges students face when preparing for exams. Our
            platform is designed to make studying more efficient, organized, and
            enjoyable. With ChillLearn, you can focus on what really matters: mastering
            the material and achieving your academic goals.
          </p>
        </div>
      </section>
      <footer className="about-footer">
        <p>© 2024 ChillLearn. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
