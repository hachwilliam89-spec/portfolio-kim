/** Decorative brush strokes separating the portfolio sections. */
export default function BrushSeparator() {
    return (
        <div className="flex h-20 w-full items-center justify-center px-6 md:h-24" aria-hidden="true">
            <svg
                className="h-auto w-full max-w-[400px] text-ink opacity-55"
                viewBox="0 0 400 76"
                fill="none"
                focusable="false"
            >
                <path d="M22 40Q62 34 172 38L173 40Q71 38 22 40Z" fill="currentColor" opacity=".75" />
                <path d="M225 38Q308 35 379 40Q283 38 225 41Z" fill="currentColor" opacity=".75" />
                <path d="M45 43Q93 40 149 42M244 43Q303 40 351 42" stroke="currentColor" strokeWidth=".5" opacity=".35" />
                <path d="M194 31L207 32L206 45L193 44Z" className="fill-vermillon dark:fill-[#e98c70]" />
                <path d="M197 35L203 35L203 41L197 41Z" className="stroke-washi" strokeWidth=".8" />
            </svg>
        </div>
    );
}
