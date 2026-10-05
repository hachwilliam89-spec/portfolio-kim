import type { CSSProperties } from 'react';

/**
 * Le paysage est découpé en trois calques ancrés aux coins de la section :
 * - en bas à gauche, le bambou (et ses feuilles qui tombent) ;
 * - en bas à droite, les montagnes ;
 * - en haut à droite, le ciel : soleil / lune, oiseaux, étoiles.
 * Chaque calque est mis à l'échelle par la hauteur du hero (plafonnée en largeur d'écran),
 * si bien que la composition reste identique quel que soit le ratio de l'écran.
 * Les coordonnées restent celles du dessin d'origine (1440 × 900).
 */
const LEFT_WIDTH = 500;
const RIGHT_X = 560;
const RIGHT_WIDTH = 1440 - RIGHT_X;

/** Étoiles du mode sombre : positions dans le viewBox, hors de la zone de texte centrale. */
const STARS: { x: number; y: number; r: number; delay: number; dur: number; cross?: boolean }[] = [
    // Haut, sur toute la largeur
    { x: 60, y: 55, r: 2.2, delay: 0, dur: 3.2 },
    { x: 245, y: 40, r: 1.8, delay: 1.3, dur: 2.9, cross: true },
    { x: 480, y: 70, r: 1.8, delay: 0.6, dur: 3.7 },
    { x: 750, y: 45, r: 2.4, delay: 2.1, dur: 2.6, cross: true },
    { x: 1010, y: 60, r: 1.8, delay: 0.9, dur: 3.4 },
    { x: 1210, y: 35, r: 2.6, delay: 1.6, dur: 3.0, cross: true },
    { x: 1390, y: 85, r: 1.8, delay: 3.2, dur: 4.0 },
    // Ciel dégagé à gauche : sous la navigation et au-dessus des bambous.
    { x: 80, y: 132, r: 1.4, delay: -1.5, dur: 4.6 },
    { x: 225, y: 188, r: 1.3, delay: -2.7, dur: 5.2 },
    { x: 390, y: 118, r: 1.5, delay: -3.2, dur: 4.8 },
    { x: 115, y: 240, r: 1.6, delay: -0.8, dur: 5.6, cross: true },
    { x: 345, y: 222, r: 1.3, delay: -4.1, dur: 6.0 },
    { x: 55, y: 298, r: 1.2, delay: -2.0, dur: 4.4 },
    { x: 200, y: 282, r: 1.6, delay: -3.6, dur: 5.4 },
    { x: 305, y: 320, r: 1.4, delay: -1.3, dur: 4.9, cross: true },
    { x: 395, y: 278, r: 1.1, delay: -2.9, dur: 5.8 },
    { x: 135, y: 345, r: 1.1, delay: -4.5, dur: 6.2 },
    // Gauche, au-dessus du bambou
    { x: 35, y: 200, r: 2, delay: 2.4, dur: 3.5 },
    { x: 300, y: 150, r: 1.8, delay: 0.4, dur: 2.8, cross: true },
    { x: 170, y: 115, r: 1.6, delay: 3.8, dur: 3.3 },
    // Droite, autour de la lune et au-dessus des sommets
    { x: 1060, y: 170, r: 2, delay: 3.0, dur: 3.1, cross: true },
    { x: 1330, y: 180, r: 1.8, delay: 0.7, dur: 2.7 },
    { x: 1300, y: 330, r: 2, delay: 1.5, dur: 3.5, cross: true },
    { x: 1405, y: 260, r: 1.6, delay: 2.7, dur: 3.0 },
    { x: 1250, y: 410, r: 1.6, delay: 0.2, dur: 3.8 },
];

/**
 * Feuilles de bambou qui se détachent du feuillage existant.
 * x/y : milieu d'une feuille réelle des tiges (coordonnées du viewBox, calculées depuis les transforms des tiges).
 * Chute jusqu'au sol (~y 900) poussée par un léger vent vers la droite ; durée proportionnelle à la hauteur.
 */
const LEAF_SPOTS: { x: number; y: number; r0: number; delay: number; scale: number }[] = [
    { x: 80, y: 340, r0: 70, delay: 0, scale: 1 },
    { x: 240, y: 455, r0: 105, delay: 2.5, scale: 0.85 },
    { x: 155, y: 615, r0: 80, delay: 5, scale: 1 },
    { x: 95, y: 362, r0: 95, delay: 7.5, scale: 0.95 },
    { x: 305, y: 508, r0: 60, delay: 10, scale: 0.8 },
    { x: 178, y: 668, r0: 110, delay: 12.5, scale: 0.9 },
    { x: 298, y: 726, r0: 75, delay: 15, scale: 0.8 },
];
const FALLING_LEAVES = LEAF_SPOTS.map(l => {
    const fall = 900 - l.y;
    return { ...l, fall, drift: Math.round(fall * 0.12), dur: +(fall / 50 / 0.75).toFixed(1) };
});

/** Nuages au lavis (traînées de pinceau) : à droite parmi les sommets, à gauche au-dessus des bambous. */
const CLOUDS: { x: number; y: number; scale: number; dur: number; delay: number; flip?: boolean }[] = [
    { x: 1050, y: 470, scale: 1, dur: 26, delay: 0 },
    { x: 1130, y: 615, scale: 0.85, dur: 32, delay: -9, flip: true },
    { x: 1270, y: 395, scale: 0.6, dur: 22, delay: -4 },
    { x: 20, y: 180, scale: 0.9, dur: 28, delay: -14 },
    { x: 170, y: 255, scale: 0.6, dur: 24, delay: -6, flip: true },
];

/** Éclat « kira » façon anime : traits de vitesse rayonnants + étoile à quatre branches. */
function Kira({ className, color }: { className: string; color: string }) {
    return (
        <g className={`ink-kira ${className}`} stroke={color} strokeLinecap="round">
            {Array.from({ length: 12 }, (_, i) => {
                const a = (i * 30 + 8) * Math.PI / 180;
                const [r1, r2] = i % 2 ? [100, 122] : [96, 140];
                return <path key={i} strokeWidth={i % 2 ? 2 : 3} d={`M${(1180 + Math.cos(a) * r1).toFixed(1)} ${(230 + Math.sin(a) * r1).toFixed(1)}L${(1180 + Math.cos(a) * r2).toFixed(1)} ${(230 + Math.sin(a) * r2).toFixed(1)}`} />;
            })}
            <path className="ink-kira-star" fill={color} stroke="none" d="M1262 150L1266 166L1282 170L1266 174L1262 190L1258 174L1242 170L1258 166Z" />
        </g>
    );
}

/** Définition du nuage, dupliquée dans chaque calque : aucune référence entre deux <svg> distincts. */
function CloudDefs({ id }: { id: string }) {
    return (
        <>
            <linearGradient id={`${id}-wash`} x2="1" y2="0">
                <stop stopColor="currentColor" stopOpacity="0" />
                <stop offset=".3" stopColor="currentColor" stopOpacity=".2" />
                <stop offset=".65" stopColor="currentColor" stopOpacity=".14" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <filter id={`${id}-soft`} x="-10%" y="-50%" width="120%" height="200%">
                <feGaussianBlur stdDeviation="1.6" />
            </filter>
            <g id={id} fill={`url(#${id}-wash)`} filter={`url(#${id}-soft)`}>
                <path d="M0 30Q60 8 150 20Q215 13 262 27Q205 33 125 32Q55 40 0 30Z" />
                <path d="M45 47Q125 35 228 45Q150 52 45 47Z" />
                <path d="M92 13Q142 1 205 9Q152 16 92 13Z" opacity=".8" />
            </g>
        </>
    );
}

function Clouds({ side, href }: { side: 'left' | 'right'; href: string }) {
    return (
        <g className="ink-clouds">
            {CLOUDS.filter(c => (c.x < LEFT_WIDTH) === (side === 'left')).map(c => (
                <g key={`${c.x}-${c.y}`} transform={`translate(${c.x} ${c.y}) scale(${c.flip ? -c.scale : c.scale} ${c.scale})${c.flip ? ' translate(-262 0)' : ''}`}>
                    <g className="ink-cloud" style={{ '--d': `${c.dur}s`, '--delay': `${c.delay}s` } as CSSProperties}>
                        <use href={href} />
                    </g>
                </g>
            ))}
        </g>
    );
}

function Stars({ side }: { side: 'left' | 'right' }) {
    return (
        <g className="ink-stars" fill="currentColor">
            {STARS.filter(s => (s.x < LEFT_WIDTH) === (side === 'left')).map(s => (
                <g key={`${s.x}-${s.y}`} className="ink-star" style={{ '--d': `${s.dur}s`, '--delay': `${s.delay}s` } as CSSProperties}>
                    {s.cross
                        ? <path transform={`translate(${s.x} ${s.y}) scale(${s.r * 0.75})`} d="M0 -6L1 -1L6 0L1 1L0 6L-1 1L-6 0L-1 -1Z" />
                        : <circle cx={s.x} cy={s.y} r={s.r} />}
                </g>
            ))}
        </g>
    );
}

/** Calque gauche : bambou, feuilles qui tombent, nuages et étoiles de gauche. */
function BambooLayer() {
    return (
        <svg className="ink-layer ink-layer-left" viewBox={`0 0 ${LEFT_WIDTH} 900`} preserveAspectRatio="xMinYMax meet" fill="none" focusable="false">
            <defs>
                <linearGradient id="ink-bamboo" x2="1" y2="0">
                    <stop stopColor="currentColor" stopOpacity=".95" />
                    <stop offset=".5" stopColor="currentColor" stopOpacity=".55" />
                    <stop offset="1" stopColor="currentColor" stopOpacity=".85" />
                </linearGradient>
                <g id="ink-leaves" fill="currentColor">
                    <path d="M0 0 Q34 -30 83 -32 Q52 -6 0 0ZM15 -3Q29 -40 57 -58Q51 -24 15 -3ZM30 -7Q66 -8 94 10Q61 13 30 -7ZM-2 1Q-14 -29 -41 -48Q-33 -14 -2 1ZM-14 -3Q-48 -20 -77 -13Q-43 1 -14 -3ZM-27 -5Q-44 19 -75 30Q-60 2 -27 -5ZM-3 0Q13 21 12 58Q-4 36 -3 0Z" />
                    <path d="M-72 18Q-31 -9 71 -24" stroke="currentColor" strokeWidth="1.3" />
                </g>
                <g id="ink-stalk">
                    {[0, 1, 2, 3, 4, 5].map(i => (
                        <g key={i} transform={`translate(${i * 2} ${-i * 100})`}>
                            <path d="M-8 0Q-5 -48 -6 -94L5 -96Q3 -49 7 0Z" fill="url(#ink-bamboo)" />
                            <path d="M-10 -97Q0 -100 8 -96" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            <path d="M-3 -9L-2 -83" stroke="var(--color-washi)" strokeOpacity=".3" />
                        </g>
                    ))}
                    <path d="M10 -490Q36 -531 87 -555M8 -302Q-33 -345 -92 -352M5 -203Q60 -266 108 -268" stroke="currentColor" strokeWidth="2" />
                    <use href="#ink-leaves" transform="translate(76 -550) rotate(-18) scale(.95)" />
                    <use href="#ink-leaves" transform="translate(-76 -350) rotate(17) scale(1.2)" />
                    <use href="#ink-leaves" transform="translate(93 -268) rotate(-12) scale(1.2)" />
                    <use href="#ink-leaves" transform="translate(12 -595) rotate(-56) scale(.8)" />
                </g>
                <CloudDefs id="ink-cloud-l" />
            </defs>
            <Stars side="left" />
            <Clouds side="left" href="#ink-cloud-l" />
            <g className="ink-falling" fill="currentColor">
                {FALLING_LEAVES.map(l => (
                    <g key={`${l.x}-${l.y}`} transform={`translate(${l.x} ${l.y})`}>
                        <g className="ink-leaf-fall" style={{ '--d': `${l.dur}s`, '--delay': `${l.delay}s`, '--fall': `${l.fall}px`, '--drift': `${l.drift}px` } as CSSProperties}>
                            <g className="ink-leaf-spin" style={{ '--d': `${(l.dur / 4).toFixed(2)}s`, '--delay': `${l.delay}s`, '--r0': `${l.r0}deg` } as CSSProperties}>
                                <path transform={`scale(${l.scale})`} d="M0 -13Q5 -3 1 12L0 14L-1 12Q-5 -3 0 -13Z" />
                            </g>
                        </g>
                    </g>
                ))}
            </g>
            <g className="ink-bamboo" opacity=".38">
                <use href="#ink-stalk" transform="translate(55 934) rotate(-9) scale(1)" />
                <use href="#ink-stalk" transform="translate(150 942) rotate(8) scale(.78)" opacity=".65" />
                <use href="#ink-stalk" transform="translate(-5 929) rotate(-20) scale(.7)" opacity=".4" />
            </g>
        </svg>
    );
}

/** Calque du ciel (ancré en haut à droite) : soleil / lune, éclats, oiseaux et étoiles de droite. */
function SkyLayer() {
    return (
        <svg className="ink-layer ink-layer-sky" viewBox={`${RIGHT_X} 0 ${RIGHT_WIDTH} 900`} preserveAspectRatio="xMaxYMin meet" fill="none" focusable="false">
            <defs>
                <mask id="ink-crescent">
                    <circle cx="1180" cy="230" r="72" fill="white" />
                    <circle cx="1212" cy="204" r="62" fill="black" />
                </mask>
            </defs>
            <Stars side="right" />
            <g className="ink-sun"><circle cx="1180" cy="230" r="77" fill="#c73e1d" opacity=".85" /><circle cx="1180" cy="230" r="88" stroke="#b8956a" strokeOpacity=".45" /></g>
            <g className="ink-moon" mask="url(#ink-crescent)">
                <circle cx="1180" cy="230" r="72" fill="#d8bf89" />
                <circle cx="1180" cy="230" r="71" stroke="#b8956a" strokeOpacity=".55" strokeWidth="2" />
            </g>
            <Kira className="ink-kira-sun" color="#c73e1d" />
            <Kira className="ink-kira-moon" color="#e8cd97" />
            <g className="ink-birds" fill="currentColor" opacity=".65">
                <path d="M984 297Q960 273 941 283Q967 282 984 303Q1005 288 1026 293Q1007 282 984 297Z" />
                <path d="M1067 340Q1050 322 1036 325Q1054 327 1067 344Q1080 333 1097 335Q1085 328 1067 340Z" />
                <path d="M1111 288Q1100 276 1086 279Q1100 280 1111 292Q1124 282 1138 285Q1126 278 1111 288Z" />
            </g>
        </svg>
    );
}

/** Calque droit (ancré en bas à droite) : montagnes, brume et nuages de droite. Il passe devant le soleil couchant. */
function MountainLayer() {
    return (
        <svg className="ink-layer ink-layer-right" viewBox={`${RIGHT_X} 0 ${RIGHT_WIDTH} 900`} preserveAspectRatio="xMaxYMax meet" fill="none" focusable="false">
            <defs>
                <linearGradient id="ink-mountain" x2="0" y2="1">
                    <stop stopColor="currentColor" stopOpacity=".3" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
                <CloudDefs id="ink-cloud-r" />
            </defs>
            <g fill="url(#ink-mountain)">
                <path opacity=".6" d="M570 860L716 699 757 726 854 574 894 615 928 556 999 678 1068 617 1115 671 1220 464 1265 523 1292 503 1440 665V900H570Z" />
                <path d="M790 900L930 768 990 784 1110 619 1140 642 1209 559 1260 650 1310 617 1440 758V900Z" />
                <path d="M1000 900L1137 809 1200 831 1306 710 1345 736 1440 655V900Z" />
            </g>
            <g stroke="currentColor" strokeOpacity=".13" strokeLinecap="round">
                <path d="M1110 620L1087 715 1060 757M1210 560L1191 675 1166 713M1220 465L1200 559M1305 711L1287 802" />
                <path d="M713 841Q1000 805 1280 865M880 877Q1120 851 1435 885" />
            </g>
            <Clouds side="right" href="#ink-cloud-r" />
            <g className="ink-mist" fill="var(--color-washi)" opacity=".3"><path d="M680 784Q890 735 1220 772Q1050 757 680 784ZM900 839Q1160 786 1490 817Q1230 800 900 839Z" /></g>
        </svg>
    );
}

/** Static ink drawing; only whole layers (and the stars) are animated in CSS. */
export default function InkLandscape() {
    return (
        <div className="ink-landscape" aria-hidden="true">
            <SkyLayer />
            <MountainLayer />
            <BambooLayer />
        </div>
    );
}
