import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you for your enquiry! We'll reach out to ${email} soon.`)
    setEmail('')
  }

  return (
    <footer className="footer" id="contact">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-about">
              <p>
                Build N' Bond – Fitness Center is a professional fitness training center
                for your little one. Make your little one your partner in workout with
                Build N' Bond.
              </p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook" id="social-facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" id="social-instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" id="social-youtube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Address Column */}
            <div className="footer-col">
              <h3>Address</h3>
              <div className="footer-contact-item">
                <div className="icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <p>
                  Build N' Bond - Senate Business Center,
                  Rajamantri Path, Erandwane, Pune-411004
                </p>
              </div>
              <div className="footer-contact-item">
                <div className="icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <p>+91 937-111-6165<br />+91 998-742-6272</p>
              </div>
            </div>

            {/* Join Us Column */}
            <div className="footer-col">
              <h3>Join With Us</h3>
              <p style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
                Thank you for visting us.
              </p>
              <div className="footer-newsletter">
                <form onSubmit={handleSubmit} className="input-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    id="footer-email-input"
                  />
                  <button type="submit" id="footer-enquiry-btn">Enquiry</button>
                </form>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ marginTop: '1.5rem' }}>Quick Links</h3>
                <ul>
                  <li><a href="#home">→ Home</a></li>
                  <li><a href="#services">→ Services</a></li>
                  <li><a href="#how-we-work">→ How We Work</a></li>
                  <li><a href="#consultants">→ Our Team</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>
            Copyright © 2025 Build N' Bond - All Rights Reserved. Created By:{' '}
            <a href="http://www.uprankdigital.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>
              Up Rank Digital
            </a>
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
