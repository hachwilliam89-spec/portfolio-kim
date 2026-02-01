'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiDownload } from 'react-icons/hi';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Détection de la section active
            const sections = ['projects', 'about'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });
            setActiveSection(current || '');
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        setMobileMenuOpen(false);
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const navItems = [
        { id: 'projects', label: 'Projets' },
        { id: 'about', label: 'À propos' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-washi/95 backdrop-blur-md shadow-lg border-b border-gold/20'
                        : 'bg-washi/80 backdrop-blur-sm border-b border-gold/10'
                }`}
                role="navigation"
                aria-label="Navigation principale"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <button
                            onClick={() => scrollToSection('home')}
                            className="relative group"
                            aria-label="Retour à l'accueil"
                        >
                            <span className="font-serif text-3xl font-bold text-ink transition-colors duration-200 group-hover:text-vermillon">
                                KH
                            </span>
                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-vermillon to-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
                        </button>

                        {/* Navigation Desktop */}
                        <div className="hidden md:flex items-center gap-2">
                            {navItems.map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                                        activeSection === id
                                            ? 'text-washi bg-gradient-to-r from-vermillon to-gold shadow-md'
                                            : 'text-ink hover:text-vermillon hover:bg-gold/5'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}

                            {/* Bouton CV - contraste amélioré */}
                            <a
                                href="/CV_Kim_HACH_Developpeur_Fullstack.pdf"
                                download
                                aria-label="Télécharger mon CV en PDF"
                                className="ml-2 px-4 py-2.5 text-sm font-medium text-ink border border-gold rounded-lg hover:bg-gold/10 hover:border-gold transition-all duration-200 flex items-center gap-1.5"
                            >
                                <HiDownload className="w-4 h-4" aria-hidden="true" />
                                CV
                            </a>

                            {/* CTA Button */}
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="ml-2 px-6 py-2.5 bg-gradient-to-r from-vermillon to-gold text-washi text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                            >
                                Me contacter
                            </button>
                        </div>

                        {/* Burger Menu Mobile */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gold/10 transition-colors duration-200"
                            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {mobileMenuOpen ? (
                                <HiX className="w-7 h-7 text-ink" aria-hidden="true" />
                            ) : (
                                <HiMenu className="w-7 h-7 text-ink" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Menu Mobile */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-40 md:hidden"
                            aria-hidden="true"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            id="mobile-menu"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                            className="fixed top-0 right-0 bottom-0 w-80 bg-washi shadow-2xl z-50 md:hidden border-l border-gold/30"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Menu de navigation"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex justify-between items-center p-6 border-b border-gold/20">
                                    <span className="font-serif text-2xl font-bold text-ink">
                                        Menu
                                    </span>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 rounded-lg hover:bg-gold/10 transition-colors duration-200"
                                        aria-label="Fermer le menu"
                                    >
                                        <HiX className="w-6 h-6 text-ink" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Navigation Items */}
                                <div className="flex-1 px-6 py-8 space-y-2">
                                    {navItems.map(({ id, label }, index) => (
                                        <motion.button
                                            key={id}
                                            onClick={() => scrollToSection(id)}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.08, duration: 0.3 }}
                                            className={`w-full text-left px-5 py-4 rounded-lg font-medium transition-all duration-200 ${
                                                activeSection === id
                                                    ? 'bg-gradient-to-r from-vermillon to-gold text-washi shadow-lg'
                                                    : 'text-ink hover:bg-gold/10 border border-gold/20'
                                            }`}
                                        >
                                            {label}
                                        </motion.button>
                                    ))}

                                    {/* Bouton CV Mobile - contraste amélioré */}
                                    <motion.a
                                        href="/CV_Kim_HACH_Developpeur_Fullstack.pdf"
                                        download
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.24, duration: 0.3 }}
                                        aria-label="Télécharger mon CV en PDF"
                                        className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-lg font-medium text-ink border border-gold hover:bg-gold/10 transition-all duration-200"
                                    >
                                        <HiDownload className="w-5 h-5" aria-hidden="true" />
                                        Télécharger CV
                                    </motion.a>
                                </div>

                                {/* Footer CTA */}
                                <div className="p-6 border-t border-gold/20">
                                    <motion.button
                                        onClick={() => scrollToSection('contact')}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.3 }}
                                        className="block w-full px-6 py-4 bg-gradient-to-r from-vermillon to-gold text-washi text-center font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                                    >
                                        Me contacter
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}