import { Pagination } from "../../componentes/Pagination";
import { getListaPeliculasPop } from "./listapeliculas.api";
import { Error, ImprimirPeliculas } from "./listapeliculas.components";

const errorContainer = document.getElementById("error-de-extraccion-peliculas");
const moviesCards = document.getElementById("movies-Cards");

window.addEventListener("DOMContentLoaded", async () => {
  const queryParams = new URLSearchParams(window.location.search);
  let currentPage = parseInt(queryParams.get("page")) || 1;

  if (!queryParams.has("page") || isNaN(currentPage) || currentPage < 1) {
    // REDIRIGIR A LA PÁGINA ACTUAL CON LA PÁGINA 1
    window.location.href = `peliculas.html?page=1`;
  }

  try {
    const response = await getListaPeliculasPop(currentPage);
    const { totalPages, results } = response;

    results.forEach((result) => {
      const movieList = document.createElement("div");
      movieList.classList.add("col-md-3");
      movieList.innerHTML = ImprimirPeliculas(result);
      moviesCards.append(movieList);
    });

    // Crear el componente de paginación
    const pagination = new Pagination(
      "pagination-container",
      totalPages,
      currentPage
    );
    pagination.onChangePage = async (newPage) => {
      queryParams.set("page", newPage);
      history.pushState({}, "", `?${queryParams.toString()}`);

      // Limpiar las películas existentes
      moviesCards.innerHTML = "";

      // Obtener las películas de la página seleccionada
      await getMovies(newPage);
      currentPage = newPage;

      // Renderizar el componente de paginación nuevamente
      pagination.currentPage = currentPage;
      pagination.render();
    };

    // Renderizar el componente de paginación
    pagination.render();
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }
});

async function getMovies(page) {
  try {
    const response = await getListaPeliculasPop(page);
    const { results } = response;

    results.forEach((result) => {
      const movieList = document.createElement("div");
      movieList.classList.add("col-md-3");
      movieList.innerHTML = ImprimirPeliculas(result);
      moviesCards.append(movieList);
    });
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }
}
