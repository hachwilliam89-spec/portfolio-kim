import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { currentProjects, projectPath } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
    // No synthetic lastModified: the date must reflect an actual content update.
    return [
        { url: `${SITE_URL}/` },
        ...currentProjects.map(project => ({ url: `${SITE_URL}${projectPath(project)}` })),
    ];
}
