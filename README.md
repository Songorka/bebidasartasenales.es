# bebidasartesanales.es

Web divulgativa sobre cómo distinguir una bebida artesanal de verdad (cerveza, vermut y destilados, sin alcohol).
Estática, hecha con Eleventy y publicada en GitHub Pages. El dominio está en venta.

---

## Lo que tienes que hacer tú (Gorka), paso a paso

Hay cinco cosas que Claude Code no puede hacer por ti porque necesitan tus cuentas. Hazlas en este orden.

### 1. Activar GitHub Pages (imprescindible para que la web se publique)

1. Entra en https://github.com/Songorka/bebidasartasenales.es con tu cuenta.
2. Pulsa **Settings** (arriba a la derecha, con un engranaje).
3. En el menú de la izquierda, pulsa **Pages**.
4. En **Build and deployment → Source**, elige **GitHub Actions**.
5. Ve a la pestaña **Actions** (arriba). Pulsa en el último trabajo, que se llamará "Build and deploy" o "Fase…", y luego en **Re-run all jobs**.
6. Espera a que salga el círculo verde (un par de minutos). La web ya estará en la dirección que muestra la pantalla de Pages.

### 2. Conectar el dominio bebidasartesanales.es

**En GitHub:**
1. Vuelve a **Settings → Pages**.
2. En **Custom domain** escribe `bebidasartesanales.es` y pulsa **Save**. (El fichero `CNAME` del proyecto ya lo tiene puesto.)

**En la web donde compraste el dominio (tu registrador):**
1. Entra en la gestión del dominio y busca **DNS** o **Zona DNS**.
2. Borra los registros **A** y **CNAME** que haya para `@` (o el dominio sin nada delante) y para `www`, si los hay.
3. Crea **cuatro registros A** para `@` con estos valores:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
4. Crea **un registro CNAME** para `www` con el valor `songorka.github.io`
5. Guarda. Los cambios pueden tardar desde minutos hasta 24 horas.

**Activar HTTPS (el candado):**
1. Cuando GitHub diga en **Settings → Pages** que el dominio está bien configurado ("DNS check successful"), marca **Enforce HTTPS**.
2. Si la casilla sale gris, espera unas horas y vuelve a mirar.

### 3. Analítica de visitas (GoatCounter, gratis y sin cookies)

Sirve para enseñar a un comprador cuántas visitas tiene la web.
1. Entra en https://www.goatcounter.com y pulsa **Sign up**.
2. En **Code** escribe un nombre corto, por ejemplo `bebidasartesanales`. Ese nombre es tu "código".
3. Completa el registro con tu correo y una contraseña.
4. Dile a Claude Code: *"Mi código de GoatCounter es bebidasartesanales; actívalo y publica."*
   (Técnicamente: se escribe en `src/_data/site.json`, en `"goatcounter": ""`.)

### 4. Google Search Console (para que Google indexe la web)

1. Entra en https://search.google.com/search-console con tu cuenta de Google.
2. Pulsa **Añadir propiedad** y elige **Prefijo de la URL**. Escribe `https://bebidasartesanales.es` y pulsa **Continuar**.
3. En los métodos de verificación, elige **Etiqueta HTML**. Te dará algo como
   `<meta name="google-site-verification" content="ABC123…">`. Copia solo lo que va entre las comillas de `content`.
4. Dile a Claude Code: *"Este es mi código de Search Console: ABC123…; ponlo y publica."*
   (Se escribe en `src/_data/site.json`, en `"google_site_verification": ""`.)
5. Cuando esté publicado, vuelve a Search Console y pulsa **Verificar**.
6. En el menú de la izquierda, pulsa **Sitemaps**, escribe `sitemap.xml` y pulsa **Enviar**.

### 5. Completar el aviso legal

En el aviso legal y en la privacidad aparecen `[CIF]` y `[DOMICILIO]`. Dile a Claude Code:
*"El CIF de Duaba Directorship es … y el domicilio es …; ponlos y publica."*

### Cuando tengas los vídeos e imágenes de IA

Mira `MEDIOS.md`: ahí están las medidas, los nombres de fichero y las instrucciones para Higgsfield.
Suelta los ficheros en la carpeta `medios-entrada/` y dile a Claude Code: *"Procesa los medios nuevos y publica."*

---

## Para quien mantenga la web

- Requisitos: Node 22 o superior, Git. Para convertir vídeos, ffmpeg.
- `npm install` — instala lo necesario.
- `npm run dev` — servidor de desarrollo en http://localhost:8080.
- `npm run build` — genera la web en `_site/`.
- `node scripts/servir.mjs` — sirve `_site/` tal cual se publica.
- `npm run medios` — procesa imágenes y vídeos (ver `MEDIOS.md`).
- Puerta de calidad: `npm run lint` y `node .claude/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:8080/`.
- Publicación: cada `git push` a `main` construye y publica con GitHub Actions (`.github/workflows/deploy.yml`).

### Dónde está cada cosa

- `src/` — páginas (Markdown y Nunjucks), datos en `src/_data/` (productores, señales, familias, test, medios).
- `src/_data/productores.json` — productores del mapa (nombre, tipo, localidad, web, coordenadas, fuente y fecha de verificación).
- `docs/investigacion/normativa.md` — dossier de normativa verificada que respalda los textos.
- `docs/diseno/` — dirección de diseño, notas, copy de la portada y críticas.
- `CLAUDE.md`, `DISEÑO.md`, `PLAN.md` — instrucciones y plan de trabajo.
- `.claude/skills/` — skills de diseño: `design-taste-frontend` (tasteskill v2, de Leonxlnx, MIT), `frontend-design` (Anthropic),
  `animate`, `animation-vocabulary`, `emil-design-eng` (Emil Kowalski, MIT).
