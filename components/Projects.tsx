'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { IconType } from 'react-icons';
import {
    SiJavascript, SiPhp, SiHtml5, SiCss3, SiNextdotjs, SiPrisma,
    SiDocker, SiTailwindcss, SiReact, SiNodedotjs, SiNestjs,
    SiPostgresql, SiMysql, SiSwagger, SiSpring, SiMariadb,
    SiTypescript, SiLeaflet
} from 'react-icons/si';
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
    'Spring Boot': SiSpring,
    'Java': null,
    'WebSocket': null,
    'MariaDB': SiMariadb,
    'TypeScript': SiTypescript,
    'Leaflet': SiLeaflet,
    'OSRM': null,
    'VRPTW': null,
};

const projects: Project[] = [
    {
        id: 1,
        title: 'KCD Formes',
        shortDescription: 'Jeu de tower defense médiéval en pixel art avec mode multijoueur asymétrique temps réel.',
        description: 'Projet fil rouge de Licence Pro conçu et développé en autonomie complète. Les formes géométriques gouvernent toutes les mécaniques : l\'aire détermine les dégâts et les HP, le périmètre la portée et la vitesse. J\'ai architecturé le backend Java/Spring Boot avec le pattern Factory Method pour la création des ennemis et des formes, mis en place la communication temps réel via WebSocket/STOMP pour le mode multijoueur asymétrique (attaquant vs défenseur), et conçu l\'intégralité du frontend Next.js avec sprites pixel art animés, grille interactive et gestion des vagues. Déployé sur serveurs école via un script Docker Compose personnalisé.',
        tech: ['Next.js', 'Spring Boot', 'Java', 'WebSocket', 'Docker', 'MariaDB'],
        image: '/images/kcd-formes.jpg',
        screenshots: [
            { url: '/images/kcd-formes.jpg', title: 'Page d\'accueil', description: 'Menu principal avec modes Campagne Solo et Multijoueur, présentation des mécaniques de jeu' },
            { url: '/images/kcd-lobby.jpg', title: 'Lobby multijoueur', description: 'Salle d\'attente avec assignation des rôles Défenseur et Attaquant en temps réel via WebSocket' },
            { url: '/images/kcd-combat.jpg', title: 'Phase de combat', description: 'Grille de jeu avec ennemis animés, tourelles actives et barres de vie synchronisées en temps réel' },
        ],
    },
    {
        id: 2,
        title: 'RecycleDashboard',
        shortDescription: 'Application de gestion de collecte de biodéchets avec optimisation des tournées VRPTW.',
        description: 'Application de gestion de collecte de biodéchets pour la zone Montbéliard–Sélestat, développée en équipe de 4 avec méthode Scrum. En tant que Scrum Master, j\'ai animé les cérémonies, géré le backlog et coordonné les sprints. Techniquement, j\'ai audité le codebase hérité et identifié 6 vulnérabilités SQL injection que j\'ai corrigées. J\'ai implémenté la Procédure d\'Évaluation (PE) du composant de décision VRPTW en TypeScript, intégré l\'algorithme d\'optimisation des tournées via OR-Tools (Docker) et évalué VROOM comme alternative. Cartographie interactive avec Leaflet et calcul d\'itinéraires via OSRM.',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Leaflet', 'OSRM'],
        image: '',
        screenshots: [],
    },
    {
        id: 3,
        title: 'Miyazaki Garden V2',
        shortDescription: 'Refonte complète en Next.js — authentification, favoris, avis et design Ghibli immersif.',
        description: 'Refonte complète de mon projet fil rouge PHP/MySQL vers une stack moderne Next.js/TypeScript/PostgreSQL. J\'ai conçu et implémenté l\'intégralité de l\'application : système d\'authentification sécurisé avec NextAuth, gestion des favoris et des avis avec notation sur 10, upload d\'avatar via Vercel Blob, traduction automatique des données API Ghibli, et un design poétique immersif. Sécurité renforcée avec validation Zod, sanitisation XSS et headers HTTP stricts. Déployé sur Vercel avec Neon PostgreSQL.',
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
    {
        id: 4,
        title: 'COS Strasbourg',
        shortDescription: 'Application web de suivi pédagogique entre élèves et professeurs avec annotations de documents.',
        description: 'Projet réalisé en équipe pour le COS Strasbourg, client réel. J\'ai pris en charge trois axes majeurs. Premièrement, j\'ai implémenté le système de surlignage et d\'annotation de documents en intégrant la librairie Mammoth pour convertir les fichiers DOCX en HTML, puis développé un menu contextuel interactif permettant aux encadrants de sélectionner du texte et d\'annoter les mémoires directement dans le navigateur, sans plugin externe. Deuxièmement, j\'ai développé le système de notifications email automatiques via l\'API Brevo : chaque action clé du workflow pédagogique (dépôt de document, validation, annotation) déclenche un email ciblé au bon destinataire. Troisièmement, j\'ai pris en charge l\'intégralité du design de l\'interface en respectant strictement la charte graphique du client, en assurant cohérence visuelle et responsive design sur toutes les pages dont j\'étais responsable.',
        tech: ['Next.js', 'Prisma', 'Docker', 'Tailwind CSS'],
        image: '/images/cos-strasbourg.jpg',
        screenshots: [
            { url: '/images/cos-1.jpg', title: 'Système d\'annotations', description: 'Interface annotations côté Encadrant' },
            { url: '/images/cos-2.jpg', title: 'Création d\'utilisateur', description: 'Interface de création des utilisateurs' },
            { url: '/images/cos-3.jpg', title: 'Dépôt des documents', description: 'Interface de dépôt des documents côté Etudiant' },
            { url: '/images/cos-4.jpg', title: 'Profil Etudiant', description: 'Espace des données personnelles des étudiants' },
        ],
    },
    {
        id: 5,
        title: 'Evaluation RH',
        shortDescription: 'Système d\'évaluation RH avec création de sondages — API backend en POO avec NestJS.',
        description: 'Projet d\'entreprise développé en équipe dans un environnement professionnel exigeant, avec des standards de qualité stricts et des revues de code régulières. Ma contribution s\'est concentrée sur le backend NestJS : j\'ai conçu et implémenté des endpoints d\'API REST en suivant les principes de la POO — création de DTOs typés avec class-validator pour la validation des entrées, utilisation des décorateurs NestJS (@Controller, @Get, @Post, @Body, @Param), injection de dépendances via les services, et séparation claire des responsabilités entre controllers, services et repositories. J\'ai également contribué à la documentation Swagger des endpoints et à la gestion robuste des erreurs avec des exceptions HTTP appropriées. Ce projet m\'a appris à travailler dans un contexte d\'équipe exigeant avec des conventions de code strictes, des PR reviewées et un vrai niveau d\'architecture backend.',
        tech: ['React', 'Node.js', 'NestJS', 'PostgreSQL', 'Prisma ORM', 'Docker', 'API REST', 'Swagger', 'shadcn/ui'],
        image: '/images/evaluation-rh.jpg',
        screenshots: [
            { url: '/images/rh-1.jpg', title: 'Gestion des sociétés', description: 'Dashboard de gestion des sociétés par l\'Administrateur Général' },
            { url: '/images/rh-2.jpg', title: 'Gestion des sondages', description: 'Interface de création et gestion des sondages' },
            { url: '/images/rh-3.jpg', title: 'Gestion des questions', description: 'Interface de création et gestion des questions' },
            { url: '/images/rh-4.jpg', title: 'Gestion des répondants', description: 'Interface de création et gestion des répondants' },
            { url: '/images/rh-5.jpg', title: 'Sondage', description: 'Exemple de Sondage' },
        ],
    },
    {
        id: 6,
        title: 'Miyazaki-Garden',
        shortDescription: 'Site exposant les oeuvres du réalisateur avec un design rappelant le studio Ghibli.',
        description: 'Premier projet fil rouge en PHP/MySQL natif. Conception et développement d\'un site vitrine dédié à l\'univers de Hayao Miyazaki avec animations CSS, ambiance sonore immersive et espace membre. Ce projet m\'a permis de maîtriser les fondamentaux du web : architecture MVC en PHP, requêtes SQL, gestion des sessions et design responsive. Point de départ de ma reconversion, il a posé les bases sur lesquelles j\'ai construit la V2 en Next.js.',
        tech: ['Javascript', 'PHP', 'HTML', 'CSS'],
        image: '/images/miyazaki-garden.jpg',
        screenshots: [
            { url: '/images/miyazaki-1.jpg', title: 'Page d\'accueil', description: 'Interface immersive' },
            { url: '/images/miyazaki-2.jpg', title: 'Page de connexion', description: 'Page de connexion pour accéder à son espace membre' },
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