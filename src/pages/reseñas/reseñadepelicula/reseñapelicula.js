import { getListaPeliculasPop } from "./reseñapelicula.api";
import { Error, ImprimirPeliculas } from "./reseñapelicula.components";

const errorContainer = document.getElementById("error-de-extraccion-peliculas");
const moviesCards = document.getElementById("movies-Cards");

async function mostrarPeliculasPop() {
  try{
    const resp = await getListaPeliculasPop();
    const infoPeliculas = resp;
    infoPeliculas.results.forEach((result) => {
      //console.log("Resultado:", result);

      //IMPRIMIR RESULTADOS
      
      const listMovies = document.createElement("div");
      listMovies.classList.add("col-md-8");
      listMovies.innerHTML = ImprimirPeliculas(result);
      moviesCards.append(listMovies);
      
    });


  }catch (error){
    const errorHTML = document.createElement("div");
    errorHTML.innerHTML = Error(error.message);
    errorContainer.append(errorHTML);
  }
}
mostrarPeliculasPop();