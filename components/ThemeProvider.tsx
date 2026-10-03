'use client';

import { createContext, useCallback, useContext, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
    theme: 'light',
    toggleTheme: () => {},
});

// Le thème vit dans la classe .dark de <html> (posée avant l'hydratation par le script anti-flash) :
// on s'y abonne au lieu de le recopier dans un état React.
function readTheme(): Theme {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function subscribeTheme(onChange: () => void) {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
}

function serverTheme(): Theme { return 'light'; }

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useSyncExternalStore(subscribeTheme, readTheme, serverTheme);

    const toggleTheme = useCallback(() => {
        const next: Theme = readTheme() === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', next === 'dark');
        try { localStorage.setItem('theme', next); } catch { /* stockage indisponible : le thème reste actif pour la session */ }
        // Signale un changement volontaire (clic), pour animer le lever/coucher du soleil et de la lune
        window.dispatchEvent(new CustomEvent('theme-switch', { detail: next }));
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
