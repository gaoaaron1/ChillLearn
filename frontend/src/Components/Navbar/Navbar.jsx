import React, { useState } from 'react';
import './Navbar.css'; // Import CSS
import logo from '../Assets/logo2.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { useGradeContext } from '../../Context/GradeContext';

const Navbar = () => {
  const [expanded, setExpanded] = useState(true); // Manage sidebar state
  const [menuOpen, setMenuOpen] = useState(false); // Manage mobile menu visibility
  const [dropdownOpen, setDropdownOpen] = useState(false); // Manage dropdown menu state
  const { selectedGrade, setSelectedGrade } = useGradeContext();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the mobile menu
  };

  const closeMobileMenu = () => {
    setMenuOpen(false); // Close the mobile menu after selecting an item
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
    setDropdownOpen(false); // Close the dropdown menu after selecting a grade
  };

  // Function to toggle dropdown on mobile
  const handleGradeToggle = (event) => {
    event.preventDefault(); // Prevent default behavior (navigation)
    setDropdownOpen(!dropdownOpen); // Toggle dropdown on mobile
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
                <Link to={item.path} onClick={closeMobileMenu}>
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Grades K-12 dropdown */}
            <li
              className="dropdown"
              onMouseEnter={() => setDropdownOpen(true)} // Show dropdown on hover (desktop)
              onMouseLeave={() => setDropdownOpen(false)} // Hide dropdown when hover ends
            >
              <Link
                to={window.innerWidth > 768 ? '/grades' : '#'} // Use link for desktop, prevent navigation on mobile
                onClick={window.innerWidth <= 768 ? handleGradeToggle : null} // Toggle dropdown on mobile
              >
                Grades K-12
                <svg className="arrow" width="12" height="8" viewBox="0 0 12 8" style={{ marginLeft: '10px' }}>
                  <path d="M0 0l6 8 6-8H0z" fill="black" />
                </svg>
              </Link>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/kindergarten" onClick={() => { handleGradeSelection('kindergarten'); closeMobileMenu(); }}>
                      Kindergarten
                    </Link>
                  </li>
                  <li>
                    <Link to="/grade1" onClick={() => { handleGradeSelection('grade1'); closeMobileMenu(); }}>
                      Grade 1
                    </Link>
                  </li>
                  <li>
                    <Link to="/grade2" onClick={() => { handleGradeSelection('grade2'); closeMobileMenu(); }}>
                      Grade 2
                    </Link>
                  </li>
                  <li>
                    <Link to="/grade7" onClick={() => { handleGradeSelection('grade2'); closeMobileMenu(); }}>
                      Grade 7
                    </Link>
                  </li>    
                  <li>
                    <Link to="/grade9" onClick={() => { handleGradeSelection('grade2'); closeMobileMenu(); }}>
                      Grade 9
                    </Link>
                  </li>                
                </ul>
              )}
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
