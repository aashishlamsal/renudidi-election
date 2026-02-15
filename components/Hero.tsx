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
          backgroundImage: 'radial-gradient(circle at 2px 2px, #FF0101 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Floating Star Blobs */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute pointer-events-none z-0"
          style={{ left: star.left, top: star.top }}
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            opacity: [0.1, 0.4, 0.1],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-didi-red opacity-50">
            <path d="M12 2L14.4 8.6L21.5 9.3L16.2 14.1L17.8 21L12 17.6L6.2 21L7.8 14.1L2.5 9.3L9.6 8.6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
          </svg>
        </motion.div>
      ))}

      <div className="container-custom relative z-10 pt-20 md:pt-28 pb-0 min-h-[85vh] md:min-h-[80vh] flex items-start lg:items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start w-full">

          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* DIDI Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-block mb-4 md:mb-6 px-4 py-1.5 md:px-5 bg-didi-red/10 border border-didi-red/30 rounded-full backdrop-blur-sm"
            >
              <span className="text-didi-red font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-didi-red animate-pulse" />
                DIDI MODE
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="mb-4 md:mb-5 leading-[1.1] md:leading-tight">
              <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-2 text-glow-red ${language === 'ne' ? 'font-nepali' : ''}`}>
                {t(hero.headline.ne, hero.headline.en)}
              </div>
            </h1>

            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6 md:mb-8 max-w-xl"
            >
              <div className={`text-lg md:text-2xl text-didi-red font-medium leading-relaxed ${language === 'ne' ? 'font-nepali' : ''}`}>
                {t(hero.subheadline.ne, hero.subheadline.en)}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 items-center lg:items-start w-full sm:w-auto"
            >
              <a href="/support" className="btn-primary w-full sm:w-auto px-10 py-3.5 md:py-4 text-base md:text-lg">
                {t(hero.ctas[0].text.ne, hero.ctas[0].text.en)}
              </a>
              <a href="#join" className="btn-secondary w-full sm:w-auto px-10 py-3.5 md:py-4 text-base md:text-lg backdrop-blur-md">
                {t(hero.ctas[1].text.ne, hero.ctas[1].text.en)}
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Image / Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-[280px] md:max-w-sm lg:max-w-[420px] max-h-[50vh] md:max-h-[60vh] lg:max-h-[65vh] mx-auto lg:ml-auto aspect-[4/5]"
          >
            {/* Animated Blob Background */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center transform scale-110 md:scale-125">
              <motion.div
                animate={{
                  borderRadius: [
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "30% 60% 70% 40% / 50% 60% 30% 60%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%"
                  ],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full h-full bg-gradient-to-tr from-didi-red/20 via-didi-red/10 to-transparent blur-xl"
              />
            </div>

            <div className="relative z-10 w-full h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
              <div className="relative w-full h-full">
                <img
                  src="/images/renu-dahal-hero.png"
                  alt="Renu Dahal"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient Overlay for text readability at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Floating Name Label */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20">
                  <div className="h-1 w-10 md:w-12 bg-didi-red mb-2" />
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase mb-1">Renu Dahal</h3>
                  <p className="text-didi-red font-bold text-[10px] md:text-xs tracking-widest opacity-90">LEADERSHIP IN ACTION</p>
                </div>
              </div>
            </div>

            {/* Floating Detail Elements - Tablet+ */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 -left-4 md:top-8 md:-left-8 p-4 md:p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl shadow-2xl z-20 hidden sm:block"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white text-xs md:text-sm font-bold tracking-wider">MARCH TO VICTORY</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-20"
      >
        <span className={`text-[10px] md:text-xs tracking-[0.3em] font-medium uppercase ${language === 'ne' ? 'font-nepali' : ''}`}>
          {t('तल स्क्रोल गर्नुहोस्', 'Explore More')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xl text-didi-red"
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0F] to-transparent pointer-events-none" />
    </section>
  )
}
