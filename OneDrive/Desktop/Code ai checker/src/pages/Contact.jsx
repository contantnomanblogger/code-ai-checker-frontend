import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Stub only – integrate with your backend/email service later
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact">
      <section className="hero-section">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Have questions, feedback, or partnership ideas? We’d love to hear from you.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <div>
                <h2 className="info-title">Let’s Talk</h2>
                <p className="info-description">
                  Whether you’re an educator, developer, or organization, Code AI Checker can help you
                  understand how AI is being used in code. Reach out and we’ll get back to you as soon as possible.
                </p>
              </div>

              <div className="contact-methods">
                <div className="contact-method">
                  <span className="method-icon">📧</span>
                  <div className="method-content">
                    <p className="method-title">Email</p>
                    <a href="mailto:contact@codeaichecker.com" className="method-link">
                      contact@codeaichecker.com
                    </a>
                    <p className="method-text">We usually respond within one business day.</p>
                  </div>
                </div>

                <div className="contact-method">
                  <span className="method-icon">💼</span>
                  <div className="method-content">
                    <p className="method-title">Partnerships & Enterprise</p>
                    <p className="method-text">
                      Looking to integrate AI code detection into your platform or workflow? Let’s discuss custom plans.
                    </p>
                  </div>
                </div>
              </div>

              <div className="social-section">
                <p className="social-title">Connect with us</p>
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
            </div>

            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell us how we can help…"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-submit">
                  <button type="submit" className="btn btn-primary btn-large">
                    Send Message
                  </button>
                </div>

                {submitted && (
                  <div className="form-success">
                    Thank you! Your message has been sent. We’ll be in touch soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

