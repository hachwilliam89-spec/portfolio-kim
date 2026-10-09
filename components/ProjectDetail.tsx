'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { useLanguage, fr, en } from '@/lib/i18n';
import RichText from './RichText';
import ProjectCover from './ProjectCover';

export default function ProjectDetail({ project, others }: {
    project: Project;
    others: { title: string; href: string }[];
}) {
    const { lang } = useLanguage();
    const english = lang === 'en';
    const t = english ? en : fr;
    const study = english ? project.caseStudyEn ?? project.caseStudy : project.caseStudy;
    const fields = study ? [
        [t.projects.caseNeed, study.need], [t.projects.caseRole, study.role],
        [t.projects.caseResult, study.result], [t.projects.caseChallenge, study.challenge],
    ] : [];
    return (
        <article className="mx-auto max-w-5xl px-6 pb-20 pt-32 text-ink">
            <nav aria-label={english ? 'Breadcrumb' : 'Fil d’Ariane'} className="mb-8 text-sm text-ink/70">
                <Link href="/" className="underline underline-offset-4">{english ? 'Home' : 'Accueil'}</Link>
                <span aria-hidden="true"> / </span>
                <Link href="/#projects" className="underline underline-offset-4">{t.projects.title}</Link>
                <span aria-hidden="true"> / </span><span aria-current="page">{project.title}</span>
            </nav>
            <header className="mb-10">
                <h1 className="font-display text-4xl font-bold sm:text-5xl">{project.title}</h1>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed">{english ? project.shortDescriptionEn ?? project.shortDescription : project.shortDescription}</p>
                {project.status === 'development' && <p className="mt-4 text-sm text-vermillon dark:text-[#e98c70]">{t.projects.inDevelopment}</p>}
                <ul aria-label={t.projects.technologies} className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map(tech => <li key={tech} className="rounded-full border border-gold/30 bg-gold/15 px-3 py-1.5 text-xs">{tech}</li>)}
                </ul>
                {project.links?.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-full bg-vermillon px-5 py-3 text-sm font-semibold text-white">{t.projects.visitSite}</a>}
                {project.links?.apk && <a href={project.links.apk} download className="mt-6 ml-3 inline-block rounded-full border border-vermillon px-5 py-3 text-sm font-semibold text-vermillon dark:border-[#e98c70] dark:text-[#e98c70]">{t.projects.downloadApk}</a>}
                {project.links?.apk && <p className="mt-3 max-w-xl text-xs opacity-80">{t.projects.apkHint}</p>}
            </header>
            <div className="relative mb-12 h-52 overflow-hidden rounded-lg border border-gold/30 sm:h-80"><ProjectCover project={project} /></div>
            {fields.length > 0 && <div className="mb-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
                {fields.map(([label, text]) => <section key={label}>
                    <h2 className="mb-3 font-display text-2xl text-vermillon dark:text-[#e98c70]">{label}</h2>
                    <RichText text={text} />
                </section>)}
            </div>}
            <section className="border-t border-gold/30 pt-8">
                <h2 className="mb-5 font-display text-2xl">{t.projects.technicalDetails}</h2>
                <RichText text={english ? project.descriptionEn ?? project.description : project.description} />
            </section>
            {project.screenshots.length > 0 && <section className="mt-10">
                <h2 className="mb-6 font-display text-2xl">{english ? 'Screenshots' : 'Aperçu du projet'}</h2>
                <div className="grid gap-8 sm:grid-cols-2">
                    {project.screenshots.map(screenshot => <figure key={screenshot.url}>
                        <div className="relative aspect-video overflow-hidden rounded-lg border border-gold/30 bg-washi-dark">
                            <Image src={screenshot.url} alt={english ? screenshot.titleEn ?? screenshot.title : screenshot.title} fill sizes="(max-width: 639px) 100vw, 50vw" className="object-contain" />
                        </div>
                        <figcaption className="mt-3 text-sm leading-relaxed text-ink/80">
                            <strong className="block text-ink">{english ? screenshot.titleEn ?? screenshot.title : screenshot.title}</strong>
                            {english ? screenshot.descriptionEn ?? screenshot.description : screenshot.description}
                        </figcaption>
                    </figure>)}
                </div>
            </section>}
            <nav aria-label={t.projects.moreProjects} className="mt-12 border-t border-gold/30 pt-8">
                <h2 className="mb-4 font-display text-2xl">{t.projects.moreProjects}</h2>
                <ul className="flex flex-wrap gap-x-6 gap-y-3">{others.map(other => <li key={other.href}><Link href={other.href} className="text-vermillon underline underline-offset-4 dark:text-[#e98c70]">{other.title}</Link></li>)}</ul>
            </nav>
            <Link href="/#contact" className="mt-10 inline-block rounded-lg border border-gold px-5 py-3 text-sm font-medium">{t.nav.contact}</Link>
        </article>
    );
}
