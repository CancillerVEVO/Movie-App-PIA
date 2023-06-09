import { Pagination } from "../../componentes/Pagination";
import { searchPelicula } from "./buscarpelicula.api";
import { Error, ImprimirPeliculas } from "./buscarpelicula.components";

const errorContainer = document.getElementById("error-de-extraccion-peliculas");
const moviesCards = document.getElementById("movies-Cards");

window.addEventListener("DOMContentLoaded", async () => {
  const queryParams = new URLSearchParams(window.location.search);
  let currentPage = parseInt(queryParams.get("page")) || 1;
  let searchQuery = String(queryParams.get("name"));

  if (
    !queryParams.has("page") ||
    isNaN(currentPage) ||
    currentPage < 1 ||
    !queryParams.has("name")
  ) {
    // REDIRIGIR A LA PÁGINA ACTUAL CON LA PÁGINA 1
    window.location.href = `buscarpelicula.html?page=1&name=a`;
  }

  try {
    const response = await searchPelicula(currentPage, searchQuery);
    const { totalPages, results } = response;

    if (results.length === 0) {
      errorContainer.innerHTML =
        '<h1 class="text-center p-5">No se encontraron resultados</h1>';
      return;
    }

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
      await getMovies(newPage, searchQuery);
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

async function getMovies(page, searchQuery) {
  try {
    const response = await searchPelicula(page, searchQuery);
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
