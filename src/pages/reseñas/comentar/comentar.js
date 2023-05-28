import { comentarReseña } from "./comentar.api";

function imprimirFormularioComentario() {
  // Obtener el botón de "COMENTAR" y el formulario de comentarios
  const comentarBtn = document.getElementById("comentarBtn");
  const formularioComentario = document.getElementById("formularioComentario");

  // Agregar un controlador de eventos al botón de "COMENTAR"
  comentarBtn.addEventListener("click", function () {
    // Mostrar u ocultar el formulario de comentarios
    if (formularioComentario.style.display === "none") {
      formularioComentario.style.display = "block";
      accionComentarios();
    } else {
      formularioComentario.style.display = "none";
    }
  });

  // Agregar un controlador de eventos al botón de "Cancelar"
  const cancelarBtn = document.getElementById("cancelarBtn");
  cancelarBtn.addEventListener("click", function () {
    // Ocultar el formulario de comentarios al hacer clic en "Cancelar"
    formularioComentario.style.display = "none";
  });
}
function accionComentarios() {
  // Obtener el ID de la reseña de la URL
  const queryParams = new URLSearchParams(window.location.search);
  const reviewId = parseInt(queryParams.get("reviewId"));

  // Si no se ha especificado el ID de la reseña, redirigir a la página de reseñas
  if (!queryParams.has("reviewId") || isNaN(reviewId) || reviewId < 1) {
    window.location.href = `reseñas.html`;
  }

  // Obtener referencias a los elementos del DOM
  const padreIdInput = document.getElementById("padreIdInput");
  const contenidoInput = document.getElementById("contenidoInput");
  const enviarBtn = document.getElementById("enviarBtn");
  const errorContainer = document.getElementById("errorContainer");

  // Agregar un evento clic al botón "Enviar"
  enviarBtn.addEventListener("click", async function (event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtener los valores de los campos del formulario
    // Obtener los valores de los campos del formulario
    let comentarioPadreId;
    if (!padreIdInput) {
      comentarioPadreId = null;
    } else {
      comentarioPadreId = parseInt(padreIdInput.value);
    }
    const contenido = contenidoInput.value;

    // Validar los datos del formulario
    if (contenido.length < 1) {
      errorContainer.innerHTML = `<div class="alert alert-danger text-center" role="alert">
            ¡El comentario no puede estar vacío!
          </div>;`;
      return;
    } else {
      errorContainer.innerHTML = `<div class="alert alert-success text-center" role="alert">
            ¡Comentario agregado correctamente!
          </div>`;
    }

    console.log("EL CONTENIDO ESCRITO ES: ", contenido);
    console.log("EL PADREID ESCRITO ES: ", comentarioPadreId);
    console.log("EL REVIEWID ESCRITO ES: ", reviewId);

    // Llamar a la API para comentar la reseña
    try {
      await comentarReseña(reviewId, comentarioPadreId, contenido);
      window.location.reload(); // Recargar la página
    } catch (error) {
      errorContainer.innerHTML = error.message;
    }
  });
}
function verFormRespuestas() {
  //Obtener el boton de "RESPONDER" y para ver formulario de respuesta
  const botonesResponder = document.querySelectorAll(".responderBtn");

  botonesResponder.forEach((boton) => {
    boton.addEventListener("click", function () {
      const idComentario = boton.value;
      const formularioRespuesta = document.getElementById(
        "formulario-respuesta" + idComentario
      );
      // Mostrar u ocultar el formulario de comentarios
      if (formularioRespuesta.style.display === "none") {
        formularioRespuesta.style.display = "block";
        const enviarBtnRespuesta = document.getElementById(
          "enviarBtnRespuesta" + idComentario
        );
        const respuestaInput = document.getElementById(
          "respuestaInput" + idComentario
        );
        enviarBtnRespuesta.addEventListener("click", async function (event) {
          event.preventDefault(); // Evita que el formulario se envíe

          const contenido = respuestaInput.value;
          const comentarioPadreId = idComentario;
          //console.log("respuestaInput", contenido, comentarioPadreId);
          accionRespuesta(contenido, comentarioPadreId);
        });
      } else {
        formularioRespuesta.style.display = "none";
      }

      // Agregar un controlador de eventos al botón de "Cancelar"
      const cancelarBtn = document.getElementById(
        "cancelarBtnRespuesta" + idComentario
      );
      cancelarBtn.addEventListener("click", function () {
        // Ocultar el formulario de comentarios al hacer clic en "Cancelar"
        formularioRespuesta.style.display = "none";
      });
    });
  });
}

async function accionRespuesta(contenido, comentarioPadreId) {
  // Obtener el ID de la reseña de la URL
  const queryParams = new URLSearchParams(window.location.search);
  const reviewId = parseInt(queryParams.get("reviewId"));

  // Si no se ha especificado el ID de la reseña, redirigir a la página de reseñas
  if (!queryParams.has("reviewId") || isNaN(reviewId) || reviewId < 1) {
    window.location.href = `reseñas.html`;
  }

  // Validar los datos del formulario
  if (contenido.length < 1) {
    alert("¡La respuesta no puede estar vacío!");
    return;
  } else {
    alert("¡respuesta agregada correctamente!");
  }

  console.log("EL CONTENIDO ESCRITO ES: ", contenido);
  console.log("EL PADREID ESCRITO ES: ", parseInt(comentarioPadreId));
  console.log("EL REVIEWID ESCRITO ES: ", reviewId);

  // Llamar a la API para comentar la reseña
  try {
    await comentarReseña(reviewId, parseInt(comentarioPadreId), contenido);
    window.location.reload(); // Recargar la página
  } catch (error) {
    alert(error.message);
  }
}
export { imprimirFormularioComentario, verFormRespuestas };
