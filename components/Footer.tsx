'use client';

import { useLanguage, fr, en } from '@/lib/i18n';

export default function Footer() {
    const { lang } = useLanguage();
    const t = lang === 'fr' ? fr : en;

    return (
        <footer className="relative border-t border-gold/30 bg-ink py-4 text-center text-sm text-washi/90">
            {/* Motif grecque chinoise en bordure haute */}
            <div className="absolute top-0 left-0 right-0 h-5 overflow-hidden opacity-20" aria-hidden="true">
                <svg
                    className="w-full h-full"
                    preserveAspectRatio="xMidYMid slice"
                    viewBox="0 0 400 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern id="greek-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <g fill="none" stroke="#faf9f6" strokeWidth="1.2" strokeLinecap="square">
                                <path d="M 2 2 L 18 2 L 18 18 L 5 18 L 5 5 L 15 5 L 15 15 L 8 15 L 8 8 L 12 8 L 12 12 L 10 12 L 10 10" />
                            </g>
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#greek-pattern)" />
                </svg>
            </div>

            <div className="relative z-10 pt-1">
                <p className="mb-1">{t.footer.copyright}</p>
                <div className="flex justify-center gap-6 text-gold">
                    <a
                        href="https://www.linkedin.com/in/william-hach-31117b407/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                        className="hover:text-gold-light transition-colors duration-300"
                    >
                        LinkedIn
                    </a>
                    <span className="text-washi/50" aria-hidden="true">|</span>
                    <a
                        href="https://github.com/hachwilliam89-spec"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub profile"
                        className="hover:text-gold-light transition-colors duration-300"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}
