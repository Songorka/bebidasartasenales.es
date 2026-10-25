// Sirve _site/ tal cual se publica (para revisar el build de producción). Uso: node scripts/servir.mjs [puerto]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const RAIZ = path.resolve("_site");
const PUERTO = Number(process.argv[2] || 8080);
const TIPOS = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json",
  ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif",
  ".woff2": "font/woff2", ".mp4": "video/mp4", ".webm": "video/webm", ".xml": "application/xml", ".txt": "text/plain",
};

http.createServer((req, res) => {
  let ruta = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let fichero = path.join(RAIZ, ruta);
  if (!fichero.startsWith(RAIZ)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(fichero) && fs.statSync(fichero).isDirectory()) fichero = path.join(fichero, "index.html");
  if (!fs.existsSync(fichero)) {
    res.writeHead(404, { "content-type": TIPOS[".html"] });
    fs.createReadStream(path.join(RAIZ, "404.html")).pipe(res);
    return;
  }
  res.writeHead(200, { "content-type": TIPOS[path.extname(fichero)] || "application/octet-stream" });
  fs.createReadStream(fichero).pipe(res);
}).listen(PUERTO, () => console.log(`Sirviendo _site en http://localhost:${PUERTO}`));
