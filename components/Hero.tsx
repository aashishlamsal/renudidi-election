'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import content from '@/content.json'
import { useLanguage } from '@/lib/LanguageContext'

export default function Hero() {
  const { hero } = content
  const { language, t } = useLanguage()

  const [stars, setStars] = useState<{ id: number, left: string, top: string, delay: number, duration: number }[]>([])

  useEffect(() => {
    // Generate random star positions only on the client
    const starArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 3,
    }))
    setStars(starArray)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0B0B0F 0%, #1a0000 50%, #0B0B0F 100%)',
      }}
    >
      {/* Background overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #FF0000 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Floating Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star-particle absolute pointer-events-none"
          style={{ left: star.left, top: star.top }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ★
        </motion.div>
      ))}

      {/* Hero Content */}
      <div className="container-custom relative z-10 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* DIDI Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-block mb-8 px-6 py-2 bg-didi-red/20 border-2 border-didi-red rounded-full"
          >
            <span className="text-didi-red font-black text-sm md:text-base">
              DIDI MODE <span className="text-didi-red">★</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="mb-6">
            <div className={`text-5xl md:text-7xl lg:text-8xl font-black text-white mb-3 text-glow-red ${language === 'ne' ? 'font-nepali' : ''}`}>
              {t(hero.headline.ne, hero.headline.en)}
            </div>
          </h1>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-12 text-lg md:text-2xl"
          >
            <div className={`text-didi-red font-semibold ${language === 'ne' ? 'font-nepali' : ''}`}>
              {t(hero.subheadline.ne, hero.subheadline.en)}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <a href="/support" className="btn-primary w-full md:w-auto">
              {t(hero.ctas[0].text.ne, hero.ctas[0].text.en)}
            </a>
            <a href="#join" className="btn-secondary w-full md:w-auto">
              {t(hero.ctas[1].text.ne, hero.ctas[1].text.en)}
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-col items-center gap-2 text-white/60"
          >
            <span className={`text-sm ${language === 'ne' ? 'font-nepali' : ''}`}>
              {t('तल स्क्रोल गर्नुहोस्', 'Scroll Down')}
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl text-didi-red"
            >
              ↓ <span className="text-didi-red">★</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
