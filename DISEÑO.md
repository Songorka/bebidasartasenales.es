# DISEÑO — bebidasartesanales.es

Documento de dirección de diseño. Lo ejecuta Claude Code siguiendo `PLAN.md`.
El propietario del proyecto (Gorka) no es técnico: las decisiones ya están tomadas aquí;
Claude Code decide los detalles y solo pregunta cuando una decisión es de producto o irreversible.

---

## 1. Qué es esta web y para qué existe

- **Dominio:** `bebidasartesanales.es`. Está **en venta**. La web existe para que el dominio no esté vacío,
  para que Google lo indexe y para que un comprador vea potencial y tráfico real.
- **Contenido:** web **divulgativa** en español sobre bebidas artesanales de España.
- **Jerarquía de contenidos (en este orden de importancia):**
  1. **"Cómo distinguir una bebida artesanal de una que solo lo parece"** — el eje de toda la web.
  2. **Guía por bebidas:** cerveza · vermut y destilados · sin alcohol (kombucha, ginger beer, refrescos artesanos).
     *No incluir sidra.*
  3. **Mapa de productores** reales de España, filtrable por bebida y comunidad autónoma.
  4. **"Comprueba tu botella"** — pequeña herramienta interactiva (6 preguntas sobre la etiqueta → un sello).
     Es secundaria y apoya al tema 1. Nunca protagonista.
- **Pie de página obligatorio:** aviso "Este dominio está en venta" con el correo de contacto (protegido frente a robots)
  y aviso de consumo responsable (+18). Debe verse, pero no gritar.
- **Sin ventas, sin carrito, sin precios.** No es una tienda ni debe parecerlo.

## 2. Lo que el propietario NO quiere (prioridad máxima)

Los borradores anteriores se rechazaron por parecer **"muy Claude", lo que se ve ahora continuamente**.
Esta web tiene que salir de ahí. Son **errores de diseño** y Claude Code debe comprobar que no aparecen:

- Fondo crema/kraft con acento terracota, óxido o ámbar. Fondo verde botella con dorado. Papel + máquina de escribir.
  (Los tres borradores rechazados eran exactamente eso.)
- Tipografía slab o serif "de imprenta antigua" como personalidad de la web. Palabra de color o cursiva dentro de un titular.
- Tarjetas en fila (3 iconos + 3 títulos + 3 párrafos). Secciones que son todas el mismo bloque centrado.
- Etiquetas pequeñas en mayúsculas con letras separadas encima de los títulos. Numeración 01/02/03 decorativa.
- Líneas finas de separación, bordes de 1 px, sombras suaves bajo cada caja, degradados, "glass".
- Entrada idéntica de fade + subida en cada sección. Hover idéntico en cada tarjeta.
- Fuentes por defecto (Inter, Roboto, Georgia, system-ui) como decisión principal.
- Emojis. Placeholder "[Ilustración aquí]" en la versión publicada.

Las skills instaladas en `.claude/skills/` (sobre todo `design-taste-frontend` y `frontend-design`)
contienen la lista completa y actualizada de estos "tells" y un inspector que los mide. **Úsalas.**

## 3. Lo que SÍ quiere

- **Dinámica.** Que se mueva con intención: scroll que cuenta algo, una pieza interactiva real,
  microinteracciones cuidadas. No "una web con animaciones", sino una web cuyo movimiento explica el tema.
- **Muy divulgativa.** Texto largo y bien escrito, legible, con jerarquía clara. Es una web para leer.
- **Que no se parezca a nada generado.** Decisiones específicas de este tema, no las por defecto.
- **Rápida y buena para Google.** Todo el texto en HTML real, sin depender de JavaScript para leerse.

## 4. La idea (de dónde sale todo el diseño)

La skill `design-taste-frontend` exige una frase así, y es la correcta para esta web:

> En esta web, **la etiqueta de una botella** se convierte en **la forma de leer la página**.

Es decir: el visitante llega a aprender a *inspeccionar* una etiqueta. La web se construye como esa inspección.
Cada sección es una parte de la etiqueta que se examina (quién la hace, dónde, el lote, los ingredientes,
quién hay detrás de la marca). El tema de la web y la forma de la web son lo mismo.

Prueba del competidor: una web de "cervezas artesanas" o un blog de vermut no podría usar esta idea tal cual,
porque su tema no es *distinguir*. Pasa la prueba.

**La pieza viva** (la skill exige una, y solo una): **"Comprueba tu botella"**. El visitante responde
6 preguntas sobre la etiqueta que tiene delante y recibe un sello: *Muy artesanal* / *Tiene pinta* /
*Ojo, puede ser marketing*, con enlace a la parte de la guía que lo explica. Reglas: funciona con el pulgar
en un móvil, tiene versión sin JavaScript (las 6 preguntas como texto con su explicación), no bloquea la lectura.

## 5. Dirección visual

La dirección definitiva la **reparte la skill** `design-taste-frontend` con su script `draw.mjs` (sector el más
cercano a bebida/alimentación/editorial; secciones según el argumento de la sección 6; `--have illustration` solo si
se dibujan las etiquetas en código). Claude Code elige entre las tres direcciones repartidas la que mejor
lleve la idea de la sección 4. Candidatas que encajan bien a priori: **"The page is the object"** (la página
es la botella/etiqueta), **"The specimen catalogue"** (las bebidas como especímenes examinados) y
**"The pinned poster"**. Se descarta cualquier dirección que empuje a crema+terracota, papel viejo o taberna.

Restricciones fijas, sea cual sea la dirección repartida:

- **Paleta:** un fondo, una tinta, un acento. Los colores salen **del tema real** (el vidrio de una botella,
  el líquido a la luz, un lúpulo, un botánico de vermut, la kombucha), **nunca** del repertorio "asistente"
  (crema/terracota/óxido, verde botella/dorado, violeta/índigo). Blanco puro o un gris muy claro como fondo
  es perfectamente válido. Si el reparto da una paleta "asistente", se vuelve a repartir **una** vez y se anota.
- **Tipografía:** una familia, dos como máximo, elegida a propósito en Google Fonts (variable si es posible).
  El titular principal muy grande (del orden de 8 vw en escritorio), el cuerpo 17–19 px, 55–70 caracteres por línea.
  Prohibido: slab/serif "vintage" como rasgo principal, monoespaciada fuera de código, acento de color en una palabra.
- **Imágenes y vídeo:** mínimo 4 imágenes reales, ideal 6–10, más **uno o dos vídeos** y **algunas imágenes
  generadas con IA** que aportará el propietario (ver "Huecos para medios" más abajo). Orden de preferencia:
  1. **Vídeo generado** (del propietario) como imagen en movimiento del primer pantallazo o de la sección del mapa:
     bucle mudo, con fotograma de portada, sin sonido, sin autoplay si `prefers-reduced-motion`.
  2. **Imágenes generadas con IA** (del propietario) para los grandes momentos: una botella/etiqueta "anónima"
     examinada de cerca, el detalle del vidrio, botánicos, lúpulo. Nunca marcas reales, nunca personas bebiendo,
     nunca presentadas como un producto que exista.
  3. Fotografías de archivo libres de derechos de **el mundo de estas bebidas** (lúpulo, cebada, botánicos, cubas,
     alambiques, vidrio, etiquetas antiguas, grabados de destilerías, mapas antiguos de España) buscadas con
     `assets.mjs` de la skill (Openverse, Wikimedia Commons, Art Institute, Met), con crédito en el pie.
  4. **Etiquetas dibujadas en código** (SVG) en un solo lenguaje gráfico plano: la "etiqueta comentada",
     la etiqueta de un "falso artesano" frente a la de un productor real, el sello del resultado.
  5. Nunca fotos de stock genéricas de "gente brindando" ni fotos que se presenten como productos reales.

  **Huecos para medios (obligatorio).** La web se construye con **huecos previstos** para el vídeo y las imágenes
  generadas, de modo que encajen sin rehacer nada cuando lleguen:
  - `src/assets/video/`: hueco **V1** (primer pantallazo, 16:9 o 9:16 según la dirección, 6–12 s, bucle) y hueco
    **V2** (sección del mapa o de las tres familias, 16:9, 6–12 s, bucle). Mientras no exista el fichero, el hueco
    muestra su **fotograma de portada** (una imagen generada o de archivo), nunca un recuadro vacío ni texto "[vídeo]".
  - `src/assets/img/generadas/`: huecos **G1–G4** (botella anónima de cerca · vidrio y líquido a la luz ·
    botánicos/lúpulo · detalle de etiqueta con lote y elaborador), en el tamaño que pida cada sección.
    Mientras no existan, ocupa el hueco una imagen de archivo o el SVG correspondiente.
  - Claude Code escribe `MEDIOS.md` con, para cada hueco: dónde aparece, medidas exactas (píxeles y proporción),
    duración si es vídeo, formato (MP4 H.264 + WebM; AVIF/WebP + JPG), peso máximo, el nombre de fichero exacto que
    debe tener, y **un brief de generación en español** (qué se ve, luz, encuadre, sin marcas ni personas). El propietario
    los genera con su herramienta de IA (Higgsfield) y solo tiene que soltar los ficheros con ese nombre en su carpeta.
  - Los medios generados se marcan en el pie de créditos como "imágenes y vídeo generados con IA".
- **Movimiento** (ver sección 8): intencional, coreografiado, con `prefers-reduced-motion`.
- **Nada decorativo.** Si una sección queda vacía al quitar adornos, se llena con tamaño, contenido o una
  imagen hecha para este tema. Nunca con otro adorno.

## 6. El argumento de la portada (secciones = afirmaciones con su prueba)

La portada **no** es "hero + 3 tarjetas + mapa + CTA". Cada sección existe porque afirma algo y lo demuestra:

| # | Afirmación | Prueba en pantalla |
|---|---|---|
| 1 | Muchas bebidas que parecen artesanales no lo son. | Titular grande + una frase que lo explica + **una etiqueta dibujada** que se examina al hacer scroll (la escena firma). |
| 2 | Se puede distinguir mirando cinco cosas. | Las cinco señales, cada una con su explicación breve y su parte de la etiqueta resaltada. **No** cinco tarjetas iguales: una composición por señal o una lista grande. |
| 3 | Hay marcas que juegan a parecer pequeñas. | La comparación etiqueta real vs. etiqueta disfrazada, y entrada al artículo "Falsos artesanos". |
| 4 | Las pistas cambian según la bebida. | Las tres familias (cerveza · vermut y destilados · sin alcohol) con una pista distinta por familia. Entrada a cada guía. |
| 5 | Hay productores de verdad cerca de ti. | El mapa de España con los puntos reales, filtrable. |
| 6 | Puedes comprobarlo ahora mismo. | "Comprueba tu botella", discreto, al final. |
| 7 | Cierre. | Nombre de la web a toda anchura, aviso de dominio en venta, consumo responsable, créditos de imágenes, aviso legal. |

Secciones vecinas **no comparten maquetación**. Cada bloque tiene su propia composición.

## 7. Páginas y estructura

```
/                                   Portada (argumento de la sección 6)
/como-distinguir/                   Guía principal (eje de la web, texto largo)
  /como-distinguir/que-significa-artesanal/
  /como-distinguir/senales/
  /como-distinguir/leer-la-etiqueta/
  /como-distinguir/falsos-artesanos/
  /como-distinguir/checklist/
  /como-distinguir/glosario/
/cerveza/                           Guía: qué es, estilos, cómo distinguir la artesana, cómo servirla
/vermut-y-destilados/               Guía: vermut, ginebra, licores; cómo distinguirlos
/sin-alcohol/                       Guía: kombucha, ginger beer, refrescos artesanos
/articulos/                         Listado de artículos (crece con el tiempo)
  /articulos/<slug>/
/mapa/                              Mapa de productores (Leaflet + OpenStreetMap, datos en JSON)
/comprueba-tu-botella/              La pieza viva (también incrustada al final de la portada)
/aviso-legal/  /privacidad/         Páginas legales mínimas (la analítica no usa cookies: sin banner)
/404.html
sitemap.xml  robots.txt  feed.xml
```

Navegación: nombre de la web + 4 enlaces (Cómo distinguirla · Guía · Mapa · Comprueba tu botella).
Sin barra "cromada", sin píldora flotante, sin blur.

## 8. Movimiento

Sigue `references/motion.md` de `design-taste-frontend` y la skill `animate` (Emil Kowalski) para curvas,
duraciones y reglas. Resumen de lo que esta web necesita:

1. **Una escena firma, scroll-driven, en la portada:** la etiqueta dibujada se examina al hacer scroll
   (se acerca, se resalta la zona de "quién la elabora", el lote, los ingredientes…) mientras el texto de
   las señales avanza. Es la única pieza "ruidosa". Bloqueada al scroll, sin suavizado, con versión
   `prefers-reduced-motion` que muestra la etiqueta completa quieta.
2. **Entradas coreografiadas por sección**, distintas según el contenido (una lista entra fila a fila,
   una imagen se abre desde una máscara, una afirmación sube línea a línea). Nunca el mismo fade en todo.
   El contenido siempre es visible aunque el script no cargue.
3. **Respuesta bajo el dedo:** botones que ceden al pulsar (`scale(0.97)`), enlaces que responden,
   filtros del mapa que confirman el cambio.
4. **Una imagen en movimiento:** deriva lenta en la foto grande de archivo, o un clip libre en bucle mudo.
5. **"Comprueba tu botella":** el sello aparece como estampado (una sola vez, 400–600 ms, ease-out fuerte).
   En las páginas de guía: solo entradas suaves y la respuesta de los controles. Son páginas para leer.

Solo `transform` y `opacity`. Nada que anime layout. Sin preloader. Legible en el primer fotograma.

## 9. Textos: tono y reglas

- Español de España, directo, sin cursilería ni jerga de sumiller. Frases cortas. Tuteo.
- Titulares de **dos líneas o menos** en cualquier ancho (≈ 32 caracteres es seguro).
- Afirmaciones sobre normativa (qué significa legalmente "artesanal", qué dice la norma de calidad de la cerveza,
  normativas autonómicas de artesanía alimentaria, etiquetado obligatorio) **se verifican con búsqueda web
  y se citan** al pie del artículo con enlace a la fuente oficial (BOE, boletines autonómicos, AESAN).
  Si no se puede verificar, no se afirma.
- **Prohibido inventar:** productores, cifras, citas, reseñas, logotipos de prensa. Los productores del mapa
  son reales y verificados (nombre, localidad, web). Si una cifra no se encuentra, se escribe sin cifra.
- **No nombrar marcas concretas como "falsos artesanos".** El artículo explica el mecanismo (marcas con
  estética pequeña propiedad de grandes grupos, estética "craft" en producción industrial) **sin acusar
  a marcas reales por su nombre** para evitar problemas legales. Se puede explicar cómo comprobarlo uno mismo
  (buscar quién figura como elaborador en la etiqueta, buscar la empresa en el registro).
- Cada ficha de guía termina en "Dónde encontrarla" → mapa filtrado por esa bebida.

## 10. Calidad mínima antes de publicar (la puerta)

- `lint.mjs` e `inspect.mjs` de `design-taste-frontend` con **0 FAIL** en 1440, 768 y 390 px.
- Lighthouse (móvil): rendimiento ≥ 90, accesibilidad ≥ 95, SEO ≥ 95.
- Todo el texto legible sin JavaScript. Foco visible con teclado. Alt en todas las imágenes.
- Comprobación visual con capturas en los tres anchos; corregir y volver a mirar (máximo tres rondas).
- Ninguno de los "tells" de la sección 2 presente.
