# Proyecto Blog Minimalista

## 📝 Descripción General

Desarrollo de un blog personal minimalista enfocado en fotografía y contenido visual, siguiendo principios de diseño clean y funcional con máximo énfasis en texto y velocidad.

## 🎯 Objetivos

- Crear una presencia digital profesional y minimalista
- Mostrar trabajo fotográfico y contenido personal
- Establecer una plataforma para compartir pensamientos e ideas
- Ofrecer recursos visuales (wallpapers) a los visitantes

## 📋 Estructura del Sitio

### 🏠 Página Principal (Blog)

**Ruta:** `/` o `/blog`

**Funcionalidades:**

- Lista simple de entradas de blog en orden cronológico
- Títulos como enlaces directos (sin tarjetas ni previews)
- Categorías como texto plano separado por comas
- Buscador básico tipo input de texto
- Paginación con números simples (1, 2, 3...)
- Sin sidebar - layout de una sola columna

**Contenido típico:**

- Posts sobre técnicas fotográficas
- Reflexiones personales
- Historias detrás de las fotos
- Reseñas de equipo
- Experiencias de viaje

### 👤 Página CV (Curriculum)

**Ruta:** `/cv` o `/about`

**Estructura actual (ya implementada):**

- **Profile Header:** Nombre, rol, ubicación, disponibilidad
- **Navegación interna:** Enlaces a secciones (skills, projects, experience, education)
- **Highlights:** Logros clave destacados
- **Skills & Expertise:** Habilidades técnicas, profesionales y herramientas
- **Recent Projects:** Proyectos con enlaces y descripciones
- **Work Experience:** Experiencia laboral detallada con tech stack
- **Education:** Formación académica

**Adaptaciones para minimalismo extremo:**

- Remover todos los iconos (Briefcase, Clock, MapPin, etc.)
- Convertir NavButtons en enlaces de texto simple
- Eliminar componentes como SkillItem, ProjectCard, ExperienceCard
- Usar listas HTML básicas en lugar de componentes personalizados
- Mantener la estructura de datos JSON pero simplificar la presentación visual

## 🎨 Diseño Visual

### Paleta de Colores

- **Principal:** Blanco (#FFFFFF)
- **Secundario:** Gris claro (#F5F5F5)
- **Texto:** Gris oscuro (#333333)
- **Base:** Negro (#000000)
- **Accent:** Rojo intenso (#DC2626) - Para links, botones y elementos interactivos
- **Accent hover:** Rojo más oscuro (#B91C1C)

### Tipografía

- **Títulos:** Inter/Helvetica Neue (sans-serif)
- **Cuerpo:** Georgia/Times (serif para legibilidad)
- **Código:** Fira Code (monospace)

### Principios de Diseño

- **Máximo texto, mínimo styling**
- **Sin imágenes decorativas o de fondo**
- **Navegación puramente textual**
- **Layout básico sin efectos visuales**
- **Enfoque en legibilidad y velocidad**
- **Estilo "terminal/documento de texto"**

## 🛠️ Especificaciones Técnicas

### Tecnologías Sugeridas

- **Frontend:** Astro (ya implementado para CV)
- **Blog:** Astro con content collections o MDX
- **Styling:** CSS vanilla mínimo (sin Tailwind ni frameworks)
- **Hosting:** Netlify, Vercel, GitHub Pages

### Funcionalidades Core

- Responsive design básico
- SEO optimizado
- Sitemap automático
- RSS feed
- Google Analytics
- Sin comentarios (para mantener simplicidad)
- Formulario de contacto minimalista
- Búsqueda por texto simple

### Performance

- Optimización de imágenes
- CSS mínimo sin frameworks
- JavaScript minimal o nulo
- Tiempo de carga < 1 segundo
- Tamaño total de página < 50kb

## 📱 Navegación

### Menú Principal

```
[LOGO] ——— Blog ——— CV ——— 🔍
```

### Footer Minimalista

- Copyright en texto plano
- Enlaces legales como texto simple
- Redes sociales como enlaces de texto (sin iconos)
- RSS como enlace de texto

## 🎯 Audiencia Objetivo

- Amantes del diseño minimalista
- Personas buscando wallpapers de calidad
- Clientes potenciales para servicios fotográficos

## 📝 Notas para el Desarrollador

- **ADAPTAR CV EXISTENTE:** Ya tienes un CV funcional en Astro - simplificar removiendo iconos, componentes visuales y styling elaborado
- **ULTRA MINIMALISTA:** Máximo texto, mínimo CSS, cero JavaScript no esencial
- **Sin imágenes:** Ni decorativas, ni de fondo, ni iconos - solo texto
- **Sin frameworks CSS:** Convertir de componentes a HTML/CSS básico
- **Mantener estructura de datos:** El JSON del CV está bien - solo cambiar la presentación
- **Blog simple:** Usar Astro content collections para posts en Markdown
- **Layout súper simple:** Una columna, márgenes básicos, tipografía clara
- \*\*El color accent (#DC2626) solo para enlaces - usar con extrema moderación

---

**Fecha de creación:** Agosto 2025  
**Última actualización:** Agosto 2025  
**Estado:** Listo para desarrollo
