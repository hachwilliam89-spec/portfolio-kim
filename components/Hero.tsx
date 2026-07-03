'use client';

import { motion, Variants, useReducedMotion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiSpring, SiDocker } from 'react-icons/si';
import { HiArrowDown } from 'react-icons/hi';
import { useLanguage, fr, en } from '@/lib/i18n';

// ── Feuille qui tombe ────────────────────────────────────────────────────────
function FallingLeaf({ delay, startX, startY, duration }: {
    delay: number; startX: number; startY: number; duration: number;
}) {
    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{ left: startX, top: startY }}
            animate={{
                y: [0, 500],
                x: [0, 14, -8, 18, -6, 4, 0],
                rotate: [0, 80, 200, 310, 400],
                opacity: [0, 1, 1, 0.7, 0],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatDelay: delay % 4 + 3,
                ease: 'linear',
                times: [0, 0.15, 0.5, 0.85, 1],
            }}
        >
            <svg width="9" height="13" viewBox="0 0 9 13" fill="none">
                <ellipse cx="4.5" cy="6.5" rx="3.2" ry="5.8" fill="#1a1a1a" />
                <line x1="4.5" y1="1" x2="4.5" y2="12" stroke="#faf9f6" strokeWidth="0.6" />
            </svg>
        </motion.div>
    );
}

// ── Oiseau volant ────────────────────────────────────────────────────────────
function FlyingBird({ top, delay, duration, scale = 1 }: {
    top: string; delay: number; duration: number; scale?: number;
}) {
    return (
        <motion.div
            className="absolute pointer-events-none opacity-[0.08]"
            style={{ top, right: -30 }}
            animate={{ x: [0, '-115vw'] }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatDelay: duration * 0.5 + delay % 5,
                ease: 'linear',
            }}
        >
            <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 0.65, repeat: Infinity, ease: 'easeInOut' }}
            >
                <svg
                    width={22 * scale} height={10 * scale}
                    viewBox="0 0 22 10" fill="none"
                    stroke="#1a1a1a" strokeWidth={1.4} strokeLinecap="round"
                >
                    <path d="M 0 5 Q 5.5 0, 11 5 Q 16.5 0, 22 5" />
                </svg>
            </motion.div>
        </motion.div>
    );
}

// ── Feuilles config ──────────────────────────────────────────────────────────
const LEAVES = [
    { delay: 2.5, startX: 26, startY: 40,  duration: 5.2 },
    { delay: 5.0, startX: 44, startY: 110, duration: 4.6 },
    { delay: 8.5, startX: 33, startY: 200, duration: 5.8 },
    { delay: 1.0, startX: 58, startY: 80,  duration: 4.3 },
    { delay: 11,  startX: 20, startY: 160, duration: 5.5 },
    { delay: 6.5, startX: 50, startY: 300, duration: 4.9 },
    { delay: 14,  startX: 38, startY: 240, duration: 5.1 },
    { delay: 3.5, startX: 65, startY: 130, duration: 4.7 },
];

export default function Hero() {
    const { lang } = useLanguage();
    const t = lang === 'fr' ? fr : en;
    const reduce = useReducedMotion();

    // ── Mouse parallax ───────────────────────────────────────────────────────
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const springCfg = { stiffness: 50, damping: 18 };
    const mx = useSpring(rawX, springCfg);
    const my = useSpring(rawY, springCfg);

    // 4 calques, vitesses croissantes (lointain → proche)
    const m1x = useTransform(mx, [-0.5, 0.5], [-3,  3]);
    const m1y = useTransform(my, [-0.5, 0.5], [-1.5, 1.5]);
    const m2x = useTransform(mx, [-0.5, 0.5], [-7,  7]);
    const m2y = useTransform(my, [-0.5, 0.5], [-3,  3]);
    const m3x = useTransform(mx, [-0.5, 0.5], [-12, 12]);
    const m3y = useTransform(my, [-0.5, 0.5], [-5,  5]);
    const m4x = useTransform(mx, [-0.5, 0.5], [-18, 18]);
    const m4y = useTransform(my, [-0.5, 0.5], [-8,  8]);
    const bx  = useTransform(mx, [-0.5, 0.5], [-5,  5]);
    const by  = useTransform(my, [-0.5, 0.5], [-3,  3]);
    // Bambou en sens inverse (effet de profondeur)
    const bambouX = useTransform(mx, [-0.5, 0.5], [6, -6]);
    const bambouY = useTransform(my, [-0.5, 0.5], [3, -3]);

    useEffect(() => {
        if (reduce) return;
        const handle = (e: MouseEvent) => {
            rawX.set(e.clientX / window.innerWidth - 0.5);
            rawY.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener('mousemove', handle, { passive: true });
        return () => window.removeEventListener('mousemove', handle);
    }, [reduce, rawX, rawY]);

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    // ── Draw variants ────────────────────────────────────────────────────────
    const drawLine: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (d: number) => ({
            pathLength: 1, opacity: 1,
            transition: { pathLength: { duration: 1.2, delay: d, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.3, delay: d } }
        })
    };
    const drawLeaf: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (d: number) => ({
            pathLength: 1, opacity: 1,
            transition: { pathLength: { duration: 0.4, delay: d, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.2, delay: d } }
        })
    };
    const drawMountain: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (d: number) => ({
            pathLength: 1, opacity: 1,
            transition: { pathLength: { duration: 2, delay: d, ease: [0.45, 0, 0.55, 1] }, opacity: { duration: 0.5, delay: d } }
        })
    };
    const drawBird: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (d: number) => ({
            pathLength: 1, opacity: 1,
            transition: { pathLength: { duration: 0.3, delay: d, ease: 'easeOut' }, opacity: { duration: 0.2, delay: d } }
        })
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center px-4 overflow-hidden pt-20">

            {/* ── BAMBOU + FEUILLES QUI TOMBENT ── */}
            <motion.div
                className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.07]"
                style={reduce ? {} : { x: bambouX, y: bambouY }}
            >
                <svg
                    className="w-[120px] h-[500px] md:w-[150px] md:h-[600px] lg:w-[180px] lg:h-[700px]"
                    viewBox="0 0 100 400"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g stroke="#1a1a1a" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path d="M 30 400 L 30 320" strokeWidth="6" variants={drawLine} initial="hidden" animate="visible" custom={0} />
                        <motion.path d="M 25 320 L 35 320" strokeWidth="4" variants={drawLine} initial="hidden" animate="visible" custom={0.3} />
                        <motion.path d="M 30 320 L 30 240" strokeWidth="6" variants={drawLine} initial="hidden" animate="visible" custom={0.4} />
                        <motion.path d="M 25 240 L 35 240" strokeWidth="4" variants={drawLine} initial="hidden" animate="visible" custom={0.7} />
                        <motion.path d="M 30 240 L 30 160" strokeWidth="5" variants={drawLine} initial="hidden" animate="visible" custom={0.8} />
                        <motion.path d="M 26 160 L 34 160" strokeWidth="4" variants={drawLine} initial="hidden" animate="visible" custom={1.1} />
                        <motion.path d="M 30 160 L 30 80"  strokeWidth="4" variants={drawLine} initial="hidden" animate="visible" custom={1.2} />
                        <motion.path d="M 27 80 L 33 80"   strokeWidth="3" variants={drawLine} initial="hidden" animate="visible" custom={1.5} />
                        <motion.path d="M 30 80 L 30 20"   strokeWidth="3" variants={drawLine} initial="hidden" animate="visible" custom={1.6} />
                        <motion.path d="M 30 310 Q 50 300, 70 310"  strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={1.8} />
                        <motion.path d="M 30 315 Q 55 320, 75 330"  strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={1.85} />
                        <motion.path d="M 30 235 Q 10 225, -5 235"  strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={1.9} />
                        <motion.path d="M 30 245 Q 5 250, -10 260"  strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={1.95} />
                        <motion.path d="M 30 155 Q 55 145, 80 150"  strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.0} />
                        <motion.path d="M 30 160 Q 50 165, 70 175"  strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.05} />
                        <motion.path d="M 30 165 Q 55 175, 75 190"  strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.1} />
                        <motion.path d="M 30 75 Q 10 65, -5 70"     strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.15} />
                        <motion.path d="M 30 80 Q 5 85, -15 95"     strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.2} />
                        <motion.path d="M 30 25 Q 45 15, 60 20"     strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.25} />
                        <motion.path d="M 30 20 Q 40 5, 55 0"       strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.3} />
                        <motion.path d="M 60 400 L 60 340" strokeWidth="5" variants={drawLine} initial="hidden" animate="visible" custom={0.2} />
                        <motion.path d="M 56 340 L 64 340" strokeWidth="3" variants={drawLine} initial="hidden" animate="visible" custom={0.5} />
                        <motion.path d="M 60 340 L 60 280" strokeWidth="4" variants={drawLine} initial="hidden" animate="visible" custom={0.6} />
                        <motion.path d="M 57 280 L 63 280" strokeWidth="3" variants={drawLine} initial="hidden" animate="visible" custom={0.9} />
                        <motion.path d="M 60 280 L 60 220" strokeWidth="3" variants={drawLine} initial="hidden" animate="visible" custom={1.0} />
                        <motion.path d="M 58 220 L 62 220" strokeWidth="2" variants={drawLine} initial="hidden" animate="visible" custom={1.3} />
                        <motion.path d="M 60 220 L 60 170" strokeWidth="2" variants={drawLine} initial="hidden" animate="visible" custom={1.4} />
                        <motion.path d="M 60 335 Q 80 325, 95 330"  strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.35} />
                        <motion.path d="M 60 275 Q 40 265, 25 270"  strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.4} />
                        <motion.path d="M 60 215 Q 80 205, 95 210"  strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.45} />
                        <motion.path d="M 60 175 Q 75 165, 90 170"  strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.5} />
                        <motion.path d="M 60 170 Q 70 155, 80 150"  strokeWidth="2" variants={drawLeaf} initial="hidden" animate="visible" custom={2.55} />
                    </g>
                </svg>

                {/* Feuilles qui tombent */}
                {!reduce && LEAVES.map((leaf, i) => (
                    <FallingLeaf key={i} {...leaf} />
                ))}
            </motion.div>

            {/* ── MONTAGNES en 4 calques parallax ── */}
            <div className="absolute right-0 bottom-0 pointer-events-none w-[350px] h-[450px] md:w-[450px] md:h-[550px] lg:w-[550px] lg:h-[650px]">

                {/* Calque 1 — le plus lointain */}
                <motion.div className="absolute inset-0 opacity-[0.04]" style={reduce ? {} : { x: m1x, y: m1y }}>
                    <svg className="w-full h-full" viewBox="0 0 320 400" fill="none" stroke="#1a1a1a" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path d="M 20 320 Q 50 280, 80 300 Q 120 250, 160 220 Q 180 200, 200 220 Q 240 260, 280 240 Q 300 225, 320 260" strokeWidth="2.5" variants={drawMountain} initial="hidden" animate="visible" custom={0.5} />
                    </svg>
                </motion.div>

                {/* Calque 2 */}
                <motion.div className="absolute inset-0 opacity-[0.055]" style={reduce ? {} : { x: m2x, y: m2y }}>
                    <svg className="w-full h-full" viewBox="0 0 320 400" fill="none" stroke="#1a1a1a" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path d="M 60 350 Q 100 310, 140 325 Q 180 290, 220 260 Q 250 240, 275 260 Q 300 285, 320 275" strokeWidth="3.5" variants={drawMountain} initial="hidden" animate="visible" custom={1.0} />
                    </svg>
                </motion.div>

                {/* Calque 3 */}
                <motion.div className="absolute inset-0 opacity-[0.065]" style={reduce ? {} : { x: m3x, y: m3y }}>
                    <svg className="w-full h-full" viewBox="0 0 320 400" fill="none" stroke="#1a1a1a" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path d="M 120 380 Q 160 345, 200 358 Q 240 330, 270 310 Q 295 295, 310 308 Q 318 318, 320 330" strokeWidth="5" variants={drawMountain} initial="hidden" animate="visible" custom={1.5} />
                    </svg>
                </motion.div>

                {/* Calque 4 — le plus proche */}
                <motion.div className="absolute inset-0 opacity-[0.08]" style={reduce ? {} : { x: m4x, y: m4y }}>
                    <svg className="w-full h-full" viewBox="0 0 320 400" fill="none" stroke="#1a1a1a" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path d="M 200 400 Q 230 375, 260 382 Q 285 365, 305 355 Q 315 350, 320 360" strokeWidth="6" variants={drawMountain} initial="hidden" animate="visible" custom={1.8} />
                    </svg>
                </motion.div>

                {/* Oiseaux statiques avec parallax léger */}
                <motion.div className="absolute inset-0 opacity-[0.06]" style={reduce ? {} : { x: bx, y: by }}>
                    <svg className="w-full h-full" viewBox="0 0 320 400" fill="none" stroke="#1a1a1a" strokeLinecap="round">
                        <motion.path d="M 45 80 Q 52 72, 59 80 Q 66 72, 73 80"       strokeWidth="2"   variants={drawBird} initial="hidden" animate="visible" custom={2.5} />
                        <motion.path d="M 130 55 Q 135 50, 140 55 Q 145 50, 150 55"  strokeWidth="1.8" variants={drawBird} initial="hidden" animate="visible" custom={2.65} />
                        <motion.path d="M 105 95 Q 109 91, 113 95 Q 117 91, 121 95"  strokeWidth="1.5" variants={drawBird} initial="hidden" animate="visible" custom={2.8} />
                        <motion.path d="M 220 70 Q 223 67, 226 70 Q 229 67, 232 70"  strokeWidth="1.2" variants={drawBird} initial="hidden" animate="visible" custom={2.9} />
                        <motion.path d="M 250 95 Q 252 93, 254 95 Q 256 93, 258 95"  strokeWidth="1"   variants={drawBird} initial="hidden" animate="visible" custom={3.0} />
                        <motion.path d="M 195 110 Q 198 107, 201 110 Q 204 107, 207 110" strokeWidth="1.2" variants={drawBird} initial="hidden" animate="visible" custom={3.1} />
                        <motion.path d="M 280 140 Q 285 134, 290 140 Q 295 134, 300 140" strokeWidth="1.5" variants={drawBird} initial="hidden" animate="visible" custom={3.2} />
                    </svg>
                </motion.div>
            </div>

            {/* ── OISEAUX QUI VOLENT ── */}
            {!reduce && (
                <>
                    <FlyingBird top="18%"  delay={5}   duration={22} scale={1.1} />
                    <FlyingBird top="25%"  delay={13}  duration={28} scale={0.8} />
                    <FlyingBird top="14%"  delay={20}  duration={18} scale={0.9} />
                </>
            )}

            {/* ── CONTENU PRINCIPAL ── */}
            <motion.div
                initial={reduce ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                className="relative z-10 text-center space-y-8 max-w-4xl"
            >
                {/* Badge status */}
                <motion.div
                    initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-vermillon/10 border border-vermillon/30 rounded-full"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermillon opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-vermillon"></span>
                    </span>
                    <span className="text-xs uppercase tracking-[0.3em] text-vermillon font-medium">
                        {t.hero.badge}
                    </span>
                </motion.div>

                {/* Nom */}
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="space-y-1"
                >
                    <h1 className="leading-none">
                        <div className="font-display text-2xl md:text-4xl text-ink/50 font-normal tracking-[0.15em] mb-1">
                            {reduce ? 'William Kim' : 'William Kim'.split('').map((char, i) => (
                                <motion.span key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.6 + i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="inline-block"
                                >{char === ' ' ? ' ' : char}</motion.span>
                            ))}
                        </div>
                        <div className="font-display text-7xl md:text-9xl text-ink font-bold leading-none tracking-tight">
                            {reduce ? 'HACH' : 'HACH'.split('').map((char, i) => (
                                <motion.span key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 1.1 + i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="inline-block"
                                >{char}</motion.span>
                            ))}
                        </div>
                    </h1>

                    <div className="relative inline-block pt-2">
                        <motion.p
                            className="font-chinese text-3xl md:text-4xl text-ink/70 tracking-[0.2em]"
                            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 1.5 }}
                        >金恩</motion.p>
                        <svg className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-4" viewBox="0 0 120 12" xmlns="http://www.w3.org/2000/svg">
                            <motion.path
                                d="M 5 6 Q 30 3, 60 6 Q 90 9, 115 6"
                                stroke="#c73e1d" strokeWidth="3" fill="none" strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.7 }}
                                transition={{
                                    pathLength: { duration: 0.7, ease: 'easeOut', delay: reduce ? 0 : 1.8 },
                                    opacity: { duration: 0.3, delay: reduce ? 0 : 1.8 }
                                }}
                            />
                        </svg>
                    </div>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                    className="text-ink/70 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: t.hero.subtitle.replace(
                            /<highlight>(.*?)<\/highlight>/g,
                            '<span class="text-vermillon font-medium">$1</span>'
                        )
                    }}
                />

                {/* Objectif */}
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 2.0 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-vermillon/10 border border-vermillon/30 rounded-full"
                >
                    <span className="text-sm font-semibold text-vermillon tracking-wide">{t.hero.cta}</span>
                </motion.div>

                {/* Tech badges */}
                <motion.div
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 2.3 }}
                    className="flex flex-wrap gap-3 justify-center pt-6 pb-16"
                >
                    {[
                        { name: 'React',       icon: SiReact },
                        { name: 'Next.js',     icon: SiNextdotjs },
                        { name: 'Spring Boot', icon: SiSpring },
                        { name: 'TypeScript',  icon: SiTypescript },
                        { name: 'Node.js',     icon: SiNodedotjs },
                        { name: 'Docker',      icon: SiDocker },
                    ].map((tech, i) => {
                        const Icon = tech.icon;
                        return (
                            <motion.span
                                key={tech.name}
                                initial={reduce ? false : { opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 2.4 + i * 0.08 }}
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
                initial={reduce ? false : { opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink/40 hover:text-vermillon transition-colors duration-300 group cursor-pointer z-10"
                aria-label="Défiler vers les projets"
            >
                <span className="text-xs uppercase tracking-wider font-medium">{t.hero.discover}</span>
                <motion.div
                    animate={reduce ? {} : { y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <HiArrowDown className="w-6 h-6" />
                </motion.div>
            </motion.button>
        </section>
    );
}
