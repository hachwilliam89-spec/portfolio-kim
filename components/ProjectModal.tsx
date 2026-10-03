"use client";

import { Project } from "@/lib/types";
import ProjectCover from "./ProjectCover";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef, useId, type ReactNode } from "react";
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

// Rendu "riche" léger des descriptions : **gras**, et puces pour les lignes
// commençant par "- " (les blocs sont séparés par des lignes vides).
function renderInline(text: string): ReactNode {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
            ? <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
            : <span key={i}>{part}</span>
    );
}

function RichText({ text }: { text: string }) {
    const blocks: ReactNode[] = [];
    let bullets: string[] = [];
    const flush = () => {
        if (bullets.length) {
            const items = [...bullets];
            blocks.push(
                <ul key={`ul-${blocks.length}`} className="list-disc pl-5 space-y-1.5 mb-4 marker:text-gold">
                    {items.map((b, i) => <li key={i}>{renderInline(b)}</li>)}
                </ul>
            );
            bullets = [];
        }
    };
    for (const raw of text.split('\n')) {
        const line = raw.trim();
        if (!line) { flush(); continue; }
        if (line.startsWith('- ')) { bullets.push(line.slice(2)); continue; }
        flush();
        blocks.push(<p key={`p-${blocks.length}`} className="mb-3">{renderInline(line)}</p>);
    }
    flush();
    return <div className="text-sm text-ink/80 leading-relaxed mb-6">{blocks}</div>;
}

export default function ProjectModal({ project, onClose, relatedProject, onSelectProject }: ProjectModalProps) {
    const { lang } = useLanguage();
    const t = lang === 'fr' ? fr : en;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastProjectId, setLastProjectId] = useState<number | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
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
            if (e.key === 'Tab') {
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
    }, [project, handleNext, handlePrevious]);

    if (!project) return null;

    const caseStudy = lang === 'en' ? (project.caseStudyEn ?? project.caseStudy) : project.caseStudy;
    const description = lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description;

    const currentScreenshot = hasScreenshots ? project.screenshots[currentIndex] : null;

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            aria-modal="true"
            onCancel={(event) => { event.preventDefault(); onClose(); }}
            className="fixed inset-0 m-0 h-dvh w-screen max-h-none max-w-none border-0 bg-transparent p-0 text-ink backdrop:bg-transparent"
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
                    className="relative w-full max-w-6xl max-h-[90vh] bg-washi rounded-xl shadow-2xl overflow-hidden flex flex-col"
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
                            className="order-2 md:order-1 md:w-2/5 shrink-0 flex flex-col md:overflow-y-auto p-6 md:border-r border-gold/20">
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
                        <div className="order-1 md:order-2 shrink-0 md:flex-1 flex flex-col h-[26rem] md:h-auto min-h-0 overflow-hidden">
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
                                                        alt={lang === 'en' && currentScreenshot.titleEn ? currentScreenshot.titleEn : currentScreenshot.title}
                                                        fill
                                                        sizes="(max-width: 767px) 100vw, 60vw"
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
                                            <span className="text-xs text-ink/50">
                                                {currentIndex + 1}/{project.screenshots.length}
                                            </span>
                                        </div>
                                        <p className="text-xs text-ink/60 mb-3 leading-relaxed">
                                            {lang === 'en' && currentScreenshot.descriptionEn ? currentScreenshot.descriptionEn : currentScreenshot.description}
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
                                                        aria-label={`${t.projects.viewImage} ${idx + 1}`}
                                                        aria-current={idx === currentIndex ? 'true' : undefined}
                                                    >
                                                        <Image
                                                            src={screenshot.url}
                                                            alt=""
                                                            fill
                                                            sizes="64px"
                                                            className="object-cover"
                                                        />
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
        </dialog>
    );
}
