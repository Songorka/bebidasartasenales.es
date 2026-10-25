# Notas de dirección — bebidasartesanales.es

## Lectura del brief
Web divulgativa (no tienda) para aprender a distinguir una bebida artesanal de una que solo lo parece.
Lector: adulto curioso que compra en súper o tienda especializada; no sabe leer una etiqueta "a fondo".
Una cosa que debe creer tras la primera pantalla: la etiqueta dice quién hace la bebida, si sabes dónde mirar.
Siguiente paso: leer la guía "Cómo distinguirla" (o comprobar su propia botella).

## Inventario del tema (lo que solo pertenece a esta web)
1. La etiqueta trasera: el bloque de letra pequeña que casi nadie lee.
2. "Elaborado por" frente a "Envasado para / por": el par de palabras que separa quien hace de quien vende.
3. El lote: la "L" seguida de un código, obligatoria (Directiva 2011/91/UE), impresa a chorro de tinta en el cuello o la tapa.
4. La dirección del elaborador: una localidad concreta, una nave, un polígono.
5. El registro sanitario (RGSEAA): un número que identifica la instalación, cuando aparece.
6. El 1,2 % vol: por encima, la ley no obliga a listar ingredientes (Reg. UE 1169/2011, art. 16.4).
7. "De fabricación artesana": la única mención legal de artesanía en cerveza (RD 678/2016, arts. 3.4 y 7.3).
8. Materias: lúpulo, cebada malteada, ajenjo y botánicos del vermut, el alambique de cobre, el SCOBY de la kombucha, la raíz de jengibre.
9. Objetos: la chapa (tapa corona), el precinto, la botella de 33 cl, el tapón de corcho del vermut, el grifo.
10. Las 17 comunidades: la artesanía alimentaria la regula cada comunidad (Andalucía, Galicia, País Vasco… con decretos propios).

## Dirección repartida
`editorial-report` — "The printed annual". seed 7945226, sector education, --have illustration.
Por qué: su eje vertical al 42 % deja una zona izquierda para figuras y notas al margen. Ahí vive la etiqueta
dibujada y sus anotaciones mientras el texto corre a la derecha del eje: la página se lee como un informe de inspección.
Las otras dos (sentence-as-layout, type-only-statement) dan una gran portada pero no estructuran una web de lectura larga.

### Redraws y ajustes (anotados)
- **Tipografía: redraw 1 vez.** Repartida EB Garamond (serif clásico de libro, "susurra", sin negrita).
  DISEÑO.md §2/§5 prohíbe serif de imprenta antigua como personalidad. Segundo reparto: General Sans (Fontshare).
  DISEÑO.md §5 exige Google Fonts; no se reparte una tercera vez: se usa **Schibsted Grotesk** (Google Fonts, variable
  400–900, OFL), la grotesca de Google más cercana a la descripción del reparto (grotesca de cuencos algo geométricos,
  700 a gran tamaño contra texto 400). Grotesca de periódico: encaja con "informe impreso". Mismos valores del reparto:
  display 700, tracking −0,02 em, interlineado 0,9; texto 400/500, interlineado 1,45–1,5.
- **Paleta: no se reparte otra vez; se conservan proporciones y se toman colores del tema** (SKILL.md §3).
  Reparto "Sheet and biro": blanco, tinta casi negra, gris claro de superficie, azul bolígrafo de acento, campo negro.
  Blanco y negro se quedan (DISEÑO lo permite expresamente). El azul no sale de las bebidas y roza el índigo:
  se sustituye por **verde lúpulo oscuro** (#2f5d14) en enlaces y botón, y se añade un **campo de lúpulo fresco**
  (#cddc6e, tinta negra) para las teselas de color. Ni crema, ni terracota, ni ámbar, ni verde botella con dorado.
- **Fotografías repartidas ("People") no se usan**: gente de espaldas en paisajes no tiene nada que ver con el tema.
  Las fotos reales salen de assets.mjs (lúpulo, cebada, alambiques, botánicos, grabados, etiquetas antiguas).
- **Secciones:** el reparto daba intro, features (mosaico), showcase (dos palabras gigantes), list (pestañas), contact.
  DISEÑO §6/§8 exige que las cinco señales vayan con la etiqueta examinada al hacer scroll: la sección de señales es
  la escena firma (etiqueta fija en la zona 0–42 %, señales colgando del eje). El mosaico se usa para "Lo que la ley
  obliga a poner" (datos reales: 1,2 %, lote, operador, definición de cerveza artesana). El mapa (no repartido) es
  una página de color a sangre con el mapa de España dibujado desde productores.json.

## Revisión con frontend-design (Process)
Plan: fondo #ffffff · superficie #f2f2f0 · tinta #000000 · acento #2f5d14 (lúpulo) · campo #d5dd9a (cono de lúpulo) · campo negro.
Tipo: Schibsted Grotesk sola, 700 display / 400–500 texto. Alineación a la izquierda; títulos empiezan en el eje del 42 %.
Cambios tras revisar contra los defaults de lo generado:
- Riesgo "broadsheet" (filetes + radio 0 + columnas densas): sin filetes, una sola columna de 38ch colgando del eje,
  campos de color enteros y mosaicos. El radio 0 se queda (medios cuadrados, como la etiqueta impresa).
- #111 como negro es un tic: tinta y campo pasan a #000 puro (tinta de imprenta de la etiqueta).
- Negro + verde intenso = "near-black con acento ácido": el campo verde se aclara a #d5dd9a y nunca va texto verde sobre negro.
- Nada de "A · B · C" en metadatos ni flechas añadidas a enlaces y botones.

## La idea
> En esta web, **la etiqueta trasera de una botella** se convierte en **el eje del informe**: la figura que ocupa
> el margen izquierdo y que el texto va examinando, zona a zona.

Prueba del competidor: un blog de cerveza o una tienda de vermut no puede firmarla, porque su tema no es distinguir;
la etiqueta para ellos es decoración, aquí es el objeto de estudio.

Showcase: las dos palabras gigantes son **"por"** y **"para"** ("Elaborado por…" / "Envasado para…"). La diferencia
entre hacer y vender una bebida está en una preposición.

## La pieza viva
"Comprueba tu botella": seis preguntas sobre la etiqueta que el visitante tiene delante → un sello
(Muy artesanal / Tiene pinta / Ojo, puede ser marketing) con enlaces a la guía. Pulgar, sin JS = lista con
explicaciones, no bloquea lectura. Discreta, al final de la portada y en su página.

## Escenas
- Escena firma: la etiqueta dibujada se examina al hacer scroll (sección señales). Bloqueada al scroll, sin suavizado.
  Reduced motion: etiqueta completa quieta con las cinco zonas marcadas.
- Movimiento repartido: "Masked headline" para el titular de la portada.

## Verificado (fuentes para el copy de la portada)
- RD 678/2016, art. 3.4 (definición de fabricación artesana) y 7.3 (mención voluntaria): https://www.boe.es/buscar/act.php?id=BOE-A-2016-11952
- Reg. (UE) 1169/2011, art. 16.4 (bebidas > 1,2 % vol exentas de lista de ingredientes y declaración nutricional).
- Reg. (UE) 1169/2011, art. 8: el responsable de la información es el operador con cuyo nombre se comercializa el producto (no tiene por qué ser el fabricante).
- Directiva 2011/91/UE: lote obligatorio, precedido de "L" salvo que se distinga claramente.
- Artesanía alimentaria: competencia autonómica; decretos en Andalucía (Decreto 352/2011, BOJA 237/2011), Galicia (Decreto 174/2019), País Vasco (Decreto 126/2012). Verificar a fondo en Fase 3.
