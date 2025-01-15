// src/config/site.ts
export const SITE_CONFIG = {
  title: "Javier Miz Arévalo | Frontend Web Developer",
  description:
    "Senior Frontend Developer with +5 years of experience specializing in React.js, Next.js, and modern web technologies. Expert in creating responsive, high-performance web applications.",
  url: "https://javiermiz.github.io/",
  ogImage: "/profile-og.jpg",
  metadata: {
    themeColor: "#0F172A",
  },
  creator: "@javiermiz",
  contact: {
    email: "javiermizarevalo@gmail.com",
  },
  social: {
    github: "https://github.com/javiermiz",
    linkedin: "https://www.linkedin.com/in/javier-miz/",
  },
  i18n: {
    defaultLang: "en" as const,
    languages: {
      en: {
        code: "en",
        name: "English",
        dir: "ltr",
      },
      es: {
        code: "es",
        name: "Español",
        dir: "ltr",
      },
    },
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
export type SiteLanguage = keyof typeof SITE_CONFIG.i18n.languages;
