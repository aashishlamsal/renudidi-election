'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function MobileStickyCTA() {
  const { scrollYProgress } = useScroll()

  // Show CTA after scrolling past hero
  const opacity = useTransform(scrollYProgress, [0.1, 0.15], [0, 1])

  return (
    <motion.div
      style={{ opacity }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-didi-black to-transparent"
    >
      <a
        href="/support"
        className="block w-full bg-didi-red text-white text-center font-bold py-4 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-200"
      >
        <span className="font-nepali">समर्थन जनाउनुहोस् </span><span className="text-didi-red">★</span>
      </a>
    </motion.div>
  )
}
