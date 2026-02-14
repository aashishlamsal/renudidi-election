'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function FloatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40 pointer-events-none"
    >
      <motion.div
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 20px rgba(250, 204, 21, 0.3)',
            '0 0 60px rgba(250, 204, 21, 0.8)',
            '0 0 20px rgba(250, 204, 21, 0.3)'
          ],
          borderColor: ['#facc15', '#fbbf24', '#facc15']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 rotate-3 hover:rotate-0 transition-transform duration-300 pointer-events-auto cursor-pointer"
      >
        <Image
          src="/images/floating-badge.png"
          alt="Renu Didi Campaign Badge"
          fill
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  )
}
