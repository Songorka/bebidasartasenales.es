// Portada: pestañas de familias, filtros del mapa y escena de la etiqueta.
(() => {
  // ---------- pestañas (patrón ARIA tabs) ----------
  const bloque = document.querySelector("[data-pestanas]");
  if (bloque) {
    const lista = bloque.querySelector('[role="tablist"]');
    const tabs = [...lista.querySelectorAll('[role="tab"]')];
    const paneles = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")));
    lista.hidden = false;
    bloque.classList.add("con-pestanas");

    const elegir = (i, foco) => {
      tabs.forEach((t, j) => {
        const activa = i === j;
        t.setAttribute("aria-selected", String(activa));
        t.tabIndex = activa ? 0 : -1;
        paneles[j].hidden = !activa;
      });
      if (foco) tabs[i].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => elegir(i, false));
      t.addEventListener("keydown", (e) => {
        const n = tabs.length;
        const mapa = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (e.key in mapa) { e.preventDefault(); elegir((i + mapa[e.key] + n) % n, true); }
        if (e.key === "Home") { e.preventDefault(); elegir(0, true); }
        if (e.key === "End") { e.preventDefault(); elegir(n - 1, true); }
      });
    });
    elegir(0, false);
  }

  // ---------- filtros del mapa ----------
  const mapa = document.querySelector("[data-mapa]");
  if (mapa) {
    const grupo = mapa.querySelector(".filtros");
    const botones = [...grupo.querySelectorAll("[data-filtro]")];
    const puntos = [...mapa.querySelectorAll(".punto")];
    const recuento = mapa.querySelector("[data-recuento]");
    grupo.hidden = false;
    botones.forEach((b) => b.addEventListener("click", () => {
      const f = b.dataset.filtro;
      botones.forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
      let n = 0;
      puntos.forEach((p) => {
        const dentro = f === "todas" || p.dataset.familia === f;
        p.classList.toggle("fuera", !dentro);
        if (dentro) n++;
      });
      if (recuento) recuento.textContent = n;
    }));
  }

  // ---------- escena: cada señal resalta su zona de la etiqueta ----------
  const escena = document.querySelector("[data-escena]");
  if (escena && "IntersectionObserver" in window) {
    const zonas = [...escena.querySelectorAll(".etiqueta-escena .zona")];
    const senales = [...escena.querySelectorAll(".senal")];
    const activar = (id) => {
      zonas.forEach((z) => z.classList.toggle("activa", z.dataset.zona === id));
      senales.forEach((s) => s.classList.toggle("activa", s.dataset.zona === id));
      escena.dataset.zonaActiva = id || "";
    };
    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) if (e.isIntersecting) activar(e.target.dataset.zona);
    }, { rootMargin: "-45% 0px -45% 0px" });
    senales.forEach((s) => io.observe(s));
  }
})();
