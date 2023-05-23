import { getListaReseñas } from "./reseñapelicula.api";
import {
  Error,
  ImprimirPeliculas,
  ImprimirReseñas,
} from "./reseñapelicula.components";
import { Pagination } from "../../componentes/Pagination";
import { colorearEstrellas } from "./stars";

window.addEventListener("DOMContentLoaded", async () => {
  const queryParams = new URLSearchParams(window.location.search);
  let currentPage = parseInt(queryParams.get("page")) || 1;

  if (isNaN(currentPage) || currentPage < 1) {
    // REDIRIGIR A LA PÁGINA ACTUAL CON LA PÁGINA 1
    window.location.href = `reseñas.html?page=1`;
  }

  try {
    const response = await getListaReseñas(currentPage);

    const { reviews } = response;

    reviews.forEach((review) => {
      const reseñasList = document.createElement("div");
      reseñasList.classList.add("col-md-3");
      reseñasList.innerHTML = ImprimirReseñas(review);
      reseñasCards.append(reseñasList);
    });
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainerReseña.append(errorHTML);
  }
});

/* const errorContainerPelicula = document.getElementById(
  "error-de-extraccion-peliculas"
);
const moviesCards = document.getElementById("movies-Cards");

async function mostrarPeliculasPop() {
  try {
    const resp = await getListaPeliculasPop();
    const infoPeliculas = resp;
    infoPeliculas.results.forEach((result) => {
      //IMPRIMIR RESULTADOS

      const listMovies = document.createElement("div");
      listMovies.classList.add("col-md-8");
      listMovies.innerHTML = ImprimirPeliculas(result);
      moviesCards.append(listMovies);
    });
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainerPelicula.append(errorHTML);
  }
}

const errorContainerReseña = document.getElementById(
  "error-de-extraccion-reseñas"
);
const reseñasCards = document.getElementById("reviews-Cards");

async function mostrarReseñas() {
  try {
    const resp = await getListaReseñas();
    const infoReseñas = resp.data;

    infoReseñas.reviews.forEach((review) => {
      //IMPRIMIR RESULTADOS
      const listReseñas = document.createElement("div");
      listReseñas.classList.add(
        "col-md-8",
        "border",
        "border-secondary",
        "m-4"
      );
      listReseñas.innerHTML = ImprimirReseñas(review);
      reseñasCards.append(listReseñas);

      // Obtener el valor del atributo "value" y aplicar la función colorearEstrellas
      const estrellasContainerId = `estrellas-reseña-${review.id}`; // Generar un ID único para cada contenedor de estrellas
      const cantidadEstrellas = parseInt(review.calificacion);
      colorearEstrellas(estrellasContainerId, cantidadEstrellas);
    });
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainerReseña.append(errorHTML);
  }
}
mostrarReseñas();
 */
