import React from 'react';
import './styles/footer.css'; // Create this CSS file or include in your global stylesheet
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footers = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Brand and Social Links */}
        <div className="footer-section social">
          <h3>Connect with us</h3>
          <div className="social-icons">
            <a href="https://facebook.com/yourhandle" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com/company/yourhandle" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-section nav-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#testimonial">Testimonials</a></li>
            <li><a href="#login">Login</a></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="footer-section copyright">
          <p>&copy; {new Date().getFullYear()} Mayorwise Technologies. All rights reserved.</p>
          <p>Built by <strong>Mayorwise Technologies</strong></p>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
