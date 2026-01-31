import { Inter, Playfair_Display, Ma_Shan_Zheng } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    weight: ['400', '700'],
    display: 'swap',
})

const maShanZheng = Ma_Shan_Zheng({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-chinese',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Kim HACH — Développeur Full Stack',
    description: 'Portfolio de Kim HACH, développeur full-stack en formation. Projets : Miyazaki-Garden, COS Strasbourg, Application RH. React, Next.js, Node.js, TypeScript.',
    keywords: ['développeur', 'full stack', 'react', 'next.js', 'node.js', 'typescript', 'portfolio', 'kim hach', 'stage', 'alternance'],
    authors: [{ name: 'Kim HACH' }],
    creator: 'Kim HACH',
    metadataBase: new URL('https://portfolio-kim-liart.vercel.app'),
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://portfolio-kim-liart.vercel.app',
        siteName: 'Kim HACH — Portfolio',
        title: 'Kim HACH — Développeur Full Stack',
        description: 'Développeur full-stack en reconversion. React, Next.js, Node.js, TypeScript. Découvrez mes projets et contactez-moi.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Kim HACH - Développeur Full Stack',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kim HACH — Développeur Full Stack',
        description: 'Développeur full-stack en reconversion. React, Next.js, Node.js, TypeScript.',
        images: ['/og-image.png'],
    },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
    manifest: '/site.webmanifest',
    robots: {
        index: true,
        follow: true,
    },
};

// Composant Grecque Chinoise (回纹) pour le footer
function ChineseGreekPattern() {
    return (
        <div className="absolute top-0 left-0 right-0 h-5 overflow-hidden opacity-20">
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

        {/* Footer très compact avec grecque chinoise */}
        <footer className="relative border-t border-gold/30 bg-ink py-4 text-center text-sm text-washi/70">
            {/* Motif grecque chinoise en bordure haute */}
            <ChineseGreekPattern />

            <div className="relative z-10 pt-1">
                <p className="mb-1">© 2025 Kim HACH — Étudiant en Licence Pro Développement Full Stack</p>
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