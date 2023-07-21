import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google';
import Navbar from './components/navbar/Navbar';

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EduMentor',
  description: 'Unlock Your Potential: Empowering Growth through Personalized Ecoaching!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
