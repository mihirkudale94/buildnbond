import { useState, useEffect, useRef } from 'react'

const faqs = [
  {
    question: "What age groups do you cater to?",
    answer: "We customize our fitness programs and nutrition consulting for toddlers, kids, and teens. Our Mom & Me workshops are specially designed for younger kids (ages 2-6) and their parents, while our personal training programs are tailored for kids ages 7 and up."
  },
  {
    question: "Are the consultations online or in-person?",
    answer: "We offer both! You can book online video consultations through our scheduler, which allows you to receive expert nutrition guidance and home fitness plans from the comfort of your own home. We also host in-person group sessions and workshops."
  },
  {
    question: "Do I need any special equipment for the workouts?",
    answer: "No special equipment is required! Most of our fitness routines focus on bodyweight exercises, active play, coordination, and functional movements that can be done anywhere with minimal space."
  },
  {
    question: "What makes Build N Bond different from standard gyms?",
    answer: "Unlike standard gyms, we focus entirely on child fitness, parent-child bonding, and family nutrition. Our mission is to make health and fitness an enjoyable, shared daily routine rather than a chore to check off your list."
  }
]

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null)
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

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="faq-section section-padding" id="faqs" ref={sectionRef}>
      <div className="container">
        <div className="text-center animate-in">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle" style={{ color: 'var(--color-gray-600)', maxWidth: '600px', margin: '1rem auto 3rem' }}>
            Find answers to common questions about our sessions, consultations, and fitness philosophy.
          </p>
        </div>

        <div className="faq-accordion animate-in" style={{ transitionDelay: '0.2s' }}>
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index
            return (
              <div 
                className={`faq-item ${isOpen ? 'open' : ''}`} 
                key={index}
                id={`faq-item-${index}`}
              >
                <button 
                  className="faq-question-btn" 
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className={`faq-icon ${isOpen ? 'rotate' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                <div 
                  className="faq-answer-wrapper"
                  style={{
                    maxHeight: isOpen ? '200px' : '0',
                    opacity: isOpen ? 1 : 0,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
