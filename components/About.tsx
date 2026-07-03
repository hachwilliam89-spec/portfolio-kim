'use client';

import { motion } from 'framer-motion';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiNodedotjs, SiNestjs, SiPrisma, SiPhp, SiPostgresql, SiMysql, SiDocker, SiGit, SiGitlab, SiSpring, SiMariadb } from 'react-icons/si';
import SectionTitle from './SectionTitle';
import { useLanguage, fr, en } from '@/lib/i18n';

const techIcons: { [key: string]: any } = {
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'TypeScript': SiTypescript,
    'Tailwind CSS': SiTailwindcss,
    'Framer Motion': SiFramer,
    'Node.js': SiNodedotjs,
    'NestJS': SiNestjs,
    'Spring Boot': SiSpring,
    'API REST': null,
    'Prisma': SiPrisma,
    'Drizzle ORM': null,
    'Zod': null,
    'PHP': SiPhp,
    'PostgreSQL': SiPostgresql,
    'MariaDB': SiMariadb,
    'MySQL': SiMysql,
    'Docker': SiDocker,
    'Git': SiGit,
    'GitLab': SiGitlab,
    'Scrum': null,
    'OpenAI / Anthropic': null,
    'n8n': null,
    'Vitest': null,
};

const skillKeys = [
    { key: 'frontend' as const, items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { key: 'backend' as const, items: ['NestJS', 'Spring Boot', 'Node.js', 'API REST', 'Prisma', 'Drizzle ORM', 'Zod', 'PHP'] },
    { key: 'database' as const, items: ['PostgreSQL', 'MariaDB', 'MySQL'] },
    { key: 'ai' as const, items: ['OpenAI / Anthropic', 'n8n'] },
    { key: 'devops' as const, items: ['Docker', 'Git', 'GitLab', 'Vitest', 'Scrum'] },
];

function ChineseSeal() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
            className="absolute -bottom-3 -right-3 md:bottom-4 md:right-4"
            title="金 - Kim"
            aria-hidden="true"
        >
            <svg className="w-14 h-14 md:w-16 md:h-16" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M 4 3 L 55 4 Q 57 4, 57 6 L 56 54 Q 56 56, 54 56 L 5 55 Q 3 55, 3 53 L 4 5 Q 4 3, 6 3 Z"
                    fill="#c73e1d"
                    opacity="0.9"
                />
                <path
                    d="M 8 8 L 10 7 M 50 10 L 52 8 M 7 50 L 9 52 M 48 51 L 51 50"
                    stroke="#a33318"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.5"
                />
                <g fill="none" stroke="#faf9f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 18 16 L 42 16" />
                    <path d="M 22 20 L 15 30" />
                    <path d="M 38 20 L 45 30" />
                    <path d="M 30 16 L 30 32" />
                    <path d="M 16 36 L 44 36" />
                    <path d="M 30 36 L 30 48" />
                    <path d="M 20 42 L 24 46" />
                    <path d="M 40 42 L 36 46" />
                    <path d="M 18 52 L 42 52" />
                </g>
            </svg>
        </motion.div>
    );
}

export default function About() {
    const { lang } = useLanguage();
    const t = lang === 'fr' ? fr : en;

    return (
        <section id="about" className="max-w-6xl mx-auto px-4 py-20">
            <SectionTitle>{t.about.title}</SectionTitle>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Parcours */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-white border-2 border-gold/40 rounded-lg p-8 hover:border-vermillon hover:shadow-2xl hover:shadow-vermillon/20 transition-all duration-300"
                >
                    <h3 className="font-display text-2xl font-bold text-vermillon mb-5">{t.about.background}</h3>
                    <div className="space-y-4 text-sm text-ink leading-relaxed font-medium">
                        <p dangerouslySetInnerHTML={{ __html: t.about.p1.replace(/<strong>/g, '<strong class="text-ink font-bold">') }} />
                        <p dangerouslySetInnerHTML={{ __html: t.about.p2.replace(/<strong>/g, '<strong class="text-ink font-bold">') }} />
                        <p dangerouslySetInnerHTML={{ __html: t.about.p3.replace(/<strong>/g, '<strong class="text-ink font-bold">') }} />
                    </div>
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
                    <h3 className="font-display text-2xl font-bold text-vermillon mb-5">{t.about.skills}</h3>
                    <div className="space-y-5">
                        {skillKeys.map((skillGroup) => (
                            <div key={skillGroup.key}>
                                <p className="text-xs uppercase tracking-wider text-ink/90 mb-2 font-bold">
                                    {t.about.categories[skillGroup.key]}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items.map((skill: string) => {
                                        const Icon = techIcons[skill];
                                        return (
                                            <span
                                                key={skill}
                                                className="text-xs bg-gold text-white px-3 py-1.5 rounded-full font-semibold shadow-sm flex items-center gap-1.5"
                                            >
                                                {Icon && <Icon className="text-sm" aria-hidden="true" />}
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
        </section>
    );
}