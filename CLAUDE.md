# CLAUDE.md — bebidasartesanales.es

Web estática divulgativa sobre bebidas artesanales en España, publicada en GitHub Pages.
El dominio está en venta; la web existe para darle valor y tráfico. Propietario: Gorka (no técnico).

## Lee primero, en este orden
1. `DISEÑO.md` — qué es la web, qué NO debe parecer (muy importante), la idea, la dirección visual, el argumento de la portada, textos y puerta de calidad.
2. `PLAN.md` — fases 0–8 con criterios de salida. Ejecútalas en orden.

## Skills del proyecto (`.claude/skills/`)
- `design-taste-frontend` — **la principal**. Sigue "The run" de su SKILL.md para la dirección, el copy, la construcción, la puerta (`lint.mjs`, `inspect.mjs`, `scenes.mjs`), la crítica y el movimiento. Sus "house rules" son obligatorias aquí.
- `frontend-design` — guía oficial de Anthropic para no caer en el diseño genérico. Úsala en el plan de diseño (Fase 1) y en la autocrítica.
- `animate`, `animation-vocabulary`, `emil-design-eng` — reglas de movimiento (curvas, duraciones, cuándo no animar). Úsalas en la Fase 6 y en cada control interactivo.
- Si las skills de Emil Kowalski responden con su frase de presentación al invocarlas sin pregunta, es normal: formúlales la pregunta concreta.

## Cómo trabajar
- Autónomo y por lotes. Agrupa fases. No pidas aprobación paso a paso.
- Para y pregunta **solo** en: decisiones de producto no cubiertas por `DISEÑO.md`, acciones destructivas/irreversibles (borrar, `push --force`, DNS), y pasos sensibles (claves, tokens, `.env`).
- Al terminar cada fase: commit en español. Push al terminar cada lote.
- Nunca inventes productores, cifras, citas, normativa ni reseñas. Verifica con búsqueda web y cita la fuente.
- No nombres marcas reales como "falsos artesanos". Explica el mecanismo y cómo comprobarlo.
- Si una herramienta de las skills no puede correr (sin Chrome, sin Node 22, sin red), dilo y usa la alternativa que indica la skill. No afirmes una comprobación que no corriste.
- Habla al propietario en español, sin jerga, con pasos clic a clic cuando le pidas algo.

## Stack
Eleventy 3 (Nunjucks + Markdown) · CSS propio con tokens · JS vanilla mínimo · Leaflet + OpenStreetMap · GoatCounter · GitHub Actions → GitHub Pages · Node 22.

## Comandos
- `npm install` · `npx @11ty/eleventy --serve` (desarrollo) · `npx @11ty/eleventy` (build en `_site/`)
- Puerta de calidad: `node .claude/skills/design-taste-frontend/scripts/lint.mjs src` y `node .claude/skills/design-taste-frontend/scripts/inspect.mjs _site/index.html`

## Datos fijos
- Dominio: `bebidasartesanales.es` · Correo de venta y contacto: `[correo]`
- Titular legal: Duaba Directorship, S.L. (CIF y domicilio los completa el propietario: deja `[CIF]` y `[DOMICILIO]`).
- GitHub: `Songorka/bebidasartasenales.es` (nombre con erratas; comprueba `git remote -v` por si se renombró).
- Bebidas: cerveza · vermut y destilados · sin alcohol (kombucha, ginger beer, refrescos). **Sin sidra.**
- Medios: el propietario aportará 1–2 vídeos y varias imágenes generadas con IA. La web se construye con huecos
  previstos (V1, V2, G1–G4) y un `MEDIOS.md` con medidas, nombres de fichero y briefs. Ver `DISEÑO.md` §5.
