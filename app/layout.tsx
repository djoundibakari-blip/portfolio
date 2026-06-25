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
  title: 'Djoundi Bakari | Alternant Développeur Web',
  description: 'Portfolio de Djoundi Bakari, alternant développeur web à Epitech Lyon. Spécialisé en PHP/Laravel, Java/Spring Boot, JavaScript, Docker et Tailwind CSS.',
  keywords: ['developpeur web', 'alternance', 'PHP', 'Laravel', 'Java', 'Spring Boot', 'JavaScript', 'Docker', 'Tailwind', 'portfolio', 'RNCP', 'Epitech'],
  authors: [{ name: 'Djoundi Bakari' }],
  creator: 'Djoundi Bakari',
  generator: 'Next.js',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Djoundi Bakari | Alternant Développeur Web',
    description: 'Portfolio de Djoundi Bakari, alternant développeur web à Epitech Lyon.',
    siteName: 'Portfolio Djoundi Bakari',
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-background" data-theme="dragonball" suppressHydrationWarning>
      <body className={`${poppins.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
