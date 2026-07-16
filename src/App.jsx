import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import StatsSection from './components/StatsSection'
import Services from './components/Services'
import HowWeWork from './components/HowWeWork'
import KidsSection from './components/KidsSection'
import Packages from './components/Packages'
import Testimonials from './components/Testimonials'
import Consultants from './components/Consultants'
import Dieticians from './components/Dieticians'
import FaqSection from './components/FaqSection'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import BookingModal from './components/BookingModal'
import RazorpayCheckout from './components/RazorpayCheckout'
import WhatsAppWidget from './components/WhatsAppWidget'

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [checkoutItem, setCheckoutItem] = useState(null)

  const openBooking = (e) => {
    if (e) e.preventDefault()
    setIsBookingOpen(true)
  }

  const closeBooking = () => {
    setIsBookingOpen(false)
  }

  const handleSelectCheckoutItem = (item) => {
    setCheckoutItem(item)
  }

  return (
    <div className="app">
      <Navbar onBookClick={openBooking} />
      <Hero onBookClick={openBooking} />
      <TrustStrip />
      <StatsSection />
      <Services />
      <HowWeWork />
      <KidsSection />
      <Packages onSelectPackage={handleSelectCheckoutItem} />
      <Testimonials />
      <Consultants />
      <Dieticians onSelectDietician={handleSelectCheckoutItem} />
      <FaqSection />
      <CtaSection onBookClick={openBooking} />
      <Footer />
      <ScrollToTop />
      <WhatsAppWidget />
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
      <RazorpayCheckout
        isOpen={checkoutItem !== null}
        onClose={() => setCheckoutItem(null)}
        item={checkoutItem}
      />
    </div>
  )
}

export default App

