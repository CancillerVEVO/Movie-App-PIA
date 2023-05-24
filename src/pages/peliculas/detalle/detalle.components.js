function ImprimirPeliculas({ id, title, posterPath }) {
  return `<h2>PELICULA:</h2>
    <div class="card movie-card">
    <div class="row">
        <div class="col-md-5 d-flex justify-content-center">
            <img id="posterPathMovies" src="${posterPath}" class="card-img-top m-3" alt="Portada de la película" />
        </div>
        <div class="col-md-7">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <h6>Descripción</h6>
                <p>Descripción de cada película xd</p>
            </div>
        </div>
    </div>
</div>

      `;
}
function ImprimirReseñas({
  id,
  titulo,
  contenido,
  calificacion,
  fechaCreacion,
  autor,
  pelicula,
}) {
  return `<h2>RESEÑAS:</h2>
    <h5 class="card-title mx-3 mt-3">${autor.nombre}</h5>
    <p class="card-text mx-3">Hace ${fechaCreacion}</p>
    <div class="card mb-3 d-flex align-items-center">
        <div class="row g-0">
            <div class="col-md-3">
                <img id="posterPathReseña" src="${pelicula.posterPath}"
                    class="img-fluid rounded-start ml-2 mt-3" alt="${id}" />
            </div>
            <div class="col-md-9">
                <div class="card-body">
  
                    <h4 class="card-subtitle my-3 text-center">
                        ${titulo}
                    </h4>
                    <div id="cal-reseña-${id}" class="d-flex align-items-center">
                        <!-- Selector de estrellas -->
                        <div id="estrellas-reseña-${id}" class="my-3" value="${calificacion}"></div>
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

export { ImprimirReseñas, ImprimirPeliculas, Error };
