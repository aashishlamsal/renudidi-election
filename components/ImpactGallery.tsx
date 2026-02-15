'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import content from '@/content.json'
import { useLanguage } from '@/lib/LanguageContext'
import * as Icons from 'lucide-react'

export default function ImpactGallery() {
  const { impact } = content
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { language, t } = useLanguage()

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  return (
    <section id="impact" ref={ref} className="py-24 md:py-32 bg-didi-black relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FF0101_1px,transparent_0)] bg-[size:32px_32px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-block mb-4 px-4 py-1.5 bg-didi-red/10 border border-didi-red/30 rounded-full">
            <span className="text-didi-red font-bold text-xs tracking-widest uppercase">
              {t('हाम्रो काम', 'OUR WORK')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            <div className={`${language === 'ne' ? 'font-nepali' : ''}`}>
              {t(impact.title.ne, impact.title.en)}
            </div>
          </h2>
          <div className="h-1.5 w-24 bg-didi-red mx-auto rounded-full" />
        </motion.div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {impact.gallery.map((item: any, idx) => {
            const IconComponent = (Icons as any)[item.icon || 'Star']

            return (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="group relative p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-didi-red/40 hover:bg-white/[0.08]"
              >
                {/* Card Glow Effect */}
                <div className="absolute -inset-px bg-gradient-to-br from-didi-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]" />

                {/* Icon Container */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-didi-red/30">
                  {IconComponent && <IconComponent className="w-8 h-8 text-didi-red" />}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className={`text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-didi-red transition-colors duration-300 ${language === 'ne' ? 'font-nepali' : ''}`}>
                    {t(item.title.ne, item.title.en)}
                  </h3>
                  <p className={`text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300 ${language === 'ne' ? 'font-nepali text-lg' : 'text-sm'}`}>
                    {t(item.description.ne, item.description.en)}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-didi-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
