'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiSpring, SiDocker, SiNestjs, SiOpenjdk } from 'react-icons/si';
import { HiArrowDown } from 'react-icons/hi';
import { useLanguage, fr, en } from '@/lib/i18n';
import InkLandscape from './InkLandscape';
import BatmanSpeechBubble from './BatmanSpeechBubble';
import './ink-landscape.css';
import './batman-visitor.css';

type BatmanPose = 'idle' | 'walk' | 'box' | 'laptop';
type BatmanPhase = 'away' | 'entering' | 'visiting' | 'leaving';
type BatmanLine = 'csharp' | 'java' | 'php' | 'javascript' | 'laptop' | 'admit' | 'box' | 'boxSize' | 'boxOffice' | 'boxWrong';
type BatmanVisit = { phase: BatmanPhase; pose: BatmanPose; quote: BatmanLine | null };

const batmanLines: Record<BatmanLine, { fr: string; en: string }> = {
    csharp: { fr: 'C# est meilleur\nque Java. Voilà.', en: 'C# is better\nthan Java. Period.' },
    java: { fr: 'Java a ses qualités.\nJ’imagine.', en: 'Java has its merits.\nI suppose.' },
    php: { fr: 'PHP est meilleur\nque JavaScript. Oui.', en: 'PHP is better\nthan JavaScript. Yep.' },
    javascript: { fr: 'JavaScript ?\nOn en reparle.', en: 'JavaScript?\nWe’ll talk later.' },
    laptop: { fr: 'Mon PC portable\na toujours raison.', en: 'My laptop\nis always right.' },
    admit: { fr: 'Bon... j’avais tort.\nÇa arrive. Rarement.', en: 'Fine... I was wrong.\nIt happens. Rarely.' },
    box: { fr: 'Ce carton ?\nMon nouveau bureau.', en: 'This box?\nMy new office.' },
    boxSize: { fr: 'Trop petit ?\n... Tu as raison.', en: 'Too small?\n... You’re right.' },
    boxOffice: { fr: 'Le meilleur IDE ?\nUn carton.', en: 'The best IDE?\nA cardboard box.' },
    boxWrong: { fr: 'Je rentre dedans.\n... Ah, non.', en: 'I can fit in there.\n... Oh, no.' },
};
const batmanDialogues: Record<'box' | 'laptop', [BatmanLine, BatmanLine][]> = {
    laptop: [['csharp', 'java'], ['php', 'javascript'], ['laptop', 'admit']],
    box: [['box', 'boxSize'], ['boxOffice', 'boxWrong']],
};
const batmanFrames: Record<BatmanPose, number[]> = {
    idle: [0],
    walk: [0, 1],
    box: [0, 0, 0, 0, 1],
    laptop: [0, 1],
};
const batmanFrameDelay: Record<BatmanPose, number> = {
    idle: 1000,
    walk: 320,
    box: 420,
    laptop: 650,
};
const batmanSprite = (pose: BatmanPose, frame: number) =>
    `/pip/batman/${pose}/${String(frame).padStart(2, '0')}.webp`;

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
    const [batmanFrame, setBatmanFrame] = useState({ pose: 'idle' as BatmanPose, index: 0 });

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
        // Decode the small sprite set before Batman's first visit.
        (['idle', 'walk', 'box', 'laptop'] as BatmanPose[]).forEach(pose => {
            for (const frame of new Set(batmanFrames[pose])) {
                const image = new window.Image();
                image.src = batmanSprite(pose, frame);
            }
        });
    }, []);

    useEffect(() => {
        const sequence = batmanFrames[batman.pose];
        if (batman.phase === 'away' || sequence.length === 1) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        let interval: ReturnType<typeof setInterval> | undefined;
        const sync = () => {
            clearInterval(interval);
            if (reduced.matches || document.hidden) return;
            interval = setInterval(() => setBatmanFrame(previous => ({
                pose: batman.pose,
                index: previous.pose === batman.pose ? (previous.index + 1) % sequence.length : 1 % sequence.length,
            })), batmanFrameDelay[batman.pose]);
        };
        sync();
        reduced.addEventListener('change', sync);
        document.addEventListener('visibilitychange', sync);
        return () => {
            clearInterval(interval);
            reduced.removeEventListener('change', sync);
            document.removeEventListener('visibilitychange', sync);
        };
    }, [batman.phase, batman.pose]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let inView = false;
        let visiting = false;
        let visitTimer: ReturnType<typeof setTimeout>;
        const sceneTimers: ReturnType<typeof setTimeout>[] = [];
        let nextVisitAt = Date.now() + 15_000 + Math.random() * 15_000;
        let manualInviteUntil = 0;

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
                startVisit();
            }, Math.max(0, nextVisitAt - Date.now()));
        };

        const startVisit = () => {
            if (!inView || document.hidden || visiting || !pipIsHome()) return false;
            clearTimeout(visitTimer);
            manualInviteUntil = 0;
            visiting = true;
            const activity: 'box' | 'laptop' = Math.random() < 0.5 ? 'box' : 'laptop';
            const dialogues = batmanDialogues[activity];
            const [firstLine, secondLine] = dialogues[Math.floor(Math.random() * dialogues.length)];
            setBatman({ phase: 'entering', pose: 'walk', quote: null });
            sceneTimers.push(setTimeout(() => {
                setBatman({ phase: 'visiting', pose: activity, quote: firstLine });
            }, 1_900));
            sceneTimers.push(setTimeout(() => {
                setBatman({ phase: 'visiting', pose: activity, quote: secondLine });
            }, 5_000));
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
            return true;
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
            if (inView) {
                if (Date.now() < manualInviteUntil) startVisit();
                scheduleVisit();
            }
            else hideBatman();
        }, { threshold: 0.15 });
        const onVisibilityChange = () => {
            if (document.hidden) hideBatman();
            else scheduleVisit();
        };
        const onPipHome = () => {
            if (Date.now() < manualInviteUntil) {
                startVisit();
                return;
            }
            if (Date.now() >= nextVisitAt && Math.random() < 0.3) startVisit();
        };
        const onBatmanInvite = () => {
            if (visiting) return;
            if (!startVisit()) manualInviteUntil = Date.now() + 15_000;
        };

        observer.observe(section);
        document.addEventListener('visibilitychange', onVisibilityChange);
        window.addEventListener('pip:home', onPipHome);
        window.addEventListener('batman:visit', onBatmanInvite);
        return () => {
            observer.disconnect();
            document.removeEventListener('visibilitychange', onVisibilityChange);
            window.removeEventListener('pip:home', onPipHome);
            window.removeEventListener('batman:visit', onBatmanInvite);
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

    const currentBatmanFrame = batmanFrame.pose === batman.pose
        ? batmanFrames[batman.pose][batmanFrame.index % batmanFrames[batman.pose].length] : 0;

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
                                <BatmanSpeechBubble key={batman.quote} text={batmanLines[batman.quote][lang]}
                                    className="absolute bottom-[90%] left-1/2 z-10 -translate-x-1/2" />
                            )}
                            <span className={`batman-travel block ${batman.phase === 'away' || batman.phase === 'leaving' ? 'opacity-0' : 'opacity-100'}`}
                                style={{ transform: `translateX(${batman.phase === 'entering' || batman.phase === 'visiting' ? 0 : theme === 'dark' ? -80 : 80}px)` }}>
                                <span className={`block ${theme === 'dark' && batman.pose === 'walk' ? '-scale-x-100' : ''}`}>
                                    <Image src={batmanSprite(batman.pose, currentBatmanFrame)} unoptimized
                                        alt="" title="Batman"
                                        width={384} height={384} priority
                                        data-batman-pose={batman.pose}
                                        data-batman-frame={currentBatmanFrame}
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
