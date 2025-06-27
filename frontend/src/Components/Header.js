import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Bell, BookOpen, Calendar, Home, Info, Settings, LogIn, UserPlus, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const navLinks = user ? [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/resources', label: 'Resources', icon: <BookOpen size={18} /> },
    { path: '/reminders', label: 'Reminders', icon: <Calendar size={18} /> },
    { path: '/notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { path: '/about', label: 'About', icon: <Info size={18} /> }
  ] : [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/about', label: 'About', icon: <Info size={18} /> },
    { path: '/signin', label: 'Sign In', icon: <LogIn size={18} /> },
    { path: '/signup', label: 'Sign Up', icon: <UserPlus size={18} /> }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className={`header header-animated ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-content">
        <Link to="/" className="logo logo-animated">
          <span className="logo-gradient">🧠 AI Tutor</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={isActive(link.path) ? 'active nav-underline' : 'nav-underline'}
                >
                  <span className="nav-icon">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
            
            {user && (
              <li className="user-menu-container">
                <div 
                  className="user-info" 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || "User"} 
                      className="user-avatar" 
                    />
                  ) : (
                    <div className="user-avatar-placeholder">
                      {(user.displayName || user.email || "User").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span>{user.displayName || user.email.split('@')[0]}</span>
                  <ChevronDown size={16} className={`user-dropdown-icon ${isUserMenuOpen ? 'open' : ''}`} />
                </div>
                
                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <Link to="/profile" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                    <Link to="/settings" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                      <Settings size={16} />
                      <span>Settings</span>
                    </Link>
                    <hr className="dropdown-divider" />
                    <button onClick={handleLogout} className="dropdown-item logout-item">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
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
                  className={isActive(link.path) ? 'active nav-underline' : 'nav-underline'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="nav-icon">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
            
            {user && (
              <>
                <li>
                  <Link 
                    to="/profile" 
                    className={isActive('/profile') ? 'active nav-underline' : 'nav-underline'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="nav-icon"><User size={18} /></span>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/settings" 
                    className={isActive('/settings') ? 'active nav-underline' : 'nav-underline'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="nav-icon"><Settings size={18} /></span>
                    Settings
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    <LogOut size={18} />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
