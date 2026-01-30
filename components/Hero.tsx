'use client';

import { motion } from 'framer-motion';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiFigma } from 'react-icons/si';
import { HiArrowDown } from 'react-icons/hi';

export default function Hero() {
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center px-4 overflow-hidden pt-20">
            {/* Calligraphie chinoise géante en arrière-plan */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <svg
                    className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.04]"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <filter id="ink-effect">
                            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="turbulence" />
                            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="2" xChannelSelector="R" yChannelSelector="G" />
                            <feGaussianBlur stdDeviation="0.8" />
                            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" />
                        </filter>
                    </defs>

                    {/* 金 (Jin/Kim) - Simplifié pour animation */}
                    <g filter="url(#ink-effect)">
                        {/* Trait horizontal haut */}
                        <motion.path
                            d="M 60 40 L 140 40"
                            stroke="#1a1a1a"
                            strokeWidth="4"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2, ease: 'easeInOut' }}
                        />

                        {/* Trait vertical central */}
                        <motion.path
                            d="M 100 35 L 100 90"
                            stroke="#1a1a1a"
                            strokeWidth="5"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6, ease: 'easeInOut' }}
                        />

                        {/* Trait diagonal gauche */}
                        <motion.path
                            d="M 80 55 L 60 75"
                            stroke="#1a1a1a"
                            strokeWidth="4"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 1.1, ease: 'easeInOut' }}
                        />

                        {/* Trait diagonal droit */}
                        <motion.path
                            d="M 120 55 L 140 75"
                            stroke="#1a1a1a"
                            strokeWidth="4"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 1.4, ease: 'easeInOut' }}
                        />

                        {/* Base en forme de triangle */}
                        <motion.path
                            d="M 70 85 L 100 110 L 130 85"
                            stroke="#1a1a1a"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.7, ease: 'easeInOut' }}
                        />


                        {/* Partie haute */}
                        <motion.path
                            d="M 60 130 L 140 130"
                            stroke="#1a1a1a"
                            strokeWidth="4"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 2.3, ease: 'easeInOut' }}
                        />

                        {/* Cr stylisé */}
                        <motion.path
                            d="M 100 135 L 100 165 M 80 145 Q 100 155, 100 165 M 120 145 Q 100 155, 100 165"
                            stroke="#1a1a1a"
                            strokeWidth="4"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 2.7, ease: 'easeInOut' }}
                        />

                        {/* Base */}
                        <motion.path
                            d="M 70 170 L 130 170"
                            stroke="#1a1a1a"
                            strokeWidth="5"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 3.5, ease: 'easeInOut' }}
                        />
                    </g>
                </svg>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
                className="relative z-10 text-center space-y-8 max-w-4xl"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                    </span>
                    <span className="text-xs uppercase tracking-[0.3em] text-cyan-600 font-medium">
                        Développeur full-stack en reconversion
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2 }}
                    className="space-y-4"
                >
                    <h1 className="font-serif text-6xl md:text-8xl text-ink leading-none">
                        {'Kim HACH'.split('').map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: 2 + i * 0.08,
                                    ease: 'easeOut'
                                }}
                                className="inline-block"
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Caractères chinois avec animation calligraphique */}
                    <div className="relative inline-block">
                        <motion.p
                            className="font-serif text-2xl md:text-3xl text-ink-light tracking-wide"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 4 }}
                        >
                            金恩
                        </motion.p>

                        {/* Trait de pinceau sous les caractères */}
                        <svg
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4"
                            viewBox="0 0 100 10"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <motion.path
                                d="M 5 5 Q 50 2, 95 5"
                                stroke="#06b6d4"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.6 }}
                                transition={{
                                    pathLength: { duration: 1, ease: 'easeInOut', delay: 4.5 },
                                    opacity: { duration: 0.5, delay: 4.5 }
                                }}
                            />
                        </svg>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 4.8 }}
                    className="text-ink-light max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
                >
                    Je suis étudiant en <span className="text-cyan-500 font-medium">développement full stack</span>.
                    <br />
                    Bienvenue sur mon <span className="text-cyan-500 font-medium">portfolio</span>.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 5 }}
                    className="text-sm text-ink-light/70"
                >
                    Miyazaki-Garden • COS Strasbourg • Applications RH
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 5.2 }}
                    className="flex flex-wrap gap-3 justify-center pt-8"
                >
                    {[
                        { name: 'React', icon: SiReact },
                        { name: 'Next.js', icon: SiNextdotjs },
                        { name: 'Node.js', icon: SiNodedotjs },
                        { name: 'TypeScript', icon: SiTypescript },
                        { name: 'UX Design', icon: SiFigma }
                    ].map((tech, i) => {
                        const Icon = tech.icon;
                        return (
                            <motion.span
                                key={tech.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 5.3 + i * 0.1 }}
                                className="group px-4 py-2 bg-ink/5 hover:bg-cyan-50 border border-ink/10 hover:border-cyan-400 rounded-full text-sm text-ink-light hover:text-cyan-600 transition-all duration-300 flex items-center gap-2"
                            >
                                <Icon className="text-base group-hover:scale-110 transition-transform" />
                                {tech.name}
                            </motion.span>
                        );
                    })}
                </motion.div>
            </motion.div>

            <motion.button
                onClick={scrollToProjects}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 5.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-light/60 hover:text-cyan-500 transition-colors duration-300 group cursor-pointer"
                aria-label="Défiler vers les projets"
            >
                <span className="text-xs uppercase tracking-wider font-medium">Découvrir</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                    <HiArrowDown className="w-6 h-6 group-hover:text-cyan-500" />
                </motion.div>
            </motion.button>
        </section>
    );
}