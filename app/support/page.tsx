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
            setStep(3)
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
                    // Friendly status updates
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

        // Deselect photo to hide transformer handles in the export
        setIsSelected(false)

        // Use a small timeout to ensure React re-renders without handles
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
                    {/* Decorative Background */}
                    <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,#FF0000_1px,transparent_0)] bg-[size:40px_40px]" />
                    </div>

                    <div className="container-custom relative z-10">
                        <div className="max-w-4xl mx-auto">
                            {/* Stepper Header */}
                            <div className="text-center mb-12">
                                <h1 className="section-title text-didi-red mb-4">
                                    {t('तपाईंको समर्थन फ्रेम बनाउनुहोस्', 'Create Your Support Frame')}
                                </h1>
                                <p className="text-lg text-didi-black/60 font-medium max-w-2xl mx-auto">
                                    {t('आफ्नो फोटो छनोट गर्नुहोस् र रेनु दिदीलाई समर्थन जनाउनुहोस्। यो पूर्ण रूपमा सुरक्षित छ र तपाईंको ब्राउजरमा मात्र प्रशोधन गरिन्छ।', 'Choose a frame, upload your photo, and show your support for Renu Didi. 100% private - processed in your browser only.')}
                                </p>
                            </div>

                            {/* Step Indicators */}
                            <div className="flex justify-center items-center gap-4 mb-12">
                                {[1, 2, 3].map((s) => (
                                    <React.Fragment key={s}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-didi-red text-white' : 'bg-didi-gray text-didi-black/30'}`}>
                                            {s}
                                        </div>
                                        {s < 3 && <div className={`h-1 w-12 rounded-full ${step > s ? 'bg-didi-red' : 'bg-didi-gray'}`} />}
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="flex flex-col gap-12 items-center">

                                {/* Top: Preview / Stage */}
                                <div className="w-full max-w-[600px] space-y-6">
                                    <FrameEditor
                                        userImageSrc={userImage}
                                        frameSrc={selectedFrame}
                                        zoom={zoom}
                                        rotation={rotation}
                                        stageRef={stageRef}
                                        isSelected={isSelected}
                                        setIsSelected={setIsSelected}
                                    />

                                    {/* Preview is now cleaner without extra buttons below */}
                                </div>

                                {/* Bottom: Controls */}
                                <div className="w-full max-w-[600px] bg-didi-gray/50 p-6 md:p-10 rounded-3xl border-2 border-didi-black/5 shadow-inner">
                                    <AnimatePresence mode="wait">
                                        {/* Step 1: Photo Upload & Optional BG Removal */}
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-8"
                                            >
                                                <h3 className="text-xl font-bold flex items-center gap-2">
                                                    <span className="text-didi-red">★</span> {t('फोटो अपलोड गर्नुहोस्', '1. Upload Photo')}
                                                </h3>

                                                {!userImage ? (
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
                                                ) : (
                                                    <div className="space-y-6">
                                                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-white border-2 border-didi-black/5">
                                                            <img src={userImage} alt="Uploaded" className="w-full h-full object-contain" />
                                                            <button
                                                                onClick={() => { setUserImage(null); setStep(1); }}
                                                                className="absolute top-4 right-4 bg-didi-red text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>

                                                        {/* Optional BG Removal */}
                                                        <div className="bg-white p-6 rounded-2xl border border-didi-black/5 shadow-sm">
                                                            <p className="text-sm font-bold mb-4">{t('वैकल्पिक: पृष्ठभूमि हटाउनुहोस्', 'Optional: Remove Background')}</p>
                                                            <button
                                                                onClick={handleRemoveBg}
                                                                disabled={isProcessing}
                                                                className={`w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-3 transition-all ${isProcessing ? 'bg-didi-gray text-didi-black/30' : 'bg-didi-black text-white hover:scale-[1.02] shadow-xl'}`}
                                                            >
                                                                {isProcessing ? (
                                                                    <div className="flex flex-col items-center gap-2">
                                                                        <div className="flex items-center gap-3">
                                                                            <span className="animate-spin text-xl">✨</span>
                                                                            <span>{progressStatus || t('प्रशोधन हुँदै...', 'Processing AI...')}</span>
                                                                        </div>
                                                                        <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden mt-1">
                                                                            <motion.div
                                                                                className="h-full bg-white"
                                                                                initial={{ width: 0 }}
                                                                                animate={{ width: `${progressPercent}%` }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <span className="text-xl">✨</span>
                                                                        {t('पृष्ठभूमि हटाउनुहोस् (AI)', 'Remove Background (AI)')}
                                                                    </>
                                                                )}
                                                            </button>
                                                            <p className="mt-4 text-[10px] text-center text-didi-black/40 uppercase tracking-widest leading-relaxed">
                                                                {t('गोपनीयता ग्यारेन्टी: सर्भरमा डाटा पठाइँदैन', 'Privacy Guarantee: No data sent to servers')}
                                                            </p>
                                                        </div>

                                                        <button
                                                            onClick={() => {
                                                                setStep(2);
                                                                // Pre-warm the AI engine for the next photo or future use
                                                                removeBackground('', { model: 'isnet_quint8' }).catch(() => { });
                                                            }}
                                                            className="w-full btn-primary py-4 shadow-xl hover:scale-[1.02] transition-all"
                                                        >
                                                            {t('अर्को: फ्रेम छनोट गर्नुहोस्', 'Next: Choose Frame')} →
                                                        </button>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}

                                        {/* Step 2: Frame Selection (Horizontal Carousel) */}
                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                            >
                                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                                    <span className="text-didi-red">★</span> {t('फ्रेम छनोट गर्नुहोस्', '2. Choose Support Frame')}
                                                </h3>

                                                {/* Frame Carousel */}
                                                <div className="relative group">
                                                    <div className="flex overflow-x-auto gap-4 pb-6 snap-x no-scrollbar">
                                                        {FRAMES.map((f) => (
                                                            <button
                                                                key={f.id}
                                                                onClick={() => {
                                                                    setSelectedFrame(f.src);
                                                                    setStep(3);
                                                                }}
                                                                className={`flex-none w-48 snap-center group relative aspect-square rounded-2xl overflow-hidden border-4 transition-all ${selectedFrame === f.src ? 'border-didi-red shadow-xl scale-[1.05]' : 'border-transparent bg-white hover:border-didi-red/50 shadow-md'}`}
                                                            >
                                                                <div className="absolute inset-0 bg-didi-red/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                                    <span className="bg-didi-red text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">SELECT</span>
                                                                </div>
                                                                <img
                                                                    src={f.src}
                                                                    alt={f.name}
                                                                    className="w-full h-full object-cover p-2"
                                                                />
                                                                <div className="absolute bottom-0 left-0 right-0 bg-didi-red/90 text-white text-[10px] font-black py-2 px-1 text-center truncate">
                                                                    {f.name.toUpperCase()}
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                    {/* Hint for scrolling */}
                                                    <div className="flex justify-center gap-1 mt-2">
                                                        {FRAMES.map((_, i) => (
                                                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-didi-red/20" />
                                                        ))}
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => setStep(1)}
                                                    className="mt-8 text-sm font-bold text-didi-red hover:underline flex items-center gap-2 mx-auto"
                                                >
                                                    ← {t('फोटो परिवर्तन गर्नुहोस्', 'Change Photo')}
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* Step 3: Polish & Download */}
                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-8"
                                            >
                                                <h3 className="text-xl font-bold flex items-center gap-2">
                                                    <span className="text-didi-red">★</span> {t('समायोजन गर्नुहोस्', '3. Adjust & Download')}
                                                </h3>

                                                <div className="bg-white p-4 rounded-2xl border border-didi-black/5 shadow-sm space-y-4">
                                                    <p className="text-sm text-didi-black/60 font-medium">
                                                        💡 <strong>{t('टिप:', 'Tip:')}</strong> {t('तपाईं आफ्नो फोटोलाई तान्न (drag), घुमाउन (rotate) र कुनाहरूबाट आकार परिवर्तन (resize) गर्न सक्नुहुन्छ। फ्रेम फिक्स गरिएको छ।', 'You can drag, rotate, and resize your photo directly on the canvas. The frame is fixed.')}
                                                    </p>

                                                    <button
                                                        onClick={() => setStep(2)}
                                                        className="w-full py-3 border-2 border-didi-red/10 rounded-xl text-didi-red font-bold hover:bg-didi-red/5 transition-colors text-sm"
                                                    >
                                                        🎨 {t('अर्को फ्रेम प्रयास गर्नुहोस्', 'Try Another Frame')}
                                                    </button>
                                                </div>

                                                {/* Final Actions */}
                                                <div className="pt-6 border-t border-didi-black/5 flex gap-3">
                                                    <button
                                                        onClick={handleDownload}
                                                        className="flex-[2] btn-primary flex items-center justify-center gap-2 py-4 text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                                                    >
                                                        <span>💾</span> {t('डाउनलोड गर्नुहोस्', 'Download Frame')}
                                                    </button>
                                                    <button
                                                        onClick={() => { setStep(1); setSelectedFrame(null); setUserImage(null); setZoom(1); setRotation(0); }}
                                                        className="flex-1 btn-outline bg-white py-4 shadow-sm hover:bg-didi-gray transition-all text-sm font-bold"
                                                    >
                                                        {t('रिसेट', 'Reset')}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
