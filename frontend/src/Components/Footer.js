import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, BookOpen, Calendar, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import './Footer.css';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { user } = useAuth();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="footer footer-animated">
      <button 
        className="scroll-to-top" 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
      
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">🧠 AI Tutor</h3>
          <p>Your intelligent learning companion powered by artificial intelligence. Personalized learning, anytime, anywhere.</p>
          <div className="footer-socials">
            <a href="mailto:sammokogoti77@gmail.com" className="footer-social" title="Email">
              <Mail size={20} />
            </a>
            <a href="https://www.linkedin.com/in/samwel-nyamwange-4a4744334" target="_blank" rel="noopener noreferrer" className="footer-social" title="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/Moganzk" target="_blank" rel="noopener noreferrer" className="footer-social" title="GitHub">
              <Github size={20} />
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            {!user ? (
              <>
                <li><Link to="/signin">Sign In</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/profile">My Profile</Link></li>
                <li><Link to="/settings">Settings</Link></li>
              </>
            )}
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Features</h4>
          <ul>
            <li>
              <Link to={user ? "/chat" : "/signup"}>
                <MessageCircle size={16} className="footer-icon" /> AI Chat Tutor
              </Link>
            </li>
            <li>
              <Link to={user ? "/resources" : "/signup"}>
                <BookOpen size={16} className="footer-icon" /> Learning Resources
              </Link>
            </li>
            <li>
              <Link to={user ? "/reminders" : "/signup"}>
                <Calendar size={16} className="footer-icon" /> Study Reminders
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} AI Tutor. Built with 
          <span className="footer-heart"><Heart size={16} fill="#ff6b6b" /></span> 
          by Samuel Mogaka Nyamwange
        </p>
      </div>
    </footer>
  );
};

export default Footer;
