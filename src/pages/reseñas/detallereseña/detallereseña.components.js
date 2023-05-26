function ImprimirReseñas(
  { id, titulo, contenido, calificacion, fechaCreacion, autor },
  posterPath
) {
  return `
            <h5 class="card-title mx-3 mt-3">${autor.nombre}</h5>
          <p class="card-text mx-3">Hace ${fechaCreacion}</p>
          <div class="card mb-3 d-flex align-items-center">
            <div class="row g-0">
              <div class="col-md-3">
                <img id="posterPathReseña" src="${posterPath}" class="img-fluid rounded-start ml-2 mt-3"
                  alt="${id}" />
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
                  <div class="d-flex justify-content-end align-items-end">
                    <button class="btn btn-warning">FAVORITOS</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
}
function imprimirComentarios({ id, contenido, fechaCreado }, usuario) {
  return `
    <div class="card-body">
    <h5 class="card-title">${usuario.nombre}</h5>
    <h6 class="card-subtitle mb-2 text-muted">ID de Comentario: ${id}</h6>
    <p class="card-text">Fecha: ${fechaCreado}</p>
    <p class="card-text">
      ${contenido}
    </p>

    <!-- BOTONES PARA COMENTAR 
    <button id="escribirRespuestaBtn-${id}" class="btn btn-primary">
      Escribir comentario
    </button>-->
    <a href="#" class="btn btn-primary">Ver respuestas</a>
    <div id="formulario-respuesta-${id}" class=" mt-4">
      <form>
        <div class="form-group">
          <textarea
            class="form-control"
            rows="3"
            placeholder="Escribe tu respuesta aquí"
          ></textarea>
        </div>
        <button id="enviarRespuestaBtn-${id}" type="submit" class="btn btn-success">
          Enviar comentario
        </button>
        <button
          id="cancelarBtn-${id}"
          type="button"
          class="btn btn-secondary"
        >
          Cancelar
        </button>
      </form>
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

export { Error, ImprimirReseñas, imprimirComentarios };
