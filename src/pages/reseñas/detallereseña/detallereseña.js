function ocultarBotonMostrarContenido(boton) {
    boton.style.display = "none";
    var contenedorLorem = document.getElementById("contenedor-lorem");
    contenedorLorem.classList.remove("d-none");
  }

  function mostrarFormularioRespuesta() {
    var formularioRespuesta = document.getElementById("formulario-respuesta");
    formularioRespuesta.classList.remove("d-none");
  }