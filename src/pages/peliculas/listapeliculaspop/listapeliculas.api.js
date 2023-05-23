import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

//OBTENCION DE PELICULAS POPULARES
async function getListaPeliculasPop(page) {
  try {
    const response = await movieApi.get(`movies?page=${Number(page)}`);
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export { getListaPeliculasPop };
