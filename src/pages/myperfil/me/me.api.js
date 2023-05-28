import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

//OBTENCION DE MI PERFIL
async function getMyperfil() {
  try {
    const response = await movieApi.get(`profile`);
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}
//OBTENCION DE MI PERFIL
async function deleteReseña(reviewId) {
  try {
    const response = await movieApi.delete(`review/${parseInt(reviewId)}`);
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export { getMyperfil, deleteReseña };
