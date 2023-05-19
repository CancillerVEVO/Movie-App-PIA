import { movieApi } from "@/api/movieApi";
import { getApiError } from "@/utils/getApiError";

async function getMovieById(id) {
  try {
    const response = await movieApi.get("movies/" + id);
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

async function getMovieGenres() {
  try {
    const response = await movieApi.get("movies/genres");
    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export { getMovieById, getMovieGenres };
