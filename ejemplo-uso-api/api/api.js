import axios from "axios";
const input = document.getElementsByTagName("input")[0];
const button = document.getElementsByTagName("button")[0];
const peliculasContainer = document.getElementById("peliculas");
const errorContainer = document.getElementById("error");

const BASE_URL = "http://localhost:3001/api";

export const movieApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getMovieById = async (id) => {
  try {
    const response = await movieApi.get("movies/" + id);
    return response.data;
  } catch (error) {
    console.log(error);
    errorContainer.innerHTML = renderError();
  }
};

function renderMovie({ title, tagline, posterPath }) {
  return `
  <div style="margin:20px"> 
    <h1>${title}</h1>
    <p>${tagline}</p>
    <img src="${posterPath}" alt="${title}" style="width: 200px;"/>
  </div>
  `;
}

function renderError() {
  return `
  <div> 
    <h1>ERROR</h1>
  </div>
  `;
}

button.addEventListener("click", async () => {
  const inputValue = parseInt(input.value);
  if (isNaN(inputValue)) return;

  const movies = await getMovieById(inputValue);

  const movieHTML = document.createElement("div");
  movieHTML.innerHTML = renderMovie(movies);
  peliculasContainer.append(movieHTML);
});
