import format from "date-fns/format";

function imprimirComentario({ id, contenido, fechaCreado, usuario }) {
  const fechaFormateada = format(new Date(fechaCreado), "MMMM/d/yyyy");
  return `
      <div class="col-md-7 text-center">
        <div class="card text-white bg-dark mb-3 m-4">
          <div id="fecha-creado" class="card-header">
            Fecha: ${fechaFormateada}
          </div>
          <div class="card-body">
            <h5 id="comentario-nombre" class="card-title text-left">
              @${usuario.nombre}
            </h5>
            <p id="comentario-contenido" class="card-text">${contenido}</p>
          </div>
        </div>
      </div>
    `;
}

function imprimirRespuestas({ contenido, fechaCreado, usuario }) {
  const fechaFormateada = format(new Date(fechaCreado), "dd/MM/yyyy");
  return ` <div class="col-md-5 my-3 text-center">
    <div class="card border-dark">
      <div class="card-header">Fecha: ${fechaFormateada}</div>
      <!--DATOS-->
      <div class="card-body text-dark">
        <h5 class="card-title text-left">@${usuario.nombre}</h5>
        <p class="card-text">${contenido}</p>
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

export { imprimirComentario, imprimirRespuestas, Error };
