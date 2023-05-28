import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

//OBTENCION DE MIS RESEÑAS FAVORITAS
async function getFavoritos() {
  try {
    const responseFav = await movieApi.get(`profile/favorites`);
    return responseFav.data;
  } catch (error) {
    throw getApiError(error);
  }
}
//HACER RESEÑA FAVORITA
async function añadirFavoritos(reviewId) {
  try {
    const responseFav = await movieApi.post(
      `review/${parseInt(reviewId)}/favorites`
    );
    return responseFav.data;
  } catch (error) {
    throw getApiError(error);
  }
}
//ELIMINAR DE MIS RESEÑAS FAVORITAS
async function deleteFavoritos(reviewId) {
  try {
    const responseFav = await movieApi.delete(
      `review/${parseInt(reviewId)}/favorites`
    );
    return responseFav.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export { getFavoritos, añadirFavoritos, deleteFavoritos };
