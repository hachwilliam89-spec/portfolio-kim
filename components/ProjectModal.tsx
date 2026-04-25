"use client";

import { Project } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);
    const [lastProjectId, setLastProjectId] = useState<number | null>(null);

    const projectId = project?.id ?? null;
    if (projectId !== lastProjectId) {
        setLastProjectId(projectId);
        if (currentIndex !== 0) {
            setCurrentIndex(0);
        }
    }

    const handleNext = useCallback(() => {
        if (!project) return;
        setCurrentIndex((prev) =>
            prev === project.screenshots.length - 1 ? 0 : prev + 1
        );
    }, [project]);

    const handlePrevious = useCallback(() => {
        if (!project) return;
        setCurrentIndex((prev) =>
            prev === 0 ? project.screenshots.length - 1 : prev - 1
        );
    }, [project]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!project) return;
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowLeft") {
                handlePrevious();
            } else if (e.key === "ArrowRight") {
                handleNext();
            } else if (e.key === "Home") {
                setCurrentIndex(0);
            } else if (e.key === "End") {
                setCurrentIndex(project.screenshots.length - 1);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [project, handleNext, handlePrevious, onClose]);

    if (!project) return null;

    const currentScreenshot = project.screenshots[currentIndex];
    const technologies = project.tech || [];

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    // Pas de screenshots — modal description simple
    if (!currentScreenshot) {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl bg-washi rounded-lg shadow-2xl overflow-hidden p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-display text-2xl text-ink font-semibold">
                                {project.title}
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gold/10 rounded-full transition-all duration-300"
                                aria-label="Fermer"
                            >
                                <X className="w-5 h-5 text-ink" />
                            </button>
                        </div>
                        <p className="text-sm text-ink/70 leading-relaxed mb-6">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs bg-gold text-white px-3 py-1.5 rounded-full font-semibold"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        {project.links?.demo && (<a

                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-vermillon text-white text-xs font-semibold rounded-full hover:bg-vermillon-dark transition-all duration-300"
                            >
                            🌐 Voir le site en ligne ↗
                            </a>
                            )}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-7xl h-[95vh] bg-washi rounded-lg shadow-2xl overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* HEADER */}
                    <div className="shrink-0 h-16 flex items-center justify-between gap-4 px-6 border-b border-gold/20">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <h3 className="text-lg md:text-xl font-display text-ink font-semibold truncate">
                                {currentScreenshot.title}
                            </h3>
                            <span className="shrink-0 text-sm text-ink/60 font-medium">
                                {currentIndex + 1}/{project.screenshots.length}
                            </span>
                        </div>
                        {technologies.length > 0 && (
                            <div className="hidden md:flex items-center gap-2 shrink-0">
                                {technologies.slice(0, 3).map((tech, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative px-3 py-1.5 bg-gold/10 border border-gold/30 rounded-full text-xs text-ink/80 font-medium hover:bg-gold/20 transition-all duration-300"
                                        title={tech}
                                    >
                                        {tech.slice(0, 2).toUpperCase()}
                                    </div>
                                ))}
                                {technologies.length > 3 && (
                                    <div className="px-2 py-1.5 bg-gold/10 border border-gold/30 rounded-full text-xs text-ink/60">
                                        +{technologies.length - 3}
                                    </div>
                                )}
                            </div>
                        )}
                        <button
                            onClick={onClose}
                            className="shrink-0 p-2 hover:bg-gold/10 rounded-full transition-all duration-300"
                            aria-label="Fermer"
                        >
                            <X className="w-5 h-5 text-ink" />
                        </button>
                    </div>

                    {/* IMAGE ZONE */}
                    <div className="flex-1 min-h-0 relative bg-ink/5 p-4 md:p-6">
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="relative w-full h-full"
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
                                    <button
                                        onClick={handlePrevious}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-washi/90 hover:bg-washi rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus-visible:ring-2 focus-visible:ring-vermillon"
                                        aria-label="Image précédente"
                                    >
                                        <ChevronLeft className="w-6 h-6 text-ink" />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-washi/90 hover:bg-washi rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus-visible:ring-2 focus-visible:ring-vermillon"
                                        aria-label="Image suivante"
                                    >
                                        <ChevronRight className="w-6 h-6 text-ink" />
                                    </button>
                                </>
                            )}

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {project.screenshots.map((_, idx) => (
                                    <motion.div
                                        key={idx}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            idx === currentIndex
                                                ? "w-8 bg-vermillon"
                                                : "w-1.5 bg-washi/50"
                                        }`}
                                        layout
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* THUMBNAILS */}
                    {project.screenshots.length > 1 && (
                        <div className="shrink-0 h-20 px-6 py-2 border-t border-gold/20 bg-washi">
                            <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent pb-2">
                                {project.screenshots.map((screenshot, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`relative shrink-0 w-20 h-14 rounded-md overflow-hidden transition-all duration-300 ${
                                            idx === currentIndex
                                                ? "ring-2 ring-vermillon scale-105"
                                                : "ring-1 ring-gold/20 hover:ring-gold/50 hover:scale-105"
                                        }`}
                                        aria-label={`Voir ${screenshot.title}`}
                                    >
                                        <Image
                                            src={screenshot.url}
                                            alt={screenshot.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FOOTER */}
                    <div className="shrink-0 h-16 flex items-center justify-between gap-4 px-6 border-t border-gold/20 bg-washi">
                        <div className="relative flex items-center gap-2 min-w-0 flex-1">
                            <p className="text-sm text-ink/70 truncate">
                                {truncateText(currentScreenshot.description, 80)}
                            </p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 shrink-0">
                            {technologies.length > 0 && (
                                <div
                                    className="group relative px-3 py-1.5 bg-gold/5 rounded-full hover:bg-gold/10 transition-all duration-300 cursor-help"
                                    title={`Technologies: ${technologies.join(", ")}`}
                                >
                                    <span className="text-xs text-ink/60">💻</span>
                                </div>
                            )}
                            <div
                                className="group relative px-3 py-1.5 bg-vermillon/5 rounded-full hover:bg-vermillon/10 transition-all duration-300 cursor-help"
                                title={project.title}
                            >
                                <span className="text-xs text-ink/60">🏷️</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}