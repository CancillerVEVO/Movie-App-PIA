function imprimirComentario({ id, contenido, fechaCreado, usuario }) {
  // Crear una instancia de Date utilizando la fechaCreado
  const fecha = new Date(fechaCreado);

  // Obtener los componentes de la fecha y hora
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
  const anio = fecha.getFullYear();
  const horas = fecha.getHours();
  const minutos = fecha.getMinutes();

  // Formatear la fecha y hora como "dd/mm/yyyy HH:MM"
  const fechaFormateada = `${dia < 10 ? "0" + dia : dia}/${
    mes < 10 ? "0" + mes : mes
  }/${anio} ${horas < 10 ? "0" + horas : horas}:${
    minutos < 10 ? "0" + minutos : minutos
  }`;

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
  // Crear una instancia de Date utilizando la fechaCreado
  const fecha = new Date(fechaCreado);

  // Obtener los componentes de la fecha y hora
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
  const anio = fecha.getFullYear();
  const horas = fecha.getHours();
  const minutos = fecha.getMinutes();

  // Formatear la fecha y hora como "dd/mm/yyyy HH:MM"
  const fechaFormateada = `${dia < 10 ? "0" + dia : dia}/${
    mes < 10 ? "0" + mes : mes
  }/${anio} ${horas < 10 ? "0" + horas : horas}:${
    minutos < 10 ? "0" + minutos : minutos
  }`;
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
