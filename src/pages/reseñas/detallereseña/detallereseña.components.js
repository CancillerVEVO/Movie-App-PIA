import format from "date-fns/format";
function ImprimirReseñas(
  { id, titulo, contenido, calificacion, fechaCreacion, autor },
  posterPath
) {
  const fechaFormateada = format(new Date(fechaCreacion), "MMMM/d/yyyy");
  return `
            <h5 class="card-title mx-3 mt-3">${autor.nombre}</h5>
          <p class="card-text mx-3">Fecha Creacion:  ${fechaFormateada}</p>
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
          <div class="container">
          <div id="formularioComentario" style="display: none">
            <div class="row">
              <div class="col-md-6 mx-auto">
                <div class="form-group">
                  <label for="comentario">Comentario:</label>
                  <textarea class="form-control" id="contenidoInput" rows="2"></textarea>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col text-center">
                <button id="enviarBtn" class="btn btn-success mr-2">Enviar</button>
                <button id="cancelarBtn" class="btn btn-danger">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
          `;
}
function imprimirComentarios({ id, contenido, fechaCreado }, usuario) {
  const fechaFormateada = format(new Date(fechaCreado), "MMMM/d/yyyy");
  return `
    <div class="card-body">
    <h5 class="card-title">${usuario.nombre}</h5>
    <h6 class="card-subtitle mb-2 text-muted">ID de Comentario: ${id}</h6>
    <p class="card-text">Fecha: ${fechaFormateada}</p>
    <p class="card-text">
      ${contenido}
    </p>

    <!-- BOTONES PARA COMENTAR 
    <button id="escribirRespuestaBtn-${id}" class="btn btn-primary">
      Escribir comentario
    </button>-->
    <a href="detallerespuesta.html?commentId=${id}" class="btn btn-primary">Ver respuestas</a>
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
