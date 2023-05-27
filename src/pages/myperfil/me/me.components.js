function componentMe({ id, nombre, biografia }) {
  if (!biografia) biografia = "No hay biografía disponible";
  return `
        <div class="card border">
        <div class="card-header">
            Mi Perfil
            <button class="btn btn-primary float-right" onclick="location.href='?id=${id}'">
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

function misReseñas({ id, titulo, contenido, calificacion }) {
  return ` <div class="card mb-7 my-5 d-flex align-items-center">
    <div class="row g-0">
      <div class="col-md-3">
        <img
          id="posterPathReseña"
          src="https://image.tmdb.org/t/p/original/n4SexGGQzI26E269tfpa80MZaGV.jpg"
          class="img-fluid rounded-start m-3"
          alt="${id}"
          style="width: 70%"
        />
      </div>
      <div class="col-md-9">
        <div class="card-body">
          <div class="d-flex justify-content-end mb-3">
            <button class="btn btn-outline-danger me-2">
              <i class="bi bi-trash-fill"></i>
            </button>
            <button class="btn btn-outline-primary">
              <i class="bi bi-pencil-fill"></i>
            </button>
          </div>
          <h4 class="card-subtitle my-3 text-center">${titulo}</h4>
          <p class="card-text text-justify">${contenido}</p>
        </div>
      </div>
    </div>
  </div>`;
}
function Error(message) {
  return `
            <h4>ERROR</h4>
              <p>${message}</p>
          `;
}
export { Error, componentMe, misReseñas };
