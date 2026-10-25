// npm run medios
// 1. Optimiza las imágenes de archivo (medios-originales/) a AVIF, WebP y JPG en varios anchos.
// 2. Convierte lo que el propietario suelte en medios-entrada/ (v1.mp4, v2.mp4, g1.png…g4.png)
//    a los formatos y tamaños de cada hueco (ver MEDIOS.md).
// 3. Escribe src/_data/medios.json, que las plantillas usan para pintar cada hueco
//    (con el medio definitivo si existe, o con su sustituto provisional si no).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const RAIZ = process.cwd();
const ORIG = path.join(RAIZ, "medios-originales");
const ENTRADA = path.join(RAIZ, "medios-entrada");
const SAL_IMG = path.join(RAIZ, "src/assets/img");
const SAL_VID = path.join(RAIZ, "src/assets/video");
const DATOS = path.join(RAIZ, "src/_data/medios.json");
const ANCHOS = [640, 1200, 2000];

const ARCHIVO = [
  { src: "hop-cone.jpg", nombre: "lupulo", alt: "Cono de lúpulo verde colgando entre las hojas de la planta" },
  { src: "lupulin-in-a-cross-section-of-a.jpg", nombre: "lupulino", alt: "Cono de lúpulo abierto por la mitad con los granos amarillos de lupulina" },
  { src: "barley-ear-backlit-1.jpg", nombre: "cebada", alt: "Espiga de cebada a contraluz" },
  { src: "copper-pot-stills.jpg", nombre: "alambiques", alt: "Sala de destilación con alambiques de cobre" },
  { src: "nouvelle-flore-coloriee-de-poche-des-alpes.jpg", nombre: "artemisa", alt: "Lámina botánica de 1906 con dos especies de artemisa, la familia del ajenjo del vermut" },
  { src: "1910-eagle-beer-label-allentown-pa.jpg", nombre: "etiqueta-1910", alt: "Cuatro etiquetas de cerveza de 1910 que nombran a la cervecera y su ciudad" },
  { src: "kombucha-in-garglasern.jpg", nombre: "kombucha", alt: "Tarros de kombucha fermentando, tapados con tela, en una estantería" },
  { src: "zingiber-officinale-230935597.jpg", nombre: "jengibre", alt: "Planta de jengibre con la raíz asomando sobre la tierra" },
  { src: "anderson-valley-brewing-company-november-2022-sarah-poster.jpg", nombre: "mosto", alt: "Cubo con mosto de cerveza recién salido del tanque" },
];

// Huecos para los medios generados por el propietario. Medidas en MEDIOS.md.
const HUECOS = {
  v1: { tipo: "video", w: 1920, h: 1080, provisional: { video: "sala-coccion", poster: "mosto" } },
  v2: { tipo: "video", w: 1920, h: 1080, provisional: { poster: "kombucha" } },
  g1: { tipo: "imagen", w: 1600, h: 2000, provisional: { svg: "botella" } },
  g2: { tipo: "imagen", w: 1600, h: 2000, provisional: { imagen: "kombucha" } },
  g3: { tipo: "imagen", w: 2000, h: 1250, provisional: { imagen: "lupulino" } },
  g4: { tipo: "imagen", w: 2000, h: 1500, provisional: { imagen: "etiqueta-1910" } },
};

const ALT_HUECO = {
  g1: "Botella sin marca fotografiada de cerca, con la etiqueta trasera a la vista",
  g2: "Vidrio y líquido a contraluz",
  g3: "Botánicos y lúpulo de cerca",
  g4: "Detalle de una etiqueta con el lote y el nombre del elaborador",
};

function asegurar(dir) { fs.mkdirSync(dir, { recursive: true }); }
function hayFfmpeg() { try { execFileSync("ffmpeg", ["-version"], { stdio: "ignore" }); return true; } catch { return false; } }

async function optimizar(origen, carpeta, nombre, opciones = {}) {
  asegurar(carpeta);
  const meta = await sharp(origen).metadata();
  let base = sharp(origen).rotate();
  let w = meta.width, h = meta.height;
  if (opciones.w && opciones.h) {
    base = base.resize(opciones.w, opciones.h, { fit: "cover", position: "attention" });
    w = opciones.w; h = opciones.h;
  }
  const buffer = await base.toBuffer();
  const anchos = ANCHOS.filter((a) => a < w).concat(Math.min(w, 2000));
  const unicos = [...new Set(anchos)];
  for (const a of unicos) {
    const r = sharp(buffer).resize({ width: a });
    await r.clone().avif({ quality: 50 }).toFile(path.join(carpeta, `${nombre}-${a}.avif`));
    await r.clone().webp({ quality: 72 }).toFile(path.join(carpeta, `${nombre}-${a}.webp`));
    await r.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(carpeta, `${nombre}-${a}.jpg`));
  }
  const rel = "/" + path.relative(path.join(RAIZ, "src"), carpeta).replaceAll("\\", "/");
  return { ruta: `${rel}/${nombre}`, w, h, anchos: unicos };
}

function convertirVideo(origen, nombre, w, h) {
  asegurar(SAL_VID);
  const filtro = `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},fps=30`;
  const mp4 = path.join(SAL_VID, `${nombre}.mp4`);
  const webm = path.join(SAL_VID, `${nombre}.webm`);
  const poster = path.join(SAL_VID, `${nombre}-poster.jpg`);
  execFileSync("ffmpeg", ["-y", "-i", origen, "-an", "-vf", filtro, "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p", "-crf", "26", "-preset", "slow", "-movflags", "+faststart", mp4], { stdio: "ignore" });
  execFileSync("ffmpeg", ["-y", "-i", origen, "-an", "-vf", filtro, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1", webm], { stdio: "ignore" });
  execFileSync("ffmpeg", ["-y", "-i", mp4, "-frames:v", "1", "-q:v", "3", poster], { stdio: "ignore" });
  return { mp4: `/assets/video/${nombre}.mp4`, webm: `/assets/video/${nombre}.webm`, poster: `/assets/video/${nombre}-poster.jpg`, w, h };
}

function buscarEntrada(clave, extensiones) {
  if (!fs.existsSync(ENTRADA)) return null;
  const f = fs.readdirSync(ENTRADA).find((n) => {
    const { name, ext } = path.parse(n);
    return name.toLowerCase() === clave && extensiones.includes(ext.toLowerCase());
  });
  return f ? path.join(ENTRADA, f) : null;
}

const previo = fs.existsSync(DATOS) ? JSON.parse(fs.readFileSync(DATOS, "utf8")) : { imagenes: {}, videos: {}, huecos: {} };
const datos = { imagenes: { ...previo.imagenes }, videos: { ...previo.videos }, huecos: {} };
const ffmpeg = hayFfmpeg();
const creditos = fs.existsSync(path.join(ORIG, "credits.json")) ? JSON.parse(fs.readFileSync(path.join(ORIG, "credits.json"), "utf8")) : [];

// 1. Archivo
if (fs.existsSync(ORIG)) {
  for (const item of ARCHIVO) {
    const origen = path.join(ORIG, item.src);
    if (!fs.existsSync(origen)) continue;
    const r = await optimizar(origen, path.join(SAL_IMG, "archivo"), item.nombre);
    const cred = creditos.find((c) => c.file?.endsWith(item.src) || (c.poster && c.poster.endsWith(item.src)));
    datos.imagenes[item.nombre] = { ...r, alt: item.alt, credito: cred ? { titulo: cred.title, autor: cred.creator, licencia: cred.license, licenciaUrl: cred.licenseUrl, pagina: cred.page, via: cred.via } : null };
    console.log("archivo  ", item.nombre);
  }
  const clip = creditos.find((c) => c.media === "video");
  if (clip && ffmpeg) {
    const origen = path.join(RAIZ, clip.file);
    if (fs.existsSync(origen)) {
      const v = convertirVideo(origen, "sala-coccion", 816, 460);
      datos.videos["sala-coccion"] = { ...v, credito: { titulo: clip.title, autor: clip.creator, licencia: clip.license, licenciaUrl: clip.licenseUrl, pagina: clip.page, via: clip.via } };
      console.log("archivo   sala-coccion (vídeo)");
    }
  }
}

// 2. Huecos del propietario
for (const [clave, h] of Object.entries(HUECOS)) {
  if (h.tipo === "imagen") {
    const origen = buscarEntrada(clave, [".png", ".jpg", ".jpeg", ".webp", ".avif"]);
    if (origen) {
      const r = await optimizar(origen, path.join(SAL_IMG, "generadas"), clave, { w: h.w, h: h.h });
      datos.imagenes[clave] = { ...r, alt: ALT_HUECO[clave], generada: true };
      console.log("generada ", clave);
    }
    datos.huecos[clave] = datos.imagenes[clave]?.generada ? { imagen: clave, generada: true } : { ...h.provisional, provisional: true };
  } else {
    const origen = buscarEntrada(clave, [".mp4", ".mov", ".webm", ".m4v"]);
    if (origen && ffmpeg) {
      datos.videos[clave] = { ...convertirVideo(origen, clave, h.w, h.h), generado: true };
      console.log("generado ", clave);
    } else if (origen) {
      console.log(`AVISO: ${clave} está en medios-entrada/ pero no hay ffmpeg instalado. Ver MEDIOS.md.`);
    }
    datos.huecos[clave] = datos.videos[clave]?.generado ? { video: clave, generado: true } : { ...h.provisional, provisional: true };
  }
}

fs.writeFileSync(DATOS, JSON.stringify(datos, null, 2) + "\n");
console.log("Escrito src/_data/medios.json");
