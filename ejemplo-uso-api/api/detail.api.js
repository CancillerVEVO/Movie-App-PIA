import { movieApi } from "../../movieAPI/movieApi.js";

async function getMovieById(id) {
  try {
    const response = await movieApi.get("movies/" + id);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

async function getMovieGenres() {
  try {
    const response = await movieApi.get("movies/genres");
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
}

export { getMovieById, getMovieGenres };
