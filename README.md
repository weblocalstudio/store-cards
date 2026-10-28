# Weblocal Studio – Store Cards Generator

Generador gratuito de capturas promocionales para **App Store** y **Google Play**.

- 100% client-side (sin servidores ni subida de imágenes)
- Privacidad total
- Mockups iPhone & Android
- Plantillas de fondo personalizables
- Exportación PNG / JPG de alta resolución
- Paquete ZIP con assets

## Estructura del proyecto

```
/
├── index.html              → Aplicación principal
├── 404.html                → Página de error
├── css/styles.css          → Estilos
├── js/app.js               → Lógica de la aplicación
├── favicon.ico             → Favicon multi-tamaño
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png    → 180×180
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── favicon.svg
├── site.webmanifest
├── robots.txt
└── sitemap.xml
```

## Cómo usar

1. Sube los archivos a cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, GitHub Pages, Apache, Nginx…).
2. Asegúrate de que las rutas absolutas (`/favicon.ico`, `/css/...`) apunten a la raíz del dominio.
3. Abre `https://tu-dominio.com` y empieza a generar capturas.

## Requisitos del servidor

- Servir `404.html` como página de error personalizada.
- MIME types correctos para `.webmanifest` (`application/manifest+json`).

---

Hecho con ❤️ por Weblocal Studio  
https://store-cards.weblocalstudio.es
