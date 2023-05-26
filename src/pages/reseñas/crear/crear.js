import { traerDetallePelicula, crearReseña } from "./crear.api";
import { ImprimirPelicula } from "./crear.components";

const errorContainer = document.getElementById("error-de-extraccion-peliculas");
const moviesCards = document.getElementById("movies-Cards");
const form = document.getElementById("crearForm");

window.addEventListener("DOMContentLoaded", async () => {
  const queryParams = new URLSearchParams(window.location.search);
  let movieId = parseInt(queryParams.get("movieId"));
  if (!queryParams.has("movieId") || isNaN(movieId) || movieId < 1) {
    window.location.href = `/pages/reseñas/reseñas.html?page=1`;
  }

  try {
    const { id, title, overview, posterPath } = await traerDetallePelicula(
      movieId
    );
    const movieList = document.createElement("div");
    movieList.classList.add("col-md-3");
    movieList.innerHTML = ImprimirPelicula({
      id,
      title,
      overview,
      posterPath,
    });
    moviesCards.append(movieList);
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const queryParams = new URLSearchParams(window.location.search);
  let movieId = parseInt(queryParams.get("movieId"));

  const titulo = document.getElementById("titulo").value;
  const contenido = document.getElementById("contenido").value;
  const calificacion = Number(document.getElementById("calificacion").value);

  try {
    const response = await crearReseña(movieId, {
      titulo,
      contenido,
      calificacion,
    });

    const reseñaId = response.data.review.id;
    const reseñaTitulo = response.data.review.titulo_critica;

    alert(`Reseña "${reseñaTitulo}" creada con el exito`);

    window.location.href = `/pages/reseñas/detallereseña.html?reviewId=${reseñaId}`;
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }
});
