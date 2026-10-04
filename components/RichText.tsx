import type { ReactNode } from 'react';

// Rendu "riche" léger des descriptions : **gras**, et puces pour les lignes
// commençant par "- " (les blocs sont séparés par des lignes vides).
export function renderInline(text: string): ReactNode {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
            ? <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
            : <span key={i}>{part}</span>
    );
}

export default function RichText({ text }: { text: string }) {
    const blocks: ReactNode[] = [];
    let bullets: string[] = [];
    const flush = () => {
        if (bullets.length) {
            const items = [...bullets];
            blocks.push(
                <ul key={`ul-${blocks.length}`} className="list-disc pl-5 space-y-1.5 mb-4 marker:text-gold">
                    {items.map((b, i) => <li key={i}>{renderInline(b)}</li>)}
                </ul>
            );
            bullets = [];
        }
    };
    for (const raw of text.split('\n')) {
        const line = raw.trim();
        if (!line) { flush(); continue; }
        if (line.startsWith('- ')) { bullets.push(line.slice(2)); continue; }
        flush();
        blocks.push(<p key={`p-${blocks.length}`} className="mb-3">{renderInline(line)}</p>);
    }
    flush();
    return <div className="text-sm text-ink/80 leading-relaxed mb-6">{blocks}</div>;
}

