import { getMovieById } from "./detail.api";
import { Movie, Error } from "./detail.components.js";

const input = document.getElementsByTagName("input")[0];
const button = document.getElementsByTagName("button")[0];
const peliculasContainer = document.getElementById("peliculas");
const errorContainer = document.getElementById("error");

button.addEventListener("click", async () => {
  try {
    const inputValue = parseInt(input.value);
    if (isNaN(inputValue)) return;

    const movies = await getMovieById(inputValue);

    const movieHTML = document.createElement("div");
    movieHTML.innerHTML = Movie(movies);
    peliculasContainer.append(movieHTML);
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }
});
