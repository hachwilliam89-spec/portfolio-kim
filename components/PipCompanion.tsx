'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { languageEvent, useLanguage } from '@/lib/i18n';

type Pose = 'idle' | 'sleep' | 'eat' | 'roll' | 'wave' | 'edge' | 'run-left' | 'run-right' | 'look' | 'groom' | 'work'
    | 'travel-roll' | 'hurry' | 'stretch' | 'moon-look' | 'wake' | 'yawn' | 'doze' | 'dizzy' | 'roll-dizzy' | 'digest' | 'think' | 'work-tired' | 'rise';
type Spot = { x: number; y: number; size: number };
type Phase = 'unplaced' | 'home' | 'leaving' | 'corner' | 'returning' | 'scene';
type SceneDecoration = { kind: 'leaf' | 'star'; x: number; y: number; endX: number; endY: number };
const spriteRatio = 208 / 192;
const travelEase = [0.42, 0, 0.25, 1] as const;

function clamp(value: number, minimum: number, maximum: number) {
    return Math.max(minimum, Math.min(maximum, value));
}

function petSize(viewportWidth: number) {
    return clamp(viewportWidth * 0.055, 52, 76);
}

// 14–16 are new drawings between the head-down and back-down poses.
const rollFrames = [0, 0, 1, 2, 3, 4, 14, 15, 16, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13];
// Keep consecutive tumbles moving, without repeating the resting/dust frames.
const travelRollFrames = [0, 1, 2, 3, 4, 14, 15, 16, 5, 6, 7, 8, 9, 10, 11];
const frames: Record<Pose, number[]> = {
    idle: [0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 0, 0, 0],
    // Breathing back, an ear twitch now and then, and a turn onto the other side.
    sleep: [
        0, 4, 8, 5, 1, 3, 6, 4, 2, 5, 7, 3, 0, 4, 8, 5, 1, 9, 10, 9, 2, 5, 7, 3, 0, 4, 8, 5, 1, 3, 6, 4, 2,
        5, 7, 3, 0, 4, 8, 5, 1, 3, 6, 4, 2, 5, 7, 3, 8, 19, 11, 15, 19, 16, 12, 14, 17, 15, 13, 16, 18, 14,
        11, 15, 19, 16, 12, 20, 21, 20, 13, 16, 18, 14, 11, 15, 19, 16, 12, 14, 17, 15, 13, 16, 18, 14, 11,
        15, 19, 16, 12, 14, 17, 15, 13, 16, 18, 14, 19, 8,
    ],
    eat: [1, 2, 3, 4, 5],
    // Crouch, a forward roll with a little hop, then a landing in a puff of dust.
    roll: rollFrames,
    'travel-roll': travelRollFrames,
    hurry: [0],
    wave: [0, 1, 2, 3],
    edge: [0, 1, 2, 3, 4, 5],
    'run-left': [0, 1, 2, 3, 4, 5, 6, 7],
    'run-right': [0, 1, 2, 3, 4, 5, 6, 7],
    look: [0, 1, 2, 2, 1, 0, 15, 14, 14, 15, 0],
    groom: [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0],
    work: [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0],
    // Same typing, with heavy eyelids.
    'work-tired': [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0],
    // Eyes up, thinking dots appear one by one.
    think: [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    // Paws leave the laptop and stretch overhead, a contented "ahh", then eyes open.
    stretch: [0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 4, 5, 5, 5, 5, 4, 3, 3, 2, 2, 1, 1, 0, 0, 7, 6, 6, 6, 6],
    // Moonlight twinkles in his eyes.
    'moon-look': [0, 2, 4, 5, 4, 5, 3, 1],
    // Rubs his eyes with both paws, then they open with a sleepy blink.
    wake: [0, 0, 1, 2, 3, 4, 5, 4, 3, 4, 5, 4, 3, 2, 1, 6, 6, 6, 7, 8, 8, 6, 8, 8, 8],
    // Falling asleep: eyelids grow heavy, a head nod, a start, a small yawn,
    // then Pip closes the laptop and lies down on it before the sleep loop.
    doze: [
        0, 0, 0, 0, 0, 1, 2, 3, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 8, 9, 9, 9, 9, 10, 0, 0, 0, 3, 3, 3, 4,
        5, 6, 6, 11, 12, 13, 13, 13, 13, 14, 6, 6, 5, 5, 6, 6, 6, 7, 8, 9, 9, 9, 9, 9, 9, 15, 15, 15, 15, 15,
        15, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18,
    ],
    // Day mode while asleep: he sits back up at his laptop (falling asleep, backwards).
    rise: [18, 18, 18, 17, 17, 17, 16, 16, 16, 16, 15, 15, 15],
    // Woken up: paws leave the laptop and stretch overhead during a big yawn,
    // come back down, then the eyes open with one sleepy blink.
    yawn: [
        15, 0, 1, 1, 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 8, 8, 9, 8, 8, 9, 9, 10, 11, 11, 12, 13, 13, 14, 13, 14,
        15, 15, 15, 17, 16, 16, 16, 17, 15, 17, 16, 16, 16, 16,
    ],
    // Spiral eyes, stars around the head, a little wobble.
    dizzy: [0, 1, 2, 3, 4, 5, 6, 7],
    'roll-dizzy': [0, 1, 2, 3, 4, 5, 6, 7],
    // After a meal: pats his round tummy, hiccups, smiles.
    digest: [0, 1, 0, 1, 0, 1, 0, 0, 2, 2, 0, 0, 1, 0, 1, 0, 3, 3, 3, 3, 3, 3],
};
const frameDelays: Partial<Record<Pose, number>> = {
    'run-left': 90, 'run-right': 90, edge: 120, idle: 340, sleep: 520, look: 280, 'moon-look': 280,
    work: 180, 'work-tired': 200, groom: 220, wake: 90, yawn: 90, stretch: 100, doze: 90, roll: 54,
    dizzy: 90, 'roll-dizzy': 90, digest: 140, think: 200, rise: 110,
};
const delayFor = (pose: Pose) => frameDelays[pose] ?? 180;
// One-shot animations end just before their sequence would loop to its first frame.
const playTime = (pose: Pose) => frames[pose].length * delayFor(pose) - 40;
const wakeDuration = playTime('wake');
const yawnDuration = playTime('yawn');
const stretchDuration = playTime('stretch');
const dozeDuration = playTime('doze');
const rollDuration = playTime('roll');
const rollCrouch = 2 * delayFor('roll');
const laptopStowDuration = 400;
const hurryDuration = 240;
const digestDuration = playTime('digest');
const thinkDuration = playTime('think');
const riseDuration = playTime('rise');
const dizzyDuration = 1500;
// The tummy rounds out a little more every few seconds while Pip eats.
const bellyStep = 2500;
const bellyLevels = [1, 2, 3, 4, 5, 6];
// The wave sprites are drawn slightly shorter and wider than the idle ones:
// match the head and the ground line so greeting doesn't make Pip hop.
const waveRegistration = { transformOrigin: '49.2% 7.7%', transform: 'translateX(.26%) scale(.978, 1.027)' };
// Generated sets are WebP; the original drawings stay PNG.
const webpDirectories = new Set(['yawn', 'stretch', 'doze', 'wake2', 'typetired', 'think', 'roll2', 'rolldizzy', 'dizzy',
    'nap', 'digest', 'moonlook', 'gaze', 'roll-inbetweens', ...bellyLevels.map(level => `eat-${level}`)]);
const spriteDirectories: Partial<Record<Pose, string>> = {
    'moon-look': 'moonlook', wake: 'wake2', work: 'type', 'work-tired': 'typetired', roll: 'roll2',
    'travel-roll': 'roll2', 'roll-dizzy': 'rolldizzy', sleep: 'nap', rise: 'doze', hurry: 'gaze',
};
// Nose of each sleeping image (the last 11 are mirrored), where the bubble grows.
const napNoses = [[88.6, 151],  [88.6, 151],  [88.6, 151],  [90.3, 152],  [90.3, 152],  [90.3, 152],  [89.5, 151],  [89.5, 151],  [89.5, 151],  [88.6, 151],  [90.3, 152],  [103.4, 151],  [103.4, 151],  [103.4, 151],  [101.7, 152],  [101.7, 152],  [101.7, 152],  [102.5, 151],  [102.5, 151],  [102.5, 151],  [103.4, 151],  [101.7, 152]];

// Eye anchors in each 192 × 208 typing sprite. Apply the same discrete frame
// change to the glasses: tweening here would make them slide across the face.
const workEyeAnchors = [
    [66, 89, 122, 89],
    [66, 89, 122, 89],
    [72, 89, 128, 78],
    [71, 87, 122, 73],
    [63, 85, 120, 84],
    [69, 92, 122, 92],
] as const;

function glassesTransform(frame: number) {
    const [leftX, leftY, rightX, rightY] = workEyeAnchors[frame];
    const a = (rightX - leftX) / 60;
    const b = (rightY - leftY) / 60;
    // The untransformed lens centers are (65.5, 87.5) and (125.5, 87.5).
    return `matrix(${a} ${b} ${-b} ${a} ${leftX - a * 65.5 + b * 87.5} ${leftY - b * 65.5 - a * 87.5})`;
}

function spriteFile(directory: string, frame: number) {
    return `/pip/${directory}/${String(frame).padStart(2, '0')}.${webpDirectories.has(directory) ? 'webp' : 'png'}`;
}

function spriteSource(pose: Pose, frame: number, belly = 0) {
    if ((pose === 'roll' || pose === 'travel-roll') && frame >= 14) {
        return spriteFile('roll-inbetweens', frame - 14);
    }
    return spriteFile(pose === 'eat' && belly > 0 ? `eat-${belly}` : spriteDirectories[pose] ?? pose, frame);
}

// Minutes from midnight, using the visitor's local clock.
const meals = [
    [7 * 60, 9 * 60],
    [12 * 60, 13 * 60],
    [16 * 60, 17 * 60],
    [19 * 60, 20 * 60],
];

function inMealWindow(now: number) {
    const date = new Date(now);
    const minutes = date.getHours() * 60 + date.getMinutes();
    return meals.some(([start, end]) => minutes >= start && minutes < end);
}

export default function PipCompanion() {
    const screenGlowId = useId();
    const controls = useAnimationControls();
    const { theme } = useTheme();
    const { lang } = useLanguage();
    const [now, setNow] = useState<number | null>(null);
    const [idleSince, setIdleSince] = useState(0);
    const [width, setWidth] = useState(0);
    const [action, setAction] = useState<Pose | null>(null);
    const [workPhase, setWorkPhase] = useState(false);
    const [belly, setBelly] = useState(0);
    const [rollMirror, setRollMirror] = useState(false);
    const [gaze, setGaze] = useState<number | null>(null);
    const [stowingLaptop, setStowingLaptop] = useState(false);
    const [dust, setDust] = useState(0);
    const [bubble, setBubble] = useState(0);
    const [frame, setFrame] = useState({ pose: 'idle' as Pose, index: 0 });
    const [offset, setOffset] = useState(0);
    const [placement, setPlacement] = useState<Spot | null>(null);
    const [movingPose, setMovingPose] = useState<Pose | null>(null);
    const [atCorner, setAtCorner] = useState(false);
    const [facingLeftEdge, setFacingLeftEdge] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [visible, setVisible] = useState(true);
    const [scene, setScene] = useState<'bamboo' | 'moon' | null>(null);
    const [decoration, setDecoration] = useState<SceneDecoration | null>(null);
    const actionRef = useRef<Pose | null>(null);
    const actionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const phaseRef = useRef<Phase>('unplaced');
    const sideRef = useRef<'left' | 'right'>('left');
    const routeRef = useRef(0);
    const habitTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
    const habitRunning = useRef(false);
    const clickCount = useRef(0);
    const nightCount = useRef(0);
    const nightTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
    const nightRunning = useRef(false);
    const sceneCooldown = useRef(0);
    const pressedWhileSleeping = useRef(false);
    const recentClicks = useRef<number[]>([]);
    const workSessions = useRef(0);
    const poseRef = useRef<Pose>('idle');
    const riseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const setTemporaryAction = useCallback((pose: Pose, duration: number) => {
        if (actionTimer.current) clearTimeout(actionTimer.current);
        actionRef.current = pose;
        setFrame({ pose, index: 0 });
        setAction(pose);
        actionTimer.current = setTimeout(() => {
            actionRef.current = null;
            setAction(null);
            actionTimer.current = null;
        }, duration);
    }, []);

    const cancelHabit = useCallback(() => {
        habitTimers.current.forEach(clearTimeout);
        habitTimers.current = [];
        if (!habitRunning.current) return;
        habitRunning.current = false;
        if (actionTimer.current) clearTimeout(actionTimer.current);
        actionRef.current = null;
        setAction(null);
        setOffset(0);
    }, []);

    const cancelNight = useCallback(() => {
        nightTimers.current.forEach(clearTimeout);
        nightTimers.current = [];
        if (!nightRunning.current) return;
        nightRunning.current = false;
        setStowingLaptop(false);
        if (actionTimer.current) clearTimeout(actionTimer.current);
        actionRef.current = null;
        setAction(null);
    }, []);

    useEffect(() => {
        // Decode every frame ahead of its first use, a few at a time while the browser is idle.
        const sources = [
            '/pip/laptop.svg',
            ...Object.entries(frames).flatMap(([pose, sequence]) =>
                [...new Set(sequence)].map(index => spriteSource(pose as Pose, index))),
            ...bellyLevels.flatMap(level => [...new Set(frames.eat)].map(index => spriteSource('eat', index, level))),
            ...Array.from({ length: 8 }, (_, index) => spriteFile('gaze', index)),
        ];
        const images: HTMLImageElement[] = [];
        const canIdle = typeof window.requestIdleCallback === 'function';
        let next = 0;
        let handle = 0;
        const later = (run: () => void) => canIdle
            ? window.requestIdleCallback(run, { timeout: 1200 }) : window.setTimeout(run, 120);
        const load = () => {
            sources.slice(next, next + 10).forEach(source => {
                const image = new window.Image();
                image.decoding = 'async';
                image.src = source;
                void image.decode().catch(() => {});
                images.push(image);
            });
            next += 10;
            if (next < sources.length) handle = later(load);
        };
        handle = later(load);
        return () => {
            if (canIdle) window.cancelIdleCallback(handle);
            else window.clearTimeout(handle);
            images.forEach(image => { image.src = ''; });
        };
    }, []);

    useEffect(() => {
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReducedMotion(motionPreference.matches);
        update();
        motionPreference.addEventListener('change', update);
        return () => motionPreference.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        const updateWidth = () => setWidth(window.innerWidth);
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    useEffect(() => {
        if (width === 0) return;
        let scrollFrame = 0;
        let sceneDue = Date.now() + 22_000 + Math.random() * 8000;
        let sceneHasTravel = false;
        let pauseTimer: ReturnType<typeof setTimeout> | undefined;
        let resolvePause: (() => void) | undefined;
        const clearScene = () => {
            clearTimeout(pauseTimer);
            resolvePause?.();
            resolvePause = undefined;
            setScene(null);
            setDecoration(null);
        };
        const pause = (ms: number) => new Promise<void>(resolve => {
            resolvePause = resolve;
            pauseTimer = setTimeout(() => { resolvePause = undefined; resolve(); }, ms);
        });
        const routeToken = routeRef;
        const homeSize = petSize(width);
        const cornerSize = homeSize;
        const homeSpot = (): Spot | null => {
            const anchor = document.querySelector<HTMLElement>('[data-pip-home]');
            if (!anchor) return null;
            const rect = anchor.getBoundingClientRect();
            return {
                x: clamp(rect.left, 4, window.innerWidth - homeSize - 4),
                y: rect.top,
                size: homeSize,
            };
        };
        const homeVisible = (home: Spot | null) => home !== null
            && home.y > 90
            && home.y < window.innerHeight - home.size * spriteRatio - 24;
        const edgeSpot = (): Spot => {
            // Narrow layouts have no empty column beside the cards. Pip peeks
            // in from the frame instead of covering their text and controls.
            const gutter = window.innerWidth > 1152 ? (window.innerWidth - 1152) / 2 + 16 : 16;
            const visiblePart = clamp(gutter + 12, 42, cornerSize);
            return {
                x: sideRef.current === 'left' ? visiblePart - cornerSize : window.innerWidth - visiblePart,
                y: window.innerHeight - cornerSize * spriteRatio - 20,
                size: cornerSize,
            };
        };
        const currentSpot = (): Spot => {
            const rect = buttonRef.current?.getBoundingClientRect();
            return rect ? { x: rect.left, y: rect.top, size: rect.width } : homeSpot() ?? edgeSpot();
        };
        const place = (spot: Spot) => {
            controls.set({ x: spot.x, y: spot.y, width: spot.size, height: spot.size * spriteRatio });
            if (!buttonRef.current) setPlacement(spot);
        };
        const durationFor = (distance: number, speed: number) => clamp(distance / speed, 0.5, 4);
        let lastScrollY = window.scrollY;
        let lastScrollTime = performance.now();
        let scrollSpeed = 0;
        let lastDownScroll = 0;
        let cancelRouteAnimation: (() => void) | undefined;
        // A single clock drives both the sprite and its position. Each turn
        // covers roughly two body widths, with time to crouch and settle.
        // Scrolling changes the tempo, but never leaves him frozen mid-route.
        const rollTo = (target: Spot, route: number,
            { destinationFor, stashLaptop = false, scrollPaced = false }:
                { destinationFor?: () => Spot; stashLaptop?: boolean; scrollPaced?: boolean } = {}): Promise<boolean> => {
            cancelRouteAnimation?.();
            const start = currentSpot();
            const distance = Math.abs(target.x - start.x);
            const length = Math.hypot(target.x - start.x, target.y - start.y);
            if (reducedMotion || length < 6) {
                place(target);
                return Promise.resolve(route === routeRef.current);
            }
            const anticipation = stashLaptop ? hurryDuration : 0;
            setStowingLaptop(false);
            setRollMirror(target.x < start.x);
            setMovingPose(anticipation ? 'hurry' : 'travel-roll');
            setFrame({ pose: anticipation ? 'hurry' : 'travel-roll', index: 0 });
            const turns = Math.max(1, Math.round((scrollPaced ? length : distance) / (target.size * 2)));
            const duration = turns * clamp(distance / turns / 230 + .24, .56, .96) * 1000;
            // Scrolling about 1.3 times the path keeps him rolling all the way.
            const scrollStart = window.scrollY;
            const scrollRange = Math.max(length * 1.3, window.innerHeight * .6);
            return new Promise(resolve => {
                let animationFrame = 0;
                let started: number | undefined;
                let previousIndex = -1;
                let previousTime: number | undefined;
                // Tumbles done so far, and their tempo in tumbles per second.
                let rolled = 0;
                let tempo = 1.15;
                let scrolledTurns = 0;
                // Momentum decays smoothly after a scroll burst. Brake during the
                // last tumble, while retaining enough speed to complete the pose.
                const followScroll = (time: number) => {
                    const dt = Math.min((time - (previousTime ?? time)) / 1000, .05);
                    previousTime = time;
                    scrolledTurns = Math.max(scrolledTurns, clamp((window.scrollY - scrollStart) / scrollRange, 0, 1) * turns);
                    const ahead = Math.max(0, scrolledTurns - rolled);
                    const momentum = scrollSpeed * Math.exp(-Math.max(0, time - lastDownScroll) / 420);
                    const urgency = clamp(momentum / 1800 + ahead * .2, 0, 1);
                    const arrival = clamp((turns - rolled) / .7, 0, 1);
                    const wanted = 1.05 + (.2 + urgency * .9) * arrival;
                    tempo += (wanted - tempo) * (1 - Math.exp(-dt * 7));
                    rolled = Math.min(rolled + tempo * dt, turns);
                    return rolled / turns;
                };
                const preparation = anticipation + (stashLaptop ? laptopStowDuration : 0);
                let stowStarted = !stashLaptop;
                let stashed = !stashLaptop;
                const finish = (completed: boolean) => {
                    cancelAnimationFrame(animationFrame);
                    cancelRouteAnimation = undefined;
                    setStowingLaptop(false);
                    resolve(completed);
                };
                cancelRouteAnimation = () => finish(false);
                const tick = (time: number) => {
                    if (route !== routeRef.current) { finish(false); return; }
                    const destination = destinationFor?.() ?? target;
                    started ??= time;
                    const elapsed = time - started;
                    if (elapsed < anticipation) {
                        animationFrame = requestAnimationFrame(tick);
                        return;
                    }
                    if (!stowStarted) {
                        stowStarted = true;
                        setStowingLaptop(true);
                        setMovingPose('travel-roll');
                        setFrame({ pose: 'travel-roll', index: 0 });
                    }
                    if (elapsed < preparation) {
                        animationFrame = requestAnimationFrame(tick);
                        return;
                    }
                    if (!stashed) { stashed = true; setStowingLaptop(false); }
                    const progress = scrollPaced ? followScroll(time) : Math.min((elapsed - preparation) / duration, 1);
                    const turn = Math.min(Math.floor(progress * turns), turns - 1);
                    const local = progress === 1 ? 1 : progress * turns - turn;
                    // Travel during the tumble; hold position for the takeoff and landing.
                    const tumble = clamp((local - 1 / travelRollFrames.length) / (1 - 2 / travelRollFrames.length), 0, 1);
                    const eased = tumble * tumble * (3 - 2 * tumble);
                    const travel = (turn + eased) / turns;
                    controls.set({
                        x: start.x + (destination.x - start.x) * travel,
                        y: start.y + (destination.y - start.y) * travel,
                        width: target.size, height: target.size * spriteRatio,
                    });
                    const index = Math.min(Math.floor(local * travelRollFrames.length), travelRollFrames.length - 1);
                    if (index !== previousIndex) {
                        previousIndex = index;
                        setFrame({ pose: 'travel-roll', index });
                    }
                    if (progress === 1) finish(true);
                    else animationFrame = requestAnimationFrame(tick);
                };
                animationFrame = requestAnimationFrame(tick);
            });
        };
        // The title is still moving during smooth scroll: follow its measured
        // height while climbing, then begin the horizontal roll on that line.
        const climbHome = (route: number): Promise<Spot | null> => {
            const edge = edgeSpot();
            const start = currentSpot();
            return new Promise(resolve => {
                let animationFrame = 0;
                let previousTime: number | undefined;
                let x = start.x;
                let y = start.y;
                let speed = 0;
                const finish = (home: Spot | null) => {
                    cancelAnimationFrame(animationFrame);
                    cancelRouteAnimation = undefined;
                    resolve(home);
                };
                cancelRouteAnimation = () => finish(null);
                const tick = (time: number) => {
                    const home = homeSpot();
                    if (route !== routeRef.current || !home) { finish(null); return; }
                    const targetY = clamp(home.y, 96, edge.y);
                    const distance = Math.hypot(edge.x - x, targetY - y);
                    if (reducedMotion || distance < 1) {
                        controls.set({ x: edge.x, y: targetY });
                        finish(home);
                        return;
                    }
                    const dt = Math.min((time - (previousTime ?? time)) / 1000, .05);
                    previousTime = time;
                    speed = Math.min(190, speed + 650 * dt, Math.sqrt(1300 * distance));
                    const fraction = Math.min(speed * dt / distance, 1);
                    x += (edge.x - x) * fraction;
                    y += (targetY - y) * fraction;
                    controls.set({ x, y, width: edge.size, height: edge.size * spriteRatio });
                    animationFrame = requestAnimationFrame(tick);
                };
                animationFrame = requestAnimationFrame(tick);
            });
        };
        const skidPast = reducedMotion ? 0 : 7;
        const brake = async (x: number) => {
            if (reducedMotion) return;
            setDust(count => count + 1);
            await controls.start({ x, transition: { duration: .24, ease: 'easeOut' } });
        };

        const leaveHome = async () => {
            const stashLaptop = phaseRef.current === 'home';
            cancelNight();
            clearScene();
            cancelHabit();
            const route = ++routeRef.current;
            cancelRouteAnimation?.();
            controls.stop();
            if (returnTimer.current) clearTimeout(returnTimer.current);
            if (finishTimer.current) clearTimeout(finishTimer.current);
            if (actionTimer.current) clearTimeout(actionTimer.current);
            actionRef.current = null;
            setAction(null);
            setOffset(0);
            phaseRef.current = 'leaving';
            setAtCorner(false);
            // At the visitor's scrolling pace he tumbles down a gentle slope to
            // the side of the page, then lets himself down along the edge.
            const start = currentSpot();
            const edge = edgeSpot();
            const edgeY = clamp(start.y, 96, edge.y);
            const slopeEnd = { ...edge, y: edgeY + (edge.y - edgeY) * .25 };
            if (!await rollTo(slopeEnd, route, { stashLaptop, scrollPaced: true })) return;
            if (route !== routeRef.current) return;
            setMovingPose('edge');
            await controls.start({
                y: edge.y,
                transition: { duration: reducedMotion ? 0 : durationFor(Math.abs(edge.y - slopeEnd.y), 190), ease: travelEase },
            });
            if (route !== routeRef.current) return;
            phaseRef.current = 'corner';
            setMovingPose(null);
            setAtCorner(true);
        };

        const returnHome = async () => {
            cancelNight();
            clearScene();
            cancelHabit();
            const route = ++routeRef.current;
            cancelRouteAnimation?.();
            controls.stop();
            if (returnTimer.current) clearTimeout(returnTimer.current);
            if (finishTimer.current) clearTimeout(finishTimer.current);
            if (actionTimer.current) clearTimeout(actionTimer.current);
            actionRef.current = null;
            setAction(null);
            setOffset(0);
            phaseRef.current = 'returning';
            setAtCorner(false);
            const home = homeSpot();
            if (!home) return;
            setMovingPose('edge');
            const latestHome = await climbHome(route);
            if (!latestHome || route !== routeRef.current) return;
            if (!await rollTo(latestHome, route, { destinationFor: () => homeSpot() ?? latestHome })) return;
            if (route !== routeRef.current) return;
            phaseRef.current = 'home';
            setMovingPose(null);
            updatePosition();
        };

        const updatePosition = () => {
            const home = homeSpot();
            const onHero = homeVisible(home);
            if (phaseRef.current === 'unplaced') {
                sideRef.current = home && home.x + home.size / 2 > window.innerWidth / 2 ? 'right' : 'left';
                setFacingLeftEdge(sideRef.current === 'left');
                phaseRef.current = onHero ? 'home' : 'corner';
                setAtCorner(!onHero);
                place(onHero && home ? home : edgeSpot());
                return;
            }
            if (phaseRef.current === 'home') {
                if (onHero && home) place(home);
                else void leaveHome();
            } else if (phaseRef.current === 'corner') {
                if (onHero) void returnHome();
                else place(edgeSpot());
            } else if (phaseRef.current === 'leaving' && onHero) {
                void returnHome();
            } else if (phaseRef.current === 'returning' && !onHero) {
                void leaveHome();
            } else if (phaseRef.current === 'scene') {
                if (onHero && home && !sceneHasTravel) {
                    ++routeRef.current;
                    clearScene();
                    setMovingPose(null);
                    phaseRef.current = 'home';
                    place(home);
                } else if (onHero) void returnHome();
                else void leaveHome();
            }
        };
        const onScroll = () => {
            const time = performance.now();
            const delta = window.scrollY - lastScrollY;
            const dt = Math.max((time - lastScrollTime) / 1000, 1 / 120);
            if (delta > 0) {
                const previousSpeed = scrollSpeed * Math.exp(-(time - lastDownScroll) / 420);
                scrollSpeed = previousSpeed * .4 + Math.min(delta / dt, 4000) * .6;
                lastDownScroll = time;
            }
            lastScrollTime = time;
            lastScrollY = window.scrollY;
            cancelNight();
            sceneDue = Date.now() + 22_000 + Math.random() * 8000;
            cancelAnimationFrame(scrollFrame);
            scrollFrame = requestAnimationFrame(updatePosition);
        };
        const onActivity = () => {
            sceneDue = Date.now() + 22_000 + Math.random() * 8000;
            if (phaseRef.current === 'scene') updatePosition();
        };
        const onPointerMove = () => {
            // A cursor moving over the page postpones a scene, without chasing it.
            if (phaseRef.current !== 'scene') sceneDue = Date.now() + 25_000;
        };
        const point = (selector: string) => {
            const rect = document.querySelector(selector)?.getBoundingClientRect();
            return rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : null;
        };
        const playScene = async () => {
            if (reducedMotion || document.hidden || width < 1100 || window.innerHeight < 600
                || phaseRef.current !== 'home' || actionRef.current) return;
            const home = homeSpot();
            const content = document.querySelector('.hero-content')?.getBoundingClientRect();
            if (!homeVisible(home) || !home || !content) return;
            const rest = point('[data-pip-bamboo-rest]');
            const leaf = point('[data-pip-leaf-start]');
            const moon = document.querySelector('[data-pip-moon]')?.getBoundingClientRect();
            const target = rest ? { x: rest.x - homeSize / 2, y: rest.y - homeSize * spriteRatio } : null;
            // Use measured landscape anchors, and only a clear side column.
            if (theme === 'light' && (!target || !leaf || target.x < 12
                || target.x + homeSize > content.left - 16 || rest!.y > window.innerHeight - 16
                || target.y < home.y)) return;
            if (theme === 'dark' && (!moon || moon.width === 0 || moon.top < 90
                || moon.right > window.innerWidth - 16 || moon.bottom > window.innerHeight - 20)) return;
            cancelHabit();
            const route = ++routeRef.current;
            const active = () => route === routeRef.current;
            sceneCooldown.current = Date.now() + 90_000 + Math.random() * 30_000;
            phaseRef.current = 'scene';
            sceneHasTravel = theme === 'light';
            setScene(theme === 'dark' ? 'moon' : 'bamboo');
            setMovingPose(theme === 'dark' ? 'moon-look' : 'look');
            if (theme === 'dark' && moon) {
                setDecoration({ kind: 'star', x: moon.right + 3, y: moon.top + 8, endX: moon.right + 3, endY: moon.top + 8 });
                await pause(2600);
                if (!active()) return;
                setMovingPose('stretch');
                await pause(stretchDuration);
                if (!active()) return;
                clearScene();
                setMovingPose(null);
                phaseRef.current = 'home';
                return;
            }
            if (!target || !leaf || !rest) return;
            setDecoration({ kind: 'leaf', x: leaf.x, y: leaf.y, endX: rest.x, endY: rest.y - 8 });
            await pause(1000);
            if (!active()) return;
            const laneX = 6;
            const move = async (x: number, y: number, pose: Pose, skid = false) => {
                const start = currentSpot();
                setMovingPose(pose);
                const past = skid ? Math.sign(x - start.x) * skidPast : 0;
                await controls.start({ x: x + past, y, transition: {
                    duration: durationFor(Math.hypot(start.x - x, start.y - y), 200), ease: travelEase,
                } });
                if (skid) await brake(x);
            };
            await move(laneX, home.y, 'run-left');
            if (!active()) return;
            await move(laneX, target.y, 'edge');
            if (!active()) return;
            await move(target.x, target.y, 'run-right', true);
            if (!active()) return;
            setDecoration(null);
            setMovingPose('eat');
            await pause(4400);
            if (!active()) return;
            await move(laneX, target.y, 'run-left');
            if (!active()) return;
            void returnHome();
        };
        const sceneClock = window.setInterval(() => {
            if (Date.now() >= Math.max(sceneDue, sceneCooldown.current)) {
                sceneDue = Date.now() + 25_000;
                void playScene();
            }
        }, 1000);
        const onVisibility = () => {
            if (document.hidden) {
                ++routeRef.current;
                cancelRouteAnimation?.();
                controls.stop();
                clearScene();
                cancelHabit();
                cancelNight();
                setMovingPose(null);
                phaseRef.current = 'unplaced';
            } else {
                sceneDue = Date.now() + 25_000;
                updatePosition();
            }
        };
        phaseRef.current = 'unplaced';
        updatePosition();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        window.addEventListener('pointerdown', onActivity);
        window.addEventListener('keydown', onActivity);
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            ++routeToken.current;
            cancelRouteAnimation?.();
            controls.stop();
            cancelAnimationFrame(scrollFrame);
            clearInterval(sceneClock);
            clearScene();
            cancelNight();
            setMovingPose(null);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            window.removeEventListener('pointerdown', onActivity);
            window.removeEventListener('keydown', onActivity);
            window.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [cancelHabit, cancelNight, controls, reducedMotion, theme, width]);

    useEffect(() => {
        const start = Date.now();
        const initialFrame = requestAnimationFrame(() => {
            setNow(start);
            setIdleSince(start);
        });
        const tick = window.setInterval(() => setNow(Date.now()), 10_000);
        let lastActivity = 0;
        const onActivity = () => {
            const time = Date.now();
            if (time - lastActivity < 1000) return;
            lastActivity = time;
            setIdleSince(time);
            setNow(time);
        };
        const onVisibility = () => setVisible(!document.hidden);
        const onCelebrate = () => {
            cancelHabit();
            setTemporaryAction('wave', 1400);
        };
        window.addEventListener('pointerdown', onActivity);
        window.addEventListener('keydown', onActivity);
        window.addEventListener('scroll', onActivity, { passive: true });
        window.addEventListener('pip:celebrate', onCelebrate);
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            cancelAnimationFrame(initialFrame);
            clearInterval(tick);
            window.removeEventListener('pointerdown', onActivity);
            window.removeEventListener('keydown', onActivity);
            window.removeEventListener('scroll', onActivity);
            window.removeEventListener('pip:celebrate', onCelebrate);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [cancelHabit, setTemporaryAction]);

    const mealtime = now !== null && inMealWindow(now);
    const awake = now !== null && now - idleSince < 60_000;
    const takingBite = mealtime && Math.floor(now / 1000) % 55 < 18;
    const dayWorkAllowed = now !== null && theme === 'light' && awake && !mealtime
        && visible && !reducedMotion && movingPose === null;
    const daytimeWorking = dayWorkAllowed && workPhase;
    const restingPose: Pose = theme === 'dark' ? 'sleep'
        : takingBite || (mealtime && !awake) ? 'eat'
            : !awake ? 'sleep' : daytimeWorking ? 'work' : 'idle';
    const basePose = movingPose ?? action ?? restingPose;
    // Whatever Pip was doing (resting, working, a night routine, the moon), he
    // nods off before the sleep loop instead of popping into it. Being carried
    // along the page is ignored, so a Pip who was already asleep stays asleep.
    // A visitor coming back during the doze sees his eyelids lift again.
    const travelling = basePose === 'hurry' || basePose === 'travel-roll' || basePose === 'run-left' || basePose === 'run-right' || basePose === 'edge';
    const [settledPose, setSettledPose] = useState<Pose>(basePose);
    const [napping, setNapping] = useState(false);
    const [rousing, setRousing] = useState(false);
    // After a meal he pats his round tummy before getting back to his laptop.
    const [digesting, setDigesting] = useState(false);
    const resting = basePose === 'idle' || basePose === 'work';
    if (travelling && napping) setNapping(false);
    if (!travelling && basePose !== settledPose) {
        setSettledPose(basePose);
        setNapping(basePose === 'sleep' && settledPose !== 'sleep' && !reducedMotion && visible);
        setRousing(napping && settledPose === 'sleep' && resting);
        setDigesting(settledPose === 'eat' && resting && !reducedMotion && visible);
    }
    const pose: Pose = napping && basePose === 'sleep' ? 'doze'
        : rousing && resting ? 'wake' : digesting && resting ? 'digest' : basePose;

    useEffect(() => {
        if (!napping) return;
        const timer = setTimeout(() => setNapping(false), dozeDuration);
        return () => clearTimeout(timer);
    }, [napping]);

    useEffect(() => {
        if (!rousing) return;
        const timer = setTimeout(() => setRousing(false), wakeDuration);
        return () => clearTimeout(timer);
    }, [rousing]);

    useEffect(() => {
        if (!digesting) return;
        const timer = setTimeout(() => setDigesting(false), digestDuration);
        return () => clearTimeout(timer);
    }, [digesting]);

    useEffect(() => {
        poseRef.current = pose;
    });

    useEffect(() => {
        // Language button: Pip says hello in the language just chosen, waving if he's up.
        const onLanguage = () => {
            setBubble(count => count + 1);
            const current = poseRef.current;
            if (!reducedMotion && actionRef.current === null && (current === 'idle' || current === 'work')) {
                setTemporaryAction('wave', 1200);
            }
        };
        window.addEventListener(languageEvent, onLanguage);
        return () => window.removeEventListener(languageEvent, onLanguage);
    }, [reducedMotion, setTemporaryAction]);

    useEffect(() => {
        if (!bubble) return;
        const timer = setTimeout(() => setBubble(0), 2400);
        return () => clearTimeout(timer);
    }, [bubble]);

    useEffect(() => {
        // Day mode button while Pip sleeps: he sits up, rubs his eyes and wakes up.
        // Own timer: switching theme resets the night routine queue.
        const onThemeSwitch = (event: Event) => {
            if ((event as CustomEvent<'light' | 'dark'>).detail !== 'light' || reducedMotion) return;
            if (poseRef.current !== 'sleep') return;
            if (riseTimer.current) clearTimeout(riseTimer.current);
            setTemporaryAction('rise', riseDuration + 200);
            riseTimer.current = setTimeout(() => {
                // Scrolling away in the meantime cancels the rest.
                if (actionRef.current === 'rise') setTemporaryAction('wake', wakeDuration);
            }, riseDuration);
        };
        window.addEventListener('theme-switch', onThemeSwitch);
        return () => {
            window.removeEventListener('theme-switch', onThemeSwitch);
            if (riseTimer.current) clearTimeout(riseTimer.current);
        };
    }, [reducedMotion, setTemporaryAction]);

    useEffect(() => {
        // During a daytime work session Pip sometimes stops to think, or after a
        // while his eyelids get heavy and he has to yawn before carrying on.
        if (!daytimeWorking) return;
        const session = workSessions.current++;
        const timers: ReturnType<typeof setTimeout>[] = [];
        const later = (ms: number, next: Pose, duration: number) => timers.push(setTimeout(() => {
            if (actionRef.current === null || actionRef.current === 'work-tired') setTemporaryAction(next, duration);
        }, ms));
        if (session % 2 === 0) later(4000 + Math.random() * 4000, 'think', thinkDuration);
        else {
            later(9000, 'work-tired', 4200);
            later(13_200, 'yawn', yawnDuration);
        }
        return () => timers.forEach(clearTimeout);
    }, [daytimeWorking, setTemporaryAction]);

    useEffect(() => {
        // His eyes follow a cursor moving nearby while he rests.
        if (reducedMotion) return;
        let frameId = 0;
        let current: number | null = null;
        let calm: ReturnType<typeof setTimeout> | undefined;
        const look = (next: number | null) => {
            if (next === current) return;
            current = next;
            setGaze(next);
        };
        const onMove = (event: PointerEvent) => {
            if (event.pointerType === 'touch') return;
            cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(() => {
                const rect = buttonRef.current?.getBoundingClientRect();
                if (!rect) return;
                const dx = event.clientX - (rect.left + rect.width / 2);
                const dy = event.clientY - (rect.top + rect.height * .38);
                const distance = Math.hypot(dx, dy);
                look(distance > 380 || distance < rect.width * .25 ? null : (Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) + 8) % 8);
                clearTimeout(calm);
                calm = setTimeout(() => look(null), 2500);
            });
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            cancelAnimationFrame(frameId);
            clearTimeout(calm);
            window.removeEventListener('pointermove', onMove);
        };
    }, [reducedMotion]);

    useEffect(() => {
        // Resume with a quiet pause after travel, meals or a hidden tab.
        const reset = requestAnimationFrame(() => setWorkPhase(false));
        if (!dayWorkAllowed) return () => cancelAnimationFrame(reset);
        let timer: ReturnType<typeof setTimeout>;
        const alternate = (working: boolean) => {
            timer = setTimeout(() => {
                setWorkPhase(working);
                alternate(!working);
            }, working ? 20_000 : 15_000);
        };
        alternate(true);
        return () => {
            cancelAnimationFrame(reset);
            clearTimeout(timer);
        };
    }, [dayWorkAllowed]);

    useEffect(() => {
        if (reducedMotion || !visible || pose === 'travel-roll') return;
        const delay = delayFor(pose);
        const interval = window.setInterval(() => setFrame(previous => ({
            pose, index: previous.pose === pose ? (previous.index + 1) % frames[pose].length : 0,
        })), delay);
        return () => clearInterval(interval);
    }, [pose, reducedMotion, visible]);

    useEffect(() => {
        // The tummy grows during a meal and is back to normal next time.
        if (pose !== 'eat' || reducedMotion || !visible) return;
        const grow = window.setInterval(() => setBelly(level => Math.min(bellyLevels.length, level + 1)), bellyStep);
        return () => {
            clearInterval(grow);
            setBelly(0);
        };
    }, [pose, reducedMotion, visible]);

    useEffect(() => {
        if (reducedMotion || !visible || theme === 'dark' || mealtime || !awake || daytimeWorking) return;
        let timer: ReturnType<typeof setTimeout>;
        let previousHabit = -1;
        const schedule = (first = false) => {
            timer = setTimeout(() => {
                if (!actionRef.current && (phaseRef.current === 'home' || phaseRef.current === 'corner')) {
                    habitRunning.current = true;
                    // Long, uneven pauses make these feel like habits rather than a loop.
                    let habit = Math.floor(Math.random() * 5);
                    if (habit === previousHabit) habit = (habit + 1) % 5;
                    previousHabit = habit;
                    if (habit === 4 && phaseRef.current === 'corner') {
                        const direction = sideRef.current === 'right' ? -1 : 1;
                        const distance = width > 1250 ? 24 : 8;
                        setTemporaryAction(direction === 1 ? 'run-right' : 'run-left', 850);
                        setOffset(direction * distance);
                        habitTimers.current.push(setTimeout(() => {
                            setTemporaryAction('look', 3000);
                            habitTimers.current.push(setTimeout(() => {
                                setTemporaryAction(direction === 1 ? 'run-left' : 'run-right', 850);
                                setOffset(0);
                            }, 3000));
                        }, 850));
                    } else {
                        const habitPose: Pose = ['look', 'groom', 'stretch', 'look', 'look'][habit] as Pose;
                        setTemporaryAction(habitPose, habitPose === 'stretch' ? stretchDuration : habitPose === 'groom' ? 2420 : 3080);
                    }
                }
                schedule();
            }, first ? 12_000 + Math.random() * 6000 : 22_000 + Math.random() * 18_000);
        };
        schedule(true);
        return () => {
            clearTimeout(timer);
            cancelHabit();
        };
    }, [awake, cancelHabit, daytimeWorking, mealtime, reducedMotion, setTemporaryAction, theme, visible, width]);

    useEffect(() => () => {
        if (actionTimer.current) clearTimeout(actionTimer.current);
        if (returnTimer.current) clearTimeout(returnTimer.current);
        if (finishTimer.current) clearTimeout(finishTimer.current);
        nightTimers.current.forEach(clearTimeout);
    }, []);

    const onClick = () => {
        const wasSleeping = pressedWhileSleeping.current || pose === 'sleep' || pose === 'doze';
        pressedWhileSleeping.current = false;
        if (movingPose && scene !== 'moon') return;
        cancelHabit();
        cancelNight();
        if (returnTimer.current) clearTimeout(returnTimer.current);
        if (finishTimer.current) clearTimeout(finishTimer.current);
        if (theme === 'light' && wasSleeping) {
            sceneCooldown.current = Date.now() + 35_000;
            if (reducedMotion) {
                setTemporaryAction('idle', 3000);
                return;
            }
            // Use the cancellable wake queue so scrolling cannot leave delayed
            // yawns or stretches playing while Pip is climbing the window.
            nightRunning.current = true;
            setTemporaryAction('wake', wakeDuration);
            nightTimers.current.push(setTimeout(() => setTemporaryAction('yawn', yawnDuration), wakeDuration));
            nightTimers.current.push(setTimeout(() => setTemporaryAction('stretch', stretchDuration), wakeDuration + yawnDuration));
            nightTimers.current.push(setTimeout(() => { nightRunning.current = false; }, wakeDuration + yawnDuration + stretchDuration));
            return;
        }
        if (theme === 'dark') {
            sceneCooldown.current = Date.now() + 90_000;
            if (reducedMotion) {
                setTemporaryAction('idle', 3000);
                return;
            }
            const moonRect = document.querySelector('[data-pip-moon]')?.getBoundingClientRect();
            const bedtimePose: Pose = !atCorner && moonRect && moonRect.width > 0
                && moonRect.top >= 80 && moonRect.bottom <= window.innerHeight ? 'moon-look' : 'groom';
            // Two night routines, one click after the other. Pip nods off again at the end of each.
            const variants: [Pose, number][][] = [
                [['wake', wakeDuration], ['yawn', yawnDuration], ['work', 14_000], [bedtimePose, 2800]],
                [['wake', wakeDuration], ['work', 14_000]],
            ];
            const sequence = variants[nightCount.current++ % variants.length];
            nightRunning.current = true;
            let elapsed = 0;
            sequence.forEach(([nextPose, duration], index) => {
                const play = () => setTemporaryAction(nextPose, duration);
                if (index === 0) play();
                else nightTimers.current.push(setTimeout(play, elapsed));
                elapsed += duration;
            });
            nightTimers.current.push(setTimeout(() => { nightRunning.current = false; }, elapsed));
            return;
        }
        if (reducedMotion || !atCorner) {
            // Clicking him again and again makes him dizzy.
            const time = Date.now();
            recentClicks.current = [...recentClicks.current.filter(click => time - click < 2500), time];
            if (!reducedMotion && recentClicks.current.length >= 4) {
                recentClicks.current = [];
                setTemporaryAction('dizzy', dizzyDuration);
                return;
            }
            const greetings = ['wave', 'look', 'stretch', 'groom', 'work'] as const;
            const greeting: Pose = reducedMotion ? 'wave' : greetings[clickCount.current++ % greetings.length];
            setTemporaryAction(greeting, greeting === 'wave' ? 1200 : greeting === 'stretch' ? stretchDuration
                : greeting === 'work' ? 4000 : 3080);
            return;
        }
        // A forward roll away from the corner and one back, then a dizzy wobble and a wave.
        const distance = clamp(window.innerWidth * 0.18, 72, 140);
        const direction = sideRef.current === 'right' ? -1 : 1;
        const later = (ms: number, run: () => void) => nightTimers.current.push(setTimeout(run, laptopStowDuration + ms));
        nightRunning.current = true;
        setRollMirror(direction === -1);
        setStowingLaptop(true);
        setTemporaryAction('travel-roll', laptopStowDuration + 40);
        later(0, () => {
            setStowingLaptop(false);
            setTemporaryAction('roll', rollDuration);
        });
        later(rollCrouch, () => setOffset(direction * distance));
        later(rollDuration, () => {
            setRollMirror(direction === 1);
            setTemporaryAction('roll', rollDuration);
        });
        later(rollDuration + rollCrouch, () => setOffset(0));
        later(rollDuration * 2, () => setTemporaryAction('roll-dizzy', dizzyDuration));
        later(rollDuration * 2 + dizzyDuration, () => setTemporaryAction('wave', 720));
        later(rollDuration * 2 + dizzyDuration + 720, () => { nightRunning.current = false; });
    };

    if (now === null || placement === null) return null;
    const currentFrame = frames[pose][reducedMotion || !visible || frame.pose !== pose ? 0 : frame.index % frames[pose].length];
    const still = reducedMotion || !visible;
    const walking = pose.startsWith('run-');
    const bodyMotion = still ? { y: 0, rotate: 0, scaleX: 1, scaleY: 1 }
        : pose === 'hurry' ? { y: [0, -placement.size * .055, 0],
            rotate: [0, facingLeftEdge ? 2 : -2, 0], scaleX: [1, .96, 1], scaleY: [1, 1.045, 1] }
        : walking ? { y: [0, -1.2, 0], rotate: [0, .7, 0], scaleX: 1, scaleY: 1 }
                : { y: 0, rotate: 0, scaleX: 1, scaleY: pose === 'idle' ? [1, 1.014, 1] : 1 };
    const rolling = pose === 'roll' || pose === 'roll-dizzy';
    const gazing = !still && pose === 'idle' && currentFrame === 0 && gaze !== null;
    const nose = pose === 'sleep' && !still ? napNoses[currentFrame] : null;
    const noseSide = currentFrame >= 11 ? 1 : -1;
    const typing = pose === 'work' || pose === 'work-tired' || pose === 'think';
    const bubbleWidth = clamp(width * .09, 108, 128);
    const bubbleTail = atCorner ? (facingLeftEdge ? 30 : 110) : 72;
    const bubbleOutline = `M19 17C36 7 103 7 121 18C134 27 132 44 118 51
        Q112 55 ${bubbleTail + 8} 57Q${bubbleTail + 3} 65 ${bubbleTail - 5} 72
        Q${bubbleTail - 2} 64 ${bubbleTail - 5} 58C45 61 23 57 15 49C5 39 6 25 19 17Z`;

    return (
        <>
        {decoration && !still && (
            <motion.svg key={decoration.kind} aria-hidden="true" viewBox="0 0 24 24"
                className="pointer-events-none fixed left-0 top-0 z-20 h-5 w-5"
                style={{ color: decoration.kind === 'leaf' ? 'var(--color-ink)' : '#d8bf89' }}
                initial={{ x: decoration.x - 10, y: decoration.y - 10, opacity: 0 }}
                animate={{ x: [decoration.x - 10, decoration.endX + 8, decoration.endX - 10],
                    y: [decoration.y - 10, (decoration.y + decoration.endY) / 2, decoration.endY - 10],
                    rotate: decoration.kind === 'leaf' ? [-25, 25, 70] : [0, 12, 0],
                    opacity: decoration.kind === 'leaf' ? [0, .45, .45] : [0, .7, 0] }}
                transition={{ duration: decoration.kind === 'leaf' ? 3.4 : 5.2, ease: 'easeInOut' }}>
                <path fill="currentColor" d={decoration.kind === 'leaf'
                    ? 'M4 20Q1 4 21 3Q20 18 4 20ZM5 19L17 7'
                    : 'M12 1L15 9L23 12L15 15L12 23L9 15L1 12L9 9Z'} />
            </motion.svg>
        )}
        <motion.button
            ref={buttonRef}
            type="button"
            aria-label={lang === 'fr' ? 'Faire bouger Pip le panda' : 'Make Pip the panda move'}
            title="Pip"
            data-pip-pose={pose}
            data-pip-scene={scene ?? undefined}
            onPointerDown={() => { pressedWhileSleeping.current = pose === 'sleep' || pose === 'doze'; }}
            onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') pressedWhileSleeping.current = pose === 'sleep' || pose === 'doze';
            }}
            onClick={onClick}
            className="fixed z-30 border-0 bg-transparent p-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-vermillon focus-visible:outline-offset-2"
            style={{ left: 0, top: 0, x: placement.x, y: placement.y, width: placement.size, height: placement.size * spriteRatio, touchAction: 'manipulation' }}
            initial={false}
            animate={controls}
        >
            {bubble > 0 && (
                // An ink-drawn manga balloon; only the tail moves toward the viewport edge.
                <span aria-hidden="true" data-pip-speech
                    className={`pointer-events-none absolute bottom-[86%] z-40 ${
                        atCorner ? (facingLeftEdge ? 'left-[40%]' : 'right-[40%]') : 'left-1/2 -translate-x-1/2'}`}
                    style={{ width: bubbleWidth, height: bubbleWidth * 82 / 144 }}>
                    <motion.span key={bubble} className="relative block h-full w-full"
                        style={{ transformOrigin: `${bubbleTail / 144 * 100}% 88%` }}
                        initial={{ opacity: 0, scale: still ? 1 : .7, rotate: 0 }}
                        animate={still ? { opacity: [1, 1, 0], scale: 1, rotate: 0 }
                            : { opacity: [0, 1, 1, 0], scale: [.7, 1.06, 1, .98], rotate: [-4, 1, -1, -1], y: [4, 0, 0, -3] }}
                        transition={{ duration: 2.3, times: still ? [0, .9, 1] : [0, .14, .85, 1], ease: 'easeOut' }}>
                        <svg viewBox="0 0 144 82" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
                            <path d={bubbleOutline} transform="translate(1 3)" fill="#192746" fillOpacity=".17" />
                            <path d={bubbleOutline} fill="#fffaf1" stroke="#26304b" strokeWidth="2.4" strokeLinejoin="round" />
                            <path d="M21 27Q27 20 39 19" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                            <path d="M20 45L24 48M26 47L30 50M112 43L116 40" stroke="#7099b1" strokeOpacity=".4" strokeWidth="1.4" strokeLinecap="round" />
                            <path d="M126 7L129 2M133 13L140 10" stroke="#b65b40" strokeWidth="2.2" strokeLinecap="round" />
                            <path d="M7 15L4 11" stroke="#26304b" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        <span className="absolute inset-x-[10%] top-[19%] flex h-[43%] items-center justify-center whitespace-nowrap font-sans font-extrabold italic tracking-[.015em] text-[#26304b]"
                            style={{ fontSize: bubbleWidth * .12 }}>
                            {lang === 'fr' ? 'Bonjour !' : 'Hello!'}
                        </span>
                    </motion.span>
                </span>
            )}
            {dust > 0 && !still && (
                <svg key={dust} aria-hidden="true" viewBox="0 0 192 208" className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible">
                    {[-1, 1].map(side => (
                        <motion.ellipse key={side} cx={96 + side * 34} cy={198} rx={12} ry={7} fill="#efe8dc" stroke="#c9bca9" strokeWidth={1.6}
                            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                            initial={{ opacity: .95, scale: .35, x: 0, y: 0 }}
                            animate={{ opacity: 0, scale: 1.5, x: side * 20, y: -6 }}
                            transition={{ duration: .65, ease: 'easeOut' }} />
                    ))}
                </svg>
            )}
            {stowingLaptop && !still && (
                <motion.img src="/pip/laptop.svg" alt="" aria-hidden="true" draggable={false} data-pip-stowing-laptop
                    className="pointer-events-none absolute bottom-[8%] left-[24%] z-20 h-[36%] w-[52%]"
                    style={{ transformOrigin: '50% 85%', filter: 'saturate(.88) sepia(.05)' }}
                    initial={{ y: 0, scaleX: 1, scaleY: 1, opacity: 1 }}
                    animate={{ y: [0, 0, -placement.size * .14, -placement.size * .17],
                        scaleX: [1, 1, .55, .3], scaleY: [1, .22, .16, .1], opacity: [1, 1, 1, 0] }}
                    transition={{ duration: laptopStowDuration / 1000, times: [0, .35, .75, 1], ease: 'easeInOut' }} />
            )}
            {/* Transparent sprite frames; the button carries the accessible name. */}
            <motion.div
                className="relative z-10 h-full w-full"
                style={{ scaleX: (pose === 'edge' && facingLeftEdge) || ((rolling || pose === 'travel-roll') && rollMirror) ? -1 : 1 }}
                animate={{ x: offset }}
                transition={{ duration: still ? 0 : pose === 'roll' ? .7 : .85, ease: travelEase }}
            >
            <motion.div
                className="relative z-10 h-full w-full"
                style={{ transformOrigin: '50% 92%', filter: 'saturate(.88) sepia(.05) drop-shadow(0 3px 4px rgba(52, 37, 31, .16))' }}
                animate={bodyMotion}
                transition={{ duration: still ? 0 : pose === 'hurry' ? hurryDuration / 1000 : walking ? .36 : 4.8,
                    repeat: still || pose === 'hurry' ? 0 : Infinity, ease: 'easeInOut' }}
            >
                {/* Frames are already decoded; keep their URLs stable for sprite playback. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pose === 'hurry' ? spriteFile('gaze', facingLeftEdge ? 4 : 0)
                    : gazing ? spriteFile('gaze', gaze) : spriteSource(pose, currentFrame, pose === 'eat' ? belly : 0)} alt=""
                    draggable={false} className="block h-full w-full object-contain" style={pose === 'wave' ? waveRegistration : undefined} />
                {nose && (
                    <svg aria-hidden="true" viewBox="0 0 192 208" className="pointer-events-none absolute inset-0 h-full w-full">
                        {/* A sleepy bubble swells with his breathing, then pops. */}
                        <motion.g style={{ transformOrigin: `${nose[0] + noseSide}px ${nose[1] + 3}px`, transformBox: 'view-box' }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, .45, .2, .65, .3, .85, .4, 1.1, 1.3, 0], opacity: [0, .9, .9, .9, .9, .9, .9, .9, .9, 0] }}
                            transition={{ duration: 9, times: [0, .12, .24, .36, .48, .6, .72, .86, .96, 1], repeat: Infinity, repeatDelay: 7, ease: 'easeInOut' }}>
                            <circle cx={nose[0] + noseSide * 8} cy={nose[1] + 6} r={7.5} fill="#cde9ff" fillOpacity={.55} stroke="#7aaed8" strokeWidth={1} />
                            <ellipse cx={nose[0] + noseSide * 8 - 2.5} cy={nose[1] + 3.5} rx={2} ry={1.4} fill="#fff" fillOpacity={.9} />
                        </motion.g>
                    </svg>
                )}
                {typing && (
                    <svg data-pip-glasses aria-hidden="true" viewBox="0 0 192 208" className="pointer-events-none absolute inset-0 h-full w-full">
                        <defs>
                            <radialGradient id={screenGlowId} cx="50%" cy="100%" r="85%">
                                <stop offset="0" stopColor="#86d8ff" stopOpacity=".32" />
                                <stop offset="1" stopColor="#86d8ff" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <g transform={glassesTransform(pose === 'think' ? 0 : currentFrame)}>
                        <ellipse cx="95.5" cy="102" rx="52" ry="28" fill={`url(#${screenGlowId})`} />
                        <g fill="#dae9ed" fillOpacity=".12" stroke="#756354" strokeWidth="3.2" strokeLinejoin="round">
                            <rect x="46" y="75" width="39" height="25" rx="4" />
                            <rect x="106" y="75" width="39" height="25" rx="4" />
                            <path d="M85 84Q95 79 106 84M39 80L46 82M145 82L152 80" fill="none" />
                        </g>
                        <motion.g initial={false} animate={{ opacity: still ? .5 : [.4, .65, .48, .4] }}
                            transition={{ duration: 4.4, repeat: still ? 0 : Infinity, ease: 'easeInOut' }}>
                            <g fill="#8edcff">
                                <rect x="49" y="78" width="33" height="19" rx="2" fillOpacity=".25" />
                                <rect x="109" y="78" width="33" height="19" rx="2" fillOpacity=".25" />
                                <path d="M50 94L65 79H72L54 97H50ZM110 94L125 79H132L114 97H110Z" fillOpacity=".65" />
                            </g>
                            <path d="M62 90H77M62 94H72M122 90H137M122 94H132" stroke="#cbf3ff" strokeWidth="1.5" strokeLinecap="round" />
                        </motion.g>
                        <path d="M51 79H65M111 79H124" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" />
                        </g>
                    </svg>
                )}
            </motion.div>
            </motion.div>
        </motion.button>
        </>
    );
}
