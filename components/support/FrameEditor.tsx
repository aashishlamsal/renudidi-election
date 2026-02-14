'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva'
import useImage from 'use-image'

interface FrameEditorProps {
    userImageSrc: string | null
    frameSrc: string | null
    zoom: number
    rotation: number
    stageRef: React.RefObject<any>
    isSelected: boolean
    setIsSelected: (selected: boolean) => void
}

const FrameEditor: React.FC<FrameEditorProps> = ({
    userImageSrc,
    frameSrc,
    zoom,
    rotation,
    stageRef,
    isSelected,
    setIsSelected
}) => {
    const [uImg] = useImage(userImageSrc || '', 'anonymous')
    const [fImg] = useImage(frameSrc || '', 'anonymous')
    const imageRef = useRef<any>(null)
    const trRef = useRef<any>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [stageSize, setStageSize] = useState({ width: 600, height: 600, scale: 1 })

    // Center image when loaded
    const [pos, setPos] = useState({ x: 300, y: 300 })

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth
                const scale = width / 600
                setStageSize({
                    width: width,
                    height: width, // maintain square
                    scale: scale
                })
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (uImg) {
            setPos({ x: 300, y: 300 })
            setIsSelected(true)
        }
    }, [uImg, setIsSelected])

    useEffect(() => {
        if (isSelected && trRef.current && imageRef.current) {
            trRef.current.nodes([imageRef.current])
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
                    {/* Frame Background (Drawn First) */}
                    {fImg && (
                        <KonvaImage
                            image={fImg}
                            width={600}
                            height={600}
                            listening={false}
                        />
                    )}

                    {/* User Photo (Drawn Second - On Top) */}
                    {uImg && (
                        <KonvaImage
                            image={uImg}
                            ref={imageRef}
                            x={pos.x}
                            y={pos.y}
                            width={uImg.width * (300 / Math.min(uImg.width, uImg.height)) * zoom}
                            height={uImg.height * (300 / Math.min(uImg.width, uImg.height)) * zoom}
                            offsetX={(uImg.width * (300 / Math.min(uImg.width, uImg.height)) * zoom) / 2}
                            offsetY={(uImg.height * (300 / Math.min(uImg.width, uImg.height)) * zoom) / 2}
                            rotation={rotation}
                            draggable
                            onClick={() => setIsSelected(true)}
                            onTap={() => setIsSelected(true)}
                            onDragStart={() => setIsSelected(true)}
                        />
                    )}

                    {/* Transformer Handles */}
                    {isSelected && (
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

            {!userImageSrc && !frameSrc && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-didi-black/40 p-8 text-center pointer-events-none">
                    <div className="text-6xl mb-4">🖼️</div>
                    <p className="font-bold">Select a background and upload your photo to preview</p>
                </div>
            )}
        </div>
    )
}

export default FrameEditor
