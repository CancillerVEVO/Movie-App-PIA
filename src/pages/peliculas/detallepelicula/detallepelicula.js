import { Pagination } from "../../componentes/Pagination";
import { getListReseñasPelicula } from "./detallepelicula.api";
import {
  Error,
  ImprimirPelicula,
  ImprimirReseñas,
} from "./detallepelicula.components";
import { colorearEstrellas } from "./detallepelicula.stars";

const errorContainer = document.getElementById("error-de-extraccion-peliculas");
const moviesCards = document.getElementById("movies-Cards");
const reseñasCards = document.getElementById("reviews-Cards");

window.addEventListener("DOMContentLoaded", async () => {
  const queryParams = new URLSearchParams(window.location.search);
  let currentPage = parseInt(queryParams.get("page")) || 1;
  let idMovie = parseInt(queryParams.get("movieId"));

  if (!queryParams.has("page") || isNaN(currentPage) || currentPage < 1) {
    // REDIRIGIR A LA PÁGINA ACTUAL CON LA PÁGINA 1
    window.location.href = `peliculas.html?page=1`;
  }

  try {
    const response = await getListReseñasPelicula(idMovie, currentPage);
    const { totalPages, data } = response;
    const movideData = data.pelicula;
    const reviews = data.reviews;
    const posterPath = movideData.posterPath;
    console.log(posterPath);

    //IMPRIMIR PELICULAA
    const movie = document.createElement("div");
    movie.classList.add("col-md-10");
    movie.innerHTML = ImprimirPelicula(movideData);
    moviesCards.append(movie);

    //IMPRIMIR RESEÑAS
    reviews.forEach((review) => {
      //IMPRIMIR RESULTADOS
      const listReseñas = document.createElement("div");
      listReseñas.classList.add("col-md-8");
      listReseñas.innerHTML = ImprimirReseñas(review, posterPath);
      reseñasCards.append(listReseñas);

      // Obtener el valor del atributo "value" y aplicar la función colorearEstrellas
      const estrellasContainerId = `estrellas-reseña-${review.id}`; // Generar un ID único para cada contenedor de estrellas
      const cantidadEstrellas = parseInt(review.calificacion);
      colorearEstrellas(estrellasContainerId, cantidadEstrellas);

      const pagination = new Pagination(
        "pagination-container",
        totalPages,
        currentPage
      );
      pagination.onChangePage = async (newPage) => {
        queryParams.set("page", newPage);
        history.pushState({}, "", `?${queryParams.toString()}`);

        // Limpiar las películas existentes
        reseñasCards.innerHTML = "";

        // Obtener las películas de la página seleccionada
        await getReviews(newPage);
        currentPage = newPage;

        // Renderizar el componente de paginación nuevamente
        pagination.currentPage = currentPage;
        pagination.render();
      };

      // Renderizar el componente de paginación
      pagination.render();
    });
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }
});
