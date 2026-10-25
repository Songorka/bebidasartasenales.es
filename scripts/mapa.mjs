// Genera src/_data/mapa.json con el contorno de España (Natural Earth 1:50m, dominio público)
// y la proyección que usa el filtro "proyectar" de .eleventy.js.
// Uso: node scripts/mapa.mjs <ruta a ne_50m_admin_0_countries.geojson>
import fs from "node:fs";

export const PROY = { lng0: -9.4, lat0: 43.9, k: 60, c: Math.cos((40 * Math.PI) / 180), canarias: { dlng: 9.5, dlat: 6.3 } };

export function proyectar(lat, lng) {
  if (lng < -12 && lat < 30) { lng += PROY.canarias.dlng; lat += PROY.canarias.dlat; }
  return [+((lng - PROY.lng0) * PROY.c * PROY.k).toFixed(1), +((PROY.lat0 - lat) * PROY.k).toFixed(1)];
}

if (process.argv[2]) {
  const g = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
  const esp = g.features.find((f) => f.properties.ADM0_A3 === "ESP").geometry;
  const d = esp.coordinates
    .map((poli) => "M" + poli[0].map(([lng, lat]) => proyectar(lat, lng).join(" ")).join("L") + "Z")
    .join("");
  const [w] = proyectar(35, 4.5);
  const [, h] = proyectar(33.55, -9.4);
  const caja = proyectar(29.6, -18.4).concat(proyectar(27.4, -13.2));
  fs.writeFileSync("src/_data/mapa.json", JSON.stringify({
    viewBox: `0 0 ${Math.ceil(w)} ${Math.ceil(h)}`,
    d,
    canarias: { x: caja[0], y: caja[1], w: +(caja[2] - caja[0]).toFixed(1), h: +(caja[3] - caja[1]).toFixed(1) },
  }) + "\n");
  console.log("Escrito src/_data/mapa.json", w, h);
}
