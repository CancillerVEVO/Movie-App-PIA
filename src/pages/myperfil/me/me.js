import { getMyperfil, getFavoritos } from "./me.api";
import {
  Error,
  componentMe,
  misReseñas,
  ImprimirFavoritos,
} from "./me.components";

window.addEventListener("DOMContentLoaded", async () => {
  const errorContainer = document.getElementById("error-de-extraccion-perfil");
  const perfilContainer = document.getElementById("perfil-container");
  const reviewsCards = document.getElementById("reviews-Cards");

  try {
    const response = await getMyperfil();
    const { user } = response.data;
    //console.log(user);

    const perfil = document.createElement("div");
    perfil.classList.add("col-md-12", "my-3");
    perfil.innerHTML = componentMe(user);
    perfilContainer.append(perfil);

    //Imrpimir mis reseñas.
    user.reviews.forEach((review) => {
      const misresñas = document.createElement("div");
      misresñas.classList.add("row", "my-1");
      misresñas.innerHTML = misReseñas(review);
      reviewsCards.append(misresñas);
    });
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  const errorContainer = document.getElementById(
    "error-de-extraccion-favoritos"
  );
  const favoritosCards = document.getElementById("favoritos-Cards");

  try {
    const responseFav = await getFavoritos();
    const favorites = responseFav.data.user.favoritos;

    if (favorites.length === 0) {
      console.log("no hay favoritos");
    } else {
      favorites.forEach((favorite) => {
        const favoritos = document.createElement("div");
        favoritos.classList.add("col-md-12");
        favoritos.innerHTML = ImprimirFavoritos(
          favorite.reseña,
          favorite.reseña.pelicula.posterPath
        );
        favoritosCards.append(favoritos);
      });
    }
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }
});
