import { getListaPeliculasPop } from "./listapeliculas.api";
import { Error, ImprimirPeliculas } from "./listapeliculas.components";

const errorContainer = document.getElementById("error-de-extraccion-peliculas");
const moviesCards = document.getElementById("movies-Cards");

window.addEventListener("DOMContentLoaded", async () => {
  const queryParams = new URLSearchParams(window.location.search);
  let currentPage = parseInt(queryParams.get("page")) || 1;

  if (isNaN(currentPage) || currentPage < 1) {
    // REDIRIGIR A LA PÁGINA ACTUAL CON LA PÁGINA 1
    window.location.href = `listapeliculaspop.html?page=1`;
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

    // Calcular el rango de páginas a mostrar
    const range = calculatePaginationRange(currentPage, totalPages);

    // Crear el componente de paginación con estilo Bootstrap
    const pagination = document.createElement("nav");
    pagination.setAttribute("aria-label", "Page navigation");
    const paginationList = document.createElement("ul");
    paginationList.classList.add("pagination");

    // Botón "Anterior"
    const prevButton = createPaginationButton("Anterior", currentPage > 1);
    paginationList.append(prevButton);

    // Página actual
    const currentPageButton = createPaginationButton(currentPage, false);
    currentPageButton.classList.add("active");
    paginationList.append(currentPageButton);

    // Botón "Siguiente"
    const nextButton = createPaginationButton(
      "Siguiente",
      currentPage < totalPages
    );
    paginationList.append(nextButton);

    pagination.append(paginationList);

    // Agregar el componente de paginación al contenedor deseado
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";
    paginationContainer.append(pagination);

    // Manejar el evento de clic en los botones de paginación
    paginationList.addEventListener("click", async (event) => {
      event.preventDefault();
      if (event.target.tagName === "BUTTON") {
        const buttonValue = event.target.textContent;
        let newPage = currentPage;

        if (buttonValue === "Anterior") {
          newPage = currentPage - 1;
        } else if (buttonValue === "Siguiente") {
          newPage = currentPage + 1;
        }

        if (newPage !== currentPage) {
          queryParams.set("page", newPage);
          history.pushState({}, "", `?${queryParams.toString()}`);

          // Limpiar las películas existentes
          moviesCards.innerHTML = "";

          // Actualizar el estilo del botón de página actual
          currentPageButton.textContent = newPage;
          currentPageButton.classList.add("active");
          currentPageButton.disabled = true;

          // Actualizar visibilidad y estado del botón "Anterior"
          prevButton.disabled = newPage === 1 ? true : false;

          // Obtener las películas de la página seleccionada
          await getMovies(newPage);
          currentPage = newPage;
        }
      }
    });
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

function calculatePaginationRange(currentPage, totalPages) {
  const maxPagesToShow = 5;
  let start = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
  let end = Math.min(start + maxPagesToShow - 1, totalPages);

  if (end - start + 1 < maxPagesToShow) {
    start = Math.max(end - maxPagesToShow + 1, 1);
  }

  return { start, end };
}

function createPaginationButton(text, enabled) {
  const button = document.createElement("button");
  button.classList.add("page-link");
  button.textContent = text;
  button.disabled = !enabled;
  return button;
}
