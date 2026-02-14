'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva'
import { motion } from 'framer-motion'
import useImage from 'use-image'

interface FrameEditorProps {
    userImageSrc: string | null
    frameSrc: string | null
    zoom: number
    setZoom: (v: number) => void
    rotation: number
    setRotation: (v: number) => void
    stageRef: React.RefObject<any>
    isSelected: boolean
    setIsSelected: (selected: boolean) => void
}

const FrameEditor: React.FC<FrameEditorProps> = ({
    userImageSrc,
    frameSrc,
    zoom,
    setZoom,
    rotation,
    setRotation,
    stageRef,
    isSelected,
    setIsSelected
}) => {
    const [uImg] = useImage(userImageSrc || '', 'anonymous')
    const [fImg] = useImage(frameSrc || '', 'anonymous')

    const userImgRef = useRef<any>(null)
    const frameImgRef = useRef<any>(null)
    const trRef = useRef<any>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [stageSize, setStageSize] = useState({ width: 600, height: 600, scale: 1 })

    // User Photo State
    const [photoPos, setPhotoPos] = useState({ x: 300, y: 300 })

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth
                const scale = width / 600
                setStageSize({
                    width: width,
                    height: width,
                    scale: scale
                })
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // When a new image is uploaded, center it
    useEffect(() => {
        if (uImg) {
            setPhotoPos({ x: 300, y: 300 })
            setRotation(0)
            setZoom(1)
            setIsSelected(true)
        }
    }, [uImg, setIsSelected, setRotation, setZoom])

    useEffect(() => {
        if (isSelected && trRef.current && userImgRef.current) {
            trRef.current.nodes([userImgRef.current])
            trRef.current.getLayer().batchDraw()
        }
    }, [isSelected, uImg])

    return (
        <div ref={containerRef} className="relative w-full aspect-square max-w-[600px] mx-auto bg-didi-gray rounded-2xl overflow-hidden shadow-inner border-2 border-dashed border-didi-black/10">
            <Stage
                width={stageSize.width}
                height={stageSize.height}
                scaleX={stageSize.scale}
                scaleY={stageSize.scale}
                ref={stageRef}
                className="touch-none"
                onClick={(e) => {
                    const clickedOnEmpty = e.target === e.target.getStage()
                    if (clickedOnEmpty) {
                        setIsSelected(false)
                    }
                }}
                onTap={(e) => {
                    const clickedOnEmpty = e.target === e.target.getStage()
                    if (clickedOnEmpty) {
                        setIsSelected(false)
                    }
                }}
            >
                <Layer>
                    {/* 1. Base Layer: User Photo (Interactive) */}
                    {uImg && (
                        <KonvaImage
                            image={uImg}
                            ref={userImgRef}
                            x={photoPos.x}
                            y={photoPos.y}
                            width={uImg.width * (600 / Math.min(uImg.width, uImg.height)) * zoom}
                            height={uImg.height * (600 / Math.min(uImg.width, uImg.height)) * zoom}
                            offsetX={(uImg.width * (600 / Math.min(uImg.width, uImg.height)) * zoom) / 2}
                            offsetY={(uImg.height * (600 / Math.min(uImg.width, uImg.height)) * zoom) / 2}
                            rotation={rotation}
                            draggable
                            onClick={() => setIsSelected(true)}
                            onTap={() => setIsSelected(true)}
                            onDragStart={() => setIsSelected(true)}
                            onDragEnd={(e) => {
                                setPhotoPos({
                                    x: e.target.x(),
                                    y: e.target.y()
                                })
                            }}
                            onTransformEnd={(e) => {
                                const node = userImgRef.current
                                const scaleX = node.scaleX()
                                setZoom(zoom * scaleX)
                                setRotation(node.rotation())

                                node.scaleX(1)
                                node.scaleY(1)
                            }}
                        />
                    )}

                    {/* 2. Top Layer: Frame Overlay (Fixed & Non-interactive) */}
                    {fImg && (
                        <KonvaImage
                            image={fImg}
                            ref={frameImgRef}
                            x={0}
                            y={0}
                            width={600}
                            height={600}
                            listening={false} // Frame is always static and non-clickable
                        />
                    )}

                    {/* Transformer Handles on the User Photo */}
                    {isSelected && uImg && (
                        <Transformer
                            ref={trRef}
                            rotateEnabled={true}
                            enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                            boundBoxFunc={(oldBox, newBox) => {
                                if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                                    return oldBox
                                }
                                return newBox
                            }}
                        />
                    )}
                </Layer>
            </Stage>

            {/* Empty State Overlay */}
            {!userImageSrc && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-didi-red/40 p-8 text-center pointer-events-none">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center"
                    >
                        <div className="text-6xl mb-4 animate-bounce">📸</div>
                        <p className="font-black uppercase tracking-tighter text-2xl mb-1">{frameSrc ? 'Frame Selected' : 'Choose Frame'}</p>
                        <p className="font-bold text-sm opacity-60">ADD PHOTO TO START ★</p>
                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default FrameEditor
