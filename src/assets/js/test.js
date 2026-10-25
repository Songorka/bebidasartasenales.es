// Comprueba tu botella: cuenta los «sí» y muestra el sello. Sin librerías.
(() => {
  document.querySelectorAll("[data-test]").forEach((form) => {
    const preguntas = [...form.querySelectorAll(".test-pregunta")];
    const aviso = form.querySelector("[data-test-aviso]");
    const resultado = form.querySelector("[data-test-resultado]");
    const sellos = [...form.querySelectorAll("[data-sello]")];
    form.classList.add("test-activo");

    form.addEventListener("change", () => { aviso.textContent = ""; });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const sinResponder = preguntas.filter((p) => !p.querySelector("input:checked"));
      if (sinResponder.length) {
        aviso.textContent = sinResponder.length === 1 ? "Falta una pregunta por contestar." : `Faltan ${sinResponder.length} preguntas por contestar.`;
        sinResponder[0].querySelector("input").focus();
        return;
      }
      let si = 0;
      preguntas.forEach((p) => {
        const valor = p.querySelector("input:checked").value;
        if (valor === "si") si++;
        p.classList.toggle("test-falla", valor === "no");
      });
      const clave = si >= 5 ? "muy" : si >= 3 ? "pinta" : "ojo";
      sellos.forEach((s) => { s.hidden = s.dataset.sello !== clave; s.classList.remove("estampa"); });
      form.classList.add("test-resuelto");
      resultado.hidden = false;
      const elegido = sellos.find((s) => s.dataset.sello === clave);
      requestAnimationFrame(() => elegido.classList.add("estampa"));
      resultado.focus({ preventScroll: true });
      resultado.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
    });

    form.addEventListener("reset", () => {
      form.classList.remove("test-resuelto");
      preguntas.forEach((p) => p.classList.remove("test-falla"));
      resultado.hidden = true;
      sellos.forEach((s) => { s.hidden = true; s.classList.remove("estampa"); });
      requestAnimationFrame(() => preguntas[0].querySelector("input").focus());
    });
  });
})();
