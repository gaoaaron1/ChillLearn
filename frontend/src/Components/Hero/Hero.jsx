import React from 'react';
import './Hero.css';
import hero_img from '../Assets/home_banner.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const arrow_icon_placeholder = "https://via.placeholder.com/40x40.png?text=%E2%86%92"; // Arrow icon placeholder
const hero_image = hero_img;

function Hero() {
    return (
        <div className="hero">
            <div className="hero-left">
                <h2>Master Your Alberta Curriculum</h2>
                <div>
                    <p>Learning Resources</p>
                    <p>For Students K-12</p>
                </div>
                <div className="hero-latest-btn">
                    {/* Wrap the button with Link to redirect to grades page */}
                    <Link to="/grades" className="start-studying-btn">
                        <div>Start Studying Now</div>
  
                    </Link>
                </div>
            </div>
            <div className="hero-right">
                <img className="hero-image" src={hero_image} alt="hero visual" />
            </div>
        </div>
    );
}

export default Hero;
