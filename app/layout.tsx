import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'
import seo from '@/seo.json'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: seo.site.themeColor,
}

export const metadata: Metadata = {
  metadataBase: new URL(seo.site.url),
  title: {
    default: seo.metadata.title.default,
    template: seo.metadata.title.template,
  },
  description: seo.metadata.description.en,
  keywords: seo.metadata.keywords,
  authors: seo.metadata.authors as Metadata['authors'],
  creator: seo.metadata.creator,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: seo.openGraph.title,
    description: seo.openGraph.description,
    type: 'website',
    url: seo.openGraph.url,
    siteName: seo.openGraph.siteName,
    locale: seo.openGraph.locale,
    images: seo.openGraph.images,
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.twitter.title,
    description: seo.twitter.description,
    images: seo.twitter.images,
    creator: seo.twitter.creator,
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  alternates: {
    canonical: seo.site.url,
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
