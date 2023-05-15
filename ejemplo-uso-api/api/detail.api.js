import { movieApi } from "../../movieAPI/movieApi.js";

const getMovieById = async (id) => {
  try {
    const response = await movieApi.get("movies/" + id);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

async function listPopularMovies(page) {}

export { getMovieById };
