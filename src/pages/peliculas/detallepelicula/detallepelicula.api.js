import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

//OBTENCION DE RESEÑAS
async function getListReseñasPelicula(id,page) {
  try {
    //const responseMovies = await movieApi.get(`review?page=${Number(page)}`);
    const responseMovies = await movieApi.get(`review/movie/${Number(id)}?page=${Number(page)}`);
    return responseMovies.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export {  getListReseñasPelicula };
