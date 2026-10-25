# Informe final — bebidasartesanales.es

Fecha: 25 de octubre de 2026.

## Qué se ha construido

Una web estática y rápida, en español, que enseña a **distinguir una bebida artesanal de verdad de una que solo lo parece**
leyendo su etiqueta trasera. Está lista para publicarse en GitHub Pages con el dominio bebidasartesanales.es.

- **Portada** que funciona como un argumento, sección a sección:
  1. «Artesana o solo lo parece».
  2. Las cinco cosas que mirar, con una etiqueta dibujada que se acerca a cada zona al hacer scroll.
  3. Lo que exige la ley.
  4. «Por» frente a «para», la palabra que delata a las marcas disfrazadas.
  5. Las pistas de cada bebida.
  6. El mapa.
  7. «Comprueba tu botella».
  8. Cierre con el aviso de dominio en venta.
- **13 páginas de contenido** (unas 16.700 palabras):
  - la guía «Cómo distinguirla» con sus seis subpáginas (qué significa «artesanal», las cinco señales, leer la etiqueta, falsos artesanos, lista para el súper y glosario);
  - las guías de cerveza, vermut y destilados, y sin alcohol;
  - tres artículos pensados para búsquedas reales.
  Todas citan sus fuentes oficiales (BOE, Diario Oficial de la UE, AESAN, boletines autonómicos).
- **Mapa de 45 productores reales** de las 17 comunidades. Cada uno está comprobado en su propia web. Se filtra por bebida y comunidad, con lista completa en tablas y un mapa interactivo de OpenStreetMap que se abre con un botón.
- **«Comprueba tu botella»:** seis preguntas sobre la etiqueta y un sello (Muy artesanal / Tiene pinta / Ojo, puede ser marketing). Funciona con el pulgar en el móvil y también sin JavaScript.
- **Páginas legales** (aviso legal, privacidad, créditos), sitemap, feed de artículos, robots.txt, metadatos para Google y redes sociales, analítica sin cookies preparada y despliegue automático.

## La dirección de diseño y por qué

La skill de diseño repartió tres direcciones. Elegí **«The printed annual»** (el informe impreso). Su eje vertical al 42 % del ancho
deja una columna izquierda para figuras y notas al margen. Ahí vive la etiqueta que el texto va examinando: **la página se lee como
una inspección de la etiqueta**, que es la idea de `DISEÑO.md`.

Decisiones propias, anotadas en `docs/diseno/notas.md`:
- **Tipografía.** La primera repartida era un serif clásico, que `DISEÑO.md` prohíbe. La segunda no estaba en Google Fonts. Usé **Schibsted
  Grotesk**, una grotesca de periódico, alojada en la propia web.
- **Colores sacados del tema.** Blanco, tinta negra, verde lúpulo para enlaces y botones, y un verde de cono de lúpulo para los bloques de color.
  Nada de crema, terracota, ámbar ni verde botella con dorado.
- **Fotos en blanco y negro.** Todas, para que la paleta sea de dos tintas, como un impreso.

**Comprobaciones pasadas:**
- **Inspector de la skill:** 0 fallos en la portada, una guía, un artículo, el mapa y el test, a 1440, 768 y 390 px de ancho.
- **Lint:** 0 fallos.
- **Lighthouse móvil** (rendimiento / accesibilidad / buenas prácticas / SEO):

| Página | Rend. | Acces. | Buenas prác. | SEO |
|---|---|---|---|---|
| Portada | 98 | 100 | 100 | 100 |
| Guía de cerveza | 99 | 100 | 100 | 100 |
| Mapa | 100 | 100 | 100 | 100 |

  Lighthouse no se pasó por el test ni por los artículos.

**Avisos que dejo justificados:**
- La fuente no es la que repartió la skill. `DISEÑO.md` exige Google Fonts.
- El margen derecho del texto es irregular, porque los párrafos tienen un ancho de lectura limitado.

**Lo que no pude comprobar como pide la skill:**
- `scenes.mjs` no aplica: la escena de la etiqueta es propia, no una de la librería.
- La captura sin JavaScript no se pudo guardar con Chrome. Lo verifiqué en el código: todo lo que se oculta para animarse depende de una clase que solo pone el script.

## Imágenes usadas y créditos

Todas son de Wikimedia Commons, con licencias que permiten uso comercial. Su crédito completo está en la página `/creditos/` y hay un aviso en el pie de todas las páginas.

- Cono de lúpulo, Nikita Karasik (CC BY-SA 4.0)
- Cono de lúpulo abierto, Andrew Kvalheim (CC BY-SA 4.0)
- Espiga de cebada, Phil Sangwell (CC BY 2.0)
- Alambiques de cobre, Cmyk4317 (CC BY-SA 4.0)
- Lámina botánica de artemisas de 1906, Charles Flahault (dominio público)
- Etiquetas de cerveza de 1910 (dominio público)
- Kombucha fermentando, Original-kombucha (CC BY-SA 3.0)
- Planta de jengibre, ritirene (CC BY 4.0)
- Malta, Noralambert (CC BY-SA 4.0)
- Cebada germinando, Bapt-francois (CC BY-SA 4.0)
- Enebro, Dcrjsr (CC BY 3.0)
- Raíces de genciana, B.navez (CC BY-SA 3.0)
- Toneles de roble, Rob & Lisa Meehan (CC BY 2.0)
- Hojas de té, Gary Stevens (CC BY 2.0)
- Pieles de cítrico, Fumikas Sagisavas (CC0)
- Vídeo y fotograma del mosto, Missvain (CC BY 4.0)

**Dibujos hechos para la web:** las etiquetas, la botella y los sellos. Las marcas, direcciones y lotes que aparecen en ellos son inventados.
El contorno del mapa sale de Natural Earth (dominio público).

**Sustitutos provisionales que se reemplazarán con tus medios:**

| Hueco | Lo que se ve ahora |
|---|---|
| V1 | Clip de archivo del mosto |
| V2 | Foto de la kombucha |
| G1 | Dibujo de la botella |
| G2 | Foto de la kombucha |
| G3 | Cono de lúpulo abierto |
| G4 | Etiquetas de 1910 |

## Lo que queda de tu mano (pasos detallados en `README.md`)

1. **Activar GitHub Pages** (Settings → Pages → Source: GitHub Actions). **Ahora mismo la publicación falla solo por esto**: el resto del proceso funciona.
2. **Dominio y DNS** en tu registrador: cuatro registros A y un CNAME para `www`. Después, activar HTTPS en GitHub.
3. **Cuenta de GoatCounter** (gratis) y darme el código.
4. **Google Search Console**: darme el código de verificación y enviar el sitemap.
5. **CIF y domicilio** de Duaba Directorship para el aviso legal y la privacidad (ahora pone `[CIF]` y `[DOMICILIO]`).
6. **Generar los vídeos e imágenes de `MEDIOS.md`** con Higgsfield (V1, V2, G1–G4) y soltarlos en `medios-entrada/` con el nombre indicado.
7. Opcional: **renombrar el repositorio** a `bebidasartesanales.es`. Si lo haces, dímelo y actualizo el remoto.

## Textos que conviene que revises

- **Aviso legal y privacidad.** Están redactados con criterio, pero no son asesoría jurídica. Si puedes, que los vea alguien de tu confianza.
- **«Qué significa artesanal».** Describe la normativa autonómica de artesanía alimentaria. En varias comunidades no encontramos una norma propia y así se dice, con prudencia. El dossier de fuentes está en `docs/investigacion/normativa.md`.
- **Productores del mapa.** En tres casos (Sardino, Santamanía, Oso Brew) la web muestra una dirección de empresa que puede no ser la del obrador; el punto marca solo la localidad. Saqué dos que eran poco «pequeños» (una kombucha líder del mercado y un fabricante de refrescos bastante industrial) para ser coherentes con lo que defiende la web. No hay ninguna ginger beer porque no encontramos ninguna independiente que se pudiera verificar.
- **Afirmaciones de conocimiento general.** Cómo se elaboran la cerveza, la kombucha o la ginger beer y cómo se sirven no están en una norma; son de manual y no llevan cifras.
- Ninguna página nombra marcas reales como «falsos artesanos». Se explica el mecanismo y cómo comprobarlo en registros públicos (OEPM, AESAN, Registro Mercantil).

## Después de este plan

- Un artículo nuevo cada una o dos semanas, para seguir ganando búsquedas.
- Escribir a los productores del mapa para contarles que aparecen y pedirles un enlace.
- Instagram con contenido generado: mejor cuando la web ya esté publicada.
