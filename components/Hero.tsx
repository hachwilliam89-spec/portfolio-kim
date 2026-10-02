'use client';

import { useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useTheme } from './ThemeProvider';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiSpring, SiDocker } from 'react-icons/si';
import { HiArrowDown } from 'react-icons/hi';
import { useLanguage, fr, en } from '@/lib/i18n';
import InkLandscape from './InkLandscape';
import './ink-landscape.css';

const technologies = [
    { name: 'React', icon: SiReact }, { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Spring Boot', icon: SiSpring }, { name: 'TypeScript', icon: SiTypescript },
    { name: 'Node.js', icon: SiNodedotjs }, { name: 'Docker', icon: SiDocker },
];

export default function Hero() {
    const { lang } = useLanguage();
    const { theme } = useTheme();
    const [pandas, setPandas] = useState<Record<string, object>>({});
    const pandaRef = useRef<LottieRefCurrentProps>(null);
    useEffect(() => {
        const controller = new AbortController();
        Promise.all(['day', 'sleep'].map(async name => {
            const response = await fetch(`/panda-${name}.json`, { signal: controller.signal });
            if (!response.ok) throw new Error('Panda unavailable');
            return [name, await response.json()] as const;
        })).then(entries => setPandas(Object.fromEntries(entries))).catch(() => {});
        return () => controller.abort();
    }, []);
    const t = lang === 'fr' ? fr : en;
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        let visible = false;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => {
            const running = visible && !document.hidden && !reduced.matches;
            section.dataset.running = String(running);
            if (running) pandaRef.current?.play(); else pandaRef.current?.pause();
        };
        reduced.addEventListener('change', update);
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
        observer.observe(section);
        document.addEventListener('visibilitychange', update);
        return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); reduced.removeEventListener('change', update); };
    }, [theme, pandas]);

    // Lever / coucher animé : uniquement sur un clic du bouton de thème, jamais au chargement
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        const onSwitch = (event: Event) => {
            const section = sectionRef.current;
            if (!section) return;
            clearTimeout(timer);
            delete section.dataset.switch;
            void section.offsetWidth; // relance l'animation si on reclique pendant qu'elle tourne
            section.dataset.switch = (event as CustomEvent<string>).detail;
            timer = setTimeout(() => { delete section.dataset.switch; }, 3000);
        };
        window.addEventListener('theme-switch', onSwitch);
        return () => { window.removeEventListener('theme-switch', onSwitch); clearTimeout(timer); };
    }, []);

    return (
        <section id="home" ref={sectionRef} className="ink-hero relative isolate overflow-hidden" data-running="false">
            <InkLandscape />
            <div className="hero-content relative z-10 mx-auto max-w-3xl px-6 text-center">
                <p className="mb-7 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-vermillon/30 bg-vermillon/10 text-[11px] sm:text-xs font-medium tracking-[.25em] uppercase text-vermillon dark:text-[#e98c70]">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-vermillon opacity-75 motion-safe:animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-vermillon" />
                    </span>
                    {t.hero.badge}
                </p>
                <h1 className="font-display text-ink tracking-tight leading-[1.02]">
                    <span className="block text-[clamp(1.6rem,3vw,2.6rem)] font-normal tracking-[.12em] text-ink/60">William Kim</span>
                    <span className="mt-1 block text-[clamp(4rem,7.5vw,6.5rem)] font-bold"><span className="relative inline-block">HACH
                        <span aria-hidden="true" className={`absolute top-1/2 -translate-y-1/2 hidden sm:block ${theme === 'dark' ? 'panda-ink right-full mr-4 w-24 h-24 md:w-32 md:h-32' : 'left-full ml-4 w-20 h-20 md:w-24 md:h-24'}`}>
                            {pandas[theme === 'dark' ? 'sleep' : 'day'] && <Lottie key={theme} lottieRef={pandaRef} animationData={pandas[theme === 'dark' ? 'sleep' : 'day']} autoplay={false} loop />}
                        </span>
                    </span></span>
                </h1>
                <div className="mx-auto my-7 h-px w-20 bg-vermillon/65" />
                <p className="mx-auto max-w-xl text-lg sm:text-xl leading-relaxed font-medium">{t.hero.pitch}</p>
                <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-ink/65" dangerouslySetInnerHTML={{ __html: t.hero.subtitle.replace(/<highlight>(.*?)<\/highlight>/g, '<span class="text-ink font-medium">$1</span>') }} />
                <div className="mt-7 inline-flex flex-col gap-2 border-y border-gold/35 px-2 py-4">
                    <span className="text-sm font-semibold text-vermillon dark:text-[#e98c70]">{t.hero.cta}</span>
                    <span className="text-xs sm:text-sm text-ink/65">{t.hero.mobility}</span>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3">
                    {technologies.map(({ name, icon: Icon }) => <span key={name} className="flex items-center gap-2 text-xs text-ink/65"><Icon className="text-gold" aria-hidden="true" />{name}</span>)}
                </div>
                <a href="#projects" aria-label={t.hero.scrollProjects} className="mt-9 inline-flex items-center gap-3 py-3 text-xs uppercase tracking-[.18em] text-ink/70 hover:text-vermillon transition-colors">{t.hero.discover}<HiArrowDown className="h-4 w-4" aria-hidden="true" /></a>
            </div>
        </section>
    );
}
