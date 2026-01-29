// components/ProjectModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Screenshot {
    url: string;
    title: string;
    description: string;
}

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        description: string;
        screenshots: Screenshot[];
        tags: string[];
        links?: {
            live?: string;
            github?: string;
        };
    };
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrevious();
            if (e.key === 'ArrowRight') handleNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % project.screenshots.length);
    };

    const handlePrevious = () => {
        setDirection(-1);
        setCurrentIndex((prev) =>
            prev === 0 ? project.screenshots.length - 1 : prev - 1
        );
    };

    const currentScreenshot = project.screenshots[currentIndex];

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95,
        }),
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        transition={{ duration: 0.4 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-gradient-to-br from-ink/95 via-ink/90 to-ink/95 z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-4 md:inset-8 lg:inset-12 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-gradient-to-br from-washi via-washi to-washi/95 rounded-3xl shadow-2xl w-full h-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col border border-gold/30 pointer-events-auto backdrop-blur-xl">

                            {/* Header reduced: only close button (no title/description/tags) */}
                            <div className="relative flex justify-end items-center p-4 border-b border-gold/20 bg-gradient-to-r from-gold/5 to-transparent">
                                <motion.button
                                    whileHover={{ scale: 1.06, rotate: 90 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onClose}
                                    className="p-2 hover:bg-vermillon/10 rounded-xl transition-colors border border-gold/20 backdrop-blur-sm"
                                >
                                    <HiX className="w-6 h-6 text-ink" />
                                </motion.button>
                            </div>

                            {/* Gallery with reduced padding */}
                            <div className="flex-1 overflow-y-auto p-4 md:p-4 scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent">
                                <div className="relative aspect-video bg-gradient-to-br from-ink/5 to-gold/5 rounded-2xl overflow-hidden mb-4 group shadow-xl">
                                    <AnimatePresence initial={false} custom={direction} mode="wait">
                                        <motion.div
                                            key={currentIndex}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{
                                                x: { type: "spring", stiffness: 300, damping: 30 },
                                                opacity: { duration: 0.3 },
                                                scale: { duration: 0.3 }
                                            }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={currentScreenshot.url}
                                                alt={currentScreenshot.title}
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                        </motion.div>
                                    </AnimatePresence>

                                    {project.screenshots.length > 1 && (
                                        <>
                                            <motion.button
                                                whileHover={{ scale: 1.1, x: -5 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={handlePrevious}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-washi/95 hover:bg-washi rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 border border-gold/30 backdrop-blur-xl"
                                            >
                                                <HiChevronLeft className="w-6 h-6 text-ink" />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1, x: 5 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={handleNext}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-washi/95 hover:bg-washi rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 border border-gold/30 backdrop-blur-xl"
                                            >
                                                <HiChevronRight className="w-6 h-6 text-ink" />
                                            </motion.button>
                                        </>
                                    )}

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute bottom-4 right-4 px-3 py-1.5 bg-gradient-to-r from-ink/90 to-ink/80 backdrop-blur-xl rounded-full text-washi text-xs font-bold shadow-lg border border-gold/20"
                                    >
                                        <span className="text-gold">{currentIndex + 1}</span>
                                        <span className="mx-1 text-gold/50">/</span>
                                        <span className="text-washi/70">{project.screenshots.length}</span>
                                    </motion.div>

                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-ink/10">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-vermillon via-gold to-vermillon"
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${((currentIndex + 1) / project.screenshots.length) * 100}%`
                                            }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.25 }}
                                        className="relative bg-gradient-to-br from-gold/10 via-gold/5 to-transparent border border-gold/30 rounded-2xl p-4 mb-4 overflow-hidden shadow-sm"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-vermillon to-gold" />

                                        <h3 className="font-serif text-lg font-bold text-ink mb-2 pl-3">
                                            {currentScreenshot.title}
                                        </h3>
                                        <p className="text-ink-light leading-relaxed pl-3 text-sm">
                                            {currentScreenshot.description}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>

                                {project.screenshots.length > 1 && (
                                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
                                        {project.screenshots.map((screenshot, index) => (
                                            <motion.button
                                                key={index}
                                                onClick={() => {
                                                    setDirection(index > currentIndex ? 1 : -1);
                                                    setCurrentIndex(index);
                                                }}
                                                whileHover={{ scale: 1.06, y: -3 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`relative aspect-video rounded-md overflow-hidden border transition-all duration-200 shadow-sm ${
                                                    index === currentIndex
                                                        ? 'border-vermillon shadow-vermillon/20 ring-1 ring-gold/40'
                                                        : 'border-gold/20 hover:border-gold opacity-70 hover:opacity-100'
                                                }`}
                                            >
                                                <Image
                                                    src={screenshot.url}
                                                    alt={screenshot.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {index === currentIndex && (
                                                    <motion.div
                                                        layoutId="activeThumb"
                                                        className="absolute inset-0 bg-gradient-to-t from-vermillon/20 to-transparent"
                                                    />
                                                )}
                                            </motion.button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer with links (will not render if links undefined) */}
                            {project.links && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="flex gap-4 p-4 border-t border-gold/20 bg-gradient-to-r from-transparent to-gold/5"
                                >
                                    {project.links.live && (
                                        <motion.a
                                            href={project.links.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex-1 px-4 py-2 bg-gradient-to-r from-vermillon to-gold text-washi text-center font-semibold rounded-md shadow-sm flex items-center justify-center gap-2"
                                        >
                                            Voir le site
                                        </motion.a>
                                    )}
                                    {project.links.github && (
                                        <motion.a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex-1 px-4 py-2 bg-ink text-washi text-center font-semibold rounded-md hover:bg-ink/90 shadow-sm flex items-center justify-center gap-2"
                                        >
                                            Code source
                                        </motion.a>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}