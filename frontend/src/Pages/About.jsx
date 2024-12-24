import React, { useEffect } from 'react';
import Sidebar from '../UI/Sidebar/Sidebar';
import './CSS/About.css'; // Import CSS for styles
import AboutImage from '../Components/Assets/About.jpg'; // Import the image

const About = () => {
    // Scroll to the top when the component is mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Empty dependency array to ensure it runs only once on mount
    return (
        <div className="about-wrapper">
            {/* Sidebar Component */}
            <Sidebar />

            {/* Main Content */}
            <div className="about-container">
                <h1>About Us</h1>
                <section className="about-section">
                    <h2>Our Story</h2>
                    <p>
                        At JUSME, we believe that fashion is more than just clothing—it's an expression of who you are.
                        Our journey began with a simple idea: to provide high-quality, stylish apparel that empowers
                        individuals to express their unique personalities.
                    </p>
                    <img src={AboutImage} alt="Our Story" className="about-image" />
                </section>

                <section className="mission-vision">
                    <div className="mission">
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to inspire and empower people through fashion. We strive to create products
                            that not only look great but also feel great to wear.
                        </p>
                    </div>
                    <div className="vision">
                        <h2>Our Vision</h2>
                        <p>
                            We envision a world where everyone has the freedom to express themselves through their style.
                            Our goal is to make fashionable clothing accessible to everyone, regardless of their budget.
                        </p>
                    </div>
                </section>

                <section className="values-section">
                    <h2>Our Values</h2>
                    <ul className="values-list">
                        <li>Quality: We prioritize high-quality materials and craftsmanship.</li>
                        <li>Innovation: We embrace creativity and stay ahead of trends.</li>
                        <li>Inclusivity: We celebrate diversity and welcome all styles.</li>
                        <li>Sustainability: We are committed to environmentally friendly practices.</li>
                    </ul>
                </section>

                <section className="team-section">
                    <h2>Meet Our Team</h2>
                    <div className="team-members">
                        <div className="team-member">
                            <h3>Aaron Gao</h3>
                            <p>Web Developer</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
