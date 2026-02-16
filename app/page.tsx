'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import WhyDidi from '@/components/WhyDidi'
import DidiAcronym from '@/components/DidiAcronym'
import ImpactGallery from '@/components/ImpactGallery'
import Manifesto from '@/components/Manifesto'
import JoinMovement from '@/components/JoinMovement'
import Footer from '@/components/Footer'
import FloatingBadge from '@/components/FloatingBadge'
import MobileStickyCTA from '@/components/MobileStickyCTA'
import seo from '@/seo.json'

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
      <Manifesto />
      <JoinMovement />

      {/* Footer */}
      <Footer />

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            seo.structuredData.organization,
            seo.structuredData.person,
          ]),
        }}
      />
    </main>
  )
}
