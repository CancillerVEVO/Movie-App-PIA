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
      console.log("mostrandose");
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

  // Agregar un controlador de eventos al botón de "Enviar" (solo para mostrar un mensaje en la consola)
  const enviarBtn = document.getElementById("enviarBtn");
  enviarBtn.addEventListener("click", function () {
    console.log("Comentario enviado");
  });

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
        errorContainer.innerHTML = "El comentario no puede estar vacío";
        return;
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
}
export { imprimirFormularioComentario };
