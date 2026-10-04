import type { Project } from './types';

export const projects: Project[] = [
    {
        id: 9,
        slug: 'equilibre',
        title: 'Équilibre',
        caseStudy: {
            need: 'Permettre à un coach et à son client de suivre ensemble un plan alimentaire personnalisé et l’évolution du poids, depuis le téléphone.',
            role: 'Seul, de l’application mobile React Native à l’API NestJS, dans le cadre de mon projet de fin d’études.',
            result: 'Espaces coach et utilisateur, plans personnalisés et suivi des pesées fonctionnels. Journal alimentaire et version Android de démonstration en cours.',
            challenge: 'Concevoir un **modèle documentaire MongoDB** adapté à la consultation et à la mise à jour des plans et des pesées. Le cahier des charges et les tests en **TDD** cadrent les règles métier ; un contrôle de version protège les données lors de mises à jour simultanées.',
        },
        caseStudyEn: {
            need: 'Help a coach and their client follow a personalised nutrition plan and weight progress together, from their phone.',
            role: 'Solo, from the React Native mobile app to the NestJS API, as my final-year project.',
            result: 'Coach and user spaces, personalised plans and weight tracking are working. Food diary and Android demo build in progress.',
            challenge: 'Design a **MongoDB document model** suited to reading and updating plans and weight measurements. Specifications and **TDD** tests define the business rules; version checks protect data during concurrent updates.',
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
        slug: 'kcd-formes',
        previousVersionId: 1,
        title: 'War Seasons',
        caseStudy: {
            need: 'Faire passer mon projet fil rouge d’un prototype d’école à un vrai jeu en ligne : robuste, maintenable et avec sa propre identité visuelle.',
            role: 'Seul sur tout le projet, de l’architecture au déploiement, jusqu’à la direction artistique.',
            result: 'Jeu en ligne sur **kcd-formes.fr** : solo, duel 1v1 et coop en temps réel sur quatre cartes saisonnières, déployé automatiquement à chaque push.',
            challenge: 'Ma première **architecture hexagonale**, tenue jusqu’au bout : multijoueur, simulation serveur et **100+ tests** branchés sans toucher au cœur du jeu. Puis des **règles saisonnières** (crues, grêle, boue, brume) écrites une seule fois dans le domaine et partagées par le solo et le moteur temps réel.',
        },
        caseStudyEn: {
            need: 'Turn my capstone project from a school prototype into a real online game: robust, maintainable and with its own visual identity.',
            role: 'Solo on the whole project, from architecture to deployment, all the way to the art direction.',
            result: 'Live at **kcd-formes.fr**: solo, real-time 1v1 duel and co-op on four seasonal maps, deployed automatically on every push.',
            challenge: 'My first **hexagonal architecture**, kept clean to the end: multiplayer, server-side simulation and **100+ tests** plugged in without touching the game core. Then **seasonal rules** (floods, hail, mud, fog) written once in the domain and shared by solo play and the real-time engine.',
        },
        shortDescription: 'Mon fil rouge devenu un vrai jeu : tower defense en architecture hexagonale, quatre cartes saisonnières, multijoueur temps réel, en production sur mon VPS.',
        shortDescriptionEn: 'My capstone turned into a real game: a hexagonal-architecture tower defense with four seasonal maps and real-time multiplayer, in production on my own VPS.',
        description: 'Reprise de mon **projet fil rouge de 2ᵉ année** (anciennement KCD Formes), entièrement réarchitecturée puis devenue **War Seasons** : un tower defense médiéval-fantasy en ligne.\n\n' +
            '- **Architecture hexagonale** (ports & adapters) : le domaine métier (tours, ennemis, vagues, économie, terrain saisonnier) est isolé des détails techniques (JPA/PostgreSQL, REST, WebSocket).\n' +
            '- **Quatre cartes, quatre saisons** : au printemps, le château est au milieu d\'un lac et des **crues** neutralisent les tours d\'une berge ; la **grêle** rend les ennemis plus vulnérables. En automne, la **boue** ralentit les ennemis (sauf les géants) et la **brume** réduit la portée des tours ; toutes deux changent de place à chaque vague.\n' +
            '- **Simulation côté serveur** : les vagues sont résolues sur le serveur puis rejouées à l\'écran ; les règles saisonnières sont partagées par le solo et le moteur temps réel. **100+ tests** unitaires et un **harnais d\'équilibrage multi-graines**.\n' +
            '- **Multijoueur temps réel (WebSocket/STOMP)** : **Versus 1v1** (envoi d\'ennemis chez l\'adversaire, aperçu live de sa grille) et **Coop** ; chat de match et tutoriel contextuel.\n' +
            '- **Frontend Next.js / TypeScript + Phaser** : 5 tours avec évolution et modes de ciblage, boss à capacités, paliers de bonus, classement par carte ; météo animée (pluie, grêle, crues, brume) et décor de saison trié en profondeur.\n' +
            '- **Direction artistique** : accueil animé en Canvas (ennemis en marche, tirs des tours, catapultes, météo de chaque saison), connexion sur un étendard qui se déroule, blason et charte unifiée sur tout le jeu.\n' +
            '- **DevOps** : Docker multi-stage, reverse-proxy Caddy, HTTPS Let\'s Encrypt auto-renouvelé, **CI/CD GitHub Actions** (déploiement auto sur mon VPS OVH à chaque push) et **banc de performance** de la scène de jeu.\n\n' +
            'En ligne sur **kcd-formes.fr**.\n\n' +
            '**En cours** : une **version mobile**.',
        descriptionEn: 'A full re-architecture of my **2nd-year capstone game** (formerly KCD Formes), now **War Seasons**: an online medieval-fantasy tower defense.\n\n' +
            '- **Hexagonal architecture** (ports & adapters): the business domain (towers, enemies, waves, economy, seasonal terrain) is isolated from technical details (JPA/PostgreSQL, REST, WebSocket).\n' +
            '- **Four maps, four seasons**: in spring, the castle stands in the middle of a lake and **floods** disable the towers on one bank; **hail** makes enemies more vulnerable. In autumn, **mud** slows enemies (except giants) and **fog** cuts tower range; both move every wave.\n' +
            '- **Server-side simulation**: waves are resolved on the server then replayed on screen; seasonal rules are shared by solo play and the real-time engine. **100+ unit tests** and a **multi-seed balancing harness**.\n' +
            '- **Real-time multiplayer (WebSocket/STOMP)**: **Versus 1v1** (send enemies to your opponent, live view of their grid) and **Co-op**; in-match chat and contextual tutorial.\n' +
            '- **Next.js / TypeScript + Phaser frontend**: 5 towers with upgrades and targeting modes, boss abilities, bonus milestones, per-map leaderboard; animated weather (rain, hail, floods, fog) and depth-sorted seasonal scenery.\n' +
            '- **Art direction**: animated Canvas homepage (marching enemies, tower shots, catapults, weather for each season), login on a banner that unrolls, a crest and one visual system across the whole game.\n' +
            '- **DevOps**: multi-stage Docker, Caddy reverse-proxy, auto-renewed Let\'s Encrypt HTTPS, **GitHub Actions CI/CD** (auto-deploy to my OVH VPS on every push) and a **performance bench** for the game scene.\n\n' +
            'Live at **kcd-formes.fr**.\n\n' +
            '**In progress**: a **mobile version**.',
        tech: ['Next.js', 'TypeScript', 'Phaser', 'Spring Boot', 'Java', 'WebSocket', 'PostgreSQL', 'Docker', 'CI/CD', 'Architecture hexagonale', 'Canvas'],
        image: '/images/war-seasons-accueil.jpg',
        links: {
            demo: 'https://kcd-formes.fr',
            github: 'https://github.com/hachwilliam89-spec/kcd-formes-v2',
        },
        screenshots: [
            { url: '/images/war-seasons-accueil.jpg', title: 'Accueil', description: 'Carte de guerre animée en Canvas : ennemis en marche sur les routes, tirs des tours, catapultes et météo de chaque saison. La connexion se déroule sur un étendard.', titleEn: 'Homepage', descriptionEn: 'Animated Canvas war map: enemies marching on the roads, tower shots, catapults and weather for each season. Login unrolls on a banner.' },
            { url: '/images/war-seasons-cartes.jpg', title: 'Choix du royaume', description: 'Quatre cartes saisonnières, chacune avec un aperçu réel du champ de bataille, une phrase et un niveau de difficulté.', titleEn: 'Choose your kingdom', descriptionEn: 'Four seasonal maps, each with a real preview of the battlefield, one sentence and a difficulty level.' },
            { url: '/images/war-seasons-printemps.jpg', title: 'Printemps : Les Jardins éveillés', description: 'Château au milieu du lac, attaqué par quatre voies qui convergent sur deux ponts, ici sous la grêle qui rend les ennemis plus vulnérables. Toutes les trois vagues, une crue noie une berge et neutralise ses tours.', titleEn: 'Spring: The Awakened Gardens', descriptionEn: 'A castle in the middle of a lake, attacked by four lanes converging on two bridges, here under hail that makes enemies more vulnerable. Every three waves, a flood submerges one bank and disables its towers.' },
            { url: '/images/war-seasons-automne.jpg', title: 'Automne : Le Val des feuilles', description: 'Serpentin coupé par un raccourci. La boue ralentit les ennemis (sauf les géants) et la brume réduit la portée des tours ; elles changent de place à chaque vague.', titleEn: 'Autumn: The Valley of Leaves', descriptionEn: 'A serpentine path cut by a shortcut. Mud slows enemies (except giants) and fog cuts tower range; both move every wave.' },
            { url: '/images/war-seasons-hiver.jpg', title: 'Hiver : La Fourche', description: 'La route se divise en trois branches qui rejoignent le château par des angles différents : la défense doit couvrir chaque voie.', titleEn: 'Winter: The Fork', descriptionEn: 'The road splits into three branches reaching the castle from different angles: the defense has to cover every lane.' },
            { url: '/images/war-seasons-coop.jpg', title: 'Salon coop', description: 'Créer une partie à deux et partager son code, ou rejoindre un ami, sur la carte de son choix.', titleEn: 'Co-op lobby', descriptionEn: 'Create a two-player game and share its code, or join a friend, on the map of your choice.' },
        ],
    },
    {
        id: 7,
        slug: 'xip-telecom',
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
        tech: ['Next.js', 'TypeScript', 'Python', 'PostgreSQL', 'Docker', 'Drizzle ORM', 'OpenAI', 'Anthropic', 'Zod', 'n8n'],
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
        slug: 'kcd-formes-v1',
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
        slug: 'recycle-dashboard',
        title: 'RecycleDashboard',
        caseStudy: {
            need: "Organiser les collectes de biodéchets et réaffecter les clients lorsqu’une tournée est annulée.",
            role: "Scrum Master et développeur au sein de l’équipe : coordination des sprints, redistribution des tournées, optimisation et API.",
            result: "Une interface de redistribution par glisser-déposer, l’intégration de VROOM et **15 routes API documentées**. Migration vers PostgreSQL sous Docker avec un guide pour l’équipe.",
            challenge: "Évaluer les risques de retard et permettre la redistribution d’un client, d’une tournée ou d’une journée. J’ai développé une procédure distinguant les situations à l’heure, en retard ou incertaines.",
        },
        caseStudyEn: {
            need: "Organise bio-waste collections and reassign customers when a route is cancelled.",
            role: "Team Scrum Master and developer: sprint coordination, route redistribution, optimisation and APIs.",
            result: "A drag-and-drop redistribution interface, VROOM integration and **15 documented API routes**. Migration to Docker-based PostgreSQL with a guide for the team.",
            challenge: "Assess lateness risks and support redistributing a customer, a route or a whole day. I developed an evaluation procedure that distinguishes on-time, late and uncertain cases.",
        },
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
        slug: 'miyazaki-garden',
        previousVersionId: 6,
        title: 'Miyazaki Garden V2',
        caseStudy: {
            need: "Faire évoluer mon premier site consacré à Miyazaki vers une application avec comptes membres, favoris et avis.",
            role: "Conception et développement de la refonte, du frontend Next.js à la base PostgreSQL et au déploiement.",
            result: "Une application en ligne avec authentification, favoris, notes et avatars, dans un univers visuel inspiré de Ghibli.",
            challenge: "Repenser mon projet PHP/MySQL avec Next.js et TypeScript, intégrer les données de l’API Ghibli et leur traduction, et valider les données saisies par les membres.",
        },
        caseStudyEn: {
            need: "Evolve my first Miyazaki website into an app with member accounts, favourites and reviews.",
            role: "Designed and developed the rewrite, from the Next.js frontend to the PostgreSQL database and deployment.",
            result: "A live app with authentication, favourites, ratings and avatars, with a Ghibli-inspired visual identity.",
            challenge: "Rebuild my PHP/MySQL project with Next.js and TypeScript, integrate and translate Ghibli API data, and validate member input.",
        },
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
        slug: 'cos-strasbourg',
        title: 'COS Strasbourg',
        caseStudy: {
            need: "Permettre aux étudiants de déposer leurs documents et aux encadrants de les annoter et de suivre leur progression.",
            role: "Développement en équipe pour COS Strasbourg : annotations dans le navigateur, notifications email et interface conforme à la charte du client.",
            result: "Des documents annotables dans le navigateur et des notifications liées aux étapes du suivi : dépôt, validation et annotation.",
            challenge: "Rendre les mémoires DOCX annotables sans plugin externe : conversion en HTML avec Mammoth et ajout d’un menu de surlignage et d’annotation.",
        },
        caseStudyEn: {
            need: "Let students submit documents and supervisors annotate them and track their progress.",
            role: "Team development for COS Strasbourg: in-browser annotation, email notifications and an interface following the client’s brand guidelines.",
            result: "Documents that can be annotated in the browser, with notifications for submission, validation and annotation.",
            challenge: "Make DOCX dissertations annotatable without an external plugin: convert them to HTML with Mammoth and add a highlighting and annotation menu.",
        },
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
        slug: 'evaluation-rh',
        title: 'Evaluation RH',
        caseStudy: {
            need: "Permettre la création et la gestion de questionnaires d’évaluation RH pour plusieurs sociétés.",
            role: "Développeur backend NestJS au sein d’une équipe, avec conventions de code et revues de contributions.",
            result: "Des endpoints REST pour le système d’évaluation, avec validation des données, gestion des erreurs et documentation Swagger.",
            challenge: "Intégrer mes contributions dans l’architecture de l’équipe : séparer contrôleurs, services et accès aux données, et appliquer les retours des revues de code.",
        },
        caseStudyEn: {
            need: "Support creating and managing HR evaluation surveys for multiple companies.",
            role: "NestJS backend developer in a team using shared coding conventions and code reviews.",
            result: "REST endpoints for the evaluation system, with input validation, error handling and Swagger documentation.",
            challenge: "Fit my contributions into the team’s architecture: separate controllers, services and data access, and apply code review feedback.",
        },
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
        slug: 'miyazaki-garden-v1',
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

const previousIds = new Set(projects.map(project => project.previousVersionId));
export const currentProjects = projects.filter(project => !previousIds.has(project.id));

export function projectPath(project: Project) {
    const current = currentProjects.find(item => item.previousVersionId === project.id) ?? project;
    return `/projets/${current.slug}`;
}
