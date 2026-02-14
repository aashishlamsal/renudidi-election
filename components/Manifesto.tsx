'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import content from '@/content.json'
import { useLanguage } from '@/lib/LanguageContext'

export default function Manifesto() {
  const { manifesto } = content
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const { language, t } = useLanguage()

  return (
    <section id="manifesto" ref={ref} className="py-20 md:py-32 bg-white">
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="star-divider max-w-md mx-auto">
            <span className="text-2xl">★</span>
          </div>
          <h2 className="section-title">
            <div className={`text-didi-red ${language === 'ne' ? 'font-nepali' : ''}`}>{t(manifesto.title.ne, manifesto.title.en)}</div>
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-6 inline-block px-6 py-2 bg-didi-red/20 rounded-full"
          >
            <div className={`text-didi-red font-bold ${language === 'ne' ? 'font-nepali' : ''}`}>
              {t(manifesto.teaser.ne, manifesto.teaser.en)}
            </div>
          </motion.div>
        </motion.div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto mt-16">
          {manifesto.pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-gradient-to-b from-didi-gray to-white p-6 rounded-2xl border-2 border-didi-black/10 hover:border-didi-red transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 text-center">{pillar.icon}</div>

              {/* Title */}
              <div className="text-center">
                <div className={`font-bold text-didi-black text-lg ${language === 'ne' ? 'font-nepali' : ''}`}>
                  {t(pillar.ne, pillar.en)}
                </div>
              </div>

              {/* Star */}
              <div className="text-center mt-4 text-didi-red text-2xl">★</div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center mt-12"
        >
          <button
            disabled
            className="btn-secondary opacity-60 cursor-not-allowed w-full md:w-auto"
          >
            {t('घोषणापत्र चाँडै आउँदैछ ★', 'Manifesto Coming Soon ★')}
          </button>
          <button
            onClick={() => setShowNotifyModal(true)}
            className="btn-outline w-full md:w-auto"
          >
            {t('सूचित हुनुहोस् ★', 'Get Notified ★')}
          </button>
        </motion.div>
      </div>

      {/* Notify Modal */}
      {showNotifyModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowNotifyModal(false)}
          className="fixed inset-0 bg-didi-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center mb-6 text-didi-red">
              <div className="text-5xl mb-4">★</div>
              <h3 className={`text-2xl font-black text-didi-red mb-2 ${language === 'ne' ? 'font-nepali' : ''}`}>
                {t(' सूचित हुनुहोस् ', 'Get Notified ')}
              </h3>
            </div>

            <form className="space-y-4">
              <input
                type="email"
                placeholder={t('इमेल ठेगाना', 'Email Address')}
                className="w-full px-4 py-3 border-2 border-didi-black/20 rounded-xl focus:border-didi-red focus:outline-none"
              />
              <button type="submit" className="btn-primary w-full">
                {t('मलाई सूचित गर्नुहोस् ★', 'Notify Me ★')}
              </button>
            </form>

            <button
              onClick={() => setShowNotifyModal(false)}
              className="mt-4 w-full text-didi-black/60 hover:text-didi-black transition-colors"
            >
              {t('बन्द गर्नुहोस्', 'Close')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
