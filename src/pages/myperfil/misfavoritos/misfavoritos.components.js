import format from "date-fns/format";
function ImprimirReseñas(
  { id, titulo, contenido, calificacion, fechaCreacion, autor },
  posterPath
) {
  const fechaFormateada = format(new Date(fechaCreacion), "MMMM/d/yyyy");
  return `
            <h5 class="card-title mx-3 mt-3">${autor.nombre}</h5>
          <p class="card-text mx-3">FECHA: ${fechaFormateada}</p>
          <div class="card mb-3 d-flex align-items-center">
            <div class="row g-0">
              <div class="col-md-3">
                <img id="posterPathReseña" src="${posterPath}" class="img-fluid rounded-start m-4"
                  alt="${id}" style='width: 50%'/>
              </div>
              <div class="col-md-9">
                <div class="card-body">
  
                  <h4 class="card-subtitle my-3 text-center">
                    ${titulo}
                  </h4>
                  <div id="cal-reseña-${id}" class="d-flex align-items-center">
                    <div id="estrellas-reseña-${id}" class="my-3" value="${calificacion}"></div>
                  </div>
                  <p class="card-text text-justify">${contenido}</p>
                  <button class="btn btn-dark d-block mx-auto" onclick="location.href='../reseñas/detallereseña.html?reviewId=${id}'">
                    VER RESEÑA
                  </button>
                </div>
              </div>
            </div>
          </div>
          `;
}
function Error(message) {
  return `
              <h4>ERROR</h4>
                <p>${message}</p>
            `;
}
export { Error, ImprimirReseñas };
