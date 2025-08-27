# Design System & Styling Guidelines

## Overview

This document outlines the design system and styling guidelines for the Javier Miz portfolio website following the **"Classic Minimalism" 🎩** aesthetic. The goal is to create a sophisticated, elegant, and timeless design that combines traditional minimalism with refined classical touches.

## Design Philosophy: Classic Minimalism

### Core Principles

- **Elegant Serif Typography**: Georgia, Times New Roman, Playfair Display for sophistication
- **Subtle Borders**: Soft, refined borders instead of harsh lines
- **Generous Spacing**: Measured and purposeful whitespace
- **Refined Neutral Palette**: Sophisticated grays with elegant accent colors
- **Subtle Textures**: Almost imperceptible textures for depth
- **Soft Shadows**: Gentle shadows instead of flat design

### Styling Methodology

### Approach: Classic Minimalism + Modern CSS

- **Global Styles**: CSS custom properties for sophisticated design tokens
- **Component Styles**: Scoped CSS with classical refinement
- **Utility Classes**: Minimal Tailwind usage for layout only
- **Typography**: Serif-first approach with elegant hierarchy

## Design Tokens

### Color Palette - Classic Minimalism

```css
:root {
  /* Primary Colors - Refined Red Accent */
  --color-primary: #dc2626; /* Red - sophisticated */
  --color-primary-hover: #b91c1c; /* Darker Red */
  --color-primary-light: #f87171; /* Light Red */

  /* Neutral Colors - Red-tinted Grays */
  --color-text-primary: #3c2626; /* Dark Red-Gray - softer than black */
  --color-text-secondary: #6b4545; /* Medium Red-Gray */
  --color-text-muted: #9a7070; /* Light Red-Gray */
  --color-text-light: #c8a8a8; /* Very Light Red-Gray */

  /* Background Colors - Warm Red Neutrals */
  --color-bg-primary: #fefcfc; /* Off-white with red tint */
  --color-bg-secondary: #faf6f6; /* Warm Red-Gray */
  --color-bg-tertiary: #f5f0f0; /* Slightly darker warm red-gray */
  --color-bg-code: #f7f3f3; /* Code background with red tint */

  /* Border Colors - Red-tinted & Refined */
  --color-border-subtle: #f0e7e7; /* Very light red border */
  --color-border-light: #e6d5d5; /* Light red border */
  --color-border-medium: #d4bdbd; /* Medium red border */
  --color-border-accent: #dc2626; /* Red accent border */

  /* Shadow Colors - Soft & Natural */
  --shadow-subtle: rgba(44, 44, 44, 0.04);
  --shadow-light: rgba(44, 44, 44, 0.08);
  --shadow-medium: rgba(44, 44, 44, 0.12);
  --shadow-strong: rgba(44, 44, 44, 0.16);
}
```

### Typography - Classic Minimalism

```css
:root {
  /* Font Families - Serif First */
  --font-primary: "Georgia", "Times New Roman", "Times", serif;
  --font-serif: "Playfair Display", "Georgia", "Times New Roman", serif;
  --font-body: "Georgia", "Times New Roman", "Times", serif;
  --font-mono: "Fira Code", "Monaco", "Consolas", monospace;

  /* Font Sizes - Elegant Scale */
  --text-xs: 0.8rem; /* 12.8px */
  --text-sm: 0.9rem; /* 14.4px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.3rem; /* 20.8px */
  --text-2xl: 1.6rem; /* 25.6px */
  --text-3xl: 2.2rem; /* 35.2px */
  --text-4xl: 2.8rem; /* 44.8px */
  --text-5xl: 3.6rem; /* 57.6px */

  /* Font Weights - Refined */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights - Classical Proportions */
  --line-height-tight: 1.3;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.65;
  --line-height-loose: 1.8;

  /* Letter Spacing - Subtle Refinement */
  --letter-spacing-tight: -0.01em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.02em;
  --letter-spacing-wider: 0.05em;
}
```

### Spacing - Generous & Measured

```css
:root {
  /* Spacing Scale - Classical Proportions */
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
  --space-20: 5rem; /* 80px */
  --space-24: 6rem; /* 96px */

  /* Content Spacing - Generous */
  --content-spacing-sm: var(--space-8); /* Small content spacing */
  --content-spacing-md: var(--space-12); /* Medium content spacing */
  --content-spacing-lg: var(--space-16); /* Large content spacing */
  --content-spacing-xl: var(--space-20); /* Extra large content spacing */
}
```

### Shadows - Soft & Natural

```css
:root {
  /* Box Shadows - Subtle Depth */
  --shadow-xs: 0 1px 2px var(--shadow-subtle);
  --shadow-sm: 0 1px 3px var(--shadow-light), 0 1px 2px var(--shadow-subtle);
  --shadow-md: 0 4px 6px var(--shadow-light), 0 2px 4px var(--shadow-subtle);
  --shadow-lg: 0 10px 15px var(--shadow-medium), 0 4px 6px var(--shadow-light);
  --shadow-xl: 0 20px 25px var(--shadow-medium), 0 10px 10px var(--shadow-light);

  /* Text Shadows - Subtle Enhancement */
  --text-shadow-subtle: 0 1px 2px var(--shadow-subtle);
  --text-shadow-soft: 0 2px 4px var(--shadow-light);
}
```

### Transitions - Elegant & Smooth

```css
:root {
  /* Transition Durations */
  --transition-fast: 0.15s;
  --transition-normal: 0.25s;
  --transition-slow: 0.4s;
  --transition-slower: 0.6s;

  /* Transition Easings - Natural Movement */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Common Transitions */
  --transition-colors: color var(--transition-normal) var(--ease-in-out),
    background-color var(--transition-normal) var(--ease-in-out),
    border-color var(--transition-normal) var(--ease-in-out);
  --transition-transform: transform var(--transition-normal) var(--ease-in-out);
  --transition-opacity: opacity var(--transition-normal) var(--ease-in-out);
  --transition-all: all var(--transition-normal) var(--ease-in-out);
}
```

### Border Radius - Subtle Refinement

```css
:root {
  /* Border Radius - Soft Corners */
  --radius-none: 0;
  --radius-sm: 0.125rem; /* 2px */
  --radius-md: 0.25rem; /* 4px */
  --radius-lg: 0.375rem; /* 6px */
  --radius-xl: 0.5rem; /* 8px */
  --radius-2xl: 0.75rem; /* 12px */
  --radius-full: 9999px;
}
```

## Component Guidelines

### Global Components

- **Header**: Navigation, logo, language toggle
- **Footer**: Copyright, social links
- **Typography**: Headings, paragraphs, links

### Page-Specific Components

- **CV Template**: Professional layout with sections
- **Blog Template**: Article listing with metadata
- **Post Template**: Individual blog post layout

## Styling Rules - Classic Minimalism

### 1. Typography-First Approach

- **Serif fonts are primary**: Use Georgia/Playfair Display for all content
- **Sans-serif only for UI**: Navigation, buttons, form labels
- **Generous line heights**: Minimum 1.5, prefer 1.65 for body text
- **Subtle letter spacing**: Use sparingly for headings only

### 2. Sophisticated Color Usage

- **Warm neutrals over cold grays**: Use the refined palette
- **Subtle accent color**: Brown tones instead of bright colors
- **Soft contrasts**: Avoid pure black, use charcoal (#2c2c2c)
- **Background warmth**: Off-white (#fefefe) instead of pure white

### 3. Elegant Spacing & Layout

- **Generous whitespace**: Use larger spacing values
- **Measured proportions**: Follow classical spacing ratios
- **Content breathing room**: Minimum --content-spacing-md between sections
- **Asymmetrical balance**: Not everything needs to be centered

### 4. Subtle Visual Enhancements

- **Soft shadows**: Always use predefined shadow variables
- **Refined borders**: Subtle colors, avoid harsh lines
- **Gentle transitions**: Longer durations (0.25s+) with natural easing
- **Minimal textures**: Almost imperceptible background patterns

### 5. Component Hierarchy

- **Clear visual hierarchy**: Use typography scale consistently
- **Semantic structure**: Proper heading levels (h1-h6)
- **Elegant interactions**: Subtle hover states with soft transitions
- **Classical proportions**: Golden ratio and rule of thirds

### 6. Responsive Refinement

- **Mobile-first with elegance**: Maintain sophistication on all devices
- **Readable typography**: Larger base font sizes on mobile
- **Touch-friendly**: Adequate spacing for touch targets
- **Progressive enhancement**: Core content accessible everywhere

## File Structure

```
src/components/
├── Layout.astro           # Global styles and layout
├── templates/
│   ├── blog-template.astro # Blog listing styles
│   ├── cv-template.astro   # CV page styles
│   └── post-template.astro # Individual post styles
└── molecules/             # Reusable components
```

## Implementation Strategy - Classic Minimalism

### Phase 1: Typography Foundation

1. **Import elegant fonts**: Add Playfair Display and ensure Georgia fallbacks
2. **Update font hierarchy**: Implement serif-first typography system
3. **Refine text styles**: Apply generous line heights and subtle letter spacing

### Phase 2: Color & Visual Refinement

1. **Implement warm palette**: Replace cold grays with sophisticated neutrals
2. **Add soft shadows**: Apply subtle depth throughout the design
3. **Refine borders**: Replace harsh lines with elegant, subtle borders

### Phase 3: Spacing & Layout Enhancement

1. **Increase whitespace**: Apply generous, measured spacing
2. **Classical proportions**: Implement golden ratio and balanced layouts
3. **Content breathing room**: Ensure adequate spacing between sections

### Phase 4: Interactive Refinement

1. **Elegant transitions**: Implement smooth, natural animations
2. **Sophisticated hover states**: Subtle color and shadow changes
3. **Touch-friendly interactions**: Ensure accessibility on all devices

## Maintenance Guidelines - Classic Minimalism

### Typography Standards

- **Always use serif fonts** for content (Georgia/Playfair Display)
- **Sans-serif only for UI elements** (navigation, buttons, labels)
- **Maintain generous line heights** (minimum 1.5, prefer 1.65)
- **Use typography scale consistently** for visual hierarchy

### Color Guidelines

- **Stick to the warm neutral palette** - no cold grays
- **Use brown accent sparingly** - only for important elements
- **Maintain soft contrasts** - avoid pure black or white
- **Test color combinations** for accessibility and elegance

### Spacing & Layout Rules

- **Use generous whitespace** - don't be afraid of empty space
- **Follow classical proportions** - golden ratio and rule of thirds
- **Maintain content breathing room** - minimum --content-spacing-md
- **Consider asymmetrical balance** - not everything needs centering

### Visual Enhancement Standards

- **Always use predefined shadows** - no custom shadow values
- **Keep borders subtle** - use refined border colors only
- **Implement smooth transitions** - minimum 0.25s duration
- **Add textures sparingly** - almost imperceptible patterns only

## Browser Support & Performance

- **Modern browsers required**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **CSS Custom Properties essential**: Full support required
- **Font loading optimization**: Preload critical fonts
- **Progressive enhancement**: Core content accessible without CSS

## Quality Assurance

- **Typography readability**: Test on various devices and screen sizes
- **Color contrast compliance**: Ensure WCAG AA standards
- **Touch target sizing**: Minimum 44px for interactive elements
- **Performance monitoring**: Keep font loading and CSS size optimized

This Classic Minimalism design system creates a sophisticated, timeless aesthetic that balances elegance with usability, ensuring a refined user experience across all touchpoints.
