import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './Header.css';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <div className="logo-mark">{"</>"}</div>
          <div className="logo-text">
            <span className="logo-title">Code AI Checker</span>
            <span className="logo-subtitle">AI Code Detector</span>
          </div>
        </Link>

        <nav className="nav">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <NavLink to="/how-it-works" className="nav-link">
            How It Works
          </NavLink>
          <NavLink to="/faq" className="nav-link">
            FAQ
          </NavLink>
          <NavLink to="/blog" className="nav-link">
            Blog
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="theme-icon">{isDark ? '🌙' : '☀️'}</span>
          </button>
          <Link to="/" className="btn btn-primary header-cta">
            Check Code Free
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

