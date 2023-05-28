import { deleteReseña } from "../../myperfil/me/me.api";

window.addEventListener("DOMContentLoaded", async () => {
  //obtener parametro de la url reviewId
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const reviewId = urlParams.get("reviewId");
  console.log("la id es: ", reviewId);
  //obtoner el boton de borrar reseña
  const btnDelete = document.getElementById("confirmButton");
  btnDelete.addEventListener("click", async () => {
    console.log("click en borrar reseña");
    try {
      const response = await deleteReseña(reviewId);
      console.log("Reseña borrada con exito", response);
      //redirigir a la pagina de mis reseñas
      window.location.href = "../myperfil/myperfil.html";
    } catch (error) {
      console.log(error);
    }
  });
  //obtoner el boton de cancelar
  const btnCancel = document.getElementById("cancelButton");
  btnCancel.addEventListener("click", async () => {
    console.log("click en cancelar");
    window.history.back();
  });
});
