import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import HowWeWork from './components/HowWeWork'
import KidsSection from './components/KidsSection'
import Consultants from './components/Consultants'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Services />
      <HowWeWork />
      <KidsSection />
      <Consultants />
      <CtaSection />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
