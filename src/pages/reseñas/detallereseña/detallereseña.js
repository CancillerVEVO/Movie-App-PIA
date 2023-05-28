import { getListaReseñas, getComentarios } from "./detallereseña.api";
import { getFavoritos } from "../../myperfil/misfavoritos/misfavoritos.api";
import {
  Error,
  ImprimirReseñas,
  imprimirComentarios,
} from "./detallereseña.components";
import { colorearEstrellas } from "./detallereseña.stars";
import {
  imprimirFormularioComentario,
  verFormRespuestas,
} from "../comentar/comentar";
import { tr } from "date-fns/locale";

const errorContainer = document.getElementById("error-de-extraccion-reseñas");
const reseñasCards = document.getElementById("reviews-Cards");
const sinComentarios = document.getElementById("sinComentarios");
var impreso = false;

window.addEventListener("DOMContentLoaded", async () => {
  const queryParams = new URLSearchParams(window.location.search);

  let reviewId = parseInt(queryParams.get("reviewId")) || 0;

  if (!queryParams.has("reviewId") || isNaN(reviewId) || reviewId < 1) {
    // REDIRIGIR A LA PÁGINA ACTUAL CON LA PÁGINA 1
    //window.location.href = `reseñas.html`;
  }

  try {
    const response = await getListaReseñas(reviewId);
    const { review, pelicula } = response.data;
    const posterPath = pelicula.posterPath;
    //console.log(review, posterPath);

    //IMPRIMIR RESEÑA
    const reseña = document.createElement("div");
    reseña.classList.add("col-md-10");
    reseña.innerHTML = ImprimirReseñas(review, posterPath);
    reseñasCards.append(reseña);
    imprimirFormularioComentario();
    // Llamar a la función con el valor inicial (true o false)
    const responseFav = await getFavoritos();
    const favorites = responseFav.data.user.favoritos;
    // Obtener las ID de las reseñas
    const reseñasIds = favorites.map((favorito) => favorito.reseña.id);
    console.log("IDs de reviews favoritas", reseñasIds);
    // Determinar si la reseña actual es favorita
    const isFavorite = reseñasIds.includes(reviewId);
    console.log("ES FAVORITO:", isFavorite);
    botonFavorito(isFavorite);

    // Obtener el valor del atributo "value" y aplicar la función colorearEstrellas
    const estrellasContainerId = `estrellas-reseña-${review.id}`; // Generar un ID único para cada contenedor de estrellas
    const cantidadEstrellas = parseInt(review.calificacion);
    colorearEstrellas(estrellasContainerId, cantidadEstrellas);
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }

  // Obtenemos referencias a los elementos necesarios
  const verComentariosBtn = document.getElementById("verComentariosBtn");
  const contenedorComentarios = document.getElementById(
    "contenedor-comentarios"
  );

  // Agregamos un evento clic al botón "Ver comentarios"
  verComentariosBtn.addEventListener("click", async function (event) {
    event.preventDefault(); // Evita que el enlace se siga al href

    // Si el contenedor de comentarios está visible
    if (contenedorComentarios.style.display === "block") {
      contenedorComentarios.style.display = "none"; // Oculta el contenedor
      verComentariosBtn.textContent = "Ver comentarios"; // Cambia el texto del botón
    } else {
      contenedorComentarios.style.display = "block"; // Muestra el contenedor
      verComentariosBtn.textContent = "Ocultar comentarios"; // Cambia el texto del botón
      if (impreso === false) {
        try {
          const comentariosCards = document.getElementById("card-comentarios");
          //IMPRIMIR COMENTARIOS
          const responseComents = await getComentarios(reviewId);
          const { comentarios, totalResults } = responseComents.data;
          //  console.log("responseComents.data", comentarios, totalResults);
          const dataComents = comentarios.comentarios;

          dataComents.forEach((comentario) => {
            //IMPRIMIR RESULTADOS
            const listComents = document.createElement("div");
            listComents.classList.add("card", "mb-3", "m-4");
            listComents.innerHTML = imprimirComentarios(
              comentario,
              comentario.usuario
            );
            comentariosCards.append(listComents);
          });
          //AQUI IRA LA FUNCION DE ABIR RESPUESTAS
          verFormRespuestas();
          const exito = document.createElement("div");
          exito.innerHTML = `<div class="alert alert-success text-center" role="alert">
            RESULTADOS MOSTRADOS EXITOSAMENTE!
          </div>`;
          comentariosCards.prepend(exito);
        } catch (error) {
          const errorHTML = document.createElement("div");
          errorHTML.innerHTML = `<div class="alert alert-warning text-center" role="alert">
            No hay comentarios para mostrar!
          </div>`;
          sinComentarios.append(errorHTML);
        }
        impreso = true;
      }
    }
  });
});
//botoon de favoritos
function botonFavorito(esFavoritoInicial) {
  // Obtener referencia al botón de favoritos
  const favoritosBtn = document.getElementById("favoritosBtn");
  // Variable para almacenar el estado actual de favorito (true/false)
  let esFavorito = esFavoritoInicial;

  // Función para actualizar el estilo del botón según el estado de favorito
  function actualizarEstilo() {
    if (esFavorito) {
      favoritosBtn.classList.remove("btn-outline-warning");
      favoritosBtn.classList.add("btn-warning");
    } else {
      favoritosBtn.classList.remove("btn-warning");
      favoritosBtn.classList.add("btn-outline-warning");
    }
  }

  // Función para alternar el estado de favorito
  function toggleFavorito() {
    esFavorito = !esFavorito; // Cambiar el valor a su opuesto
    actualizarEstilo();
    // Aquí puedes realizar otras acciones según el estado de favorito
  }

  // Llamar a la función de actualización inicialmente para establecer el estilo
  actualizarEstilo();

  // Agregar el evento de clic al botón de favoritos
  favoritosBtn.addEventListener("click", toggleFavorito);
}
