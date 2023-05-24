import {
  Error,
  ImprimirPeliculas,
  ImprimirReseñas,
} from "./detalle.components";
import { Pagination } from "../../componentes/Pagination";
import { colorearEstrellas } from "./stars";
import { getListDetalle } from "./detalle.api";

const errorContainerReseña = document.getElementById("error-container");

window.addEventListener("DOMContentLoaded", async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const movieId = Number(queryParams.get("movieId"));
  let currentPage = parseInt(queryParams.get("page"));

  console.log(movieId);
  console.log(currentPage);

  try {
    const response = await getListDetalle(movieId, currentPage);

    console.log(response);
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainerReseña.append(errorHTML);
  }
});
