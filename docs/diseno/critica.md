# Crítica (references/critique.md §4)

```
ROUND 1 — Fase 2, portada quieta (1440 / 768 / 390)
Seen in one second: un mosaico gris y verde con una etiqueta blanca dentro, y un titular negro enorme «Artesana o solo lo parece».
Idea (one sentence): la contraetiqueta de una botella es la figura del margen izquierdo que el texto va examinando zona a zona.
Live thing: «Comprueba tu botella» (enlazado; se construye en la Fase 5). En la portada, la etiqueta resalta cada zona al leer su señal.
Layout words by section: hero=mosaico + título en el eje / declaración=párrafo a la derecha del eje, foto colgando a la izquierda /
  señales=columna verde fija con la etiqueta + lista larga / ley=mosaico de teselas distintas / por-para=dos especímenes gigantes cortados /
  familias=pestañas + bandas / mapa=página de color con vídeo y mapa / comprueba=figura + texto / cierre=frase, foto pequeña, enlaces.
Scores: design 7 · usability 8 · creativity 8 · content 7 → overall 7.5
Caps applied: still-page (Fase 6 aún no hecha) → máximo 6.0 hasta que exista el movimiento.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. desktop-page-03: en el mapa, la columna izquierda queda vacía bajo el recuento mientras el mapa ocupa 620 px → añadir el reparto
   real por comunidad autónoma cuando lleguen los datos de productores (Fase 4).
2. desktop-page-01: la foto de la declaración es pequeña (20 vw) y el gris de la kombucha queda apagado → subir a 24 vw; sustituir por G2 cuando llegue.
3. desktop-fold: dos teselas planas (negra y gris) en el mosaico no aportan contenido → aceptable según el blueprint (teselas de color),
   revisar cuando llegue V1; si el mosaico se ve vacío, cambiar la gris por una foto de archivo.
```

```
ROUND 2 — Fase 8, web terminada con movimiento (1440 / 768 / 390)
Seen in one second: mosaico en blanco y negro con una contraetiqueta blanca sobre verde lúpulo; «Artesana o solo lo parece» enorme en el eje.
Idea (one sentence): la contraetiqueta es la figura del margen que el texto examina zona a zona; en la escena firma se acerca a cada zona.
Live thing: «Comprueba tu botella» (seis preguntas → sello estampado), incrustado al final de la portada y con página propia.
Layout words by section: hero=mosaico + título en el eje / declaración=líneas que suben a la derecha del eje, foto colgando /
  señales=etiqueta fija que se acerca (móvil: recortes por señal) / ley=mosaico de teselas distintas / por-para=especímenes que emergen /
  familias=pestañas + bandas / mapa=página de color con reparto por comunidad / comprueba=desplegable con el test / cierre=frase, foto, enlaces.
Scores: design 8 · usability 8 · creativity 8 · content 8 → overall 8.0
Caps applied: ninguno (0 FAIL en portada, guía, artículo, mapa y test; avisos defendidos: tipografía de Google Fonts por DISEÑO.md,
  borde derecho del texto irregular por el ancho de lectura).
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Las fotos provisionales (kombucha en G2 y V2) son la parte más floja del conjunto → se sustituyen solas cuando lleguen los medios de MEDIOS.md.
2. En la portada, las teselas negra y gris del mosaico siguen siendo planas → valorar sustituir la gris por G3 cuando exista.
3. El mapa estático de la página /mapa/ queda bajo la línea de la primera pantalla en 1440×900 → aceptable (el título y los filtros mandan); revisar si se añade V2.
```

```
ROUND 3 — Auditoría UX pedida por el propietario («muchos espacios en blanco», «¿fondo blanco estático?»)
Seen in one second: igual que la ronda 2, pero la página respira menos y cambia de color por capítulos.
Problemas encontrados: señales de 60svh con un párrafo pequeño (≈3 pantallas casi vacías); separación de secciones ≈210px + rellenos;
  declaración en columna estrecha entre vacíos; cierre con hueco central; fondo blanco continuo sin ritmo.
Cambios: --section a clamp(5rem, 8.5vw, 8.5rem); señales a 40svh con titular mayor, texto a tamaño de entradilla y la frase literal de la
  etiqueta como prueba (en móvil, el recorte de la etiqueta); declaración más grande con la foto G2 a su altura; capítulos de color con cortes
  limpios: por/para en negro, mapa en verde lúpulo, «Comprueba tu botella» en gris; cierre compacto; revelados que arrancan en cuanto asoman.
Fondo: se mantiene el blanco como «papel» de lectura (es la idea: la etiqueta), con capítulos de color para el ritmo. Sin degradados.
Scores: design 8.5 · usability 8.5 · creativity 8 · content 8 → overall 8.3
Caps applied: ninguno (0 FAIL a 1440, 768 y 390).
```
