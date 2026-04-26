"use client";

import { Project } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import type { IconType } from "react-icons";
import {
    SiJavascript, SiPhp, SiHtml5, SiCss3, SiNextdotjs, SiPrisma,
    SiDocker, SiTailwindcss, SiReact, SiNodedotjs, SiNestjs,
    SiPostgresql, SiMysql, SiSwagger, SiSpring, SiMariadb,
    SiTypescript, SiLeaflet
} from 'react-icons/si';

const techIcons: Record<string, IconType | null> = {
    'Javascript': SiJavascript,
    'PHP': SiPhp,
    'HTML': SiHtml5,
    'CSS': SiCss3,
    'Next.js': SiNextdotjs,
    'Prisma': SiPrisma,
    'Prisma ORM': SiPrisma,
    'Docker': SiDocker,
    'Tailwind CSS': SiTailwindcss,
    'React': SiReact,
    'Node.js': SiNodedotjs,
    'NestJS': SiNestjs,
    'PostgreSQL': SiPostgresql,
    'MySQL': SiMysql,
    'Swagger': SiSwagger,
    'API REST': null,
    'shadcn/ui': null,
    'Spring Boot': SiSpring,
    'Java': null,
    'WebSocket': null,
    'MariaDB': SiMariadb,
    'TypeScript': SiTypescript,
    'Leaflet': SiLeaflet,
    'OSRM': null,
};

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastProjectId, setLastProjectId] = useState<number | null>(null);

    const projectId = project?.id ?? null;
    if (projectId !== lastProjectId) {
        setLastProjectId(projectId);
        if (currentIndex !== 0) setCurrentIndex(0);
    }

    const hasScreenshots = project && project.screenshots.length > 0;

    const handleNext = useCallback(() => {
        if (!project || !hasScreenshots) return;
        setCurrentIndex((prev) =>
            prev === project.screenshots.length - 1 ? 0 : prev + 1
        );
    }, [project, hasScreenshots]);

    const handlePrevious = useCallback(() => {
        if (!project || !hasScreenshots) return;
        setCurrentIndex((prev) =>
            prev === 0 ? project.screenshots.length - 1 : prev - 1
        );
    }, [project, hasScreenshots]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!project) return;
            if (e.key === "Escape") onClose();
            else if (e.key === "ArrowLeft") handlePrevious();
            else if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [project, handleNext, handlePrevious, onClose]);

    if (!project) return null;

    const currentScreenshot = hasScreenshots ? project.screenshots[currentIndex] : null;

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
                    className="relative w-full max-w-6xl max-h-[90vh] bg-washi rounded-xl shadow-2xl overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* HEADER */}
                    <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-gold/20">
                        <h3 className="font-display text-xl md:text-2xl text-ink font-semibold">
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

                    {/* BODY - deux colonnes */}
                    <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">

                        {/* COLONNE GAUCHE - Description + Techs */}
                        <div className="md:w-2/5 shrink-0 flex flex-col overflow-y-auto p-6 border-r border-gold/20">
                            <p className="text-sm text-ink/80 leading-relaxed mb-6">
                                {project.description}
                            </p>

                            {/* Techs */}
                            <div className="mt-auto">
                                <p className="text-xs uppercase tracking-wider text-ink/50 font-bold mb-3">
                                    Technologies
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => {
                                        const Icon = techIcons[tech];
                                        return (
                                            <span
                                                key={tech}
                                                className="text-xs bg-gold text-white px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5"
                                            >
                                                {Icon && <Icon className="text-sm" aria-hidden="true" />}
                                                {tech}
                                            </span>
                                        );
                                    })}
                                </div>

                                {/* Lien demo si présent */}
                                {project.links?.demo && ( <a

                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-vermillon text-white text-xs font-semibold rounded-full hover:bg-vermillon-dark transition-all duration-300"
                                    >
                                    🌐 Voir le site en ligne ↗
                                    </a>
                                    )}
                            </div>
                        </div>

                        {/* COLONNE DROITE - Carrousel ou placeholder */}
                        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                            {hasScreenshots && currentScreenshot ? (
                                <>
                                    {/* Image */}
                                    <div className="flex-1 min-h-0 relative bg-ink/5 p-4">
                                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                                            <AnimatePresence mode="wait" initial={false}>
                                                <motion.div
                                                    key={currentIndex}
                                                    initial={{ opacity: 0, x: 60 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -60 }}
                                                    transition={{ duration: 0.25, ease: "easeOut" }}
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

                                            {/* Boutons navigation */}
                                            {project.screenshots.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={handlePrevious}
                                                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-washi/90 hover:bg-washi rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                                                        aria-label="Image précédente"
                                                    >
                                                        <ChevronLeft className="w-5 h-5 text-ink" />
                                                    </button>
                                                    <button
                                                        onClick={handleNext}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-washi/90 hover:bg-washi rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                                                        aria-label="Image suivante"
                                                    >
                                                        <ChevronRight className="w-5 h-5 text-ink" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description screenshot + thumbnails */}
                                    <div className="shrink-0 px-4 py-3 border-t border-gold/20 bg-washi">
                                        {/* Titre + description du screenshot courant */}
                                        <div className="mb-2">
                                            <span className="text-xs font-bold text-ink mr-2">
                                                {currentScreenshot.title}
                                            </span>
                                            <span className="text-xs text-ink/50">
                                                {currentIndex + 1}/{project.screenshots.length}
                                            </span>
                                        </div>
                                        <p className="text-xs text-ink/60 mb-3 leading-relaxed">
                                            {currentScreenshot.description}
                                        </p>

                                        {/* Thumbnails */}
                                        {project.screenshots.length > 1 && (
                                            <div className="flex gap-2 overflow-x-auto pb-1">
                                                {project.screenshots.map((screenshot, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setCurrentIndex(idx)}
                                                        className={`relative shrink-0 w-16 h-11 rounded-md overflow-hidden transition-all duration-300 ${
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
                                        )}
                                    </div>
                                </>
                            ) : (
                                /* Pas de screenshots - placeholder */
                                <div className="flex-1 flex items-center justify-center bg-ink/5">
                                    <div className="text-center p-8">
                                        <p className="font-display text-5xl text-ink/10 mb-4">
                                            {project.title[0]}
                                        </p>
                                        <p className="text-sm text-ink/30">
                                            Screenshots à venir
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}