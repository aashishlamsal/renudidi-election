'use client'

import NextImage from 'next/image'
import content from '@/content.json'
import { useLanguage } from '@/lib/LanguageContext'

export default function Footer() {
  const { footer } = content
  const { language, t } = useLanguage()

  return (
    <footer className="bg-didi-black text-white py-12 md:py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div>
            <div className="mb-4">
              <NextImage
                src="/images/footer-logo.png"
                alt="Renu Didi Logo"
                width={120}
                height={120}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-white/70 font-nepali mb-2">
              जनताको, जनताबाट, जनताको लागि
            </p>
            <p className="text-white/60 text-sm">
              Of the people, by the people, for the people
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-lg mb-4 text-didi-red">{t('द्रुत लिङ्कहरू', 'Quick Links')}</h4>
            <ul className="space-y-2">
              {footer.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-didi-red transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-didi-red">★</span>
                    <span className={language === 'ne' ? 'font-nepali' : ''}>{t(link.text.ne, link.text.en)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-lg mb-4 text-didi-red">
              {t('सम्पर्क', 'Contact')}
            </h4>
            <div className="space-y-3">
              <p className={`text-white/70 ${language === 'ne' ? 'font-nepali' : ''}`}>
                {t(footer.contact.ne, footer.contact.en)}
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-didi-red rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Facebook"
                >
                  f
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-didi-red rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Twitter"
                >
                  𝕏
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-didi-red rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Instagram"
                >
                  IG
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              {footer.copyright}
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-didi-red transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-didi-red transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Star Decoration */}
        <div className="text-center mt-8 text-didi-red/30 text-3xl">
          ★ ★ ★
        </div>
      </div>
    </footer>
  )
}
