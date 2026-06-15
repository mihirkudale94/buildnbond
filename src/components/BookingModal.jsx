import { useEffect } from 'react'

export default function BookingModal({ isOpen, onClose }) {
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  // Default Cal.com link (active team page).
  // Swap this with your own Cal.com link (e.g. https://cal.com/your-username/30min?embed=true)
  const calLink = "https://cal.com/calcom/30min?embed=true"

  return (
    <div className="booking-modal-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="booking-modal-close" onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="booking-modal-header">
          <h3>Schedule Online Consultation</h3>
          <p>Choose a convenient time slot from the calendar below</p>
        </div>

        <div className="booking-iframe-container">
          <iframe
            src={calLink}
            title="Cal.com Scheduler"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <div className="booking-modal-footer">
          <p>
            Powered by <strong>Cal.com</strong> — the modern, open-source scheduling infrastructure.
          </p>
        </div>
      </div>
    </div>
  )
}
