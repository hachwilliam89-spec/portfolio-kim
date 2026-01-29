import { Inter, Playfair_Display } from 'next/font/google'
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

export const metadata = {
    title: 'Kim — Architecte Logiciel',
    description: 'Portfolio de Kim, architecte logiciel spécialisé en développement full-stack. Projets : Miyazaki-Garden, COS Strasbourg, Application RH.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
        <body className="bg-washi text-ink antialiased font-sans">

        {/* Nouvelle Navbar moderne */}
        <Navbar />

        {/* Main content */}
        {children}

        {/* Footer */}
        <footer className="border-t border-gold/30 bg-ink py-8 text-center text-sm text-washi/70">
            <p className="mb-2">© 2025 Kim — Etudiant en License Pro Developpement Full Stack</p>
            <div className="flex justify-center gap-4 text-gold">
                <a href="https://www.linkedin.com/in/kim-hach" target="_blank" rel="noopener noreferrer" className="hover:text-gold-light transition">LinkedIn</a>
                <a href="https://github.com/hachwilliam89-spec" target="_blank" rel="noopener noreferrer" className="hover:text-gold-light transition">GitHub</a>
            </div>
        </footer>
        </body>
        </html>
    );
}