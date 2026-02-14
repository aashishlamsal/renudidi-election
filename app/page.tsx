'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import WhyDidi from '@/components/WhyDidi'
import DidiAcronym from '@/components/DidiAcronym'
import ImpactGallery from '@/components/ImpactGallery'
import DebunkAllegations from '@/components/DebunkAllegations'
import Manifesto from '@/components/Manifesto'
import JoinMovement from '@/components/JoinMovement'
import Footer from '@/components/Footer'
import FloatingBadge from '@/components/FloatingBadge'
import MobileStickyCTA from '@/components/MobileStickyCTA'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Floating Badge (Desktop) */}
      <FloatingBadge />

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />

      {/* Main Sections */}
      <Hero />
      <WhyDidi />
      <DidiAcronym />
      <ImpactGallery />
      <DebunkAllegations />
      <Manifesto />
      <JoinMovement />

      {/* Footer */}
      <Footer />

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'DIDI Nepal',
            alternateName: 'नेपालकी दिदी',
            url: 'https://renudidi.com',
            logo: 'https://renudidi.com/logo.png',
            description: 'New generation political leadership for Nepal',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Campaign Office',
              email: 'info@renudidi.com',
            },
            sameAs: [
              'https://facebook.com/renudidi',
              'https://twitter.com/renudidi',
              'https://instagram.com/renudidi',
            ],
          }),
        }}
      />
    </main>
  )
}
