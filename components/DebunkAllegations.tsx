'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import content from '@/content.json'
import { useLanguage } from '@/lib/LanguageContext'

export default function DebunkAllegations() {
    const { debunk } = content
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const { language, t } = useLanguage()

    const toggleExpand = (idx: number) => {
        setExpandedIndex(expandedIndex === idx ? null : idx)
    }

    return (
        <section id="facts" ref={ref} className="py-20 md:py-32 relative overflow-hidden bg-didi-gray/30">
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
                        <div className={`text-didi-red ${language === 'ne' ? 'font-nepali' : ''}`}>{t(debunk.title.ne, debunk.title.en)}</div>
                    </h2>
                    <div className="mt-4 max-w-2xl mx-auto">
                        <div className={`text-lg text-didi-black/70 mb-2 ${language === 'ne' ? 'font-nepali' : ''}`}>
                            {t(debunk.subtitle.ne, debunk.subtitle.en)}
                        </div>
                    </div>
                    <div className="mt-6 max-w-3xl mx-auto">
                        <div className={`text-base text-didi-black/60 ${language === 'ne' ? 'font-nepali' : ''}`}>
                            {t(debunk.description.ne, debunk.description.en)}
                        </div>
                    </div>
                </motion.div>

                {/* Allegations Cards */}
                <div className="max-w-4xl mx-auto space-y-6">
                    {debunk.allegations.map((allegation, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 * idx }}
                            className="border-2 border-didi-red/20 rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow"
                        >
                            {/* Claim Header - Clickable */}
                            <button
                                onClick={() => toggleExpand(idx)}
                                className="w-full text-left p-6 md:p-8 bg-gradient-to-r from-didi-red/5 to-transparent hover:from-didi-red/10 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-didi-red text-2xl">★</span>
                                            <div className={`font-bold text-xl text-didi-black ${language === 'ne' ? 'font-nepali' : ''}`}>
                                                {t(allegation.claim.ne, allegation.claim.en)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-didi-red text-2xl transition-transform duration-300" style={{
                                        transform: expandedIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)'
                                    }}>
                                        ▼
                                    </div>
                                </div>
                            </button>

                            {/* Truth & Facts - Expandable */}
                            <motion.div
                                initial={false}
                                animate={{
                                    height: expandedIndex === idx ? 'auto' : 0,
                                    opacity: expandedIndex === idx ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 md:p-8 pt-0 space-y-6">
                                    {/* Truth Section */}
                                    <div className="bg-didi-gray/30 rounded-xl p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-green-600 text-xl">✓</span>
                                            <div className="font-bold text-green-700 uppercase tracking-wide text-sm">
                                                {t('सत्य', 'The Truth')}
                                            </div>
                                        </div>
                                        <div className={`text-base text-didi-black/80 leading-relaxed ${language === 'ne' ? 'font-nepali' : ''}`}>
                                            {t(allegation.truth.ne, allegation.truth.en)}
                                        </div>
                                    </div>

                                    {/* Facts Section */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-didi-red text-xl">★</span>
                                            <div className="font-bold text-didi-red uppercase tracking-wide text-sm">
                                                {t('तथ्यहरू', 'Supporting Facts')}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            {allegation.facts.map((fact, factIdx) => (
                                                <motion.div
                                                    key={factIdx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={expandedIndex === idx ? { opacity: 1, x: 0 } : {}}
                                                    transition={{ duration: 0.3, delay: 0.1 * factIdx }}
                                                    className="flex items-start gap-3 p-4 bg-white border-l-4 border-didi-red rounded-r-lg"
                                                >
                                                    <span className="text-didi-red text-lg mt-1">•</span>
                                                    <div className="flex-1">
                                                        <div className={`text-sm text-didi-black/80 mb-1 ${language === 'ne' ? 'font-nepali' : ''}`}>
                                                            {t(fact.ne, fact.en)}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <button className="px-8 py-4 bg-didi-red text-white rounded-xl font-bold text-lg hover:scale-105 hover:shadow-xl transition-all">
                        {t(debunk.cta.ne, debunk.cta.en)}
                    </button>
                </motion.div>
            </div>
        </section>
    )
}
