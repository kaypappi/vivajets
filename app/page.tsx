import Image from 'next/image'
import Services from './services'
import About from './about'
import Benefits from './benefits'
import Testimonials from './testimonials'
import Cta from './cta'
import Footer from './footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Services />
      <About />
      <Benefits />
      <Testimonials />
      <Cta />
      <Footer />  
    </main>
  )
}
