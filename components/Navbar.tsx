'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiDownload } from 'react-icons/hi';
import { HiSun, HiMoon } from 'react-icons/hi2';
import { useLanguage, fr, en } from '@/lib/i18n';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
    const { lang, toggle } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const t = lang === 'fr' ? fr : en;
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cvDropdownOpen, setCvDropdownOpen] = useState(false);

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
        { id: 'projects', label: t.nav.projects },
        { id: 'about', label: t.nav.about },
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
                                WKH
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

                            {/* Bouton CV avec dropdown */}
                            <div className="relative ml-2">
                                <button
                                    onClick={() => setCvDropdownOpen(!cvDropdownOpen)}
                                    aria-label="Télécharger mon CV"
                                    aria-expanded={cvDropdownOpen}
                                    className="px-4 py-2.5 text-sm font-medium text-ink border border-gold rounded-lg hover:bg-gold/10 hover:border-gold transition-all duration-200 flex items-center gap-1.5"
                                >
                                    <HiDownload className="w-4 h-4" aria-hidden="true" />
                                    {t.nav.cvLabel}
                                    <svg className={`w-3 h-3 transition-transform duration-200 ${cvDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {cvDropdownOpen && (
                                        <>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="fixed inset-0 z-40"
                                                onClick={() => setCvDropdownOpen(false)}
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 top-full mt-2 w-52 bg-washi border border-gold/30 rounded-xl shadow-xl z-50 overflow-hidden"
                                            >
                                                <a
                                                    href="/CV_William_Kim_HACH_Developpeur_Fullstack.pdf"
                                                    download
                                                    onClick={() => setCvDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-ink hover:bg-gold/10 transition-colors duration-150"
                                                >
                                                    <span className="text-lg">🇫🇷</span>
                                                    <div>
                                                        <div className="font-semibold">{t.nav.cvFr}</div>
                                                        <div className="text-xs text-ink/50">{t.nav.cvFrSub}</div>
                                                    </div>
                                                </a>
                                                <div className="border-t border-gold/20" />
                                                <a
                                                    href="/CV_William_Kim_HACH_Resume_US.pdf"
                                                    download
                                                    onClick={() => setCvDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-ink hover:bg-gold/10 transition-colors duration-150"
                                                >
                                                    <span className="text-lg">🇺🇸</span>
                                                    <div>
                                                        <div className="font-semibold">{t.nav.cvUs}</div>
                                                        <div className="text-xs text-ink/50">{t.nav.cvUsSub}</div>
                                                    </div>
                                                </a>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="ml-2 px-6 py-2.5 bg-gradient-to-r from-vermillon to-gold text-washi text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                            >
                                {t.nav.contact}
                            </button>

                            {/* Séparateur */}
                            <div className="w-px h-6 bg-gold/30 mx-1" aria-hidden="true" />

                            {/* Toggle Dark/Light */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-ink/60 hover:text-ink rounded-lg hover:bg-gold/10 transition-all duration-200"
                                aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
                            >
                                {theme === 'dark' ? <HiSun className="w-4 h-4" /> : <HiMoon className="w-4 h-4" />}
                            </button>

                            {/* Toggle FR/EN */}
                            <button
                                onClick={toggle}
                                className="text-xs font-bold text-ink/60 hover:text-ink rounded-lg hover:bg-gold/10 px-2 py-2 transition-all duration-200"
                                aria-label="Switch language"
                            >
                                {lang === 'fr' ? 'EN' : 'FR'}
                            </button>
                        </div>

                        {/* Contrôles mobile : thème + langue + burger */}
                        <div className="md:hidden flex items-center gap-1">
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-ink/60 hover:text-ink rounded-lg hover:bg-gold/10 transition-all duration-200"
                                aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
                            >
                                {theme === 'dark' ? <HiSun className="w-4 h-4" /> : <HiMoon className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={toggle}
                                className="text-xs font-bold text-ink/60 hover:text-ink rounded-lg hover:bg-gold/10 px-2 py-2 transition-all duration-200"
                                aria-label="Switch language"
                            >
                                {lang === 'fr' ? 'EN' : 'FR'}
                            </button>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg hover:bg-gold/10 transition-colors duration-200"
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

                                    {/* Boutons CV Mobile */}
                                    <motion.a
                                        href="/CV_William_Kim_HACH_Developpeur_Fullstack.pdf"
                                        download
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.24, duration: 0.3 }}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full flex items-center gap-3 px-5 py-4 rounded-lg font-medium text-ink border border-gold hover:bg-gold/10 transition-all duration-200"
                                    >
                                        <HiDownload className="w-5 h-5" aria-hidden="true" />
                                        <span>🇫🇷 CV Français</span>
                                    </motion.a>
                                    <motion.a
                                        href="/CV_William_Kim_HACH_Resume_US.pdf"
                                        download
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.28, duration: 0.3 }}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full flex items-center gap-3 px-5 py-4 rounded-lg font-medium text-ink border border-gold hover:bg-gold/10 transition-all duration-200"
                                    >
                                        <HiDownload className="w-5 h-5" aria-hidden="true" />
                                        <span>🇺🇸 Resume (US)</span>
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
                                        {t.nav.contact}
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