import { getComentResp } from "./detallerespuesta.api";
import {
  Error,
  imprimirRespuestas,
  imprimirComentario,
} from "./detallerespuesta.components";

const containerComentarios = document.getElementById("card-comentarios");
const containerRespuestas = document.getElementById("container-respuestas");
window.addEventListener("DOMContentLoaded", async () => {
  const queryParams = new URLSearchParams(window.location.search);
  let commentId = parseInt(queryParams.get("commentId")) || 0;
  //IMpresion de comentarios
  try {
    const response = await getComentResp(commentId);
    const comentario = response.data;
    const dataComentario = comentario.comentario;
    //const { id, contenido, fechaCreado, usuario } = dataComentario;
    //IMPRESION DE COMENTARIOS
    const comentarioHTML = document.createElement("div");
    comentarioHTML.classList.add("row", "justify-content-center");
    comentarioHTML.innerHTML = imprimirComentario(dataComentario);
    containerComentarios.append(comentarioHTML);
    //IMPRESION DE RESPUESTAS
    const dataRespuestas = dataComentario.hijos;
    console.log("RESPUESTAS:", dataRespuestas);
    if (dataRespuestas.length > 0) {
      dataRespuestas.forEach((respuesta) => {
        const respuestaHTML = document.createElement("div");
        respuestaHTML.classList.add("row", "justify-content-center");
        console.log("RESPUESTA", respuesta);
        respuestaHTML.innerHTML = imprimirRespuestas(respuesta);
        containerRespuestas.append(respuestaHTML);
      });
    } else {
      console.log("No se encontraron respuestas. No se ejecutará la lógica.");
      const sinRespuestasHTML = document.createElement("div");
      sinRespuestasHTML.innerHTML = `<div class="alert alert-danger text-center" role="alert">
      NO HAY RESPUESTAS A ESTE COMENTARIO
    </div>`;
      containerRespuestas.append(sinRespuestasHTML);
    }
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    containerComentarios.append(errorHTML);
  }
});
