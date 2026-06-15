import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import HowWeWork from './components/HowWeWork'
import KidsSection from './components/KidsSection'
import Testimonials from './components/Testimonials'
import Consultants from './components/Consultants'
import FaqSection from './components/FaqSection'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import BookingModal from './components/BookingModal'

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const openBooking = (e) => {
    if (e) e.preventDefault()
    setIsBookingOpen(true)
  }

  const closeBooking = () => {
    setIsBookingOpen(false)
  }

  return (
    <div className="app">
      <Navbar onBookClick={openBooking} />
      <Hero onBookClick={openBooking} />
      <Services />
      <HowWeWork />
      <KidsSection />
      <Testimonials />
      <Consultants />
      <FaqSection />
      <CtaSection onBookClick={openBooking} />
      <Footer />
      <ScrollToTop />
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  )
}

export default App

