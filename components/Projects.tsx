// components/Projects.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { IconType } from 'react-icons';
import { SiJavascript, SiPhp, SiHtml5, SiCss3, SiNextdotjs, SiPrisma, SiDocker, SiTailwindcss, SiReact, SiNodedotjs, SiNestjs, SiPostgresql, SiMysql, SiSwagger } from 'react-icons/si';
import ProjectModal from './ProjectModal';
import SectionTitle from './SectionTitle';
import type { Project } from '@/lib/types';

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
    'Node.js': SiNodedotjs,
    'NestJS': SiNestjs,
    'PostgreSQL': SiPostgresql,
    'Prisma ORM': SiPrisma,
    'MySQL': SiMysql,
    'Swagger': SiSwagger,
    'API REST': null,
    'shadcn/ui': null,
};

const projects: Project[] = [
    {
        id: 1,
        title: 'Miyazaki-Garden',
        shortDescription: 'Site exposant les oeuvres du réalisateur avec un design rappelant le studio Ghibli.',
        description: 'Site exposant les oeuvres du réalisateur avec un design rappelant le studio Ghibli. Animation et ambiance sonore sont présents pour une immersion dans l\'univers onirique de l\'artiste.',
        tech: ['Javascript', 'PHP', 'HTML', 'CSS'],
        image: '/images/miyazaki-garden.jpg',
        screenshots: [
            { url: '/images/miyazaki-1.jpg', title: 'Page d\'accueil', description: 'Interface immersive...' },
            { url: '/images/miyazaki-2.jpg', title: 'Page de connexion', description: 'Page de connexion pour accéder à son espace membre' },
            { url: '/images/miyazaki-3.jpg', title: 'Univers interactif', description: 'Éléments animés...' },
        ],
    },
    {
        id: 2,
        title: 'COS Strasbourg',
        shortDescription: 'Application web destinée à faire le lien entre élèves et professeurs.',
        description: 'Application web destinée à faire le lien entre élèves et professeurs...',
        tech: ['Next.js', 'Prisma', 'Docker', 'Tailwind CSS'],
        image: '/images/cos-strasbourg.jpg',
        screenshots: [
            { url: '/images/cos-1.jpg', title: 'Système d\'annotations', description: 'Interface annotations côté Encadrant' },
            { url: '/images/cos-2.jpg', title: 'Création d\'utilisateur', description: 'Interface de création des utilisateurs' },
            { url: '/images/cos-3.jpg', title: 'Dépôt des documents', description: 'Interface de dépôt des documents (comme les mémoires à annoter) , côté Etudiant' },
            { url: '/images/cos-4.jpg', title: 'Profil Etudiant', description: 'Espace des données personnelles des étudiants' },
        ],
    },
    {
        id: 3,
        title: 'Evaluation RH',
        shortDescription: 'Système d\'évaluation des ressources humaines avec création de sondages.',
        description: 'Système d\'évaluation des ressources humaines...',
        tech: ['React', 'Node.js', 'NestJS', 'PostgreSQL', 'Prisma ORM', 'Docker', 'API REST', 'MySQL', 'Swagger', 'shadcn/ui'],
        image: '/images/evaluation-rh.jpg',
        screenshots: [
            { url: '/images/rh-1.jpg', title: 'Gestion des sociétés ', description: 'Dashboard de gestion des sociétés par l\'Administrateur Général' },
            { url: '/images/rh-2.jpg', title: 'Gestion des sondages', description: 'Interface de création et gestion des sondages' },
            { url: '/images/rh-3.jpg', title: 'Gestion des questions', description: 'Interface de création et gestion des questions' },
            { url: '/images/rh-4.jpg', title: 'Gestion des répondants', description: 'Interface de création et gestion des répondants' },
            { url: '/images/rh-5.jpg', title: 'Sondage', description: 'Exemple de Sondage' },
        ],
    },
    {
        id: 4,
        title: 'Miyazaki Garden V2',
        shortDescription: 'Refonte complète en Next.js — authentification, favoris, avis et design Ghibli immersif.',
        description: 'Refonte complète du site Miyazaki Garden, passé de PHP/MySQL à Next.js 16 / TypeScript / PostgreSQL. Cette V2 propose une expérience utilisateur riche : authentification sécurisée, système de favoris, avis avec notation sur 10, profil utilisateur avec upload d\'avatar, traduction française automatique, et un design poétique inspiré de l\'univers Ghibli. Sécurité renforcée avec Zod, sanitisation XSS et headers HTTP. Déployé sur Vercel avec Neon PostgreSQL et Vercel Blob.',
        tech: ['Next.js', 'React', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Javascript'],
        image: '/images/miyazaki-garden-v2.jpg',
        links: {
            demo: 'https://miyazaki-garden-nextjs.vercel.app',
            github: 'https://github.com/hachwilliam89-spec/miyazaki-garden-nextjs',
        },
        screenshots: [
            { url: '/images/miyazaki-v2-1.jpg', title: 'Page d\'accueil', description: 'Carrousel des meilleurs films, bandeau défilant avec reflet et design Ghibli' },
            { url: '/images/miyazaki-v2-2.jpg', title: 'À propos', description: 'Page sur l\'histoire du studio' },
            { url: '/images/miyazaki-v2-3.jpg', title: 'Profil membre', description: 'Page de membre avec liste des films favoris' },
        ],
    },
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <>
            <section id="projects" className="max-w-6xl mx-auto px-4 py-20">
                <SectionTitle>Projets</SectionTitle>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => setSelectedProject(project)}
                            className="bg-white border-2 border-gold/40 rounded-lg overflow-hidden hover:border-vermillon hover:shadow-2xl hover:shadow-vermillon/20 transition-all duration-300 group cursor-pointer"
                            role="button"
                            tabIndex={0}
                            aria-label={`Voir les détails du projet ${project.title}`}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setSelectedProject(project);
                                }
                            }}
                        >
                            <div className="relative h-48 w-full overflow-hidden bg-washi-dark">
                                <Image
                                    src={project.image}
                                    alt={`Aperçu du projet ${project.title}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

                                <div className="absolute top-4 right-4 px-3 py-1 bg-washi/90 backdrop-blur-sm rounded-full text-xs font-semibold text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1" aria-hidden="true">
                                    Voir plus
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="font-display text-2xl font-bold mb-3 text-ink group-hover:text-vermillon transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-ink text-sm mb-5 leading-relaxed font-medium line-clamp-3">
                                    {project.shortDescription}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.tech.slice(0, 4).map((tech) => {
                                        const Icon = techIcons[tech];
                                        return (
                                            <span
                                                key={tech}
                                                className="text-xs bg-gold text-white px-3 py-1.5 rounded-full font-semibold shadow-sm flex items-center gap-1.5"
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

                                {project.links?.demo && (
                                    <a
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-vermillon text-white text-xs font-semibold rounded-full hover:bg-vermillon-dark hover:shadow-lg hover:shadow-vermillon/30 hover:-translate-y-0.5 transition-all duration-300"
                                    onClick={(e) => e.stopPropagation()}
                                    >
                                    🌐 Voir le site en ligne ↗
                                    </a>
                                    )}
                            </div>

                            <div className="h-1 bg-gradient-to-r from-vermillon to-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
                        </motion.article>
                    ))}
                </div>
            </section>

            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </>
    );
}