'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import content from '@/content.json'
import { useLanguage } from '@/lib/LanguageContext'

export default function DidiAcronym() {
  const { acronym } = content
  const { language, t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  return (
    <section id="didi-acronym" ref={ref} className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="star-divider max-w-md mx-auto">
            <span className="text-2xl">★</span>
          </div>
          <h2 className="section-title">
            <div className="font-nepali text-didi-red">{acronym.title.ne}</div>
            <div className="text-3xl md:text-4xl text-didi-black/80 mt-2">
              {acronym.title.en}
            </div>
          </h2>
        </motion.div>

        {/* DIDI Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {acronym.cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
              className={`relative bg-gradient-to-br from-didi-gray to-white p-6 md:p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${expandedCard === idx
                ? 'border-didi-red shadow-2xl glow-red'
                : 'border-didi-black/10 hover:border-didi-red shadow-lg'
                }`}
            >
              {/* Background Letter Watermark — hidden on mobile to prevent overflow */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-didi-red/5 pointer-events-none select-none hidden md:block"
                style={{ fontSize: '20rem', lineHeight: 1 }}
              >
                {card.letter}
              </div>

              {/* Star Icon */}
              <div className="absolute top-6 right-6 text-didi-red text-3xl">
                ★
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Letter Badge */}
                <div className="inline-block mb-4 w-16 h-16 bg-didi-red rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-3xl">
                    {card.letter}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-black mb-2">
                  <div className="font-nepali text-didi-black">
                    {card.title.ne}
                  </div>
                  <div className="text-xl text-didi-black/70 mt-1">
                    {card.title.en}
                  </div>
                </h3>

                {/* Points */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedCard === idx ? 'auto' : '0px',
                    opacity: expandedCard === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-3 mt-6">
                    {card.points.map((point, pointIdx) => (
                      <li
                        key={pointIdx}
                        className="flex items-start gap-3 text-didi-black/80"
                      >
                        <span className="text-didi-red mt-1 block">●</span>
                        <div>
                          <div className="font-nepali font-semibold">
                            {point.ne}
                          </div>
                          <div className="text-sm opacity-75">{point.en}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Expand Indicator */}
                {!expandedCard && (
                  <div className="mt-4 text-didi-red/60 text-sm font-semibold flex items-center gap-2">
                    {t('थप हेर्न क्लिक गर्नुहोस्', 'Click to expand')} <span className="text-didi-red">→</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
