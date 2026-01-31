'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import SectionTitle from './SectionTitle';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `mailto:hach.william89@outlook.fr?subject=Contact de ${formData.name}&body=${formData.message}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" className="relative max-w-4xl mx-auto px-4 py-16">

            <SectionTitle>Contact</SectionTitle>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Formulaire */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white border-2 border-gold/40 rounded-lg p-6 hover:border-vermillon hover:shadow-xl hover:shadow-vermillon/20 transition-all duration-300"
                >
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2 text-ink">Nom</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-washi border border-gold/30 rounded-lg focus:outline-none focus:border-vermillon focus:ring-2 focus:ring-vermillon/20 transition"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2 text-ink">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-washi border border-gold/30 rounded-lg focus:outline-none focus:border-vermillon focus:ring-2 focus:ring-vermillon/20 transition"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2 text-ink">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-2.5 bg-washi border border-gold/30 rounded-lg focus:outline-none focus:border-vermillon focus:ring-2 focus:ring-vermillon/20 transition"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-vermillon text-white font-semibold py-3 rounded-lg hover:bg-vermillon-dark transition-all duration-300 hover:shadow-lg"
                        >
                            Envoyer
                        </button>
                    </form>
                </motion.div>

                {/* Liens sociaux */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white border-2 border-gold/40 rounded-lg p-6 hover:border-vermillon hover:shadow-xl hover:shadow-vermillon/20 transition-all duration-300 flex flex-col justify-center"
                >
                    {/* Titre avec encadré style chinois */}
                    <div className="relative flex justify-center mb-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="relative px-6 py-2"
                        >
                            {/* Cadre SVG style chinois */}
                            <svg
                                className="absolute inset-0 w-full h-full"
                                viewBox="0 0 200 50"
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Coins stylisés */}
                                <g stroke="#c73e1d" strokeWidth="2" fill="none" strokeLinecap="square">
                                    {/* Coin haut gauche */}
                                    <path d="M 2 15 L 2 2 L 15 2" />
                                    <path d="M 6 10 L 6 6 L 10 6" />

                                    {/* Coin haut droit */}
                                    <path d="M 185 2 L 198 2 L 198 15" />
                                    <path d="M 190 6 L 194 6 L 194 10" />

                                    {/* Coin bas gauche */}
                                    <path d="M 2 35 L 2 48 L 15 48" />
                                    <path d="M 6 40 L 6 44 L 10 44" />

                                    {/* Coin bas droit */}
                                    <path d="M 185 48 L 198 48 L 198 35" />
                                    <path d="M 190 44 L 194 44 L 194 40" />
                                </g>
                            </svg>

                            <h3 className="font-display text-xl md:text-2xl font-bold text-vermillon relative z-10">
                                Retrouvez-moi
                            </h3>
                        </motion.div>
                    </div>

                    <div className="space-y-4">
                        <a
                            href="https://github.com/hachwilliam89-spec"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-ink/5 hover:bg-gold/10 border border-ink/10 hover:border-gold/40 rounded-lg transition-all duration-300 group"
                        >
                            <svg className="w-8 h-8 text-ink group-hover:text-vermillon transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            <div className="flex-1">
                                <p className="font-semibold text-ink group-hover:text-vermillon transition-colors">GitHub</p>
                                <p className="text-xs text-ink/60">hachwilliam89-spec</p>
                            </div>
                            <svg className="w-5 h-5 text-ink/40 group-hover:text-vermillon group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>

                        <a
                            href="https://www.linkedin.com/in/kim-hach"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-ink/5 hover:bg-gold/10 border border-ink/10 hover:border-gold/40 rounded-lg transition-all duration-300 group"
                        >
                            <svg className="w-8 h-8 text-ink group-hover:text-vermillon transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            <div className="flex-1">
                                <p className="font-semibold text-ink group-hover:text-vermillon transition-colors">LinkedIn</p>
                                <p className="text-xs text-ink/60">kim-hach</p>
                            </div>
                            <svg className="w-5 h-5 text-ink/40 group-hover:text-vermillon group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>

                        <a
                            href="mailto:hach.william89@outlook.fr"
                            className="flex items-center gap-4 p-4 bg-ink/5 hover:bg-gold/10 border border-ink/10 hover:border-gold/40 rounded-lg transition-all duration-300 group"
                        >
                            <svg className="w-8 h-8 text-ink group-hover:text-vermillon transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <div className="flex-1">
                                <p className="font-semibold text-ink group-hover:text-vermillon transition-colors">Email</p>
                                <p className="text-xs text-ink/60">hach.william89@outlook.fr</p>
                            </div>
                            <svg className="w-5 h-5 text-ink/40 group-hover:text-vermillon group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}