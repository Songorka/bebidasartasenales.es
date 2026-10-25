// Común a todas las páginas. Todo el contenido se lee sin este script.
(() => {
  const quieto = matchMedia("(prefers-reduced-motion: reduce)");

  // Vídeos en bucle mudo: solo se cargan y reproducen a la vista y si no se pide menos movimiento.
  const videos = document.querySelectorAll("video[data-autoplay]");
  if (videos.length && "IntersectionObserver" in window) {
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
})();
