/* CONTROLADOR: lógica de navegación entre vistas (estructura MVC) */
(function () {
  "use strict";

  var indice = 0;
  var panel = null;

  function marcar() {
    var total = MODELO.diapositivas.length;
    var avance = document.getElementById("progreso");
    document.getElementById("contador").textContent =
      (indice + 1) + " / " + total;
    if (avance) {
      avance.style.width = (((indice + 1) / total) * 100) + "%";
    }
    document.querySelectorAll("#miniaturas .mini-btn").forEach(function (b) {
      b.classList.toggle("activo", parseInt(b.dataset.idx, 10) === indice);
    });
  }

  function renderizar() {
    var contenedor = document.getElementById("slider");
    var diap = MODELO.diapositivas[indice];
    contenedor.innerHTML = (window.VISTAS && window.VISTAS[diap.id])
      ? window.VISTAS[diap.id]
      : "<div class='slide'><h2>Vista no encontrada</h2></div>";
    contenedor.classList.remove("animar");
    void contenedor.offsetWidth; /* reinicia la animación */
    contenedor.classList.add("animar");
    document.getElementById("titulo-actual").textContent = diap.titulo;
    marcar();
  }

  function renderizarMiniaturas() {
    var barra = document.getElementById("miniaturas");
    barra.innerHTML = "";
    MODELO.diapositivas.forEach(function (d, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "mini-btn";
      b.dataset.idx = i;
      b.title = d.titulo;
      b.setAttribute("aria-label", d.titulo);
      b.addEventListener("click", function () {
        indice = i;
        renderizar();
      });
      barra.appendChild(b);
    });
  }

  function irAnterior() {
    if (indice > 0) { indice--; renderizar(); }
  }

  function irSiguiente() {
    if (indice < MODELO.diapositivas.length - 1) { indice++; renderizar(); }
  }

  /* Navegación por clic: región izquierda = atrás, región derecha = siguiente.
     El área central (tercio medio) no navega. Se evita el borde derecho para
     no interferir con la barra de desplazamiento de la diapositiva. */
  function gestionarClic(e) {
    var rect = panel.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var tercio = rect.width / 3;

    if (x < tercio && e.clientX >= 0) {
      irAnterior();
    } else if (x > tercio * 2 && x < rect.width - 28) {
      irSiguiente();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    panel = document.getElementById("diapositiva");
    panel.addEventListener("click", gestionarClic);

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft" || e.key === "PageUp") irAnterior();
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        irSiguiente();
      }
      if (e.key === "Home") { indice = 0; renderizar(); }
    });

    /* Gestos táctiles */
    var xInicio = null;
    panel.addEventListener("touchstart", function (e) {
      xInicio = e.touches[0].clientX;
    }, { passive: true });
    panel.addEventListener("touchend", function (e) {
      if (xInicio === null) return;
      var delta = e.changedTouches[0].clientX - xInicio;
      if (Math.abs(delta) > 60) {
        if (delta < 0) irSiguiente();
        else irAnterior();
      }
      xInicio = null;
    }, { passive: true });

    renderizarMiniaturas();
    renderizar();
  });
})();