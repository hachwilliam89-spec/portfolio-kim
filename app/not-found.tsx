'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4 pt-20">
            <div className="text-center">
                {/* 404 avec style asiatique */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative inline-block mb-8"
                >
                    {/* Encadré coins chinois */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 200 100"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.g
                            stroke="#c73e1d"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="square"
                            animate={{ opacity: [0.5, 0.9, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* Coin haut gauche */}
                            <path d="M 2 20 L 2 2 L 20 2" />
                            <path d="M 6 14 L 6 6 L 14 6" />

                            {/* Coin haut droit */}
                            <path d="M 180 2 L 198 2 L 198 20" />
                            <path d="M 186 6 L 194 6 L 194 14" />

                            {/* Coin bas gauche */}
                            <path d="M 2 80 L 2 98 L 20 98" />
                            <path d="M 6 86 L 6 94 L 14 94" />

                            {/* Coin bas droit */}
                            <path d="M 180 98 L 198 98 L 198 80" />
                            <path d="M 186 94 L 194 94 L 194 86" />
                        </motion.g>
                    </svg>

                    <h1 className="font-display text-8xl md:text-9xl font-bold text-ink px-12 py-6">
                        404
                    </h1>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mb-4">
                        Page introuvable
                    </h2>
                    <p className="text-ink/70 mb-8 max-w-md mx-auto">
                        Cette page semble s&apos;être égarée dans la brume...
                    </p>
                </motion.div>

                {/* Bouton retour */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-vermillon to-gold text-washi font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour à l&apos;accueil
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}