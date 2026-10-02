'use client';

import { LanguageProvider } from '@/lib/i18n';
import { ThemeProvider } from './ThemeProvider';
import { MotionConfig } from 'framer-motion';
import './motion-preferences.css';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <MotionConfig reducedMotion="user">
                <LanguageProvider>{children}</LanguageProvider>
            </MotionConfig>
        </ThemeProvider>
    );
}
