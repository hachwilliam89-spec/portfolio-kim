// The apex domain redirects to www in the production Vercel configuration.
export const SITE_URL = 'https://www.wkhach.dev';
export const SITE_TITLE = 'William Kim HACH — Développeur full-stack web et mobile';
export const SITE_DESCRIPTION = 'William Kim HACH, développeur full-stack en formation à Mulhouse. Projets web et mobiles. Stage de 6 mois dès janvier 2027, en France ou à l’étranger.';
export const SOCIAL_IMAGE = '/og-image-encre.png';
export const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#william-kim-hach`,
    name: 'William Kim HACH',
    url: `${SITE_URL}/`,
    description: 'Développeur full-stack en formation à l’UHA 4.0, en reconversion après quatre ans comme responsable logistique.',
    sameAs: [
        'https://github.com/hachwilliam89-spec',
        'https://www.linkedin.com/in/william-hach-31117b407/',
    ],
};
