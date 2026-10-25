import rssPlugin from "@11ty/eleventy-plugin-rss";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import htmlmin from "html-minifier-terser";
import fs from "node:fs";
import path from "node:path";

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
  eleventyConfig.addFilter("iso", (value) => {
    if (!value) return "";
    const d = value === "now" ? new Date() : value instanceof Date ? value : new Date(value);
    return d.toISOString();
  });

  // Comprobación en tiempo de build: existe el medio?
  eleventyConfig.addShortcode("medioExiste", function (ruta) {
    const absoluta = path.join("src", "assets", ruta);
    return fs.existsSync(absoluta);
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
