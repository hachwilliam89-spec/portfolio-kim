import './globals.css';

export const metadata = {
    title: 'Kim — Portfolio Développeur Full-Stack',
    description: 'Portfolio de Kim, développeur full-stack en reconversion. Projets : Miyazaki-Garden, COS Strasbourg, Application RH.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className="scroll-smooth">
        <body className="bg-slate-950 text-slate-50 antialiased">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                <a href="#" className="text-sm font-semibold tracking-[0.2em] uppercase text-sky-400 hover:text-sky-300 transition">
                    Kim
                </a>
                <div className="flex gap-6 text-sm text-slate-300">
                    <a href="#projects" className="hover:text-sky-400 transition">Projets</a>
                    <a href="#about" className="hover:text-sky-400 transition">À propos</a>
                    <a href="#contact" className="hover:text-sky-400 transition">Contact</a>
                </div>
            </nav>
        </header>

        {/* Main content */}
        {children}

        {/* Footer */}
        <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
            <p>© 2025 Kim — Portfolio développeur full-stack</p>
        </footer>
        </body>
        </html>
    );
}