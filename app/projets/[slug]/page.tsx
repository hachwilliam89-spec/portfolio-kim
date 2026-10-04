import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { currentProjects, projectPath } from '@/lib/projects';
import { SITE_URL, SOCIAL_IMAGE, person } from '@/lib/seo';
import ProjectDetail from '@/components/ProjectDetail';
import StructuredData from '@/components/StructuredData';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
    return currentProjects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = currentProjects.find(item => item.slug === slug);
    if (!project) return {};
    return {
        title: project.title,
        description: project.shortDescription,
        alternates: { canonical: projectPath(project) },
        openGraph: {
            type: 'article', locale: 'fr_FR', siteName: 'William Kim HACH — Portfolio',
            url: projectPath(project), title: `${project.title} | William Kim HACH`,
            description: project.shortDescription,
            images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: `Portfolio de William Kim HACH — ${project.title}` }],
        },
        twitter: { card: 'summary_large_image', title: `${project.title} | William Kim HACH`, description: project.shortDescription, images: [SOCIAL_IMAGE] },
    };
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = currentProjects.find(item => item.slug === slug);
    if (!project) notFound();
    const url = `${SITE_URL}${projectPath(project)}`;
    return <>
        <StructuredData data={{
            '@context': 'https://schema.org',
            '@graph': [person, {
                '@type': 'CreativeWork', '@id': `${url}#project`,
                name: project.title, url, description: project.shortDescription,
                image: `${SITE_URL}${project.image}`, inLanguage: 'fr',
                contributor: { '@id': person['@id'] },
            }, {
                '@type': 'BreadcrumbList', itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
                    { '@type': 'ListItem', position: 2, name: project.title, item: url },
                ],
            }],
        }} />
        <ProjectDetail project={project} others={currentProjects.filter(item => item.id !== project.id).map(item => ({ title: item.title, href: projectPath(item) }))} />
    </>;
}
