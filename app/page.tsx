import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { SITE_URL, SITE_TITLE, person } from '@/lib/seo';

import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import BrushSeparator from '@/components/BrushSeparator';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function Home() {
    return (
        <div className="min-h-screen">
            <StructuredData data={{
                '@context': 'https://schema.org',
                '@graph': [person, {
                    '@type': 'WebSite', '@id': `${SITE_URL}/#website`,
                    url: `${SITE_URL}/`, name: SITE_TITLE, inLanguage: 'fr',
                    author: { '@id': person['@id'] },
                }, {
                    '@type': 'ProfilePage', '@id': `${SITE_URL}/#profile`,
                    url: `${SITE_URL}/`, name: SITE_TITLE, inLanguage: 'fr',
                    mainEntity: { '@id': person['@id'] },
                }],
            }} />
            <Hero />

            <BrushSeparator />

            <Projects />

            <BrushSeparator />

            <About />

            <BrushSeparator />

            <Contact />
        </div>
    );
}