// Común a todas las páginas. Todo el contenido se lee sin este script.
(() => {
  const quieto = matchMedia("(prefers-reduced-motion: reduce)");
  const hayIO = "IntersectionObserver" in window;

  // Vídeos en bucle mudo: solo se cargan y reproducen a la vista y si no se pide menos movimiento.
  const videos = document.querySelectorAll("video[data-autoplay]");
  if (videos.length && hayIO) {
    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        const v = e.target;
        if (e.isIntersecting && !quieto.matches) {
          if (v.preload === "none") { v.preload = "auto"; v.load(); }
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      }
    }, { threshold: 0.2 });
    videos.forEach((v) => io.observe(v));
  }

  // Las imágenes del texto de lectura se abren desde una máscara; las listas de enlaces entran fila a fila.
  document.querySelectorAll(".prosa figure, .indice-guia .familia-foto, .articulo-foto").forEach((f) => { f.dataset.revelar = "asentar"; });
  document.querySelectorAll(".lista-articulos, .familias-lista").forEach((l) => { l.dataset.revelar = "fila"; });

  // Revelados: una sola vez, cuando el bloque entra por abajo.
  const revelar = [...document.querySelectorAll("[data-revelar]")];
  revelar.forEach((el) => {
    if (el.dataset.revelar === "fila") [...el.children].forEach((h, i) => h.style.setProperty("--i", Math.min(i, 8)));
  });
  if (!hayIO || quieto.matches) {
    revelar.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0 });
    revelar.forEach((el) => io.observe(el));
  }

  // Líneas que suben: se parte el texto por líneas reales tras cargar la fuente y se devuelve al terminar.
  const lineas = [...document.querySelectorAll("[data-lines]")];
  if (lineas.length && hayIO && !quieto.matches) {
    const devolver = (el) => { el.textContent = el.dataset.texto; el.classList.remove("is-split", "is-in"); };
    const partir = (el) => {
      const texto = el.textContent.trim().replace(/\s+/g, " ");
      el.dataset.texto = texto;
      el.textContent = "";
      const palabras = texto.split(" ").map((p) => {
        const s = document.createElement("span");
        s.style.display = "inline-block";
        s.textContent = p;
        el.append(s, " ");
        return s;
      });
      const filas = [];
      for (const w of palabras) {
        const u = filas.at(-1);
        if (u && Math.abs(u.top - w.offsetTop) < 4) u.palabras.push(w.textContent);
        else filas.push({ top: w.offsetTop, palabras: [w.textContent] });
      }
      el.textContent = "";
      filas.forEach((f, i) => {
        const m = document.createElement("span");
        const d = document.createElement("span");
        m.className = "line";
        d.style.setProperty("--i", i);
        d.textContent = f.palabras.join(" ");
        m.append(d);
        el.append(m, " ");
      });
      el.classList.add("is-split");
    };
    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        e.target.classList.add("is-in");
        const ultima = e.target.querySelector(".line:last-of-type > span");
        if (ultima) ultima.addEventListener("transitionend", () => devolver(e.target), { once: true });
      }
    }, { rootMargin: "0px 0px -10% 0px" });
    document.fonts.ready.then(() => lineas.forEach((el) => { partir(el); io.observe(el); }));
    let ancho = innerWidth;
    addEventListener("resize", () => {
      if (innerWidth === ancho) return;
      ancho = innerWidth;
      lineas.filter((el) => el.matches(".is-split:not(.is-in)")).forEach((el) => { io.unobserve(el); devolver(el); });
    });
  }
})();
