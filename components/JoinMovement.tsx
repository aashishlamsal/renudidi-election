'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import content from '@/content.json'
import { useLanguage } from '@/lib/LanguageContext'

export default function JoinMovement() {
  const { join } = content
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    district: '',
    help: '',
  })
  const [copied, setCopied] = useState(false)
  const { language, t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Thank you for joining the DIDI Movement! ★')
  }

  const handleShare = () => {
    navigator.clipboard.writeText('https://renudidi.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="join"
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FF0000 0%, #0B0B0F 100%)',
      }}
    >
      {/* Large Star Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="text-didi-red" style={{ fontSize: '40rem', lineHeight: 1 }}>
          ★
        </div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-white">
            <div className={`text-yellow-400 text-5xl md:text-6xl mb-4 ${language === 'ne' ? 'font-nepali' : ''}`}>
              {t(join.title.ne, join.title.en)}
            </div>
          </h2>
          <p className={`mt-6 text-xl md:text-2xl text-white/90 ${language === 'ne' ? 'font-nepali font-semibold' : ''}`}>
            {t(join.subtitle.ne, join.subtitle.en)}
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className={`block mb-2 font-semibold text-didi-black ${language === 'ne' ? 'font-nepali' : ''}`}>
                {t(join.form.name.ne, join.form.name.en)}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-didi-black/20 rounded-xl focus:border-didi-red focus:outline-none transition-colors"
                placeholder={t('तपाईंको नाम', 'Your Name')}
              />
            </div>

            {/* Contact Field */}
            <div>
              <label className={`block mb-2 font-semibold text-didi-black ${language === 'ne' ? 'font-nepali' : ''}`}>
                {t(join.form.contact.ne, join.form.contact.en)}
              </label>
              <input
                type="text"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-4 py-3 border-2 border-didi-black/20 rounded-xl focus:border-didi-red focus:outline-none transition-colors"
                placeholder={t('फोन वा इमेल', 'Phone or Email')}
              />
            </div>

            {/* District Field */}
            <div>
              <label className={`block mb-2 font-semibold text-didi-black ${language === 'ne' ? 'font-nepali' : ''}`}>
                {t(join.form.district.ne, join.form.district.en)}
                <span className="text-sm text-didi-black/50 ml-2">{t('(ऐच्छिक)', '(Optional)')}</span>
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-4 py-3 border-2 border-didi-black/20 rounded-xl focus:border-didi-red focus:outline-none transition-colors"
                placeholder={t('तपाईंको जिल्ला', 'Your District')}
              />
            </div>

            {/* How Can You Help */}
            <div>
              <label className={`block mb-2 font-semibold text-didi-black ${language === 'ne' ? 'font-nepali' : ''}`}>
                {t(join.form.help.ne, join.form.help.en)}
              </label>
              <div className="flex flex-wrap gap-3">
                {join.form.options.map((option, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-didi-black/20 rounded-xl cursor-pointer hover:border-didi-red transition-colors"
                  >
                    <input
                      type="radio"
                      name="help"
                      value={option.en}
                      onChange={(e) => setFormData({ ...formData, help: e.target.value })}
                      className="accent-didi-red"
                    />
                    <span className={language === 'ne' ? 'font-nepali font-medium' : 'font-medium'}>
                      {t(option.ne, option.en)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <button type="submit" className="btn-primary w-full">
                {t('सहभागी बन्नुहोस् ', 'Join ')}<span className="text-didi-red">★</span>
              </button>
              <button type="button" className="btn-secondary w-full">
                {t('स्वयंसेवक ', 'Volunteer ')}<span className="text-didi-red">★</span>
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="btn-outline w-full"
              >
                {copied ? t('प्रतिलिपि भयो! ★', 'Copied! ★') : t('साझा गर्नुहोस् ', 'Share ')}<span className="text-didi-red">★</span>
              </button>
            </div>

            {/* Privacy Notice */}
            <p className={`text-center text-sm text-didi-black/60 pt-4 ${language === 'ne' ? 'font-nepali' : ''}`}>
              {t(join.privacy.ne, join.privacy.en)}
            </p>
          </form>
        </motion.div>

        {/* Bottom Star */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, type: 'spring' }}
          className="text-center mt-12 text-didi-red text-6xl"
        >
          ★
        </motion.div>
      </div>
    </section>
  )
}
