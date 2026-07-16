import { useEffect, useRef } from 'react'

const stats = [
  {
    value: '10,000+',
    label: 'Happy Families',
    desc: 'Empowered with lifestyle habits',
    color: '#008dd2'
  },
  {
    value: '15+',
    label: 'Certified Experts',
    desc: 'Pediatric trainers & clinical dieticians',
    color: '#b7ce26'
  },
  {
    value: '98%',
    label: 'Success Rate',
    desc: 'Measurable health & fitness improvements',
    color: '#ef7f1a'
  },
  {
    value: '5+ Years',
    label: 'Active Trust',
    desc: 'Promoting child health since 2021',
    color: '#a979b3'
  }
]

export default function StatsSection() {
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
    <section className="stats-section section-padding" id="stats" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              className="stat-card animate-in"
              key={index}
              style={{ transitionDelay: `${index * 0.1}s`, borderLeftColor: stat.color }}
              id={`stat-card-${index}`}
            >
              <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
              <h3 className="stat-label">{stat.label}</h3>
              <p className="stat-desc">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
