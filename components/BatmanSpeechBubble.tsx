export default function BatmanSpeechBubble({ text, className = '' }: { text: string; className?: string }) {
    return (
        <span data-batman-speech className={`batman-bubble pointer-events-none block w-[clamp(130px,12vw,160px)] ${className}`}>
            <svg viewBox="0 0 144 82" className="block h-auto w-full overflow-visible" fill="none" aria-hidden="true">
                <path d="M19 17C36 7 103 7 121 18C134 27 132 44 118 51Q100 59 76 57Q77 65 67 72Q70 64 66 58C45 61 23 57 15 49C5 39 6 25 19 17Z" transform="translate(1 3)" fill="#192746" fillOpacity=".17" />
                <path d="M19 17C36 7 103 7 121 18C134 27 132 44 118 51Q100 59 76 57Q77 65 67 72Q70 64 66 58C45 61 23 57 15 49C5 39 6 25 19 17Z" fill="#fffaf1" stroke="#26304b" strokeWidth="2.4" strokeLinejoin="round" />
                <path d="M21 27Q27 20 39 19" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <path d="M126 7L129 2M133 13L140 10" stroke="#b65b40" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M7 15L4 11" stroke="#26304b" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="absolute inset-x-[9%] top-[20%] flex h-[42%] flex-col items-center justify-center whitespace-nowrap font-sans text-[clamp(9px,1vw,11px)] font-extrabold italic leading-[1.12] tracking-[.015em] text-[#26304b]">
                {text.split('\n').map(line => <span key={line}>{line}</span>)}
            </span>
        </span>
    );
}
