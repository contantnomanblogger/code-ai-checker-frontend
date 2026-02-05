import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">
              <span className="logo-icon">🤖</span>
              Code AI Checker
            </h3>
            <p className="footer-description">
              Free online tool to detect AI-generated code. Analyze code patterns and determine if code was written by AI or humans.
            </p>
            <div className="social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                𝕏
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                GH
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                in
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-links">
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:contact@codeaichecker.com">
                  contact@codeaichecker.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Code AI Checker. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
