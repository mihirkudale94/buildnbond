import { useEffect, useRef } from 'react'

const testimonials = [
  {
    quote: "The Mom & Me Fitness Workshop was an absolute blast! My daughter loved exercising with me and now looks forward to physical play. Sachin and Sneha are amazing!",
    author: "Priyanka M.",
    relation: "Mom of Anaya (5 yrs)",
    rating: 5,
    tag: "Fitness Workshop"
  },
  {
    quote: "Dr. Sneha's nutrition guidance completely changed our family's eating habits. My son is active, energetic, and actually enjoys green vegetables now!",
    author: "Amit K.",
    relation: "Dad of Kabir (8 yrs)",
    rating: 5,
    tag: "Nutrition Consulting"
  },
  {
    quote: "Goal-oriented fitness and absolute fun! My kids have developed healthy habits, better balance, and love the energy of the group training sessions.",
    author: "Neha S.",
    relation: "Mom of Rohan (10 yrs) & Diya (7 yrs)",
    rating: 5,
    tag: "Kids Fitness"
  }
]

export default function Testimonials() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-in')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="testimonials section-padding" id="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="text-center animate-in">
          <h2 className="section-title">What Parents Say</h2>
          <p className="section-subtitle" style={{ color: 'var(--color-gray-600)', maxWidth: '600px', margin: '1rem auto 3rem' }}>
            Hear from families who have built healthy habits and bonded through our fitness and nutrition programs.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <div
              className="testimonial-card animate-in"
              key={index}
              style={{ transitionDelay: `${index * 0.15}s` }}
              id={`testimonial-card-${index}`}
            >
              <div className="testimonial-tag">{t.tag}</div>
              <div className="testimonial-stars">
                {[...Array(t.rating)].map((_, i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ color: '#ef7f1a' }}
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <h4>{t.author}</h4>
                <span>{t.relation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
