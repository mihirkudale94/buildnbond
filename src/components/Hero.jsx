import { useState, useEffect } from 'react'

const slides = [
  {
    image: '/images/hero_slide_1.png',
    badge: 'Mom & Me Fitness Workshop',
    title: <>MOM &amp; ME<br /><span style={{ color: '#b7ce26' }}>FITNESS WORKSHOP</span></>,
    description: ''
  },
  {
    image: '/images/hero_slide_2.png',
    badge: 'Workout Partner',
    title: <>Make your little one<br />Your PARTNER in WORKOUT <br /> with <span style={{ color: '#008dd2' }}>BUILD</span> N' <span style={{ color: '#008dd2' }}>BOND</span></>,
    description: ''
  },
  {
    image: '/images/hero_slide_3.png',
    badge: 'Fatigue to Fitness',
    title: <><span style={{ color: '#ef7f1a' }}>When the answer to <br />FATIGUE is FITNESS</span><br />Fun is the way <br />to get there<span style={{ color: '#ef7f1a' }}> !</span></>,
    description: ''
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero" id="home">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge" key={`badge-${currentSlide}`}>
            <span className="dot"></span>
            {slides[currentSlide].badge}
          </div>
          <h1 key={`title-${currentSlide}`}>{slides[currentSlide].title}</h1>
          {slides[currentSlide].description && (
            <p key={`desc-${currentSlide}`}>{slides[currentSlide].description}</p>
          )}
          <div className="hero-buttons">
            <a href="#cta" className="btn-primary" id="hero-cta-primary">
              Online Consultation
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#services" className="btn-secondary" id="hero-cta-secondary">
              Our Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={index === currentSlide ? 'active' : ''}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            id={`hero-dot-${index}`}
          />
        ))}
      </div>
    </section>
  )
}
