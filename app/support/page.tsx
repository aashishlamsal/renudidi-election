'use client'

import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { removeBackground } from '@imgly/background-removal'

// Dynamically import Konva component to avoid SSR issues
const FrameEditor = dynamic(() => import('@/components/support/FrameEditor'), {
    ssr: false,
    loading: () => <div className="w-full aspect-square bg-didi-gray animate-pulse rounded-2xl" />
})

const FRAMES = [
    { id: 'frame1', name: 'Classic Red Star', src: '/frames/frame1.png', preview: '/frames/frame1.png' },
    { id: 'frame2', name: 'DIDI Support', src: '/frames/frame2.png', preview: '/frames/frame2.png' },
    { id: 'frame3', name: 'Himalayan Gradient', src: '/frames/frame3.png', preview: '/frames/frame3.png' },
    { id: 'frame4', name: 'Vote for DIDI', src: '/frames/frame4.png', preview: '/frames/frame4.png' }
]

export default function SupportPage() {
    const { language, t } = useLanguage()
    const [step, setStep] = useState(1)
    const [selectedFrame, setSelectedFrame] = useState<string | null>(null)
    const [userImage, setUserImage] = useState<string | null>(null)
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [isRemovingBg, setIsRemovingBg] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [progressStatus, setProgressStatus] = useState<string>('')
    const [progressPercent, setProgressPercent] = useState<number>(0)

    const stageRef = useRef<any>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setUserImage(url)
        }
    }

    const handleRemoveBg = async () => {
        if (!userImage) return
        setIsProcessing(true)
        setIsRemovingBg(true)
        setProgressStatus(t('प्रारम्भ गर्दै...', 'Starting...'))
        setProgressPercent(0)

        try {
            const blob = await removeBackground(userImage, {
                model: 'isnet_quint8',
                progress: (key: string, current: number, total: number) => {
                    const pct = Math.round((current / total) * 100)
                    setProgressPercent(pct)
                    if (key.includes('fetch')) setProgressStatus(t('एसेटहरू डाउनलोड गर्दै...', 'Downloading AI assets...'))
                    else if (key.includes('compute')) setProgressStatus(t('फोटो विश्लेषण गर्दै...', 'Analyzing pixels...'))
                    else setProgressStatus(t('प्रशोधन गर्दै...', 'Processing...'))
                }
            })
            const url = URL.createObjectURL(blob)
            setUserImage(url)
            setProgressStatus(t('सफल भयो!', 'Success!'))
        } catch (error) {
            console.error('BG Removal Error:', error)
            alert(t('पृष्ठभूमि हटाउन असफल भयो। कृपया अर्को फोटो प्रयास गर्नुहोस्।', 'Background removal failed. Please try a different photo or proceed as is.'))
        } finally {
            setIsProcessing(false)
            setIsRemovingBg(false)
            setTimeout(() => {
                setProgressStatus('')
                setProgressPercent(0)
            }, 2000)
        }
    }

    const handleDownload = () => {
        if (!stageRef.current) return
        setIsSelected(false)
        setTimeout(() => {
            const dataURL = stageRef.current.toDataURL({ pixelRatio: 2 })
            const link = document.createElement('a')
            link.download = `renudidi-support-frame-${Date.now()}.png`
            link.href = dataURL
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }, 50)
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-24 pb-20">
                <section className="relative py-12 md:py-20 overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,#FF0101_1px,transparent_0)] bg-[size:40px_40px]" />
                    </div>

                    <div className="container-custom relative z-10">
                        <div className="max-w-6xl mx-auto">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <h1 className="section-title text-didi-red mb-4">
                                    {t('तपाईंको समर्थन फ्रेम बनाउनुहोस्', 'Create Your Support Frame')}
                                </h1>
                                <p className="text-lg text-didi-black/60 font-medium max-w-2xl mx-auto">
                                    {t('आफ्नो मनपर्ने फ्रेम छनोट गर्नुहोस् र रेनु दिदीलाई समर्थन जनाउनुहोस्।', 'Pick your favorite frame and show your support for Renu Didi.')}
                                </p>
                            </div>

                            <AnimatePresence mode="wait">
                                {/* Step 1: Frame Grid */}
                                {step === 1 && (
                                    <motion.div
                                        key="grid"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                                    >
                                        {FRAMES.map((f) => (
                                            <motion.button
                                                key={f.id}
                                                whileHover={{ y: -10 }}
                                                onClick={() => {
                                                    setSelectedFrame(f.src);
                                                    setStep(2);
                                                }}
                                                className="group relative aspect-square bg-didi-gray/30 rounded-3xl overflow-hidden border-2 border-transparent hover:border-didi-red/30 transition-all shadow-md hover:shadow-2xl p-4"
                                            >
                                                <div className="absolute inset-0 bg-didi-red/0 group-hover:bg-didi-red/5 transition-colors z-10" />
                                                <img src={f.src} alt={f.name} className="w-full h-full object-contain relative z-20" />
                                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                                                    <span className="bg-didi-red text-white font-black px-6 py-2 rounded-full text-sm shadow-xl">
                                                        {t('यसलाई छनोट गर्नुहोस्', 'CHOOSE THIS')} ★
                                                    </span>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}

                                {/* Step 2: Editor (Now includes Upload) */}
                                {step === 2 && (
                                    <motion.div
                                        key="editor"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="max-w-4xl mx-auto"
                                    >
                                        <div className="flex flex-col lg:flex-row gap-12 items-start">
                                            {/* Preview Side */}
                                            <div className="w-full lg:w-1/2 sticky top-24">
                                                <FrameEditor
                                                    userImageSrc={userImage}
                                                    frameSrc={selectedFrame}
                                                    zoom={zoom}
                                                    setZoom={setZoom}
                                                    rotation={rotation}
                                                    setRotation={setRotation}
                                                    stageRef={stageRef}
                                                    isSelected={isSelected}
                                                    setIsSelected={setIsSelected}
                                                />

                                                <button
                                                    onClick={() => setStep(1)}
                                                    className="mt-6 text-sm font-bold text-didi-black/40 hover:text-didi-red flex items-center gap-2 transition-colors uppercase tracking-widest"
                                                >
                                                    ← {t('फ्रेम परिवर्तन गर्नुहोस्', 'Change Frame')}
                                                </button>
                                            </div>

                                            {/* Controls Side */}
                                            <div className="w-full lg:w-1/2 space-y-8">
                                                <div className="bg-didi-gray/30 p-8 rounded-[32px] border-2 border-didi-black/5">
                                                    {!userImage ? (
                                                        <div className="space-y-6">
                                                            <div className="flex items-center gap-3 mb-4">
                                                                <span className="w-8 h-8 rounded-full bg-didi-red text-white flex items-center justify-center font-bold">1</span>
                                                                <h3 className="text-xl font-bold">{t('आफ्नो फोटो अपलोड गर्नुहोस्', 'Upload Your Photo')}</h3>
                                                            </div>
                                                            <div
                                                                onClick={() => fileInputRef.current?.click()}
                                                                className="aspect-video w-full border-4 border-dashed border-didi-red/20 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-didi-red/5 transition-colors group"
                                                            >
                                                                <div className="text-5xl group-hover:scale-110 transition-transform">📸</div>
                                                                <p className="font-bold text-didi-black/60">{t('फोटो यहाँ तान्नुहोस् वा छुनुहोस्', 'Click to Upload Photo')}</p>
                                                                <input
                                                                    type="file"
                                                                    ref={fileInputRef}
                                                                    onChange={handleFileChange}
                                                                    accept="image/*"
                                                                    className="hidden"
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-8">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="w-8 h-8 rounded-full bg-didi-red text-white flex items-center justify-center font-bold">2</span>
                                                                    <h3 className="text-xl font-bold">{t('फोटो मिलाउनुहोस्', 'Adjust Your Photo')}</h3>
                                                                </div>
                                                                <button
                                                                    onClick={() => setUserImage(null)}
                                                                    className="text-xs font-bold text-didi-red bg-didi-red/10 px-3 py-1.5 rounded-lg hover:bg-didi-red/20 transition-colors"
                                                                >
                                                                    {t('अर्को फोटो', 'REPLACE')}
                                                                </button>
                                                            </div>

                                                            <div className="bg-white p-6 rounded-2xl border border-didi-black/5 shadow-sm space-y-6">
                                                                {/* Zoom Control */}
                                                                <div className="space-y-3">
                                                                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-didi-black/40">
                                                                        <span>{t('जुम', 'ZOOM')}</span>
                                                                        <span>{Math.round(zoom * 100)}%</span>
                                                                    </div>
                                                                    <input
                                                                        type="range"
                                                                        min="0.1"
                                                                        max="3"
                                                                        step="0.01"
                                                                        value={zoom}
                                                                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                                                                        className="w-full accent-didi-red h-1.5 bg-didi-gray rounded-full appearance-none cursor-pointer"
                                                                    />
                                                                </div>

                                                                {/* Rotation Control */}
                                                                <div className="space-y-3">
                                                                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-didi-black/40">
                                                                        <span>{t('घुमाउनुहोस्', 'ROTATE')}</span>
                                                                        <span>{rotation}°</span>
                                                                    </div>
                                                                    <input
                                                                        type="range"
                                                                        min="0"
                                                                        max="360"
                                                                        step="1"
                                                                        value={rotation}
                                                                        onChange={(e) => setRotation(parseInt(e.target.value))}
                                                                        className="w-full accent-didi-red h-1.5 bg-didi-gray rounded-full appearance-none cursor-pointer"
                                                                    />
                                                                </div>

                                                                <div className="h-px bg-didi-black/5" />

                                                                <p className="text-xs text-didi-black/60 font-medium leading-relaxed">
                                                                    💡 <strong>{t('टिप:', 'Tip:')}</strong> {t('तपाईं आफ्नो फोटोलाई सिधै क्यानभासमा तान्न (drag) र आकार परिवर्तन (resize) पनि गर्न सक्नुहुन्छ।', 'You can also drag and resize your photo directly on the canvas.')}
                                                                </p>

                                                                <button
                                                                    onClick={handleRemoveBg}
                                                                    disabled={isProcessing}
                                                                    className={`w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-3 transition-all ${isProcessing ? 'bg-didi-gray text-didi-black/30' : 'bg-didi-black text-white hover:scale-[1.02] shadow-xl'}`}
                                                                >
                                                                    {isProcessing ? (
                                                                        <div className="flex flex-col items-center gap-2">
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="animate-spin">✨</span>
                                                                                <span>{progressStatus} {progressPercent}%</span>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            <span className="text-xl">✨</span>
                                                                            {t('पृष्ठभूमि हटाउनुहोस् (AI)', 'Remove Background (AI)')}
                                                                        </>
                                                                    )}
                                                                </button>
                                                            </div>

                                                            <div className="pt-6 border-t border-didi-black/5">
                                                                <button
                                                                    onClick={handleDownload}
                                                                    className="w-full btn-primary flex items-center justify-center gap-3 py-5 text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                                                                >
                                                                    <span className="text-2xl">💾</span>
                                                                    <span>{t('डाउनलोड गर्नुहोस्', 'Download & Share')}</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Security Trust Badge */}
                                                <div className="flex items-center justify-center gap-6 opacity-40">
                                                    <div className="text-[10px] font-black tracking-widest uppercase text-center border-l-2 border-didi-red pl-4">
                                                        {t('१००% सुरक्षित', '100% SECURE')}
                                                    </div>
                                                    <div className="text-[10px] font-black tracking-widest uppercase text-center border-l-2 border-didi-red pl-4">
                                                        {t('डाटा ब्राउजरमै रहन्छ', 'BROWSER ONLY')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
