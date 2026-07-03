'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Lang = 'fr' | 'en';

interface LanguageContextType {
    lang: Lang;
    toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'fr', toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>('fr');

    useEffect(() => {
        const saved = localStorage.getItem('lang') as Lang | null;
        if (saved === 'fr' || saved === 'en') setLang(saved);
    }, []);

    const toggle = () => {
        setLang(prev => {
            const next = prev === 'fr' ? 'en' : 'fr';
            localStorage.setItem('lang', next);
            return next;
        });
    };

    return (
        <LanguageContext.Provider value={{ lang, toggle }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
