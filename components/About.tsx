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
                {/* Parcours */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white border-2 border-gold/40 rounded-lg p-8 hover:border-vermillon hover:shadow-2xl hover:shadow-vermillon/20 transition-all duration-300"
                >
                    <h3 className="font-display text-2xl font-bold text-vermillon mb-5">Parcours</h3>
                    <div className="space-y-4 text-sm text-ink/80 leading-relaxed font-medium">
                        <p>
                            <strong className="text-ink font-bold">Développeur full-stack en reconversion</strong>, actuellement en formation intensive sur les technologies web modernes.
                        </p>
                        <p>
                            Curieux et à la recherche d'une voie différente j'ai tenté ma chance dans l'univers du développement en commençant par le web.
                        </p>
                        <p>
                            Mes projets récents (Miyazaki-Garden, COS Strasbourg, application RH) illustrent ma capacité à concevoir et déployer des solutions complètes, du design à la base de données.
                        </p>
                    </div>
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
                        Approfondir <strong className="text-ink font-bold">Next.js, Prisma, Docker</strong>, l'architecture modulaire, les tests et la gestion d'erreurs.
                        Mon approche : structurer des projets de zéro avec une organisation de code claire, une UX soignée avec feedback visuel, et l'automatisation des tâches (scripts, seeds, CI/CD).
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