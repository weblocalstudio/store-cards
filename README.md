# Store Cards

![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-8b6cff) ![License: MIT](https://img.shields.io/badge/License-MIT-green.svg) ![Weblocal Studio](https://img.shields.io/badge/by-Weblocal%20Studio-111)

Generador **gratuito y 100% del lado del cliente** de capturas promocionales para App Store y Google Play. Sin backend: todo se procesa en tu navegador.

🔗 Repositorio: https://github.com/weblocalstudio/store-cards

## Características
- Arrastra y suelta tus capturas
- Medidas oficiales de App Store (iPhone 6.9"/6.5"/6.3", iPad 13", Mac) y Google Play; la lámina entera cambia de tamaño al cambiar de dispositivo u orientación
- Marcos iPhone, Android, iPad y Mac, varias láminas por proyecto
- Marcos iPhone y Android, vertical y apaisado
- Editor con pestañas: Fondo, Texto, Dispositivo, Exportar
- Degradados, formas decorativas, fuentes, sombras y texto arrastrable
- Exportación PNG/JPG en alta resolución
- Láminas separadas por dispositivo (iPhone, Android, iPad, Mac), cada una con sus propias capturas
- Galería a pantalla completa y descarga personalizada (eliges qué láminas, en ZIP ordenado por dispositivo)
- Interfaz Glassmorphism en modo oscuro

## Uso local
```bash
git clone https://github.com/weblocalstudio/store-cards.git
cd store-cards
python3 -m http.server 8080   # abre http://localhost:8080
```

## Estructura
```
store-cards/
├── index.html
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
├── CNAME            # store-cards.weblocalstudio.es
├── favicons/        # favicon.svg/.ico, PNGs, manifest, og-image
└── README.md
```

## Favicons
Todos los favicons (SVG, ICO, PNG 16/32/180/192/512, `site.webmanifest` y `og-image.png`) están incluidos en `favicons/`.

## Licencia
🌐 Web: https://store-cards.weblocalstudio.es

Creado por [Weblocal Studio](https://www.weblocalstudio.es) con la ayuda de Claude (Anthropic).

MIT © Weblocal Studio
