import { useEffect, useRef } from 'react'

const services = [
  {
    image: '/images/nutrition.png',
    title: 'Nutrition',
    description: 'If you want us to stay with your babies for the whole day long, we will do it with all the love and care.',
    color: '#ef7f1a'
  },
  {
    image: '/images/kids_fitness.png',
    title: 'Kids Fitness',
    description: 'Just book an appointment and we will be there to take care of your angels anytime, for any long.',
    color: '#a979b3'
  },
  {
    image: '/images/fun_fitness.png',
    title: 'Fun & Fitness',
    description: 'When the answer to fatigue is fitness, Fun is the way to get there. Make your little one your partner in workout!',
    color: '#b7ce26'
  }
]

export default function Services() {
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
    <section className="services section-padding" id="services" ref={sectionRef}>
      <div className="container">
        <div className="text-center animate-in">
          <h2 className="section-title">We Understand Every Parent Need</h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              className="service-card animate-in"
              key={index}
              style={{ transitionDelay: `${index * 0.15}s` }}
              id={`service-card-${index}`}
            >
              <div className="service-card-image">
                <img src={service.image} alt={service.title} loading="lazy" />
              </div>
              <div className="service-card-body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
