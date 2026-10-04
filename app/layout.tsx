import { Inter, Playfair_Display, Ma_Shan_Zheng } from 'next/font/google'
import type { Metadata } from 'next'
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, SOCIAL_IMAGE } from '@/lib/seo';
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
    title: { default: SITE_TITLE, template: '%s | William Kim HACH' },
    description: SITE_DESCRIPTION,
    authors: [{ name: 'William Kim HACH' }],
    creator: 'William Kim HACH',
    metadataBase: new URL(SITE_URL),
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: SITE_URL,
        siteName: 'William Kim HACH — Portfolio',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [
            {
                url: SOCIAL_IMAGE,
                width: 1200,
                height: 630,
                alt: 'William Kim HACH — Développeur full-stack web et mobile, stage de 6 mois dès janvier 2027',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [SOCIAL_IMAGE],
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
