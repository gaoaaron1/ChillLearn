import React, { useState } from 'react';
import './Sidebar2.css'; // Import CSS

const Sidebar2 = () => {
  const [expanded, setExpanded] = useState(true); // Manage sidebar state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu

  const toggleSidebar = () => {
    setExpanded(!expanded);
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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle the dropdown menu
  };

  return (
    <div className="sidebar2-container">
      {/* Top Vertical Sidebar */}
      <nav
        id="sidebar2"
        className={`sidebar2 ${expanded ? 'expanded' : ''}`}
      >
        <ul className="nav-grid">
          {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'].map((item, index) => (
            <li className="nav-item" key={index}>
              <a
                className="nav-link"
                href="#"
                onClick={() => {
                  if (item === 'Item 2') {
                    toggleDropdown(); // Toggle dropdown for Item 2
                  } else {
                    scrollToElement(`heading${index + 1}`);
                  }
                }}
              >
                {item}
              </a>
              {item === 'Item 2' && dropdownOpen && (
                <ul className="dropdown">
                  <li><a className="dropdown-link" href="#" onClick={() => scrollToElement('subheading1')}>Sub Item 1</a></li>
                  <li><a className="dropdown-link" href="#" onClick={() => scrollToElement('subheading2')}>Sub Item 2</a></li>
                  <li><a className="dropdown-link" href="#" onClick={() => scrollToElement('subheading3')}>Sub Item 3</a></li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Toggle Button */}
      <button
        className="toggle-btn"
        style={{ top: expanded ? '200px' : '10px' }}
        onClick={toggleSidebar}
      >
        <span id="arrow-icon">{expanded ? '▲' : '▼'}</span>
      </button>
    </div>
  );
};

export default Sidebar2;
