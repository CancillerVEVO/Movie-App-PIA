import format from "date-fns/format";
function componentMe({ id, nombre, biografia }) {
  if (!biografia) biografia = "No hay biografía disponible";
  return `
        <div class="card border">
        <div class="card-header">
            Mi Perfil
            <button class="btn btn-outline-secondary float-right" onclick="location.href='?id=${id}'">
            <i class="bi bi-gear-fill"></i> Configuración de Perfil
            </button>
        </div>
        <div class="card-body">
            <h5 class="card-title my-2">@${nombre}</h5>
            <h6 class="card-subtitle mt-4">Biografía del usuario</h6>
            <p class="card-text text-center mt-2">${biografia}</p>
        </div>
        </div>
          `;
}

function misReseñas({ id, titulo, contenido, pelicula }) {
  return ` <div class="card mb-7 my-2 d-flex align-items-center">
    <div class="row g-0">
      <div class="col-md-3">
        <img
          id="posterPathReseña"
          src="${pelicula.posterPath}"
          class="img-fluid rounded-start m-3"
          alt="${id}"
          style="width: 70%"
        />
      </div>
      <div class="col-md-9">
        <div class="card-body">
          <div class="d-flex justify-content-end mb-3">
            <button id="btnDelete" class="btn btn-outline-danger me-2" onclick="window.location.href='../reseñas/borrareseña.html?reviewId=${id}'">
              <i class="bi bi-trash-fill"></i>
              Borrar
            </button>
            <button id="btnUpdate" class="btn btn-outline-primary" onclick="window.location.href=../reseñas/editareseña.html?reviewId=${id}'">
            <i class="bi bi-pencil-fill"></i>
            Editar
            </button>
          </div>
          <h4 class="card-subtitle my-3 text-center">${titulo}</h4>
          <p class="card-text text-justify">${contenido}</p>
        </div>
      </div>
    </div>
  </div>`;
}
function ImprimirFavoritos(
  { id, titulo, contenido, calificacion, fechaCreacion, autor },
  posterPath
) {
  const fechaFormateada = format(new Date(fechaCreacion), "MMMM/d/yyyy");
  return `
        <div class="card mb-3 d-flex align-items-center">
        <h5 class="card-title mx-3 mt-3">${autor.nombre}</h5>
        <p class="card-text mx-3">Fecha Creacion: ${fechaFormateada}</p>
        <div class="row g-0">
            <div class="col-md-3">
            <img
                id="posterPathReseña"
                src="${posterPath}"
                class="img-fluid rounded-start ml-2 mt-3"
                alt="${id}"
            />
            </div>
            <div class="col-md-9">
            <div class="card-body">
                <h6 class="card-subtitle my-3 text-center">${titulo}</h4>
                <div
                id="cal-reseña-${id}"
                class="d-flex align-items-center"
                >
                <div
                    id="estrellas-reseña-${id}"
                    class="my-3"
                    value="${calificacion}"
                ></div>
                </div>
                <p class="card-text text-justify">${contenido}</p>
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
export { Error, componentMe, misReseñas, ImprimirFavoritos };
