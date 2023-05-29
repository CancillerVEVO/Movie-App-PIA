import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

//OBTENCION DE RESEÑA
async function getReseña(reviewId) {
  try {
    const response = await movieApi.get(`review/${parseInt(reviewId)}`);
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}
//Edicion de reseña
async function updateReseña(reviewId, { titulo, contenido, calificacion }) {
  try {
    const response = await movieApi.put(`review/${parseInt(reviewId)}`, {
      titulo,
      contenido,
      calificacion,
    });
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export { getReseña, updateReseña };
