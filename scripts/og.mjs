// Genera la imagen por defecto para redes sociales (1200×630): src/assets/img/og.jpg
import sharp from "sharp";
import fs from "node:fs";

const fuente = fs.readFileSync("src/assets/fuentes/schibsted-grotesk.woff2").toString("base64");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<style>@font-face{font-family:S;src:url(data:font/woff2;base64,${fuente})} text{font-family:S,Arial,sans-serif}</style>
<rect width="1200" height="630" fill="#fff"/>
<rect x="0" y="0" width="420" height="630" fill="#d5dd9a"/>
<rect x="70" y="80" width="280" height="420" fill="#fff"/>
<text x="92" y="130" font-size="26" font-weight="700" fill="#000">Cerveza especial</text>
<text x="92" y="190" font-size="15" fill="#000">Ingredientes: agua, malta,</text>
<text x="92" y="212" font-size="15" fill="#000">lúpulo y levadura.</text>
<rect x="80" y="246" width="260" height="66" fill="#000"/>
<text x="92" y="274" font-size="20" font-weight="700" fill="#fff">L 26-117</text>
<text x="92" y="298" font-size="15" fill="#fff">Elaborada el 12/09/2026</text>
<text x="92" y="350" font-size="15" fill="#000">Elaborada y envasada por</text>
<text x="92" y="372" font-size="15" font-weight="700" fill="#000">Cervecera de Ejemplo, S. L.</text>
<text x="92" y="410" font-size="15" fill="#000">00000 Villaejemplo (España)</text>
<text x="480" y="300" font-size="92" font-weight="700" letter-spacing="-3" fill="#000">Artesana o</text>
<text x="480" y="390" font-size="92" font-weight="700" letter-spacing="-3" fill="#000">solo lo parece</text>
<text x="480" y="500" font-size="30" font-weight="600" fill="#2f5d14">bebidasartesanales.es</text>
</svg>`;
await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile("src/assets/img/og.jpg");
console.log("Escrito src/assets/img/og.jpg");
