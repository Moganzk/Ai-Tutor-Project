import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navLinks = user ? [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/profile', label: 'Profile' },
    { path: '/settings', label: 'Settings' }
  ] : [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/signin', label: 'Sign In' },
    { path: '/signup', label: 'Sign Up' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🧠 AI Tutor
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={isActive(link.path) ? 'active' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="nav-mobile">
          <ul className="nav-links-mobile">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={isActive(link.path) ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
