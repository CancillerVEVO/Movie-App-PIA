import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

//OBTENCION DE RESEÑAS
async function getListaReseñas(page) {
  try {
    const response = await movieApi.get(`review?page=${Number(page)}`);
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export { getListaReseñas };