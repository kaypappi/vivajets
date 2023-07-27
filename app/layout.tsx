import './globals.css'
import type { Metadata } from 'next'
import { Geologica } from 'next/font/google'
import localFont from 'next/font/local'


const geologica = Geologica({ subsets: ['latin'], variable: '--font-geologica' })
const gothic = localFont({
  src: '../public/fonts/CenturyGothic.ttf',
  display: 'swap',
  variable: '--font-gothic',
})

const gothicBold = localFont({
  src: '../public/fonts/GOTHICB.ttf',
  display: 'swap',
  variable: '--font-gothic-bold',
})

export const metadata: Metadata = {
  title: 'Viva Jets',
  description: `Elevate Your Private Flights 
  to Extraordinary Heights`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='' lang="en">
      <body className={`${geologica.variable} ${gothic.variable} ${gothicBold.variable} w-full font-gothic scroll-smooth`}>
        {children}
        </body>
    </html>
  )
}
