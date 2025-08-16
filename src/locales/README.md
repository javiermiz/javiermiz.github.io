# Localization Setup

This directory contains locale files for the CV website. The localization system allows for easy management of content in multiple languages.

## Structure

```
src/
├── locales/
│   ├── en.json          # English locale data
│   ├── es.json          # Spanish locale data
│   ├── index.d.ts       # TypeScript declarations
│   └── README.md        # This file
├── components/
│   └── CVLayout.astro   # Reusable CV layout component
└── utils/
    └── i18n.ts          # Localization utilities
```

## Architecture

The CV website now uses a **component-based architecture** with:

1. **Locale Files** (`src/locales/`) - JSON files containing all content
2. **CVLayout Component** (`src/components/CVLayout.astro`) - Reusable layout with all styling and structure
3. **Page Files** (`src/pages/`) - Simple pages that just load locale data and pass it to the layout

## Locale Files Structure

Each locale file contains the following sections:

### Profile

- `name`: Full name
- `role`: Job title
- `location`: Preferred location
- `availability`: Availability status
- `headline`: Main headline
- `subheadline`: Subtitle
- `about`: About section text

### Highlights

Array of key achievements and highlights.

### Expertise

- `technical_skills`: Array of technical skills with name, level, and proficiency
- `soft_skills`: Array of professional/soft skills
- `tools_platforms`: Array of tools and platforms

### Projects

Array of project objects with:

- `name`: Project name
- `involvement`: Role and description
- `url`: Optional project URL
- `buttonText`: Optional custom button text
- `note`: Optional additional note

### Experience

Array of work experience objects with:

- `company`: Company name
- `role`: Job title
- `project`: Optional project name
- `period`: Time period
- `location`: Optional location
- `current`: Boolean for current position
- `impact_summary`: Summary of impact
- `tech_stack`: Array of technologies used
- `key_contributions`: Array of key contributions

### Education

- `degree`: Degree name
- `institution`: Institution name
- `year`: Graduation year
- `relevance`: Relevance description

### UI

- `sections`: Section titles for navigation
- `labels`: UI labels and button text

## Usage

### In Astro Pages

```astro
---
import CVLayout from "@components/CVLayout.astro";
import { getLocaleData } from "../utils/i18n";

const CV_DATA = await getLocaleData("en"); // or 'es'
---

<CVLayout lang="en" title="Javier Miz - Frontend Developer" data={CV_DATA} />
```

### CVLayout Component Props

The `CVLayout` component accepts:

- `lang`: Language code ("en" | "es")
- `title`: Page title
- `data`: Locale data object

## Adding a New Language

1. Create a new JSON file in the `src/locales/` directory (e.g., `fr.json`)
2. Copy the structure from an existing locale file
3. Translate all the content
4. Update the `Locale` type in `src/utils/i18n.ts` to include the new language
5. Create a new page file that uses the `CVLayout` component

### Example New Language Page

```astro
---
import CVLayout from "@components/CVLayout.astro";
import { getLocaleData } from "../utils/i18n";

const CV_DATA = await getLocaleData("fr");
---

<CVLayout lang="fr" title="Javier Miz - Développeur Frontend" data={CV_DATA} />
```

## Utility Functions

The `src/utils/i18n.ts` file provides:

- `getLocaleData({language: Locale, page: string}): Promise<LocaleData>`: Loads locale data from JSON files
- TypeScript interfaces for type safety

## Benefits

- **Single Source of Truth**: All CV structure and styling is in one component
- **Easy Maintenance**: Update layout once, affects all languages
- **Content Separation**: Content is separated from presentation
- **Type Safety**: TypeScript interfaces ensure data consistency
- **Scalability**: Easy to add new languages
- **Fallback Support**: Automatic fallback to English if a locale fails to load
- **DRY Principle**: No code duplication between language pages

## File Sizes

After refactoring:

- **English page**: ~10 lines (was ~370 lines)
- **Spanish page**: ~10 lines (was ~572 lines)
- **CVLayout component**: ~370 lines (reusable across all languages)

This represents a **95% reduction** in code duplication!
