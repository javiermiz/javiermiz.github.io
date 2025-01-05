// src/config/site.ts
export const SITE_CONFIG = {
  title: 'Javier Miz Arévalo | Frontend Web Developer',
  description:
    'Senior Frontend Developer with +5 years of experience specializing in React.js, Next.js, and modern web technologies. Expert in creating responsive, high-performance web applications.',
  url: 'https://javiermiz.github.io/',
  ogImage: '/images/profile-og.jpg',
  metadata: {
    themeColor: '#0F172A',
  },
  creator: '@javiermiz',
} as const;

export type SiteConfig = typeof SITE_CONFIG;
