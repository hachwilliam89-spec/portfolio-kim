export default function LanternHeading({ children, featured = false }: { children: React.ReactNode; featured?: boolean }) {
    return (
        <div className={`project-chapter col-span-full flex items-center gap-4 sm:gap-6 ${featured ? 'chapter-featured' : ''}`}>
            <svg className="shrink-0" width="52" height="100" viewBox="0 0 64 124" fill="none" aria-hidden="true">
                <path d="M32 0V20" stroke="#b8956a" />
                <path d="M20 21H44L46 27H18Z" fill="currentColor" />
                <path d="M19 28C-1 42 3 73 20 83H44C61 73 65 42 45 28Z" fill={featured ? '#c73e1d' : 'var(--color-ink)'} />
                <path d="M21 29C11 44 12 69 22 81M43 29C53 44 52 69 42 81M28 29C24 47 25 67 28 81M36 29C40 47 39 67 36 81" stroke="#d6b477" strokeOpacity=".65" />
                <path d="M17 29H47M13 39H51M12 70H52M18 81H46" stroke="#d6b477" />
                <path d="M20 84H44L42 89H22Z" fill="currentColor" />
                <path d="M32 89V102M28 102V119M32 102V123M36 102V119" stroke="#b8956a" strokeWidth="2" />
                <path d="M29 54L32 50L35 54L32 58Z" fill="#e8cd97" />
            </svg>
            <h3 className={`font-display text-ink ${featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>{children}</h3>
            <span className="chapter-rule flex-1" aria-hidden="true" />
            <span className="hidden sm:block text-xs tracking-widest text-gold" aria-hidden="true">{featured ? '01' : '02'}</span>
        </div>
    );
}
