// ===== Modo claro / oscuro =====
const raiz = document.documentElement; // la etiqueta <html>
const botonTema = document.getElementById("boton-tema");

function aplicarTema(tema) {
  if (tema === "claro") {
    raiz.setAttribute("data-tema", "claro");
    botonTema.textContent = "🌙";
  } else {
    raiz.removeAttribute("data-tema");
    botonTema.textContent = "☀️";
  }
}

// Al cargar, usamos el tema que el visitante eligió la última vez (si lo hay)
try {
  aplicarTema(localStorage.getItem("tema"));
} catch (e) {
  // Algunos navegadores bloquean localStorage; en ese caso queda el oscuro
}

botonTema.addEventListener("click", function () {
  const nuevoTema = raiz.getAttribute("data-tema") === "claro" ? "oscuro" : "claro";
  aplicarTema(nuevoTema);
  try {
    localStorage.setItem("tema", nuevoTema);
  } catch (e) {}
});

// ===== Secciones que aparecen al hacer scroll =====
// Si la persona pidió menos movimiento en su sistema, no animamos nada
const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducirMovimiento) {
  // El "observador" nos avisa cuando un elemento entra en pantalla
  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.remove("oculta");
        observador.unobserve(entrada.target); // ya apareció, dejamos de mirarla
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll("section").forEach(function (seccion) {
    seccion.classList.add("oculta");
    observador.observe(seccion);
  });
}
