import type { AstroGlobal } from 'astro';

export type Locale = 'en' | 'es';

export interface LocaleData {
  profile: {
    name: string;
    role: string;
    location: string;
    availability: string;
    headline: string;
    subheadline: string;
    about: string;
  };
  highlights: string[];
  expertise: {
    technical_skills: Array<{
      name: string;
      level: string;
      proficiency: string;
    }>;
    soft_skills: string[];
    tools_platforms: string[];
  };
  projects: Array<{
    name: string;
    involvement: string;
    url?: string;
    buttonText?: string;
    note?: string;
  }>;
  experience: Array<{
    company: string;
    role: string;
    project?: string;
    period: string;
    location?: string;
    current?: boolean;
    impact_summary: string;
    tech_stack: string[];
    key_contributions: string[];
  }>;
  education: {
    degree: string;
    institution: string;
    year: string;
    relevance: string;
  };
  ui: {
    sections: {
      skills: string;
      projects: string;
      experience: string;
      education: string;
    };
    labels: {
      keyAchievements: string;
      technicalSkills: string;
      professionalSkills: string;
      toolsPlatforms: string;
      recentProjects: string;
      workExperience: string;
      current: string;
      viewProject: string;
      viewCoverage: string;
    };
  };
}

export async function getLocaleData(locale: Locale): Promise<LocaleData> {
  try {
    const data = await import(`../locales/${locale}.json`);
    return data.default;
  } catch (error) {
    console.error(`Failed to load locale data for ${locale}:`, error);
    // Fallback to English if the requested locale fails to load
    if (locale !== 'en') {
      return getLocaleData('en');
    }
    throw error;
  }
}

export function getLocaleFromUrl(Astro: AstroGlobal): Locale {
  const pathname = Astro.url.pathname;
  if (pathname.startsWith('/es/')) {
    return 'es';
  }
  return 'en';
} 