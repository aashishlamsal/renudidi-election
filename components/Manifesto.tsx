'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Users, Briefcase, Building2, Scale, TrendingUp, ChevronRight, Palmtree, GraduationCap, Stethoscope, Sprout, Trophy } from 'lucide-react'
import content from '@/content.json'
import { useLanguage } from '@/lib/LanguageContext'

const IconMap: Record<string, any> = {
  Users,
  Briefcase,
  Building2,
  Scale,
  TrendingUp,
  Palmtree,
  GraduationCap,
  Stethoscope,
  Sprout,
  Trophy
}

export default function Manifesto() {
  const { manifesto } = content
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState(0)
  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const { language, t } = useLanguage()

  return (
    <section id="manifesto" ref={ref} className="py-16 md:py-24 bg-white overflow-hidden">
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
              {t(manifesto.title.ne, manifesto.title.en)}
            </div>
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-6 inline-block px-8 py-2 bg-didi-red text-white rounded-full shadow-lg"
          >
            <div className={`font-black tracking-widest ${language === 'ne' ? 'font-nepali' : ''}`}>
              {t(manifesto.teaser.ne, manifesto.teaser.en)}
            </div>
          </motion.div>
        </motion.div>

        {/* Accordion/Tabs Container */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[500px]">
            {/* Left Side: Navigation Links (Accordion on Mobile) */}
            <div className="w-full lg:w-2/5 space-y-3">
              {manifesto.pillars.map((pillar, idx) => {
                const isActive = activeTab === idx
                const IconComponent = IconMap[pillar.icon] || Users

                return (
                  <div key={idx} className="space-y-2">
                    <button
                      onClick={() => setActiveTab(idx)}
                      className={`w-full text-left p-6 rounded-2xl transition-all duration-300 flex items-center gap-6 group relative overflow-hidden ${isActive
                        ? 'bg-didi-black text-white shadow-2xl scale-[1.02] z-10'
                        : 'bg-didi-gray hover:bg-didi-red/10 border-2 border-transparent'
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 bg-didi-black"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}

                      <div className={`relative z-10 p-3 rounded-xl transition-colors ${isActive ? 'bg-didi-red text-white' : 'bg-white text-didi-red shadow-sm group-hover:bg-didi-red group-hover:text-white'
                        }`}>
                        <IconComponent size={24} strokeWidth={2} />
                      </div>

                      <div className="relative z-10 flex-1">
                        <div className={`text-xs font-black tracking-widest uppercase mb-1 opacity-50 ${isActive ? 'text-didi-red' : 'text-didi-black'}`}>
                          {t(`बुँदा #${idx + 1}`, `POINT #${idx + 1}`)}
                        </div>
                        <div className={`text-lg font-black leading-tight ${language === 'ne' ? 'font-nepali' : ''} ${isActive ? 'text-white' : 'text-didi-black'}`}>
                          {t(pillar.ne, pillar.en)}
                        </div>
                      </div>

                      <ChevronRight
                        size={20}
                        className={`relative z-10 transition-transform duration-300 ${isActive ? 'rotate-90 lg:rotate-0 translate-x-0 opacity-100 text-didi-red' : '-translate-x-4 opacity-0 text-didi-black'}`}
                      />
                    </button>

                    {/* Mobile Only: Expanded Details */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="lg:hidden overflow-hidden"
                        >
                          <div className="p-6 bg-didi-gray rounded-2xl space-y-4 border-2 border-didi-black/5">
                            {(() => {
                              const description = (pillar as any).description
                              const points = Array.isArray(t(description.ne, description.en))
                                ? t(description.ne, description.en)
                                : [t(description.ne, description.en)]

                              return points.map((point: string, pIdx: number) => (
                                <div key={pIdx} className="flex items-start gap-4">
                                  <div className="w-2 h-2 rounded-full bg-didi-red mt-2.5 shrink-0" />
                                  <p className={`text-base text-didi-black/80 font-medium ${language === 'ne' ? 'font-nepali' : ''}`}>
                                    {point}
                                  </p>
                                </div>
                              ))
                            })()}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Right Side: Detailed View (Desktop Only) */}
            <div className="hidden lg:flex w-full lg:w-3/5 bg-didi-gray rounded-[40px] p-8 md:p-12 relative overflow-hidden flex-col justify-start min-h-[500px]">
              {/* Decorative Elements */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-didi-red/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-didi-black/5 rounded-full blur-3xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10 flex flex-col items-start w-full"
                >
                  {/* Large Icon Box */}
                  <motion.div
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-didi-red mb-8 border border-didi-black/5 shrink-0"
                  >
                    {(() => {
                      const ActiveIcon = IconMap[manifesto.pillars[activeTab].icon] || Users
                      return <ActiveIcon size={40} strokeWidth={1.5} />
                    })()}
                  </motion.div>

                  {/* Title & Desc */}
                  <div className="text-left w-full space-y-8">
                    <h3 className={`text-3xl md:text-4xl font-black text-didi-black leading-tight ${language === 'ne' ? 'font-nepali' : ''}`}>
                      {t(manifesto.pillars[activeTab].ne, manifesto.pillars[activeTab].en)}
                    </h3>

                    <div className="space-y-4">
                      {(() => {
                        const description = (manifesto.pillars[activeTab] as any).description
                        const points = Array.isArray(t(description.ne, description.en))
                          ? t(description.ne, description.en)
                          : [t(description.ne, description.en)]

                        return points.map((point: string, pIdx: number) => (
                          <motion.div
                            key={pIdx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * pIdx + 0.2 }}
                            className="flex items-start gap-4"
                          >
                            <div className="w-2 h-2 rounded-full bg-didi-red mt-3 shrink-0" />
                            <p className={`text-lg md:text-xl text-didi-black/80 leading-relaxed font-medium ${language === 'ne' ? 'font-nepali' : ''}`}>
                              {point}
                            </p>
                          </motion.div>
                        ))
                      })()}
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-4 text-didi-red pt-8"
                    >
                      <div className="h-px w-12 bg-didi-red/30" />
                      <span className="text-2xl">★</span>
                      <div className="h-px w-12 bg-didi-red/30" />
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center mt-20"
        >
          <a
            href="#manifesto"
            className="btn-primary w-full md:w-auto !py-4"
          >
            {t('पूर्ण घोषणापत्र डाउनलोड गर्नुहोस् ★', 'Download Full Manifesto ★')}
          </a>
          <button
            onClick={() => setShowNotifyModal(true)}
            className="btn-outline w-full md:w-auto !py-4"
          >
            {t('थप जानकारी पाउनुहोस् ★', 'Get More Updates ★')}
          </button>
        </motion.div>
      </div>

      {/* Notify Modal (Unchanged) */}
      {showNotifyModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowNotifyModal(false)}
          className="fixed inset-0 bg-didi-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[40px] p-8 md:p-12 max-w-md w-full shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-didi-red/5 rounded-full blur-2xl" />

            <div className="text-center mb-8 text-didi-red relative z-10">
              <div className="text-5xl mb-4">★</div>
              <h3 className={`text-3xl font-black text-didi-black mb-2 ${language === 'ne' ? 'font-nepali' : ''}`}>
                {t('सूचित हुनुहोस्', 'Get Notified')}
              </h3>
              <p className="text-didi-black/60 font-medium">
                {t('घोषणापत्र जारी भएपछि हामी तपाईंलाई जानकारी दिनेछौं।', 'We will notify you once the manifesto is released.')}
              </p>
            </div>

            <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('इमेल ठेगाना', 'Email Address')}
                className="w-full px-6 py-4 bg-didi-gray border-2 border-transparent rounded-2xl focus:border-didi-red focus:bg-white focus:outline-none transition-all font-bold"
              />
              <button type="submit" className="btn-primary w-full !py-4 shadow-xl">
                {t('मलाई सूचित गर्नुहोस् ★', 'Notify Me ★')}
              </button>
            </form>

            <button
              onClick={() => setShowNotifyModal(false)}
              className="mt-6 w-full text-sm font-black text-didi-black/40 hover:text-didi-red transition-colors uppercase tracking-widest"
            >
              ← {t('बन्द गर्नुहोस्', 'Close')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
