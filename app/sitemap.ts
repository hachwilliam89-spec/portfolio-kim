import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://portfolio-c85sn05ws-hachwilliam89s-projects.vercel.app/',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://portfolio-c85sn05ws-hachwilliam89s-projects.vercel.app/CV_Kim_HACH_Developpeur_Fullstack.pdf',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]
}