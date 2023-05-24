import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

//OBTENCION DE RESEÑAS
async function getListDetalle(page, movieId) {
  try {
    const response = await movieApi.get(
      `review/movie/${movieId}?page=${Number(page)}`
    );
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export { getListDetalle };
