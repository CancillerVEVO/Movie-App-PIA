import { getFavoritos } from "./misfavoritos.api";
import { Error, ImprimirReseñas } from "./misfavoritos.components";

const favoritosCards = document.getElementById("favoritos-Cards");

window.addEventListener("DOMContentLoaded", async () => {
  const errorContainer = document.getElementById(
    "error-de-extraccion-favoritos"
  );

  try {
    const responseFav = await getFavoritos();
    const favorites = responseFav.data.user.favoritos;

    if (favorites.length === 0) {
      console.log("no hay favoritos");
    } else {
      favorites.forEach((favorite) => {
        const favoritos = document.createElement("div");
        favoritos.classList.add("col-md-12", "mt-5");
        favoritos.innerHTML = ImprimirReseñas(
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
