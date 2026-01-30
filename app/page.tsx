'use client';

import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import { motion } from 'framer-motion';

// Composant séparateur nuages chinois (祥云) - vrais nuages stylisés
function CloudSeparator({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
    return (
        <div className="relative w-full h-20 md:h-24 overflow-hidden flex items-center justify-center">
            <motion.svg
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-[250px] md:w-[320px] h-auto opacity-[0.07]"
                viewBox="0 0 200 50"
                xmlns="http://www.w3.org/2000/svg"
            >
                {variant === 1 && (
                    <g fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {/* Nuage gauche */}
                        <path d="M 30 30
                                 Q 25 25, 30 20
                                 Q 35 15, 45 18
                                 Q 55 12, 65 18
                                 Q 70 15, 75 20
                                 Q 80 25, 75 30
                                 Q 70 35, 60 32
                                 Q 50 38, 40 32
                                 Q 35 35, 30 30 Z" />
                        {/* Spirale intérieure */}
                        <path d="M 45 25 Q 50 22, 55 25 Q 58 28, 55 30" />

                        {/* Nuage droit */}
                        <path d="M 125 30
                                 Q 120 25, 125 20
                                 Q 130 15, 140 18
                                 Q 150 12, 160 18
                                 Q 165 15, 170 20
                                 Q 175 25, 170 30
                                 Q 165 35, 155 32
                                 Q 145 38, 135 32
                                 Q 130 35, 125 30 Z" />
                        {/* Spirale intérieure */}
                        <path d="M 140 25 Q 145 22, 150 25 Q 153 28, 150 30" />

                        {/* Petit nuage central */}
                        <path d="M 90 35 Q 87 32, 90 28 Q 95 24, 102 28 Q 108 24, 110 28 Q 113 32, 110 35 Q 105 38, 100 36 Q 93 38, 90 35 Z" />
                    </g>
                )}

                {variant === 2 && (
                    <g fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {/* Grand nuage central */}
                        <path d="M 55 32
                                 Q 50 27, 55 22
                                 Q 62 16, 75 18
                                 Q 88 10, 105 16
                                 Q 118 10, 130 18
                                 Q 143 16, 148 22
                                 Q 153 27, 148 32
                                 Q 143 38, 130 35
                                 Q 115 42, 100 36
                                 Q 85 42, 70 35
                                 Q 58 38, 55 32 Z" />
                        {/* Spirales intérieures */}
                        <path d="M 75 26 Q 80 23, 85 26 Q 88 29, 85 31" />
                        <path d="M 115 26 Q 120 23, 125 26 Q 128 29, 125 31" />
                    </g>
                )}

                {variant === 3 && (
                    <g fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {/* Trois petits nuages dispersés */}
                        {/* Nuage gauche */}
                        <path d="M 25 28 Q 22 24, 26 20 Q 32 16, 42 19 Q 48 16, 52 20 Q 56 24, 52 28 Q 48 32, 40 30 Q 30 33, 25 28 Z" />
                        <path d="M 35 24 Q 38 22, 41 24" />

                        {/* Nuage central (plus haut) */}
                        <path d="M 85 22 Q 82 18, 86 14 Q 92 10, 102 13 Q 108 10, 112 14 Q 116 18, 112 22 Q 108 26, 100 24 Q 90 27, 85 22 Z" />
                        <path d="M 95 18 Q 98 16, 101 18" />

                        {/* Nuage droit */}
                        <path d="M 145 30 Q 142 26, 146 22 Q 152 18, 162 21 Q 168 18, 172 22 Q 176 26, 172 30 Q 168 34, 160 32 Q 150 35, 145 30 Z" />
                        <path d="M 155 26 Q 158 24, 161 26" />
                    </g>
                )}
            </motion.svg>
        </div>
    );
}

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />

            {/* Séparateur nuages - deux nuages + petit central */}
            <CloudSeparator variant={1} />

            <Projects />

            {/* Séparateur nuages - grand nuage central */}
            <CloudSeparator variant={2} />

            <About />

            {/* Séparateur nuages - trois petits nuages dispersés */}
            <CloudSeparator variant={3} />

            <Contact />
        </main>
    );
}