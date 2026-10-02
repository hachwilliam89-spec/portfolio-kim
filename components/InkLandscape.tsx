import type { CSSProperties } from 'react';

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

/** Static ink drawing; only whole layers (and the stars) are animated in CSS. */
export default function InkLandscape() {
    return (
        <svg className="ink-landscape" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" fill="none" aria-hidden="true">
            <defs>
                <linearGradient id="ink-mountain" x2="0" y2="1">
                    <stop stopColor="currentColor" stopOpacity=".3" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="ink-bamboo" x2="1" y2="0">
                    <stop stopColor="currentColor" stopOpacity=".95" />
                    <stop offset=".5" stopColor="currentColor" stopOpacity=".55" />
                    <stop offset="1" stopColor="currentColor" stopOpacity=".85" />
                </linearGradient>
                <g id="ink-leaves" fill="currentColor">
                    <path d="M0 0 Q34 -30 83 -32 Q52 -6 0 0ZM15 -3Q29 -40 57 -58Q51 -24 15 -3ZM30 -7Q66 -8 94 10Q61 13 30 -7ZM-2 1Q-14 -29 -41 -48Q-33 -14 -2 1ZM-14 -3Q-48 -20 -77 -13Q-43 1 -14 -3ZM-27 -5Q-44 19 -75 30Q-60 2 -27 -5ZM-3 0Q13 21 12 58Q-4 36 -3 0Z" />
                    <path d="M-72 18Q-31 -9 71 -24" stroke="currentColor" strokeWidth="1.3" />
                </g>
                <mask id="ink-crescent">
                    <circle cx="1180" cy="230" r="72" fill="white" />
                    <circle cx="1212" cy="204" r="62" fill="black" />
                </mask>
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
            </defs>
            <g className="ink-sun"><circle cx="1180" cy="230" r="77" fill="#c73e1d" opacity=".85" /><circle cx="1180" cy="230" r="88" stroke="#b8956a" strokeOpacity=".45" /></g>
            <g className="ink-moon" mask="url(#ink-crescent)">
                <circle cx="1180" cy="230" r="72" fill="#d8bf89" />
                <circle cx="1150" cy="250" r="14" fill="#b8956a" opacity=".22" />
                <circle cx="1180" cy="230" r="71" stroke="#b8956a" strokeOpacity=".55" strokeWidth="2" />
            </g>
            <g className="ink-stars" fill="currentColor">
                {STARS.map((s, i) => (
                    <g key={i} className="ink-star" style={{ '--d': `${s.dur}s`, '--delay': `${s.delay}s` } as CSSProperties}>
                        {s.cross
                            ? <path transform={`translate(${s.x} ${s.y}) scale(${s.r * 0.75})`} d="M0 -6L1 -1L6 0L1 1L0 6L-1 1L-6 0L-1 -1Z" />
                            : <circle cx={s.x} cy={s.y} r={s.r} />}
                    </g>
                ))}
            </g>
            <g fill="url(#ink-mountain)">
                <path opacity=".6" d="M570 860L716 699 757 726 854 574 894 615 928 556 999 678 1068 617 1115 671 1220 464 1265 523 1292 503 1440 665V900H570Z" />
                <path d="M790 900L930 768 990 784 1110 619 1140 642 1209 559 1260 650 1310 617 1440 758V900Z" />
                <path d="M1000 900L1137 809 1200 831 1306 710 1345 736 1440 655V900Z" />
            </g>
            <g stroke="currentColor" strokeOpacity=".13" strokeLinecap="round">
                <path d="M1110 620L1087 715 1060 757M1210 560L1191 675 1166 713M1220 465L1200 559M1305 711L1287 802" />
                <path d="M713 841Q1000 805 1280 865M880 877Q1120 851 1435 885" />
            </g>
            <g className="ink-mist" fill="var(--color-washi)" opacity=".3"><path d="M680 784Q890 735 1220 772Q1050 757 680 784ZM900 839Q1160 786 1490 817Q1230 800 900 839Z" /></g>
            <g className="ink-birds" fill="currentColor" opacity=".65">
                <path d="M984 297Q960 273 941 283Q967 282 984 303Q1005 288 1026 293Q1007 282 984 297Z" />
                <path d="M1067 340Q1050 322 1036 325Q1054 327 1067 344Q1080 333 1097 335Q1085 328 1067 340Z" />
                <path d="M1111 288Q1100 276 1086 279Q1100 280 1111 292Q1124 282 1138 285Q1126 278 1111 288Z" />
            </g>
            <g className="ink-bamboo" opacity=".38">
                <use href="#ink-stalk" transform="translate(55 934) rotate(-9) scale(1)" />
                <use href="#ink-stalk" transform="translate(150 942) rotate(8) scale(.78)" opacity=".65" />
                <use href="#ink-stalk" transform="translate(-5 929) rotate(-20) scale(.7)" opacity=".4" />
            </g>
        </svg>
    );
}
