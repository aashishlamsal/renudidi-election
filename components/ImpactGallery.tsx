'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import content from '@/content.json'
import { useLanguage } from '@/lib/LanguageContext'

export default function ImpactGallery() {
  const { impact } = content
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const { language, t } = useLanguage()

  const openLightbox = (idx: number) => {
    setSelectedImage(idx)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % impact.gallery.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + impact.gallery.length) % impact.gallery.length)
  }

  return (
    <section id="impact" ref={ref} className="py-20 md:py-32 bg-didi-gray">
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
              {t(impact.title.ne, impact.title.en)}
            </div>
          </h2>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {impact.gallery.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              whileHover={{ scale: 1.05, y: -8 }}
              onClick={() => openLightbox(idx)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
            >
              {/* Placeholder Image with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-didi-red/80 to-didi-black/90 flex items-center justify-center">
                <div className="text-white/20 text-8xl">★</div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-didi-black/90 via-didi-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Star Watermark */}
              <div className="absolute top-4 right-4 text-didi-red/30 text-4xl">
                ★
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className={`font-bold text-white text-lg mb-1 ${language === 'ne' ? 'font-nepali' : ''}`}>
                  {t(item.caption.ne, item.caption.en)}
                </div>
                <div className="text-didi-red mt-2 text-sm font-semibold flex items-center gap-2">
                  {t('विस्तार गर्न क्लिक गर्नुहोस्', 'Click to expand')} <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
          className="fixed inset-0 bg-didi-black/95 z-50 flex items-center justify-center p-4"
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-didi-red transition-colors"
            >
              ✕
            </button>

            {/* Image Container */}
            <div className="relative aspect-video bg-gradient-to-br from-didi-red/80 to-didi-black/90 rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="text-white/20 text-9xl">DIDI</div>
            </div>

            {/* Caption */}
            <div className="mt-6 text-center">
              <div className={`font-bold text-white text-2xl mb-2 ${language === 'ne' ? 'font-nepali' : ''}`}>
                {t(impact.gallery[selectedImage].caption.ne, impact.gallery[selectedImage].caption.en)}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevImage}
                className="px-6 py-3 bg-didi-red text-white rounded-xl hover:scale-105 transition-transform font-bold"
              >
                ← Previous
              </button>
              <button
                onClick={nextImage}
                className="px-6 py-3 bg-didi-red text-white rounded-xl hover:scale-105 transition-transform font-bold"
              >
                Next →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
