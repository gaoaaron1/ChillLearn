import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Import CSS
import logo from '../Assets/logo2.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { useGradeContext } from '../../Context/GradeContext';

const Navbar = () => {
  const [expanded, setExpanded] = useState(true); // Manage sidebar state
  const [menuOpen, setMenuOpen] = useState(false); // Manage mobile menu visibility
  const [dropdownOpen, setDropdownOpen] = useState(false); // Manage dropdown menu state
  const [subjectsData, setSubjectsData] = useState(null); // State to store subjects data
  const { selectedGrade, setSelectedGrade } = useGradeContext();

  useEffect(() => {
    // Fetch the subjects data from GitHub
    const fetchSubjectsData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/gaoaaron1/chill-learn-data/main/subjectData.json');
        const data = await response.json();
        setSubjectsData(data);
      } catch (error) {
        console.error("Error fetching subjects data:", error);
      }
    };

    fetchSubjectsData();
  }, []);

  // If subjectsData hasn't been loaded yet, show a loading state
  if (!subjectsData) {
    return <div>Loading...</div>;
  }

  // Dynamically generate grade options from subjectsData
  const gradeOptions = Object.keys(subjectsData);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the mobile menu
  };

  const closeMobileMenu = () => {
    setMenuOpen(false); // Close the mobile menu after selecting an item
  };

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
            <li>
              <Link to="/about" onClick={closeMobileMenu}>About</Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMobileMenu}>Contact Us</Link>
            </li>
            <li>
              <Link to="/donate" onClick={closeMobileMenu}>Donate</Link>
            </li>

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
                  {gradeOptions.map((grade) => (
                    <li key={grade}>
                      <Link 
                        to={`/${grade}`} 
                        onClick={() => { handleGradeSelection(grade); closeMobileMenu(); }}
                      >
                        {grade === 'kindergarten' ? 'Kindergarten' : `Grade ${grade.replace('grade', '')}`}
                      </Link>
                    </li>
                  ))}
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
