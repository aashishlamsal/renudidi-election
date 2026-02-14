'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import content from '@/content.json'
import { useLanguage } from '@/lib/LanguageContext'

export default function WhyDidi() {
  const { whyDidi } = content
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { language, t } = useLanguage()

  return (
    <section id="why-didi" ref={ref} className="py-20 md:py-32 bg-didi-gray">
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
            <div className={`text-didi-red ${language === 'ne' ? 'font-nepali' : ''}`}>
              {t(whyDidi.title.ne, whyDidi.title.en)}
            </div>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="text-lg md:text-xl leading-relaxed">
              <p className={`font-semibold text-didi-black ${language === 'ne' ? 'font-nepali' : ''}`}>
                {t(whyDidi.description.ne, whyDidi.description.en)}
              </p>
            </div>

            <a
              href="#manifesto"
              className="inline-flex items-center gap-2 text-didi-red font-bold hover:gap-4 transition-all duration-300 group"
            >
              <span className={language === 'ne' ? 'font-nepali' : ''}>
                {t('दृष्टिकोण हेर्नुहोस्', 'View Vision')}
              </span>
              <span className="text-didi-red group-hover:scale-125 transition-transform">
                ★
              </span>
            </a>
          </motion.div>

          {/* Right: Chips */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {whyDidi.chips.map((chip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 * idx }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-didi-red transition-all duration-300 cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2 text-didi-red">★</div>
                  <div className={`font-bold text-didi-black text-lg ${language === 'ne' ? 'font-nepali' : ''}`}>
                    {t(chip.ne.replace(' ★', ''), chip.en.replace(' ★', ''))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
