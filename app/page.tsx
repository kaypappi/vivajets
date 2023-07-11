import Image from 'next/image'
import Services from './services'
import About from './about'
import Benefits from './benefits'
export default function Home() {
  return (
    <main className="min-h-screen">
      <Services />
      <About />
      <Benefits />
    </main>
  )
}
