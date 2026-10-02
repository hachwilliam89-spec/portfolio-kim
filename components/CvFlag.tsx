/** Decorative flags, independent of the operating system's emoji font. */
export default function CvFlag({ country }: { country: 'fr' | 'gb' }) {
    return (
        <svg
            width="24"
            height="16"
            viewBox="0 0 60 40"
            className="shrink-0 overflow-hidden rounded-[2px] ring-1 ring-ink/10"
            aria-hidden="true"
            focusable="false"
        >
            {country === 'fr' ? (
                <>
                    <path fill="#002654" d="M0 0h20v40H0z" />
                    <path fill="#fff" d="M20 0h20v40H20z" />
                    <path fill="#ed2939" d="M40 0h20v40H40z" />
                </>
            ) : (
                <svg width="60" height="40" viewBox="0 0 60 30" preserveAspectRatio="none" overflow="hidden">
                    <path fill="#012169" d="M0 0h60v30H0z" />
                    <path stroke="#fff" strokeWidth="6" d="m0 0 60 30M60 0 0 30" />
                    <path fill="#c8102e" d="M0 0v2l26 13h4L0 0Zm60 0h-4L30 13v2L60 0ZM60 30v-2L34 15h-4l30 15ZM0 30h4l26-13v-2L0 30Z" />
                    <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" />
                    <path stroke="#c8102e" strokeWidth="6" d="M30 0v30M0 15h60" />
                </svg>
            )}
        </svg>
    );
}
