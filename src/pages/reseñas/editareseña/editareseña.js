import { updateReseña, getReseña } from "./editareseña.api";

window.addEventListener("DOMContentLoaded", async () => {
  // Obtener el id de la reseña de la URL
  const queryParams = new URLSearchParams(window.location.search);
  let reviewId = parseInt(queryParams.get("reviewId"));
  //obtener reseña
  const response = await getReseña(reviewId);
  const { review } = response.data;

  console.log(review);
  //improsion de datos
  const tituloInput = document.getElementById("titulo");
  tituloInput.value = review.titulo;
  const contenidoInput = document.getElementById("contenido");
  contenidoInput.value = review.contenido;
  const calificacionInput = document.getElementById("calificacion");
  calificacionInput.value = review.calificacion;
  //obtencion de nuevos datos en formulario
  const editarForm = document.getElementById("editarForm");
  editarForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const titulo = tituloInput.value;
    const contenido = contenidoInput.value;
    const calificacionValor = calificacionInput.value;
    const calificacion = parseInt(calificacionValor);
    console.log(titulo, contenido, calificacion, reviewId);
    try {
      await updateReseña(reviewId, { titulo, contenido, calificacion });
      // Mostrar mensaje de éxito
      alert("Reseña actualizada correctamente");
      // Redirigir a la página de detalle de la reseña
      window.location.href = `detallereseña.html?reviewId=${reviewId}`;
    } catch (error) {
      console.error(error);
    }
  });
});
