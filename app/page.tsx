'use client';

import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import BrushSeparator from '@/components/BrushSeparator';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />

            <BrushSeparator />

            <Projects />

            <BrushSeparator />

            <About />

            <BrushSeparator />

            <Contact />
        </main>
    );
}