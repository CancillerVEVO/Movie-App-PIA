import { getListaPeliculasPop } from "./listapeliculas.api";
import { Error, ImprimirPeliculas } from "./listapeliculas.components";

const errorContainer = document.getElementById("error-de-extraccion-peliculas");
const moviesCards = document.getElementById("movies-Cards");

window.addEventListener("DOMContentLoaded", async () => {
  const queryParams = new URLSearchParams(window.location.search);

  const page = queryParams.get("page") || 1;

  try {
    const response = await getListaPeliculasPop(page);
    const { totalPages, results } = response;

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
});
