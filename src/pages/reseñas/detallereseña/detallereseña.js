import { getListaReseñas } from "./detallereseña.api";
import { Error, ImprimirReseñas } from "./detallereseña.components";
import { colorearEstrellas } from "./detallereseña.stars";
//import { Pagination } from "../../componentes/Pagination";

const errorContainer = document.getElementById("error-de-extraccion-reseñas");
const reseñasCards = document.getElementById("reviews-Cards");

window.addEventListener("DOMContentLoaded", async () => {
  const queryParams = new URLSearchParams(window.location.search);

  let reviewId = parseInt(queryParams.get("reviewId")) || 0;

  if (!queryParams.has("reviewId") || isNaN(reviewId) || reviewId < 1) {
    // REDIRIGIR A LA PÁGINA ACTUAL CON LA PÁGINA 1
    window.location.href = `reseñas.html`;
  }

  try {
    const response = await getListaReseñas(reviewId);
    const { review, pelicula } = response.data;
    const posterPath = pelicula.posterPath;
    console.log(review, posterPath);

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
});

document.getElementById("comentarBtn").addEventListener("click", () => {
  alternarVisibilidadComentarios();
});

document.getElementById("vercomentsBtn").addEventListener("click", () => {
  mostrarFormularioRespuesta();
});

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
