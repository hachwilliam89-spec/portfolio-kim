import type { RawProjectLinks, ProjectLinks } from './types';

export function normalizeLinks(links?: RawProjectLinks): ProjectLinks | undefined {
    if (!links) return undefined;
    return {
        live: links.demo ?? links.live ?? undefined,
        github: links.gitlab ?? links.github ?? undefined,
    };
}