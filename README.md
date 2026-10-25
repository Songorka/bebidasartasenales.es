# bebidasartesanales.es

Web divulgativa sobre bebidas artesanales en España. Estática, publicada en GitHub Pages.

## Cómo arrancar el proyecto con Claude Code (para Gorka)

Antes de la primera vez, en este ordenador tienen que estar instalados:

1. **Node.js 22 (LTS)** — descarga en https://nodejs.org (botón verde "LTS"), instala con todo por defecto.
2. **Git** — descarga en https://git-scm.com/download/win, instala con todo por defecto.
3. **Google Chrome** (para que la skill de diseño pueda hacer capturas y medir la web).

Después:

1. Abre Claude Code en esta carpeta (`C:\Users\Usuario\proyectos\bebidasartesanales`).
2. Escribe:

   > Lee CLAUDE.md, DISEÑO.md y PLAN.md y ejecuta el plan desde la Fase 0. Trabaja por lotes y solo párate en lo que indican las reglas.

3. Deja que trabaje. Te preguntará solo lo imprescindible.

## Qué hay aquí

- `CLAUDE.md` — instrucciones de trabajo para Claude Code.
- `DISEÑO.md` — dirección de diseño (qué es la web, qué no debe parecer, la idea, páginas, movimiento, textos).
- `PLAN.md` — plan de desarrollo por fases con criterios de salida.
- `.claude/skills/` — skills de diseño que Claude Code usa automáticamente:
  - `design-taste-frontend` (tasteskill v2, de Leonxlnx — MIT)
  - `frontend-design` (Anthropic)
  - `animate`, `animation-vocabulary`, `emil-design-eng` (Emil Kowalski — MIT)

El resto de carpetas y ficheros (`src/`, `package.json`, `.github/`, …) los crea Claude Code al ejecutar el plan.
