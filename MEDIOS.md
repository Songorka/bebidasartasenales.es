# MEDIOS — vídeos e imágenes generadas para bebidasartesanales.es

La web ya está construida con **seis huecos** preparados para tus vídeos e imágenes generadas con IA.
Mientras no existan, cada hueco muestra un sustituto (una foto de archivo o un dibujo), así que la web
nunca se ve vacía. Cuando tengas un fichero, **solo tienes que darle el nombre exacto de la tabla y soltarlo
en la carpeta `medios-entrada/`** (en la raíz del proyecto; créala si no existe). Después pide a Claude Code:

> Procesa los medios nuevos de medios-entrada y publica.

Claude Code ejecutará `npm run medios`, que convierte cada fichero a los formatos y tamaños de la web,
y lo subirá. El pie de la web pasará a decir "Algunas imágenes y vídeos están generados con IA".

## Resumen

| Hueco | Nombre del fichero | Dónde aparece | Medidas | Duración | Ahora mismo muestra |
|---|---|---|---|---|---|
| **V1** | `v1.mp4` | Portada, primera pantalla: la tesela grande del mosaico de arriba a la izquierda | 1920 × 1080 px (16:9) | 6–12 s, bucle | Clip de archivo de un cubo con mosto de cerveza |
| **V2** | `v2.mp4` | Portada, sección del mapa ("Hechas cerca de ti"), a la izquierda | 1920 × 1080 px (16:9) | 6–12 s, bucle | Foto de archivo de tarros de kombucha |
| **G1** | `g1.png` | Portada, sección "Comprueba tu botella" | 1600 × 2000 px (4:5, vertical) | — | Dibujo de una botella |
| **G2** | `g2.png` | Portada, debajo del título, junto a la frase sobre la palabra «artesano» | 1600 × 2000 px (4:5, vertical) | — | Foto de archivo de tarros de kombucha |
| **G3** | `g3.png` | Guías y artículos (imagen de cabecera de lúpulo y botánicos) | 2000 × 1250 px (16:10) | — | Foto de archivo de un cono de lúpulo abierto |
| **G4** | `g4.png` | Portada, mosaico "Lo que la ley exige" | 2000 × 1500 px (4:3) | — | Foto de etiquetas de cerveza de 1910 |

## Reglas para todas las piezas

- **Sin marcas reales**, sin logotipos, sin texto legible de ninguna marca existente.
- **Sin personas bebiendo**, sin manos brindando, sin caras. Como mucho, unas manos trabajando (por ejemplo, girando una botella).
- Nada que se pueda confundir con un producto real que exista.
- La web muestra las imágenes **en blanco y negro** (escala de grises con algo de contraste). Genera en color si quieres,
  pero piensa en luz y textura más que en color: un buen contraste de luz y sombra queda mucho mejor.
- Fondos sencillos y oscuros o neutros. Nada de estética "taberna", madera vieja, pizarras ni papel envejecido.

## Formatos que acepta `medios-entrada/`

- **Vídeo:** `.mp4`, `.mov`, `.webm` o `.m4v`. Lo ideal: MP4 H.264, 1920 × 1080, 24–30 fps, **sin sonido** (si tiene, se quita).
  La web genera MP4 H.264 + WebM y un fotograma de portada. Peso final orientativo: menos de 3 MB por vídeo.
- **Imagen:** `.png`, `.jpg`, `.webp` o `.avif`, como mínimo con las medidas de la tabla (más grande también vale; se recorta al centro
  de interés si la proporción no coincide). La web genera AVIF, WebP y JPG en tres tamaños. Peso final orientativo: menos de 400 KB en el tamaño mayor.
- La conversión de vídeo usa **ffmpeg**, que ya está instalado en este ordenador (`C:\ffmpeg\bin`). Si algún día no estuviera,
  las imágenes se convierten igual pero los vídeos no: instala ffmpeg desde https://www.gyan.dev/ffmpeg/builds/ y vuelve a pedirlo.

## Briefs de generación (para Higgsfield)

### V1 — `v1.mp4` · primera pantalla
- **Qué se ve:** una botella de vidrio sin etiqueta delantera girando muy despacio sobre sí misma, de modo que aparece su
  **contraetiqueta** (etiqueta trasera) con texto pequeño ilegible, bloques de texto y una línea de código de lote impresa a chorro de tinta.
- **Luz:** un solo foco lateral duro, fondo casi negro, reflejos nítidos en el vidrio.
- **Encuadre:** plano medio-corto, la botella ocupa el tercio central, mucho aire a los lados. Cámara fija.
- **Movimiento:** solo el giro de la botella (unos 90°), lento y continuo, que pueda repetirse en bucle sin salto.
- **Prompt orientativo:** *"Slow 90-degree rotation of an unbranded glass beer bottle revealing a plain back label with tiny unreadable text blocks and an inkjet-printed lot code, single hard side light, near-black background, sharp glass reflections, static camera, seamless loop, no logos, no people, 16:9"*

### V2 — `v2.mp4` · sección del mapa
- **Qué se ve:** detalle de una fermentación: burbujas finas subiendo despacio en un líquido turbio dentro de un tarro o
  fermentador de vidrio (kombucha o cerveza joven), o una capa de espuma que se mueve suavemente.
- **Luz:** contraluz suave desde detrás del vidrio, que haga brillar las burbujas.
- **Encuadre:** muy cerrado, macro; no se ve el borde del recipiente o se ve poco.
- **Movimiento:** solo el del líquido. Cámara fija. Bucle sin salto.
- **Prompt orientativo:** *"Macro shot of fine bubbles slowly rising through cloudy fermenting liquid in a glass vessel, soft backlight making bubbles glow, static camera, seamless loop, no labels, no people, 16:9"*

### G1 — `g1.png` · Comprueba tu botella
- **Qué se ve:** una botella de vidrio oscuro sin marca, de pie, vista por detrás, con la contraetiqueta en primer plano: bloques
  de texto pequeño (sin palabras legibles de ninguna marca), un código de lote en el cuello.
- **Luz:** de estudio, lateral, fondo gris claro liso.
- **Encuadre:** vertical, la botella entera centrada, ocupando el 70 % del alto.
- **Prompt orientativo:** *"Unbranded dark glass bottle standing, seen from the back, plain back label with small unreadable text blocks, inkjet lot code on the neck, studio side light, plain light grey background, vertical 4:5, no logos"*

### G2 — `g2.png` · vidrio y líquido a la luz
- **Qué se ve:** un vaso o una botella de vidrio con líquido dorado o turbio atravesado por la luz; se ven las burbujas y la textura del vidrio.
- **Luz:** contraluz fuerte de ventana, fondo oscuro.
- **Encuadre:** vertical, muy cerrado sobre el vidrio y el líquido. Sin manos.
- **Prompt orientativo:** *"Close-up of light passing through a glass of hazy golden liquid with fine bubbles, strong window backlight, dark background, glass texture visible, vertical 4:5, no logos, no hands"*

### G3 — `g3.png` · botánicos y lúpulo
- **Qué se ve:** sobre una superficie lisa oscura, conos de lúpulo, piel de naranja seca, ramas de ajenjo, raíz de genciana y bayas de
  enebro, ordenados con aire entre ellos (vista cenital).
- **Luz:** lateral rasante que marque la textura.
- **Encuadre:** horizontal 16:10, cenital, sin rótulos.
- **Prompt orientativo:** *"Top-down flat lay of hop cones, dried orange peel, wormwood sprigs, gentian root and juniper berries on a smooth dark surface, generous spacing, raking side light, 16:10, no text"*

### G4 — `g4.png` · detalle de etiqueta con lote y elaborador
- **Qué se ve:** macro de una etiqueta de papel pegada a una botella: un bloque de texto pequeño con aspecto de dirección postal
  (ilegible o con palabras inventadas) y un código de lote impreso a chorro de tinta, algo torcido.
- **Luz:** lateral suave, se ve la textura del papel y la curvatura de la botella.
- **Encuadre:** horizontal 4:3, muy cerrado.
- **Prompt orientativo:** *"Macro of a paper back label on a glass bottle, small block of unreadable address-like text and a slightly crooked inkjet-printed lot code, soft side light, paper texture and bottle curvature visible, 4:3, no brand names"*
