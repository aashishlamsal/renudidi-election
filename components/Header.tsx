'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronRight } from 'lucide-react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
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

  // ScrollSpy Implementation
  useEffect(() => {
    if (!isHome) return

    const sections = ['hero', 'why-didi', 'didi-acronym', 'impact', 'manifesto']
    const observerOptions = {
      root: null,
      threshold: 0.5,
      // Adjust margin to trigger slightly before the section hits the top
      rootMargin: '-10% 0px -40% 0px'
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [isHome])

  const navLinks = [
    { ne: 'गृहपृष्ठ', en: 'Home', href: '/', id: 'hero' },
    { ne: 'किन दिदी', en: 'Why Didi', href: isHome ? '#why-didi' : '/#why-didi', id: 'why-didi' },
    { ne: 'दृष्टिकोण', en: 'Vision', href: isHome ? '#didi-acronym' : '/#didi-acronym', id: 'didi-acronym' },
    { ne: 'प्रभाव', en: 'Impact', href: isHome ? '#impact' : '/#impact', id: 'impact' },
    { ne: 'घोषणापत्र', en: 'Manifesto', href: isHome ? '#manifesto' : '/#manifesto', id: 'manifesto' },
  ]

  // Determine if a nav link is active
  const isActiveLink = (linkId: string) => {
    if (isHome) {
      return activeSection === linkId
    }
    // Simple fallback for support page
    return false
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || !isHome || mobileMenuOpen
        ? 'bg-didi-black shadow-lg border-b border-white/5 py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <nav className="container-custom flex items-center justify-between lg:justify-center gap-4">

        {/* Desktop: Centered Nav */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-1 bg-white/5 backdrop-blur-sm rounded-full px-2 py-1 border border-white/5">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 group ${isActiveLink(link.id)
                  ? 'text-didi-red'
                  : 'text-white/80 hover:text-white'
                  }`}
              >
                <span className={`relative z-10 ${language === 'ne' ? 'font-nepali' : ''}`}>
                  {t(link.ne, link.en)}
                </span>
                {isActiveLink(link.id) && (
                  <motion.span
                    layoutId="activeNavDesktop"
                    className="absolute inset-0 bg-didi-red/10 rounded-full -z-0"
                  />
                )}
                <motion.span
                  className="absolute inset-x-0 bottom-0 h-full bg-white/10 rounded-full -z-0 origin-bottom scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                />
              </a>
            ))}
          </div>

          {/* Desktop Language Toggle */}
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            <button
              onClick={() => setLanguage('ne')}
              className={`relative w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center overflow-hidden border-2 ${language === 'ne'
                ? 'border-didi-red bg-didi-red/20 shadow-lg scale-110 shadow-didi-red/20'
                : 'border-transparent hover:bg-white/10 opacity-70 hover:opacity-100'
                }`}
              aria-label="Switch to Nepali"
              title="नेपाली"
            >
              <img src="https://flagcdn.com/np.svg" alt="Nepal Flag" className="w-5 h-auto drop-shadow-sm" />
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`relative w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center overflow-hidden border-2 ${language === 'en'
                ? 'border-didi-red bg-didi-red/20 shadow-lg scale-110 shadow-didi-red/20'
                : 'border-transparent hover:bg-white/10 opacity-70 hover:opacity-100'
                }`}
              aria-label="Switch to English"
              title="English"
            >
              <img src="https://flagcdn.com/gb.svg" alt="UK Flag" className="w-6 h-auto drop-shadow-sm rounded-[1px]" />
            </button>
          </div>

          <a href="/support" className="btn-primary !px-7 !py-2.5 !rounded-full text-sm shadow-glow-red hover:shadow-glow-red-lg transition-all duration-300 flex items-center gap-2">
            <span>{t('समर्थन', 'Support')}</span>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">★</span>
          </a>
        </div>

        {/* Mobile: Hamburger on Right */}
        <div className="lg:hidden flex items-center w-full justify-end">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-50 w-11 h-11 flex items-center justify-center text-white bg-white/10 rounded-full border border-white/5 hover:bg-didi-red transition-all duration-300 active:scale-90"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-0 z-40 bg-didi-black lg:hidden flex flex-col pt-24 px-6"
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
                      className={`relative flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-95 ${isActiveLink(link.id)
                        ? 'text-didi-red bg-didi-red/10 border-didi-red/30'
                        : 'text-white/80 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10'
                        }`}
                    >
                      <span className={`relative z-10 text-lg font-bold ${language === 'ne' ? 'font-nepali' : ''}`}>
                        {t(link.ne, link.en)}
                      </span>
                      {isActiveLink(link.id) && (
                        <motion.span
                          layoutId="activeNavMobile"
                          className="absolute inset-0 bg-didi-red/5 rounded-2xl -z-0"
                        />
                      )}
                      <ChevronRight size={18} className={isActiveLink(link.id) ? 'text-didi-red' : 'text-white/40'} />
                    </a>
                  </motion.div>
                ))}
              </div>

              <div className="my-8 border-t border-white/10" />

              {/* Mobile Language - Inside Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-center gap-6 bg-white/5 p-4 rounded-3xl border border-white/5">
                  <button
                    onClick={() => setLanguage('ne')}
                    className={`group flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 ${language === 'ne'
                      ? 'bg-didi-red text-white shadow-xl scale-110 shadow-didi-red/20'
                      : 'text-white/40 hover:text-white/80'
                      }`}
                  >
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-white/20 transition-all">
                      <img src="https://flagcdn.com/np.svg" alt="Nepal Flag" className="w-8 h-auto" />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">नेपाली</span>
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`group flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 ${language === 'en'
                      ? 'bg-didi-red text-white shadow-xl scale-110 shadow-didi-red/20'
                      : 'text-white/40 hover:text-white/80'
                      }`}
                  >
                    <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-white/20 transition-all">
                      <img src="https://flagcdn.com/gb.svg" alt="UK Flag" className="w-11 h-auto rounded-sm" />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">English</span>
                  </button>
                </div>

                <a href="/support" className="btn-primary w-full flex items-center justify-center gap-3 !py-5 rounded-2xl text-lg font-bold shadow-glow-red active:scale-[0.98] transition-all">
                  {t('समर्थन जनाउनुहोस्', 'Support Campaign')}
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs">★</span>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
