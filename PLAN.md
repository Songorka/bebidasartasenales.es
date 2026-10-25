# PLAN DE DESARROLLO — bebidasartesanales.es

Plan por fases para Claude Code. Lee antes `CLAUDE.md` y `DISEÑO.md`.
Objetivo: una web estática, rápida, divulgativa y visualmente propia, publicada en GitHub Pages
con el dominio `bebidasartesanales.es`, lista para empezar a recibir tráfico orgánico.

## Decisiones técnicas (ya tomadas)

| Tema | Decisión | Por qué |
|---|---|---|
| Generador | **Eleventy (11ty) v3** con Nunjucks + Markdown | Artículos en Markdown, HTML puro en salida, cero JavaScript obligatorio, ideal para SEO y GitHub Pages. |
| CSS | CSS propio con custom properties (tokens). Sin Tailwind, sin frameworks. | Control total del aspecto; evita el "look framework". Puede partir de `assets/base.css` de la skill de taste como base neutra. |
| Movimiento | CSS (transitions, `@starting-style`, scroll-timeline) + JS vanilla mínimo. GSAP ScrollTrigger **solo** si la escena firma lo necesita, cargado desde el stage de la skill. | Rendimiento y simplicidad. |
| Mapa | **Leaflet** + teselas de **OpenStreetMap** (gratis, sin clave). Datos en `src/_data/productores.json`. | Sin coste, sin API key, funciona en estático. |
| Analítica | **GoatCounter** (gratis, sin cookies, sin banner). Alternativa: Cloudflare Web Analytics. | Cifras de visitas reales para enseñar a un comprador, sin aviso de cookies. |
| Despliegue | GitHub Actions → GitHub Pages (rama `gh-pages` o artefacto Pages). Fichero `CNAME` con el dominio. | Sin hosting de pago. |
| Repositorio | `Songorka/bebidasartasenales.es` (sic; puede renombrarse a `bebidasartesanales.es`; comprobar con `git remote -v`) | Ya creado por el propietario. |
| Node | Node 22 LTS (lo requieren Eleventy 3 y los scripts de la skill de taste). | — |

## Reglas de ejecución (las fija el propietario)

- Trabaja de forma **autónoma y por lotes**: agrupa varias fases, no pidas aprobación paso a paso.
- Para y pregunta **solo** en: decisiones de producto no cubiertas por `DISEÑO.md`, acciones destructivas o
  irreversibles (borrar, forzar push, cambiar DNS), y pasos sensibles (claves, tokens, `.env`).
- Más pruebas a cambio de menos interrupciones está bien.
- Al final de cada fase: `git add` + commit con mensaje claro en español. Push al terminar cada lote.
- Nunca inventes productores, cifras, citas ni normativa. Verifica con búsqueda web y cita la fuente.
- Si una skill no puede ejecutarse (sin Chrome, sin Node 22, sin red), dilo en el informe y sigue
  con el método alternativo que la propia skill indica. No afirmes haber pasado una comprobación que no corriste.

---

## FASE 0 — Preparación del entorno

1. Comprueba `node -v` (≥ 22) y `git --version`. Si falta Node 22, indícalo al propietario con el enlace de
   descarga de Node LTS y detente (es lo único que no puedes instalar tú en su Windows).
2. `git init` si hace falta; remoto `origin` → el repositorio de GitHub. Rama `main`.
3. `npm init -y`; instala `@11ty/eleventy`, `@11ty/eleventy-plugin-rss`, `markdown-it-anchor`, `html-minifier-terser`, `sharp` (optimización de imágenes).
4. Estructura:
   ```
   src/
     _data/          site.json (nombre, dominio, correo de venta, redes), productores.json, navegacion.json
     _includes/      layouts (base, pagina, articulo, guia), parciales (nav, pie, aviso-venta, creditos)
     assets/         css/, js/, img/, fuentes/ (fuentes autoalojadas en woff2)
     como-distinguir/  cerveza/  vermut-y-destilados/  sin-alcohol/  articulos/  mapa/  comprueba-tu-botella/
     index.njk  404.njk  aviso-legal.md  privacidad.md  sitemap.njk  robots.txt  feed.njk
   .eleventy.js   package.json   .gitignore   CNAME   .github/workflows/deploy.yml
   ```
5. `.gitignore`: `node_modules`, `_site`, `.taste-skill/`, `.DS_Store`.
6. Workflow de GitHub Actions: en cada push a `main`, `npm ci && npx @11ty/eleventy` y despliegue a Pages
   (acción oficial `actions/deploy-pages`). Verifica que el workflow queda en verde tras el primer push.
7. Commit: "Fase 0: estructura del proyecto y despliegue".

**Criterio de salida:** `npx @11ty/eleventy --serve` muestra una página vacía con el layout base; el workflow despliega.

## FASE 1 — Dirección de diseño y sistema visual

Sigue **"The run"** de `.claude/skills/design-taste-frontend/SKILL.md` pasos 1–5, con `DISEÑO.md` como brief:

1. Inventario del tema (8–12 cosas que solo pertenecen a esta web: la etiqueta, el lote, el elaborador,
   el registro sanitario, el vidrio, el lúpulo, el botánico, el alambique, la tapa corona, el precinto…).
2. El argumento ya está escrito en `DISEÑO.md` §6. Úsalo.
3. `node .claude/skills/design-taste-frontend/scripts/draw.mjs --sector <el más cercano> --brief "Web divulgativa para distinguir bebidas artesanales de verdad de las que solo lo parecen (cerveza, vermut y destilados, sin alcohol) en España" --sections intro,features,showcase,list,contact --options 3`.
   Elige la dirección que mejor lleve la idea de `DISEÑO.md` §4. Reparte la hoja completa. Si la paleta
   cae en los colores prohibidos de `DISEÑO.md` §2/§5, `--redraw palette` **una vez** y anótalo.
4. Escribe la idea y la "pieza viva" en `.taste-skill/notas.md`.
5. Escribe el **copy deck** completo de la portada (texto plano) antes de maquetar.
6. Tokens en `src/assets/css/tokens.css`: colores (fondo, tinta, acento, 1–2 campos), escala tipográfica fluida,
   espaciado, curvas y duraciones de movimiento (de `references/motion.md` y de la skill `animate`).
7. Fuentes: elige en Google Fonts según la hoja repartida; **descárgalas y autoalójalas** en woff2
   (`src/assets/fuentes/`) con `font-display: swap`. Sin peticiones a Google en producción.
8. Revisa el plan contra `frontend-design` (SKILL.md, sección "Process"): si algo parece lo que harías para
   cualquier web parecida, cámbialo y anota qué y por qué.
9. Commit: "Fase 1: dirección de diseño, tokens y tipografía".

**Criterio de salida:** hoja de dirección guardada, tokens y fuentes listos, copy deck de la portada escrito.

## FASE 2 — Portada y plantillas

1. Construye la portada **quieta** (sin movimiento), sección a sección según `DISEÑO.md` §6 y los blueprints
   de la hoja repartida. Primero el primer pantallazo en 1440 y 390 px; luego el resto.
2. Dibuja en SVG, en un solo lenguaje gráfico plano con los colores de la paleta:
   - la **etiqueta comentada** (zonas: nombre, elaborador y dirección, lote/fecha, ingredientes, graduación, volumen, registro sanitario);
   - la pareja **etiqueta real / etiqueta disfrazada**;
   - el **sello** de resultado en tres variantes.
3. Imágenes reales: busca con `assets.mjs` 6–10 imágenes libres del mundo de estas bebidas (ver `DISEÑO.md` §5).
   Descárgalas a `src/assets/img/`, optimízalas con `sharp` (AVIF/WebP + fallback, tamaños responsive),
   guarda sus créditos para el pie.
3b. **Huecos para vídeo e imágenes generadas** (`DISEÑO.md` §5, "Huecos para medios"): crea los huecos V1, V2 y G1–G4
   con su fotograma/imagen provisional y un componente `<video>` que solo se activa si el fichero existe
   (comprobación en tiempo de build en `.eleventy.js`: si `src/assets/video/v1.mp4` no está, se renderiza solo el póster).
   Escribe `MEDIOS.md` con medidas, formatos, nombres de fichero exactos y un brief de generación en español por hueco.
   Añade un script `npm run medios` que convierta lo que el propietario suelte en `medios-entrada/` a los formatos y
   tamaños finales (ffmpeg si está disponible; si no, indícalo en `MEDIOS.md`).
4. Plantillas: `base.njk` (head con metadatos SEO, Open Graph, JSON-LD `WebSite`/`Article`, enlace canónico,
   favicon, GoatCounter), `pagina.njk`, `articulo.njk`, `guia.njk`. Parciales de navegación y pie
   (aviso de venta + consumo responsable + créditos + legales).
5. **Puerta:** `lint.mjs` + `inspect.mjs` sobre `_site/index.html`. 0 FAIL. Mira las capturas. Critica con
   `references/critique.md`. Corrige. Máximo tres rondas.
6. Commit: "Fase 2: portada y plantillas".

**Criterio de salida:** portada completa y quieta, 0 FAIL en los tres anchos, imágenes reales con crédito.

## FASE 3 — Contenido: la guía principal y las tres familias

Es la fase más importante para el valor del dominio. Textos largos, bien escritos y verificados.

1. **`/como-distinguir/`** (página madre, 1.500–2.500 palabras) y sus seis subpáginas (700–1.200 palabras cada una):
   qué significa "artesanal" · las señales · leer la etiqueta · falsos artesanos · checklist · glosario.
   - Verifica con búsqueda web: la normativa de etiquetado de bebidas en España/UE, la norma de calidad de la cerveza,
     si existe o no una definición legal de "artesanal"/"artesano" para bebidas (estatal y autonómica), qué es el
     registro sanitario. Cita las fuentes oficiales al pie. Respeta `DISEÑO.md` §9 (no acusar a marcas por su nombre).
2. **`/cerveza/`**, **`/vermut-y-destilados/`**, **`/sin-alcohol/`** (1.200–2.000 palabras cada una), con la
   estructura: qué es · cómo se elabora · estilos/variedades · **cómo distinguir la artesanal en esta bebida** ·
   cómo se sirve y con qué combina · dónde encontrarla (→ mapa filtrado).
3. **Tres artículos** iniciales en `/articulos/`, orientados a búsquedas reales (títulos como preguntas):
   "¿Cómo saber si una cerveza es artesana de verdad?", "Vermut artesano o industrial: en qué se diferencian",
   "¿Qué es la kombucha y por qué no todas son artesanales?".
4. Cada página de guía/artículo: titular ≤ 2 líneas, entradilla, índice de contenidos si > 1.000 palabras,
   imágenes con alt, enlaces internos cruzados (guía ↔ artículos ↔ mapa), fecha y "última revisión".
5. Puerta de taste sobre 2–3 páginas interiores representativas. Commit: "Fase 3: guía principal y guías por bebida".

**Criterio de salida:** 13 páginas de contenido publicables, con fuentes citadas y enlaces internos.

## FASE 4 — Mapa de productores

1. `src/_data/productores.json`: **mínimo 40 productores reales** de España, repartidos entre las tres familias
   y las comunidades autónomas. Campos: `nombre`, `tipo` (cerveza | vermut | destilado | kombucha | refresco | ginger-beer),
   `localidad`, `provincia`, `comunidad`, `web`, `lat`, `lng`, `fuente` (URL donde se verificó), `verificado` (fecha).
   Solo datos públicos de empresas: nombre comercial, localidad y web. **Sin teléfonos ni correos.** Sin invenciones:
   si no se verifica la web del productor, no entra.
2. Página `/mapa/`: Leaflet + OSM, marcadores por tipo (forma/color del acento, no iconos de catálogo), filtros por
   familia y comunidad (botones reales, con estado accesible), lista textual debajo del mapa (misma información,
   indexable, funciona sin JS). Al pulsar un marcador: nombre, localidad, enlace a su web.
3. Enlace desde cada guía con filtro aplicado (`/mapa/?tipo=cerveza`).
4. Bloque "¿Eres productor y no apareces? Escríbenos" → enlace de correo protegido (`{% correo %}`) con asunto preparado.
5. Atribución obligatoria de OpenStreetMap y Leaflet. Commit: "Fase 4: mapa de productores".

**Criterio de salida:** mapa funcional en móvil y escritorio con ≥ 40 productores verificados.

## FASE 5 — "Comprueba tu botella"

1. Seis preguntas sobre lo que el visitante ve en la etiqueta (ejemplos; afínalas con el contenido de la Fase 3):
   ¿Figura quién la elabora (no solo quién la distribuye)? · ¿Indica localidad del elaborador? · ¿Tiene lote o fecha
   de elaboración? · ¿Entiendes todos los ingredientes? · ¿La marca es independiente o pertenece a un gran grupo?
   · ¿Explica cómo está hecha (fermentación, maceración, reposo)?
2. Resultado como **sello** (SVG de la Fase 2), con la explicación de cada respuesta y enlaces a la guía.
3. Funciona sin JavaScript (formulario que muestra las explicaciones) y con el pulgar en móvil. Sin librerías.
4. Se incrusta discretamente al final de la portada y tiene su página propia. Commit: "Fase 5: Comprueba tu botella".

## FASE 6 — Movimiento

Solo ahora. Sigue `DISEÑO.md` §8, `references/motion.md` y la skill `animate`:
1. Escena firma de la portada (la etiqueta que se examina al hacer scroll). Versión reduced-motion.
2. Entradas coreografiadas por sección, distintas entre sí. Contenido visible sin script.
3. Respuesta de botones, enlaces, filtros del mapa y del test. Estampado del sello.
4. Una imagen en movimiento (deriva lenta de la foto grande).
5. `inspect.mjs` y, si hay escena, `scenes.mjs`. Revisa capturas. Commit: "Fase 6: movimiento".

## FASE 7 — SEO, analítica, legal y dominio

1. **SEO técnico:** `sitemap.xml`, `robots.txt`, `feed.xml`, canónicos, metadatos únicos por página, Open Graph con
   imagen (genera una imagen OG por defecto con el nombre de la web), JSON-LD (`WebSite`, `Article`, `BreadcrumbList`),
   `lang="es"`, títulos ≤ 60 caracteres, descripciones ≤ 155.
2. **Analítica sin cookies:** script de GoatCounter en `base.njk`. El propietario tiene que crear la cuenta
   (gratis) en goatcounter.com y pasar el código del sitio; déjalo preparado como variable en `site.json` y
   explica en `README.md` cómo rellenarlo (clic a clic).
3. **Search Console:** deja preparado en `base.njk` un hueco para la etiqueta `<meta name="google-site-verification">`
   (variable en `site.json`) y escribe en `README.md` los pasos clic a clic para dar de alta la web y enviar el sitemap.
4. **Páginas legales:** aviso legal (titular: Duaba Directorship, S.L., con los datos que el propietario complete:
   deja marcados `[CIF]` y `[DOMICILIO]`), política de privacidad (sin cookies, sin formularios que guarden datos,
   analítica anónima), créditos de imágenes.
5. **Dominio personalizado:** fichero `CNAME` con `bebidasartesanales.es`. Escribe en `README.md` los pasos clic a clic
   para configurar el dominio en GitHub Pages y los registros DNS en el registrador (A → IPs de GitHub Pages y
   CNAME `www` → `songorka.github.io`), y activar HTTPS. **No toques DNS tú:** eso lo hace el propietario.
6. Lighthouse móvil: rendimiento ≥ 90, accesibilidad ≥ 95, SEO ≥ 95. Corrige hasta cumplirlo.
7. Commit y push: "Fase 7: SEO, analítica, legal y dominio".

## FASE 8 — Revisión final e informe

1. Puerta completa: `lint.mjs`, `inspect.mjs` (y `scenes.mjs`) en portada, una guía, un artículo, el mapa y el test. 0 FAIL.
2. Comprueba cada punto de `DISEÑO.md` §2 (los "tells"): ninguno presente.
3. Navega toda la web con teclado; comprueba que todo se lee sin JavaScript; prueba en 390 px.
4. Escribe `INFORME.md` para el propietario (en español, sin jerga): qué se ha construido, la dirección elegida
   y por qué, las imágenes usadas y sus créditos, lo que queda pendiente de su mano (cuenta GoatCounter, Search Console,
   DNS, CIF/domicilio del aviso legal, renombrar el repositorio si quiere, **generar los vídeos e imágenes de `MEDIOS.md`
   y soltarlos en `medios-entrada/`**), y los textos que conviene revisar.
5. Commit y push: "Fase 8: revisión final".

---

## Después (fuera de este plan)

- **Calendario de contenidos:** un artículo nuevo cada 1–2 semanas (lista de 20 títulos en `CONTENIDOS.md`).
- **Enlaces de productores:** plantilla de correo "te hemos incluido en el mapa" para pedir enlace/mención.
- **Instagram automatizado:** 2–3 posts + 1 reel por semana generados con IA y publicados sin revisión
  (la web debe estar publicada primero, porque aloja las imágenes). Se planificará en un documento aparte.
