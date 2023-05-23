import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

//OBTENCION DE RESEÑAS
async function getListaReseñas(page) {
  try {
    const responseMovies = await movieApi.get(`review?page=${Number(page)}`);
    return responseMovies.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export { getListaPeliculasPop, getListaReseñas };
