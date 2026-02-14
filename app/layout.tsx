import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'नेपालकी दिदी - DIDI of Nepal',
  description: 'नयाँ पुस्ताको नेतृत्व। समावेशी, निर्णायक, र प्रेरणादायी। New generation leadership. Inclusive, decisive, and inspiring.',
  keywords: 'DIDI, Nepal, नेपाल, leadership, नेतृत्व, political campaign',
  openGraph: {
    title: 'नेपालकी दिदी - DIDI of Nepal',
    description: 'New generation leadership. Inclusive, decisive, and inspiring.',
    type: 'website',
    locale: 'ne_NP',
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'नेपालकी दिदी - DIDI of Nepal',
    description: 'New generation leadership for Nepal.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ne" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
