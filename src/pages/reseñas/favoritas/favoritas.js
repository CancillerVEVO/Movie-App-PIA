import { getFavoritos } from "../../myperfil/misfavoritos/misfavoritos.api";
import { Error } from "../../myperfil/misfavoritos/misfavoritos.components";

const favoritosCards = document.getElementById("favoritos-Cards");

window.addEventListener("DOMContentLoaded", async () => {
  const errorContainer = document.getElementById(
    "error-de-extraccion-favoritos"
  );

  try {
    const responseFav = await getFavoritos();
    const favorites = responseFav.data.user.favoritos;
    // Obtener las ID de las reseñas
    const reseñasIds = favorites.map((favorito) => favorito.reseña.id);
    console.log(reseñasIds);

    if (favorites.length === 0) {
      alert("no hay favoritos");
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
