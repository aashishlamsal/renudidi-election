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
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const { language, t } = useLanguage()

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()  // ← This stops any native form submission / redirect
    e.stopPropagation() // Extra safeguard

    setIsSubmitting(true)
    setIsSubmitted(false)
    setError(null)

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          contact: '',
          message: '',
        })
        // Auto-hide success message after 6 seconds
        setTimeout(() => setIsSubmitted(false), 6000)
      } else {
        setError(
          t(
            'केही समस्या भयो। कृपया फेरि प्रयास गर्नुहोस्।',
            'Something went wrong. Please try again.'
          )
        )
      }
    } catch (err) {
      setError(
        t(
          'इन्टरनेट जडान जाँच गर्नुहोस् वा पछि प्रयास गर्नुहोस्।',
          'Check your internet connection or try again later.'
        )
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText('https://renuformp.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="join"
      ref={ref}
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FF0101 0%, #0B0B0F 100%)',
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
          className="max-w-2xl mx-auto bg-white rounded-3xl p-6 md:p-12 shadow-2xl"
        >
          <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
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

            {/* Message Field (Textarea) */}
            <div>
              <label className={`block mb-2 font-semibold text-didi-black ${language === 'ne' ? 'font-nepali' : ''}`}>
                {t(join.form.message.ne, join.form.message.en)}
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border-2 border-didi-black/20 rounded-xl focus:border-didi-red focus:outline-none transition-colors resize-none"
                placeholder={t(join.form.placeholder.ne, join.form.placeholder.en)}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-black text-lg transition-all duration-300 border-2 border-didi-red flex items-center justify-center gap-2
                  ${isSubmitting
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-white text-didi-red hover:bg-didi-red hover:text-white shadow-xl hover:scale-[1.02]'
                  } ${language === 'ne' ? 'font-nepali' : ''}`}
              >
                {isSubmitting
                  ? t('पठाउँदै...', 'Submitting...')
                  : `${t(join.form.submit.ne, join.form.submit.en)} ★`
                }
              </button>
            </div>

            {/* Success Message */}
            {isSubmitted && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-center">
                <p className={`font-semibold ${language === 'ne' ? 'font-nepali' : ''}`}>
                  {t(
                    'धन्यवाद! तपाईंको सुझाव सफलतापूर्वक पठाइयो। ★',
                    'Thank you! Your suggestion has been successfully sent. ★'
                  )}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-center">
                {error}
              </div>
            )}

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