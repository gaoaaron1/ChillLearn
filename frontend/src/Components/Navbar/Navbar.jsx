import React, { useContext, useState } from 'react';
import './Navbar.css'; // Import CSS
import logo from '../Assets/logo2.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  //======================== USE STATES ========================//

  const { getTotalCartItems } = useContext(ShopContext);
  const [expanded, setExpanded] = useState(true); // Manage sidebar state

  //======================== DECLARATIVE ========================//

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

  // Menu items from Navbar
  const menuItems = [
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <div className="sidebar2-container">
      {/* Top Vertical Sidebar */}
      <nav
        id="sidebar2"
        className={`sidebar2 ${expanded ? 'expanded' : ''}`}
      >
        <ul className="nav-grid">

          <div className="nav-logo">
            {/* Make the logo clickable and navigate to the Shop (Home) page */}
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          <ul className={`nav-menu`}>
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}

            <li className="dropdown">
            <Link to="/grades">
                Grades K-12
                <svg
                  className="arrow"
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  style={{ marginLeft: '10px' }}
                >
                  <path d="M0 0l6 8 6-8H0z" fill="black" />
                </svg>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/kindergarten">
                    <button className="category-button">Kindergarten</button>
                  </Link>
                </li>
                <li>
                  <Link to="/grade1">
                    <button className="category-button">Grade 1</button>
                  </Link>
                </li>
                <li>
                  <Link to="/grade2">
                    <button className="category-button">Grade 2</button>
                  </Link>
                </li>
                {/* Add more grades as needed */}
              </ul>
            </li>

          </ul>

          <div className="nav-login-cart">
            <Link to="/cart" className="cart-button">
              <button className="cart-icon-button">
                <img src={cart_icon} alt="Cart" />
              </button>
            </Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          </div>

        </ul>
      </nav>

      {/* Toggle Button */}
      <button
        className="toggle-btn"
        style={{ top: expanded ? '125px' : '10px' }}
        onClick={toggleSidebar}
      >
        <span id="arrow-icon">{expanded ? '▲' : '▼'}</span>
      </button>
    </div>
  );
};

export default Navbar; 
