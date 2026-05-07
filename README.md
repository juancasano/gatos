# Mundo Felino — Sitio web sobre gatos

> Página informativa interactiva sobre gatos, desplegada en Netlify. Ejercicio extendido a partir del módulo del certificado de profesionalidad **IFCD0110 - Confección y Publicación de Páginas Web** (SOC).

**[🌐 Ver en producción → gatosisidoros.netlify.app](https://gatosisidoros.netlify.app)**

---

## Resumen

Página single-page sobre gatos (características, cuidados, tutorial de dibujo, galería interactiva, FAQ y contacto). Originalmente era un ejercicio estático sin JavaScript; lo he ampliado significativamente con interactividad real, accesibilidad, optimización y PWA.

---

## Stack técnico

| Capa | Tecnologías |
|---|---|
| **Estructura** | HTML5 semántico (`header`, `main`, `section`, `article`) |
| **Estilos** | CSS3 + Bootstrap 5.3 + tema Bootswatch (Sketchy) + variables CSS para theming |
| **JavaScript** | Vanilla JS (sin frameworks). IIFE, módulos, async/await, IntersectionObserver |
| **Imágenes** | Formato AVIF (mejor compresión que JPG/WebP) |
| **PWA** | Manifest + Service Worker con estrategia Cache First |
| **SEO** | Meta tags, Open Graph, Twitter Cards, Schema.org markup, Sitemap XML, robots.txt, canonical |
| **Analytics** | Google Analytics (gtag.js) |
| **Despliegue** | Netlify (continuous deployment desde GitHub) |

---

## Features interactivas

### 🌓 Dark mode
- Toggle en la navbar (icono luna/sol)
- Detecta preferencia del sistema con `prefers-color-scheme`
- Persiste la elección con `localStorage`
- Variables CSS para cambio de tema instantáneo

### 🔍 Buscador de galería en tiempo real
- Filtra imágenes según etiquetas (`data-tags`)
- Búsqueda mientras escribes (sin botón submit)
- Mensaje de "sin resultados" si no hay coincidencias

### 🖼️ Lightbox para galería
- Click en cualquier imagen → se abre a pantalla completa
- Navegación con **flechas del teclado** (← →)
- **Cierre con Escape** o click fuera
- **Swipe en móvil** (touch events)
- Contador "X / Y" para saber dónde estás
- Fondo oscuro semi-transparente con animación

### 📝 Formulario de contacto con validación
- Validación cliente con regex (email, longitudes mínimas)
- Feedback visual en tiempo real (`is-valid` / `is-invalid`)
- Mensajes de error específicos por campo (live region)
- `aria-live="polite"` para lectores de pantalla
- Mensaje de éxito tras envío correcto

### 🎬 Animaciones de scroll
- **Intersection Observer API** (más eficiente que scroll listeners)
- Fade-in + slide-up al entrar las secciones en viewport
- Respeta `prefers-reduced-motion` (accesibilidad)

### ⬆️ Botón "ir arriba"
- Aparece tras 400px de scroll
- Scroll suave al top con `behavior: 'smooth'`
- Throttling con `requestAnimationFrame` para performance

### 📱 PWA (Progressive Web App)
- **Manifest.json** completo con iconos, colores, orientación
- **Service Worker** que precachea assets críticos
- Estrategia **Cache First** con fallback a red
- **Instalable** en móvil/escritorio (prompt automático)
- **Funciona offline** tras primera visita

### ♿ Accesibilidad
- **Skip link** para saltar al contenido principal (visible al hacer focus)
- `aria-label` y `aria-hidden` correctos en iconos y botones
- `aria-live="polite"` en mensajes dinámicos
- Navegación por teclado en galería (Enter/Space)
- Contraste de colores adecuado en ambos temas
- `role="dialog"` en lightbox

### 🚀 Optimización
- Imágenes en **AVIF** (~50% menos peso que JPG)
- `loading="lazy"` en imágenes secundarias
- `fetchpriority="high"` en hero
- Preload de recursos críticos
- Service Worker para cacheo agresivo
- CSS y JS separados en archivos propios

### 🌐 SEO técnico
- **Schema.org** structured data tipo `Article`
- **Open Graph** para Facebook/LinkedIn/WhatsApp
- **Twitter Cards** para previsualización en X
- `<link rel="canonical">` para evitar contenido duplicado
- Meta `theme-color` para barra de navegador móvil
- Sitemap XML indexado en Search Console
- `robots.txt` configurado

---

## Estructura del proyecto

```
├── index.html                  # Página principal con todas las secciones
├── css/
│   └── styles.css              # Dark mode, lightbox, animaciones, formulario
├── js/
│   └── app.js                  # Toda la lógica interactiva (vanilla JS)
├── images/                     # 8 imágenes en formato AVIF
├── manifest.json               # PWA: nombre, iconos, colores, orientación
├── sw.js                       # Service Worker (Cache First strategy)
├── robots.txt                  # Reglas para crawlers
├── sitemap-index.xml           # Sitemap para Search Console
└── README.md                   # Este archivo
```

---

## Lo que aprendí ampliándolo

**Empezó como un ejercicio académico estático**. Al volver a él meses después decidí usarlo como banco de pruebas para conceptos modernos que NO se cubren en el certificado IFCD0110:

- **JavaScript moderno (ES6+)**: IIFE para encapsulación, arrow functions, destructuring, optional chaining (`?.`), `requestAnimationFrame` para throttling.
- **Web APIs**: IntersectionObserver, Service Worker, localStorage, matchMedia.
- **Accesibilidad real**: ARIA, navegación por teclado, prefers-reduced-motion, focus management.
- **PWA basics**: manifest, service worker, estrategia de caché, instalación.
- **CSS moderno**: variables CSS para theming, `aspect-ratio`, `:focus-visible`, `prefers-color-scheme`.
- **SEO avanzado**: Open Graph, Twitter Cards, Schema.org, canonical.

Todos estos conceptos los apliqué después en mi proyecto principal, **[Camiglobo Barcelona](https://github.com/juancasano/proyecto)** (e-commerce full stack en producción).

---

## Cómo probarlo en local

```bash
git clone https://github.com/juancasano/gatos.git
cd gatos
# Cualquier servidor estático sirve. Ejemplo con Python:
python -m http.server 8000
# Abre http://localhost:8000
```

> ⚠️ El Service Worker requiere HTTPS o `localhost`. No funciona abriendo el HTML directamente con `file://`.

---

## Notas técnicas honestas

- **Sin build step**: todo es vanilla JS / CSS, sin Webpack, Vite ni transpilación. Decisión consciente para mantener el proyecto simple y fácil de servir directamente desde Netlify.
- **Sin tests**: es un ejercicio estático con poco lógica de negocio crítica. En proyectos reales, sí escribiría tests (en mi siguiente proyecto Vue.js los incluyo desde el día 1).
- **Single-page**: todo el contenido en una sola URL para facilitar el SEO inicial. Para sitios más grandes habría usado un sistema multi-página o un static site generator.

Para proyectos full stack con base de datos, usuarios y panel de administración, consulta **[Camiglobo Barcelona](https://github.com/juancasano/proyecto)** ([camiglobo.com](https://camiglobo.com)).

---

## Autor

**Juan Manuel Casanova Lacasa** — Desarrollador Web Full Stack
📍 Barcelona, España
🔗 [Portafolio](https://juancasano.github.io) · [LinkedIn](https://www.linkedin.com/in/juan-manuel-casanova-lacasa/) · [juancasano83@gmail.com](mailto:juancasano83@gmail.com)
