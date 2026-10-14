'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiSpring, SiDocker, SiNestjs, SiOpenjdk } from 'react-icons/si';
import { HiArrowDown } from 'react-icons/hi';
import { useLanguage, fr, en } from '@/lib/i18n';
import InkLandscape from './InkLandscape';
import './ink-landscape.css';
import './batman-visitor.css';

type BatmanPose = 'idle' | 'walk' | 'box' | 'laptop';
type BatmanPhase = 'away' | 'entering' | 'visiting' | 'leaving';
type BatmanVisit = { phase: BatmanPhase; pose: BatmanPose; quote: string | null };

const batmanOpinions = ['C# > Java', 'PHP > JavaScript'];

const technologies = [
    { name: 'React', icon: SiReact }, { name: 'Next.js', icon: SiNextdotjs },
    { name: 'TypeScript', icon: SiTypescript }, { name: 'NestJS', icon: SiNestjs },
    { name: 'Node.js', icon: SiNodedotjs }, { name: 'Java', icon: SiOpenjdk },
    { name: 'Spring Boot', icon: SiSpring }, { name: 'Docker', icon: SiDocker },
];

export default function Hero() {
    const { lang } = useLanguage();
    const { theme } = useTheme();
    const t = lang === 'fr' ? fr : en;
    const sectionRef = useRef<HTMLElement>(null);
    const [batman, setBatman] = useState<BatmanVisit>({ phase: 'away', pose: 'idle', quote: null });

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        let visible = false;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => {
            const running = visible && !document.hidden && !reduced.matches;
            section.dataset.running = String(running);
        };
        reduced.addEventListener('change', update);
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
        observer.observe(section);
        document.addEventListener('visibilitychange', update);
        return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); reduced.removeEventListener('change', update); };
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let inView = false;
        let visiting = false;
        let visitTimer: ReturnType<typeof setTimeout>;
        const sceneTimers: ReturnType<typeof setTimeout>[] = [];
        let nextVisitAt = Date.now() + 15_000 + Math.random() * 15_000;

        const pipIsHome = () => {
            const home = section.querySelector('[data-pip-home]')?.getBoundingClientRect();
            const pip = document.querySelector('[data-pip-pose]')?.getBoundingClientRect();
            if (!home || !pip) return false;
            return Math.abs(pip.left - home.left) < home.width
                && Math.abs(pip.top - home.top) < home.height;
        };

        const scheduleVisit = () => {
            clearTimeout(visitTimer);
            if (!inView || document.hidden || visiting) return;
            visitTimer = setTimeout(() => {
                if (!pipIsHome()) {
                    nextVisitAt = Date.now() + 15_000;
                    scheduleVisit();
                    return;
                }
                visiting = true;
                const activity: BatmanPose = Math.random() < 0.5 ? 'box' : 'laptop';
                const quote = activity === 'laptop'
                    ? batmanOpinions[Math.floor(Math.random() * batmanOpinions.length)] : null;
                setBatman({ phase: 'entering', pose: 'walk', quote: null });
                sceneTimers.push(setTimeout(() => {
                    setBatman({ phase: 'visiting', pose: activity, quote });
                }, 1_900));
                sceneTimers.push(setTimeout(() => {
                    setBatman({ phase: 'leaving', pose: 'walk', quote: null });
                }, 8_400));
                sceneTimers.push(setTimeout(() => {
                    visiting = false;
                    setBatman({ phase: 'away', pose: 'idle', quote: null });
                    sceneTimers.length = 0;
                    nextVisitAt = Date.now() + 120_000 + Math.random() * 120_000;
                    scheduleVisit();
                }, 10_300));
            }, Math.max(0, nextVisitAt - Date.now()));
        };

        const hideBatman = () => {
            clearTimeout(visitTimer);
            sceneTimers.forEach(clearTimeout);
            sceneTimers.length = 0;
            if (visiting) nextVisitAt = Date.now() + 120_000 + Math.random() * 120_000;
            visiting = false;
            setBatman({ phase: 'away', pose: 'idle', quote: null });
        };

        const observer = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            if (inView) scheduleVisit();
            else hideBatman();
        }, { threshold: 0.15 });
        const onVisibilityChange = () => {
            if (document.hidden) hideBatman();
            else scheduleVisit();
        };

        observer.observe(section);
        document.addEventListener('visibilitychange', onVisibilityChange);
        return () => {
            observer.disconnect();
            document.removeEventListener('visibilitychange', onVisibilityChange);
            clearTimeout(visitTimer);
            sceneTimers.forEach(clearTimeout);
        };
    }, []);

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
                <p className="mb-7 inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-vermillon/30 bg-vermillon/10 text-[10px] sm:text-xs font-medium tracking-[.08em] sm:tracking-[.25em] uppercase text-balance text-vermillon dark:text-[#e98c70]">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-vermillon opacity-75 motion-safe:animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-vermillon" />
                    </span>
                    {t.hero.badge}
                </p>
                <h1 className="font-display text-ink tracking-tight leading-[1.02]">
                    <span className="block text-[clamp(1.6rem,3vw,2.6rem)] font-normal tracking-[.12em] text-ink/60">William Kim</span>
                    <span className="mt-1 block text-[clamp(4rem,7.5vw,6.5rem)] font-bold"><span className="relative inline-block">HACH
                        <span data-pip-home aria-hidden="true" style={{ width: 'clamp(52px, 5.5vw, 76px)', aspectRatio: '192 / 208' }} className={`absolute top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'left-full ml-1 sm:ml-4' : 'right-full mr-1 sm:mr-4'}`} />
                        <span aria-hidden="true" data-batman-phase={batman.phase}
                            style={{ width: 'clamp(48px, 5.3vw, 72px)' }}
                            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'right-full mr-1 sm:mr-4' : 'left-full ml-1 sm:ml-4'}`}>
                            {batman.quote && (
                                <span className={`absolute bottom-full mb-1 w-max max-w-[140px] rounded-full border border-ink/20 bg-washi px-2 py-1 font-sans text-[10px] font-semibold leading-tight text-ink shadow-sm ${theme === 'dark' ? 'left-0' : 'right-0'}`}>
                                    {batman.quote}
                                </span>
                            )}
                            <span className={`batman-travel block ${batman.phase === 'away' || batman.phase === 'leaving' ? 'opacity-0' : 'opacity-100'}`}
                                style={{ transform: `translateX(${batman.phase === 'entering' || batman.phase === 'visiting' ? 0 : theme === 'dark' ? -80 : 80}px)` }}>
                                <span className={`block ${theme === 'dark' && batman.pose === 'walk' ? '-scale-x-100' : ''}`}>
                                    <Image src={batman.pose === 'idle' ? '/pip/batman.webp' : `/pip/batman-${batman.pose}.webp`}
                                        alt="" title="Batman"
                                        width={384} height={384} priority
                                        data-batman-pose={batman.pose}
                                        className="batman-sprite h-auto w-full drop-shadow-sm" />
                                </span>
                            </span>
                        </span>
                    </span></span>
                </h1>
                <div className="mx-auto my-7 h-px w-20 bg-vermillon/65" />
                <p className="mx-auto max-w-xl text-lg sm:text-xl leading-relaxed font-medium text-balance">{t.hero.pitch}</p>
                <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-ink/65 text-balance" dangerouslySetInnerHTML={{ __html: t.hero.subtitle.replace(/<highlight>(.*?)<\/highlight>/g, '<span class="text-ink font-medium">$1</span>') }} />
                <p className="mx-auto mt-1 max-w-xl text-xs sm:text-sm text-ink/50">{t.hero.subtitleDetail}</p>
                <div className="mt-7 inline-flex flex-col gap-2 border-y border-gold/35 px-2 py-4">
                    <span className="text-sm font-semibold text-vermillon dark:text-[#e98c70] text-balance">{t.hero.cta}</span>
                    <span className="text-xs sm:text-sm text-ink/65 text-balance">{t.hero.mobility}</span>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3">
                    {technologies.map(({ name, icon: Icon }) => <span key={name} className="flex items-center gap-2 text-xs text-ink/65"><Icon className="text-gold" aria-hidden="true" />{name}</span>)}
                </div>
                <a href="#projects" aria-label={t.hero.scrollProjects} className="mt-9 inline-flex items-center gap-3 py-3 text-xs uppercase tracking-[.18em] text-ink/70 hover:text-vermillon dark:hover:text-[#e98c70] transition-colors">{t.hero.discover}<HiArrowDown className="h-4 w-4" aria-hidden="true" /></a>
            </div>
        </section>
    );
}
