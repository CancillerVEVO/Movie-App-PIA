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

export { getFavoritos };
