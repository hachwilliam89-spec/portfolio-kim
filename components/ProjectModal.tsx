"use client";

import { Project } from "@/lib/types";
import ProjectCover from "./ProjectCover";
import RichText, { renderInline } from "./RichText";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef, useId } from "react";
import type { IconType } from "react-icons";
import {
    SiJavascript, SiPhp, SiHtml5, SiCss3, SiNextdotjs, SiPrisma,
    SiDocker, SiTailwindcss, SiReact, SiNodedotjs, SiNestjs,
    SiPostgresql, SiMysql, SiSwagger, SiSpring, SiMariadb,
    SiTypescript, SiLeaflet,
    SiOpenjdk, SiPython,
} from 'react-icons/si';
import { useLanguage, fr, en } from '@/lib/i18n';

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
    'Java': SiOpenjdk,
    'Python': SiPython,
    'WebSocket': null,
    'MariaDB': SiMariadb,
    'TypeScript': SiTypescript,
    'Leaflet': SiLeaflet,
    'OSRM': null,
};

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
    relatedProject?: Project;
    onSelectProject?: (project: Project) => void;
}

export default function ProjectModal({ project, onClose, relatedProject, onSelectProject }: ProjectModalProps) {
    const { lang } = useLanguage();
    const t = lang === 'fr' ? fr : en;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoomed, setZoomed] = useState(false);
    const [lastProjectId, setLastProjectId] = useState<number | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const zoomDialogRef = useRef<HTMLDialogElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const titleId = useId();
    const isOpen = project !== null;

    // Native modal dialogs make the background inert and contain keyboard focus.
    useEffect(() => {
        if (!isOpen || !dialogRef.current) return;
        const dialog = dialogRef.current;
        const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const previousOverflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = 'hidden';
        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
            if (trigger?.isConnected) trigger.focus({ preventScroll: true });
        };
    }, [isOpen]);

    useEffect(() => {
        if (project?.id !== undefined) closeRef.current?.focus({ preventScroll: true });
    }, [project?.id]);

    useEffect(() => {
        const dialog = zoomDialogRef.current;
        if (!dialog) return;
        if (zoomed && !dialog.open) dialog.showModal();
        if (!zoomed && dialog.open) dialog.close();
    }, [zoomed]);

    const projectId = project?.id ?? null;
    if (projectId !== lastProjectId) {
        setLastProjectId(projectId);
        if (currentIndex !== 0) setCurrentIndex(0);
        if (zoomed) setZoomed(false);
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
            if (e.key === 'Tab') {
                if (zoomed) return;
                const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), summary, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                ) ?? []).filter(element => element.getClientRects().length > 0);
                const first = controls[0];
                const last = controls[controls.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
                return;
            }
            if (e.key === "ArrowLeft") { e.preventDefault(); handlePrevious(); }
            else if (e.key === "ArrowRight") { e.preventDefault(); handleNext(); }
        };
        const dialog = dialogRef.current;
        dialog?.addEventListener("keydown", handleKeyDown);
        return () => dialog?.removeEventListener("keydown", handleKeyDown);
    }, [project, handleNext, handlePrevious, zoomed]);

    if (!project) return null;

    const caseStudy = lang === 'en' ? (project.caseStudyEn ?? project.caseStudy) : project.caseStudy;
    const description = lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description;

    const currentScreenshot = hasScreenshots ? project.screenshots[currentIndex] : null;

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            aria-modal="true"
            onCancel={(event) => { event.preventDefault(); if (zoomed) setZoomed(false); else onClose(); }}
            className="fixed inset-0 m-0 h-dvh w-full max-h-none max-w-none border-0 bg-transparent p-0 text-ink backdrop:bg-transparent"
        >
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 dark:bg-[#090807]/95 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-6xl max-h-[90dvh] bg-washi rounded-xl shadow-2xl overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* HEADER */}
                    <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-gold/20">
                        <h3 id={titleId} className="font-display text-xl md:text-2xl text-ink font-semibold">
                            {project.title}
                        </h3>
                        <button
                            ref={closeRef}
                            onClick={onClose}
                            className="p-2 hover:bg-gold/10 rounded-full transition-all duration-300"
                            aria-label={t.projects.close}
                        >
                            <X className="w-5 h-5 text-ink" />
                        </button>
                    </div>

                    {/* BODY - deux colonnes */}
                    <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">

                        {/* COLONNE GAUCHE - Description + Techs */}
                        <div key={project.id}
                            className="order-2 md:order-1 md:w-[36%] shrink-0 flex flex-col md:overflow-y-auto p-6 md:border-r border-gold/20">
                            {project.status === 'development' && (
                                <span className="self-start mb-4 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-ink">
                                    {t.projects.inDevelopment}
                                </span>
                            )}
                            {project.links?.demo && (
                                <a
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex self-start items-center gap-2 mb-5 px-4 py-2 bg-vermillon text-white text-sm font-semibold rounded-full hover:bg-vermillon-dark transition-colors"
                                >
                                    {t.projects.visitSite}
                                </a>
                            )}
                            {project.links?.apk && (
                                <div className="self-start mb-5">
                                    <a
                                        href={project.links.apk}
                                        download
                                        className="inline-flex items-center gap-2 px-4 py-2 border border-vermillon text-vermillon text-sm font-semibold rounded-full hover:bg-vermillon hover:text-white transition-colors"
                                    >
                                        {t.projects.downloadApk}
                                    </a>
                                    <p className="mt-2 text-xs text-ink/70">{t.projects.apkHint}</p>
                                </div>
                            )}
                            {caseStudy ? (
                                <>
                                    <dl className="space-y-4 mb-6">
                                        {([
                                            [t.projects.caseNeed, caseStudy.need],
                                            [t.projects.caseRole, caseStudy.role],
                                            [t.projects.caseResult, caseStudy.result],
                                            [t.projects.caseChallenge, caseStudy.challenge],
                                        ] as const).map(([label, text]) => (
                                            <div key={label} className="border-l-2 border-vermillon/60 pl-3">
                                                <dt className="text-xs uppercase tracking-wider font-bold text-vermillon dark:text-[#e98c70] mb-1">{label}</dt>
                                                <dd className="text-sm text-ink/85 leading-relaxed">{renderInline(text)}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                    <details className="group/details mb-6">
                                        <summary className="cursor-pointer select-none text-sm font-semibold text-ink/70 hover:text-vermillon dark:hover:text-[#e98c70] transition-colors list-none flex items-center gap-2">
                                            <span className="inline-block transition-transform group-open/details:rotate-90" aria-hidden="true">›</span>
                                            {t.projects.technicalDetails}
                                        </summary>
                                        <div className="mt-4">
                                            <RichText text={description} />
                                        </div>
                                    </details>
                                </>
                            ) : (
                                <RichText text={description} />
                            )}


                            {relatedProject && onSelectProject && (
                                <button
                                    type="button"
                                    onClick={() => onSelectProject(relatedProject)}
                                    className="self-start mb-6 text-sm font-semibold text-vermillon dark:text-[#e98c70] underline underline-offset-4"
                                >
                                    {project.previousVersionId ? t.projects.previousVersion : t.projects.currentVersion}
                                </button>
                            )}

                            {/* Techs */}
                            <div className="mt-auto">
                                <p className="text-xs uppercase tracking-wider text-ink/50 font-bold mb-3">
                                    {t.projects.technologies}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => {
                                        const Icon = techIcons[tech];
                                        return (
                                            <span
                                                key={tech}
                                                className="text-xs bg-gold/15 text-ink border border-gold/30 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5"
                                            >
                                                {Icon && <Icon className="text-sm" aria-hidden="true" />}
                                                {tech}
                                            </span>
                                        );
                                    })}
                                </div>

                            </div>
                        </div>

                        {/* COLONNE DROITE - Carrousel ou placeholder */}
                        <div className="order-1 md:order-2 shrink-0 md:flex-1 flex flex-col h-[36rem] md:h-auto min-h-0 overflow-hidden">
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
                                                    <button
                                                        type="button"
                                                        onClick={() => setZoomed(true)}
                                                        aria-label={`${lang === 'fr' ? 'Agrandir' : 'Enlarge'} : ${lang === 'en' && currentScreenshot.titleEn ? currentScreenshot.titleEn : currentScreenshot.title}`}
                                                        className="absolute inset-0 flex w-full cursor-zoom-in items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-vermillon"
                                                    >
                                                        <span className={currentScreenshot.portraitFocus === undefined ? "relative block h-full w-full" : "relative block h-full max-w-full aspect-[46/100] overflow-hidden rounded-[1.25rem] shadow-xl"}>
                                                            <Image
                                                                src={currentScreenshot.url}
                                                                alt=""
                                                                fill
                                                                sizes={currentScreenshot.portraitFocus === undefined ? "(max-width: 767px) 100vw, 60vw" : "(max-width: 767px) 50vw, 360px"}
                                                                className={currentScreenshot.portraitFocus === undefined ? "object-contain" : "object-cover scale-[1.1]"}
                                                                style={currentScreenshot.portraitFocus === undefined ? undefined : { objectPosition: `${currentScreenshot.portraitFocus}% center` }}
                                                                priority
                                                            />
                                                        </span>
                                                        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-washi/95 px-3 py-2 text-xs font-semibold text-ink shadow-md">
                                                            <ZoomIn className="h-4 w-4" aria-hidden="true" />
                                                            {lang === 'fr' ? 'Agrandir' : 'Enlarge'}
                                                        </span>
                                                    </button>
                                                </motion.div>
                                            </AnimatePresence>

                                            {/* Boutons navigation */}
                                            {project.screenshots.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={handlePrevious}
                                                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-washi/90 hover:bg-washi rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                                                        aria-label={t.projects.previousImage}
                                                    >
                                                        <ChevronLeft className="w-5 h-5 text-ink" />
                                                    </button>
                                                    <button
                                                        onClick={handleNext}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-washi/90 hover:bg-washi rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                                                        aria-label={t.projects.nextImage}
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
                                                {lang === 'en' && currentScreenshot.titleEn ? currentScreenshot.titleEn : currentScreenshot.title}
                                            </span>
                                            <span className="text-xs text-ink/70">
                                                {currentIndex + 1}/{project.screenshots.length}
                                            </span>
                                        </div>
                                        <p className="text-xs text-ink/80 mb-3 leading-relaxed">
                                            {lang === 'en' && currentScreenshot.descriptionEn ? currentScreenshot.descriptionEn : currentScreenshot.description}
                                        </p>

                                        {/* Thumbnails */}
                                        {project.screenshots.length > 1 && (
                                            <div className="flex gap-2 overflow-x-auto pb-1">
                                                {project.screenshots.map((screenshot, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setCurrentIndex(idx)}
                                                        className={`shrink-0 w-24 rounded-md p-1 text-left transition-all duration-300 ${
                                                            idx === currentIndex
                                                                ? "bg-vermillon/10 ring-2 ring-vermillon"
                                                                : "ring-1 ring-gold/20 hover:ring-gold/50"
                                                        }`}
                                                        aria-label={`${t.projects.viewImage} ${idx + 1} : ${lang === 'en' && screenshot.titleEn ? screenshot.titleEn : screenshot.title}`}
                                                        aria-current={idx === currentIndex ? 'true' : undefined}
                                                    >
                                                        <span className="relative block h-12 w-full overflow-hidden rounded-sm">
                                                            <Image src={screenshot.url} alt="" fill sizes="96px" className="object-cover" />
                                                        </span>
                                                        <span className="mt-1 block truncate text-[11px] font-semibold text-ink">
                                                            {lang === 'en' ? (screenshot.shortTitleEn ?? screenshot.titleEn ?? screenshot.title) : (screenshot.shortTitle ?? screenshot.title)}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col min-h-0">
                                    <div className="relative flex-1 min-h-0">
                                        <ProjectCover project={project} />
                                    </div>
                                    <p className="shrink-0 p-5 text-center text-sm text-ink/70 border-t border-gold/20">
                                        {t.projects.previewComing}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
        <dialog
            ref={zoomDialogRef}
            aria-label={currentScreenshot ? (lang === 'en' && currentScreenshot.titleEn ? currentScreenshot.titleEn : currentScreenshot.title) : undefined}
            onCancel={(event) => { event.preventDefault(); setZoomed(false); }}
            onClose={() => setZoomed(false)}
            className="fixed inset-0 m-0 h-dvh w-full max-h-none max-w-none border-0 bg-ink/95 p-4 text-white backdrop:bg-ink/95 sm:p-6"
        >
            {currentScreenshot && <div className="flex h-full min-h-0 flex-col gap-4">
                <div className="flex shrink-0 items-center justify-between gap-4">
                    <strong className="min-w-0 truncate text-sm sm:text-base">
                        {lang === 'en' && currentScreenshot.titleEn ? currentScreenshot.titleEn : currentScreenshot.title}
                        <span className="ml-2 font-normal opacity-70">{currentIndex + 1}/{project.screenshots.length}</span>
                    </strong>
                    <button
                        type="button"
                        onClick={() => setZoomed(false)}
                        aria-label={lang === 'fr' ? 'Fermer l’image agrandie' : 'Close enlarged image'}
                        className="shrink-0 rounded-full bg-washi p-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermillon"
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
                <div className="relative min-h-0 flex-1">
                    <Image
                        src={currentScreenshot.url}
                        alt={lang === 'en' && currentScreenshot.titleEn ? currentScreenshot.titleEn : currentScreenshot.title}
                        fill
                        sizes="100vw"
                        className="object-contain"
                    />
                </div>
                <a href={currentScreenshot.url} target="_blank" rel="noopener noreferrer" className="shrink-0 self-start text-sm underline underline-offset-4">
                    {lang === 'fr' ? 'Ouvrir l’image en taille réelle' : 'Open full-size image'}
                </a>
            </div>}
        </dialog>
        </dialog>
    );
}
