# Gatos — Ejercicio de HTML, Bootstrap y SEO

> Página informativa sobre gatos. Ejercicio del certificado de profesionalidad **IFCD0110 - Confección y Publicación de Páginas Web** (SOC).

**[🌐 Ver en producción → gatosisidoros.netlify.app](https://gatosisidoros.netlify.app)**

---

## ¿Qué es este proyecto?

Página estática de una sola sección sobre gatos: características, cuidados, comportamiento, dibujo paso a paso, galería de imágenes y FAQ. Es un ejercicio del módulo de **construcción y publicación de páginas web**.

Aunque el contenido es sencillo (informativo, sin backend), el ejercicio me sirvió para practicar:

- HTML5 semántico y accesibilidad básica
- Optimización SEO técnica
- Diseño responsive con Bootstrap 5
- Despliegue continuo con Netlify

---

## Stack técnico

| Capa | Tecnologías |
|---|---|
| **Estructura** | HTML5 semántico |
| **Estilos** | CSS3 + Bootstrap 5.3 + tema Bootswatch (Sketchy) |
| **Imágenes** | Formato AVIF (mejor compresión que JPG/WebP) |
| **SEO** | Meta tags, Schema.org markup, Sitemap XML, robots.txt, Search Console |
| **Analytics** | Google Analytics (gtag.js) |
| **Despliegue** | Netlify (continuous deployment desde GitHub) |

---

## Lo que practiqué

### SEO técnico
- Meta tags optimizados (title, description, keywords)
- **Schema.org markup** con structured data tipo `Article`
- **Sitemap XML** indexado en Google Search Console
- `robots.txt` configurado
- URLs limpias y semánticas

### Performance
- **Imágenes AVIF** (formato moderno, ~50% menos peso que JPG)
- **Preload de recursos críticos** (CSS y primera imagen)
- CDN de Bootstrap (jsdelivr)
- Favicon SVG inline (no genera petición HTTP extra)

### Accesibilidad
- Estructura semántica con `<header>`, `<main>`, `<section>`, `<article>`
- Jerarquía correcta de headings (`h1` → `h2` → `h3`)
- Alt text en imágenes
- Contraste de colores adecuado

### Despliegue
- Repositorio conectado a Netlify
- **CI/CD básico**: cada push a `main` despliega automáticamente
- HTTPS automático con certificado de Let's Encrypt
- Dominio gratuito `*.netlify.app`

---

## Estructura del proyecto

```
├── index.html              # Página única con todo el contenido
├── images/                 # 8 imágenes en formato AVIF
├── robots.txt              # Reglas para crawlers
├── sitemap-index.xml       # Sitemap para Search Console
└── googlea6cae3880a655065.html  # Verificación Google Search Console
```

---

## Notas técnicas

Es un ejercicio académico con alcance limitado a propósito:

- **Sin JavaScript propio**: solo el de Bootstrap y Google Analytics. Era el objetivo del módulo de construcción y publicación.
- **Single-page**: toda la información en una sola URL para facilitar el SEO inicial.
- **Sin sistema de gestión**: el contenido es estático y se edita directamente en el HTML.

Para proyectos full stack reales con base de datos, usuarios y panel de administración, consulta mi proyecto **[Camiglobo Barcelona](https://github.com/juancasano/proyecto)** ([camiglobo.com](https://camiglobo.com)).

---

## Autor

**Juan Manuel Casanova Lacasa** — Desarrollador Web Full Stack
📍 Barcelona, España
🔗 [Portafolio](https://juancasano.github.io) · [LinkedIn](https://www.linkedin.com/in/juan-manuel-casanova-lacasa/) · [juancasano83@gmail.com](mailto:juancasano83@gmail.com)
