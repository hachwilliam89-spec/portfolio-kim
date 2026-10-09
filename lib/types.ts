// lib/types.ts

export interface Screenshot {
    url: string;
    title: string;
    description: string;
    titleEn?: string;
    descriptionEn?: string;
    shortTitle?: string;
    shortTitleEn?: string;
    /** Horizontal focus (0–100) when a landscape montage is shown as one portrait screen. */
    portraitFocus?: number;
}

export interface RawProjectLinks {
    gitlab?: string;
    demo?: string;
    /** Lien de téléchargement direct d'une application Android (.apk). */
    apk?: string;
    [key: string]: string | undefined;
}

export interface ProjectLinks {
    live?: string;
    github?: string;
}

export interface CaseStudy {
    need: string;
    role: string;
    result: string;
    challenge: string;
}

export interface Project {
    id: number;
    slug: string;
    previousVersionId?: number;
    title: string;
    shortDescription: string;
    shortDescriptionEn?: string;
    description: string;
    descriptionEn?: string;
    caseStudy?: CaseStudy;
    caseStudyEn?: CaseStudy;
    tech: string[];
    image: string;
    imageKind?: 'logo';
    status?: 'development';
    screenshots: Screenshot[];
    links?: RawProjectLinks;
}

// Type spécifique pour la modale (toutes propriétés optionnelles sauf les essentielles)
export type ProjectModalData = Pick<Project, 'title' | 'description' | 'screenshots' | 'tech'> & {
    links?: RawProjectLinks;
};
