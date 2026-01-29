// pages/home / app/page / Home.tsx
'use client';

import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />
            <Projects />
            <About />
            <Contact />
        </main>
    );
}