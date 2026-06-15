import { useState, useEffect } from 'react'

export default function Navbar({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="main-nav">
        <div className="container">
          <a href="#" className="navbar-brand" id="brand-logo">
            <div className="navbar-logo-container">
              <img src="/images/logo.jpg" alt="Build N' Bond" className="navbar-logo" />
            </div>
          </a>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="nav-links">
            <a href="#home" onClick={closeMenu} className="active">Home</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#how-we-work" onClick={closeMenu}>How We Work</a>
            <a href="#consultants" onClick={closeMenu}>Our Team</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <a href="#" onClick={(e) => { closeMenu(); onBookClick(e); }} className="nav-cta">Book Now</a>
          </div>


          <button
            className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <div className={`nav-overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
    </>
  )
}
