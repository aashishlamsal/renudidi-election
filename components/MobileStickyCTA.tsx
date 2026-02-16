'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function MobileStickyCTA() {
  const { scrollYProgress } = useScroll()

  // Show CTA after scrolling past hero
  const opacity = useTransform(scrollYProgress, [0.1, 0.15], [0, 1])

  return (
    <motion.div
      style={{ opacity, paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-didi-black/95 backdrop-blur-sm border-t border-white/10"
    >
      <a
        href="/support"
        className="block w-full bg-didi-red text-white text-center font-bold py-4 rounded-xl shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200"
      >
        <span className="font-nepali">समर्थन जनाउनुहोस् </span><span className="text-white/80">★</span>
      </a>
    </motion.div>
  )
}
