import { useEffect, useRef } from 'react'

const consultants = [
  {
    name: 'Sachin Raje',
    image: '/images/sachin.png',
    bio: "He believes that – BUILD your HEALTH and BOND WITH your LIFE !! BUILD your HEALTH by doing any form of exercise and BOND it with your life.This could be the most enjoyable routine in daily life which will help you to stay healthy & energetic."
  },
  {
    name: 'Sneha Raje',
    image: '/images/sneha.png',
    bio: "She believes that – Fitness should not be a task to tick off on your day’s To-do list. It should be ‘Fun- Filled time for Self-care’ that you Crave for. Kids are bundles of radiating energy. Make them your partner in Workouts, not your excuse to skip exercise."
  }
]

export default function Consultants() {
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
    <section className="consultants section-padding" id="consultants" ref={sectionRef}>
      <div className="container">
        <div className="text-center animate-in">
          <h2 className="section-title">Meet Our Consultant</h2>
        </div>

        <div className="consultants-grid">
          {consultants.map((consultant, index) => (
            <div
              className="consultant-card animate-in"
              key={index}
              style={{ transitionDelay: `${index * 0.2}s` }}
              id={`consultant-card-${index}`}
            >
              <div className="consultant-image">
                <img src={consultant.image} alt={consultant.name} loading="lazy" />
                <div className="overlay"></div>
                <div className="consultant-name-overlay">
                  <h3>{consultant.name}</h3>
                </div>
              </div>
              <div className="consultant-body">
                <p>{consultant.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
