'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { ne: 'गृहपृष्ठ', en: 'Home', href: '/' },
    { ne: 'DIDI', en: 'DIDI', href: isHome ? '#why-didi' : '/#why-didi' },
    { ne: 'दृष्टिकोण', en: 'Vision', href: isHome ? '#didi-acronym' : '/#didi-acronym' },
    { ne: 'प्रभाव', en: 'Impact', href: isHome ? '#impact' : '/#impact' },
    { ne: 'तथ्य', en: 'Facts', href: isHome ? '#facts' : '/#facts' },
    { ne: 'घोषणापत्र', en: 'Manifesto', href: isHome ? '#manifesto' : '/#manifesto' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-didi-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-center">
          {/* Desktop Nav - Centered */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-white hover:text-didi-red transition-colors duration-200 font-medium"
              >
                <div className="text-center">
                  <span className={language === 'ne' ? 'font-nepali' : ''}>
                    {t(link.ne, link.en)}
                  </span>
                </div>
              </a>
            ))}

            {/* Language Toggle */}
            <div className="flex items-center gap-2 bg-white/10 rounded-full p-1 ml-4">
              <button
                onClick={() => setLanguage('ne')}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${language === 'ne'
                  ? 'bg-didi-red text-white shadow-lg'
                  : 'text-white/70 hover:text-white'
                  }`}
              >
                नेपाली
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${language === 'en'
                  ? 'bg-didi-red text-white shadow-lg'
                  : 'text-white/70 hover:text-white'
                  }`}
              >
                English
              </button>
            </div>

            {/* CTA Button */}
            <a href="/support" className="btn-primary !px-5 !py-2 !rounded-full text-sm ml-4">
              {t('समर्थन जनाउनुहोस् ', 'Support ')}<span className="text-white">★</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white text-2xl ml-auto"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pb-4 border-t border-white/20"
          >
            {/* Mobile Language Toggle */}
            <div className="flex items-center gap-2 bg-white/10 rounded-full p-1 mb-4">
              <button
                onClick={() => setLanguage('ne')}
                className={`flex-1 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${language === 'ne'
                  ? 'bg-didi-red text-white shadow-lg'
                  : 'text-white/70'
                  }`}
              >
                नेपाली
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${language === 'en'
                  ? 'bg-didi-red text-white shadow-lg'
                  : 'text-white/70'
                  }`}
              >
                English
              </button>
            </div>

            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-white hover:text-didi-red transition-colors"
              >
                <span className={language === 'ne' ? 'font-nepali font-bold' : 'font-bold'}>
                  {t(link.ne, link.en)}
                </span>
              </a>
            ))}
            <a href="/support" className="btn-primary w-full mt-4 block text-center !rounded-full !py-3">
              {t('समर्थन जनाउनुहोस् ', 'Support ')}<span className="text-white">★</span>
            </a>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}
