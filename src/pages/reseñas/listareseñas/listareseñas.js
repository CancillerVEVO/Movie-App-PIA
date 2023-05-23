import { getListaReseñas } from "./listareseñas.api";
import { Error, ImprimirReseñas } from "./listareseña.components";
import { colorearEstrellas } from "./stars";
import { Pagination } from "../../componentes/Pagination";

const errorContainer = document.getElementById("error-de-extraccion-reseñas");
const reseñasCards = document.getElementById("reviews-Cards");

window.addEventListener("DOMContentLoaded", async () => {
  const queryParams = new URLSearchParams(window.location.search);

  let currentPage = parseInt(queryParams.get("page")) || 1;

  if (isNaN(currentPage) || currentPage < 1) {
    // REDIRIGIR A LA PÁGINA ACTUAL CON LA PÁGINA 1
    window.location.href = `listareseñas.html?page=1`;
  }

  try {
    const response = await getListaReseñas(currentPage);
    const { reviews, totalPages } = response.data;

    reviews.forEach((review) => {
      //IMPRIMIR RESULTADOS
      const listReseñas = document.createElement("div");
      listReseñas.classList.add(
        "col-md-11",
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

async function getReviews(page) {
  try {
    const response = await getListaReseñas(page);
    const { reviews } = response.data;

    reviews.forEach((review) => {
      const reviewList = document.createElement("div");
      reviewList.classList.add(
        "col-md-11",
        "border",
        "border-secondary",
        "m-4"
      );
      reviewList.innerHTML = ImprimirReseñas(review);
      reseñasCards.append(reviewList);

      const estrellasContainerId = `estrellas-reseña-${review.id}`; // Generar un ID único para cada contenedor de estrellas
      const cantidadEstrellas = parseInt(review.calificacion);
      colorearEstrellas(estrellasContainerId, cantidadEstrellas);
    });
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }
}
