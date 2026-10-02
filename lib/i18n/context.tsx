'use client';

import { createContext, useContext, useSyncExternalStore, useEffect, ReactNode } from 'react';

export type Lang = 'fr' | 'en';

interface LanguageContextType {
    lang: Lang;
    toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'fr', toggle: () => {} });

const languageEvent = 'portfolio-language-change';
let fallbackLanguage: Lang = 'fr';

function readLanguage(): Lang {
    try {
        const saved = localStorage.getItem('lang');
        return saved === 'en' ? 'en' : 'fr';
    } catch {
        return fallbackLanguage;
    }
}

function subscribeLanguage(onChange: () => void) {
    const onStorage = (event: StorageEvent) => {
        if (event.key === 'lang' || event.key === null) onChange();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener(languageEvent, onChange);
    return () => {
        window.removeEventListener('storage', onStorage);
        window.removeEventListener(languageEvent, onChange);
    };
}

function serverLanguage(): Lang { return 'fr'; }

export function LanguageProvider({ children }: { children: ReactNode }) {
    const lang = useSyncExternalStore(subscribeLanguage, readLanguage, serverLanguage);

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const toggle = () => {
        const next = lang === 'fr' ? 'en' : 'fr';
        fallbackLanguage = next;
        try {
            localStorage.setItem('lang', next);
        } catch {
            // Keep language switching available when browser storage is blocked.
        }
        window.dispatchEvent(new Event(languageEvent));
    };

    return (
        <LanguageContext.Provider value={{ lang, toggle }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
