import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    weight: ['400', '700'],
})

export const metadata = {
    title: 'Kim — Architecte Logiciel',
    description: 'Portfolio de Kim, architecte logiciel spécialisé en développement full-stack. Projets : Miyazaki-Garden, COS Strasbourg, Application RH.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
        <body className="bg-washi text-ink antialiased font-sans">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-gold/20 bg-washi/80 backdrop-blur-md">
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                <a href="#" className="font-display text-sm font-semibold tracking-[0.2em] uppercase text-vermillon hover:text-vermillon-light transition">
                    Kim
                </a>
                <div className="flex gap-6 text-sm text-ink/70">
                    <a href="#projects" className="hover:text-vermillon transition">Projets</a>
                    <a href="#about" className="hover:text-vermillon transition">À propos</a>
                    <a href="#contact" className="hover:text-vermillon transition">Contact</a>
                </div>
            </nav>
        </header>

        {/* Main content */}
        {children}

        {/* Footer */}
        <footer className="border-t border-gold/30 bg-ink py-8 text-center text-sm text-washi/70">
            <p className="mb-2">© 2025 Kim — Architecte Logiciel</p>
            <div className="flex justify-center gap-4 text-gold">
                <a href="#" className="hover:text-gold-light transition">LinkedIn</a>
                <a href="#" className="hover:text-gold-light transition">GitHub</a>
            </div>
        </footer>
        </body>
        </html>
    );
}