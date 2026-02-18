'use client'

import NextImage from 'next/image'
import content from '@/content.json'
import { useLanguage } from '@/lib/LanguageContext'
import { Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  const { footer } = content
  const { language, t } = useLanguage()

  return (
    <footer className="bg-didi-black text-white py-12 md:py-16 border-t border-white/5">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-32 mb-10 px-4 md:px-0">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="relative group">
              <div className="absolute -inset-4 bg-didi-red/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <NextImage
                src="/images/footer-logo.png"
                alt="Renu Didi Logo"
                width={120}
                height={120}
                className="relative z-10 brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-nepali text-white/90">
                भरतपुरबाट संघसम्म
              </p>
              <p className="text-didi-red font-medium tracking-wide text-xs uppercase">
                Bharatpur to Parliament
              </p>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4">
            <div className="space-y-1">
              <h4 className="font-black text-xl text-white tracking-tight">
                {t('सम्पर्क', 'Stay Connected')}
              </h4>
              <div className="h-1 w-10 bg-didi-red ml-auto md:mr-0 rounded-full" />
            </div>

            <div className="space-y-4">
              <p className={`text-white/60 text-base hover:text-white transition-colors duration-300 ${language === 'ne' ? 'font-nepali' : ''}`}>
                {t(footer.contact.ne, footer.contact.en)}
              </p>

              <div className="flex gap-3 justify-center md:justify-end">
                {[
                  { label: 'Facebook', icon: <Facebook size={18} />, href: 'https://www.facebook.com/renu.dahal.9' },
                  {
                    label: 'Twitter',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
                      </svg>
                    ),
                    href: 'https://x.com/RenuDahal1'
                  },
                  { label: 'Instagram', icon: <Instagram size={18} />, href: 'https://www.instagram.com/renudaha33' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 hover:bg-didi-red border border-white/10 hover:border-didi-red rounded-lg flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <span className="text-white group-hover:scale-110 transition-transform">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Centered Copyright */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/40 text-[10px] tracking-widest uppercase font-medium">
              {footer.copyright}
            </p>

            {/* Star Decoration */}
            <div className="flex items-center gap-3 text-didi-red/20">
              <div className="h-px w-8 bg-current" />
              <span className="text-xl">★</span>
              <div className="h-px w-8 bg-current" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
