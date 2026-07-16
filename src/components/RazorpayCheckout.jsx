import { useState, useEffect } from 'react'

export default function RazorpayCheckout({ isOpen, onClose, item, onPaymentSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    slot: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [paymentSuccessData, setPaymentSuccessData] = useState(null)

  // Disable body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Reset state
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        slot: ''
      })
      setError('')
      setPaymentSuccessData(null)
      setLoading(false)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !item) return null

  // Get today's date formatted as YYYY-MM-DD for min date attribute
  const todayStr = new Date().toISOString().split('T')[0]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Load Razorpay Script dynamically
  const loadScript = (src) => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement('script')
      script.src = src
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Form Validation
    if (!formData.name.trim()) return setError('Please enter your full name.')
    if (!formData.email.trim()) return setError('Please enter your email.')
    if (!formData.phone.match(/^[6-9]\d{9}$/)) {
      setLoading(false)
      return setError('Please enter a valid 10-digit Indian mobile number.')
    }
    if (item.type === 'dietician') {
      if (!formData.date) {
        setLoading(false)
        return setError('Please choose a preferred date.')
      }
      if (!formData.slot) {
        setLoading(false)
        return setError('Please select a preferred time slot.')
      }
    }

    try {
      // Load Razorpay Checkout SDK
      const isLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
      if (!isLoaded) {
        setLoading(false)
        return setError('Failed to load Razorpay payment gateway. Please check your internet connection.')
      }

      // Configure options
      const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_5Kk99DNu56jN3q'
      const amountInPaise = item.price * 100

      const options = {
        key: keyId,
        amount: amountInPaise,
        currency: 'INR',
        name: 'Build N Bond',
        description: `${item.type === 'package' ? 'Membership Plan' : 'Dietician Consultation'} - ${item.name}`,
        image: '/images/logo.png',
        handler: function (response) {
          // Razorpay returns razorpay_payment_id, razorpay_order_id, razorpay_signature
          const receiptId = `BNB-TXN-${Math.floor(10000000 + Math.random() * 90000000)}`
          const successDetails = {
            receiptId,
            paymentId: response.razorpay_payment_id,
            amount: item.price,
            itemName: item.name,
            itemType: item.type,
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            date: formData.date,
            slot: formData.slot,
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
          }

          // Save to local storage for transaction logs
          const existingTransactions = JSON.parse(localStorage.getItem('bnb_transactions') || '[]')
          localStorage.setItem('bnb_transactions', JSON.stringify([successDetails, ...existingTransactions]))

          setPaymentSuccessData(successDetails)
          setLoading(false)
          if (onPaymentSuccess) onPaymentSuccess(successDetails)
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          item_type: item.type,
          item_name: item.name,
          preferred_date: formData.date || 'N/A',
          preferred_slot: formData.slot || 'N/A'
        },
        theme: {
          color: '#008dd2'
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error('Razorpay Error:', err)
      setError('An unexpected error occurred during payment setup.')
      setLoading(false)
    }
  }

  const handlePrintReceipt = () => {
    window.print()
  }

  return (
    <div className="checkout-modal-overlay" onClick={!loading && !paymentSuccessData ? onClose : undefined} aria-modal="true" role="dialog">
      <div className="checkout-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        {!loading && !paymentSuccessData && (
          <button className="checkout-modal-close" onClick={onClose} aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}

        {!paymentSuccessData ? (
          /* Checkout Details Form */
          <div className="checkout-form-container">
            <div className="checkout-header">
              <h2>Confirm Booking & Details</h2>
              <p>Please enter your information to proceed to Razorpay payment gateway.</p>
            </div>

            <div className="checkout-summary-box">
              <div className="summary-info">
                <span className="summary-type">{item.type === 'package' ? 'Membership Package' : 'Dietician Appointment'}</span>
                <h3 className="summary-title">{item.name}</h3>
              </div>
              <div className="summary-price">
                <span>Total Amount:</span>
                <span className="price-tag">₹{item.price.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {error && (
              <div className="checkout-error-banner">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="customer-name">Full Name *</label>
                <input
                  type="text"
                  id="customer-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="E.g., Sachin Raje"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="customer-email">Email Address *</label>
                  <input
                    type="email"
                    id="customer-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E.g., name@example.com"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="customer-phone">Mobile Number *</label>
                  <input
                    type="tel"
                    id="customer-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit number"
                    pattern="[6-9][0-9]{9}"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {item.type === 'dietician' && (
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="consultation-date">Preferred Date *</label>
                    <input
                      type="date"
                      id="consultation-date"
                      name="date"
                      min={todayStr}
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="consultation-slot">Preferred Slot *</label>
                    <select
                      id="consultation-slot"
                      name="slot"
                      value={formData.slot}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                    >
                      <option value="">Select a slot</option>
                      <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
                      <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                      <option value="04:30 PM - 05:30 PM">04:30 PM - 05:30 PM</option>
                      <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                    </select>
                  </div>
                </div>
              )}

              <button type="submit" className="btn-checkout-submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Setting Up Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Pay ₹{item.price.toLocaleString('en-IN')}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Payment Success Receipt View */
          <div className="receipt-container" id="printable-receipt">
            <div className="receipt-success-badge">
              <div className="success-icon-wrap">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2>Booking Confirmed!</h2>
              <p>Your payment via Razorpay was successful.</p>
            </div>

            <div className="receipt-card">
              <div className="receipt-card-header">
                <h3>Build N' Bond Receipt</h3>
                <span className="receipt-badge">PAID</span>
              </div>
              <div className="receipt-divider"></div>
              <div className="receipt-grid">
                <div className="receipt-row">
                  <span className="receipt-lbl">Receipt ID</span>
                  <span className="receipt-val highlight">{paymentSuccessData.receiptId}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-lbl">Razorpay Payment ID</span>
                  <span className="receipt-val">{paymentSuccessData.paymentId}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-lbl">Transaction Date</span>
                  <span className="receipt-val">{paymentSuccessData.timestamp}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-lbl">Customer Name</span>
                  <span className="receipt-val">{paymentSuccessData.customerName}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-lbl">Contact Number</span>
                  <span className="receipt-val">+91 {paymentSuccessData.customerPhone}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-lbl">Email Address</span>
                  <span className="receipt-val">{paymentSuccessData.customerEmail}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-lbl">Selected Item</span>
                  <span className="receipt-val">{paymentSuccessData.itemName}</span>
                </div>
                
                {paymentSuccessData.itemType === 'dietician' && (
                  <>
                    <div className="receipt-row">
                      <span className="receipt-lbl">Appointment Date</span>
                      <span className="receipt-val highlight">{paymentSuccessData.date}</span>
                    </div>
                    <div className="receipt-row">
                      <span className="receipt-lbl">Preferred Slot</span>
                      <span className="receipt-val highlight">{paymentSuccessData.slot}</span>
                    </div>
                  </>
                )}

                <div className="receipt-divider"></div>

                <div className="receipt-row total-row">
                  <span className="receipt-lbl">Total Paid</span>
                  <span className="receipt-val amount">₹{paymentSuccessData.amount.toLocaleString('en-IN')}.00</span>
                </div>
              </div>
            </div>

            <div className="receipt-actions no-print">
              <button onClick={handlePrintReceipt} className="btn-print-receipt">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                <span>Print Receipt</span>
              </button>
              <button onClick={onClose} className="btn-close-receipt">
                <span>Done & Close</span>
              </button>
            </div>
            
            <p className="receipt-footer no-print">
              A copy of this confirmation has been logged. For support, contact info@buildnbond.com.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
