import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🧠 AI Tutor</h3>
          <p>Your intelligent learning companion</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📧 sammokogoti77@gmail.com</p>
          <p>🌍 <a href="https://www.linkedin.com/in/samwel-nyamwange-4a4744334" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 AI Tutor. Built with ❤️ by Samuel Mogaka Nyamwange</p>
      </div>
    </footer>
  );
};

export default Footer;
