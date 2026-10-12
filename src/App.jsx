import { useEffect, useState } from 'react'
import { Nav, Hero, Marquee, About, Ventures, Process, Voices, Contact, Footer } from './components/sections.jsx'

export default function App() {
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const f = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', f)
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Ventures />
      <Process />
      <Voices />
      <Contact />
      <Footer />
      {showTop && <button className="top" onClick={() => window.scrollTo({ top: 0 })}>↑</button>}
    </>
  )
}
