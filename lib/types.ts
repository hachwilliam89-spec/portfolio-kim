// lib/types.ts

export interface Screenshot {
    url: string;
    title: string;
    description: string;
}

export interface RawProjectLinks {
    gitlab?: string;
    demo?: string;
    [key: string]: string | undefined;
}

export interface ProjectLinks {
    live?: string;
    github?: string;
}

export interface Project {
    id: number;
    title: string;
    shortDescription: string;
    description: string;
    tech: string[];
    image: string;
    screenshots: Screenshot[];
    links?: RawProjectLinks;
}

// Type spécifique pour la modale (toutes propriétés optionnelles sauf les essentielles)
export type ProjectModalData = Pick<Project, 'title' | 'description' | 'screenshots' | 'tech'> & {
    links?: RawProjectLinks;
};
