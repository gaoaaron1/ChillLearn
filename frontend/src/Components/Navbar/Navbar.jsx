import React, { useContext, useState } from 'react';
import './Navbar.css'; // Import CSS
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  //======================== USE STATES ========================//

  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [expanded, setExpanded] = useState(true); // Manage sidebar state
  const [openDropdown, setOpenDropdown] = useState(null); // State for dropdown

  
  //======================== DECLARATIVE ========================//

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleMenuItemClick = (menuItem) => {
    setMenu(menuItem);
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
    { name: "Shop", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
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
                    <img src={logo} alt="Logo" />
                    <p>JUSME</p>
        </div>

          <ul className={`nav-menu`}>
            
            {menuItems.map((item) => (
              <li key={item.name} onClick={() => handleMenuItemClick(item.name)}>
                <Link to={item.path}>{item.name}</Link>
                {menu === item.name && <hr />}
              </li>
            ))}
            <li className="dropdown" onClick={() => toggleDropdown("categories")}>
              <Link to="#">Categories
                <svg
                  className={`arrow ${openDropdown === "categories" ? "open" : ""}`}
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  style={{ marginLeft: '10px' }} 
                >
                  <path d="M0 0l6 8 6-8H0z" fill="black" />
                </svg>
              </Link>
              {openDropdown === "categories" && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/mens">
                      <button className="category-button">Mens</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/womens">
                      <button className="category-button">Womens</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/kids">
                      <button className="category-button">Kids</button>
                    </Link>
                  </li>
                </ul>
              )}
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
