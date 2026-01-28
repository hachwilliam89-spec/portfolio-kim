'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="flex min-h-[70vh] items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-6"
            >
                <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
                    Etudiant Développeur full‑stack en reconversion
                </p>
                <h1 className="text-4xl md:text-6xl font-bold">
                    Kim Portfolio <br />
                </h1>
                <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                    Projets : site immersif Miyazaki‑Garden, plateforme Next.js pour le COS Strasbourg,
                    application RH en cours de développement.
                </p>
                <div className="flex gap-4 justify-center pt-4">
                    <a
                        href="#projects"
                        className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition"
                    >
                        Voir mes projets
                    </a>
                    <a
                        href="#contact"
                        className="px-6 py-3 border border-slate-600 hover:border-sky-400 text-slate-300 hover:text-sky-400 rounded-lg transition"
                    >
                        Me contacter
                    </a>
                </div>
            </motion.div>
        </section>
    );
}