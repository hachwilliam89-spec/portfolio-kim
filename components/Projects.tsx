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
    { label: 'Next.js', value: 'Next.js' },
    { label: 'TypeScript', value: 'TypeScript' },
    { label: 'Spring Boot', value: 'Spring Boot' },
    { label: 'NestJS', value: 'NestJS' },
    { label: 'IA', value: 'OpenAI' },
    { label: 'Docker', value: 'Docker' },
];

const projects: Project[] = [
    {
        id: 7,
        title: 'XIP Telecom v2',
        shortDescription: 'Plateforme B2B de courtage télécom — architecture agents IA orchestrés, intégration Odoo CRM et génération de rapports PDF.',
        description: 'Projet  réalisé en équipe de 4  (Jira/Confluence, GitLab) sur une plateforme B2B de courtage télécom en pnpm monorepo.\n\nConception et implémentation d\'une couche d\'agents IA orchestrés : Agent Superviseur/Routeur (identification de l\'agent cible via LLM, extraction du payload structuré et routage), Agent SDR (scoring automatique des prospects de 1 à 5, génération d\'accusé de réception, enregistrement en base), Agent Business Developer (génération de fiches de préparation avant rendez-vous commercial). LLMProvider abstrait supportant OpenAI, Anthropic et mock. Table agent_runs pour la journalisation complète. Convention transversale prompts/routes/schemas pour les 6 agents de l\'équipe.\n\nIntégration Odoo CRM complète via XML-RPC : synchronisation des prospects, contacts, opportunités et pièces jointes PDF en fire-and-forget.\n\nMoteur de génération automatique de rapports d\'audit télécom (React PDF, stockage Nextcloud WebDAV).\n\nAPI REST documentée avec spec OpenAPI manuelle et Swagger UI intégré. Documentation technique complète (Odoo, agents IA, conventions de développement). 104 tests unitaires avec Vitest.',
        shortDescriptionEn: 'B2B telecom brokerage platform — orchestrated AI agents, Odoo CRM integration and automated PDF audit report generation.',
        descriptionEn: 'Professional project built in a 4-developer agile team (Jira, GitLab) on a B2B telecom brokerage platform using a pnpm monorepo.\n\nDesigned and implemented an orchestrated AI agent layer: Supervisor/Router agent (LLM-based target identification, structured payload extraction and routing), SDR agent (automated prospect scoring 1–5, acknowledgment generation, score persistence), Business Developer agent (pre-meeting preparation sheets generation). Abstract LLMProvider supporting OpenAI, Anthropic and mock. agent_runs table for full audit logging. Cross-cutting prompts/routes/schemas convention for the 6 team agents.\n\nFull Odoo CRM integration via XML-RPC in a fire-and-forget pattern: syncing prospects, contacts, opportunities and PDF attachments.\n\nAutomated telecom audit PDF report engine (React PDF, Nextcloud WebDAV storage).\n\nREST API documented with manual OpenAPI spec and integrated Swagger UI. Full technical documentation (Odoo, AI agents, development conventions). 104 unit tests with Vitest.',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Drizzle ORM', 'OpenAI', 'Anthropic', 'Zod', 'n8n'],
        image: '/images/xip-home.png',
        screenshots: [
            { url: '/images/xip-home.png', title: 'Page d\'accueil', description: 'Site vitrine public de XIP Telecom, plateforme B2B de conseil et courtage télécom. Navigation vers les sections Solutions, Missions d\'audit, Recrutement BDI et l\'extranet via le bouton Login. Développé en Next.js avec design sobre et professionnel.' },
            { url: '/images/xip-prospect.png', title: 'Extranet BDI — Création de prospect', description: 'Interface de l\'extranet réservé aux Business Developers. Formulaire de qualification d\'un nouveau prospect : société, contact principal, email, téléphone, code postal, besoin télécom libre et statut (Qualifié/Non qualifié). À la soumission, le prospect est créé en base via Drizzle ORM et synchronisé en fire-and-forget vers Odoo CRM via XML-RPC.' },
            { url: '/images/xip-audit.png', title: 'Questionnaire d\'audit télécom', description: 'Interface de saisie d\'un audit structuré en 9 étapes : Identification, Origine et objectifs, Infrastructure télécom, Téléphonie fixe, Téléphonie mobile, Internet et réseaux, WiFi/VPN/Sécurité, Messagerie et IT, Synthèse et actions. Barre de progression en temps réel (ici 100% — 17/42 questions renseignées). Validation de l\'audit et génération du rapport PDF déclenchées depuis ce récapitulatif.' },
            { url: '/images/xip-rapport.png', title: 'Rapport d\'audit — Récapitulatif', description: 'Page de récapitulatif avant génération du PDF : informations client (société, contact, BDI affecté), statut de l\'audit, date et sommaire des 9 étapes. Le bouton "Générer / Télécharger le PDF" déclenche le moteur React PDF côté serveur et stocke le fichier sur Nextcloud via WebDAV, puis l\'attache automatiquement à l\'opportunité Odoo.' },
            { url: '/images/xip-n8n.png', title: 'Orchestration n8n — Lead entrant', description: 'Workflow n8n publié "XIP – lead entrant – Orchestration" déclenché par webhook POST à chaque nouveau lead entrant. Pipeline en 4 nœuds : réception webhook → email interne de notification → email d\'accusé de réception au prospect → réponse webhook. Exécuté en 143ms en production, avec historique des exécutions (succès/erreurs) visible en temps réel.' },
            { url: '/images/xip-odoo.png', title: 'Synchronisation Odoo CRM', description: 'Opportunité synchronisée dans le pipeline Odoo CRM via XML-RPC en fire-and-forget. Champs personnalisés XIP injectés : Xip App Lead (UUID), Xip App Audit et Xip Audit Status ("Audit complete"). Deux rapports PDF d\'audit attachés automatiquement à l\'opportunité lors de la synchronisation, visibles dans la section Files.' },
        ],
    },
    {
        id: 1,
        title: 'KCD Formes',
        shortDescription: 'Jeu de tower defense médiéval en pixel art avec mode multijoueur asymétrique temps réel.',
        shortDescriptionEn: 'Medieval pixel art tower defense game with real-time asymmetric multiplayer — developed solo as the Licence Pro capstone project.',
        descriptionEn: 'Capstone project of the Licence Pro, designed and developed entirely solo. Geometric shapes govern all mechanics: area determines damage and HP, perimeter determines range and speed. I architected the Java/Spring Boot backend with the Factory Method pattern for enemy and shape creation, implemented real-time communication via WebSocket/STOMP for the asymmetric multiplayer mode (attacker vs. defender), and designed the entire Next.js frontend with animated pixel art sprites, interactive grid and wave management. Deployed on university servers via a custom Docker Compose script.',
        description: 'Projet fil rouge de Licence Pro conçu et développé en autonomie complète. Les formes géométriques gouvernent toutes les mécaniques : l\'aire détermine les dégâts et les HP, le périmètre la portée et la vitesse. J\'ai architecturé le backend Java/Spring Boot avec le pattern Factory Method pour la création des ennemis et des formes, mis en place la communication temps réel via WebSocket/STOMP pour le mode multijoueur asymétrique (attaquant vs défenseur), et conçu l\'intégralité du frontend Next.js avec sprites pixel art animés, grille interactive et gestion des vagues. Déployé sur serveurs école via un script Docker Compose personnalisé.',
        tech: ['Next.js', 'Spring Boot', 'Java', 'WebSocket', 'Docker', 'MariaDB'],
        image: '/images/kcd-formes.jpg',
        screenshots: [
            { url: '/images/kcd-formes.jpg', title: 'Page d\'accueil', description: 'Menu principal avec modes Campagne Solo et Multijoueur, présentation des mécaniques de jeu' },
            { url: '/images/kcd-lobby.jpg', title: 'Lobby multijoueur', description: 'Écran de sélection du mode multijoueur asymétrique. Le joueur choisit son rôle : Défenseur (créer un lobby, protéger sa forteresse) ou Attaquant (rejoindre un lobby, assaillir la forteresse adverse). La communication entre les deux joueurs est gérée en temps réel via WebSocket/STOMP.' },
            { url: '/images/kcd-combat.jpg', title: 'Phase de combat', description: 'Grille de jeu avec ennemis animés, tourelles actives et barres de vie synchronisées en temps réel' },
        ],
    },
    {
        id: 2,
        title: 'RecycleDashboard',
        shortDescription: 'Application de gestion collecte biodéchets, développée en équipe , j\'y ai eu le rôle de SCRUM master.',
        shortDescriptionEn: 'Bio-waste collection management app built in a team — Scrum Master role, VRPTW algorithm and drag-and-drop Kanban redistribution interface.',
        descriptionEn: 'As Scrum Master, I facilitated ceremonies, managed the Jira backlog and coordinated sprints. On the development side of this bio-waste collection management app, my main contributions:\n\nDesigned and implemented the Evaluation Procedure (PE) for the VRPTW algorithm: 3-case decision tree (on time / definitively late / uncertain)\n\nProposed and integrated VROOM as the tour optimization engine\n\nBuilt the cancelled tour redistribution interface: drag-and-drop Kanban, 3 modes (individual client, full tour, full day)\n\nFull database migration from Supabase to local Docker PostgreSQL with a migration guide for the team\n\nDeveloped and documented 15 REST API routes (Swagger)',
        description: 'En tant que Scrum Master, j\'ai animé les cérémonies, géré le backlog Jira et coordonné les sprints. Côté développement de cette application de gestion collecte biodéchets, mes contributions majeures :\n' +
            '\n' +
            'Conception et implémentation de la Procédure d\'Évaluation (PE) pour l\'algorithme VRPTW : arbre de décision à 3 cas (à l\'heure / définitivement en retard / incertain)\n' +
            '\n' +
            'Proposition et intégration de VROOM comme moteur d\'optimisation des tournées\n' +
            '\n' +
            'Développement de l\'interface de redistribution des tournées annulées : Kanban drag-and-drop, 3 modes (client individuel, tournée complète, journée entière)\n' +
            '\n' +
            'Migration complète Supabase → PostgreSQL Docker local avec guide de migration pour l\'équipe\n' +
            '\n' +
            'Développement et documentation de 15 routes API (Swagger)',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Leaflet', 'OSRM'],
        image: '/images/recycle-dashboard.jpg',
        screenshots: [
            {url: '/images/planning-redistribution.png',title: 'Planning redistribution', description: 'Vue planning hebdomadaire permettant au gestionnaire de superviser l\'ensemble de la semaine en un coup d\'œil. Chaque jour affiche le nombre de tournées actives, annulées et redistribuées. Un panneau latéral signale les clients sans tournée à réassigner par glisser-déposer vers un véhicule disponible (Jumpy 1, Jumpy 2, Petit véhicule). Les jours fériés sont automatiquement détectés et bloqués.'},
            {url: '/images/page-redistribution.png', title: 'Page de redistribution', description: 'Interface Kanban de redistribution des tournées de collecte. Chaque colonne représente une tournée véhicule avec sa capacité en seaux (ex: 39/90, 90/90), la durée et la distance calculées via OSRM. Les clients redistribués apparaissent en bleu avec le badge "NEW". La Tournée 3 affiche un indicateur PE en rouge signalant un risque de retard détecté par l\'algorithme. Le gestionnaire peut glisser-déposer les clients entre les colonnes pour équilibrer la charge entre les véhicules disponibles.'}
        ],
    },
    {
        id: 3,
        title: 'Miyazaki Garden V2',
        shortDescription: 'Refonte complète en Next.js — authentification, favoris, avis et design Ghibli immersif.',
        shortDescriptionEn: 'Full Next.js rewrite — secure authentication, favorites, ratings and immersive Studio Ghibli design.',
        descriptionEn: 'Complete rewrite of my PHP/MySQL capstone project into a modern Next.js/TypeScript/PostgreSQL stack. I designed and implemented the entire application: secure authentication with NextAuth, favorites and ratings system (out of 10), avatar upload via Vercel Blob, automatic translation of Ghibli API data, and an immersive poetic design. Enhanced security with Zod validation, XSS sanitization and strict HTTP headers. Deployed on Vercel with Neon PostgreSQL.',
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
        shortDescriptionEn: 'Pedagogical tracking web app for a real client — in-browser document annotation, automated email notifications and role-based access.',
        descriptionEn: 'Team project built for COS Strasbourg, a real client. I handled three major areas. First, I implemented the document highlighting and annotation system by integrating the Mammoth library to convert DOCX files to HTML, then built an interactive context menu allowing supervisors to select text and annotate dissertations directly in the browser, without any external plugin. Second, I developed the automated email notification system via the Brevo API: each key workflow action (document upload, validation, annotation) triggers a targeted email to the right recipient. Third, I handled the entire interface design, strictly following the client\'s brand guidelines and ensuring visual consistency and responsive design across all pages I was responsible for.',
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
        shortDescriptionEn: 'HR evaluation system with survey creation — NestJS REST API backend with OOP architecture and Swagger documentation.',
        descriptionEn: 'Company project developed in a team within a demanding professional environment, with strict quality standards and regular code reviews. My contribution focused on the NestJS backend: I designed and implemented REST API endpoints following OOP principles — typed DTOs with class-validator for input validation, NestJS decorators (@Controller, @Get, @Post, @Body, @Param), dependency injection via services, and clear separation of concerns between controllers, services and repositories. I also contributed to the Swagger endpoint documentation and robust error handling with appropriate HTTP exceptions. This project taught me how to work in a demanding team context with strict code conventions, reviewed PRs and a real backend architecture.',
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
        shortDescriptionEn: 'Site showcasing Miyazaki\'s films with an immersive Studio Ghibli-inspired design, sound atmosphere and member area.',
        descriptionEn: 'First capstone project in native PHP/MySQL. Design and development of a showcase site dedicated to Hayao Miyazaki\'s universe with CSS animations, immersive sound atmosphere and member area. This project allowed me to master web fundamentals: MVC architecture in PHP, SQL queries, session management and responsive design. Starting point of my career transition, it laid the foundations on which I built the V2 in Next.js.',
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
    const { lang } = useLanguage();
    const t = lang === 'fr' ? fr : en;
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const filtered = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.tech.some(t => t.includes(activeFilter)));

    return (
        <>
            <section id="projects" className="max-w-6xl mx-auto px-4 py-20">
                <SectionTitle>{t.projects.title}</SectionTitle>

                {/* Filtres */}
                <div className="flex flex-wrap gap-2 justify-center mb-10">
                    {FILTERS.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setActiveFilter(f.value)}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                                activeFilter === f.value
                                    ? 'bg-vermillon text-white border-vermillon shadow-md'
                                    : 'bg-white text-ink border-gold/40 hover:border-vermillon hover:text-vermillon'
                            }`}
                        >
                            {f.value === 'all' ? t.projects.filterAll : f.label}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {filtered.map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => setSelectedProject(project)}
                            className="bg-white border-2 border-gold/40 rounded-lg overflow-hidden hover:border-vermillon hover:shadow-2xl hover:shadow-vermillon/20 transition-all duration-300 group cursor-pointer flex flex-col"
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
                            <div className="relative h-48 w-full overflow-hidden bg-washi-dark shrink-0">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={`Aperçu du projet ${project.title}`}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ink/10 to-gold/20">
                                        <span className="font-display text-4xl text-ink/20">{project.title[0]}</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                                <div className="absolute top-4 right-4 px-3 py-1 bg-washi/90 backdrop-blur-sm rounded-full text-xs font-semibold text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1" aria-hidden="true">
                                    Voir plus
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="font-display text-2xl font-bold mb-3 text-ink group-hover:text-vermillon transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-ink text-sm mb-5 leading-relaxed font-medium line-clamp-3">
                                    {lang === 'en' && project.shortDescriptionEn ? project.shortDescriptionEn : project.shortDescription}
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
                                <div className="mt-auto">
                                    {project.links?.demo && ( <a

                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-vermillon text-white text-xs font-semibold rounded-full hover:bg-vermillon-dark hover:shadow-lg hover:shadow-vermillon/30 hover:-translate-y-0.5 transition-all duration-300"
                                        onClick={(e) => e.stopPropagation()}
                                        >
                                        {t.projects.visitSite}
                                        </a>
                                        )}
                                </div>
                            </div>

                            <div className="h-1 bg-gradient-to-r from-vermillon to-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shrink-0" aria-hidden="true" />
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