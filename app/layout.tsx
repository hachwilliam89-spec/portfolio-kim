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
    title: 'William Kim HACH , Développeur Full Stack',
    description: 'Portfolio de William Kim HACH, développeur Full Stack (Licence Pro UHA 4.0). Projets : XIP Telecom v2 (agents IA, Odoo), RecycleDashboard, KCD Formes, COS Strasbourg. Stack : Next.js, TypeScript, NestJS, Spring Boot, Docker, PostgreSQL.',
    keywords: ['développeur', 'full stack', 'react', 'next.js', 'nestjs', 'spring boot', 'node.js', 'typescript', 'docker', 'postgresql', 'agents ia', 'openai', 'portfolio', 'kim hach', 'stage', 'alternance', 'uha 4.0', 'mulhouse', 'drizzle orm', 'vitest'],
    authors: [{ name: 'William Kim HACH' }],
    creator: 'William Kim HACH',
    metadataBase: new URL('https://wkhach.dev'),
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://wkhach.dev',
        siteName: 'William Kim HACH , Portfolio',
        title: 'William Kim HACH , Développeur Full Stack',
        description: 'Développeur Full Stack , Next.js, TypeScript, NestJS, Spring Boot, agents IA. 6 projets dont XIP Telecom v2 (plateforme B2B avec orchestration IA). Disponible en stage ou alternance.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'William Kim HACH - Développeur Full Stack',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'William Kim HACH , Développeur Full Stack',
        description: 'Développeur Full Stack , Next.js, TypeScript, NestJS, Spring Boot, agents IA. Disponible en stage ou alternance.',
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
        <html lang="fr" className={`scroll-smooth ${inter.variable} ${playfair.variable} ${maShanZheng.variable}`}>
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