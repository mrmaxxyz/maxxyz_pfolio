"use client";

import { BentoGrid, BentoGridItem } from "@/components/BentoGrid";
import { urlFor } from "@/lib/sanity";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface GalleryProps {
    images: any[];
    layout?: 'masonry' | 'bento';
}

export function Gallery({ images, layout = 'bento' }: GalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (selectedIndex === null) return;
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === 'Escape') setSelectedIndex(null);
    };

    const navigate = (direction: number) => {
        if (selectedIndex === null) return;
        const validImages = images.filter(img => img && (img.asset || img._ref));
        const newIndex = (selectedIndex + direction + validImages.length) % validImages.length;
        setSelectedIndex(newIndex);
    };

    // Add event listener for keyboard navigation
    if (typeof window !== 'undefined') {
        window.onkeydown = handleKeyDown;
    }

    if (!images || images.length === 0) return null;

    // Filter out null or invalid images (простая проверка на существование)
    const validImages = images.filter(img => img && (img.asset || img._ref));
    if (validImages.length === 0) return null;

    const selectedImage = selectedIndex !== null ? validImages[selectedIndex] : null;

    return (
        <>
            {layout === 'bento' ? (
                <BentoGrid className="max-w-7xl mx-auto">
                    {validImages.map((image, i) => (
                        <BentoGridItem
                            key={i}
                            colSpan={i === 0 || i % 4 === 0 ? 2 : 1}
                            rowSpan={i === 0 || i % 4 === 0 ? 2 : 1}
                            className={i === 0 || i % 4 === 0 ? "md:col-span-2 md:row-span-2" : ""}
                        >
                            <div
                                className="relative w-full h-full min-h-[200px] rounded-xl overflow-hidden group cursor-pointer"
                                onClick={() => setSelectedIndex(i)}
                            >
                                <Image
                                    src={urlFor(image).width(800).url()}
                                    alt={image.alt || "Gallery Image"}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                {image.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-sm font-medium">{image.caption}</p>
                                    </div>
                                )}
                            </div>
                        </BentoGridItem>
                    ))}
                </BentoGrid>
            ) : (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                    {validImages.map((image, i) => (
                        <div
                            key={i}
                            className="relative rounded-xl overflow-hidden group cursor-pointer break-inside-avoid mb-4"
                            onClick={() => setSelectedIndex(i)}
                        >
                            <Image
                                src={urlFor(image).width(800).url()}
                                alt={image.alt || "Gallery Image"}
                                width={800}
                                height={600}
                                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            {image.caption && (
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-sm font-medium">{image.caption}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedIndex(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
                    >
                        <button
                            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50"
                            onClick={() => setSelectedIndex(null)}
                        >
                            <X size={32} />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-2"
                            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-2"
                            onClick={(e) => { e.stopPropagation(); navigate(1); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>

                        <motion.div
                            key={selectedIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset }) => {
                                const swipe = offset.x;
                                if (swipe < -50) {
                                    navigate(1);
                                } else if (swipe > 50) {
                                    navigate(-1);
                                }
                            }}
                        >
                            <Image
                                src={urlFor(selectedImage).width(1920).url()}
                                alt={selectedImage.alt || "Full screen image"}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                            {selectedImage.caption && (
                                <div className="absolute bottom-4 left-0 right-0 text-center text-white/90 bg-black/50 p-2 rounded-lg backdrop-blur-md max-w-xl mx-auto">
                                    {selectedImage.caption}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
