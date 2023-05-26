import { getListaReseñas, getComentarios } from "./detallereseña.api";
import {
  Error,
  ImprimirReseñas,
  imprimirComentarios,
} from "./detallereseña.components";
import { colorearEstrellas } from "./detallereseña.stars";
//import { Pagination } from "../../componentes/Pagination";

const errorContainer = document.getElementById("error-de-extraccion-reseñas");
const reseñasCards = document.getElementById("reviews-Cards");

window.addEventListener("DOMContentLoaded", async () => {
  const queryParams = new URLSearchParams(window.location.search);

  let reviewId = parseInt(queryParams.get("reviewId")) || 0;

  if (!queryParams.has("reviewId") || isNaN(reviewId) || reviewId < 1) {
    // REDIRIGIR A LA PÁGINA ACTUAL CON LA PÁGINA 1
    //window.location.href = `reseñas.html`;
  }

  try {
    const response = await getListaReseñas(reviewId);
    const { review, pelicula } = response.data;
    const posterPath = pelicula.posterPath;
    //console.log(review, posterPath);

    //IMPRIMIR RESEÑA
    const reseña = document.createElement("div");
    reseña.classList.add("col-md-10");
    reseña.innerHTML = ImprimirReseñas(review, posterPath);
    reseñasCards.append(reseña);

    // Obtener el valor del atributo "value" y aplicar la función colorearEstrellas
    const estrellasContainerId = `estrellas-reseña-${review.id}`; // Generar un ID único para cada contenedor de estrellas
    const cantidadEstrellas = parseInt(review.calificacion);
    colorearEstrellas(estrellasContainerId, cantidadEstrellas);
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }
  try {
    const comentariosCards = document.getElementById("card-comentarios");
    //IMPRIMIR COMENTARIOS
    const responseComents = await getComentarios(reviewId);
    const { comentarios, totalResults } = responseComents.data;
    console.log("responseComents.data", comentarios, totalResults);
    const dataComents = comentarios.comentarios;
    dataComents.forEach((comentario) => {
      //IMPRIMIR RESULTADOS
      const listComents = document.createElement("div");
      listComents.classList.add("card", "mb-3", "m-4");
      listComents.innerHTML = imprimirComentarios(
        comentario,
        comentario.usuario
      );
      comentariosCards.append(listComents);
    });
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }
});
// Obtenemos referencias a los elementos necesarios
const verComentariosBtn = document.getElementById("verComentariosBtn");
const contenedorComentarios = document.getElementById("contenedor-comentarios");

// Agregamos un evento clic al botón "Ver comentarios"
verComentariosBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Evita que el enlace se siga al href

  // Si el contenedor de comentarios está visible
  if (contenedorComentarios.style.display === "block") {
    contenedorComentarios.style.display = "none"; // Oculta el contenedor
    verComentariosBtn.textContent = "Ver comentarios"; // Cambia el texto del botón
  } else {
    contenedorComentarios.style.display = "block"; // Muestra el contenedor
    verComentariosBtn.textContent = "Ocultar comentarios"; // Cambia el texto del botón
  }
});
// Obtenemos referencias al botón y al formulario de respuesta
const escribirRespuestaBtn = document.getElementById("escribirRespuestaBtn");
const formularioRespuesta = document.getElementById("formulario-respuesta");

// Agregamos un evento clic al botón "Escribir respuesta"
escribirRespuestaBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Evita el comportamiento por defecto del botón
  formularioRespuesta.classList.remove("d-none"); // Muestra el formulario de respuesta
  // Obtenemos una referencia al botón "Cancelar"
  const cancelarBtn = document.getElementById("cancelarBtn");

  // Agregamos un evento clic al botón "Cancelar"
  cancelarBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Evita el comportamiento por defecto del botón
    formularioRespuesta.classList.add("d-none"); // Oculta el formulario de respuesta
  });
});
