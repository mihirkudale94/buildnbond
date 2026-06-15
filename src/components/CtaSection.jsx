export default function CtaSection() {
  return (
    <section className="cta-section section-padding" id="cta">
      <div className="container">
        <h2>Ready to Start Your Fitness Journey?</h2>
        <p>
          Book an online consultation with our expert trainers and nutritionists.
          Transform your family's health and bond through fitness today!
        </p>
        <a
          href="https://app.pranacare.co.in/apt/home?returnUrl=%2Fbook-appointment%2F58&source=wellness"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta"
          id="cta-book-now"
        >
          Online Consultation
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>
  )
}
