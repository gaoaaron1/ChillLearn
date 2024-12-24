import React, { useContext, useState } from 'react';
import './Navbar.css'; // Import CSS
import logo from '../Assets/logo2.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { useGradeContext } from '../../Context/GradeContext'; 

const Navbar = () => {
  const [expanded, setExpanded] = useState(true); // Manage sidebar state
  const [menuOpen, setMenuOpen] = useState(false); // Manage mobile menu visibility
  const { selectedGrade, setSelectedGrade } = useGradeContext(); 

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the mobile menu
  };

  const scrollToElement = (targetId, offset = 50) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetPosition = targetElement.offsetTop - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setExpanded(false); // Collapse sidebar after navigation
    }
  };

  const menuItems = [
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const handleGradeSelection = (grade) => {
    setSelectedGrade(grade); // Update the grade state in GradeContext
  };

  return (
    <div className="sidebar2-container">
      {/* Top Vertical Sidebar */}
      <nav id="sidebar2" className={`sidebar2 ${expanded ? 'expanded' : ''}`}>
        <ul className="nav-grid">
          <div className="nav-logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}

            <li className="dropdown">
              <Link to="/grades">
                Grades K-12
                <svg className="arrow" width="12" height="8" viewBox="0 0 12 8" style={{ marginLeft: '10px' }}>
                  <path d="M0 0l6 8 6-8H0z" fill="black" />
                </svg>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/kindergarten">
                    <button className="category-button" onClick={() => handleGradeSelection('kindergarten')}>Kindergarten</button>
                  </Link>
                </li>
                <li>
                  <Link to="/grade1">
                    <button className="category-button" onClick={() => handleGradeSelection('grade1')}>Grade 1</button>
                  </Link>
                </li>
                <li>
                  <Link to="/grade2">
                    <button className="category-button" onClick={() => handleGradeSelection('grade2')}>Grade 2</button>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </ul>
      </nav>

      {/* Toggle Button for Desktop */}
      <button
        className="toggle-btn"
        style={{ top: expanded ? '125px' : '10px' }}
        onClick={toggleSidebar}
      >
        <span id="arrow-icon">{expanded ? '▲' : '▼'}</span>
      </button>

      {/* Hamburger Icon for Mobile */}
      <button className="hamburger" onClick={toggleMobileMenu}>
        ☰
      </button>
    </div>
  );
};

export default Navbar;
