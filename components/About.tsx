'use client';

import { motion } from 'framer-motion';

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
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
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
                    className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-sky-400/50 transition-all"
                >
                    <h3 className="text-xl font-semibold text-sky-400 mb-4">Parcours</h3>
                    <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                        <p>
                            <strong className="text-slate-100">Développeur full-stack en reconversion</strong>, actuellement en formation intensive sur les technologies web modernes.
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
                    className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-sky-400/50 transition-all"
                >
                    <h3 className="text-xl font-semibold text-sky-400 mb-4">Compétences</h3>
                    <div className="space-y-4">
                        {skills.map((skillGroup) => (
                            <div key={skillGroup.category}>
                                <p className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-semibold">
                                    {skillGroup.category}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="text-xs bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full border border-slate-600/50"
                                        >
                                            {skill}
                                        </span>
                                    ))}
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
                className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-sky-400/50 transition-all"
            >
                <h3 className="text-xl font-semibold text-sky-400 mb-4">Objectifs actuels</h3>
                <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                    <p>
                        Approfondir <strong className="text-slate-100">Next.js, Prisma, Docker</strong>, l'architecture modulaire, les tests et la gestion d'erreurs.
                        Mon approche : structurer des projets de zéro avec une organisation de code claire, une UX soignée avec feedback visuel, et l'automatisation des tâches (scripts, seeds, CI/CD).
                    </p>
                    <p className="flex items-center gap-2">
                        <span className="text-lg"></span>
                        <strong className="text-slate-100">Recherche actuellement :</strong> Stage ou alternance en développement full-stack pour contribuer à des projets concrets en équipe.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}