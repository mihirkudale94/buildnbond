import { useEffect, useRef } from 'react'

const dieticians = [
  {
    id: 'diet_riddhi',
    name: 'Riddhi Sen, RD',
    designation: 'Senior Clinical Dietician & Family Nutrition Expert',
    image: '/images/dietician_riddhi.png',
    education: 'M.Sc. in Clinical Nutrition & Dietetics, Registered Dietician (RD)',
    experience: '8+ Years of Experience in Pediatric & Maternal Nutrition',
    price: 999,
    originalPrice: 1499,
    specialities: [
      'Picky Eater Coaching',
      'Childhood Weight Management',
      'Food Allergies & Intolerances',
      'Maternal & Postpartum Nutrition'
    ],
    bio: 'Riddhi specializes in making healthy eating fun and stress-free for kids. She works closely with parents to develop simple, practical nutrition plans that accommodate even the most stubborn, picky eaters.'
  },
  {
    id: 'diet_neha',
    name: 'Dr. Neha Sharma',
    designation: 'Consultant Pediatric Nutritionist & Metabolic Specialist',
    image: '/images/dietician_neha.png',
    education: 'Ph.D. in Human Nutrition, Certified Pediatric Diet Specialist',
    experience: '12+ Years of Experience in Clinical Diagnostics & Therapy',
    price: 1499,
    originalPrice: 2199,
    specialities: [
      'Pediatric Diabetes & Gut Health',
      'PCOD & Hormonal Management',
      'Juvenile Metabolic Reversal',
      'Sports Nutrition for Young Athletes'
    ],
    bio: 'Dr. Neha focuses on holistic metabolic health. Her clinical, evidence-based approach helps kids, teens, and young sports professionals achieve peak physical and mental performance through natural food integration.'
  }
]

export default function Dieticians({ onSelectDietician }) {
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
    <section className="dieticians-section section-padding" id="dieticians" ref={sectionRef}>
      <div className="container">
        <div className="text-center animate-in">
          <div>
            <span className="section-subtitle-badge">Nutrition & Diet Consulting</span>
          </div>
          <h2 className="section-title">Meet Our Expert Dieticians</h2>
          <p className="section-desc">
            Connect with India's leading clinical nutritionists. Schedule an online video consultation, pay securely via Razorpay, and receive customized health guides.
          </p>
        </div>

        <div className="dieticians-grid">
          {dieticians.map((diet, index) => (
            <div
              className="dietician-card animate-in"
              key={diet.id}
              style={{ transitionDelay: `${index * 0.2}s` }}
              id={`dietician-card-${diet.id}`}
            >
              <div className="dietician-image-wrapper">
                <img src={diet.image} alt={diet.name} loading="lazy" />
                <span className="experience-badge">{diet.experience.split(' in ')[0]}</span>
              </div>

              <div className="dietician-content">
                <div className="dietician-header">
                  <h3 className="dietician-name">{diet.name}</h3>
                  <span className="dietician-designation">{diet.designation}</span>
                </div>

                <p className="dietician-education">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                  </svg>
                  <span>{diet.education}</span>
                </p>

                <p className="dietician-bio">{diet.bio}</p>

                <div className="dietician-specialities">
                  <h4>Key Focus Areas:</h4>
                  <div className="speciality-tags">
                    {diet.specialities.map((spec, i) => (
                      <span className="tag" key={i}>{spec}</span>
                    ))}
                  </div>
                </div>

                <div className="dietician-footer">
                  <div className="dietician-fee">
                    <span className="fee-label">Consultation Fee:</span>
                    <div className="fee-values">
                      <span className="original-fee">₹{diet.originalPrice}</span>
                      <span className="current-fee">₹{diet.price}</span>
                    </div>
                  </div>

                  <button
                    className="btn-dietician-book"
                    onClick={() => onSelectDietician({ ...diet, type: 'dietician' })}
                    id={`btn-book-${diet.id}`}
                  >
                    <span>Book Session & Pay</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
