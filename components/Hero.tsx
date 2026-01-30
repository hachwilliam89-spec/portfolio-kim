'use client';

import { motion, Variants } from 'framer-motion';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiFigma } from 'react-icons/si';
import { HiArrowDown } from 'react-icons/hi';

export default function Hero() {
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Animation tracé bambou
    const drawLine: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (delay: number) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: {
                    duration: 1.2,
                    delay: delay,
                    ease: [0.65, 0, 0.35, 1]
                },
                opacity: { duration: 0.3, delay: delay }
            }
        })
    };

    // Animation feuilles
    const drawLeaf: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (delay: number) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: {
                    duration: 0.4,
                    delay: delay,
                    ease: [0.65, 0, 0.35, 1]
                },
                opacity: { duration: 0.2, delay: delay }
            }
        })
    };

    // Animation montagnes - tracé lent et majestueux
    const drawMountain: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (delay: number) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: {
                    duration: 2,
                    delay: delay,
                    ease: [0.45, 0, 0.55, 1]
                },
                opacity: { duration: 0.5, delay: delay }
            }
        })
    };

    // Animation oiseaux - apparition douce
    const drawBird: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (delay: number) => ({
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: {
                    duration: 0.3,
                    delay: delay,
                    ease: 'easeOut'
                },
                opacity: { duration: 0.2, delay: delay }
            }
        })
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center px-4 overflow-hidden pt-20">

            {/* ============================================
                BAMBOU - Côté gauche (premier plan)
                Opacité harmonisée à 7%
                ============================================ */}
            <div className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.07]">
                <svg
                    className="w-[120px] h-[500px] md:w-[150px] md:h-[600px] lg:w-[180px] lg:h-[700px]"
                    viewBox="0 0 100 400"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g stroke="#1a1a1a" fill="none" strokeLinecap="round" strokeLinejoin="round">

                        {/* Tige principale */}
                        <motion.path d="M 30 400 L 30 320" strokeWidth="6" variants={drawLine} initial="hidden" animate="visible" custom={0} />
                        <motion.path d="M 25 320 L 35 320" strokeWidth="4" variants={drawLine} initial="hidden" animate="visible" custom={0.3} />
                        <motion.path d="M 30 320 L 30 240" strokeWidth="6" variants={drawLine} initial="hidden" animate="visible" custom={0.4} />
                        <motion.path d="M 25 240 L 35 240" strokeWidth="4" variants={drawLine} initial="hidden" animate="visible" custom={0.7} />
                        <motion.path d="M 30 240 L 30 160" strokeWidth="5" variants={drawLine} initial="hidden" animate="visible" custom={0.8} />
                        <motion.path d="M 26 160 L 34 160" strokeWidth="4" variants={drawLine} initial="hidden" animate="visible" custom={1.1} />
                        <motion.path d="M 30 160 L 30 80" strokeWidth="4" variants={drawLine} initial="hidden" animate="visible" custom={1.2} />
                        <motion.path d="M 27 80 L 33 80" strokeWidth="3" variants={drawLine} initial="hidden" animate="visible" custom={1.5} />
                        <motion.path d="M 30 80 L 30 20" strokeWidth="3" variants={drawLine} initial="hidden" animate="visible" custom={1.6} />

                        {/* Feuilles */}
                        <motion.path d="M 30 310 Q 50 300, 70 310" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={1.8} />
                        <motion.path d="M 30 315 Q 55 320, 75 330" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={1.85} />
                        <motion.path d="M 30 235 Q 10 225, -5 235" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={1.9} />
                        <motion.path d="M 30 245 Q 5 250, -10 260" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={1.95} />
                        <motion.path d="M 30 155 Q 55 145, 80 150" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.0} />
                        <motion.path d="M 30 160 Q 50 165, 70 175" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.05} />
                        <motion.path d="M 30 165 Q 55 175, 75 190" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.1} />
                        <motion.path d="M 30 75 Q 10 65, -5 70" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.15} />
                        <motion.path d="M 30 80 Q 5 85, -15 95" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.2} />
                        <motion.path d="M 30 25 Q 45 15, 60 20" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.25} />
                        <motion.path d="M 30 20 Q 40 5, 55 0" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.3} />

                        {/* Tige secondaire */}
                        <motion.path d="M 60 400 L 60 340" strokeWidth="5" variants={drawLine} initial="hidden" animate="visible" custom={0.2} />
                        <motion.path d="M 56 340 L 64 340" strokeWidth="3" variants={drawLine} initial="hidden" animate="visible" custom={0.5} />
                        <motion.path d="M 60 340 L 60 280" strokeWidth="4" variants={drawLine} initial="hidden" animate="visible" custom={0.6} />
                        <motion.path d="M 57 280 L 63 280" strokeWidth="3" variants={drawLine} initial="hidden" animate="visible" custom={0.9} />
                        <motion.path d="M 60 280 L 60 220" strokeWidth="3" variants={drawLine} initial="hidden" animate="visible" custom={1.0} />
                        <motion.path d="M 58 220 L 62 220" strokeWidth="2" variants={drawLine} initial="hidden" animate="visible" custom={1.3} />
                        <motion.path d="M 60 220 L 60 170" strokeWidth="2" variants={drawLine} initial="hidden" animate="visible" custom={1.4} />

                        {/* Feuilles tige secondaire */}
                        <motion.path d="M 60 335 Q 80 325, 95 330" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.35} />
                        <motion.path d="M 60 275 Q 40 265, 25 270" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.4} />
                        <motion.path d="M 60 215 Q 80 205, 95 210" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.45} />
                        <motion.path d="M 60 175 Q 75 165, 90 170" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.5} />
                        <motion.path d="M 60 170 Q 70 155, 80 150" strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.55} />

                    </g>
                </svg>
            </div>

            {/* ============================================
                MONTAGNES + OISEAUX - Côté droit
                - Montagnes plus basses et ancrées
                - Traits plus épais
                - Oiseaux dispersés naturellement
                - Opacité harmonisée à 7%
                ============================================ */}
            <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.07]">
                <svg
                    className="w-[350px] h-[450px] md:w-[450px] md:h-[550px] lg:w-[550px] lg:h-[650px]"
                    viewBox="0 0 320 400"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g stroke="#1a1a1a" fill="none" strokeLinecap="round" strokeLinejoin="round">

                        {/* === MONTAGNES - Plus basses, ancrées, traits plus épais === */}

                        {/* Montagne lointaine (fond) */}
                        <motion.path
                            d="M 20 320
                               Q 50 280, 80 300
                               Q 120 250, 160 220
                               Q 180 200, 200 220
                               Q 240 260, 280 240
                               Q 300 225, 320 260"
                            strokeWidth="2.5"
                            variants={drawMountain}
                            initial="hidden"
                            animate="visible"
                            custom={0.5}
                        />

                        {/* Montagne milieu */}
                        <motion.path
                            d="M 60 350
                               Q 100 310, 140 325
                               Q 180 290, 220 260
                               Q 250 240, 275 260
                               Q 300 285, 320 275"
                            strokeWidth="3.5"
                            variants={drawMountain}
                            initial="hidden"
                            animate="visible"
                            custom={1.0}
                        />

                        {/* Montagne proche (premier plan) - plus épaisse */}
                        <motion.path
                            d="M 120 380
                               Q 160 345, 200 358
                               Q 240 330, 270 310
                               Q 295 295, 310 308
                               Q 318 318, 320 330"
                            strokeWidth="5"
                            variants={drawMountain}
                            initial="hidden"
                            animate="visible"
                            custom={1.5}
                        />

                        {/* Montagne très proche (ancrage bas) */}
                        <motion.path
                            d="M 200 400
                               Q 230 375, 260 382
                               Q 285 365, 305 355
                               Q 315 350, 320 360"
                            strokeWidth="6"
                            variants={drawMountain}
                            initial="hidden"
                            animate="visible"
                            custom={1.8}
                        />

                        {/* === OISEAUX - Dispersés naturellement, tailles variées === */}

                        {/* Oiseau solitaire haut gauche - grand */}
                        <motion.path
                            d="M 45 80 Q 52 72, 59 80 Q 66 72, 73 80"
                            strokeWidth="2"
                            variants={drawBird}
                            initial="hidden"
                            animate="visible"
                            custom={2.5}
                        />

                        {/* Petit groupe dispersé - milieu haut */}
                        <motion.path
                            d="M 130 55 Q 135 50, 140 55 Q 145 50, 150 55"
                            strokeWidth="1.8"
                            variants={drawBird}
                            initial="hidden"
                            animate="visible"
                            custom={2.65}
                        />
                        <motion.path
                            d="M 105 95 Q 109 91, 113 95 Q 117 91, 121 95"
                            strokeWidth="1.5"
                            variants={drawBird}
                            initial="hidden"
                            animate="visible"
                            custom={2.8}
                        />

                        {/* Oiseaux lointains (petits) - droite */}
                        <motion.path
                            d="M 220 70 Q 223 67, 226 70 Q 229 67, 232 70"
                            strokeWidth="1.2"
                            variants={drawBird}
                            initial="hidden"
                            animate="visible"
                            custom={2.9}
                        />
                        <motion.path
                            d="M 250 95 Q 252 93, 254 95 Q 256 93, 258 95"
                            strokeWidth="1"
                            variants={drawBird}
                            initial="hidden"
                            animate="visible"
                            custom={3.0}
                        />
                        <motion.path
                            d="M 195 110 Q 198 107, 201 110 Q 204 107, 207 110"
                            strokeWidth="1.2"
                            variants={drawBird}
                            initial="hidden"
                            animate="visible"
                            custom={3.1}
                        />

                        {/* Oiseau isolé bas - taille moyenne */}
                        <motion.path
                            d="M 280 140 Q 285 134, 290 140 Q 295 134, 300 140"
                            strokeWidth="1.5"
                            variants={drawBird}
                            initial="hidden"
                            animate="visible"
                            custom={3.2}
                        />

                    </g>
                </svg>
            </div>

            {/* ============================================
                CONTENU PRINCIPAL - Centré
                ============================================ */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                className="relative z-10 text-center space-y-8 max-w-4xl"
            >
                {/* Badge status */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-vermillon/10 border border-vermillon/30 rounded-full"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermillon opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-vermillon"></span>
                    </span>
                    <span className="text-xs uppercase tracking-[0.3em] text-vermillon font-medium">
                        Développeur full-stack en formation
                    </span>
                </motion.div>

                {/* Nom avec animation lettre par lettre */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="space-y-4"
                >
                    <h1 className="font-display text-6xl md:text-8xl text-ink leading-none tracking-tight">
                        {'Kim HACH'.split('').map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 1.5 + i * 0.08,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                className="inline-block"
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Nom chinois avec font calligraphique */}
                    <div className="relative inline-block">
                        <motion.p
                            className="font-chinese text-3xl md:text-4xl text-ink/70 tracking-[0.2em]"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 2.5 }}
                        >
                            金恩
                        </motion.p>

                        {/* Trait de pinceau vermillon sous le nom */}
                        <svg
                            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-4"
                            viewBox="0 0 120 12"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <motion.path
                                d="M 5 6 Q 30 3, 60 6 Q 90 9, 115 6"
                                stroke="#c73e1d"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.7 }}
                                transition={{
                                    pathLength: { duration: 0.8, ease: 'easeOut', delay: 3 },
                                    opacity: { duration: 0.3, delay: 3 }
                                }}
                            />
                        </svg>
                    </div>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 3.2 }}
                    className="text-ink/70 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
                >
                    Étudiant en <span className="text-vermillon font-medium">Licence Pro Développement Full Stack</span>.
                    <br />
                    Bienvenue sur mon <span className="text-gold font-medium">portfolio</span>.
                </motion.p>

                {/* Projets mentionnés */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 3.5 }}
                    className="text-sm text-ink/50 tracking-wide"
                >
                    Miyazaki-Garden • COS Strasbourg • Application RH
                </motion.p>

                {/* Tech badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 3.8 }}
                    className="flex flex-wrap gap-3 justify-center pt-6"
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
                                transition={{ duration: 0.4, delay: 3.9 + i * 0.1 }}
                                className="group px-4 py-2 bg-ink/5 hover:bg-gold/10 border border-ink/10 hover:border-gold/40 rounded-full text-sm text-ink/70 hover:text-ink transition-all duration-300 flex items-center gap-2"
                            >
                                <Icon className="text-base group-hover:text-vermillon transition-colors" />
                                {tech.name}
                            </motion.span>
                        );
                    })}
                </motion.div>
            </motion.div>

            {/* Bouton scroll */}
            <motion.button
                onClick={scrollToProjects}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 4.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink/40 hover:text-vermillon transition-colors duration-300 group cursor-pointer z-10"
                aria-label="Défiler vers les projets"
            >
                <span className="text-xs uppercase tracking-wider font-medium">Découvrir</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <HiArrowDown className="w-6 h-6" />
                </motion.div>
            </motion.button>
        </section>
    );
}