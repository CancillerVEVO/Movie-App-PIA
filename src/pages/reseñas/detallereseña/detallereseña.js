function alternarVisibilidadComentarios(boton) {
  var contenedorLorem = document.getElementById("contenedor-lorem");
  if (contenedorLorem.style.display === "none") {
    contenedorLorem.style.display = "block";
    boton.textContent = "OCULTAR COMENTARIOS";
  } else {
    contenedorLorem.style.display = "none";
    boton.textContent = "VER COMENTARIOS";
  }
}

function mostrarFormularioRespuesta() {
  var formularioRespuesta = document.getElementById("formulario-respuesta");
  formularioRespuesta.classList.remove("d-none");
}