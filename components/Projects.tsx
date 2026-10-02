'use client';

import { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
    SiJavascript, SiPhp, SiHtml5, SiCss3, SiNextdotjs, SiPrisma,
    SiDocker, SiTailwindcss, SiReact, SiNodedotjs, SiNestjs,
    SiPostgresql, SiMysql, SiSwagger, SiSpring, SiMariadb,
    SiTypescript, SiLeaflet
} from 'react-icons/si';
import ProjectModal from './ProjectModal';
import ProjectCover from './ProjectCover';
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
    'Java': null,
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

const projects: Project[] = [
    {
        id: 9,
        title: 'Équilibre',
        caseStudy: {
            need: 'Permettre à un coach et à son client de suivre ensemble un plan alimentaire personnalisé et l’évolution du poids, depuis le téléphone.',
            role: 'Seul, de l’application mobile React Native à l’API NestJS, dans le cadre de mon projet de fin d’études.',
            result: 'Espaces coach et utilisateur, plans personnalisés et suivi des pesées fonctionnels. Journal alimentaire et version Android de démonstration en cours.',
            challenge: 'Mener un projet sérieux **de bout en bout** : rédaction d’un **cahier des charges complet**, anticipation, **TDD**, et prise en main de **MongoDB**, dont le modèle document n’a rien à voir avec le SQL de PostgreSQL. Une rigueur tenue partout : Git, UX, tests et pipeline.',
        },
        caseStudyEn: {
            need: 'Help a coach and their client follow a personalised nutrition plan and weight progress together, from their phone.',
            role: 'Solo, from the React Native mobile app to the NestJS API, as my final-year project.',
            result: 'Coach and user spaces, personalised plans and weight tracking are working. Food diary and Android demo build in progress.',
            challenge: 'Running a serious project **end to end**: writing **full specifications**, planning ahead, **TDD**, and learning **MongoDB**, whose document model is nothing like PostgreSQL’s SQL. Rigour applied everywhere: Git, UX, tests and pipeline.',
        },
        status: 'development',
        imageKind: 'logo',
        shortDescription: 'Mon projet de fin d’études : une application mobile pour relier coach et utilisateur autour d’un plan personnalisé et du suivi du poids.',
        shortDescriptionEn: 'My final-year project: a mobile app connecting coaches and users through personalised plans and weight tracking.',
        description: '**Projet de fin d’études en cours de développement** à l’UHA 4.0. Je développe une application mobile de suivi alimentaire avec accompagnement coach, de l’interface React Native à l’API NestJS.\n\n' +
            '**Parcours déjà développés :**\n' +
            '- **Espaces coach et utilisateur** : authentification, gestion de session et accès selon le rôle.\n' +
            '- **Plans personnalisés** : le coach définit les objectifs et le budget calorique ; l’utilisateur consulte son suivi.\n' +
            '- **Suivi du poids** : historique des pesées, statut par rapport au plan et correction manuelle. Les pesées automatiques proviennent d’un **simulateur de balance connectée**.\n\n' +
            '**Conception et fiabilité :** API NestJS structurée en architecture hexagonale, MongoDB, tests unitaires et d’intégration, documentation Swagger et environnements Docker séparés.\n\n' +
            '**En cours :** journal alimentaire côté API et préparation d’une version Android de démonstration. Les captures, la vidéo et les accès de test seront ajoutés après validation des parcours.',
        descriptionEn: '**Final-year project in active development** at UHA 4.0. I am developing a mobile nutrition tracking app with coach support, from the React Native interface to the NestJS API.\n\n' +
            '**Implemented flows:**\n' +
            '- **Coach and user spaces**: authentication, session management and role-based access.\n' +
            '- **Personalised plans**: coaches set goals and calorie budgets; users view their progress.\n' +
            '- **Weight tracking**: measurement history, progress status and manual corrections. Automatic readings come from a **connected-scale simulator**.\n\n' +
            '**Design and reliability:** a NestJS API using hexagonal architecture, MongoDB, unit and integration tests, Swagger documentation and separate Docker environments.\n\n' +
            '**In progress:** food diary API and preparation of an Android demo build. Screenshots, video and test access will be added after the flows have been validated.',
        tech: ['React Native', 'TypeScript', 'NestJS', 'MongoDB', 'Expo', 'Docker', 'Swagger', 'Jest'],
        image: '/images/equilibre-logo.png',
        screenshots: [],
    },
    {
        id: 8,
        previousVersionId: 1,
        title: 'KCD Formes v2',
        caseStudy: {
            need: 'Faire passer mon projet fil rouge d’un prototype d’école à un jeu en ligne, robuste et maintenable.',
            role: 'Seul sur tout le projet, de l’architecture au déploiement.',
            result: 'Jeu en ligne sur **kcd-formes.fr** : solo, duel 1v1 et coop en temps réel, déployé automatiquement à chaque push.',
            challenge: 'Ma première **architecture hexagonale** : respecter ses règles avec rigueur (domaine isolé, dépendances tournées vers lui) pour en tirer les bénéfices. Multijoueur, simulation serveur et **100+ tests** branchés sans toucher au cœur du jeu. Et ma première chaîne **CI/CD** complète, jusqu’à mon propre VPS.',
        },
        caseStudyEn: {
            need: 'Turn my capstone project from a school prototype into a robust, maintainable online game.',
            role: 'Solo on the whole project, from architecture to deployment.',
            result: 'Live at **kcd-formes.fr**: solo, real-time 1v1 duel and co-op, deployed automatically on every push.',
            challenge: 'My first **hexagonal architecture**: following its rules rigorously (isolated domain, dependencies pointing inward) to get its benefits. Multiplayer, server-side simulation and **100+ tests** plugged in without touching the game core. And my first complete **CI/CD** pipeline, all the way to my own VPS.',
        },
        shortDescription: 'Refonte complète de mon fil rouge en architecture hexagonale, déployée en production sur mon propre VPS (Docker, HTTPS, CI/CD).',
        shortDescriptionEn: 'Full rewrite of my capstone game in hexagonal architecture, deployed to production on my own VPS (Docker, HTTPS, CI/CD).',
        description: 'Reprise de mon **projet fil rouge de 2ᵉ année**, entièrement réarchitecturée avec les compétences acquises depuis. Objectif : une vraie restructuration **de bout en bout**, du code métier jusqu\'à la mise en production.\n\n' +
            '- **Architecture hexagonale** (ports & adapters) : le domaine métier (formes, ennemis, vagues, économie) est isolé des détails techniques (JPA/PostgreSQL, contrôleurs REST).\n' +
            '- **Backend Java 21 / Spring Boot** : PostgreSQL + migrations Flyway, authentification JWT, verrou optimiste sur les parties.\n' +
            '- **Simulation côté serveur** : les vagues sont résolues sur le serveur puis rejouées à l\'écran : **100+ tests** unitaires et un **harnais d\'équilibrage multi-graines** qui vérifie que le jeu reste jouable.\n' +
            '- **Multijoueur temps réel (WebSocket/STOMP)** : mode **Versus 1v1** (chacun défend son château et envoie des vagues à l\'adversaire, avec **aperçu live de sa grille** et revenu passif) et mode **Coop** ; **chat de match** et **tutoriel guidé** intégrés.\n' +
            '- **Frontend Next.js / TypeScript + Phaser** : tower-defense solo (chemin serpentin, 5 tours, modes de ciblage, boss à capacités, paliers de bonus, classement) + **évolution des tours** (amélioration plafonnée, coûteuse mais décisive : dégâts, portée, solidité anti-siège).\n' +
            '- **Habillage pixel-art** : map « terres désolées » au chemin naturel, décor de ruines, HUD médiéval optimisé, tutoriel contextuel, sons (bruitages + musique réglables séparément), animations d\'impact et de destruction.\n' +
            '- **DevOps** : Docker multi-stage, reverse-proxy Caddy, HTTPS Let\'s Encrypt auto-renouvelé, **CI/CD GitHub Actions** (déploiement auto sur mon VPS OVH à chaque push).\n\n' +
            'En ligne sur **kcd-formes.fr**.\n\n' +
            '**En cours** : une **version mobile**.',
        descriptionEn: 'A full re-architecture of my **2nd-year capstone game**, rebuilt with the skills I\'ve gained since. The goal: a real **end-to-end** rebuild, from domain code to production.\n\n' +
            '- **Hexagonal architecture** (ports & adapters): the business domain (shapes, enemies, waves, economy) is isolated from technical details (JPA/PostgreSQL, REST controllers).\n' +
            '- **Java 21 / Spring Boot backend**: PostgreSQL + Flyway migrations, JWT authentication, optimistic locking on games.\n' +
            '- **Server-side simulation**: waves are resolved on the server then replayed on screen — **100+ unit tests** and a **multi-seed balancing harness** that checks the game stays playable.\n' +
            '- **Real-time multiplayer (WebSocket/STOMP)**: **Versus 1v1** mode (each defends their castle and sends waves to the opponent, with a **live opponent mini-map** and passive income) and **Coop** mode; built-in **in-match chat** and **guided tutorial**.\n' +
            '- **Next.js / TypeScript + Phaser frontend**: solo tower-defense (serpentine path, 5 towers, targeting modes, boss abilities, bonus milestones, leaderboard) + **tower evolution** (capped upgrades, costly but decisive: damage, range, siege-resistant HP).\n' +
            '- **Pixel-art layer**: "wasteland" map with a natural path, ruin décor, optimized medieval HUD, contextual tutorial, sound (separately adjustable SFX + music), impact and destruction animations.\n' +
            '- **DevOps**: multi-stage Docker, Caddy reverse-proxy, auto-renewed Let\'s Encrypt HTTPS, **GitHub Actions CI/CD** (auto-deploy to my OVH VPS on every push).\n\n' +
            'Live at **kcd-formes.fr**.\n\n' +
            '**In progress**: a **mobile version**.',
        tech: ['Next.js', 'TypeScript', 'Phaser', 'Spring Boot', 'Java', 'WebSocket', 'PostgreSQL', 'Docker', 'CI/CD', 'Architecture hexagonale'],
        image: '/images/kcd-v2-home.jpg',
        links: {
            demo: 'https://kcd-formes.fr',
            github: 'https://github.com/hachwilliam89-spec/kcd-formes-v2',
        },
        screenshots: [
            { url: '/images/kcd-v2-home.jpg', title: 'Page d\'accueil', description: 'Page d\'accueil avec formulaire d\'inscription et de connexion.', titleEn: 'Homepage', descriptionEn: 'Homepage with sign-up and login form.' },
            { url: '/images/kcd-v2-combat.jpg', title: 'Partie solo', description: 'Partie solo : pose de tours (Archer, Mage, Catapulte, Baliste, Mur) sur la grille, panneau latéral avec les statistiques de la partie et l\'évolution des tours (dégâts, portée, PV, cadence).', titleEn: 'Solo game', descriptionEn: 'Solo game: place towers (Archer, Mage, Catapult, Ballista, Wall) on the grid, side panel with run stats and tower evolution (damage, range, HP, fire rate).' },
            { url: '/images/kcd-v2-lobby.jpg', title: 'Lobby multijoueur', description: 'Lobby du mode duel 1 contre 1, vu des deux joueurs : créer un salon (code à partager) ou rejoindre par code, avec le statut « prêt » de chacun.', titleEn: 'Multiplayer lobby', descriptionEn: '1v1 duel lobby, shown from both players: create a room (shareable code) or join by code, with each player\'s "ready" status.' },
            { url: '/images/kcd-v2-duel.jpg', title: 'Duel en temps réel', description: 'Partie versus 1 contre 1 vue des deux joueurs (deux écrans), sur la seconde carte « La Fourche » (biome enneigé) où la route se divise en plusieurs voies rejoignant le château par des angles différents : chacun défend son château et dépense son or pour envoyer des ennemis chez l\'adversaire, ce qui augmente son revenu.', titleEn: 'Real-time duel', descriptionEn: '1v1 versus game shown from both players (two screens), on the second map "La Fourche" (snow biome) where the road splits into several lanes reaching the castle from different angles: each defends their castle and spends gold to send enemies to the opponent, which increases their income.' },
            { url: '/images/kcd-v2-versus.jpg', title: 'Versus : aperçu adverse et chat', description: 'Vue versus avec l\'aperçu de la grille adverse (mini-carte), le chat de partie et le tutoriel.', titleEn: 'Versus: opponent preview and chat', descriptionEn: 'Versus view with the opponent grid preview (mini-map), in-game chat and tutorial.' },
        ],
    },
    {
        id: 7,
        title: 'XIP Telecom v2',
        caseStudy: {
            need: 'Une plateforme B2B de courtage télécom qui qualifie les prospects, prépare les rendez-vous et produit des rapports d’audit, synchronisés avec le CRM de l’entreprise.',
            role: 'En équipe de 4 : j’ai développé la couche d’agents IA, l’intégration Odoo, les rapports PDF et l’API documentée.',
            result: 'Un parcours complet, du lead entrant au rapport d’audit attaché automatiquement à l’opportunité Odoo, couvert par **104 tests** unitaires.',
            challenge: 'Faire **travailler ensemble plusieurs agents IA** et garder les données cohérentes entre plusieurs plateformes (application, Odoo, Nextcloud, n8n). Avec **n8n**, apprendre à agencer des briques plutôt qu’à coder.',
        },
        caseStudyEn: {
            need: 'A B2B telecom brokerage platform that qualifies prospects, prepares meetings and produces audit reports, all synced with the company CRM.',
            role: 'Team of 4: I developed the AI agent layer, the Odoo integration, the PDF reports and the documented API.',
            result: 'A complete flow, from inbound lead to an audit report automatically attached to the Odoo opportunity, covered by **104 unit tests**.',
            challenge: 'Getting **several AI agents to work together** and keeping data consistent across platforms (app, Odoo, Nextcloud, n8n). With **n8n**, learning to assemble building blocks rather than write code.',
        },
        shortDescription: 'Équipe de 4 : j’ai développé la couche d’agents IA, l’intégration Odoo, les rapports PDF et l’API documentée.',
        description: 'Projet réalisé **en équipe de 4** (Jira/Confluence, GitLab) sur une plateforme **B2B de courtage télécom** (monorepo pnpm). **Mes contributions :**\n\n' +
            '- **Couche d\'agents IA orchestrés** : Superviseur/Routeur (identification via LLM, extraction du payload, routage), SDR (scoring auto des prospects 1–5, accusé de réception), Business Developer (fiches de préparation avant RDV).\n' +
            '- **LLMProvider abstrait** (OpenAI, Anthropic, mock), table agent_runs pour la journalisation, convention transversale prompts/routes/schemas pour les 6 agents de l\'équipe.\n' +
            '- **Intégration Odoo CRM** via XML-RPC en fire-and-forget : prospects, contacts, opportunités et pièces jointes PDF.\n' +
            '- **Rapports d\'audit télécom** générés automatiquement (React PDF, stockage Nextcloud WebDAV).\n' +
            '- **API REST** documentée (OpenAPI + Swagger UI), documentation technique complète et **104 tests** unitaires (Vitest).',
        shortDescriptionEn: 'Team of 4: I developed the AI agent layer, Odoo integration, PDF reports and documented API.',
        descriptionEn: 'Team project (4 devs, Jira/Confluence, GitLab) on a **B2B telecom brokerage** platform (pnpm monorepo). **My contributions:**\n\n' +
            '- **Orchestrated AI agent layer**: Supervisor/Router (LLM-based target ID, payload extraction, routing), SDR (automated prospect scoring 1–5, acknowledgment), Business Developer (pre-meeting prep sheets).\n' +
            '- **Abstract LLMProvider** (OpenAI, Anthropic, mock), agent_runs audit-logging table, cross-cutting prompts/routes/schemas convention for the team\'s 6 agents.\n' +
            '- **Odoo CRM integration** via XML-RPC (fire-and-forget): prospects, contacts, opportunities and PDF attachments.\n' +
            '- **Telecom audit reports** auto-generated (React PDF, Nextcloud WebDAV storage).\n' +
            '- **REST API** documented (OpenAPI + Swagger UI), full technical docs and **104 unit tests** (Vitest).',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Drizzle ORM', 'OpenAI', 'Anthropic', 'Zod', 'n8n'],
        image: '/images/xip-home.png',
        screenshots: [
            { url: '/images/xip-home.png', title: 'Page d\'accueil', description: 'Site vitrine public de XIP Telecom, plateforme B2B de conseil et courtage télécom. Navigation vers les sections Solutions, Missions d\'audit, Recrutement BDI et l\'extranet via le bouton Login. Développé en Next.js avec design sobre et professionnel.', titleEn: 'Homepage', descriptionEn: 'Public landing page of XIP Telecom, a B2B telecom consulting and brokerage platform. Navigation to Solutions, Audit Missions, BDI Recruitment sections and the extranet via the Login button. Built with Next.js.' },
            { url: '/images/xip-prospect.png', title: 'Extranet BDI : Création de prospect', description: 'Interface de l\'extranet réservé aux Business Developers. Formulaire de qualification d\'un nouveau prospect : société, contact principal, email, téléphone, code postal, besoin télécom libre et statut (Qualifié/Non qualifié). À la soumission, le prospect est créé en base via Drizzle ORM et synchronisé en fire-and-forget vers Odoo CRM via XML-RPC.', titleEn: 'BDI Extranet: Prospect Creation', descriptionEn: 'Extranet interface for Business Developers. Prospect qualification form: company, main contact, email, phone, postal code, free-text telecom need and status (Qualified/Not qualified). On submit, the prospect is persisted via Drizzle ORM and synced to Odoo CRM via XML-RPC in a fire-and-forget pattern.' },
            { url: '/images/xip-audit.png', title: 'Questionnaire d\'audit télécom', description: 'Interface de saisie d\'un audit structuré en 9 étapes : Identification, Origine et objectifs, Infrastructure télécom, Téléphonie fixe, Téléphonie mobile, Internet et réseaux, WiFi/VPN/Sécurité, Messagerie et IT, Synthèse et actions. Barre de progression en temps réel (ici 100% (17/42 questions renseignées). Validation de l\'audit et génération du rapport PDF déclenchées depuis ce récapitulatif.', titleEn: 'Telecom Audit Questionnaire', descriptionEn: '9-step structured audit form: Identification, Origin & objectives, Telecom infrastructure, Fixed telephony, Mobile telephony, Internet & networks, WiFi/VPN/Security, Messaging & IT, Summary & actions. Real-time progress bar (here 100% (17/42 questions filled). Audit validation and PDF report generation triggered from this summary.' },
            { url: '/images/xip-rapport.png', title: 'Rapport d\'audit , Récapitulatif', description: 'Page de récapitulatif avant génération du PDF : informations client (société, contact, BDI affecté), statut de l\'audit, date et sommaire des 9 étapes. Le bouton "Générer / Télécharger le PDF" déclenche le moteur React PDF côté serveur et stocke le fichier sur Nextcloud via WebDAV, puis l\'attache automatiquement à l\'opportunité Odoo.', titleEn: 'Audit Report: Summary', descriptionEn: 'Pre-generation summary page: client info (company, contact, assigned BDI), audit status, date and 9-step outline. The "Generate / Download PDF" button triggers the React PDF engine server-side, stores the file on Nextcloud via WebDAV, and automatically attaches it to the Odoo opportunity.' },
            { url: '/images/xip-n8n.png', title: 'Orchestration n8n : Lead entrant', description: 'Workflow n8n publié "XIP – lead entrant – Orchestration" déclenché par webhook POST à chaque nouveau lead entrant. Pipeline en 4 nœuds : réception webhook → email interne de notification → email d\'accusé de réception au prospect → réponse webhook. Exécuté en 143ms en production, avec historique des exécutions (succès/erreurs) visible en temps réel.', titleEn: 'n8n Orchestration: Inbound Lead', descriptionEn: 'Published n8n workflow "XIP – inbound lead – Orchestration" triggered by a POST webhook on every new inbound lead. 4-node pipeline: webhook receiver → internal notification email → prospect acknowledgment email → webhook response. Executed in 143ms in production, with real-time execution history (success/errors).' },
            { url: '/images/xip-odoo.png', title: 'Synchronisation Odoo CRM', description: 'Opportunité synchronisée dans le pipeline Odoo CRM via XML-RPC en fire-and-forget. Champs personnalisés XIP injectés : Xip App Lead (UUID), Xip App Audit et Xip Audit Status ("Audit complete"). Deux rapports PDF d\'audit attachés automatiquement à l\'opportunité lors de la synchronisation, visibles dans la section Files.', titleEn: 'Odoo CRM Synchronization', descriptionEn: 'Opportunity synced into the Odoo CRM pipeline via XML-RPC in a fire-and-forget pattern. Custom XIP fields injected: Xip App Lead (UUID), Xip App Audit and Xip Audit Status ("Audit complete"). Two audit PDF reports automatically attached to the opportunity on sync, visible in the Files section.' },
        ],
    },
    {
        id: 1,
        title: 'KCD Formes',
        shortDescription: 'Jeu de tower defense médiéval en pixel art avec mode multijoueur asymétrique temps réel.',
        shortDescriptionEn: 'Medieval pixel art tower defense game with real-time asymmetric multiplayer, developed solo as the Licence Pro capstone project.',
        descriptionEn: '**Licence Pro capstone project**, designed and developed **entirely solo**. Geometric shapes govern every mechanic: area sets damage and HP, perimeter sets range and speed.\n\n' +
            '- **Java / Spring Boot backend** architected with the **Factory Method** pattern (enemy and shape creation).\n' +
            '- **Real-time asymmetric multiplayer** via **WebSocket/STOMP** (attacker vs. defender).\n' +
            '- **Next.js frontend**: animated pixel-art sprites, interactive grid, wave management.\n' +
            '- **Deployed** on university servers via a custom Docker Compose script.',
        description: '**Projet fil rouge de Licence Pro**, conçu et développé **en autonomie complète**. Les **formes géométriques** gouvernent toutes les mécaniques : l\'aire détermine les dégâts et les PV, le périmètre la portée et la vitesse.\n\n' +
            '- **Backend Java / Spring Boot** architecturé avec le pattern **Factory Method** (création des ennemis et des formes).\n' +
            '- **Multijoueur asymétrique temps réel** via **WebSocket/STOMP** (attaquant vs défenseur).\n' +
            '- **Frontend Next.js** : sprites pixel-art animés, grille interactive, gestion des vagues.\n' +
            '- **Déploiement** sur serveurs école via un script Docker Compose personnalisé.',
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
        shortDescription: 'Projet en équipe : Scrum Master et développeur du planning de redistribution, de l’optimisation des tournées et des API.',
        shortDescriptionEn: 'Bio-waste collection management app built in a team, Scrum Master role, VRPTW algorithm and drag-and-drop Kanban redistribution interface.',
        descriptionEn: 'As **Scrum Master** I ran the ceremonies, managed the Jira backlog and coordinated sprints. Bio-waste collection management app; my dev contributions:\n\n' +
            '- **Evaluation Procedure (PE)** for the **VRPTW** algorithm: 3-case decision tree (on time / definitively late / uncertain).\n' +
            '- Proposed and integrated **VROOM** as the tour optimization engine.\n' +
            '- **Cancelled-tour redistribution** UI: **drag-and-drop** Kanban, 3 modes (client, full tour, full day).\n' +
            '- Full **database migration** Supabase → local Docker PostgreSQL (+ team guide).\n' +
            '- Built and documented **15 REST API routes** (Swagger).',
        description: '**Scrum Master** de l\'équipe : animation des cérémonies, gestion du backlog Jira, coordination des sprints. Application de **gestion de collecte de biodéchets** ; mes contributions côté développement :\n\n' +
            '- **Procédure d\'Évaluation (PE)** pour l\'algorithme **VRPTW** : arbre de décision à 3 cas (à l\'heure / définitivement en retard / incertain).\n' +
            '- Proposition et intégration de **VROOM** comme moteur d\'optimisation des tournées.\n' +
            '- **Interface de redistribution** des tournées annulées : Kanban **drag-and-drop**, 3 modes (client, tournée, journée).\n' +
            '- **Migration** complète Supabase → PostgreSQL Docker local (+ guide pour l\'équipe).\n' +
            '- Développement et documentation de **15 routes API** (Swagger).',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Leaflet', 'OSRM'],
        image: '/images/recycle-dashboard.jpg',
        screenshots: [
            {url: '/images/planning-redistribution.png',title: 'Planning redistribution', description: 'Vue planning hebdomadaire permettant au gestionnaire de superviser l\'ensemble de la semaine en un coup d\'œil. Chaque jour affiche le nombre de tournées actives, annulées et redistribuées. Un panneau latéral signale les clients sans tournée à réassigner par glisser-déposer vers un véhicule disponible (Jumpy 1, Jumpy 2, Petit véhicule). Les jours fériés sont automatiquement détectés et bloqués.'},
            {url: '/images/page-redistribution.png', title: 'Page de redistribution', description: 'Interface Kanban de redistribution des tournées de collecte. Chaque colonne représente une tournée véhicule avec sa capacité en seaux (ex: 39/90, 90/90), la durée et la distance calculées via OSRM. Les clients redistribués apparaissent en bleu avec le badge "NEW". La Tournée 3 affiche un indicateur PE en rouge signalant un risque de retard détecté par l\'algorithme. Le gestionnaire peut glisser-déposer les clients entre les colonnes pour équilibrer la charge entre les véhicules disponibles.'}
        ],
    },
    {
        id: 3,
        previousVersionId: 6,
        title: 'Miyazaki Garden V2',
        shortDescription: 'Refonte complète en Next.js : authentification, favoris, avis et design Ghibli immersif.',
        shortDescriptionEn: 'Full Next.js rewrite, secure authentication, favorites, ratings and immersive Studio Ghibli design.',
        descriptionEn: 'Full rewrite of my **PHP/MySQL** capstone into a modern **Next.js / TypeScript / PostgreSQL** stack. Entirely designed and implemented:\n\n' +
            '- **Secure authentication** with NextAuth.\n' +
            '- **Favorites and ratings** (out of 10), avatar upload via Vercel Blob.\n' +
            '- **Automatic translation** of Ghibli API data.\n' +
            '- **Hardened security**: Zod validation, XSS sanitization, strict HTTP headers.\n' +
            '- **Immersive poetic design**, deployed on Vercel with Neon PostgreSQL.',
        description: 'Refonte complète de mon fil rouge **PHP/MySQL** vers une stack moderne **Next.js / TypeScript / PostgreSQL**. Application conçue et implémentée intégralement :\n\n' +
            '- **Authentification sécurisée** avec NextAuth.\n' +
            '- **Favoris et avis** (notation sur 10), upload d\'avatar via Vercel Blob.\n' +
            '- **Traduction automatique** des données de l\'API Ghibli.\n' +
            '- **Sécurité renforcée** : validation Zod, sanitisation XSS, headers HTTP stricts.\n' +
            '- **Design poétique immersif**, déployé sur Vercel avec Neon PostgreSQL.',
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
        shortDescription: 'Projet client en équipe : j’ai développé les annotations de documents, les notifications email et le design de l’interface.',
        shortDescriptionEn: 'Client team project: I built document annotation, automated email notifications and the interface design.',
        descriptionEn: 'Team project for a **real client** (COS Strasbourg). I owned three main areas:\n\n' +
            '- **In-browser document annotation**: DOCX→HTML conversion (Mammoth) + context menu to highlight/annotate dissertations, no external plugin.\n' +
            '- **Automated email notifications** (Brevo API) triggered on each key workflow action (upload, validation, annotation).\n' +
            '- **Interface design**: strict adherence to the client\'s brand guidelines, visual consistency and responsive design.',
        description: 'Projet **en équipe pour un client réel** (COS Strasbourg). J\'ai pris en charge trois axes :\n\n' +
            '- **Annotation de documents** dans le navigateur : conversion DOCX→HTML (Mammoth) + menu contextuel de surlignage/annotation des mémoires, sans plugin externe.\n' +
            '- **Notifications email automatiques** (API Brevo) déclenchées à chaque action clé du workflow (dépôt, validation, annotation).\n' +
            '- **Design de l\'interface** : respect strict de la charte client, cohérence visuelle et responsive.',
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
        shortDescription: 'Projet en équipe : développement du backend NestJS, des endpoints API et de leur documentation Swagger.',
        shortDescriptionEn: 'Team project: I developed NestJS backend endpoints and Swagger API documentation for an HR evaluation system.',
        descriptionEn: 'Company project built **in a team** in a demanding professional environment (strict quality standards, regular **code reviews**). My contribution focused on the **NestJS backend**:\n\n' +
            '- **OOP REST API endpoints**: typed DTOs + class-validator, NestJS decorators, dependency injection.\n' +
            '- Clear **separation of concerns** (controllers / services / repositories).\n' +
            '- **Swagger documentation** and robust error handling (appropriate HTTP exceptions).\n\n' +
            'Taught me to work with **strict code conventions**, **reviewed PRs** and a real backend architecture.',
        description: 'Projet **d\'entreprise en équipe**, environnement pro exigeant (standards de qualité, **revues de code** régulières). Contribution centrée sur le **backend NestJS** :\n\n' +
            '- **Endpoints API REST en POO** : DTOs typés + class-validator, décorateurs NestJS, injection de dépendances.\n' +
            '- **Séparation des responsabilités** claire (controllers / services / repositories).\n' +
            '- **Documentation Swagger** et gestion robuste des erreurs (exceptions HTTP appropriées).\n\n' +
            'M\'a appris à travailler avec des **conventions strictes**, des **PR reviewées** et une vraie architecture backend.',
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
        descriptionEn: '**First capstone project** in **native PHP/MySQL**: a showcase site dedicated to Hayao Miyazaki\'s universe.\n\n' +
            '- **MVC architecture** in PHP, SQL queries, session management.\n' +
            '- **CSS animations**, immersive sound atmosphere and **member area**.\n' +
            '- Starting point of my **career transition** — the foundations for the Next.js V2.',
        description: '**Premier projet fil rouge** en **PHP/MySQL natif** : site vitrine dédié à l\'univers de Hayao Miyazaki.\n\n' +
            '- **Architecture MVC** en PHP, requêtes SQL, gestion des sessions.\n' +
            '- **Animations CSS**, ambiance sonore immersive et **espace membre**.\n' +
            '- Point de départ de ma **reconversion** — les bases sur lesquelles j\'ai construit la V2 en Next.js.',
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

    const featuredIds = [9, 7, 8];
    const previousIds = new Set(projects.map(project => project.previousVersionId));
    const currentProjects = projects.filter(project => !previousIds.has(project.id));
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
                                    : 'bg-white dark:bg-washi-dark text-ink border-gold/40 hover:border-vermillon hover:text-vermillon'
                            }`}
                        >
                            {f.value === 'all' ? t.projects.filterAll : f.label}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {groups.map(group => (
                        <Fragment key={group.title}>
                            <h3 className="col-span-full font-display text-2xl text-ink border-b border-gold/30 pb-4 mt-4">{group.title}</h3>
                    {group.items.map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-washi-dark border-2 border-gold/40 rounded-lg overflow-hidden hover:border-vermillon hover:shadow-2xl hover:shadow-vermillon/20 transition-all duration-300 group flex flex-col"
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedProject(project)}
                                aria-label={`${t.projects.details} : ${project.title}`}
                                className="relative h-48 w-full overflow-hidden shrink-0 focus-visible:outline-2 focus-visible:outline-vermillon focus-visible:outline-offset-[-4px]"
                            >
                                <ProjectCover project={project} />
                            </button>

                            <div className="p-6 flex flex-col flex-1">
                                {project.status === 'development' && (
                                    <span className="self-start mb-3 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-ink">
                                        {t.projects.inDevelopment}
                                    </span>
                                )}
                                <h4 className="font-display text-2xl font-bold mb-3 text-ink group-hover:text-vermillon transition-colors duration-300">
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
                                {/* Pied de carte : « Découvrir » toujours en bas, le lien site éventuel juste au-dessus */}
                                <div className="mt-auto flex flex-col items-start gap-4">
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
                                    <button
                                        type="button"
                                        onClick={() => setSelectedProject(project)}
                                        className="text-sm font-semibold text-vermillon underline underline-offset-4 hover:text-vermillon-dark"
                                        aria-label={`${t.projects.details} : ${project.title}`}
                                    >
                                        {t.projects.details}
                                    </button>
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