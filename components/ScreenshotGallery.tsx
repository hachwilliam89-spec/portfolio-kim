'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Screenshot } from '@/lib/types';

export default function ScreenshotGallery({ screenshots, english, enlarged = false }: {
    screenshots: Screenshot[];
    english: boolean;
    enlarged?: boolean;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const active = activeIndex === null ? null : screenshots[activeIndex];
    const title = (screenshot: Screenshot) => english ? screenshot.titleEn ?? screenshot.title : screenshot.title;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (activeIndex === null && dialog.open) dialog.close();
        if (activeIndex !== null && !dialog.open) dialog.showModal();
    }, [activeIndex]);

    return <>
        <div className={enlarged ? 'grid gap-8' : 'grid gap-8 sm:grid-cols-2'}>
            {screenshots.map((screenshot, index) => <figure key={screenshot.url}>
                <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`${english ? 'Enlarge' : 'Agrandir'} : ${title(screenshot)}`}
                    className="block w-full cursor-zoom-in overflow-hidden rounded-lg border border-gold/30 bg-washi-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermillon"
                >
                    <span className="relative block aspect-video">
                        <Image src={screenshot.url} alt={title(screenshot)} fill sizes={enlarged ? '(max-width: 1024px) 100vw, 1024px' : '(max-width: 639px) 100vw, 50vw'} className="object-contain" />
                    </span>
                </button>
                <figcaption className="mt-3 text-sm leading-relaxed text-ink/80">
                    <strong className="block text-ink">{title(screenshot)}</strong>
                    {english ? screenshot.descriptionEn ?? screenshot.description : screenshot.description}
                </figcaption>
            </figure>)}
        </div>
        <dialog
            ref={dialogRef}
            onClose={() => setActiveIndex(null)}
            aria-label={active ? title(active) : undefined}
            className="m-auto w-[min(96vw,1400px)] max-w-none rounded-xl border border-gold/30 bg-washi-dark p-4 text-ink shadow-2xl backdrop:bg-black/80 sm:p-6"
        >
            {active && <>
                <div className="mb-4 flex items-center justify-between gap-4">
                    <strong>{title(active)}</strong>
                    <button type="button" onClick={() => dialogRef.current?.close()} className="rounded-lg border border-gold/40 px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-vermillon">
                        {english ? 'Close' : 'Fermer'}
                    </button>
                </div>
                <div className="relative aspect-video w-full">
                    <Image src={active.url} alt={title(active)} fill sizes="96vw" className="object-contain" />
                </div>
                <a href={active.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm underline underline-offset-4">
                    {english ? 'Open full-size image' : 'Ouvrir l’image en taille réelle'}
                </a>
            </>}
        </dialog>
    </>;
}
