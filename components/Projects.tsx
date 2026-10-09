'use client';

import { Fragment, useState, type MouseEvent } from 'react';
import { projects, currentProjects, projectPath } from '@/lib/projects';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
    SiJavascript, SiPhp, SiHtml5, SiCss3, SiNextdotjs, SiPrisma,
    SiDocker, SiTailwindcss, SiReact, SiNodedotjs, SiNestjs,
    SiPostgresql, SiMysql, SiSwagger, SiSpring, SiMariadb,
    SiTypescript, SiLeaflet,
    SiOpenjdk, SiPython,
} from 'react-icons/si';
import ProjectModal from './ProjectModal';
import ProjectCover from './ProjectCover';
import SectionTitle from './SectionTitle';
import LanternHeading from './LanternHeading';
import type { Project } from '@/lib/types';
import { useLanguage, fr, en } from '@/lib/i18n';

type TechIconMap = Record<string, IconType | null>;

const techIcons: TechIconMap = {
    'Javascript': SiJavascript,
    'PHP': SiPhp,
    'HTML': SiHtml5,
    'CSS': SiCss3,
    'Next.js': SiNextdotjs,
    'Prisma': SiPrisma,
    'Docker': SiDocker,
    'Tailwind CSS': SiTailwindcss,
    'React': SiReact,
    'React Native': SiReact,
    'Node.js': SiNodedotjs,
    'NestJS': SiNestjs,
    'PostgreSQL': SiPostgresql,
    'Prisma ORM': SiPrisma,
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
    'Phaser': null,
    'CI/CD': null,
    'Architecture hexagonale': null,
    'OSRM': null,
    'VRPTW': null,
    'Drizzle ORM': null,
    'Zod': null,
    'n8n': null,
    'Nextcloud': null,
    'Odoo': null,
    'OpenAI': null,
    'Anthropic': null,
    'React PDF': null,
    'Vitest': null,
    'XML-RPC': null,
};

const FILTERS = [
    { label: 'Tous', value: 'all' },
    { label: 'Mobile', value: 'React Native' },
    { label: 'Next.js', value: 'Next.js' },
    { label: 'TypeScript', value: 'TypeScript' },
    { label: 'Spring Boot', value: 'Spring Boot' },
    { label: 'NestJS', value: 'NestJS' },
    { label: 'IA', value: 'OpenAI' },
    { label: 'Docker', value: 'Docker' },
];


export default function Projects() {
    const { lang } = useLanguage();
    const t = lang === 'fr' ? fr : en;
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const openProject = (event: MouseEvent<HTMLAnchorElement>, project: Project) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        setSelectedProject(project);
    };

    const featuredIds = [9, 7, 8];
    const matchesFilter = (project: Project) => activeFilter === 'all'
        || project.tech.some(tech => tech.includes(activeFilter));
    const featured = featuredIds.flatMap(id => currentProjects.filter(project => project.id === id && matchesFilter(project)));
    const others = currentProjects.filter(project => !featuredIds.includes(project.id) && matchesFilter(project));
    const groups = [
        { title: t.projects.featured, items: featured },
        { title: t.projects.moreProjects, items: others },
    ].filter(group => group.items.length > 0);
    const relatedProject = selectedProject
        ? projects.find(project => selectedProject.previousVersionId === project.id
            || project.previousVersionId === selectedProject.id)
        : undefined;

    return (
        <>
            <section id="projects" className="max-w-6xl mx-auto px-4 pt-10 pb-16">
                <SectionTitle>{t.projects.title}</SectionTitle>

                {/* Filtres */}
                <div className="flex flex-wrap gap-2 justify-center mb-10">
                    {FILTERS.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setActiveFilter(f.value)}
                            aria-pressed={activeFilter === f.value}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                                activeFilter === f.value
                                    ? 'bg-vermillon text-white border-vermillon shadow-md'
                                    : 'bg-white dark:bg-washi-dark text-ink border-gold/40 hover:border-vermillon hover:text-vermillon dark:hover:text-[#e98c70]'
                            }`}
                        >
                            {f.value === 'all' ? t.projects.filterAll : f.value === 'OpenAI' && lang === 'en' ? 'AI' : f.label}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {groups.map(group => (
                        <Fragment key={group.title}>
                            <LanternHeading featured={group.title === t.projects.featured}>{group.title}</LanternHeading>
                    {group.items.map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-washi-dark border-2 border-gold/40 rounded-lg overflow-hidden hover:border-vermillon hover:shadow-2xl hover:shadow-vermillon/20 transition-all duration-300 group flex flex-col"
                        >
                            <a
                                href={projectPath(project)}
                                onClick={event => openProject(event, project)}
                                aria-label={`${t.projects.details} : ${project.title}`}
                                className="relative block h-48 w-full overflow-hidden shrink-0 focus-visible:outline-2 focus-visible:outline-vermillon focus-visible:outline-offset-[-4px]"
                            >
                                <ProjectCover project={project} />
                            </a>

                            <div className="p-6 flex flex-col flex-1">
                                {project.status === 'development' && (
                                    <span className="self-start mb-3 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-ink">
                                        {t.projects.inDevelopment}
                                    </span>
                                )}
                                <h4 className="font-display text-2xl font-bold mb-3 text-ink group-hover:text-vermillon dark:group-hover:text-[#e98c70] transition-colors duration-300">
                                    {project.title}
                                </h4>
                                <p className="text-ink text-sm mb-5 leading-relaxed font-medium">
                                    {lang === 'en' && project.shortDescriptionEn ? project.shortDescriptionEn : project.shortDescription}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.tech.slice(0, 4).map((tech) => {
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
                                    {project.tech.length > 4 && (
                                        <span className="text-xs bg-gold/30 text-ink px-3 py-1.5 rounded-full font-semibold">
                                            +{project.tech.length - 4}
                                        </span>
                                    )}
                                </div>
                                {/* Pied de carte : « Découvrir » toujours en bas, le lien site éventuel juste au-dessus */}
                                <div className="mt-auto flex flex-col items-start gap-4">
                                    {(project.links?.demo || project.links?.apk) && (
                                    <div className="flex flex-wrap gap-2">
                                    {project.links?.demo && (
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-vermillon text-white text-xs font-semibold rounded-full hover:bg-vermillon-dark hover:shadow-lg hover:shadow-vermillon/30 hover:-translate-y-0.5 transition-all duration-300"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {t.projects.visitSite}
                                        </a>
                                    )}
                                    {project.links?.apk && (
                                        <a
                                            href={project.links.apk}
                                            download
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-vermillon text-white text-xs font-semibold rounded-full hover:bg-vermillon-dark hover:shadow-lg hover:shadow-vermillon/30 hover:-translate-y-0.5 transition-all duration-300"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {t.projects.downloadApk}
                                        </a>
                                    )}
                                    </div>
                                    )}
                                    <a
                                        href={projectPath(project)}
                                        onClick={event => openProject(event, project)}
                                        className="text-sm font-semibold text-vermillon dark:text-[#e98c70] underline underline-offset-4 hover:text-vermillon-dark dark:hover:text-[#f3b39f]"
                                        aria-label={`${t.projects.details} : ${project.title}`}
                                    >
                                        {t.projects.details}
                                    </a>
                                </div>
                            </div>

                            <div className="h-1 bg-gradient-to-r from-vermillon to-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shrink-0" aria-hidden="true" />
                        </motion.article>
                        ))}
                        </Fragment>
                    ))}
                </div>
            </section>

            <ProjectModal
                project={selectedProject}
                relatedProject={relatedProject}
                onSelectProject={setSelectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </>
    );
}