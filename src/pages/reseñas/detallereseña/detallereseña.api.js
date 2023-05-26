import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

//OBTENCION DE RESEÑAS
async function getListaReseñas(reviewId) {
  try {
    //const response = await movieApi.get(`review?page=${Number(page)}`);
    const response = await movieApi.get(`review/${reviewId}`);
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}
//OBTENCION DE COMENTARIOS
async function getComentarios(reviewId) {
  try {
    const responseComents = await movieApi.get(`review/${reviewId}/comments`);
    return responseComents.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export { getListaReseñas, getComentarios };
