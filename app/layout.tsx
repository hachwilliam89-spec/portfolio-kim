import { Inter, Playfair_Display, Ma_Shan_Zheng } from 'next/font/google'
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    weight: ['400', '700'],
})

const maShanZheng = Ma_Shan_Zheng({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-chinese',
})

export const metadata = {
    title: 'Kim HACH — Développeur Full Stack',
    description: 'Portfolio de Kim HACH, développeur full-stack en formation. Projets : Miyazaki-Garden, COS Strasbourg, Application RH. React, Next.js, Node.js, TypeScript.',
};

// Composant Grecque Chinoise (回纹) pour le footer
function ChineseGreekPattern() {
    return (
        <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden opacity-20">
            <svg
                className="w-full h-full"
                preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 400 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Motif grecque chinoise unitaire */}
                    <pattern id="greek-pattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                        <g fill="none" stroke="#faf9f6" strokeWidth="1.5" strokeLinecap="square">
                            {/* Spirale carrée - motif 回 */}
                            <path d="M 4 4 L 28 4 L 28 28 L 8 28 L 8 8 L 24 8 L 24 24 L 12 24 L 12 12 L 20 12 L 20 20 L 16 20 L 16 16" />
                        </g>
                    </pattern>
                </defs>

                <rect x="0" y="0" width="100%" height="100%" fill="url(#greek-pattern)" />
            </svg>
        </div>
    );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className={`scroll-smooth ${inter.variable} ${playfair.variable} ${maShanZheng.variable}`}>
        <body className="bg-washi text-ink antialiased font-sans">

        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        {children}

        {/* Footer avec grecque chinoise */}
        <footer className="relative border-t border-gold/30 bg-ink py-12 text-center text-sm text-washi/70">
            {/* Motif grecque chinoise en bordure haute */}
            <ChineseGreekPattern />

            <div className="relative z-10">
                <p className="mb-3">© 2025 Kim HACH — Étudiant en Licence Pro Développement Full Stack</p>
                <div className="flex justify-center gap-6 text-gold">
                    <a
                        href="https://www.linkedin.com/in/kim-hach"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold-light transition-colors duration-300"
                    >
                        LinkedIn
                    </a>
                    <span className="text-washi/30">|</span>
                    <a
                        href="https://github.com/hachwilliam89-spec"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold-light transition-colors duration-300"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
        </body>
        </html>
    );
}