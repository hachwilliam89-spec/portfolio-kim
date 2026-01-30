'use client';

import { motion } from 'framer-motion';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiNodedotjs, SiPrisma, SiPhp, SiPostgresql, SiMysql, SiDocker, SiGit, SiGitlab } from 'react-icons/si';

const techIcons: { [key: string]: any } = {
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'TypeScript': SiTypescript,
    'Tailwind CSS': SiTailwindcss,
    'Framer Motion': SiFramer,
    'Node.js': SiNodedotjs,
    'API REST': null,
    'Prisma': SiPrisma,
    'PHP': SiPhp,
    'PostgreSQL': SiPostgresql,
    'MySQL': SiMysql,
    'Docker': SiDocker,
    'Git': SiGit,
    'GitLab': SiGitlab,
    'Scrum': null,
};

const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', items: ['Node.js', 'API REST', 'Prisma', 'PHP'] },
    { category: 'Base de données', items: ['PostgreSQL', 'MySQL'] },
    { category: 'DevOps & Outils', items: ['Docker', 'Git', 'GitLab', 'Scrum'] },
];

// Composant Sceau Chinois (印章)
function ChineseSeal() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: 0.8,
                type: "spring",
                stiffness: 200,
                damping: 15
            }}
            className="absolute -bottom-3 -right-3 md:bottom-4 md:right-4"
            title="金 - Kim"
        >
            <svg
                className="w-14 h-14 md:w-16 md:h-16"
                viewBox="0 0 60 60"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Fond du sceau - carré avec bords irréguliers */}
                <path
                    d="M 4 3
                       L 55 4
                       Q 57 4, 57 6
                       L 56 54
                       Q 56 56, 54 56
                       L 5 55
                       Q 3 55, 3 53
                       L 4 5
                       Q 4 3, 6 3
                       Z"
                    fill="#c73e1d"
                    opacity="0.9"
                />

                {/* Effet usé/texture - petites irrégularités */}
                <path
                    d="M 8 8 L 10 7 M 50 10 L 52 8 M 7 50 L 9 52 M 48 51 L 51 50"
                    stroke="#a33318"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                />

                {/* Caractère 金 (Kim/Or) - style sceau */}
                <g fill="none" stroke="#faf9f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Trait horizontal haut (人 partie) */}
                    <path d="M 18 16 L 42 16" />

                    {/* Trait diagonal gauche */}
                    <path d="M 22 20 L 15 30" />

                    {/* Trait diagonal droit */}
                    <path d="M 38 20 L 45 30" />

                    {/* Trait vertical central */}
                    <path d="M 30 16 L 30 32" />

                    {/* Partie basse - 王 simplifié */}
                    {/* Trait horizontal milieu */}
                    <path d="M 16 36 L 44 36" />

                    {/* Trait vertical bas */}
                    <path d="M 30 36 L 30 48" />

                    {/* Points/traits latéraux bas (丷) */}
                    <path d="M 20 42 L 24 46" />
                    <path d="M 40 42 L 36 46" />

                    {/* Trait horizontal bas */}
                    <path d="M 18 52 L 42 52" />
                </g>
            </svg>
        </motion.div>
    );
}

export default function About() {
    return (
        <section id="about" className="max-w-6xl mx-auto px-4 py-20">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-display text-4xl md:text-5xl font-bold mb-16 text-center text-ink"
            >
                À propos
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Parcours - avec sceau chinois */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-white border-2 border-gold/40 rounded-lg p-8 hover:border-vermillon hover:shadow-2xl hover:shadow-vermillon/20 transition-all duration-300"
                >
                    <h3 className="font-display text-2xl font-bold text-vermillon mb-5">Parcours</h3>
                    <div className="space-y-4 text-sm text-ink/80 leading-relaxed font-medium">
                        <p>
                            <strong className="text-ink font-bold">Développeur full-stack en reconversion</strong>, actuellement en formation intensive sur les technologies web modernes.
                        </p>
                        <p>
                            Curieux et à la recherche d&apos;une voie différente j&apos;ai tenté ma chance dans l&apos;univers du développement en commençant par le web.
                        </p>
                        <p>
                            Mes projets récents (Miyazaki-Garden, COS Strasbourg, application RH) illustrent ma capacité à concevoir et déployer des solutions complètes, du design à la base de données.
                        </p>
                    </div>

                    {/* Sceau chinois signature */}
                    <ChineseSeal />
                </motion.div>

                {/* Compétences */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white border-2 border-gold/40 rounded-lg p-8 hover:border-vermillon hover:shadow-2xl hover:shadow-vermillon/20 transition-all duration-300"
                >
                    <h3 className="font-display text-2xl font-bold text-vermillon mb-5">Compétences</h3>
                    <div className="space-y-5">
                        {skills.map((skillGroup) => (
                            <div key={skillGroup.category}>
                                <p className="text-xs uppercase tracking-wider text-gold-dark mb-2 font-bold">
                                    {skillGroup.category}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items.map((skill) => {
                                        const Icon = techIcons[skill];
                                        return (
                                            <span
                                                key={skill}
                                                className="text-xs bg-gold text-white px-3 py-1.5 rounded-full font-semibold shadow-sm flex items-center gap-1.5"
                                            >
                                                {Icon && <Icon className="text-sm" />}
                                                {skill}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Objectifs */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border-2 border-gold/40 rounded-lg p-8 hover:border-vermillon hover:shadow-2xl hover:shadow-vermillon/20 transition-all duration-300"
            >
                <h3 className="font-display text-2xl font-bold text-vermillon mb-5">Objectifs actuels</h3>
                <div className="space-y-4 text-sm text-ink/80 leading-relaxed font-medium">
                    <p>
                        Approfondir <strong className="text-ink font-bold">Next.js, Prisma, Docker</strong>, l&apos;architecture modulaire, les tests et la gestion d&apos;erreurs.
                        Mon approche : structurer des projets de zéro avec une organisation de code claire, une UX soignée avec feedback visuel, et l&apos;automatisation des tâches (scripts, seeds, CI/CD).
                    </p>
                    <p className="flex items-start gap-3 pt-2 border-t border-gold/20">
                        <span className="text-2xl"></span>
                        <span>
                            <strong className="text-ink font-bold">Recherche actuellement :</strong> Stage ou alternance en développement full-stack pour contribuer à des projets concrets en équipe.
                        </span>
                    </p>
                </div>
            </motion.div>
        </section>
    );
}