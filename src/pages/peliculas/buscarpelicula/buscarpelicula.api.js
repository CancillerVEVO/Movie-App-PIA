import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

//OBTENCION DE PELICULAS POPULARES
async function searchPelicula(page, movieName) {
  try {
    const response = await movieApi.get(
      `movies/search?page=${Number(page)}&name=${movieName}`
    );
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export { searchPelicula };
