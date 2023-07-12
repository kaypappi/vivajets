import './globals.css'
import type { Metadata } from 'next'
import { Geologica } from 'next/font/google'

const geologica = Geologica({ subsets: ['latin'], variable: '--font-geologica' })

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
    <html lang="en">
      <body className={`${geologica.variable} font-geologica`}>{children}</body>
    </html>
  )
}
