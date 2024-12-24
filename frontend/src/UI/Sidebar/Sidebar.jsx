import React, { useState } from 'react';
import './Sidebar.css'; // Import CSS

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false); // Manage sidebar state

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const scrollToElement = (targetId, offset = 90) => {
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

  return (
    <div className="sidebar-container">
      {/* Sidebar */}
      <nav
        id="sidebar"
        className={`sidebar ${expanded ? 'expanded' : ''}`}
      >
        <ul className="nav flex-column mt-3">
          {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'].map((item, index) => (
            <li className="nav-item" key={index}>
              <a
                className="nav-link"
                href="#"
                onClick={() => scrollToElement(`heading${index + 1}`)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Toggle Button */}
      <button
        className="toggle-btn"
        style={{ left: expanded ? '250px' : '10px' }} // Adjust position based on state
        onClick={toggleSidebar}
      >
        <span id="arrow-icon">{expanded ? '◀' : '▶'}</span>
      </button>
    </div>
  );
};

export default Sidebar;
