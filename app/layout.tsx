import type { Metadata, Viewport } from 'next'
import { Poppins, JetBrains_Mono, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins"
});
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono"
});
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-bebas"
});

export const viewport: Viewport = {
  themeColor: '#0d1117',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Djoundi Bakari | Developpeur Web Full-Stack',
  description: 'Portfolio de Djoundi Bakari, developpeur web full-stack en alternance a Epitech Lyon. Specialise en React, Next.js et Node.js.',
  keywords: ['developpeur web', 'full-stack', 'React', 'Next.js', 'portfolio', 'RNCP', 'Epitech'],
  authors: [{ name: 'Djoundi Bakari' }],
  creator: 'Djoundi Bakari',
  generator: 'Next.js',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Djoundi Bakari | Developpeur Web Full-Stack',
    description: 'Portfolio de Djoundi Bakari, developpeur web full-stack.',
    siteName: 'Portfolio Djoundi Bakari',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className={`${poppins.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
