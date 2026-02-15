'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe, ChevronRight } from 'lucide-react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { ne: 'गृहपृष्ठ', en: 'Home', href: '/' },
    { ne: 'किन दिदी', en: 'Why Didi', href: isHome ? '#why-didi' : '/#why-didi' },
    { ne: 'दृष्टिकोण', en: 'Vision', href: isHome ? '#didi-acronym' : '/#didi-acronym' },
    { ne: 'प्रभाव', en: 'Impact', href: isHome ? '#impact' : '/#impact' },
    { ne: 'तथ्य', en: 'Facts', href: isHome ? '#facts' : '/#facts' },
    { ne: 'घोषणापत्र', en: 'Manifesto', href: isHome ? '#manifesto' : '/#manifesto' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || !isHome || mobileMenuOpen
        ? 'bg-didi-black/80 backdrop-blur-lg shadow-lg border-b border-white/5 py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <nav className="container-custom flex items-center justify-center gap-8">

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 bg-white/5 backdrop-blur-sm rounded-full px-2 py-1 border border-white/5">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="relative px-5 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 group"
            >
              <span className={`relative z-10 ${language === 'ne' ? 'font-nepali' : ''}`}>
                {t(link.ne, link.en)}
              </span>
              <motion.span
                className="absolute inset-x-0 bottom-0 h-full bg-white/10 rounded-full -z-0 origin-bottom scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
              />
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            <button
              onClick={() => setLanguage('ne')}
              className={`relative px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${language === 'ne'
                ? 'bg-didi-red text-white shadow-lg'
                : 'text-white/60 hover:text-white'
                }`}
            >
              <span className="text-sm">🇳🇵</span>
              <span>नेपाली</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`relative px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${language === 'en'
                ? 'bg-white/20 text-white shadow-lg'
                : 'text-white/60 hover:text-white'
                }`}
            >
              <span className="text-sm">🇬🇧</span>
              <span>EN</span>
            </button>
          </div>

          {/* CTA Button */}
          <a href="/support" className="btn-primary !px-6 !py-2.5 !rounded-full text-sm shadow-glow-red hover:shadow-glow-red-lg transition-all duration-300 flex items-center gap-2">
            <span>{t('समर्थन', 'Support')}</span>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">★</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center text-white bg-white/10 rounded-full border border-white/5 hover:bg-didi-red transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-0 z-40 bg-didi-black/95 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-6"
            >
              {/* Mobile Nav Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-4 rounded-xl text-white/80 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all active:scale-95"
                    >
                      <span className={`text-lg font-medium ${language === 'ne' ? 'font-nepali' : ''}`}>
                        {t(link.ne, link.en)}
                      </span>
                      <ChevronRight size={16} className="text-white/40" />
                    </a>
                  </motion.div>
                ))}
              </div>

              <div className="my-6 border-t border-white/10" />

              {/* Mobile Language & CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between bg-white/5 p-1 rounded-full">
                  <button
                    onClick={() => setLanguage('ne')}
                    className={`flex-1 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 ${language === 'ne'
                      ? 'bg-didi-red text-white shadow-lg'
                      : 'text-white/60'
                      }`}
                  >
                    <span className="text-lg">🇳🇵</span> नेपाली
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`flex-1 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 ${language === 'en'
                      ? 'bg-white/20 text-white'
                      : 'text-white/60'
                      }`}
                  >
                    <span className="text-lg">🇬🇧</span> English
                  </button>
                </div>

                <a href="/support" className="btn-primary w-full flex items-center justify-center gap-2 !py-4 rounded-xl text-lg shadow-glow-red">
                  {t('समर्थन जनाउनुहोस्', 'Support Campaign')}
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">★</span>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
