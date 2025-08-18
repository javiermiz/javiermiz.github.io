// src/config/site.ts
export const SITE_CONFIG = {
  title: "Javier Miz Arévalo | Frontend Web Developer",
  description:
    "Senior Frontend Developer with +5 years of experience specializing in React.js, Next.js, and modern web technologies. Expert in creating responsive, high-performance web applications.",
  url: "https://javiermiz.github.io/",
  ogImage: "/profile-og.jpg",
  metadata: {
    themeColor: "#dc2626", // Using primary brand color
    keywords:
      "frontend developer, react developer, astro developer, javascript developer, web developer, frontend engineer, react.js, next.js, typescript, tailwind css, astro, web development, software engineer",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Javier Miz Arévalo",
      jobTitle: "Frontend Developer",
      description:
        "Senior Frontend Developer with +5 years of experience specializing in React.js, Next.js, and modern web technologies.",
      url: "https://javiermiz.github.io/",
      image: "https://javiermiz.github.io/profile-og.jpg",
      sameAs: [
        "https://github.com/javiermiz",
        "https://www.linkedin.com/in/javier-miz/",
      ],
      knowsAbout: [
        "React.js",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "Frontend Development",
        "Web Development",
        "Tailwind CSS",
        "Astro",
      ],
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
    },
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
      },
      es: {
        code: "es",
        name: "Español",
      },
    },
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
export type SiteLanguage = keyof typeof SITE_CONFIG.i18n.languages;
