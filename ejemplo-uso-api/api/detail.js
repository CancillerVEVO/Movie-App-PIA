import { getMovieById, getMovieGenres } from "./detail.api";
import { Movie, Error, GenreListItem } from "./detail.components.js";

const input = document.getElementsByTagName("input")[0];
const button = document.getElementsByTagName("button")[0];
const peliculasContainer = document.getElementById("peliculas");
const errorContainer = document.getElementById("error");
const generos = document.getElementById("btn-generos");
const generoContenedor = document.getElementById("nasty");

generos.addEventListener("click", async () => {
  try {
    const resp = await getMovieGenres();
    const genreNames = resp.genres.map((genre) => genre.name);
    console.log(genreNames);

    genreNames.forEach((element) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = GenreListItem(element);
      generoContenedor.append(listItem);
    });

    // const listItem = document.createElement("li");
    // listItem.innerHTML = GenreListItem(genreNames);
    // generoContenedor.append(listItem);
  } catch (error) {
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }
});

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
