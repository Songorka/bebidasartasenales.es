# Brief de redacción — bebidasartesanales.es

Web divulgativa en español de España para aprender a **distinguir una bebida artesanal de verdad de una que solo lo parece**.
Bebidas: cerveza · vermut y destilados · sin alcohol (kombucha, ginger beer, refrescos). **Nunca sidra ni vino** (salvo el vino como base del vermut).
La idea de la web: **la etiqueta trasera de la botella es el objeto de estudio**. Enseñamos a leerla.

## Fuente de los datos
- Toda afirmación legal o normativa sale de `docs/investigacion/normativa.md` (léelo entero antes de escribir). Solo lo marcado
  **[VERIFICADO]**. Lo marcado [NO VERIFICADO] **no se afirma** (puedes decir "no hay una norma que lo defina" solo si el dossier lo dice así).
- Conocimiento general de elaboración (cómo se hace la cerveza, qué es un estilo, cómo se destila, cómo fermenta una kombucha) está
  permitido si es de manual y sin cifras dudosas. **Prohibido inventar** cifras, estadísticas, cuotas de mercado, citas de personas, estudios,
  reseñas, productores o marcas. Si no tienes la cifra verificada, escribe sin cifra.
- **No nombres ninguna marca ni empresa real** (ni como buen ni como mal ejemplo). Para "falsos artesanos" explica el **mecanismo** y **cómo
  comprobarlo**, nunca quién lo hace. Los únicos nombres propios permitidos: normas, organismos (AESAN, BOE, OEPM, Registro Mercantil),
  indicaciones geográficas oficiales del dossier (Gin de Mahón, Pacharán Navarro, Orujo de Galicia…), plantas e ingredientes.
- Al final de cada página, una sección `## Fuentes` con lista de enlaces a las fuentes oficiales usadas (URL del dossier), en formato Markdown.

## Tono
- Tuteo, directo, frases cortas, sin cursilería ni jerga de sumiller. Nada de "en el apasionante mundo de…", "descubre", "sumérgete",
  "elevar", "experiencia única", "auténtico" a cada línea. Nada de signos de exclamación.
- Cada párrafo dice algo concreto y útil. Ejemplos de etiqueta concretos (inventados y obviamente genéricos: "Cervecera de Ejemplo, S. L.",
  "Villaejemplo"). Pocas rayas (—): usa punto.
- Divulgativo, no alarmista: que algo no sea artesano **no es ilegal ni malo**; la web enseña a saber qué compras.
- Titular (title) de **32 caracteres o menos** si es posible (máximo 2 líneas); los artículos pueden ser una pregunta más larga (hasta ~60).
- Encabezados `##` claros (que digan de qué va la sección, de 2 a 6 palabras), `###` si hace falta. Sin numerar encabezados ("1. …"), sin emojis.
- Listas solo cuando hay una lista de verdad. La mayor parte en párrafos.

## Formato de cada fichero (Markdown + front matter YAML)
```yaml
---
layout: guia.njk            # guías y páginas de "Cómo distinguirla"; los artículos usan articulo.njk
title: "Las cinco señales"
description: "≤155 caracteres, frase que resume la página para Google."
entradilla: "Una o dos frases (≤ 30 palabras) que dicen qué vas a aprender."
date: 2026-10-25
revisado: 2026-10-25
permalink: /como-distinguir/senales/
imagen: lupulino            # nombre de una foto de la lista de abajo para la banda de cabecera (o huecoImagen: g3)
pieImagen: "Pie breve que dice qué se ve."
padre: { texto: "Cómo distinguirla", url: "/como-distinguir/" }   # omitir en páginas de primer nivel
migas:
  - { texto: "Inicio", url: "/" }
  - { texto: "Cómo distinguirla", url: "/como-distinguir/" }
  - { texto: "Las cinco señales", url: "/como-distinguir/senales/" }
relacionados:
  - { texto: "Leer la etiqueta, línea a línea", url: "/como-distinguir/leer-la-etiqueta/" }
  - { texto: "…", url: "…" }          # 3 o 4 enlaces internos
# solo en las tres guías de bebida:
mapaTipo: cerveza            # cerveza | vermut-y-destilados | sin-alcohol
mapaTexto: "cerveza"         # completa la frase "Productores reales de ___ en España"
---
```

### Imágenes dentro del texto (obligatorio: al menos 3 por página, distintas de la de cabecera y entre sí)
Escribe cada una así, en su propio bloque, separada por líneas en blanco:
```
<figure>
{% imagen "malta", { sizes: "(min-width: 60em) 54vw, 100vw" } %}
<figcaption>Pie que dice qué se ve y por qué importa aquí.</figcaption>
</figure>
```
Fotos disponibles (nombre → qué muestra):
- `lupulo` cono de lúpulo verde en la planta · `lupulino` cono de lúpulo abierto con la lupulina amarilla
- `cebada` espiga de cebada a contraluz · `malta` granos de malta en la palma de una mano · `germinacion` cebada germinando al maltear
- `mosto` cubo con mosto de cerveza · `alambiques` sala con alambiques de cobre · `barricas` bodega con toneles de roble
- `artemisa` lámina botánica de 1906 de dos artemisas (familia del ajenjo) · `genciana` raíces secas de genciana · `enebro` rama de enebro con bayas
- `piel-citrico` pieles de cítrico secas · `kombucha` tarros de kombucha fermentando · `te` hojas de té verde · `jengibre` planta de jengibre con la raíz
- `etiqueta-1910` etiquetas de cerveza de 1910 que nombran la cervecera y su ciudad
Las fotos se muestran en blanco y negro. Nunca digas que una foto es de un productor concreto.

### Enlaces internos que existen (úsalos con naturalidad)
/como-distinguir/ · /como-distinguir/que-significa-artesanal/ · /como-distinguir/senales/ · /como-distinguir/leer-la-etiqueta/ ·
/como-distinguir/falsos-artesanos/ · /como-distinguir/checklist/ · /como-distinguir/glosario/ · /cerveza/ · /vermut-y-destilados/ ·
/sin-alcohol/ · /articulos/como-saber-si-una-cerveza-es-artesana/ · /articulos/vermut-artesano-o-industrial/ ·
/articulos/que-es-la-kombucha/ · /mapa/ (acepta ?tipo=cerveza | vermut-y-destilados | sin-alcohol) · /comprueba-tu-botella/

Anclas fijas en /como-distinguir/senales/ (los `##` deben llamarse exactamente así): "Quién la elabora", "Dónde se hace", "El lote",
"Los ingredientes", "Quién hay detrás".

## Las cinco señales (el esqueleto de toda la web; úsalas con estos nombres)
1. **Quién la elabora** — «elaborado por» frente a «envasado para / distribuido por». La ley solo obliga a poner a quien responde (art. 8 del Reg. 1169/2011), que puede no ser el fabricante.
2. **Dónde se hace** — localidad y dirección del elaborador; coherencia con la historia que cuenta la marca.
3. **El lote** — obligatorio casi siempre (RD 1808/1991); quien da fecha de elaboración o número de cocción ofrece trazabilidad de verdad.
4. **Los ingredientes** — no obligatorios en cerveza y destilados > 1,2 % vol; obligatorios en vermut desde 8/12/2023. Listarlos con detalle cuando no es obligatorio es una señal.
5. **Quién hay detrás** — empresa, titular de la marca (OEPM), registro sanitario si aparece (RGSEAA de AESAN: clave 30 alcohólicas, 29 no alcohólicas; categoría 1 fabricación, 2 envasado, 3 distribución), Registro Mercantil.

## Comprobación antes de terminar
- Ninguna marca/empresa real nombrada. Ninguna cifra que no esté en el dossier. Ninguna norma que no esté [VERIFICADO].
- Palabras del cuerpo dentro del rango pedido (cuenta solo el texto, no el front matter).
- Al menos 3 `<figure>` con fotos distintas. Sección `## Fuentes` al final. YAML válido (comillas en valores con dos puntos).
