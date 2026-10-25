// Mapa de productores: Leaflet + teselas de OpenStreetMap, filtros por bebida y comunidad.
// Sin JavaScript se ven el mapa dibujado y la lista completa.
(() => {
  const lienzo = document.querySelector("[data-mapa-lienzo]");
  const controles = document.querySelector("[data-controles]");
  if (!lienzo || !controles) return;
  const items = [...document.querySelectorAll(".productor")];
  const grupos = [...document.querySelectorAll(".mapa-grupo")];
  const botones = [...controles.querySelectorAll("[data-filtro]")];
  const selector = controles.querySelector("[data-comunidad]");
  const recuento = controles.querySelector("[data-recuento]");
  const familias = ["cerveza", "vermut-y-destilados", "sin-alcohol"];

  const params = new URLSearchParams(location.search);
  let familia = familias.includes(params.get("tipo")) ? params.get("tipo") : "todas";
  let comunidad = params.get("comunidad") || "";
  controles.hidden = false;

  // Carga Leaflet solo aquí, y solo cuando hace falta.
  const css = document.createElement("link");
  css.rel = "stylesheet"; css.href = "/assets/vendor/leaflet/leaflet.css";
  document.head.append(css);
  const js = document.createElement("script");
  js.src = "/assets/vendor/leaflet/leaflet.js";
  js.onload = iniciar;
  document.head.append(js);

  let mapa, capa;
  const marcadores = [];

  function iniciar() {
    const L = window.L;
    lienzo.innerHTML = "";
    lienzo.classList.add("con-leaflet");
    mapa = L.map(lienzo, { scrollWheelZoom: false, zoomSnap: 0.25 }).setView([40.2, -3.6], 5.5);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">colaboradores de OpenStreetMap</a>',
    }).addTo(mapa);
    mapa.attributionControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');
    capa = L.featureGroup().addTo(mapa);
    items.forEach((li) => {
      const d = li.dataset;
      const icono = L.divIcon({ className: `marca-mapa f-${d.familia}`, iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [0, -10] });
      const m = L.marker([+d.lat, +d.lng], { icon: icono, title: d.nombre, keyboard: true });
      const div = document.createElement("div");
      const h = document.createElement("strong"); h.textContent = d.nombre;
      const p = document.createElement("span"); p.textContent = `${d.tipo}. ${d.localidad}`;
      const a = document.createElement("a"); a.href = d.web; a.rel = "noopener"; a.textContent = "Visitar su web";
      div.append(h, p, a);
      div.className = "mapa-popup";
      m.bindPopup(div);
      marcadores.push({ m, li });
    });
    aplicar(true);
  }

  function aplicar(encuadrar) {
    let n = 0;
    botones.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filtro === familia)));
    selector.value = comunidad;
    items.forEach((li) => {
      const ok = (familia === "todas" || li.dataset.familia === familia) && (!comunidad || li.dataset.comunidad === comunidad);
      li.hidden = !ok;
      if (ok) n++;
    });
    grupos.forEach((g) => { g.hidden = !g.querySelector(".productor:not([hidden])"); });
    recuento.textContent = n;
    if (capa) {
      capa.clearLayers();
      marcadores.forEach(({ m, li }) => { if (!li.hidden) capa.addLayer(m); });
      if (encuadrar && n) mapa.fitBounds(capa.getBounds(), { padding: [30, 30], maxZoom: 9 });
    }
    const url = new URL(location.href);
    familia === "todas" ? url.searchParams.delete("tipo") : url.searchParams.set("tipo", familia);
    comunidad ? url.searchParams.set("comunidad", comunidad) : url.searchParams.delete("comunidad");
    history.replaceState(null, "", url);
  }

  botones.forEach((b) => b.addEventListener("click", () => { familia = b.dataset.filtro; aplicar(true); }));
  selector.addEventListener("change", () => { comunidad = selector.value; aplicar(true); });
  aplicar(false);
})();
