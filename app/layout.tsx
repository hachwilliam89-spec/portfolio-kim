import { Inter, Playfair_Display, Ma_Shan_Zheng } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from '@/components/Providers';

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
    title: 'William Kim HACH — Développeur web & mobile',
    description: 'Portfolio de William Kim HACH : applications web et mobiles, Équilibre, XIP Telecom et KCD Formes. Stage de 6 mois dès janvier 2027, en France ou à l’étranger.',
    keywords: ['développeur', 'full stack', 'mobile', 'react native', 'expo', 'équilibre', 'react', 'next.js', 'nestjs', 'spring boot', 'node.js', 'typescript', 'docker', 'postgresql', 'agents ia', 'openai', 'portfolio', 'kim hach', 'stage', 'alternance', 'uha 4.0', 'mulhouse', 'drizzle orm', 'vitest'],
    authors: [{ name: 'William Kim HACH' }],
    creator: 'William Kim HACH',
    metadataBase: new URL('https://wkhach.dev'),
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://wkhach.dev',
        siteName: 'William Kim HACH — Portfolio',
        title: 'William Kim HACH — Développeur web & mobile',
        description: 'Portfolio de William Kim HACH : applications web et mobiles, Équilibre, XIP Telecom et KCD Formes. Stage de 6 mois dès janvier 2027, en France ou à l’étranger.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'William Kim HACH — Développeur web et mobile',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'William Kim HACH — Développeur web & mobile',
        description: 'Portfolio de William Kim HACH : applications web et mobiles, Équilibre, XIP Telecom et KCD Formes. Stage de 6 mois dès janvier 2027, en France ou à l’étranger.',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        // Le script anti-flash ajuste uniquement la classe du thème avant l'hydratation.
        // Cette différence attendue reste limitée à la balise racine.
        <html lang="fr" suppressHydrationWarning className={`scroll-smooth ${inter.variable} ${playfair.variable} ${maShanZheng.variable}`}>
        <head>
            {/* Anti-flash : applique .dark avant le premier rendu */}
            <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&d))document.documentElement.classList.add('dark')}catch(e){}` }} />
        </head>
        <body className="bg-washi text-ink antialiased font-sans transition-colors duration-300">
        <Providers>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </Providers>
        </body>
        </html>
    );
}
