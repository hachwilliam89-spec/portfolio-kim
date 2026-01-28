'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
    {
        title: 'Miyazaki-Garden',
        description: 'Site vitrine pour un cabinet d\'ostéopathie avec système de réservation en ligne, gestion des rendez-vous et interface patient/praticien.',
        tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
        gitlab: 'https://git.uha4point0.fr/UHA40/osteopathe',
        demo: '#',
        image: '/images/miyazaki-garden.jpg',
    },
    {
        title: 'COS Strasbourg',
        description: 'Application RH complète pour la gestion des employés, congés, absences avec dashboard administrateur et système de notifications.',
        tech: ['Next.js', 'Prisma', 'Docker', 'Tailwind CSS'],
        gitlab: 'https://git.uha4point0.fr/UHA40/fil-rouge-2024/4.0.1/fil_rouge_kim',
        demo: '#',
        image: '/images/cos-strasbourg.jpg',
    },
    {
        title: 'Evaluation RH',
        description: 'Système d\'évaluation des ressources humaines avec gestion des compétences, entretiens annuels et suivi des performances.',
        tech: ['React', 'Node.js', 'API REST', 'MySQL'],
        gitlab: 'https://git.uha4point0.fr/UHA40/evaluation-rh',
        demo: '#',
        image: '/images/evaluation-rh.jpg',
    },
];

export default function Projects() {
    return (
        <section id="projects" className="max-w-6xl mx-auto px-4 py-20">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-display text-4xl md:text-5xl font-bold mb-16 text-center text-ink"
            >
                Projets
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white border-2 border-gold/40 rounded-lg overflow-hidden hover:border-vermillon hover:shadow-2xl hover:shadow-vermillon/20 transition-all duration-300 group"
                    >
                        <div className="relative h-48 w-full overflow-hidden bg-washi-dark">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="p-6">
                            <h3 className="font-display text-2xl font-bold mb-3 text-ink group-hover:text-vermillon transition-colors duration-300">
                                {project.title}
                            </h3>
                            <p className="text-ink/80 text-sm mb-5 leading-relaxed font-medium">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-5">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs bg-gold text-white px-3 py-1.5 rounded-full font-semibold shadow-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-2 border-t border-gold/20">
                                <a
                                    href={project.gitlab}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-ink hover:text-vermillon transition-colors duration-200 font-semibold"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
                                    </svg>
                                    GitLab
                                </a>
                                {project.demo !== '#' && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-ink hover:text-vermillon transition-colors duration-200 font-semibold"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Démo
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}