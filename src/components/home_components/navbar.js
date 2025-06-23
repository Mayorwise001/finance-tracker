import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../home_components/styles/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.activeElement.blur();
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar desktop">
        <div className="logo">
          <img src="./NewLogo.png" alt="Logo" className="logo-img" />
          <span className="logo-text">Expense Tracker Expert</span>
        </div>
        <ul className="nav-links">
          <li><Link to="/" className="link-clean">Home</Link></li>
          <li><a href="#pricing" className="link-clean">Pricing</a></li>
          <li><a href="#testimonial" className="link-clean">Testimonials</a></li>
           <li onClick={closeSidebar}><Link to="/login" className="link-clean">Login</Link></li>
          <li><a href="#signup" className="link-clean">Sign Up</a></li>
        </ul>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`mobile-layout ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>☰</button>

        <div className={`sidebar ${isOpen ? 'active' : ''}`}>
          <ul>
            <li onClick={closeSidebar}><Link to="/" className="link-clean">Home</Link></li>
            <li onClick={closeSidebar}><a href="#pricing" className="link-clean">Pricing</a></li>
            <li onClick={closeSidebar}><a href="#testimonial" className="link-clean">Testimonials</a></li>
            <li onClick={closeSidebar}><Link to="/login" className="link-clean">Login</Link></li>
            <li onClick={closeSidebar}><Link to="/signup" className="link-clean">Sign Up</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
