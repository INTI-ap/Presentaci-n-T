/* VISTA 01 - Presentación (Portada) */
(function () {
  window.VISTAS = window.VISTAS || {};
  window.VISTAS.portada = `
    <div class="slide slide--portada">
      <img src="img/img1.png" alt="Logo del proyecto" class="portada-logo">
      <div class="portada-badge">ESBOZO DE INVESTIGACIÓN</div>
      <h1>Desarrollo de un videojuego RTS y Automatización para el fortalecimiento de la lógica de programación en estudiantes de ingeniería de sistemas</h1>
      <p class="portada-autor">👤 ${MODELO.autor}</p>
      <p class="portada-meta">${MODELO.curso} · ${MODELO.fecha}</p>
      <div class="portada-tags">
        <span>Área DAIS: TIC</span>
        <span>Línea: Desarrollo de Software</span>
        <span>Investigación Tecnológica</span>
      </div>
    </div>`;
})();