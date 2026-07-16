import { useEffect, useRef } from 'react'

const packages = [
  {
    id: 'plan_active_play',
    name: 'Active Playmate',
    duration: '15 Hour Active Play Package',
    price: 2999,
    originalPrice: 4499,
    discount: '33% OFF',
    tagline: 'Flexible on-demand hourly babysitting & active play',
    features: [
      '15 Hours of certified active caretaker sessions',
      'Fully vetted, background-checked playmates',
      'Structured indoor & outdoor kids fitness play',
      'Support with preparing healthy kid snacks/meals',
      '24-hour advance flexible booking notice'
    ],
    popular: false,
    colorClass: 'pkg-purple'
  },
  {
    id: 'plan_society_fitness',
    name: 'Society Active Club',
    duration: 'Monthly Group Fitness Plan',
    price: 1999,
    originalPrice: 2999,
    discount: '33% OFF',
    tagline: 'Weekly parent-child group workouts in your society',
    features: [
      '8 Group parent-child sessions (2 per week)',
      'Led by expert fitness coaches Sachin & Sneha',
      'Obstacle courses, running & agility drills (from video)',
      'Healthy bonding & socializing in society play zones',
      'Free entry to monthly kids fitness challenges'
    ],
    popular: true,
    colorClass: 'pkg-orange'
  },
  {
    id: 'plan_elite_nanny',
    name: 'Elite Nanny & Nutrition',
    duration: 'Monthly Full-Day Care Plan',
    price: 14999,
    originalPrice: 24999,
    discount: '40% OFF',
    tagline: 'Dedicated full-day helper with fitness & nutrition focus',
    features: [
      'Full-day dedicated certified helper (8 hrs/day, 6 days/wk)',
      'Custom pediatric meal prep & nutrition planning',
      'Daily structured active kids play & stretching',
      'Rigorous background checks & interview matching',
      '1-on-1 monthly dietician review call for child growth',
      '24/7 priority customer support helpline'
    ],
    popular: false,
    colorClass: 'pkg-blue'
  }
]

export default function Packages({ onSelectPackage }) {
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
    <section className="packages-section section-padding" id="packages" ref={sectionRef}>
      <div className="container">
        <div className="text-center animate-in">
          <div>
            <span className="section-subtitle-badge">Membership Packages</span>
          </div>
          <h2 className="section-title">Flexible Plans for Every Family</h2>
          <p className="section-desc">
            Choose a plan that fits your family's fitness goals. Build your health and bond with your life through professional, guided coaching.
          </p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <div
              className={`package-card ${pkg.popular ? 'popular' : ''} ${pkg.colorClass} animate-in`}
              key={pkg.id}
              style={{ transitionDelay: `${index * 0.15}s` }}
              id={`package-card-${pkg.id}`}
            >
              {pkg.popular && (
                <div className="popular-badge">
                  <span>MOST POPULAR</span>
                </div>
              )}
              
              <div className="package-header">
                <span className="package-duration">{pkg.duration}</span>
                <h3 className="package-name">{pkg.name}</h3>
                <p className="package-tagline">{pkg.tagline}</p>
              </div>

              <div className="package-price-box">
                <div className="price-row">
                  <span className="original-price">₹{pkg.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="discount-tag">{pkg.discount}</span>
                </div>
                <div className="current-price-row">
                  <span className="currency-symbol">₹</span>
                  <span className="price-value">{pkg.price.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="package-divider"></div>

              <ul className="package-features">
                {pkg.features.map((feature, i) => (
                  <li key={i}>
                    <svg className="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className="btn-package-buy"
                onClick={() => onSelectPackage({ ...pkg, type: 'package' })}
                id={`btn-buy-${pkg.id}`}
              >
                <span>Buy Plan Now</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
