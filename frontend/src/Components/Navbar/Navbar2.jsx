import React, { useContext, useState } from 'react';
import './Navbar2.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar2 = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State for navbar expansion
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen); // Toggle navbar height
    };

    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    const handleMenuItemClick = (menuItem) => {
        setMenu(menuItem);
    };

    return (
        <div className={`navbar ${isNavbarOpen ? 'expanded' : ''}`}>
            <div className="nav-header">

                <div className="toggle-arrow" onClick={toggleNavbar}>
                    <svg
                        className={`arrow ${isNavbarOpen ? "open" : ""}`}
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                    >
                        <path d="M0 0l6 8 6-8H0z" fill="white" />
                    </svg>
                </div>
            </div>


            <div className="nav-logo" onClick={toggleNavbar}>
                    <img src={logo} alt="Logo" />
                    <p>JUSME</p>
                </div>

            <ul className={`nav-menu ${isNavbarOpen ? "open" : ""}`}>
                <li onClick={() => handleMenuItemClick("shop")}>
                    <Link to="/">Shop</Link>
                    {menu === "shop" && <hr />}
                </li>
                <li onClick={() => handleMenuItemClick("about")}>
                    <Link to="/about">About</Link>
                    {menu === "about" && <hr />}
                </li>
                <li onClick={() => handleMenuItemClick("contact")}>
                    <Link to="/contact">Contact</Link>
                    {menu === "contact" && <hr />}
                </li>
                <li className="dropdown" onClick={() => toggleDropdown("categories")}>
                    <Link to="#">Categories
                        <svg
                            className={`arrow ${openDropdown === "categories" ? "open" : ""}`}
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                        >
                            <path d="M0 0l6 8 6-8H0z" fill="white" />
                        </svg>
                    </Link>
                    {openDropdown === "categories" && (
                        <ul className="dropdown-menu">
                            <li><Link to="/mens">Mens</Link></li>
                            <li><Link to="/womens">Womens</Link></li>
                            <li><Link to="/kids">Kids</Link></li>
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
        </div>
    );
};

export default Navbar2;
