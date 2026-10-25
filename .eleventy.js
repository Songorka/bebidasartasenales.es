import rssPlugin from "@11ty/eleventy-plugin-rss";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import htmlmin from "html-minifier-terser";
import fs from "node:fs";
import path from "node:path";
import { proyectar } from "./scripts/mapa.mjs";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);

  // Markdown con anclas en los encabezados
  const md = markdownIt({ html: true, linkify: true, typographer: true })
    .use(markdownItAnchor, { level: [2, 3], permalink: markdownItAnchor.permalink.headerLink() });
  eleventyConfig.setLibrary("md", md);

  // Pasa-a-salida tal cual
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addGlobalData("anio", () => new Date().getFullYear());

  // Filtros útiles
  eleventyConfig.addFilter("fecha", (value, locale = "es-ES") => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    return d.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
  });
  // Índice de contenidos: los h2 con id que genera markdown-it-anchor
  eleventyConfig.addFilter("indice", (html = "") => {
    const lista = [];
    for (const m of String(html).matchAll(/<h2[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)) {
      lista.push({ id: m[1], texto: m[2].replace(/<[^>]+>/g, "").trim() });
    }
    return lista;
  });
  eleventyConfig.addFilter("palabras", (html = "") => String(html).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length);
  eleventyConfig.addFilter("proyectar", (p) => proyectar(p.lat, p.lng));
  eleventyConfig.addFilter("familiaDe", (tipo) =>
    tipo === "cerveza" ? "cerveza" : ["vermut", "destilado"].includes(tipo) ? "vermut-y-destilados" : "sin-alcohol"
  );
  eleventyConfig.addFilter("migasLd", (migas, base) =>
    migas.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: m.texto, item: base + m.url }))
  );
  eleventyConfig.addFilter("iso", (value) => {
    if (!value) return "";
    const d = value === "now" ? new Date() : value instanceof Date ? value : new Date(value);
    return d.toISOString();
  });

  // Medios: imágenes con <picture> y huecos para vídeo/imágenes generadas (ver MEDIOS.md)
  const leerMedios = () => JSON.parse(fs.readFileSync(path.join("src", "_data", "medios.json"), "utf8"));
  const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

  function picture(img, { alt, sizes = "100vw", clase = "", carga = "lazy", prioridad = false } = {}) {
    const srcset = (ext) => img.anchos.map((a) => `${img.ruta}-${a}.${ext} ${a}w`).join(", ");
    const mayor = img.anchos[img.anchos.length - 1];
    const medio = img.anchos.find((a) => a >= 1200) || mayor;
    const alto = Math.round((img.h * medio) / img.w);
    return `<picture${clase ? ` class="${clase}"` : ""}>` +
      `<source type="image/avif" srcset="${srcset("avif")}" sizes="${sizes}">` +
      `<source type="image/webp" srcset="${srcset("webp")}" sizes="${sizes}">` +
      `<img src="${img.ruta}-${medio}.jpg" srcset="${srcset("jpg")}" sizes="${sizes}" width="${medio}" height="${alto}" alt="${esc(alt ?? img.alt)}"` +
      `${prioridad ? ' fetchpriority="high"' : ` loading="${carga}"`} decoding="async"></picture>`;
  }

  eleventyConfig.addShortcode("imagen", function (nombre, opciones = {}) {
    const img = leerMedios().imagenes[nombre];
    if (!img) throw new Error(`Imagen desconocida: ${nombre}`);
    return picture(img, opciones);
  });

  // Devuelve "svg:<nombre>" cuando el hueco aún no tiene medio y su sustituto es un dibujo.
  eleventyConfig.addShortcode("hueco", function (clave, opciones = {}) {
    const m = leerMedios();
    const h = m.huecos[clave];
    if (!h) throw new Error(`Hueco desconocido: ${clave}`);
    const marca = `data-hueco="${clave}"`;
    const nombreVideo = h.video;
    if (nombreVideo && m.videos[nombreVideo]) {
      const v = m.videos[nombreVideo];
      return `<video class="${opciones.clase || ""}" ${marca} muted loop playsinline preload="none" poster="${v.poster}" width="${v.w}" height="${v.h}" aria-hidden="true" data-autoplay>` +
        `<source src="${v.webm}" type="video/webm"><source src="${v.mp4}" type="video/mp4"></video>`;
    }
    const nombreImg = h.imagen || h.poster;
    if (nombreImg && m.imagenes[nombreImg]) {
      return picture(m.imagenes[nombreImg], opciones).replace("<picture", `<picture ${marca}`);
    }
    if (h.svg) return `svg:${h.svg}`;
    return "";
  });

  // Minificado del HTML en producción
  eleventyConfig.addTransform("htmlmin", async function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      });
    }
    return content;
  });

  // Colecciones
  eleventyConfig.addCollection("articulos", (api) =>
    api.getFilteredByGlob("src/articulos/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "11ty.js", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
